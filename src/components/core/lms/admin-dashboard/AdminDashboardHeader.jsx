import { Button, ConfigProvider } from "antd";
import {
  ArrowUpRight,
  BookOpenCheck,
  Download,
  Plus,
  UsersRound,
} from "lucide-react";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import { useMemo } from "react";
import { useGetAllCourses } from "../../../../API/lms-apis/course";
import moment from "moment";
import StarLoader from "../../loaders/StarLoader";
import { exportExcel } from "../../../../utils/exportReportAsExcel";

const AdminDashboardHeader = () => {
  const { openCourseDrawer } = useCourseStore();

  const { data: allCoursesRaw, isPending: isLoadingCourses } =
    useGetAllCourses();
  const allCourses = useMemo(
    () => allCoursesRaw?.data || [],
    [allCoursesRaw?.data],
  );

  const statsData = useMemo(() => {
    const totalCourses = allCourses?.length || 0;
    const courseInProgress =
      allCourses?.filter((course) => moment().isSameOrBefore(course?.END_DATE))
        ?.length || 0;
    return { totalCourses, courseInProgress };
  }, [allCourses]);

  const handleExport = () => {
    exportExcel({
      fileName: "lms-course-catalog",
      excelData: allCourses.map((course) => ({
        "Course title": course?.COURSE_TITLE || "",
        Category: course?.COURSE_CATEGORY || "",
        Description: course?.COURSE_DESCRIPTION || "",
        "Start date": course?.START_DATE || "",
        "End date": course?.END_DATE || "",
        Lessons: course?.TOTAL_LESSONS ?? "",
        Enrollments:
          course?.TOTAL_RECIPIENTS ??
          course?.selling ??
          course?.course_recipients?.length ??
          "",
        Completions: course?.TOTAL_RECIPIENTS_COMPLETED ?? "",
      })),
    });
  };

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#1e293b] via-[#273451] to-[#3730a3] px-6 py-7 text-white shadow-[0_18px_45px_-28px_rgba(30,41,59,0.65)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-2 -top-10 h-52 w-52 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-0 right-24 h-24 w-24 rounded-full bg-violet-300/15 blur-2xl" />
        <div className="relative flex min-h-[210px] flex-col justify-between gap-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-100">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              Learning management
            </span>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              LMS overview
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
              A clear view of your course catalog and learning activity across
              the organization.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-violet-200">
                <BookOpenCheck size={20} />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-300">
                  Courses in catalog
                </p>
                <p className="mt-0.5 text-xl font-semibold tabular-nums">
                  {isLoadingCourses ? (
                    <StarLoader size={20} />
                  ) : (
                    statsData.totalCourses
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-violet-200">
                <UsersRound size={20} />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-slate-300">
                  Active courses
                </p>
                <p className="mt-0.5 text-xl font-semibold tabular-nums">
                  {isLoadingCourses ? (
                    <StarLoader size={20} />
                  ) : (
                    statsData.courseInProgress
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)] sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
            Quick action
          </p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-[#17263c]">
            Build your next course
          </h2>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            Create learning content and assign it to your team.
          </p>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#6258e8",
              borderRadius: 10,
              controlHeightLG: 46,
            },
          }}
        >
          <Button
            type="primary"
            className="flex w-full items-center justify-center gap-2 font-outfit font-semibold shadow-sm"
            size="large"
            onClick={() => openCourseDrawer({ drawerName: "create-course" })}
          >
            <Plus size={18} />
            Create new course
            <ArrowUpRight size={16} className="ml-auto" />
          </Button>
        </ConfigProvider>
        <button
          type="button"
          onClick={handleExport}
          disabled={isLoadingCourses || !allCourses.length}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-[#5146d8] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="h-4 w-4" />
          Export course report
        </button>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span>Catalog status</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {statsData.courseInProgress} active
          </span>
        </div>
      </aside>
    </div>
  );
};

export default AdminDashboardHeader;
