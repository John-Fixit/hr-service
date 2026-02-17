import { Drawer } from "antd";
import { useState } from "react";
import CourseInfo from "../courses/create-course/CourseInfo";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import { useForm } from "react-hook-form";
import AddCurriculum from "../courses/create-course/AddCurriculum";
import AddCourseRecipient from "../courses/create-course/AddCourseRecipient";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useCreateCourse } from "../../../../API/lms-apis/course";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";

const curriculumDefaultRows = {
  lesson_title: "",
  lesson_description: "",
  document_type: "",
  document_url: "",
  document_file: null,
  has_quiz: false,
};

const CreateCourseDrawer = () => {
  const { isOpen, closeCourseDrawer } = useCourseStore();
  const [selectedTab, setSelectedTab] = useState(0);

  const { userData } = useCurrentUser();

  const { mutateAsync: mutateCreateCourse, isPending: isCreatingCourse } =
    useCreateCourse();

  const handleNext = () => {
    setSelectedTab(selectedTab + 1);
  };
  const handlePrev = () => {
    setSelectedTab(selectedTab - 1);
  };

  const hook_form_props = useForm({
    defaultValues: {
      curriculum: [curriculumDefaultRows],
    },
  });

  const handleSubmit = async () => {
    // eslint-disable-next-line no-unused-vars
    const { course_thumbnail_file, curriculum, ...rest } =
      hook_form_props.getValues();
    const formattedCurriculum = curriculum.map((crcl) => {
      const {
        lesson_title,
        lesson_description,
        document_url,
        has_quiz,
        quiz,
        // quizString,
      } = crcl;

      const quiz_config = quiz?.config;

      const formattedQuizQuestions = quiz?.questions?.map((q) => {
        return {
          QUIZ_QUESTION: q?.question,
          QUIZ_ANSWER: q?.options?.find((opt) => opt.key === q?.correct_answer)
            ?.value,
          QUIZ_OPTIONS: q?.options?.map((opt) => opt.value),
        };
      });

      return {
        TITLE: lesson_title || "",
        DESCRIPTION: lesson_description || "",
        MEDIA_ATTACHMENT: document_url || "",
        HAS_QUIZ: has_quiz || null,
        QUIZ_DESCRIPTION: quiz_config?.quiz_description || "",
        ATTEMPTS_ALLOWED: quiz_config?.allowed_attempt || "",
        DURATION: quiz_config?.time_limit || "",
        TOTAL_QUIZ_SCORE: quiz_config?.total_grade || "",
        lesson_quiz: {
          questions: formattedQuizQuestions,
        },
      };
    });

    const json = {
      COURSE_CATEGORY: rest?.course_category,
      COMPANY_ID: userData?.data?.COMPANY_ID,
      COURSE_TITLE: rest?.course_title,
      COURSE_OBJECTIVE: rest?.course_objective,
      COURSE_DESCRIPTION: rest?.course_description,
      USE_AS_APPRAISAL: true,
      START_DATE: rest?.start_date,
      END_DATE: rest?.end_date,
      CREATOR: userData?.data?.STAFF_ID,
      PERFORMANCE_CYCLE_ID: 12,
      HAS_LINE_MANAGER: false,
      COURSE_PREVIEW_IMAGE: rest?.course_thumbnail_url,
      course_lessons: formattedCurriculum,
      course_recipients: {
        recipient_type: rest?.recipientType,
        STAFF_IDS: rest?.recipients,
      },
    };
    try {
      const response = await mutateCreateCourse(json);
      successToast(response?.data?.message || "Course created successfully");
      closeCourseDrawer();
    } catch (err) {
      errorToast(
        err?.response?.data?.message || err?.message || "Error creating course"
      );
    }
  };

  const sideTabs = [
    {
      title: "Course Info",
      content: <CourseInfo {...hook_form_props} handleNext={handleNext} />,
    },
    {
      title: "Curriculum",
      content: (
        <AddCurriculum
          {...hook_form_props}
          curriculumDefaultRows={curriculumDefaultRows}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      ),
    },
    {
      title: "Recipient",
      content: (
        <AddCourseRecipient
          {...hook_form_props}
          curriculumDefaultRows={curriculumDefaultRows}
          handlePrev={handlePrev}
          handleNext={handleSubmit}
          isCreatingCourse={isCreatingCourse}
        />
      ),
    },
  ];

  return (
    <Drawer
      width={900}
      onClose={closeCourseDrawer}
      open={isOpen}
      className="bg-[#F5F7FA] z-[10]"
      classNames={{
        body: "bg-[#F7F7F7] p-0",
        header: "bg-[#F7F7F7]",
      }}
    >
      <div className="flex md:flex-nowrap flex-col md:flex-row hfull gap-4 md:p-5">
        {/* Main Content Area - Takes up most space */}
        <div className="flex-1 min-w-0 p-5 overflow-y-auto border border-gray-200 bg-white rounded-lg order-2 md:order-1">
          {sideTabs?.map((tab, index) => (
            <div
              key={index}
              style={{
                display: selectedTab === index ? "block" : "none",
              }}
            >
              {tab?.content}
            </div>
          ))}
        </div>

        {/* Side Tabs - Fixed width */}
        <div className="flex-shrink-0 w-32 flex flex-col gap-3 pt-10 pb-5 pl-8 border-l border-gray-300 order-1 md:order-2">
          {sideTabs?.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`relative cursor-pointer text-base leading-[19.5px] transition-all font-outfit ${
                selectedTab === index
                  ? "font-medium text-[rgba(39, 44, 51, 1)]"
                  : "font-normal text-[rgba(39, 44, 51, 0.7)]"
              }`}
            >
              {tab?.title}
              <span
                className={`absolute -left-[22px] top-1 w-[0.7rem] h-[0.7rem] rounded-full border border-white transition-all duration-200 ${
                  selectedTab === index ? "bg-blue-900" : "bg-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default CreateCourseDrawer;
