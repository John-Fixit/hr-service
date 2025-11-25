import PropTypes from "prop-types";

const QuestionNavigator = ({
  questions,
  currentIndex,
  answers,
  markedForReview,
  onNavigate,
  //   onToggleReview,
}) => {
  const getQuestionStatus = (index) => {
    if (answers[questions[index].id]) return "answered";
    if (index === currentIndex) return "current";
    return "not-attempted";
  };

  const markedAsReview = (index) => {
    if (markedForReview.includes(index)) return true;
  };

  const getButtonClass = (status) => {
    switch (status) {
      case "current":
        return "bg-blue-600 text-white border-blue-600";
      case "answered":
        return "bg-green-700 text-white border-green-700";
      //   case "review":
      //     return "bg-red-700 text-white border-red-700";
      case "not-attempted":
        return "bg-white text-gray-700 border-gray-300 hover:border-blue-900  border-2 ";
      default:
        return "bg-white text-gray-700 border-gray-300  border-2 ";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3
        className="text-lg font-semibold text-gray-800 mb-4"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        Question Navigator
      </h3>

      <div className="flex gap-3 mb-6">
        {questions.map((_, index) => {
          const status = getQuestionStatus(index);
          const isReview = markedAsReview(index);
          return (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`aspect-square rounded font-semibold transition-all rounded-tl-2xl w-10 h-10 relative overflow-clip ${getButtonClass(
                status
              )}`}
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {isReview && (
                <div className="w-10 h-6 rotate-45 absolute -top-3 -right-4 bg-red-600" />
              )}
              {index + 1}
            </button>
          );
        })}
      </div>

      <div
        className="space-y-2 text-sm border-t pt-4"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-600"></div>
          <span className="text-gray-700">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-600"></div>
          <span className="text-gray-700">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-600"></div>
          <span className="text-gray-700">Question Flag</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white border-2 border-gray-300"></div>
          <span className="text-gray-700">Not Attempted</span>
        </div>
      </div>
    </div>
  );
};

QuestionNavigator.propTypes = {
  questions: PropTypes.array,
  currentIndex: PropTypes.number,
  answers: PropTypes.object,
  markedForReview: PropTypes.array,
  onNavigate: PropTypes.func,
  onToggleReview: PropTypes.func,
};

export default QuestionNavigator;
