import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { BsDashCircleDotted, BsPlusCircleDotted } from "react-icons/bs";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { FaEye, FaRegFilePdf } from "react-icons/fa";
import PropTypes from "prop-types";
import { useCourseStore } from "../../../../../hooks/useCourseStore";

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

const documentType = {
  video: CiVideoOn,
  pdf: FaRegFilePdf,
  image: CiImageOn,
};

const CourseCurriculum = ({ course }) => {
  const { openCourseDrawer } = useCourseStore();

  const handleAttemptQuiz = () => {
    openCourseDrawer({
      drawerName: "cbt-exam",
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
          {course?.curriculum.map((curriculum, index) => {
            const Icon = documentType[curriculum?.document_type || "video"];
            return (
              <AccordionItem
                key={index}
                aria-label={curriculum?.lesson_title}
                title={curriculum?.lesson_title}
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
                    <p className="font-outfit">
                      {curriculum.lesson_description}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg transition-colors mt-3">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-400" />

                        <span className="font-outfit text-slate-800">
                          {/* Web Designing Beginner */}
                          {curriculum?.lesson_title}
                        </span>
                      </div>
                      <Button
                        isIconOnly
                        radius="full"
                        size="sm"
                        className="w-8 h-8 rounded-full bg-green-100  flex items-center justify-center"
                      >
                        <FaEye className="w-4 h-4 text-green-600" />
                      </Button>
                    </div>
                    <div>
                      <Button onClick={handleAttemptQuiz}>Attempt quiz</Button>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            );
          })}
        </Accordion>

        {/* <iframe
          src="https://www.youtube.com/watch?v=NON2ujdEwS8"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
      </div>
    </>
  );
};

CourseCurriculum.propTypes = {
  course: PropTypes.any,
};

export default CourseCurriculum;
