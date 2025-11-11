// ============================================
// 1. FormRenderer.jsx - Reusable Form Renderer
// ============================================
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Checkbox, Rate, Radio } from "antd";
import { Button } from "@nextui-org/react";

const { TextArea } = Input;

const FormRenderer = ({ sections, onSubmit, mode = "fill" }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRateChange = (value, elementKey) => {
    setValue(elementKey, { rate: value, comment: "" });
  };

  const renderFormElement = (element) => {
    switch (element?.type) {
      case "header":
        return (
          <h2 className="text-2xl font-bold tracking-wide text-gray-800">
            {element?.label}
          </h2>
        );

      case "paragraph":
        return <p className="text-gray-600">{element?.label}</p>;

      case "text":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required: element?.isRequired
                ? `${element?.label} is required`
                : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  type="text"
                  placeholder={element?.placeholder}
                  status={fieldState.error && "error"}
                  {...field}
                  size="large"
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required: element?.isRequired
                ? `${element?.label} is required`
                : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <TextArea
                  rows={4}
                  placeholder={element?.placeholder}
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            render={({ field }) => (
              <Checkbox.Group options={element?.options} {...field} />
            )}
          />
        );

      case "radio":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required: element?.isRequired
                ? `${element?.label} is required`
                : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <Radio.Group {...field}>
                  {element?.options?.map((option, index) => (
                    <Radio
                      key={option?.value + "_" + index}
                      value={option.value}
                    >
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required: element?.isRequired
                ? `${element?.label} is required`
                : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  options={element?.options}
                  size="large"
                  className="w-full"
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "rate":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <Rate
                  tooltips={["poor", "fair", "good", "very good", "excellent"]}
                  onChange={(value) =>
                    handleRateChange(value, element?.elementKey)
                  }
                  value={field.value?.rate}
                />
                {field.value?.rate < 3 && (
                  <>
                    <label htmlFor="comment">Comment</label>
                    <TextArea
                      rows={4}
                      onChange={(e) => {
                        setValue(field.name, {
                          rate: field?.value?.rate,
                          comment: e.target.value,
                        });
                      }}
                      value={field.value?.comment}
                      placeholder="Comment why here..."
                    />
                  </>
                )}
              </div>
            )}
          />
        );

      case "submit":
        return (
          <Button
            type="submit"
            className="bg-blue-500 text-white"
            radius="sm"
            size="sm"
          >
            {element?.label}
          </Button>
        );

      default:
        return null;
    }
  };

  const nonLabelElements = ["submit", "header", "paragraph"];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {sections?.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Section Header */}
          <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {section?.header}
            </h2>
            {section?.sub_header && (
              <p className="text-sm text-gray-600 mt-1">
                {section?.sub_header}
              </p>
            )}
          </div>

          {/* Section Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section?.formElements?.map((element, elementIndex) => (
                <div
                  key={elementIndex}
                  className={
                    ["submit", "header", "paragraph", "textarea"].includes(
                      element.type
                    )
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <div className="space-y-2">
                    {!nonLabelElements.includes(element?.type) && (
                      <label className="block text-sm font-medium text-gray-700">
                        {element?.label}
                        {element?.isRequired && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>
                    )}
                    {renderFormElement(element)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormRenderer;
