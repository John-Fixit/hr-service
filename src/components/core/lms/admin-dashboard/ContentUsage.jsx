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
            borderColor: "#60a5fa",
            backgroundColor: "#60a5fa",
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: "#60a5fa",
            pointBorderColor: "#60a5fa",
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
    <div>
      <div className="bg-white rounded-md shadow-sm p-8 w-full">
        <h1 className="text-xl text-slate-800 mb-4 font-[400] font-outfit">
          Content Usage
        </h1>
        <p className="text-blue-400 text-l font-mdium text-center mb-6 font-outfit">
          12.5% higher than last month
        </p>
        <div className="relative h-60">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
