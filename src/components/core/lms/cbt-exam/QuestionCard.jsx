import clsx from "clsx";
import PropTypes from "prop-types";
import { IoFlagOutline, IoFlagSharp } from "react-icons/io5";

const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onToggleReview,
  isMarked,
}) => {
  const Icon = isMarked ? IoFlagSharp : IoFlagOutline;
  return (
    <div className="bg-white rounded-lg p-8 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <span onClick={onToggleReview} className="cursor-pointer">
          <Icon
            className={clsx(
              "w-5 h-5 transition-all duration-300",
              isMarked ? "text-red-700" : "text-gray-500"
            )}
          />
        </span>
        <h2
          className="text-lg font-semibold text-gray-700"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Question {currentIndex + 1} of {totalQuestions}
        </h2>
      </div>

      <p
        className="text-gray-800 text-lg mb-4 leading-relaxed"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {question.question}
      </p>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={option.key}
            className={`flex items-center gap-4 p-4 rounded-lg border-1 cursor-pointer transition-all ${
              selectedAnswer === option.key
                ? "border-blue-900 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.key}
              checked={selectedAnswer === option.key}
              onChange={() => onSelectAnswer(option.key)}
              className="w-5 h-5 text-blue-900 focus:ring-blue-900 cursor-pointer"
            />
            <span className="flex items-center gap-3 font-outfit">
              <span className="font-semibold text-gray-700 font-outfit">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className="text-gray-800 font-outfit">{option.value}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

QuestionCard.propTypes = {
  question: PropTypes.object,
  currentIndex: PropTypes.number,
  totalQuestions: PropTypes.number,
  selectedAnswer: PropTypes.string,
  onSelectAnswer: PropTypes.func,
  onToggleReview: PropTypes.func,
  isMarked: PropTypes.bool,
};

export default QuestionCard;
