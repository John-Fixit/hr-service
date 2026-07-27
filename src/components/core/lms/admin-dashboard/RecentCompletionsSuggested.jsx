import { FaGraduationCap } from "react-icons/fa";

/**
 * Suggested section: Recent Completions
 * Data to implement: API that returns recent course/lesson completions across the org.
 * Suggested payload: { STAFF_NAME, COURSE_TITLE, COMPLETED_AT, PROGRESS_PERCENT }[]
 * Possible endpoints: GET /course/get-recent-completions or aggregate from
 * lesson-recipient completion logs by COMPLETED_AT desc, with course and staff info.
 */
const RecentCompletionsSuggested = () => {
  const placeholders = [
    { name: "—", course: "—", date: "—" },
    { name: "—", course: "—", date: "—" },
    { name: "—", course: "—", date: "—" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-[rgb(10,31,52)] font-outfit">
          Recent Completions
        </h3>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-outfit">
          Suggested
        </span>
      </div>
      <p className="text-main-text-color text-sm font-outfit mb-4">
        Latest course completions across the organization. Connect an API to show real data.
      </p>
      <div className="space-y-3">
        {placeholders.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="w-10 h-10 rounded-lg bg-btnColor/10 flex items-center justify-center flex-shrink-0">
              <FaGraduationCap className="w-5 h-5 text-btnColor" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800 font-outfit truncate">
                {item.name}
              </p>
              <p className="text-xs text-main-text-color font-outfit truncate">
                {item.course} · {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCompletionsSuggested;
