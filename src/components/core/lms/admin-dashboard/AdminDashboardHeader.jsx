import { Button, ConfigProvider } from "antd";
import { FaGraduationCap, FaUserAlt } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import { useMemo } from "react";
import { useGetAllCourses } from "../../../../API/lms-apis/course";
import moment from "moment";
import StarLoader from "../../loaders/StarLoader";

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-9">
        <div className="rounded-xl bg-[rgb(10,31,52)] overflow-hidden shadow-sm">
          <div className="flex justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-0 px-6 md:px-8 py-6 md:py-8">
              <div className="flex flex-col justify-between gap-8 text-white">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-bold font-outfit tracking-tight">
                    LMS Overview
                  </h2>
                  <p className="text-base text-gray-300 font-outfit">
                    Organization-wide course and learning analytics.
                  </p>
                </div>
                <div className="flex flex-wrap gap-6">
                  <div className="flex gap-3 items-center">
                    <div className="rounded-xl bg-btnColor/20 border border-btnColor/40 p-3">
                      <FaGraduationCap size={22} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-white font-outfit block">
                        Total Courses
                      </span>
                      <span className="text-sm text-gray-300 font-outfit">
                        {isLoadingCourses ? (
                          <StarLoader size={20} />
                        ) : (
                          statsData?.totalCourses
                        )}{" "}
                        in catalog
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="rounded-xl bg-btnColor/20 border border-btnColor/40 p-3">
                      <FaUserAlt size={22} className="text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-white font-outfit block">
                        Active
                      </span>
                      <span className="text-sm text-gray-300 font-outfit">
                        {statsData?.courseInProgress} in progress
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block self-center pr-6">
              <img
                src="https://edulearn-lms-admin-template.multipurposethemes.com/images/svg-icon/color-svg/custom-30.svg"
                alt=""
                className="object-contain w-40 h-32 opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 text-center">
          <h3 className="text-base font-medium text-[rgb(10,31,52)] font-outfit mb-3">
            Quick actions
          </h3>
          <ConfigProvider theme={{ token: { colorPrimary: "#00bcc2" } }}>
            <Button
              type="primary"
              className="w-full font-outfit font-medium"
              size="large"
              onClick={() => openCourseDrawer({ drawerName: "create-course" })}
            >
              <MdAdd size={20} />
              <span className="font-outfit">Create New Course</span>
            </Button>
          </ConfigProvider>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-xs font-medium text-main-text-color font-outfit mb-1">
              In progress
            </p>
            <p className="text-2xl font-bold text-[rgb(10,31,52)] font-outfit tabular-nums">
              {isLoadingCourses ? (
                <StarLoader size={20} />
              ) : (
                statsData?.courseInProgress
              )}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <p className="text-xs font-medium text-main-text-color font-outfit mb-1">
              Total courses
            </p>
            <p className="text-2xl font-bold text-[rgb(10,31,52)] font-outfit tabular-nums">
              {isLoadingCourses ? (
                <StarLoader size={20} />
              ) : (
                statsData?.totalCourses
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
