import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useGetPopularCourses } from "../../../../API/lms-apis/lms-dashboard";

const colorVariants = [
  { bgColor: "bg-btnColor", buttonColor: "bg-btnColor/10 text-btnColor hover:bg-btnColor/20 font-outfit" },
  { bgColor: "bg-[rgb(10,31,52)]", buttonColor: "bg-[rgb(10,31,52)]/10 text-[rgb(10,31,52)] hover:bg-[rgb(10,31,52)]/20 font-outfit" },
  { bgColor: "bg-amber-500", buttonColor: "bg-amber-50 text-amber-700 hover:bg-amber-100 font-outfit" },
  { bgColor: "bg-emerald-500", buttonColor: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-outfit" },
];

const PopularCourses = () => {
  const { data: popularCourses } = useGetPopularCourses();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit">
            Popular by category
          </h3>
          <p className="text-sm text-main-text-color font-outfit mt-0.5">
            Course count per category
          </p>
        </div>
        <button className="text-sm font-medium text-btnColor hover:underline font-outfit">
          All courses
        </button>
      </div>
      <div className="p-4 space-y-3">
        {popularCourses?.length ? (
          popularCourses.map((item, index) => {
            const variant = colorVariants[index % colorVariants.length];
            const name = item.COURSE_CATEGORY || "Unknown";
            const abbreviation = name?.[0]?.toUpperCase() || "?";

            return (
              <div
                key={`${name}-${index}`}
                className="bg-gray-50/80 rounded-lg py-3 px-4 flex justify-between items-center gap-4 border border-gray-100"
              >
                <div className="flex gap-3 items-center min-w-0">
                  <div
                    className={`h-12 w-12 flex items-center justify-center ${variant.bgColor} rounded-lg font-semibold uppercase text-white text-lg font-outfit flex-shrink-0`}
                  >
                    {abbreviation}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 font-outfit truncate">
                      {name}
                    </h3>
                    <span className="text-xs font-medium text-main-text-color font-outfit">
                      {item.TOTAL_COURSES} courses
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${variant.buttonColor}`}
                  >
                    View
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                    <PiDotsThreeOutlineVerticalFill className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-main-text-color font-outfit py-4 text-center">
            No categories yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PopularCourses;
