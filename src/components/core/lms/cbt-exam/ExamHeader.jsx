import PropTypes from "prop-types";

const ExamHeader = ({ timeLeft }) => {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white border-b border-gray-200 px-8 pb-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-gray-800 font-outfit">
        Online Test - CBT Preparation
      </h1>
      <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200">
        <div
          className="flex gap-4"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          <div className="text-center flex flex-col">
            <div className="text-2xl font-bold text-gray-800 font-outfit">
              {String(hours).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-400 uppercase font-outfit font-medium">
              hours
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 font-outfit">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 font-outfit">
              {String(minutes).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-400 uppercase font-outfit font-medium">
              minutes
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-800 font-outfit">:</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 font-outfit">
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="text-xs text-gray-400 uppercase font-outfit font-medium">
              seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ExamHeader.propTypes = {
  timeLeft: PropTypes.number,
};
export default ExamHeader;
