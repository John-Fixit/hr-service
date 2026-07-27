import { Drawer } from "antd";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import { useGetCreatorCourses } from "../../../../API/lms-apis/course";
import { getCompoundPeriod, toStringDate } from "../../../../utils/utitlities";
import dayjs from "dayjs";
import clsx from "clsx";
import StarLoader from "../../loaders/StarLoader";
import CreatorCourseDetail from "../courses/creator-course-detail/CreatorCourseDetail";

const checkCourseExpiration = (end_date) => {
  const remaining_days = dayjs(end_date).diff(dayjs(), "day");
  return remaining_days < 0;
};

const getInitials = (creatorId) => {
  const s = String(creatorId);
  if (s.length >= 2) return s.slice(0, 2).toUpperCase();
  return s.toUpperCase().padStart(2, "0");
};

const AdminCreatorCoursesDrawer = () => {
  const { isOpen, closeCourseDrawer, data, updateData } = useCourseStore();
  const creatorId = data?.creatorId ?? null;
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const { data: coursesResponse, isPending: isLoadingCourses } =
    useGetCreatorCourses(creatorId);

  const allCourses = useMemo(
    () =>
      Array.isArray(coursesResponse)
        ? coursesResponse
        : (coursesResponse?.data ?? []),
    [coursesResponse],
  );

  const totalPages = Math.max(1, Math.ceil(allCourses.length / rowsPerPage));
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return allCourses.slice(start, start + rowsPerPage);
  }, [allCourses, currentPage, rowsPerPage]);

  const handleViewCourse = (course) => {
    updateData({ courseDetail: { ...course } });
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    updateData({ courseDetail: undefined });
  };

  const handleClose = () => {
    setViewMode("list");
    setCurrentPage(1);
    updateData({ courseDetail: undefined, creatorId: undefined });
    closeCourseDrawer();
  };

  if (!creatorId) return null;

  return (
    <Drawer
      width={viewMode === "detail" ? 1500 : 1200}
      open={isOpen}
      onClose={handleClose}
      title={
        viewMode === "list" ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-btnColor/15 text-btnColor flex items-center justify-center font-semibold text-sm font-outfit">
              {getInitials(creatorId)}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit">
                Courses by Creator {creatorId}
              </h2>
              <p className="text-sm text-gray-500 font-outfit">
                {allCourses.length} course{allCourses.length !== 1 ? "s" : ""} ·
                Click a course to view as creator
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBackToList}
              className="flex items-center gap-1 text-gray-600 hover:text-[rgb(10,31,52)] font-outfit text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to list
            </button>
          </div>
        )
      }
      styles={{ body: { paddingTop: 16 } }}
    >
      {viewMode === "list" ? (
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[rgb(10,31,52)] text-white">
                  <th className="text-left py-3 px-4 font-semibold text-sm rounded-l-lg font-outfit">
                    Course
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-sm font-outfit">
                    Category
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-sm font-outfit">
                    Period
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-sm font-outfit">
                    Ends
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-sm rounded-r-lg font-outfit">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoadingCourses ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex h-40 items-center justify-center">
                        <StarLoader />
                      </div>
                    </td>
                  </tr>
                ) : allCourses.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <p className="text-center text-gray-500 font-outfit py-8">
                        No courses found for this creator.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedCourses.map((course, idx) => (
                    <tr
                      key={course.COURSE_ID ?? idx}
                      className="border-b border-gray-200 hover:bg-gray-50/50"
                    >
                      <td className="py-3 px-4">
                        <div
                          className="flex items-center gap-3 cursor-pointer group"
                          onClick={() => handleViewCourse(course)}
                        >
                          <img
                            src={course.COURSE_PREVIEW_IMAGE}
                            alt={course.COURSE_TITLE}
                            className="w-14 h-10 rounded-lg object-cover bg-gray-100"
                          />
                          <span className="font-medium text-gray-900 group-hover:text-btnColor transition-colors font-outfit text-sm">
                            {course.COURSE_TITLE}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4 text-gray-600 text-sm font-outfit">
                        {course.COURSE_CATEGORY ?? "—"}
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium font-outfit">
                          {getCompoundPeriod(
                            course.START_DATE,
                            course.END_DATE,
                          )}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span
                          className={clsx(
                            "text-sm font-outfit",
                            checkCourseExpiration(course?.END_DATE)
                              ? "text-red-500"
                              : "text-gray-600",
                          )}
                        >
                          {toStringDate(course.END_DATE)}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleViewCourse(course)}
                          className="px-3 py-1.5 rounded-lg bg-btnColor/10 text-btnColor hover:bg-btnColor/20 text-sm font-medium font-outfit transition-colors"
                        >
                          View as creator
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {allCourses.length > rowsPerPage && (
            <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100">
              <p className="text-gray-500 text-sm font-outfit">
                Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                {Math.min(currentPage * rowsPerPage, allCourses.length)} of{" "}
                {allCourses.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50 font-outfit"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={clsx(
                        "w-8 h-8 rounded text-sm font-medium font-outfit",
                        currentPage === page
                          ? "bg-sidebarBg text-white"
                          : "text-gray-600 hover:bg-gray-100",
                      )}
                    >
                      {page}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50 font-outfit"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <CreatorCourseDetail />
      )}
    </Drawer>
  );
};

export default AdminCreatorCoursesDrawer;
