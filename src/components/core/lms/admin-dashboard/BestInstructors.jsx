import { useMemo } from "react";
import { useGetAllCourses } from "../../../../API/lms-apis/course";
import { useCourseStore } from "../../../../hooks/useCourseStore";

const AVATAR_COLORS = [
  { bg: "bg-btnColor/15", text: "text-btnColor" },
  { bg: "bg-[rgb(10,31,52)]/10", text: "text-[rgb(10,31,52)]" },
  { bg: "bg-amber-500/15", text: "text-amber-600" },
  { bg: "bg-emerald-500/15", text: "text-emerald-600" },
  { bg: "bg-violet-500/15", text: "text-violet-600" },
];

const getInitials = (creatorId) => {
  const s = String(creatorId);
  if (s.length >= 2) return s.slice(0, 2).toUpperCase();
  return s.toUpperCase().padStart(2, "0");
};

const BestInstructors = () => {
  const { openCourseDrawer } = useCourseStore();
  const { data: coursesData } = useGetAllCourses();
  const allCourses = useMemo(
    () => coursesData?.data ?? (Array.isArray(coursesData) ? coursesData : []),
    [coursesData],
  );

  const topInstructors = useMemo(() => {
    if (!allCourses?.length) return [];
    const byCreator = {};
    allCourses.forEach((course) => {
      const id = course?.CREATOR;
      if (id != null)
        byCreator[id] = {
          count: (byCreator[id]?.count || 0) + 1,
          course: course,
        };
    });
    return Object.entries(byCreator)
      .map(([creatorId, data]) => ({
        creatorId: Number(creatorId),
        courseCount: data.count,
        course: data.course,
        initials: getInitials(
          data?.course?.CREATOR_FULLNAME ||
            data?.course?.CREATOR_EMAIL ||
            creatorId,
        ),
      }))
      .sort((a, b) => b.courseCount - a.courseCount)
      .slice(0, 5)
      .map((instructor, index) => ({
        ...instructor,
        color: AVATAR_COLORS[index % AVATAR_COLORS.length],
      }));
  }, [allCourses]);

  console.log(topInstructors);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit">
          Top instructors
        </h3>
        <button className="text-sm font-medium text-btnColor hover:underline font-outfit">
          See all
        </button>
      </div>
      <div className="p-4 space-y-3">
        {topInstructors.length ? (
          topInstructors.map((instructor) => (
            <div
              key={instructor.creatorId}
              className="bg-gray-50/80 rounded-lg py-3 px-4 flex justify-between items-center border border-gray-100"
            >
              <div className="flex gap-4 items-center">
                <div
                  className={`h-12 w-12 flex items-center justify-center rounded-xl font-semibold text-sm font-outfit ${instructor.color.bg} ${instructor.color.text}`}
                >
                  {instructor.initials}
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 font-outfit">
                    {instructor.course?.CREATOR_FULLNAME ||
                      instructor.course?.CREATOR_EMAIL ||
                      `Creator ${instructor.creatorId}`}
                  </h3>
                  <span className="text-sm font-medium text-gray-400 font-outfit">
                    {instructor.courseCount} course
                    {instructor.courseCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  openCourseDrawer({
                    drawerName: "creator-courses-list",
                    creatorId: instructor.creatorId,
                  })
                }
                className="px-3 py-1.5 bg-btnColor/10 text-btnColor hover:bg-btnColor/20 rounded-lg text-sm font-medium transition-colors font-outfit"
              >
                Courses
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 font-outfit py-4 text-center">
            No instructor data yet. Create courses to see top creators.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestInstructors;
