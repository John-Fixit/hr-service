import { ConfigProvider, Image, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useCourseStore } from "../../../../hooks/useCourseStore";
import { filePrefix } from "../../../../utils/filePrefix";
import { useUpdateCourseLesson } from "../../../../API/lms-apis/course";
import { errorToast } from "../../../../utils/toastMsgPop";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const LessonDocModal = () => {
  const { data, updateData } = useCourseStore();

  const {userData} = useCurrentUser();

  const { is_open_lesson_doc, filePath, lesson } = data;
  const {mutateAsync: updateCourseLesson} = useUpdateCourseLesson();

useEffect(()=>{
  const updateLessonView = async () => {
     const payload = {
      update_type: "isviewed",
      json: {
    "IS_VIEWED":true,
    "DATE_VIEWED": new Date().toISOString(),
    "LESSON_RECIPIENT_ID": lesson?.LESSON_RECIPIENT_ID,
    STAFF_ID: userData?.data?.STAFF_ID
}
    }
    try{
      const res = await updateCourseLesson(payload);
      console.log(res);
    }catch(err){
      const errMsg = err?.response?.data?.message || "Failed to update lesson view";
      // errorToast(errMsg);
    }
  }
  // request to trigger view will be here
  if(is_open_lesson_doc && !lesson?.IS_VIEWED){
   updateLessonView();
  }
}, [is_open_lesson_doc, lesson])

  const handleCloseModal = () => {
    updateData({
      is_open_lesson_doc: false,
    });
  };

  const prependBaseURL = (filePath) => {
    // Check if the file path already has a base URL
    if (filePath?.startsWith("http://") || filePath?.startsWith("https://")) {
      return filePath; // Return the original file path if it has a base URL
    } else {
      return `${filePrefix}${filePath}`; // Prepend the base URL
    }
  };

  const fullPath = prependBaseURL(filePath);

  const fileExtension = fullPath?.split(".")?.pop()?.toLowerCase();

  //============used this codes to force refresh the ifrrame because it is caching the previous file displayed=============

  const uniqueUrl = useMemo(
    () => `${fullPath}?timestamp=${new Date().getTime()}`,
    [fullPath]
  );

  //================= ends here ===================

  const [open, setOpen] = useState(false);

  const renderContent = () => {
    if (fileExtension === "pdf") {
      return (
        <iframe
          src={uniqueUrl}
          className="w-full h-[85vh]"
          frameBorder="0"
          title="PDF Preview"
        ></iframe>
      );
    } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
      return (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: is_open_lesson_doc,
            src: fullPath,
            onVisibleChange: () => handleCloseModal(),
          }}
          src={fullPath}
        />
      );
    } else if (["doc", "docx"].includes(fileExtension)) {
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${uniqueUrl}&embedded=true`}
          className="w-full h-[85vh]"
          frameBorder="0"
          title="Preview docx"
        ></iframe>
      );
    } else {
      return <p>File format not supported for preview.</p>;
    }
  };

  return (
    <>
      {["jpg", "jpeg", "png", "gif"].includes(fileExtension) ? (
        <>
          {/* <Modal
          centered
          open={is_open_lesson_doc}
          footer={null}
          onCancel={() => handleCloseModal(false)}
          width={{
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "50%",
            xxl: "40%",
          }}
        >
        </Modal> */}
          {renderContent()}
        </>
      ) : (
        <ConfigProvider
          theme={{
            components: {
              Modal: {},
            },
          }}
        >
          <Modal
            open={is_open_lesson_doc}
            onCancel={handleCloseModal}
            footer={null}
            width={"auto"}
            className="!top-[20px] !z-[1002]"
          >
            <div className="mt-6">{renderContent()}</div>
          </Modal>
        </ConfigProvider>
      )}
    </>
  );
};

export default LessonDocModal;
