import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const courseCategories = [
  {
    id: 1,
    name: "UI/UX Design",
    abbreviation: "U",
    courseCount: "30+",
    bgColor: "bg-yellow-400",
    buttonColor: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
  },
  {
    id: 2,
    name: "Marketing",
    abbreviation: "M",
    courseCount: "25+",
    bgColor: "bg-pink-500",
    buttonColor: "bg-pink-50 text-pink-600 hover:bg-pink-100",
  },
  {
    id: 3,
    name: "Web Dev.",
    abbreviation: "W",
    courseCount: "30+",
    bgColor: "bg-teal-400",
    buttonColor: "bg-teal-50 text-teal-600 hover:bg-teal-100",
  },
  {
    id: 4,
    name: "Mathematics",
    abbreviation: "M",
    courseCount: "50+",
    bgColor: "bg-blue-500",
    buttonColor: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
];

const PopularCourses = () => {
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
            {courseCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm py-4 px-5 flex justify-between items-center gap-5"
              >
                <div className="flex gap-4 items-center">
                  <div
                    className={`h-14 w-14 flex items-center justify-center ${category.bgColor} rounded font-semibold uppercase text-white text-xl font-outfit`}
                  >
                    {category.abbreviation}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 font-outfit">
                      {category.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-400 font-outfit">
                      {category.courseCount} Courses
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className={`px-4 py-2 rounded font-medium text-sm transition-colors font-outfit ${category.buttonColor}`}
                  >
                    View Courses
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                    <PiDotsThreeOutlineVerticalFill className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularCourses;
