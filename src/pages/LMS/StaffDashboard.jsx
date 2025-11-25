import { useLocation } from "react-router-dom";
import { FaPlus, FaUserGraduate } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";
import { SlDiamond } from "react-icons/sl";
import CoursesTable from "../../components/core/lms/staff-dashboard/courses/CoursesTable";
import EmployeeCourse from "../../components/core/lms/employee-courses/EmployeeCourses";
import { useCourseStore } from "../../hooks/useCourseStore";

const employeeStatData = [
  {
    icon: GrPersonalComputer,
    value: "42",
    label: "Total Courses",
    bgColor: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    icon: FaUserGraduate,
    value: "38",
    label: "Complete Lesson",
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    icon: SlDiamond,
    value: "04",
    label: "Achieved Certificates",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
];

const staffStatData = [
  {
    icon: GrPersonalComputer,
    value: "42",
    label: "Total Courses",
    bgColor: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    icon: FaUserGraduate,
    value: "44k",
    label: "Total Students",
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    icon: SlDiamond,
    value: "17k",
    label: "Enrolled Stidents",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
];

export default function StaffDashboard() {
  const { openCourseDrawer } = useCourseStore();
  const location = useLocation().pathname;

  const currentView = location === "/lms/staff" ? "staff" : "employee";

  return (
    <div className=" bg-gray-50 p-6 font-sans">
      <div className="mb-6 flex justify-between items-center gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 font-outfit tracking-wide capitalize">
            {currentView} Dashboard
          </h1>
          <p className="text-gray-600 font-outfit">
            Manage and create performance review templates
          </p>
        </div>
        {currentView === "staff" && (
          <div>
            <button
              className="cursor-pointer py-3 px-4 rounded-full bg-blue-900 hover:bg-white border border-blue-900 transition-all text-white hover:text-blue-900 font-outfit font-medium duration-300 text-base flex gap-2 items-center"
              onClick={() => openCourseDrawer({ drawerName: "create-course" })}
            >
              <FaPlus />
              Create Course
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {(currentView === "staff" ? staffStatData : employeeStatData).map(
          (stat, index) => (
            <div
              key={index}
              className="bgwhite rounded-lg p-6 flex items-center gap-4 border border-gray-300"
            >
              <div
                className={`w-14 h-14 rounded-full ${stat.iconBg} flex items-center justify-center`}
              >
                <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#003384] font-outfit">
                  {stat.value}
                </h2>
                <p className="text-[#6c829e] text-sm font-medium font-outfit">
                  {stat.label}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      {currentView === "staff" ? <CoursesTable /> : <EmployeeCourse />}
    </div>
  );
}
