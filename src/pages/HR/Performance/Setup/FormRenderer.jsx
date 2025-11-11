// // ============================================
// // 1. FormRenderer.jsx - Reusable Form Renderer
// // ============================================
// import { useForm, Controller } from "react-hook-form";
// import { Input, Select, Checkbox, Rate, Radio } from "antd";
// import { Button } from "@nextui-org/react";

// const { TextArea } = Input;

// const FormRenderer = ({ sections, onSubmit, mode = "fill" }) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const handleRateChange = (value, elementKey) => {
//     setValue(elementKey, { rate: value, comment: "" });
//   };

//   const renderFormElement = (element) => {
//     switch (element?.type) {
//       case "header":
//         return (
//           <h2 className="text-2xl font-bold tracking-wide text-gray-800">
//             {element?.label}
//           </h2>
//         );

//       case "paragraph":
//         return <p className="text-gray-600">{element?.label}</p>;

//       case "text":
//         return (
//           <Controller
//             name={element?.elementKey}
//             control={control}
//             rules={{
//               required: element?.isRequired
//                 ? `${element?.label} is required`
//                 : false,
//             }}
//             render={({ field, fieldState }) => (
//               <>
//                 <Input
//                   type="text"
//                   placeholder={element?.placeholder}
//                   status={fieldState.error && "error"}
//                   {...field}
//                   size="large"
//                 />
//                 {fieldState.error && (
//                   <span className="text-red-500 text-sm">
//                     {fieldState.error.message}
//                   </span>
//                 )}
//               </>
//             )}
//           />
//         );

//       case "textarea":
//         return (
//           <Controller
//             name={element?.elementKey}
//             control={control}
//             rules={{
//               required: element?.isRequired
//                 ? `${element?.label} is required`
//                 : false,
//             }}
//             render={({ field, fieldState }) => (
//               <>
//                 <TextArea
//                   rows={4}
//                   placeholder={element?.placeholder}
//                   {...field}
//                 />
//                 {fieldState.error && (
//                   <span className="text-red-500 text-sm">
//                     {fieldState.error.message}
//                   </span>
//                 )}
//               </>
//             )}
//           />
//         );

//       case "checkbox":
//         return (
//           <Controller
//             name={element?.elementKey}
//             control={control}
//             render={({ field }) => (
//               <Checkbox.Group options={element?.options} {...field} />
//             )}
//           />
//         );

//       case "radio":
//         return (
//           <Controller
//             name={element?.elementKey}
//             control={control}
//             rules={{
//               required: element?.isRequired
//                 ? `${element?.label} is required`
//                 : false,
//             }}
//             render={({ field, fieldState }) => (
//               <>
//                 <Radio.Group {...field}>
//                   {element?.options?.map((option, index) => (
//                     <Radio
//                       key={option?.value + "_" + index}
//                       value={option.value}
//                     >
//                       {option.label}
//                     </Radio>
//                   ))}
//                 </Radio.Group>
//                 {fieldState.error && (
//                   <span className="text-red-500 text-sm">
//                     {fieldState.error.message}
//                   </span>
//                 )}
//               </>
//             )}
//           />
//         );

//       case "select":
//         return (
//           <Controller
//             name={element?.elementKey}
//             control={control}
//             rules={{
//               required: element?.isRequired
//                 ? `${element?.label} is required`
//                 : false,
//             }}
//             render={({ field, fieldState }) => (
//               <>
//                 <Select
//                   options={element?.options}
//                   size="large"
//                   className="w-full"
//                   {...field}
//                 />
//                 {fieldState.error && (
//                   <span className="text-red-500 text-sm">
//                     {fieldState.error.message}
//                   </span>
//                 )}
//               </>
//             )}
//           />
//         );

//       case "rate":
//         return (
//           <Controller
//             name={element?.elementKey}
//             control={control}
//             render={({ field }) => (
//               <div className="flex flex-col space-y-2">
//                 <Rate
//                   tooltips={["poor", "fair", "good", "very good", "excellent"]}
//                   onChange={(value) =>
//                     handleRateChange(value, element?.elementKey)
//                   }
//                   value={field.value?.rate}
//                 />
//                 {field.value?.rate < 3 && (
//                   <>
//                     <label htmlFor="comment">Comment</label>
//                     <TextArea
//                       rows={4}
//                       onChange={(e) => {
//                         setValue(field.name, {
//                           rate: field?.value?.rate,
//                           comment: e.target.value,
//                         });
//                       }}
//                       value={field.value?.comment}
//                       placeholder="Comment why here..."
//                     />
//                   </>
//                 )}
//               </div>
//             )}
//           />
//         );

//       case "submit":
//         return (
//           <Button
//             type="submit"
//             className="bg-blue-500 text-white"
//             radius="sm"
//             size="sm"
//           >
//             {element?.label}
//           </Button>
//         );

//       default:
//         return null;
//     }
//   };

//   const nonLabelElements = ["submit", "header", "paragraph"];

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {sections?.map((section, sectionIndex) => (
//         <div
//           key={sectionIndex}
//           className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
//         >
//           {/* Section Header */}
//           <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
//             <h2 className="text-lg font-semibold text-gray-900">
//               {section?.header}
//             </h2>
//             {section?.sub_header && (
//               <p className="text-sm text-gray-600 mt-1">
//                 {section?.sub_header}
//               </p>
//             )}
//           </div>

//           {/* Section Content */}
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {section?.formElements?.map((element, elementIndex) => (
//                 <div
//                   key={elementIndex}
//                   className={
//                     ["submit", "header", "paragraph", "textarea"].includes(
//                       element.type
//                     )
//                       ? "md:col-span-2"
//                       : ""
//                   }
//                 >
//                   <div className="space-y-2">
//                     {!nonLabelElements.includes(element?.type) && (
//                       <label className="block text-sm font-medium text-gray-700">
//                         {element?.label}
//                         {element?.isRequired && (
//                           <span className="text-red-500 ml-1">*</span>
//                         )}
//                       </label>
//                     )}
//                     {renderFormElement(element)}
//                     {element?.gradable && (
//                       <div className="mt-2">
//                         <Radio.Group
//                           size="large"
//                           options={element?.grade_element?.options}
//                           disabled
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//       <Button type="submit">Submit</Button>
//     </form>
//   );
// };

// export default FormRenderer;

// ============================================
// FormRenderer.jsx - Reusable Form Renderer with Sub-Questions
// ============================================
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Checkbox, Rate, Radio } from "antd";
import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";

const { TextArea } = Input;

// eslint-disable-next-line no-unused-vars
const FormRenderer = ({ sections, onSubmit, mode = "fill" }) => {
  const { handleSubmit, control, setValue } = useForm();

  const handleRateChange = (value, elementKey) => {
    setValue(elementKey, { rate: value, comment: "" });
  };

  const renderFormElement = (element, isSubQuestion = false) => {
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
                  size={isSubQuestion ? "middle" : "large"}
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
                  rows={isSubQuestion ? 3 : 4}
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
            rules={{
              required: element?.isRequired
                ? `${element?.label} is required`
                : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <Checkbox.Group options={element?.options} {...field} />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
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
                  <div className="flex flex-wrap gap-3">
                    {element?.options?.map((option, index) => (
                      <Radio
                        key={option?.value + "_" + index}
                        value={option.value}
                      >
                        {option.label}
                      </Radio>
                    ))}
                  </div>
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
                  size={isSubQuestion ? "middle" : "large"}
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

  const renderGrading = (element, isSubQuestion = false) => {
    if (!element?.gradable || !element?.grade_element?.options) return null;

    return (
      <div className={`${isSubQuestion ? "mt-3" : "mt-4"}`}>
        <Controller
          name={`${element?.elementKey}_grade`}
          control={control}
          rules={{
            required: element?.grade_element?.isRequired
              ? "Please select a grade"
              : false,
          }}
          render={({ field, fieldState }) => (
            <>
              <Radio.Group {...field} size="large">
                <div className="flex flex-wrap gap-3">
                  {element.grade_element.options.map((option, idx) => (
                    <Radio key={idx} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </div>
              </Radio.Group>
              {fieldState.error && (
                <span className="text-red-500 text-sm">
                  {fieldState.error.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    );
  };

  const renderSubQuestion = (subQuestion, subIndex) => {
    const nonLabelElements = ["submit", "header", "paragraph"];

    return (
      <div
        key={subQuestion.id || subIndex}
        className="ml-6 mt-4 p-4 bg-gray-50 border-l-4 border-blue-300 rounded-md"
      >
        <div className="space-y-2">
          {/* Sub-question label */}
          {!nonLabelElements.includes(subQuestion?.type) && (
            <label className="block text-sm font-medium text-gray-700">
              {subQuestion?.label}
              {subQuestion?.isRequired && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
          )}

          {/* Sub-question input */}
          {renderFormElement(subQuestion, true)}

          {/* Sub-question grading */}
          {renderGrading(subQuestion, true)}
        </div>
      </div>
    );
  };

  const renderMainElement = (element, elementIndex) => {
    const nonLabelElements = ["submit", "header", "paragraph"];

    // Determine if this should span full width
    const shouldSpanFull =
      ["submit", "header", "paragraph", "textarea"].includes(element.type) ||
      (element?.has_sub_question && element?.sub_question?.length > 0);

    return (
      <div key={elementIndex} className={shouldSpanFull ? "md:col-span-2" : ""}>
        <div className="space-y-2">
          {/* Main question label */}
          {!nonLabelElements.includes(element?.type) && (
            <label className="block text-sm font-medium text-gray-700">
              {element?.label}
              {element?.isRequired && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
          )}

          {/* Render main element or sub-questions */}
          {element?.has_sub_question && element?.sub_question?.length > 0 ? (
            // Render sub-questions
            <div className="space-y-3">
              {element.sub_question.map((subQuestion, subIndex) =>
                renderSubQuestion(subQuestion, subIndex)
              )}
            </div>
          ) : (
            // Render normal element
            <>
              {renderFormElement(element, false)}
              {renderGrading(element, false)}
            </>
          )}
        </div>
      </div>
    );
  };

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
              {section?.formElements?.map((element, elementIndex) =>
                renderMainElement(element, elementIndex)
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button type="submit" color="primary" size="lg">
          Submit Form
        </Button>
      </div>
    </form>
  );
};

export default FormRenderer;

FormRenderer.propTypes = {
  sections: PropTypes.array,
  onSubmit: PropTypes.func,
  mode: PropTypes.string,
};
