import { useState, useEffect } from "react";
import { AlertCircle, Clock, CheckCircle2, BookOpen, ArrowLeft } from "lucide-react";

/* ─────────────────────────────────────────────
   Drop-in replacement for the submit confirm block.

   Props (wire these up to your existing state):
     showSubmitConfirm   boolean
     setShowSubmitConfirm fn
     timeLeft            number   (seconds remaining)
     answers             object
     quizData            { questions: [] }
     confirmSubmit       fn
   ───────────────────────────────────────────── */

function SubmitConfirmOverlay({
  showSubmitConfirm,
  setShowSubmitConfirm,
  timeLeft,
  answers,
  quizData,
  confirmSubmit,
}) {
  const [visible, setVisible] = useState(false);

  const isTimeUp = timeLeft <= 1;
  const answeredCount = Object.keys(answers).length;
  const totalCount = quizData.questions.length;
  const unansweredCount = totalCount - answeredCount;
  const completionPct = totalCount > 0 ? Math.round((answeredCount / totalCount) * 100) : 0;

  // Animate in
  useEffect(() => {
    if (showSubmitConfirm) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [showSubmitConfirm]);

  if (!showSubmitConfirm) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={() => !isTimeUp && setShowSubmitConfirm(false)}
      />

      {/* Card */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden transition-all duration-300 ${
          visible ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
        }`}
      >
        {/* Top accent bar */}
        <div
          className={`h-1.5 w-full ${
            isTimeUp
              ? "bg-gradient-to-r from-red-400 via-red-500 to-orange-400"
              : "bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800"
          }`}
        />

        <div className="p-7">

          {/* ── ICON + HEADING ── */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                isTimeUp
                  ? "bg-red-50 border border-red-100"
                  : "bg-blue-50 border border-blue-100"
              }`}
            >
              {isTimeUp ? (
                <Clock className="w-6 h-6 text-red-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-blue-900" />
              )}
            </div>

            <div>
              <p
                className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${
                  isTimeUp ? "text-red-400" : "text-blue-400"
                }`}
              >
                {isTimeUp ? "Time Expired" : "Confirm Submission"}
              </p>
              <h2 className="text-xl font-bold text-gray-800 leading-tight">
                {isTimeUp ? "Your time is up!" : "Submit your exam?"}
              </h2>
            </div>
          </div>

          {/* ── SUBTITLE ── */}
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            {isTimeUp
              ? "The allotted time has ended and your exam has been automatically submitted."
              : "Once submitted, you won't be able to change your answers. Please review your progress below."}
          </p>

          {/* ── STATS GRID ── */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {/* Answered */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
            
              <div className="text-xl font-bold text-green-700">{answeredCount}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-green-400 flex gap-1 items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                Answered
              </div>
            </div>

            {/* Unanswered */}
            <div
              className={`border rounded-xl p-3 text-center ${
                unansweredCount > 0
                  ? "bg-amber-50 border-amber-100"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
             
              <div
                className={`text-xl font-bold ${
                  unansweredCount > 0 ? "text-amber-600" : "text-gray-400"
                }`}
              >
                {unansweredCount}
              </div>
              <div
                className={`text-[10px] font-semibold uppercase tracking-wider flex gap-1 items-center justify-center ${
                  unansweredCount > 0 ? "text-amber-400" : "text-gray-300"
                }`}
              >
                <BookOpen
                className={`w-4 h-4 ${
                  unansweredCount > 0 ? "text-amber-400" : "text-gray-300"
                }`}
              /> Skipped
              </div>
            </div>

            {/* Completion % */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-blue-900">{completionPct}%</div>
              <div className="w-full bg-blue-100 rounded-full h-1 mt-1.5 mb-1">
                <div
                  className="bg-blue-600 h-1 rounded-full transition-all duration-700"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">
                Complete
              </div>
            </div>
          </div>

          {/* ── UNANSWERED WARNING (manual submit only) ── */}
          {!isTimeUp && unansweredCount > 0 && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                You have{" "}
                <span className="font-bold">{unansweredCount}</span>{" "}
                unanswered {unansweredCount === 1 ? "question" : "questions"}. These will be marked as incorrect.
              </p>
            </div>
          )}

          {/* ── AUTO-SUBMITTED NOTICE (time-up only) ── */}
          {isTimeUp && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
              <Clock className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-600 leading-relaxed">
                Your answers have been automatically saved and submitted. Any unanswered questions were left blank.
              </p>
            </div>
          )}

          {/* ── ACTIONS ── */}
          <div className="flex gap-3">
            {!isTimeUp && (
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex items-center justify-center gap-2 flex-1 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 active:scale-95 transition-all duration-150"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            )}

            <button
              onClick={confirmSubmit}
              className="flex-1 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-blue-900 hover:bg-blue-950 active:scale-95 transition-all duration-150 shadow-md hover:shadow-lg"
            >
              {isTimeUp ? "Return to Courses" : "Submit Exam"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}


export default SubmitConfirmOverlay;