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
            backgroundColor: ["#6258e8", "#e7e6f7"],
            borderWidth: 0,
            cutout: "72%",
            spacing: 3,
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
              padding: 16,
              font: { size: 11 },
              color: "#64748b",
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
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)] sm:p-6">
      <h3 className="text-base font-semibold tracking-tight text-[#17263c] font-outfit">
        Overall pass rate
      </h3>
      <p className="mt-1 text-xs text-slate-500 font-outfit">
        Learner assessment outcomes
      </p>
      <div className="relative mt-3 h-56">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
