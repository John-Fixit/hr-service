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
    <>
      <div>
        <div className="flex justify-between items-center gap-3 mb-4">
          <h3 className="font-medium text-[1.3rem] font-outfit">
            Current Activity
          </h3>
        </div>
        <div>
          <div className="max-w-5xl mx-auto">
            {/* Main Progress Card */}
            <div className="bg-white rounded shadow p-4 mb-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-base font-medium text-gray-900 font-outfit">
                    Monthly Progress
                  </h1>
                  <p className="text-gray-400 font-outfit">
                    This is the latest Improvement
                  </p>
                </div>
                <div className="bg-blue-100 rounded-full p-2 cursor-pointer">
                  <Calendar className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <ActivityChart />
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Yellow Card */}
              <div className="bg-yellow-400 rounded py-2 px-5 md:px-3 relative overflow-hidden">
                <h2 className="text-xl font-bold text-white">450K+</h2>
                <p className=" text-white mb-6 font-outfit">Completed Course</p>
                <p className="text-white text-sm mb4 font-outfit">
                  This is the latest Data
                </p>
                <div className="absolute bottom-3 right-3 bg-white rounded-full p-1 cursor-pointer shadow-lg">
                  <ArrowUpRight className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
              {/* Pink Card */}
              <div className="bg-pink-500 rounded py-2 px-5 md:px-3 relative overflow-hidden">
                <h2 className="text-xl font-bold text-white">200K+</h2>
                <p className="font-semibold text-white mb-6 font-outfit">
                  Video Course
                </p>

                <div className="absolute bottom-3 right-4 bg-white rounded-full p-1 cursor-pointer shadow-lg">
                  <Play className="w-5 h-5 text-pink-500 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
            borderColor: "#3b82f6",
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
              gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
              return gradient;
            },
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: "#3b82f6",
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
