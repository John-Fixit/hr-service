import { useEffect, useRef } from "react";
import * as Chart from "chart.js";

export default function OverallPassPercentage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    Chart.Chart.register(
      Chart.ArcElement,
      Chart.DoughnutController,
      Chart.Legend,
      Chart.Tooltip,
    );

    chartInstance.current = new Chart.Chart(ctx, {
      type: "doughnut",
      data: {
        // labels: ["Boys", "Girls"],
        datasets: [
          {
            data: [45, 55],
            backgroundColor: ["#00bcc2", "rgb(10,31,52)"],
            borderWidth: 0,
            cutout: "65%",
            spacing: 2,
          },
        ],
      },
      options: {
        aspectRatio: 1.1,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "center",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 20,
              font: { size: 14 },
              color: "#334155",
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
            },
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
      <h3 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit mb-4">
        Overall pass rate
      </h3>
      <div className="relative h-72">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
