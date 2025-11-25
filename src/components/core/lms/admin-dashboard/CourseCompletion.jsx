const CourseCompletion = () => {
  const data = [
    { label: "In Progress", percentage: 40, users: 117, color: "#22d3ee" },
    { label: "Completed", percentage: 20, users: 74, color: "#22c55e" },
    { label: "Inactive", percentage: 18, users: 58, color: "#fbbf24" },
    { label: "Expired", percentage: 7, users: 11, color: "#ec4899" },
    { label: "In Progress", percentage: 40, users: 117, color: "#22d3ee" },
    { label: "Completed", percentage: 20, users: 74, color: "#22c55e" },
  ];
  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl text-slate-800 font-normal font-outfit">
          Course completion
        </h1>
        <button className="bg-cyan-500 text-white hover:text-cyan-500 text-sm font-medium px-3 py-1 rounded-full border border-cyan-500 hover:bg-cyan-50 transition-colors font-outfit">
          View All
        </button>
      </div>

      <div className="space-y-5">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <div className="text-right w-12">
                <span className="text-slate-700 font-medium text-sm font-outfit">
                  {item.percentage.toString().padStart(2, "0")}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span
                className="text-sm font-medium font-outfit"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
              <span className="text-gray-400 text-sm font-outfit">
                {item.users} User
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCompletion;
