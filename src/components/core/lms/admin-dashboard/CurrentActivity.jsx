import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { ArrowUpRight, Calendar, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { useGetRespondedStats } from "../../../../API/lms-apis/lms-dashboard";

const CurrentActivity = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit">
          Course response
        </h3>
        <p className="text-sm text-main-text-color font-outfit mt-0.5">
          Respondents per course (hover for course title)
        </p>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-gray-700 font-outfit">
              Respondents by course
            </p>
            <p className="text-xs text-gray-500 font-outfit">
              Number of employees who completed or engaged per course
            </p>
          </div>
          <div className="bg-btnColor/10 rounded-lg p-2">
            <Calendar className="w-4 h-4 text-btnColor" />
          </div>
        </div>
        <ActivityChart />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-lg bg-[rgb(10,31,52)] text-white py-3 px-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-300 font-outfit">
                Completed
              </p>
              <p className="text-lg font-bold font-outfit">—</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-btnColor" />
          </div>
          <div className="rounded-lg bg-btnColor text-white py-3 px-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-white/80 font-outfit">
                Engaged
              </p>
              <p className="text-lg font-bold font-outfit">—</p>
            </div>
            <Play className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentActivity;

const ActivityChart = () => {
  const { data: allCourses = [] } = useGetRespondedStats();

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const labels = allCourses?.map((course) => course?.COURSE_TITLE);
  const values = allCourses?.map(
    (course) => course?.TOTAL_RECIPIENTS_COMPLETED ?? 0,
  );

  useEffect(() => {
    if (!chartRef.current || !values?.length) return;

    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    Chart.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Filler,
      Tooltip,
    );

    const maxValue = Math.max(...values);
    const suggestedMax = maxValue === 0 ? 10 : Math.ceil(maxValue * 1.2);

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels, // course titles (used in tooltip)
        datasets: [
          {
            data: values,
            borderColor: "#00bcc2",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, "rgba(0, 188, 194, 0.25)");
              gradient.addColorStop(1, "rgba(0, 188, 194, 0)");
              return gradient;
            },
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#00bcc2",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1f2937",
            padding: 12,
            displayColors: false,
            callbacks: {
              // Full course title as tooltip title
              title: (items) => items[0]?.label || "",
              // Number of respondents as label
              label: (context) =>
                `${context.parsed.y} respondent${
                  context.parsed.y === 1 ? "" : "s"
                }`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              display: false, // hide long labels from axis, rely on tooltip
            },
            border: {
              display: false,
            },
          },
          y: {
            min: 0,
            suggestedMax,
            ticks: {
              color: "#9ca3af",
              font: {
                size: 12,
              },
              stepSize: suggestedMax <= 10 ? 2 : Math.ceil(suggestedMax / 4),
            },
            grid: {
              color: "#f0f0f0",
              drawBorder: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, values]);

  return (
    <div className="h-52">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
