import { useLocation } from "react-router-dom";
import { FaPlus, FaUserGraduate } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";
import { SlDiamond } from "react-icons/sl";
import StaffCoursesTable from "../../components/core/lms/staff-dashboard/courses/StaffCoursesTable";
import EmployeeCourse from "../../components/core/lms/employee-courses/EmployeeCourses";
import { useCourseStore } from "../../hooks/useCourseStore";
import { useGetStaffCourses } from "../../API/lms-apis/course";
import { useMemo, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Tab, Tabs } from "@nextui-org/react";

const employeeStatData = [
  {
    icon: GrPersonalComputer,
    value: "42",
    label: "Total Courses",
    valueLabel: "totalCourses",
    bgColor: "bg-[#00bcc2]/10",
    iconBg: "bg-[#00bcc2]/15",
    iconColor: "text-btnColor",
  },
  {
    icon: FaUserGraduate,
    value: "38",
    label: "Pending",
    valueLabel: "pendingCourses",
    bgColor: "bg-amber-500/10",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-600",
  },
  {
    icon: SlDiamond,
    value: "04",
    label: "Completed",
    valueLabel: "completedCourses",
    bgColor: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-600",
  },
];

const staffStatData = [
  {
    icon: GrPersonalComputer,
    value: "42",
    label: "Courses Created",
    bgColor: "bg-[#00bcc2]/10",
    iconBg: "bg-[#00bcc2]/15",
    iconColor: "text-btnColor",
  },
  {
    icon: FaUserGraduate,
    value: "44k",
    label: "Total Enrolled",
    bgColor: "bg-amber-500/10",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-600",
  },
  {
    icon: SlDiamond,
    value: "17k",
    label: "Enrolled Students",
    bgColor: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-600",
  },
];

export default function StaffDashboard() {
  const { openCourseDrawer } = useCourseStore();
  const location = useLocation().pathname;

  const [courseView, setCourseView] = useState("assigned");

  const isLearningRoute = location === "/lms/learning";
  const isStaffRoute = location === "/lms/staff";
  const showCreatorFeatures = isLearningRoute || isStaffRoute;

  const { userData } = useCurrentUser();

  const { data: get_courses, isPending: isLoadingCourses } = useGetStaffCourses(
    userData?.data?.STAFF_ID,
  );
  const allCourses = useMemo(() => get_courses?.data || [], [get_courses]);

  const statsData = useMemo(() => {
    const totalCourses = allCourses?.length || 0;
    const completedCourses =
      allCourses?.filter(
        (course) => course?.COMPLETED_LESSONS >= course?.TOTAL_LESSONS,
      )?.length || 0;
    const pendingCourses =
      allCourses?.filter(
        (course) =>
          course?.COMPLETED_LESSONS === 0 ||
          course?.COMPLETED_LESSONS < course?.TOTAL_LESSONS,
      )?.length || 0;
    const courseInProgress =
      allCourses?.filter(
        (course) =>
          course?.COMPLETED_LESSONS > 0 &&
          course?.COMPLETED_LESSONS < course?.TOTAL_LESSONS,
      )?.length || 0;

    return {
      totalCourses,
      pendingCourses,
      courseInProgress,
      completedCourses,
    };
  }, [allCourses]);

  const pageTitle = isLearningRoute
    ? "My Learning"
    : isStaffRoute
      ? "Staff Dashboard"
      : "Employee Dashboard";
  const pageDescription = isLearningRoute
    ? "Courses assigned to you and courses you create. Track progress and manage your content."
    : isStaffRoute
      ? "Create courses and manage the ones you’ve created. View enrollees and performance."
      : "Browse and complete courses assigned to you. Track your progress here.";

  const statSource = showCreatorFeatures ? staffStatData : employeeStatData;
  const displayValues = showCreatorFeatures
    ? statSource.map((s) => s.value)
    : statSource.map((s) => statsData[s.valueLabel]);

  return (
    <div className="min-h-screen bg-lighten font-outfit">
      <main className="px-6 md:px-4 lg:px-6 py-6 max-w-7xl mx-auto">
        <div className="mb-8 flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[rgb(10,31,52)] font-outfit tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-main-text-color text-sm md:text-base mt-1 font-outfit max-w-xl">
              {pageDescription}
            </p>
          </div>
          {showCreatorFeatures && (
            <button
              className="cursor-pointer py-2.5 px-5 rounded-lg bg-btnColor hover:opacity-90 text-white font-outfit font-medium text-sm flex gap-2 items-center shadow-sm transition-opacity"
              onClick={() => openCourseDrawer({ drawerName: "create-course" })}
            >
              <FaPlus className="w-4 h-4" />
              Create Course
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {statSource.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm"
            >
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${stat.iconBg} flex items-center justify-center flex-shrink-0`}
              >
                <stat.icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-[rgb(10,31,52)] font-outfit tabular-nums">
                  {showCreatorFeatures ? stat.value : displayValues[index]}
                </p>
                <p className="text-main-text-color text-sm font-medium font-outfit">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showCreatorFeatures && (
          <div className="mb-6">
            <Tabs
              aria-label="Course views"
              size="sm"
              color="primary"
              variant="bordered"
              selectedKey={courseView}
              onSelectionChange={setCourseView}
              classNames={{
                tabList: "gap-1",
                cursor: "bg-btnColor",
                tab: "font-outfit",
              }}
            >
              <Tab key="assigned" title="Assigned to Me" />
              <Tab key="my-courses" title="Courses I Create" />
            </Tabs>
          </div>
        )}

        {showCreatorFeatures && courseView === "my-courses" ? (
          <StaffCoursesTable />
        ) : (
          <EmployeeCourse courses={allCourses} isLoading={isLoadingCourses} />
        )}
      </main>
    </div>
  );
}
