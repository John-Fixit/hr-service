import AdminDashboardHeader from "../../components/core/lms/admin-dashboard/AdminDashboardHeader";
import BestInstructors from "../../components/core/lms/admin-dashboard/BestInstructors";
import ContentUsage from "../../components/core/lms/admin-dashboard/ContentUsage";
import CourseCompletion from "../../components/core/lms/admin-dashboard/CourseCompletion";
import CurrentActivity from "../../components/core/lms/admin-dashboard/CurrentActivity";
import NoticeBoard from "../../components/core/lms/admin-dashboard/NoticeBoard";
import OverallPassPercentage from "../../components/core/lms/admin-dashboard/OverallPassPercentage";
import PopularCourses from "../../components/core/lms/admin-dashboard/PopularCourses";
import SchoolPerformanceCard from "../../components/core/lms/admin-dashboard/SchoolPerformance";
import UpcomingLessons from "../../components/core/lms/admin-dashboard/UpcomingLessons";

const AdminDashboard = () => {
  return (
    <>
      <main className="px-6 md:px-4 lg:px-0">
        <AdminDashboardHeader />
        <section className="mt-12 space-y-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PopularCourses />
            <CurrentActivity />
            <BestInstructors />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SchoolPerformanceCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <OverallPassPercentage />
              <ContentUsage />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCompletion />
            <UpcomingLessons />
            <NoticeBoard />
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
