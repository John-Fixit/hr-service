import { useEffect, useRef } from "react";
import * as Chart from "chart.js";

const SchoolPerformanceCard = () => {
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
      Chart.BarController,
      Chart.BarElement,
      Chart.Legend,
      Chart.Tooltip
    );

    chartInstance.current = new Chart.Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Mauris dictum",
          "Etiam vitae",
          "Praesent non",
          "Duis eget",
          "Mauris et arcu",
        ],
        datasets: [
          {
            data: [94, 79, 75, 67, 54],
            backgroundColor: [
              "#22d3ee",
              "#8b5cf6",
              "#2dd4bf",
              "#db2777",
              "#fbbf24",
            ],
            borderRadius: 1,
            borderSkipped: false,
            barThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "start",
            labels: {
              pointStyle: "rect",
              padding: 16,
              font: { size: 12 },
              boxWidth: 10,
              borderRadius: 10,
              useBorderRadius: true,
              generateLabels: (chart) => {
                const data = chart.data;
                return data.labels.map((label, i) => ({
                  text: label,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  hidden: false,
                  index: i,
                }));
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ctx.parsed.y + "%",
            },
          },
        },
        scales: {
          x: {
            display: true,
            grid: { display: false },
            ticks: { display: false },
            border: { display: true, color: "#e2e8f0" },
          },
          y: {
            display: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: (val) => val + "%",
              color: "#94a3b8",
              font: { size: 12 },
            },
            grid: { color: "#f1f5f9", drawTicks: false },
            border: { display: false },
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
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-3xl">
        <h1 className="text-xl text-slate-800 mb-4 font-[400] font-outfit">
          Top 5 School Performance
        </h1>
        <div className="relative h-80 font-outfit">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default SchoolPerformanceCard;
