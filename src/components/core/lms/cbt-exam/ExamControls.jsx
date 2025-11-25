import PropTypes from "prop-types";

const ExamControls = ({
  onPrevious,
  onNext,
  onMarkReview,
  onSubmit,
  isFirst,
  isLast,
  isMarked,
}) => {
  return (
    <div className="bg-white shadow-sm border-t border-gray-200 px-8 py-4 flex justify-between items-center">
      {/* <button
        onClick={onMarkReview}
        className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
          isMarked
            ? "bg-gray-700 text-white hover:bg-gray-800"
            : "bg-red-700 text-white hover:bg-red-800"
        }`}
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        {isMarked ? "Unmark Review" : "Mark for Review"}
      </button> */}
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className="px-6 py-2.5 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
        style={{ fontFamily: "Outfit, sans-serif" }}
      >
        Previous
      </button>

      <div className="flex gap-3">
        {/* <button
          onClick={onPrevious}
          disabled={isFirst}
          className="px-6 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Previous
        </button> */}
        {isLast ? (
          <button
            onClick={onSubmit}
            className="px-8 py-2.5 bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition-all"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={onNext}
            className="px-6 py-2.5 bg-blue-900 text-white rounded-full font-semibold hover:bg-blue-950 transition-all"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

ExamControls.propTypes = {
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  onMarkReview: PropTypes.func,
  onSubmit: PropTypes.func,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  isMarked: PropTypes.bool,
};

export default ExamControls;
