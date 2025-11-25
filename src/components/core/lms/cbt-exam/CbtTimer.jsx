import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

// Timer Component
const CbtTimer = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert minutes to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-blue-900" />
        <h3
          className="text-lg font-semibold text-gray-700"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Time Left
        </h3>
      </div>
      <div className="flex justify-center gap-4">
        <div className="text-center">
          <div
            className="text-3xl font-bold text-blue-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {String(hours).padStart(2, "0")}
          </div>
          <div
            className="text-xs text-gray-500 mt-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            hours
          </div>
        </div>
        <div
          className="text-3xl font-bold text-blue-900 self-start"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          :
        </div>
        <div className="text-center">
          <div
            className="text-3xl font-bold text-blue-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {String(minutes).padStart(2, "0")}
          </div>
          <div
            className="text-xs text-gray-500 mt-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            minutes
          </div>
        </div>
        <div
          className="text-3xl font-bold text-blue-900 self-start"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          :
        </div>
        <div className="text-center">
          <div
            className="text-3xl font-bold text-blue-900"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            {String(seconds).padStart(2, "0")}
          </div>
          <div
            className="text-xs text-gray-500 mt-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            seconds
          </div>
        </div>
      </div>
    </div>
  );
};

export default CbtTimer;
