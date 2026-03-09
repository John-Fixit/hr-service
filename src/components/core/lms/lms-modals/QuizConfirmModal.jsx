
import { useCourseStore } from "../../../../hooks/useCourseStore";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { useMutateGetLessonQuiz } from "../../../../API/lms-apis/course";
import { errorToast } from "../../../../utils/toastMsgPop";
import useQuizAttemptStore from "../../../../hooks/useQuizAttemptStore";
import { FaClipboardList, FaHourglassHalf, FaRedoAlt } from "react-icons/fa";





const styles = {
 
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "28px 28px 0",
    borderBottom: "none",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#f59e0b",
    // fontFamily: "'DM Mono', 'Courier New', monospace",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#1a1a2e",
    lineHeight: 1.2,
    margin: 0,
    // fontFamily: "'Georgia', serif",
  },
  body: {
    padding: "20px 28px 4px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  description: {
    fontSize: "15px",
    color: "#4b5563",
    lineHeight: 1.65,
    margin: 0,
    // fontFamily: "'Georgia', serif",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
  },
  statCard: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  statIcon: {
    fontSize: "18px",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9ca3af",
    // fontFamily: "'DM Mono', monospace",
    marginTop: "6px",
  },
  statValue: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#111827",
    // fontFamily: "'Georgia', serif",
  },
  warningBox: {
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderLeft: "3px solid #f59e0b",
    borderRadius: "8px",
    padding: "12px 14px",
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
  },
  warningIcon: {
    fontSize: "16px",
    flexShrink: 0,
    marginTop: "1px",
  },
  warningText: {
    fontSize: "13px",
    color: "#92400e",
    lineHeight: 1.5,
    margin: 0,
    // fontFamily: "'Georgia', serif",
  },
  footer: {
    padding: "16px 28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderTop: "1px solid #f3f4f6",
  },
  startBtn: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "14px 20px",
    fontSize: "15px",
    fontWeight: 700,
    letterSpacing: "0.02em",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "'Georgia', serif",
    transition: "opacity 0.15s ease, transform 0.1s ease",
    boxShadow: "0 4px 14px rgba(26, 26, 46, 0.3)",
  },
  cancelBtn: {
    background: "transparent",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px 20px",
    fontSize: "14px",
    cursor: "pointer",
    width: "100%",
    fontFamily: "'Georgia', serif",
    transition: "background 0.15s ease",
  },
};

/* ─── Sub-components ─── */

const StatCard = ({ icon, label, value }) => (
  <div style={styles.statCard}>
    <span style={styles.statIcon}>{icon}</span>
    <span style={styles.statLabel}>{label}</span>
    <span style={styles.statValue}>{value}</span>
  </div>
);

/* ─── Main Component ─── */

/**
 * QuizConfirmModal
 *
 * Props:
 *   isOpen       {boolean}   – controls visibility
 *   onClose      {function}  – called when user cancels / closes
 *   onConfirm    {function}  – called when user confirms to start quiz
 *   quizTitle    {string}    – name of the quiz
 *   questionCount{number}    – total number of questions
 *   timeLimit    {string}    – e.g. "30 minutes"
 *   attempts     {string}    – e.g. "1 attempt" or "Unlimited"
 */
const QuizConfirmModal = () => {
    
  const [hovering, setHovering] = useState(null);


    const {data, updateData, openCourseDrawer } = useCourseStore();
    const upsertAttempt = useQuizAttemptStore((state) => state.upsertAttempt);

      const { mutateAsync: mutateGetQuiz, isPending: isGettingQuiz } =
        useMutateGetLessonQuiz();

      const lesson = data?.lesson
      const quizScope = data?.quizScope || "lesson";
      const generalQuizData = data?.generalQuizData;

      const is_open_confirm_start_quiz = data?.is_open_confirm_start_quiz


      const attempts = lesson?.ATTEMPTS_ALLOWED + " attempt(s)"
      const timeLimit = lesson?.DURATION + " min"
      const quizTitle = lesson?.QUIZ_DESCRIPTION || (quizScope === "general" ? "General Quiz" : "Lesson Quiz")
const questionCount = lesson?.TOTAL_QUIZZES



       const handleAttemptQuiz = async () => {
          try {
            const response =
              quizScope === "general"
                ? generalQuizData || []
                : await mutateGetQuiz(lesson?.LESSON_ID);
            const durationMins = Number(lesson?.DURATION || 0);
            const startAt = Date.now();
            const endAt = startAt + durationMins * 60 * 1000;
            const attemptKey =
              quizScope === "general"
                ? `general_${lesson?.COURSE_ID || lesson?.LESSON_ID || "quiz"}`
                : `lesson_${lesson?.LESSON_RECIPIENT_ID || lesson?.LESSON_ID}`;

            upsertAttempt(attemptKey, {
              attemptKey,
              lesson,
              quizData: response,
              quizScope,
              startAt,
              endAt,
              answers: {},
              markedForReview: [],
              currentViewPage: 0,
              isSubmitted: false,
            });

            openCourseDrawer({
              drawerName: "cbt-exam",
              quizData: response,
              quizScope,
              restoreAttemptKey: attemptKey,
            });
            onClose()
          } catch (err) {
            errorToast(
              err?.response?.data?.message ||
                err.message ||
                "Failed to fetch quiz data"
            );
          }
        };

        const   onClose = () => {
             updateData({
      is_open_confirm_start_quiz: false
    });
        }

  return (
    <div>
      <Modal
        isOpen={is_open_confirm_start_quiz}
        onClose={onClose}
        size="xl"
        backdrop="blur"
        classNames={{
          base: "border border-gray-200 shadow-2xl rounded-2xl",
          wrapper: "z-[99999]",
          backdrop: "z-[99998]",
          
        }}
      >
        <ModalContent>
          {/* ── Header ── */}
          <ModalHeader style={styles.header}>
            <span style={styles.eyebrow}>📋 Quiz Check-In</span>
            <h2 style={styles.title}>Ready to begin?</h2>
          </ModalHeader>

          {/* ── Body ── */}
          <ModalBody style={styles.body}>
            <p style={styles.description}>
              You're about to start{" "}
              <strong style={{ color: "#1a1a2e" }}>"{quizTitle}"</strong>. Once
              the timer begins, it cannot be paused. Make sure you're in a quiet
              space with a stable connection.
            </p>

            {/* Stats row */}
            <div style={styles.statsRow}>
              <StatCard icon={<FaClipboardList />} label="Questions" value={questionCount} />
              <StatCard icon={<FaHourglassHalf />} label="Time Limit" value={timeLimit} />
              <StatCard icon={<FaRedoAlt />} label="Attempts" value={attempts} />
            </div>

            {/* Warning */}
            <div style={styles.warningBox}>
              <span style={styles.warningIcon}>⚠️</span>
              <p style={styles.warningText}>
                Navigating away or closing the tab during the quiz may count as
                a submission.
              </p>
            </div>
          </ModalBody>

          {/* ── Footer ── */}
          <ModalFooter style={styles.footer}>
            <button
              style={{
                ...styles.startBtn,
                opacity: hovering === "start" ? 0.88 : 1,
                transform:
                  hovering === "start" ? "translateY(1px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHovering("start")}
              onMouseLeave={() => setHovering(null)}
              onClick={handleAttemptQuiz}
              className="flex items-center gap-2"
              disabled={isGettingQuiz}
            >
                {
                    isGettingQuiz?
                <Spinner color="white" size="sm"/>:
              "✅" 
                }
              Yes, Start the Quiz
            </button>
            <button
              style={{
                ...styles.cancelBtn,
                background: hovering === "cancel" ? "#f9fafb" : "transparent",
              }}
              onMouseEnter={() => setHovering("cancel")}
              onMouseLeave={() => setHovering(null)}
              onClick={onClose}
            >
              Not yet, go back
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default QuizConfirmModal;



