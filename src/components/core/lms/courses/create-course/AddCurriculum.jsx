import { Input } from "antd";
import { useRef } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

const AddCurriculum = (props) => {
  const thumbnailRef = useRef(null);

  const { control, curriculumDefaultRows } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "curriculum",
  });

  const handleClick = () => {
    thumbnailRef.current.click();
  };

  const handlePickThumbnail = (e) => {
    console.log(e.target.files[0]);
  };
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
            <div key={index}>
              <div className="space-y-3 border rounded-lg p-3 relative">
                <div className="flex justify-between items-center">
                  <p className="font-semibold font-outfit">
                    {" "}
                    Lesson {index + 1}
                  </p>
                  {fields.length > 1 && (
                    <div className="absolute right-3 top-3">
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
                <div>
                  <label htmlFor="" className="font-outfit font-light">
                    Lesson Title
                  </label>
                  <Controller
                    control={control}
                    name="lesson_title"
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
                    name="lesson_description"
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input.TextArea
                          placeholder="Enter description"
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
                    Upload Document
                  </label>
                  <div>
                    <div className="mt-1" onClick={handleClick}>
                      <div className="border rounded flex">
                        <p className="bg-gray-100 px-3 font-medium font-outfit flex items-center">
                          Choose File
                        </p>
                        <div className="py-2 px-3 font-outfit">
                          No file choosen
                          <p className="font-outfit text-gray-300 text-xs">
                            pdf, doc, ppt, txt, xls, xlsx, zip, mp4
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="./png"
                      className="hidden"
                      ref={thumbnailRef}
                      onChange={handlePickThumbnail}
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
            >
              <IoChevronBack /> Prev
            </Button>
            <Button color="primary" className="mt-6 font-outfit" radius="sm">
              Next <IoChevronForward />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};
AddCurriculum.propTypes = {
  control: PropTypes.any,
  watch: PropTypes.any,
  curriculumDefaultRows: PropTypes.any,
};
export default AddCurriculum;
