import { DatePicker, Input, Select } from "antd";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import { IoChevronForward } from "react-icons/io5";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { uploadFileData } from "../../../../../utils/uploadfile";
import dayjs from "dayjs";

const CourseInfo = (props) => {
  const { control, watch, setValue, handleNext } = props;

  const { userData } = useCurrentUser();

  const handlePickThumbnail = async (file) => {
    const res = await uploadFileData(file, userData?.token);
    return {
      ...res,
    };
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
                    {/* <DatePicker.RangePicker
                      className="w-full"
                      size="large"
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(dateString) =>
                        // field.onChange(dateString)
                        console.log(dateString)
                      }
                      disabledDate={(current) =>
                        current < dayjs().startOf("day")
                      }
                    /> */}
                    <DatePicker
                      className="w-full"
                      size="large"
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date, dateString) =>
                        field.onChange(dateString)
                      }
                      disabledDate={(current) =>
                        current < dayjs().startOf("day")
                      }
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
                    <DatePicker
                      className="w-full"
                      size="large"
                      {...field}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date, dateString) =>
                        field.onChange(dateString)
                      }
                      disabledDate={(current) =>
                        watch("start_date")
                          ? current &&
                            current < dayjs(watch("start_date")).startOf("day")
                          : false
                      }
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
          </div>
          <div>
            <label htmlFor="" className="font-outfit">
              Course thumbnail
            </label>

            <label htmlFor="course_thumbnail_file" className="mt-1">
              <div className="border rounded flex">
                <p className="bg-gray-100 p-3 font-medium font-outfit flex items-center">
                  Choose File
                </p>
                <div className="py-2 px-3 font-outfit">
                  {watch("course_thumbnail_file")?.name || "No file choosen"}
                </div>
              </div>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                id="course_thumbnail_file"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  setValue(`course_thumbnail_file`, file);
                  const fileRes = await handlePickThumbnail(file);
                  setValue(`course_thumbnail_url`, fileRes.file_url);
                }}
              />
            </label>
          </div>
          <div className="flex justify-between flex-row-reverse gap-2 items-center border-gray-200 py-4 mt-6">
            <Button
              color="primary"
              className="mt-6 font-outfit"
              radius="sm"
              onPress={handleNext}
            >
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
  setValue: PropTypes.any,
  handleNext: PropTypes.func,
};

export default CourseInfo;
