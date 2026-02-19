import { AlertCircle } from "lucide-react";
import ExamControls from "./ExamControls";
import ExamHeader from "./ExamHeader";
import QuestionCard from "./QuestionCard";
import QuestionNavigator from "./QuestionNavigator";
import { useEffect, useRef, useState } from "react";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import SubmitConfirmOverlay from "./SubmitConfirmOverlay";
import { useUpdateCourseLesson } from "../../../../API/lms-apis/course";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";

// Mock quiz data
// const quizData = {
//   config: {
//     allowed_attempt: 1,
//     total_grade: 10,
//     time_limit: 5,
//     grading_method: "highest",
//   },
//   questions: [
//     {
//       id: "e554a6d6-19a3-4f67-ae56-ab6a9e40e271",
//       question: "Have you read the material of this lesson?",
//       correct_answer: "f9e5ba75-3e06-4073-8764-aa81c3a5f6cb",
//       options: [
//         {
//           key: "f9e5ba75-3e06-4073-8764-aa81c3a5f6cb",
//           value: "Yes",
//         },
//         {
//           key: "d89a20a1-9d6a-4b2c-90d7-f885e4237f85",
//           value: "No",
//         },
//       ],
//     },
//     {
//       id: "q2",
//       question: "What is the capital of France?",
//       correct_answer: "paris",
//       options: [
//         { key: "london", value: "London" },
//         { key: "paris", value: "Paris" },
//         { key: "berlin", value: "Berlin" },
//         { key: "madrid", value: "Madrid" },
//       ],
//     },
//     {
//       id: "q3",
//       question: "Which programming language is this exam built with?",
//       correct_answer: "react",
//       options: [
//         { key: "react", value: "React" },
//         { key: "vue", value: "Vue" },
//         { key: "angular", value: "Angular" },
//         { key: "svelte", value: "Svelte" },
//       ],
//     },
//     {
//       id: "q4",
//       question: "What does HTML stand for?",
//       correct_answer: "hypertext",
//       options: [
//         { key: "hypertext", value: "Hypertext Markup Language" },
//         { key: "hightext", value: "High-level Text Markup Language" },
//         { key: "hyperlink", value: "Hyperlink and Text Markup Language" },
//         { key: "homepage", value: "Homepage Markup Language" },
//       ],
//     },
//     {
//       id: "q5",
//       question: "Which company developed React?",
//       correct_answer: "facebook",
//       options: [
//         { key: "google", value: "Google" },
//         { key: "facebook", value: "Facebook" },
//         { key: "microsoft", value: "Microsoft" },
//         { key: "apple", value: "Apple" },
//       ],
//     },
//     {
//       id: "q6",
//       question: "What is CSS used for?",
//       correct_answer: "styling",
//       options: [
//         { key: "styling", value: "Styling web pages" },
//         { key: "database", value: "Managing databases" },
//         { key: "server", value: "Running servers" },
//         { key: "logic", value: "Programming logic" },
//       ],
//     },
//     {
//       id: "q7",
//       question: "What does API stand for?",
//       correct_answer: "interface",
//       options: [
//         { key: "interface", value: "Application Programming Interface" },
//         { key: "internet", value: "Application Platform Internet" },
//         { key: "protocol", value: "Application Protocol Integration" },
//         { key: "program", value: "Application Program Integration" },
//       ],
//     },
//     {
//       id: "q8",
//       question: "Which of these is a JavaScript framework?",
//       correct_answer: "nextjs",
//       options: [
//         { key: "django", value: "Django" },
//         { key: "nextjs", value: "Next.js" },
//         { key: "laravel", value: "Laravel" },
//         { key: "flask", value: "Flask" },
//       ],
//     },
//   ],
// };

const QUESTIONS_PER_VIEW = 2;

const CbtTestView = () => {
  const [currentViewPage, setCurrentViewPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState([]);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const {mutateAsync: updateCourseLesson, isPending: isSubmitting} = useUpdateCourseLesson();
  
  const {data, closeCourseDrawer } = useCourseStore();
  const quizQuestionsData = data?.quizData;
  const lesson = data?.lesson


  const quizData = {
    config: {
      allowed_attempt: lesson?.ATTEMPTS_ALLOWED,
      total_grade: lesson?.TOTAL_QUIZ_SCORE,
      time_limit: lesson?.DURATION,
      // grading_method: lesson?.grading_method,
    },
    questions: quizQuestionsData?.map((quiz)=>({
    
      id: quiz?.QUIZ_ID,
      question: quiz?.QUIZ_QUESTION,
      correct_answer: quiz?.QUIZ_ANSWER,
      options: quiz?.QUIZ_OPTIONS?.map((option)=>({
        key: option,
        value: option,
      })),
    
  }))
}

  const [timeLeft, setTimeLeft] = useState(quizData?.config?.time_limit * 60);

  const topViewRef = useRef(null);

  const totalViewPages = Math.ceil(
    quizData?.questions?.length / QUESTIONS_PER_VIEW
  );

  // Calculate which questions to display
  const startIndex = currentViewPage * QUESTIONS_PER_VIEW;
  const endIndex = Math.min(
    startIndex + QUESTIONS_PER_VIEW,
    quizData.questions.length
  );
  const questionsToDisplay = quizData.questions.slice(startIndex, endIndex);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          confirmSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSelectAnswer = (questionId, answerKey) => {
    setAnswers({
      ...answers,
      [questionId]: answerKey,
    });
  };

  const handleNavigate = (index) => {
    const newPage = Math.floor(index / QUESTIONS_PER_VIEW);
    setCurrentViewPage(newPage);
  };

  const handleNextPage = () => {
    if (currentViewPage < totalViewPages - 1) {
      setCurrentViewPage(currentViewPage + 1);
    }
    topViewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreviousPage = () => {
    if (currentViewPage > 0) {
      setCurrentViewPage(currentViewPage - 1);
    }
  };

  const handleToggleReview = (questionIndex) => {
    if (markedForReview.includes(questionIndex)) {
      setMarkedForReview(markedForReview.filter((i) => i !== questionIndex));
    } else {
      setMarkedForReview([...markedForReview, questionIndex]);
    }
  };

  const handleSubmit = () => {
    setShowSubmitConfirm(true);
  };



  const updateLessonRequest=async(score)=>{
     const payload = {
      update_type: "iscompleted",
      json: {
        "IS_COMPLETED": true,
        "SCORE": score,
    "DATE_SCORED": new Date().toISOString(),
    "LESSON_ID": lesson?.LESSON_ID
}
    }
    try{
      const res = await updateCourseLesson(payload);
      console.log(res);
      timeLeft > 0 && successToast(res?.data?.message);
      return res;
    }catch(err){
      const errMsg = err?.response?.data?.message || "Failed to update lesson view";
      errorToast(errMsg);

    }
  }

  const confirmSubmit =async() => {
    const eachQuestionMrk = quizData?.config?.total_grade / quizData?.questions?.length;
    const score = quizData.questions.reduce((total, question) => {
      return total + (answers[question.id] === question.correct_answer ? 1 : 0);
    }, 0);
    const calculateTotalScore = (score * eachQuestionMrk);

    try{
      const res = await updateLessonRequest(calculateTotalScore);
      if(res){
        //=======================
    timeLeft > 0 ? closeCourseDrawer() : setShowSubmitConfirm(true);
    //===================
  }
    }
    catch(err){
         const errMsg = err?.response?.data?.message || "Failed to update lesson view";
      errorToast(errMsg);
    }


  };


console.log(timeLeft)




  const handleViewPageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalViewPages) {
      setCurrentViewPage(newPage);
    }
  };



  if(isSubmitting){
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
     
<div class="flex-col gap-4 w-full flex items-center justify-center">
  <div class="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
  
  </div>
</div>
      </div>
    )
  }

  if (showSubmitConfirm) {
    return (
      <>
      {
      // <div className="min-h-screen bg-gray-50 fixed inset-0 z-50 flex items-center justify-center p-4">
      //   <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full border border-gray-200">
      //     <div className="flex items-center gap-3 mb-4">
      //       <AlertCircle className="text-blue-900 w-8 h-8" />
      //       <h2
      //         className="text-2xl font-bold text-gray-800"
      //         style={{ fontFamily: "Outfit, sans-serif" }}
      //       >
      //         {/* Submit Exam? */}
      //         Exam Submitted
      //       </h2>
      //     </div>
      //     <p
      //       className="text-gray-700 mb-6"
      //       style={{ fontFamily: "Outfit, sans-serif" }}
      //     >
            
      //       {timeLeft> 1 ? "Are you sure you want to submit your exam?" : "Your time is up, Test automatically submitted"} You have answered{" "}
      //       <span className="font-bold">{Object.keys(answers).length}</span> out
      //       of <span className="font-bold">{quizData.questions.length}</span>{" "}
      //       questions.
      //     </p>
      //     <div className="flex gap-3">
      //       {
      //         timeLeft > 1 &&
      //       <button
      //         onClick={() => setShowSubmitConfirm(false)}
      //         className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all"
      //         style={{ fontFamily: "Outfit, sans-serif" }}
      //       >
      //         Cancel
      //       </button>
      //       }
      //       <button
      //         onClick={confirmSubmit}
      //         className="flex-1 px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-950 transition-all"
      //         style={{ fontFamily: "Outfit, sans-serif" }}
      //       >
      //         {timeLeft> 1 ? "Submit" : "Return back to courses"}
      //       </button>
      //     </div>
      //   </div>
      // </div>
      }

      <SubmitConfirmOverlay
        showSubmitConfirm={showSubmitConfirm}
        setShowSubmitConfirm={setShowSubmitConfirm}
        timeLeft={timeLeft}
        answers={answers}
        quizData={quizData}
        confirmSubmit={() => {
          confirmSubmit();
        }}
      />
      
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ExamHeader timeLeft={timeLeft} />

                  <div ref={topViewRef}></div>
        <div className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            {/* Display multiple questions */}
    
            {questionsToDisplay.map((question, index) => {
              const actualIndex = startIndex + index;
              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  currentIndex={actualIndex}
                  totalQuestions={quizData.questions.length}
                  selectedAnswer={answers[question.id]}
                  onSelectAnswer={(answerKey) =>
                    handleSelectAnswer(question.id, answerKey)
                  }
                  isMarked={markedForReview.includes(actualIndex)}
                  onToggleReview={() => handleToggleReview(actualIndex)}
                />
              );
            })}

            {/* Page info */}
            <div className="text-center py-4">
              <p
                className="text-gray-600"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                Showing questions {startIndex + 1} - {endIndex} of{" "}
                {quizData.questions.length}
              </p>
            </div>
            <ExamControls
              onPrevious={handlePreviousPage}
              onNext={handleNextPage}
              onMarkReview={() => {}} // Not used in multi-question view
              onSubmit={handleSubmit}
              isFirst={currentViewPage === 0}
              isLast={currentViewPage === totalViewPages - 1}
              isMarked={false}
            />
          </div>

          <div className="lg:col-span-1">
            <QuestionNavigator
              questions={quizData.questions}
              answers={answers}
              markedForReview={markedForReview}
              onNavigate={handleNavigate}
              currentViewPage={currentViewPage}
              totalViewPages={totalViewPages}
              onViewPageChange={handleViewPageChange}
              questionsPerView={QUESTIONS_PER_VIEW}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CbtTestView;
