import { Drawer } from "antd";
import { useGetLessonBreakdown } from "../../../../../API/lms-apis/course";
import PropTypes from "prop-types";
import {
  FiMail,
  FiBook,
  FiCheckCircle,
  FiCircle,
  FiChevronDown,
  FiChevronRight,
  FiExternalLink,
  FiAward,
  FiBarChart2,
  FiCalendar,
  FiX,
} from "react-icons/fi";
import { MdOutlineQuiz, MdGrade } from "react-icons/md";
import { useMemo, useState } from "react";
import StarLoader from "../../../loaders/StarLoader";

const getInitials = (n) =>
  (n || "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Avatar({ name, color, size = 40 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: color || "#0f1b35",
        fontSize: size * 0.38,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

function LessonRow({
  lesson,
  index,
  expandedGradeId,
  onToggleGrade,
  onSaveGrade,
}) {
  const isUploadQuiz =
    lesson?.HAS_QUIZ &&
    (lesson?.QUIZ_TYPE === "upload" ||
      lesson?.UPLOADED_ANSWER_FILE_URL ||
      lesson?.ANSWER_FILE_URL);
  const showGradeSection = isUploadQuiz;
  const isExpanded = expandedGradeId === lesson?.LESSON_RECIPIENT_ID;
  const [gradeValue, setGradeValue] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (onSaveGrade) {
      setSaving(true);
      Promise.resolve(
        onSaveGrade(lesson?.LESSON_RECIPIENT_ID, lesson?.LESSON_ID, gradeValue),
      ).finally(() => {
        setSaving(false);
        setGradeValue("");
      });
    }
  };

  const uploadedUrl =
    lesson?.UPLOADED_ANSWER_FILE_URL ||
    lesson?.ANSWER_FILE_URL ||
    lesson?.QUIZ_UPLOAD_ANSWER_URL;

  return (
    <div
      className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 transition-colors"
      style={{ fontFamily: "Sora, sans-serif" }}
    >
      <div className="flex items-start gap-4 p-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-800 text-[13px]">
            {lesson?.LESSON_TITLE || "Untitled lesson"}
          </h4>
          {lesson?.LESSON_DESCRIPTION ? (
            <p className="text-slate-500 text-xs mt-1 line-clamp-2">
              {lesson.LESSON_DESCRIPTION}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                lesson?.IS_COMPLETED
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {lesson?.IS_COMPLETED ? (
                <FiCheckCircle className="w-3.5 h-3.5" />
              ) : (
                <FiCircle className="w-3.5 h-3.5" />
              )}
              {lesson?.IS_COMPLETED ? "Completed" : "Not completed"}
            </span>
            {lesson?.HAS_QUIZ && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                <MdOutlineQuiz className="w-3.5 h-3.5" />
                Quiz: {lesson?.TOTAL_QUIZZES || 0} q · Score:{" "}
                {lesson?.SCORE != null ? lesson.SCORE : "—"} /{" "}
                {lesson?.TOTAL_QUIZ_SCORE || 0}
              </span>
            )}
          </div>
          {showGradeSection && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onToggleGrade(lesson?.LESSON_RECIPIENT_ID)}
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-blue-700 hover:text-blue-800"
              >
                {isExpanded ? (
                  <FiChevronDown className="w-4 h-4" />
                ) : (
                  <FiChevronRight className="w-4 h-4" />
                )}
                <MdGrade className="w-4 h-4" />
                {isExpanded ? "Hide grading" : "Grade uploaded quiz"}
              </button>
              {isExpanded && (
                <div className="mt-3 p-3 bg-slate-50 rounded-lg space-y-3">
                  {uploadedUrl ? (
                    <a
                      href={uploadedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[12px] text-blue-700 hover:underline"
                    >
                      <FiExternalLink />
                      View uploaded answer file
                    </a>
                  ) : (
                    <p className="text-[11px] text-slate-500">
                      No uploaded answer file yet.
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={lesson?.TOTAL_QUIZ_SCORE || 100}
                      placeholder="Enter score"
                      value={gradeValue}
                      onChange={(e) => setGradeValue(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      disabled={saving || gradeValue === ""}
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#1abc9c] text-white text-xs font-semibold rounded-lg hover:bg-[#17a88b] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? "Saving…" : "Save grade"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

LessonRow.propTypes = {
  lesson: PropTypes.object,
  index: PropTypes.number,
  courseLessonsMap: PropTypes.object,
  expandedGradeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onToggleGrade: PropTypes.func,
  onSaveGrade: PropTypes.func,
};

export default function StaffBreakdownDrawer({
  open,
  onClose,
  staffId,
  courseId,
  staffSummary = {},
  onSaveGrade,
}) {
  const [expandedGradeId, setExpandedGradeId] = useState(null);

  const { data: breakdownData, isPending } = useGetLessonBreakdown(
    staffId, //as staff id
    courseId,
    open && Boolean(staffId && courseId),
  );

  const recipient = breakdownData?.course_recipients?.[0];
  const lessonBreakdown = useMemo(
    () => recipient?.LESSON_BREAKDOWN || [],
    [recipient?.LESSON_BREAKDOWN],
  );
  const progressScore = recipient?.PROGRESS_SCORE;
  const courseScore = recipient?.COURSE_SCORE;
  const dateCompleted = recipient?.DATE_COMPLETED;
  const courseTitle = breakdownData?.COURSE_TITLE || "";

  const manualScore = useMemo(() => {
    //this is will sum up the score for each lesson then divide by the summatin of total score of each lessons
    const totalScore = lessonBreakdown.reduce(
      (acc, lesson) => acc + lesson?.SCORE || 0,
      0,
    );
    const totalLessonScore = lessonBreakdown.reduce(
      (acc, lesson) => acc + lesson?.TOTAL_QUIZ_SCORE || 0,
      0,
    );
    const score = `${totalScore} / ${totalLessonScore}`;
    const progress = (totalScore / totalLessonScore) * 100;
    return { score, progress };
  }, [lessonBreakdown]);

  const handleToggleGrade = (id) => {
    setExpandedGradeId((prev) => (prev === id ? null : id));
  };

  return (
    <Drawer
      title={null}
      placement="right"
      width={640}
      onClose={onClose}
      open={open}
      closable={true}
      className="lms-staff-breakdown-drawer"
      zIndex={1100}
      styles={{
        body: { padding: 0, background: "#f8fafc" },
        header: { display: "none" },
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-shrink-0 bg-[#0f1b35] text-white px-6 py-5 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>
          <div className="flex items-start justify-between gap-4 pr-10">
            <div className="flex items-center gap-4 min-w-0">
              <Avatar
                name={staffSummary?.name || recipient?.FULLNAME}
                color={staffSummary?.color}
                size={48}
              />
              <div className="min-w-0">
                <h2 className="font-bold text-lg truncate">
                  {staffSummary?.name || recipient?.FULLNAME || "Staff"}
                </h2>
                <div className="flex items-center gap-2 text-white/80 text-sm mt-0.5">
                  <FiMail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">
                    {staffSummary?.email || recipient?.EMAIL || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {courseTitle && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <FiBook className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{courseTitle}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {!staffId || !courseId ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center text-amber-800 text-sm">
              Missing staff or course information. Cannot load breakdown.
            </div>
          ) : isPending ? (
            <div className="flex justify-center items-center py-16">
              <StarLoader size={36} />
            </div>
          ) : (
            <>
              {/* Summary cards */}
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Overview
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <FiBarChart2 className="w-4 h-4" />
                      <span className="text-[11px] font-semibold uppercase">
                        Progress score
                      </span>
                    </div>
                    <div className="font-bold text-xl text-slate-800">
                      {progressScore != null
                        ? `${progressScore}%`
                        : manualScore?.progress != null
                          ? `${manualScore?.progress}%`
                          : "0%"}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <FiAward className="w-4 h-4" />
                      <span className="text-[11px] font-semibold uppercase">
                        Course score
                      </span>
                    </div>
                    <div className="font-bold text-xl text-slate-800">
                      {courseScore != null
                        ? `${courseScore}%`
                        : manualScore?.score != null
                          ? `${manualScore?.score}`
                          : "0"}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <FiCalendar className="w-4 h-4" />
                      <span className="text-[11px] font-semibold uppercase">
                        Date completed
                      </span>
                    </div>
                    <div className="font-semibold text-slate-800 text-sm">
                      {dateCompleted
                        ? new Date(dateCompleted).toLocaleDateString(
                            undefined,
                            {
                              dateStyle: "medium",
                            },
                          )
                        : new Date().toLocaleDateString(undefined, {
                            dateStyle: "medium",
                          })}
                    </div>
                  </div>
                </div>
              </section>

              {/* Lesson breakdown */}
              <section>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Lesson breakdown
                </h3>
                {lessonBreakdown.length === 0 ? (
                  <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-slate-500 text-sm">
                    No lessons in this course.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {lessonBreakdown.map((lesson, index) => (
                      <LessonRow
                        key={lesson?.LESSON_RECIPIENT_ID ?? index}
                        lesson={lesson}
                        index={index}
                        expandedGradeId={expandedGradeId}
                        onToggleGrade={handleToggleGrade}
                        onSaveGrade={onSaveGrade}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </Drawer>
  );
}

StaffBreakdownDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  staffId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  courseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  staffSummary: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    color: PropTypes.string,
  }),
  onSaveGrade: PropTypes.func,
};
