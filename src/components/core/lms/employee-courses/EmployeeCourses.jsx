import { BsClockHistory } from "react-icons/bs";
import PropTypes from "prop-types";
import { useCourseStore } from "../../../../hooks/useCourseStore";

const EmployeeCourse = () => {
  const courses = [
    {
      id: 1,
      title: "UX/UI Design Essentials: Designing User-Centered Interfaces",
      duration: "10h 50m",
      completedLessons: 12,
      totalLessons: 12,
      progress: 100,
      image:
        "https://learnup-shreethemes.netlify.app/assets/courses-3-mi7Bl9dw.jpg",
      gradient: "from-purple-600 via-purple-500 to-blue-400",
      showPhone: true,
    },
    {
      id: 2,
      title: "Backend Development With Node.Js: Building Scalable Web Apps",
      duration: "20h 10m",
      completedLessons: 7,
      totalLessons: 18,
      progress: 40,
      image:
        "https://learnup-shreethemes.netlify.app/assets/courses-4-CREbt8PX.jpg",
      gradient: "from-gray-900 to-gray-800",
    },
    {
      id: 3,
      title: "Web Development Bootcamp: Learn To Build Modern Websites",
      duration: "12h 40m",
      completedLessons: 17,
      totalLessons: 17,
      progress: 100,
      image:
        "https://learnup-shreethemes.netlify.app/assets/courses-5-DdvXBrn5.jpg",
      gradient: "from-cyan-400 via-blue-500 to-pink-500",
      showSocial: true,
    },
    {
      id: 4,
      title: "The Complete AI Guide: Learn ChatGPT, Generative AI & More..",
      duration: "17h 15m",
      completedLessons: 10,
      totalLessons: 6,
      progress: 60,
      image:
        "https://learnup-shreethemes.netlify.app/assets/courses-6-DznzC-8V.jpg",
      gradient: "from-cyan-400 via-blue-500 to-pink-500",
      showSocial: true,
    },
    {
      id: 5,
      title: "Advanced WordPress Techniques: Dive Deep into Styling and Layout",
      duration: "14h 20m",
      completedLessons: 32,
      totalLessons: 32,
      progress: 100,
      image:
        "https://learnup-shreethemes.netlify.app/assets/courses-7-BxfEZsjC.jpg",
      gradient: "from-cyan-400 via-blue-500 to-pink-500",
      showSocial: true,
    },
    {
      id: 6,
      title: "Advanced WordPress Techniques: Dive Deep into Styling and Layout",
      duration: "22h 10m",
      completedLessons: 22,
      totalLessons: 15,
      progress: 70,
      image:
        "https://learnup-shreethemes.netlify.app/assets/courses-8-Co39ajV9.jpg",
      gradient: "from-cyan-400 via-blue-500 to-pink-500",
      showSocial: true,
    },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default EmployeeCourse;

const CourseCard = ({ course }) => {
  const { openCourseDrawer } = useCourseStore();
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow- border border-gray-200">
      <div className={`relative h-64 bg-gradient overflow-hidden`}>
        <div className="absolute top-4 left-4 bg-[#122a3e] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold font-Outfit">
          <BsClockHistory className="h-3.5 w-3.5" />
          {course.duration}
        </div>
        <img
          src={course.image}
          alt=""
          className="object-cover object-center h-full w-full"
        />
      </div>
      <div className="p-5">
        <h3 className="font-medium text-gray-800 text-[15.5px] mb-4 leading-snug font-Outfit min-h-[48px]">
          {course.title}
        </h3>

        <div className="flex justify-between items-center mb-2">
          <span className="text-[13px] font-medium font-Outfit text-[#003384]">
            {course.completedLessons} Of {course.totalLessons} Lessons Complete
          </span>
          <span className={`text-base font-bold text-[#003384] font-outfit`}>
            {course.progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full rounded-full ${
              course.progress === 100 ? "bg-emerald-500" : "bg-yellow-400"
            }`}
            style={{
              width: `${course.progress}%`,
              background:
                course.progress === 100
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
        <button
          className="w-full py-2 border-2 border-gray-200/60 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-outfit"
          onClick={() =>
            openCourseDrawer({
              drawerName: "course-detail",
              courseDetail: course,
            })
          }
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
        </button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};
