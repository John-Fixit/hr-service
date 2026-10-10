import AdminDashboardHeader from "../../components/core/lms/admin-dashboard/AdminDashboardHeader";
import BestInstructors from "../../components/core/lms/admin-dashboard/BestInstructors";
import ContentUsage from "../../components/core/lms/admin-dashboard/ContentUsage";
import CurrentActivity from "../../components/core/lms/admin-dashboard/CurrentActivity";
import OverallPassPercentage from "../../components/core/lms/admin-dashboard/OverallPassPercentage";
import PopularCourses from "../../components/core/lms/admin-dashboard/PopularCourses";
import SchoolPerformanceCard from "../../components/core/lms/admin-dashboard/SchoolPerformance";

const AdminDashboard = () => {
  return (
    <main className="min-h-full bg-[#f4f7fb] font-outfit text-[#17263c]">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <AdminDashboardHeader />
        <section className="mt-8 space-y-6 lg:mt-10 lg:space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6258e8]">
                Learning analytics
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#17263c] sm:text-2xl">
                Learning insights
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Organization-wide learning activity
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <PopularCourses />
            <CurrentActivity />
            <BestInstructors />
          </div>
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <SchoolPerformanceCard />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <OverallPassPercentage />
              <ContentUsage />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
