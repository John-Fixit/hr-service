import { Input } from "antd";
import { useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import PropTypes from "prop-types";
import { Button, Switch } from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import {
  IoChevronBack,
  IoChevronForward,
  IoCreateOutline,
} from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import QuizBuilderModal from "./QuizBuiderModal";
import { errorToast } from "../../../../../utils/toastMsgPop";
import { uploadFileData } from "../../../../../utils/uploadfile";
import useCurrentUser from "../../../../../hooks/useCurrentUser";

const AddCurriculum = (props) => {
  const [isOpenQuizModal, setIsOpenQuizModal] = useState({
    state: false,
    lessonIndex: null,
  });

  const { control, curriculumDefaultRows, setValue, handleNext, handlePrev } =
    props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "curriculum",
  });

  const { userData } = useCurrentUser();

  const handlePickThumbnail = async (file) => {
    const res = await uploadFileData(file, userData?.token);
    return {
      ...res,
    };
  };

  const validateQuiz = () => {
    const allLessonWithRequiredQuiz = curriculumValues.filter(
      (l) => l.has_quiz
    );
    const allHasQuiz = allLessonWithRequiredQuiz.every((l) => l.quiz);

    console.log(allHasQuiz, allLessonWithRequiredQuiz);
    if (!allHasQuiz) {
      return ["Please set quiz for all lessons said to have quiz"];
    }
    return [];
  };

  const handleContinue = () => {
    const validateErrors = validateQuiz();
    if (validateErrors.length) {
      errorToast(validateErrors.join("\n"));
    } else {
      //final submittion to next page will be here
      handleNext();
    }
  };

  const curriculumValues = useWatch({
    control,
    name: "curriculum",
  });

  const handleOpenQuizModal = (lessonIndex) => {
    setIsOpenQuizModal({
      state: true,
      lessonIndex: lessonIndex,
    });
  };
  const handleCloseQuizModal = () => {
    setIsOpenQuizModal({
      state: false,
    });
  };

  console.log(curriculumValues);
  return (
    <>
      <main>
        <h2 className="font-outfit  text-xl font-semibold text-blue-900">
          Curriculum
        </h2>
        <p className="font-outfit text-gray-500">
          Add course sections and lessons below. You can add as many as needed.
        </p>
        <div className="mt-6 space-y-4">
          {fields.map((field, index) => (
            <div key={index + field.id}>
              <div className="space-y-3 border rounded-lg p-3 relative">
                <div className="flex justify-between items-center">
                  <p className="font-semibold font-outfit">
                    {" "}
                    Lesson {index + 1}
                  </p>
                  <div className="flex gap-2">
                    {curriculumValues?.[index]?.has_quiz && (
                      <Button
                        className="font-outfit px-2 flex gap-1"
                        size="sm"
                        onPress={() => handleOpenQuizModal(index)}
                      >
                        <IoCreateOutline size={16} />
                        Set Quiz
                      </Button>
                    )}

                    {fields.length > 1 && (
                      <div className="">
                        <Button
                          color="danger"
                          className="font-outfit h-8 w-8"
                          radius="full"
                          isIconOnly
                          size="sm"
                          onPress={() => remove(index)}
                        >
                          <FaTrashAlt size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="" className="font-outfit font-light">
                    Lesson Title
                  </label>
                  <Controller
                    control={control}
                    name={`curriculum[${index}].lesson_title`}
                    rules={{
                      required: "Lesson title is required",
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input
                          placeholder="Enter lesson title"
                          size="large"
                          {...field}
                        />
                        {!!error?.message && (
                          <span className="text-red-400 font-outfit text-sm px-1">
                            {error?.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="" className="font-outfit font-light">
                    Lesson Description
                  </label>
                  <Controller
                    control={control}
                    name={`curriculum[${index}].lesson_description`}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input.TextArea
                          placeholder="Enter description"
                          size="large"
                          {...field}
                          autoSize
                        />
                        {!!error?.message && (
                          <span className="text-red-400 font-outfit text-sm px-1">
                            {error?.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="" className="font-outfit font-light">
                    Upload Media Content
                  </label>
                  <div>
                    <label htmlFor="media_content_file" className="mt-1">
                      <div className="border rounded flex">
                        <p className="bg-gray-100 px-3 font-medium font-outfit flex items-center">
                          Choose File
                        </p>
                        <div className="py-2 px-3 font-outfit">
                          {curriculumValues?.[index]?.document_file?.name ||
                            "No file choosen"}
                          <p className="font-outfit text-gray-400 text-xs">
                            pdf, doc, ppt, txt, xls, xlsx, zip, mp4
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.ppt,.pptx,.txt,.xls,.xlsx,.zip,.mp4"
                        className="hidden"
                        id="media_content_file"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          setValue(`curriculum[${index}].document_file`, file);
                          const fileRes = await handlePickThumbnail(file);
                          setValue(
                            `curriculum[${index}].document_url`,
                            fileRes.file_url
                          );
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg transition-colors mt-3">
                    <div className="flex items-center gap-3">
                      <MdOutlineQuiz className="w-5 h-5 text-gray-400" />

                      <span className="font-outfit text-slate-800">
                        Has Quiz?
                      </span>
                    </div>
                    <Controller
                      name={`curriculum[${index}].has_quiz`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <Switch
                            isSelected={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button
            color="primary"
            size="sm"
            className="mt-6 font-outfit"
            onPress={() => append(curriculumDefaultRows)}
          >
            <GoPlus size={20} /> Add Lesson
          </Button>
          <div className="flex justify-between gap-2 items-center border-t border-gray-200 py-4 mt-6">
            <Button
              color="primary"
              variant="bordered"
              className="mt-6 font-outfit"
              radius="sm"
              onPress={handlePrev}
            >
              <IoChevronBack /> Prev
            </Button>
            <Button
              color="primary"
              className="mt-6 font-outfit"
              radius="sm"
              onPress={handleContinue}
            >
              Next <IoChevronForward />
            </Button>
          </div>
        </div>
      </main>

      <QuizBuilderModal
        isOpen={isOpenQuizModal.state}
        handleClose={handleCloseQuizModal}
        setValue={setValue}
        lessonIndex={isOpenQuizModal.lessonIndex}
      />
    </>
  );
};
AddCurriculum.propTypes = {
  control: PropTypes.any,
  watch: PropTypes.any,
  setValue: PropTypes.any,
  curriculumDefaultRows: PropTypes.any,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
};
export default AddCurriculum;
