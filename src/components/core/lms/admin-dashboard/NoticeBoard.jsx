import { CiMoneyBill } from "react-icons/ci";
import { FaGraduationCap, FaUser } from "react-icons/fa";
import { GiWhiteBook } from "react-icons/gi";

const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      title: "New Teacher",
      description:
        "It is a long established fact that a reader will be distracted by the readable...",
      date: "Just Now",
      icon: FaUser,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: 2,
      title: "New Fees Structure",
      description:
        "It is a long established fact that a reader will be distracted by the readable...",
      date: "Today",
      icon: CiMoneyBill,
      bgColor: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      id: 3,
      title: "Updated Syllabus",
      description:
        "It is a long established fact that a reader will be distracted by the readable...",
      date: "17 Dec 2020",
      icon: GiWhiteBook,
      bgColor: "bg-teal-100",
      iconColor: "text-teal-500",
    },
    {
      id: 4,
      title: "New Course",
      description:
        "It is a long established fact that a reader will be distracted by the readable...",
      date: "27 Oct 2020",
      icon: FaGraduationCap,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
    },
  ];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full">
      <h3 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit mb-4">
        Notice board
      </h3>

        <div className="space-y-4">
          {notices.map((notice) => {
            const IconComponent = notice.icon;
            return (
              <div key={notice.id} className="flex items-start gap-4">
                <div className={`${notice.bgColor} p-3 rounded`}>
                  <IconComponent className={`w-6 h-6 ${notice.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-slate-800 text-base font-outfit">
                      {notice.title}
                    </h3>
                    <span className="text-sm text-slate-400 whitespace-nowrap ml-2 font-outfit">
                      {notice.date}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm line-clamp-2 font-outfit">
                    {notice.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      <button className="w-full mt-5 py-2.5 bg-btnColor/10 text-btnColor font-medium rounded-lg hover:bg-btnColor hover:text-white transition-colors font-outfit text-sm">
        View all
      </button>
    </div>
  );
};

export default NoticeBoard;
