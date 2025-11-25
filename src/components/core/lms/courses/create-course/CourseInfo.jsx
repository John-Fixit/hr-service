import { DatePicker, Input, Select } from "antd";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import { IoChevronForward } from "react-icons/io5";

const CourseInfo = (props) => {
  const thumbnailRef = useRef(null);

  const { control, watch } = props;

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
          Basic Information
        </h2>
        <p className="font-outfit text-gray-500">
          Fill basic information regarding your course.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="" className="font-outfit">
              Course Category
            </label>
            <Controller
              control={control}
              name="course_category"
              rules={{
                required: "Course Category is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    options={[
                      { label: "Technical", value: "techinal" },
                      { label: "Soft skill", value: "soft skill" },
                      { label: "Other", value: "other" },
                    ]}
                    {...field}
                    size="large"
                    className="w-full"
                    placeholder="Select a category"
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
          {watch("course_category") === "other" && (
            <div>
              <Controller
                control={control}
                name="custom_category"
                rules={{
                  required: "Course category is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      placeholder="Enter your category"
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
          )}
          <div>
            <label htmlFor="" className="font-outfit">
              Course Title
            </label>
            <Controller
              control={control}
              name="course_title"
              rules={{
                required: "Course title is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    placeholder="Enter course title"
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
            <label htmlFor="" className="font-outfit">
              Course Description
            </label>
            <Controller
              control={control}
              name="course_description"
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
            <label htmlFor="" className="font-outfit">
              Course Objective
            </label>
            <Controller
              control={control}
              name="course_objective"
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input.TextArea
                    placeholder="Enter Objective"
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
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="" className="font-outfit">
                Start Date
              </label>
              <Controller
                control={control}
                name="start_date"
                rules={{
                  required: "Start date is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker className="w-full" size="large" {...field} />
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
              <label htmlFor="" className="font-outfit">
                End Date
              </label>
              <Controller
                control={control}
                name="end_date"
                rules={{
                  required: "End date is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker className="w-full" size="large" {...field} />
                    {!!error?.message && (
                      <span className="text-red-400 font-outfit text-sm px-1">
                        {error?.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="font-outfit">
              Course thumbnail
            </label>
            <div>
              <div className="" onClick={handleClick}>
                <div className="border rounded-lg flex">
                  <p className="bg-gray-100 p-3 font-medium font-outfit">
                    Choose File
                  </p>
                  <div className="p-3 font-outfit">No file choosen</div>
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
          <div className="flex justify-between flex-row-reverse gap-2 items-center border-gray-200 py-4 mt-6">
            <Button color="primary" className="mt-6 font-outfit" radius="sm">
              Next <IoChevronForward />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

CourseInfo.propTypes = {
  control: PropTypes.any,
  watch: PropTypes.any,
};

export default CourseInfo;
