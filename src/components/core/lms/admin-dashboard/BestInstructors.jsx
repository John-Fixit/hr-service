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

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
        <h3 className="text-base font-semibold tracking-tight text-[#17263c] font-outfit">
          Top instructors
        </h3>
        <button className="text-xs font-semibold text-[#6258e8] transition-colors hover:text-[#4d43c4] font-outfit">
          See all
        </button>
      </div>
      <div className="space-y-2.5 p-4">
        {topInstructors.length ? (
          topInstructors.map((instructor) => (
            <div
              key={instructor.creatorId}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3"
            >
              <div className="flex gap-4 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl font-semibold text-sm font-outfit ${instructor.color.bg} ${instructor.color.text}`}
                >
                  {instructor.initials}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 font-outfit">
                    {instructor.course?.CREATOR_FULLNAME ||
                      instructor.course?.CREATOR_EMAIL ||
                      `Creator ${instructor.creatorId}`}
                  </h3>
                  <span className="text-xs font-medium text-slate-500 font-outfit">
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
                className="rounded-lg bg-[#f0eeff] px-3 py-1.5 text-xs font-semibold text-[#6258e8] transition-colors hover:bg-[#e5e2ff] font-outfit"
              >
                Courses
              </button>
            </div>
          ))
        ) : (
          <p className="py-6 text-center text-sm text-slate-500 font-outfit">
            No instructor data yet. Create courses to see top creators.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestInstructors;
