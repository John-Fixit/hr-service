import { useEffect, useMemo, useRef } from "react";
import * as Chart from "chart.js";
import { useGetAllCourses } from "../../../../API/lms-apis/course";
import StarLoader from "../../loaders/StarLoader";

const COLORS = ["#00bcc2", "rgb(10,31,52)", "#0d9488", "#64748b", "#f59e0b"];

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
      <h3 className="text-lg font-semibold text-[rgb(10,31,52)] mb-4">
        Top Course Performance
      </h3>
      <div className="relative h-80">
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
