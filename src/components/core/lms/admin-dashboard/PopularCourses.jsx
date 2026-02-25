import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useGetPopularCourses } from "../../../../API/lms-apis/lms-dashboard";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const colorVariants = [
  {
    bgColor: "bg-yellow-400",
    buttonColor: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
  },
  {
    bgColor: "bg-pink-500",
    buttonColor: "bg-pink-50 text-pink-600 hover:bg-pink-100",
  },
  {
    bgColor: "bg-teal-400",
    buttonColor: "bg-teal-50 text-teal-600 hover:bg-teal-100",
  },
  {
    bgColor: "bg-blue-500",
    buttonColor: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
];

const PopularCourses = () => {
  const { userData } = useCurrentUser();
  const { data: popularCourses } = useGetPopularCourses(
    userData?.data?.STAFF_ID,
  );

  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-3 mb-4">
          <h3 className="font-medium text-[1.3rem] font-outfit">
            Popular Courses
          </h3>
          <p className="cursor-pointer text-gray-500 text-sm px-3 py-1 hover:bg-gray-200 rounded-lg font-outfit">
            All courses
          </p>
        </div>
        <div>
          <div className="max-w-4xl mx-auto space-y-4">
            {popularCourses?.length ? (
              popularCourses.map((item, index) => {
                const variant = colorVariants[index % colorVariants.length];

                const name = item.COURSE_CATEGORY || "Unknown";
                const abbreviation = name?.[0]?.toUpperCase() || "?";

                return (
                  <div
                    key={`${name}-${index}`}
                    className="bg-white rounded-lg shadow-sm py-4 px-5 flex justify-between items-center gap-5"
                  >
                    <div className="flex gap-4 items-center">
                      <div
                        className={`h-14 w-14 flex items-center justify-center ${variant.bgColor} rounded font-semibold uppercase text-white text-xl font-outfit`}
                      >
                        {abbreviation}
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900 font-outfit">
                          {name}
                        </h3>
                        <span className="text-sm font-medium text-gray-400 font-outfit">
                          {item.TOTAL_COURSES} Courses
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        className={`px-4 py-2 rounded font-medium text-sm transition-colors font-outfit ${variant.buttonColor}`}
                      >
                        View Courses
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                        <PiDotsThreeOutlineVerticalFill className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 font-outfit">
                No popular courses found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCourses;
