import { useEffect, useRef } from "react";
import * as Chart from "chart.js";

export default function ContentUsage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    Chart.Chart.register(
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.LineController,
      Chart.LineElement,
      Chart.PointElement,
      Chart.Tooltip
    );

    chartInstance.current = new Chart.Chart(ctx, {
      type: "line",
      data: {
        labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
        datasets: [
          {
            data: [20, 35, 45, 50, 30, 32, 55, 42, 38, 35, 42, 45],
            borderColor: "#00bcc2",
            backgroundColor: "#00bcc2",
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: "#00bcc2",
            pointBorderColor: "#00bcc2",
            tension: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Usage: ${ctx.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            display: false,
            grid: { display: false },
          },
          y: {
            display: false,
            grid: { display: false },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
      <h3 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit mb-1">
        Content usage
      </h3>
      <p className="text-btnColor text-sm font-medium mb-4 font-outfit">
        12.5% higher than last month
      </p>
      <div className="relative h-60">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
