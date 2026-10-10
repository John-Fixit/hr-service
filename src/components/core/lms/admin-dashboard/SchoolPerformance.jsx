import { useEffect, useMemo, useRef } from "react";
import * as Chart from "chart.js";
import { useGetAllCourses } from "../../../../API/lms-apis/course";
import StarLoader from "../../loaders/StarLoader";

const COLORS = ["#6258e8", "#315c78", "#557e9d", "#81a0b6", "#d5a044"];

const SchoolPerformanceCard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { data: coursesData, isPending: isLoadingCourses } = useGetAllCourses();
  const courses = useMemo(
    () => coursesData?.data?.slice(0, 8) || [],
    [coursesData?.data],
  );

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef?.current?.getContext("2d");

    Chart.Chart.register(
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.BarController,
      Chart.BarElement,
      Chart.Legend,
      Chart.Tooltip,
    );

    const maxRecipients = Math.max(...courses.map((c) => c.TOTAL_RECIPIENTS));

    chartInstance.current = new Chart.Chart(ctx, {
      type: "bar",
      data: {
        labels: courses.map((c) => c.COURSE_TITLE),
        datasets: [
          {
            data: courses.map((c) => c.TOTAL_RECIPIENTS),
            backgroundColor: COLORS,
            borderRadius: 6,
            borderSkipped: false,
            barThickness: 32,
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
              label: (ctx) => `${ctx.parsed.y} recipients`,
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
            max: Math.ceil(maxRecipients / 100) * 100,
            ticks: {
              stepSize: Math.ceil(maxRecipients / 5 / 50) * 50,
              callback: (val) => val,
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
  }, [courses]);

  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)] sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-[#17263c] font-outfit">
            Top course performance
          </h3>
          <p className="mt-1 text-xs text-slate-500 font-outfit">
            Enrollment across the leading courses
          </p>
        </div>
        <span className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
          Top 8
        </span>
      </div>
      <div className="relative h-64 sm:h-72">
        {isLoadingCourses ? (
          <StarLoader size={20} />
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>
    </div>
  );
};

export default SchoolPerformanceCard;
