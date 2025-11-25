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
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Register Chart.js components
      Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip
      );

      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [0, 20, 38, 32, 62, 78],
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
              pointRadius: 0,
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
                label: (context) => `${context.parsed.y}%`,
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#9ca3af",
                font: {
                  size: 14,
                },
              },
              border: {
                display: false,
              },
            },
            y: {
              min: 0,
              max: 80,
              ticks: {
                stepSize: 20,
                color: "#9ca3af",
                font: {
                  size: 14,
                },
                callback: (value) => `${value}%`,
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
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="h-40">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
