const instructors = [
  {
    id: 1,
    name: "Nil Yeager",
    courses: "5 Design Course",
    avatar: "👨‍💼",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    name: "Theron Trump",
    courses: "5 Design Course",
    avatar: "👩‍💼",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    name: "Tyler Mark",
    courses: "5 Design Course",
    avatar: "👩",
    bgColor: "bg-blue-100",
  },
  {
    id: 4,
    name: "Johen Mark",
    courses: "5 Design Course",
    avatar: "👨",
    bgColor: "bg-blue-100",
  },
];
const BestInstructors = () => {
  return (
    <>
      <div>
        <div className="flex justify-between items-center gap-3 mb-4">
          <h3 className="font-medium text-[1.3rem] font-outfit">
            Best Instructors
          </h3>
          <p className="cursor-pointer text-gray-500 text-sm px-3 py-1 hover:bg-gray-200 rounded-lg font-outfit">
            See All
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white rounded-lg shadow-sm py-3 px-5 flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <div
                  className={`h-12 w-12 overflow-clip flex items-center justify-center ${instructor.bgColor} rounded-full text-4xl font-outfit`}
                >
                  {instructor.avatar}
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900 font-outfit">
                    {instructor.name}
                  </h3>
                  <span className="text-sm font-medium text-gray-400 font-outfit">
                    {instructor.courses}
                  </span>
                </div>
              </div>

              <button className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-900 font-medium transition-colors font-outfit">
                Courses
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BestInstructors;
