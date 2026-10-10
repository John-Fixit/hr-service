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
            borderColor: "#6258e8",
            backgroundColor: "#6258e8",
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBackgroundColor: "#6258e8",
            pointBorderColor: "#ffffff",
            pointHoverBorderWidth: 2,
            tension: 0.35,
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
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)] sm:p-6">
      <h3 className="text-base font-semibold tracking-tight text-[#17263c] font-outfit">
        Content usage
      </h3>
      <p className="mt-1 text-xs font-medium text-[#6258e8] font-outfit">
        12.5% higher than last month
      </p>
      <div className="relative mt-3 h-56">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
