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
    <>
      <div className="bgwhite rounded-2xl shadow-sm py-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl text-slate-800 font-normal font-outfit">
            Upcoming Lessons
          </h1>
          <button className="bg-cyan-500 text-white hover:text-cyan-500 text-sm font-medium px-3 py-1 rounded-full border border-cyan-500 hover:bg-cyan-50 transition-colors font-outfit">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded p-4 flex items-center justify-between cursor-pointer hover:shadow-lg hover:translate-y-1 transition-all duration-300"
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
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpcomingLessons;
