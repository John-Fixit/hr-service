import { useGetPopularCourses } from "../../../../API/lms-apis/lms-dashboard";

const colorVariants = [
  {
    bgColor: "bg-[#6258e8]",
    buttonColor:
      "bg-btnColor/10 text-btnColor hover:bg-btnColor/20 font-outfit",
  },
  {
    bgColor: "bg-[#294d68]",
    buttonColor:
      "bg-[rgb(10,31,52)]/10 text-[rgb(10,31,52)] hover:bg-[rgb(10,31,52)]/20 font-outfit",
  },
  {
    bgColor: "bg-amber-500",
    buttonColor: "bg-amber-50 text-amber-700 hover:bg-amber-100 font-outfit",
  },
  {
    bgColor: "bg-emerald-500",
    buttonColor:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-outfit",
  },
];

const PopularCourses = () => {
  const { data: popularCourses } = useGetPopularCourses();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-[#17263c] font-outfit">
            Popular by category
          </h3>
          <p className="mt-1 text-xs text-slate-500 font-outfit">
            Course count per category
          </p>
        </div>
        <button className="text-xs font-semibold text-[#6258e8] transition-colors hover:text-[#4d43c4] font-outfit">
          All courses
        </button>
      </div>
      <div className="space-y-2.5 p-4">
        {popularCourses?.length ? (
          popularCourses?.slice(0, 5)?.map((item, index) => {
            const variant = colorVariants[index % colorVariants.length];
            const name = item.COURSE_CATEGORY || "Unknown";
            const abbreviation = name?.[0]?.toUpperCase() || "?";

            return (
              <div
                key={`${name}-${index}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/70 px-3.5 py-3 transition-colors hover:border-slate-200 hover:bg-slate-50"
              >
                <div className="flex gap-3 items-center min-w-0">
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${variant.bgColor} text-base font-semibold uppercase text-white font-outfit`}
                  >
                    {abbreviation}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-800 font-outfit">
                      {name}
                    </h3>
                    <span className="text-xs font-medium text-slate-500 font-outfit">
                      {item.TOTAL_COURSES} courses
                    </span>
                  </div>
                </div>
                {/* <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${variant.buttonColor}`}
                  >
                    View
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                    <PiDotsThreeOutlineVerticalFill className="w-5 h-5 text-gray-500" />
                  </button>
                </div> */}
              </div>
            );
          })
        ) : (
          <p className="py-6 text-center text-sm text-slate-500 font-outfit">
            No categories yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PopularCourses;
