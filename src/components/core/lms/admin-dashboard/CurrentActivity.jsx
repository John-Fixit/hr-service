import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { ArrowUpRight, Activity, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { useGetRespondedStats } from "../../../../API/lms-apis/lms-dashboard";

const CurrentActivity = () => {
  const { data: allCourses = [] } = useGetRespondedStats();
  const values = allCourses?.map(
    (course) => course?.TOTAL_RECIPIENTS_COMPLETED ?? 0,
  );
  const engagedValues = values?.filter((value) => value > 0);
  const completedValues = allCourses?.filter(
    (course) =>
      course?.TOTAL_LESSONS > 0 &&
      course?.TOTAL_LESSONS === course?.TOTAL_RECIPIENTS_COMPLETED,
  );
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)]">
      <div className="border-b border-slate-100 px-5 py-5">
        <h3 className="text-base font-semibold tracking-tight text-[#17263c] font-outfit">
          Course response
        </h3>
        <p className="mt-1 text-xs text-slate-500 font-outfit">
          Respondents per course (hover for course title)
        </p>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-700 font-outfit">
              Respondents by course
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 font-outfit">
              Number of employees who completed or engaged per course
            </p>
          </div>
          <div className="rounded-xl bg-[#f0eeff] p-2.5">
          <Activity className="h-4 w-4 text-[#6258e8]" />
          </div>
        </div>
        <ActivityChart />
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-3">
            <div>
              <p className="text-[11px] font-medium text-slate-500 font-outfit">
                Completed
              </p>
              <p className="mt-1 text-lg font-semibold text-[#17263c] font-outfit">
                {completedValues?.length || 0}
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/70 px-3.5 py-3">
            <div>
              <p className="text-[11px] font-medium text-violet-800/70 font-outfit">
                Engaged
              </p>
              <p className="mt-1 text-lg font-semibold text-violet-950 font-outfit">
                {engagedValues?.length || 0}
              </p>
            </div>
            <Play className="h-4 w-4 text-[#6258e8]" />
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
            borderColor: "#6258e8",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, "rgba(98, 88, 232, 0.2)");
              gradient.addColorStop(1, "rgba(98, 88, 232, 0)");
              return gradient;
            },
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#6258e8",
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
