import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { BsDashCircleDotted, BsPlusCircleDotted } from "react-icons/bs";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { FaEye, FaRegFilePdf } from "react-icons/fa";
import PropTypes from "prop-types";
import { useCourseStore } from "../../../../../hooks/useCourseStore";
import { fileExtension } from "../../../../../utils/fileExtension";
import { useMutateGetLessonQuiz } from "../../../../../API/lms-apis/course";
import { errorToast } from "../../../../../utils/toastMsgPop";
import { useState } from "react";
import LessonDocModal from "../../lms-modals/lesson-doc-modal";
import QuizConfirmModal from "../../lms-modals/QuizConfirmModal";

// const curriculums = [
//   {
//     title: "Part 01: How To Learn Web Designing Step By Step",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     document_type: "video",
//   },
//   {
//     title: "Part 02: Learn Web Designing In Basic Level",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     document_type: "video",
//   },
//   {
//     title: "Part 03: Learn Web Designing In Advance Level",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     lectures: [],
//     document_type: "pdf",
//   },
//   {
//     title: "Part 04: How To Become Succes In Designing & Development?",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     document_type: "image",
//   },
// ];

const findFileType = (file) => {
  const extension = fileExtension(file);
  if (["mp4", "mov", "avi", "mkv"].includes(extension)) {
    return "video";
  } else if (["pdf"].includes(extension)) {
    return "pdf";
  } else if (["jpg", "jpeg", "png", "gif", "bmp", "svg"].includes(extension)) {
    return "image";
  } else {
    return "video"; // default type
  }
};

const documentType = {
  video: CiVideoOn,
  pdf: FaRegFilePdf,
  image: CiImageOn,
};

const CourseCurriculum = ({ course }) => {
  const { openCourseDrawer, updateData } = useCourseStore();

  const { mutateAsync: mutateGetQuiz, isPending: isGettingQuiz } =
    useMutateGetLessonQuiz();

  const [selectedLesson, setSelectedLesson] = useState(null);

  const openConfirmStartQuizModal=(lesson)=>{
    updateData({
      is_open_confirm_start_quiz: true,
      lesson: lesson,
    });
  }

  const handleAttemptQuiz = async (lesson) => {
    setSelectedLesson(lesson?.LESSON_ID);
    try {
      const response = await mutateGetQuiz(lesson?.LESSON_ID);
      console.log(response);
      // openCourseDrawer({
      //   drawerName: "cbt-exam",
      //   quizData: response,
      // });
    } catch (err) {
      errorToast(
        err?.response?.data?.message ||
          err.message ||
          "Failed to fetch quiz data"
      );
    }
  };

  const viewLessonDoc = (lesson) => {
    updateData({
      filePath: lesson?.MEDIA_ATTACHMENT,
      is_open_lesson_doc: true,
      lesson: lesson,
    });
  };

  return (
    <>
      <div className="border rounded-lg p-6">
        <h2 className="text-blue-900 text-[18px] lg:text-[20px] font-outfit font-bold">
          Course Curriculum
        </h2>

        <Accordion
          variant="splitted"
          itemClasses={{
            base: "m-0 p-0 shadow-none rounded-lg border",
          }}
          isCompact
        >
          {course?.course_lessons?.map((curriculum, index) => {
            const docType = findFileType(curriculum?.MEDIA_ATTACHMENT);
            const Icon = documentType[docType || "video"];

            return (
              <AccordionItem
                key={index}
                aria-label={curriculum?.TITLE}
                title={curriculum?.TITLE}
                subtitle={null}
                indicator={({ isOpen }) =>
                  isOpen ? (
                    <BsDashCircleDotted className="w-5 h-5 text-gray-600 rotate-90" />
                  ) : (
                    <BsPlusCircleDotted className="w-5 h-5 text-gray-600 " />
                  )
                }
                classNames={{
                  title: "font-outfit font-medium text-[16px] text-gray-600",
                  heading: "py-0 my-0 data-[open=true]:border-b px-4 ",
                  content: "px-4 pb-6",
                }}
              >
                <div className="mt-3">
                  <div>
                    <h3 className="text-blue-900 text-sm font-outfit font-medium mb-">
                      Description
                    </h3>
                    <p className="font-outfit">{curriculum.DESCRIPTION}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg transition-colors mt-3">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-400" />

                        <span className="font-outfit text-slate-800">
                          {/* Web Designing Beginner */}
                          {curriculum?.QUIZ_DESCRIPTION}
                        </span>
                      </div>
                      <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        className="w-8 h-8 rounded-full bg-green-100  flex items-center justify-center"
                        onPress={() =>
                          viewLessonDoc(curriculum)
                        }
                      >
                        <FaEye className="w-4 h-4 text-green-600" />
                      </Button>
                    </div>
                    {curriculum?.HAS_QUIZ ? (
                      <div className="mt-2">
                        <Button
                          onClick={() => openConfirmStartQuizModal(curriculum)}
                          radius="sm"
                          size="sm"
                          isLoading={
                            isGettingQuiz &&
                            selectedLesson === curriculum?.LESSON_ID
                          }
                        >
                          Attempt quiz
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <LessonDocModal />

      <QuizConfirmModal
        isOpen={true}
        // onClose={() => setOpen(false)}
        // onConfirm={() => {
        //   setOpen(false);
        //   alert("Quiz started! 🚀");
        // }}
        // quizTitle="Chapter 4 Assessment"
        // questionCount={20}
        // timeLimit="30 min"
        // attempts="1 attempt"
      />
    </>
  );
};

CourseCurriculum.propTypes = {
  course: PropTypes.any,
};

export default CourseCurriculum;
