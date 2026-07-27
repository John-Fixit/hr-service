import { BookOpen, ChevronRight, Mail } from "lucide-react";

const UpcomingLessons = () => {
  const lessons = [
    {
      id: 1,
      title: "Informatic Course",
      instructor: "Nil Yeager",
      date: "19 April",
      icon: "book",
      color: "bg-amber-400",
    },
    {
      id: 2,
      title: "Live Drawing",
      instructor: "Micak Doe",
      date: "12 June",
      icon: "mail",
      color: "bg-cyan-500",
    },
    {
      id: 3,
      title: "Contemporary Art",
      instructor: "Potar doe",
      date: "27 July",
      icon: "book",
      color: "bg-pink-500",
    },
    {
      id: 4,
      title: "Live Drawing",
      instructor: "Micak Doe",
      date: "12 June",
      icon: "mail",
      color: "bg-violet-600",
    },
  ];

  const getIcon = (type, color) => {
    const iconClass = "w-5 h-5 text-white";
    return (
      <div
        className={`${color} w-14 h-14 rounded flex items-center justify-center`}
      >
        {type === "book" ? (
          <BookOpen className={iconClass} />
        ) : (
          <Mail className={iconClass} />
        )}
      </div>
    );
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit">
          Upcoming lessons
        </h3>
        <button className="text-sm font-medium text-btnColor hover:underline font-outfit">
          View all
        </button>
      </div>
      <div className="p-4 space-y-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-gray-50/80 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100/80 border border-gray-100 transition-colors"
          >
              <div className="flex items-center gap-4">
                {getIcon(lesson.icon, lesson.color)}
                <div>
                  <h3 className="text-slate-800 font-[500] text-base font-outfit">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-400 font-medium text-sm font-outfit">
                    {lesson.instructor}, {lesson.date}
                  </p>
                </div>
              </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLessons;
