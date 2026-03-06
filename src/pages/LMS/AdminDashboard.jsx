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
import RecentCompletionsSuggested from "../../components/core/lms/admin-dashboard/RecentCompletionsSuggested";

const AdminDashboard = () => {
  return (
    <main className="min-h-screen bg-lighten font-outfit">
      <div className="px-6 md:px-4 lg:px-6 py-6 max-w-[1600px] mx-auto">
        <AdminDashboardHeader />
        <section className="mt-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PopularCourses />
            <CurrentActivity />
            {/* Admin-only: top instructors by course count; "Courses" opens creator's courses in a drawer */}
            <BestInstructors />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SchoolPerformanceCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OverallPassPercentage />
              <ContentUsage />
            </div>
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CourseCompletion />
            <UpcomingLessons />
            <NoticeBoard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentCompletionsSuggested />
          </div> */}
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
