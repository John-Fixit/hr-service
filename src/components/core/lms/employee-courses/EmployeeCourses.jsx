import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import PropTypes from "prop-types";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import { getCompoundPeriod } from "../../../../utils/utitlities";
import { errorToast } from "../../../../utils/toastMsgPop";
import { useMutateCourseDetail } from "../../../../API/lms-apis/course";
import { useMemo, useState } from "react";
import { Button, Pagination } from "@nextui-org/react";
import StarLoader from "../../loaders/StarLoader";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const EmployeeCourse = ({ courses, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [progressFilter, setProgressFilter] = useState("all");
  const totalPerPage = 9;

  const categories = useMemo(
    () => [...new Set(courses.map((course) => course?.COURSE_CATEGORY).filter(Boolean))],
    [courses],
  );

  const filteredCourses = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesSearch =
        !query ||
        [course?.COURSE_TITLE, course?.COURSE_CATEGORY, course?.COURSE_DESCRIPTION]
          .some((value) => String(value || "").toLowerCase().includes(query));
      const matchesCategory =
        categoryFilter === "all" || course?.COURSE_CATEGORY === categoryFilter;
      const completedLessons = Number(course?.COMPLETED_LESSONS) || 0;
      const totalLessons = Number(course?.TOTAL_LESSONS) || 0;
      const isComplete = totalLessons > 0 && completedLessons >= totalLessons;
      const isInProgress = completedLessons > 0 && !isComplete;
      const matchesProgress =
        progressFilter === "all" ||
        (progressFilter === "completed" && isComplete) ||
        (progressFilter === "in-progress" && isInProgress) ||
        (progressFilter === "not-started" && completedLessons === 0);

      return matchesSearch && matchesCategory && matchesProgress;
    });
  }, [courses, searchValue, categoryFilter, progressFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / totalPerPage));

  const visibleCourses = useMemo(() => {
    return filteredCourses.slice(
      (currentPage - 1) * totalPerPage,
      currentPage * totalPerPage,
    );
  }, [filteredCourses, currentPage]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6258e8]">
            Course catalog
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#17263c]">
            Browse your courses
          </h2>
        </div>
        <p className="text-sm text-slate-500">
          Showing {filteredCourses.length} of {courses.length} assigned
        </p>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_220px_200px]">
        <label className="relative block">
          <span className="sr-only">Search courses</span>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search title, category, or description"
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />
        </label>
        <label className="relative">
          <span className="sr-only">Filter by category</span>
          <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(event) => {
              setCategoryFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Filter by progress</span>
          <select
            value={progressFilter}
            onChange={(event) => {
              setProgressFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
          >
            <option value="all">All progress</option>
            <option value="not-started">Not started</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleCourses?.map((course) => (
          <CourseCard key={course.COURSE_ID} course={course} />
        ))}
        {isLoading ? (
          <div className="col-span-full">
            <div className="flex min-h-56 items-center justify-center rounded-2xl border border-slate-200 bg-white">
              <StarLoader size={25} />
            </div>
          </div>
        ) : !courses.length ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0eeff] text-[#6258e8]">
              <BookOpen className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-slate-800">
              No courses assigned yet
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
              Courses assigned to you will appear here when they become
              available.
            </p>
          </div>
        ) : !filteredCourses.length ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <h3 className="text-base font-semibold text-slate-800">
              No courses match these filters
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try another search or clear the selected filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                setCategoryFilter("all");
                setProgressFilter("all");
                setCurrentPage(1);
              }}
              className="mt-4 rounded-lg bg-[#f0eeff] px-4 py-2 text-sm font-semibold text-[#5146d8] transition hover:bg-[#e5e2ff]"
            >
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
      {filteredCourses.length > totalPerPage && (
        <div className="flex justify-center">
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeCourse;

const CourseCard = ({ course }) => {
  const { userData } = useCurrentUser();
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
          "Failed to load course details.",
      );
    }
  };

  const calculateProgressScore = useMemo(() => {
    const totalLessons = Number(course?.TOTAL_LESSONS) || 0;
    const completedLessons = Number(course?.COMPLETED_LESSONS) || 0;
    if (!totalLessons) return 0;
    return Math.min(100, Math.round((completedLessons / totalLessons) * 100));
  }, [course?.COMPLETED_LESSONS, course?.TOTAL_LESSONS]);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-24px_rgba(15,23,42,0.4)]">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#eeedff] via-[#e8eaf4] to-[#dce3ed]">
        {course.COURSE_PREVIEW_IMAGE ? (
          <img
            src={course.COURSE_PREVIEW_IMAGE}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#6258e8]/70">
            <BookOpen className="h-12 w-12" strokeWidth={1.2} />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/45 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
          <Clock3 className="h-3.5 w-3.5" />
          {getCompoundPeriod(course.START_DATE, course.END_DATE)}
        </span>
        {course.COURSE_CATEGORY && (
          <span className="absolute right-3 top-3 max-w-[60%] truncate rounded-full border border-white/50 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-700 backdrop-blur-sm">
            {course.COURSE_CATEGORY}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 tracking-tight text-slate-800 font-outfit">
          {course.COURSE_TITLE || "Untitled course"}
        </h3>

        <div className="mb-2 mt-4 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-500">
            {Number(course?.COMPLETED_LESSONS) || 0} of{" "}
            {Number(course?.TOTAL_LESSONS) || 0} lessons complete
          </span>
          <span className="text-sm font-semibold tabular-nums text-[#6258e8]">
            {calculateProgressScore || 0}%
          </span>
        </div>

        <div
          className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label={`${course.COURSE_TITLE || "Course"} completion`}
          aria-valuenow={calculateProgressScore}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={`h-full rounded-full transition-[width] duration-500 ${
              calculateProgressScore >= 100
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-[#6258e8] to-[#8d83f2]"
            }`}
            style={{ width: `${calculateProgressScore}%` }}
          />
        </div>

        <Button
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-violet-200 hover:bg-violet-50 hover:text-[#5146d8] font-outfit"
          onClick={() => handleViewCourse(course)}
          variant="light"
          isLoading={isGettingDetail && selectedCourse === course?.COURSE_ID}
        >
          Open course
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

EmployeeCourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};
