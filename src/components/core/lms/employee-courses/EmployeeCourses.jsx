import { BsClockHistory } from "react-icons/bs";
import PropTypes from "prop-types";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import { dayDifference, getCompoundPeriod } from "../../../../utils/utitlities";
import { errorToast } from "../../../../utils/toastMsgPop";
import { useMutateCourseDetail } from "../../../../API/lms-apis/course";
import { useMemo, useState } from "react";
import { Button, Pagination } from "@nextui-org/react";
import StarLoader from "../../loaders/StarLoader";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const EmployeeCourse = ({ courses, isLoading }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPerPage = 9;

  const totalPages = Math.ceil(courses.length / totalPerPage);

  const visibleCourses = useMemo(() => {
    return courses.slice(
      (currentPage - 1) * totalPerPage,
      currentPage * totalPerPage
    );
  }, [courses, currentPage]);

  return (
    <div className="">
      <div className="flex justify-between items-center pb-4 pt-2">
        <h2 className="text-lg tracking-wide font-bold text-[#022e75] font-Outfit">
          Browse All Courses
        </h2>
        <button className="text-[#6c829e] text-base font-medium hover:text-[#6c829e] text-[15px] transition-all font-Outfit">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {visibleCourses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        {isLoading ? (
          <div className="col-span-3">
            <div className="flex items-center justify-center min-h-56">
              <StarLoader size={25} />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex justify-center">
        <Pagination
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EmployeeCourse;

const CourseCard = ({ course }) => {
  const {userData} = useCurrentUser();
  const { openCourseDrawer } = useCourseStore();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { mutateAsync: mutateCourseDetail, isPending: isGettingDetail } =
    useMutateCourseDetail(userData?.data?.STAFF_ID);

  const handleViewCourse = async (course) => {
    setSelectedCourse(course?.COURSE_ID);
    try {
      const detail_res = await mutateCourseDetail(course.COURSE_ID);
      openCourseDrawer({
        drawerName: "course-detail",
        courseDetail: { ...course, ...detail_res },
      });
    } catch (error) {
      errorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load course details."
      );
    }
  };


  const calculateProgressScore = useMemo(()=>{
    const ps = Number(course?.COMPLETED_LESSONS) / Number(course?.TOTAL_LESSONS) * 100
    return ps
  }, [course?.COMPLETED_LESSONS, course?.TOTAL_LESSONS])

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow- border border-gray-200">
      <div className={`relative h-64 bg-gradient overflow-hidden`}>
        <div className="absolute top-4 left-4 bg-[#122a3e] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold font-Outfit">
          <BsClockHistory className="h-3.5 w-3.5" />
          {getCompoundPeriod(course.START_DATE, course.END_DATE)}
        </div>
        <img
          src={course.COURSE_PREVIEW_IMAGE}
          alt=""
          className="object-cover object-center h-full w-full"
        />
      </div>
      <div className="p-5">
        <h3 className="font-medium text-gray-800 text-[15.5px] leading-snug font-Outfit">
          {course.COURSE_TITLE}
        </h3>

        <div className="flex justify-between items-center mb-2">
          <span className="text-[13px] font-medium font-Outfit text-[#003384]">
            {course?.COMPLETED_LESSONS} Of {course?.TOTAL_LESSONS} Lessons Complete
          </span>
          <span className={`text-base font-bold text-[#003384] font-outfit`}>
            {calculateProgressScore || 0}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full ${
              calculateProgressScore === 100 ? "bg-emerald-500" : "bg-yellow-400"
            }`}
            style={{
              width: `${calculateProgressScore || 0}%`,
              background:
                calculateProgressScore === 100
                  ? "repeating-linear-gradient(45deg, #10b981, #10b981 10px, #059669 10px, #059669 20px)"
                  : `repeating-linear-gradient(
  45deg,
  #ffc008,
  #ffc008 10px,
  #ffca47 10px,
  #ffca47 20px
)`,
            }}
          />
        </div>

        {/* Resume Button */}
        <Button
          className="w-full py-2 border-2 border-gray-200/60 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-outfit"
          onClick={() => handleViewCourse(course)}
          variant="light"
          isLoading={isGettingDetail && selectedCourse === course?.COURSE_ID}
        >
          View Course
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

EmployeeCourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};
