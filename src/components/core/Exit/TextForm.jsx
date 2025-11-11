/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";
import useFormStore from "./store";
import Label from "../../forms/FormElements/Label";
import dayjs from "dayjs";
import { DatePicker, Select as AntSelect } from "antd";
import { useEffect } from "react";
import { debounce } from "lodash";
import { useGetReason } from "../../../API/exit";


export default function TextForm({ onNext }) {


    const { data: reason_data, isLoading: loadingReason } = useGetReason()

    // console.log(get_reason_data)




  const { updateData, data } = useFormStore();


  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      ...data?.data
    },
  })


  // console.log()


  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, []);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    const {reason, date} = values
    updateData({ data: { ...data.data, reason, date }, dataError: errors });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues, errors);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues, errors, debouncedUpdateData]);



  



  const onSubmit = (value) => {
    const {reason, date} = value
    updateData({ data: { ...data.data, reason, date  }});
    onNext();
  };

  const reasons = reason_data?.map((item) => {
    return {
      ...item,
      value: item?.EXIT_REASON_ID,
      label: item?.DESCRIPTION,
    };
  });

  const handleChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-md borde flex justify-center flex-col gap-4">
        <div className="">
          <Label>Reason for leaving</Label>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="reason"
                  size="large"
                  placeholder="Select leave reason"
                  showSearch
                  optionFilterProp="label"
                  loading={loadingReason}
                  options={reasons}
                  defaultValue={getValues("reason")}
                  status={
                    touchedFields?.directorate && errors?.directorate
                      ? "error"
                      : ""
                  }
                  {...field}
                  value={
                    reasons?.find((opt) => opt.value === field.value)?.label
                  }
                  onChange={(value) => handleChange(value, "reason")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.directorate && errors?.directorate?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="">
          <Label>Date</Label>
          <Controller
            name="date"
            control={control}
            render={({field}) => (
              <>
                <DatePicker
                
                  defaultValue={
                    getValues("date")
                      ? dayjs(getValues("date"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null} // Ensure `value` is properly formatted
                  onChange={(date, dateString) => {
                    field.onChange(dateString); // Call field's onChange
                    handleChange(dateString, "date"); // Trigger your custom onChange if needed
                  }}
                  status={
                    touchedFields.first_appointment_date && errors.first_appointment_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.first_appointment_date &&
                    errors?.first_appointment_date?.message}
                </span>
              </>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>
      </div>
        <div className="flex justify-end py-3">
          <button
            type="submit"
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
