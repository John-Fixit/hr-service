import { useState } from "react";
import { X, Plus, Trash2, Check } from "lucide-react";
import PropTypes from "prop-types";
import { ConfigProvider, Input, InputNumber, Select } from "antd";
import { Button } from "@nextui-org/react";
import { errorToast } from "../../../../../utils/toastMsgPop";

const QuizBuilderModal = ({ isOpen, handleClose, setValue, lessonIndex }) => {
  const [currentStep, setCurrentStep] = useState("questions"); // 'questions' or 'config'

  const [quizData, setQuizData] = useState({
    questions: [
      {
        id: crypto.randomUUID(),
        question: "",
        options: [
          { key: crypto.randomUUID(), value: "" },
          { key: crypto.randomUUID(), value: "" },
        ],
        correct_answer: null,
      },
    ],
    config: {
      allowed_attempt: 1,
      total_grade: "",
      time_limit: "",
      grading_method: "highest",
    },
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const addOption = (questionIndex) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].options.push({
      key: crypto.randomUUID(),
      value: "",
    });
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const removeOption = (questionIndex, optionKey) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].options = newQuestions[
      questionIndex
    ].options.filter((opt) => opt.key !== optionKey);
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const updateOption = (questionIndex, optionKey, value) => {
    const newQuestions = [...quizData.questions];
    const option = newQuestions[questionIndex].options.find(
      (opt) => opt.key === optionKey
    );
    if (option) {
      option.value = value;
      setQuizData({ ...quizData, questions: newQuestions });
    }
  };

  const updateQuestion = (questionIndex, value) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].question = value;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const setCorrectAnswer = (questionIndex, optionKey) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].correct_answer = optionKey;
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const addQuestion = () => {
    const newQuestions = [...quizData.questions];
    newQuestions.push({
      id: crypto.randomUUID(),
      question: "",
      options: [
        { key: crypto.randomUUID(), value: "" },
        { key: crypto.randomUUID(), value: "" },
      ],
      correct_answer: null,
    });
    setQuizData({ ...quizData, questions: newQuestions });
    setCurrentQuestionIndex(newQuestions.length - 1);
  };

  const removeQuestion = (questionIndex) => {
    const newQuestions = quizData.questions.filter(
      (_, index) => index !== questionIndex
    );
    setQuizData({ ...quizData, questions: newQuestions });
    if (currentQuestionIndex >= newQuestions.length) {
      setCurrentQuestionIndex(Math.max(0, newQuestions.length - 1));
    }
  };

  const updateConfig = (field, value) => {
    setQuizData({
      ...quizData,
      config: { ...quizData.config, [field]: value },
    });
  };

  const validateQuiz = () => {
    const errors = [];
    if (!quizData.questions.length) {
      errors.push("Please add at least one question");
    }
    const allHaveQuestion = quizData.questions.every((q) => q.question);

    const allQuestionHasAnwer = quizData.questions.every(
      (q) => q.correct_answer
    );
    const allOptionsHaveValue = quizData.questions.every((q) =>
      q.options.every((o) => o.value)
    );
    const hasTotalGrade = quizData.config.total_grade > 0;
    const hasTimelimit = quizData.config.time_limit > 0;
    if (!allHaveQuestion) {
      errors.push("All questions must have a question");
    }
    if (!allQuestionHasAnwer) {
      errors.push("All questions must have an answer");
    }
    if (!allOptionsHaveValue) {
      errors.push("All options must have a value");
    }
    if (!hasTotalGrade) {
      errors.push("Total grade must be greater than 0");
    }
    if (!hasTimelimit) {
      errors.push("Time limit must be greater than 0");
    }
    return errors;
  };
  const handleSave = () => {
    const validateErrors = validateQuiz();
    if (validateErrors.length) {
      errorToast(validateErrors.join("\n"));
    } else {
      const quizDataString = JSON.stringify(quizData, null, 2);
      setValue(`curriculum[${lessonIndex}].quiz`, quizData);
      setValue(`curriculum[${lessonIndex}].quizString`, quizDataString);

      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      style={{ fontFamily: "Outfit, sans-serif" }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800 font-outfit">
            Create Quiz
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setCurrentStep("questions")}
            className={`flex-1 px-6 py-4 font-medium transition-colors font-outfit ${
              currentStep === "questions"
                ? "text-blue-700 border-b-2 border-blue-700 bg-blue-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Questions ({quizData.questions.length})
          </button>
          <button
            onClick={() => setCurrentStep("config")}
            className={`flex-1 px-6 py-4 font-medium transition-colors font-outfit ${
              currentStep === "config"
                ? "text-blue-700 border-b-2 border-blue-700 bg-blue-50"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Configuration
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === "questions" ? (
            <div>
              {/* Question Selector */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {quizData.questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors font-outfit ${
                      currentQuestionIndex === index
                        ? "bg-blue-900 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Q{index + 1}
                  </button>
                ))}
                <Button
                  radius="sm"
                  className="font-outfit flex gap-1 bg-gray-200"
                  onPress={addQuestion}
                >
                  <Plus className="w-4 h-4" />
                  Add Question
                </Button>
              </div>

              {/* Current Question */}
              {quizData.questions[currentQuestionIndex] && (
                <div className="space-y-6">
                  {/* Question Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 font-outfit">
                        Question {currentQuestionIndex + 1}
                      </label>
                      {quizData.questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(currentQuestionIndex)}
                          className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1 font-outfit"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Question
                        </button>
                      )}
                    </div>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "",
                        },
                      }}
                    >
                      <Input.TextArea
                        type="text"
                        autoSize
                        value={
                          quizData.questions[currentQuestionIndex].question
                        }
                        onChange={(e) =>
                          updateQuestion(currentQuestionIndex, e.target.value)
                        }
                        placeholder="Enter your question here..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-outfit"
                      />
                    </ConfigProvider>
                  </div>

                  {/* Options */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700 font-outfit">
                        Answer Options
                      </label>
                      <button
                        onClick={() => addOption(currentQuestionIndex)}
                        className="text-blue-700 hover:text-blue-800 text-sm flex items-center gap-1 font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="font-outfit">Add Option</span>
                      </button>
                    </div>

                    <div className="space-y-3 grid grid-cols-2 gap-6 items-center">
                      {quizData.questions[currentQuestionIndex].options.map(
                        (option, optIndex) => {
                          const isCorrect =
                            quizData.questions[currentQuestionIndex]
                              .correct_answer === option.key;

                          return (
                            <div
                              key={option.key}
                              className={`flex items-center gap-3 p-4 border-1 shadow-sm rounded-lg transition-all h-full ${
                                isCorrect
                                  ? "border-blue-900 bg-blue-50"
                                  : "border-gray-200 bg-white hover:border-gray-300"
                              }`}
                            >
                              {/* Correct Answer Radio */}
                              <button
                                onClick={() =>
                                  setCorrectAnswer(
                                    currentQuestionIndex,
                                    option.key
                                  )
                                }
                                className={`flex-shrink-0 w-6 h-6 rounded-full border-1 flex items-center justify-center transition-colors font-Outfit ${
                                  isCorrect
                                    ? "border-blue-900 bg-blue-900"
                                    : "border-gray-300 hover:border-blue-900"
                                }`}
                                title="Mark as correct answer"
                              >
                                {isCorrect && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </button>

                              {/* Option Label */}
                              {/* <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                                {String.fromCharCode(65 + optIndex)}
                              </span> */}

                              {/* Option Input */}
                              <input
                                type="text"
                                value={option.value}
                                onChange={(e) =>
                                  updateOption(
                                    currentQuestionIndex,
                                    option.key,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${String.fromCharCode(
                                  65 + optIndex
                                )}`}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent font-outfit"
                              />

                              {/* Correct Badge */}
                              {isCorrect && (
                                <span className="flex-shrink-0 px-3 py-1 bg-blue-900 text-white text-xs font-medium rounded-full font-outfit">
                                  Correct Answer
                                </span>
                              )}

                              {/* Delete Option */}
                              {quizData.questions[currentQuestionIndex].options
                                .length > 2 && (
                                <button
                                  onClick={() =>
                                    removeOption(
                                      currentQuestionIndex,
                                      option.key
                                    )
                                  }
                                  className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>

                    {!quizData.questions[currentQuestionIndex]
                      .correct_answer && (
                      <p className="mt-2 text-sm text-amber-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-600 rounded-full font-outfit"></span>
                        Please select the correct answer by clicking the circle
                        next to an option
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-outfit">
                Quiz Configuration
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Allowed Attempts */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
                    Quiz Description
                  </label>
                  <Input.TextArea
                    placeholder="Quiz description..."
                    size="large"
                    value={quizData.config.quiz_description}
                    onChange={(e) =>
                      updateConfig("quiz_description", e.target.value)
                    }
                    autoSize={{ minRows: 2 }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
                    Number of Attempts Allowed
                  </label>

                  <InputNumber
                    type="number"
                    min={1}
                    value={quizData.config.allowed_attempt}
                    onChange={(value) =>
                      updateConfig("allowed_attempt", parseInt(value) || 1)
                    }
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-outfit"
                  />
                </div>

                {/* Total Grade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
                    Total Grade/Points
                  </label>
                  <InputNumber
                    type="number"
                    min={0}
                    value={quizData.config.total_grade}
                    onChange={(e) => updateConfig("total_grade", e)}
                    placeholder="e.g., 100"
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-outfit"
                  />
                </div>

                {/* Time Limit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
                    Time Limit (minutes)
                  </label>
                  <InputNumber
                    type="number"
                    min={0}
                    value={quizData.config.time_limit}
                    onChange={(e) => updateConfig("time_limit", e)}
                    placeholder="e.g., 30"
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-outfit"
                  />
                  <p className="mt-1 text-sm text-gray-500 font-outfit">
                    Leave blank for no time limit
                  </p>
                </div>

                {/* Grading Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-outfit">
                    Grading Method
                  </label>
                  <ConfigProvider
                    theme={{
                      token: {
                        controlHeight: 50,
                      },
                    }}
                  >
                    <Select
                      options={[
                        { label: "Highest Grade", value: "highest" },
                        { label: "Lowest Grade", value: "lowest" },
                        { label: "Last Attempt", value: "last" },
                      ]}
                      value={quizData.config.grading_method}
                      onChange={(value) =>
                        updateConfig("grading_method", value)
                      }
                      className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 font-outfit"
                      //   size="large"
                    />
                  </ConfigProvider>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button
            variant="solid"
            color="danger"
            className="font-outfit"
            radius="sm"
            onPress={() => handleClose()}
          >
            Cancel
          </Button>
          <div className="flex gap-3">
            {currentStep === "questions" && (
              <button
                onClick={() => setCurrentStep("config")}
                className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors font-outfit"
              >
                Next: Configuration
              </button>
            )}
            {currentStep === "config" && (
              <>
                <Button
                  variant="bordered"
                  className="font-outfit"
                  radius="sm"
                  onPress={() => setCurrentStep("questions")}
                >
                  Back to Questions
                </Button>
                <Button
                  color="primary"
                  className="font-outfit bg-blue-900"
                  radius="sm"
                  onPress={handleSave}
                >
                  Save Quiz
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

QuizBuilderModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  setValue: PropTypes.func,
  lessonIndex: PropTypes.number,
};

export default QuizBuilderModal;
