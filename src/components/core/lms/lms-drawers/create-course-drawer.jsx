import { Drawer } from "antd";
import { useState } from "react";
import CourseInfo from "../courses/create-course/CourseInfo";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import { useForm } from "react-hook-form";
import AddCurriculum from "../courses/create-course/AddCurriculum";
import AddCourseRecipient from "../courses/create-course/AddCourseRecipient";

const curriculumDefaultRows = {
  lesson_title: "",
  lesson_description: "",
  document_type: "",
  document_url: "",
  document_file: null,
};

const CreateCourseDrawer = () => {
  const { isOpen, closeCourseDrawer } = useCourseStore();

  const hook_form_props = useForm({
    defaultValues: {
      curriculum: [curriculumDefaultRows],
    },
  });

  const sideTabs = [
    {
      title: "Course Info",
      content: <CourseInfo {...hook_form_props} />,
    },
    {
      title: "Curriculum",
      content: (
        <AddCurriculum
          {...hook_form_props}
          curriculumDefaultRows={curriculumDefaultRows}
        />
      ),
    },
    {
      title: "Recipient",
      content: (
        <AddCourseRecipient
          {...hook_form_props}
          curriculumDefaultRows={curriculumDefaultRows}
        />
      ),
    },
  ];
  const [selectedTab, setSelectedTab] = useState(0);

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
