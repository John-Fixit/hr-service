// // ============================================
// // FormRenderer.jsx - Reusable Form Renderer with Sub-Questions
// // ============================================
// // ============================================
// // FormRenderer.jsx - Reusable Form Renderer with Sidebar Navigation
// // ============================================
// import { useForm, Controller } from "react-hook-form";
// import { Input, Select, Checkbox, Rate, Radio } from "antd";
// import { Button } from "@nextui-org/react";
// import PropTypes from "prop-types";
// import { useState, useRef, useEffect, useMemo } from "react";
// import { RiFileList3Line } from "react-icons/ri";

// const { TextArea } = Input;

// const FormRenderer = ({
//   sections,
//   onSubmit,
//   submitButtonText,
//   mode = "fill",
//   viewer,
//   isSubmitting,
// }) => {
//   const formattedSections = useMemo(() => {
//     if (!viewer) return sections;
//     return sections?.filter((section) => section?.respondent === viewer);
//   }, [sections, viewer]);

//   const { handleSubmit, control, setValue } = useForm();
//   const [activeSection, setActiveSection] = useState(0);
//   const sectionRefs = useRef([]);

//   // Scroll to section when clicked
//   const scrollToSection = (index) => {
//     setActiveSection(index);
//     sectionRefs.current[index]?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   // Update active section on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + 100;

//       for (let i = formattedSections.length - 1; i >= 0; i--) {
//         const section = sectionRefs.current[i];
//         if (section && section.offsetTop <= scrollPosition) {
//           setActiveSection(i);
//           break;
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [formattedSections?.length]);

//   const handleRateChange = (value, elementKey) => {
//     setValue(elementKey, { rate: value, comment: "" });
//   };

//   const renderFormElement = (element, isSubQuestion = false) => {
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
//                   size={isSubQuestion ? "middle" : "large"}
//                   disabled={mode === "view"}
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
//                   rows={isSubQuestion ? 3 : 4}
//                   placeholder={element?.placeholder}
//                   {...field}
//                   disabled={mode === "view"}
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
//             rules={{
//               required: element?.isRequired
//                 ? `${element?.label} is required`
//                 : false,
//             }}
//             render={({ field, fieldState }) => (
//               <>
//                 <Checkbox.Group
//                   options={element?.options}
//                   {...field}
//                   disabled={mode === "view"}
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
//                 <Radio.Group {...field} disabled={mode === "view"}>
//                   <div className="flex flex-wrap gap-3">
//                     {element?.options?.map((option, index) => (
//                       <Radio
//                         key={option?.value + "_" + index}
//                         value={option.value}
//                       >
//                         {option.label}
//                       </Radio>
//                     ))}
//                   </div>
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
//                   size={isSubQuestion ? "middle" : "large"}
//                   className="w-full"
//                   disabled={mode === "view"}
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
//                   disabled={mode === "view"}
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
//             disabled={mode === "view"}
//           >
//             {element?.label}
//           </Button>
//         );

//       default:
//         return null;
//     }
//   };

//   const renderGrading = (element, isSubQuestion = false) => {
//     if (!element?.gradable || !element?.grade_element?.options) return null;

//     return (
//       <div className={`${isSubQuestion ? "mt-3" : "mt-4"}`}>
//         <Controller
//           name={`${element?.elementKey}`}
//           control={control}
//           rules={{
//             required: element?.grade_element?.isRequired
//               ? "Please select a grade"
//               : false,
//           }}
//           render={({ field, fieldState }) => (
//             <>
//               <Radio.Group {...field} size="large" disabled={mode === "view"}>
//                 <div className="flex flex-wrap gap-3">
//                   {element.grade_element.options.map((option, idx) => (
//                     <Radio key={idx} value={option.value}>
//                       {option.label}
//                     </Radio>
//                   ))}
//                 </div>
//               </Radio.Group>
//               {fieldState.error && (
//                 <span className="text-red-500 text-sm">
//                   {fieldState.error.message}
//                 </span>
//               )}
//             </>
//           )}
//         />
//       </div>
//     );
//   };

//   const renderSubQuestion = (subQuestion, subIndex) => {
//     const nonLabelElements = ["submit", "header", "paragraph"];

//     return (
//       <div
//         key={subQuestion.id || subIndex}
//         className="ml-6 mt-4 p-4 bg-gray-50 border-l-4 border-blue-300 rounded-md"
//       >
//         <div className="space-y-2">
//           {!nonLabelElements.includes(subQuestion?.type) && (
//             <label className="block text-sm font-medium text-gray-700">
//               {subQuestion?.label}
//               {subQuestion?.isRequired && (
//                 <span className="text-red-500 ml-1">*</span>
//               )}
//             </label>
//           )}

//           {renderFormElement(subQuestion, true)}
//           {viewer === subQuestion?.grade_by && renderGrading(subQuestion, true)}
//         </div>
//       </div>
//     );
//   };

//   const renderMainElement = (element, elementIndex) => {
//     const nonLabelElements = ["submit", "header", "paragraph"];

//     const shouldSpanFull =
//       ["submit", "header", "paragraph", "textarea"].includes(element.type) ||
//       (element?.has_sub_question && element?.sub_question?.length > 0);

//     return (
//       <div key={elementIndex} className={shouldSpanFull ? "md:col-span-2" : ""}>
//         <div className="space-y-2">
//           {!nonLabelElements.includes(element?.type) && (
//             <label className="block text-sm font-medium text-gray-700">
//               {element?.label}
//               {element?.isRequired && (
//                 <span className="text-red-500 ml-1">*</span>
//               )}
//             </label>
//           )}

//           {element?.has_sub_question && element?.sub_question?.length > 0 ? (
//             <div className="space-y-3">
//               {element.sub_question.map((subQuestion, subIndex) =>
//                 renderSubQuestion(subQuestion, subIndex)
//               )}
//             </div>
//           ) : (
//             <>
//               {renderFormElement(element, false)}
//               {viewer === element?.grade_by && renderGrading(element, false)}
//             </>
//           )}
//         </div>
//       </div>
//     );
//   };

//   //   const handleInBuiltSubmit = (data) => {
//   //     console.log()
//   //   }

//   return (
//     <div className="flex h-[calc(100vh-5rem)] bg-gray-50">
//       {/* Left Sidebar - Sections Navigation */}
//       {formattedSections?.length > 0 && (
//         <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
//           <div className="p-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
//                 Form Sections
//               </h3>
//               <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full font-medium">
//                 {formattedSections.length}
//               </span>
//             </div>
//             <p className="text-xs text-gray-500">
//               Click to navigate to section
//             </p>
//           </div>

//           <div className="p-3 space-y-2">
//             {formattedSections.map((section, sectionIdx) => (
//               <div
//                 key={sectionIdx}
//                 onClick={() => scrollToSection(sectionIdx)}
//                 className={`group relative rounded-lg border-1 transition-all cursor-pointer ${
//                   activeSection === sectionIdx
//                     ? "border-primary bg-blue-50 shadow-sm"
//                     : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
//                 }`}
//               >
//                 <div className="p-3">
//                   <div className="flex items-start justify-between gap-2">
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 mb-1">
//                         <RiFileList3Line
//                           className={
//                             activeSection === sectionIdx
//                               ? "text-primary"
//                               : "text-gray-400"
//                           }
//                           size={16}
//                         />
//                         <h4
//                           className={`text-sm font-medium capitalize ${
//                             activeSection === sectionIdx
//                               ? "text-primary font-semibold"
//                               : "text-black"
//                           }`}
//                         >
//                           {section.header?.toLowerCase()}
//                         </h4>
//                       </div>
//                       {section.sub_header && (
//                         <p className="text-xs text-gray-500 ml-6">
//                           {section.sub_header}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Active Indicator */}
//                 {activeSection === sectionIdx && (
//                   <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary rounded-l-lg"></div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Main Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-5xl mx-auto p-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {formattedSections
//               ?.filter((sect, sectIndex) => sectIndex === activeSection)
//               ?.map((section, sectionIndex) => (
//                 <div
//                   key={sectionIndex}
//                   ref={(el) => (sectionRefs.current[sectionIndex] = el)}
//                   className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden scroll-mt-6"
//                 >
//                   {/* Section Header */}
//                   <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
//                     <h2 className="text-lg font-semibold text-gray-900">
//                       {section?.header}
//                     </h2>
//                     {section?.sub_header && (
//                       <p className="text-sm text-gray-600 mt-1">
//                         {section?.sub_header}
//                       </p>
//                     )}
//                   </div>

//                   {/* Section Content */}
//                   <div className="p-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {section?.formElements?.map((element, elementIndex) =>
//                         renderMainElement(element, elementIndex)
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}

//             {/* Submit Button */}
//             {mode === "fill" && (
//               <div className="flex justify-end sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-lg shadow-lg">
//                 <Button type="submit" color="primary" isLoading={isSubmitting}>
//                   {submitButtonText || "Submit Form"}
//                 </Button>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// FormRenderer.propTypes = {
//   sections: PropTypes.array,
//   onSubmit: PropTypes.func,
//   mode: PropTypes.string,
//   submitButtonText: PropTypes.string,
//   viewer: PropTypes.string,
// };

// export default FormRenderer;

import { useForm, Controller } from "react-hook-form";
import { Input, Select, Checkbox, Rate, Radio } from "antd";
import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState, useRef, useEffect, useMemo } from "react";
import { RiFileList3Line } from "react-icons/ri";
import clsx from "clsx";

const { TextArea } = Input;

const FormRenderer = ({
  sections,
  onSubmit,
  submitButtonText,
  mode = "fill",
  viewer,
  isSubmitting,
  responseData = [], // NEW: Accept response data array
  canSaveAsDraft,
  saveAsDraftFunction,
  isDraftLoading,
}) => {
  const formattedSections = useMemo(() => {
    if (!viewer) return sections;

    return sections?.filter((section) => section?.respondent === viewer);
  }, [sections, viewer]);

  const transformResponseToFormData = useMemo(() => {
    return (
      Array.isArray(responseData) &&
      responseData?.reduce((acc, item) => {
        acc[item.ELEMENT_KEY] = item.ANSWER;
        return acc;
      }, {})
    );
  }, [responseData]);

  const { handleSubmit, control, setValue, getValues, reset } = useForm({
    defaultValues: {
      ...transformResponseToFormData,
    }, // NEW: Set default values from response
  });

  useEffect(() => {
    reset({
      ...transformResponseToFormData,
    });
  }, [reset, transformResponseToFormData]);

  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  // Scroll to section when clicked
  const scrollToSection = (index) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = formattedSections.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [formattedSections?.length]);

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
                  disabled={mode === "view"}
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
                  disabled={mode === "view"}
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
                <Checkbox.Group
                  options={element?.options}
                  {...field}
                  disabled={mode === "view"}
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
                <Radio.Group {...field} disabled={mode === "view"}>
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
                  disabled={mode === "view"}
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
                  disabled={mode === "view"}
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
            disabled={mode === "view"}
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
          name={`${element?.elementKey}`}
          control={control}
          rules={{
            required: element?.grade_element?.isRequired
              ? "Please select a grade"
              : false,
          }}
          render={({ field, fieldState }) => (
            <>
              <Radio.Group {...field} size="large" disabled={mode === "view"}>
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
          {!nonLabelElements.includes(subQuestion?.type) && (
            <label className="block text-sm font-medium text-gray-700">
              {subQuestion?.label}
              {subQuestion?.isRequired && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
          )}

          {renderFormElement(subQuestion, true)}
          {viewer === subQuestion?.grade_by && renderGrading(subQuestion, true)}
        </div>
      </div>
    );
  };

  const renderMainElement = (element, elementIndex) => {
    const nonLabelElements = ["submit", "header", "paragraph"];

    const shouldSpanFull =
      ["submit", "header", "paragraph", "textarea"].includes(element.type) ||
      (element?.has_sub_question && element?.sub_question?.length > 0);

    return (
      <div key={elementIndex} className={shouldSpanFull ? "md:col-span-2" : ""}>
        <div className="space-y-2">
          {!nonLabelElements.includes(element?.type) && (
            <label className="block text-sm font-medium text-gray-700">
              {element?.label}
              {element?.isRequired && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
          )}

          {element?.has_sub_question && element?.sub_question?.length > 0 ? (
            <div className="space-y-3">
              {element.sub_question.map((subQuestion, subIndex) =>
                renderSubQuestion(subQuestion, subIndex)
              )}
            </div>
          ) : (
            <>
              {renderFormElement(element, false)}
              {viewer === element?.grade_by && renderGrading(element, false)}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-gray-50">
      {/* Left Sidebar - Sections Navigation */}
      {formattedSections?.length > 0 && (
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Form Sections
              </h3>
              <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full font-medium">
                {formattedSections.length}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Click to navigate to section
            </p>
          </div>

          <div className="p-3 space-y-2">
            {formattedSections.map((section, sectionIdx) => (
              <div
                key={sectionIdx}
                onClick={() => scrollToSection(sectionIdx)}
                className={`group relative rounded-lg border-1 transition-all cursor-pointer ${
                  activeSection === sectionIdx
                    ? "border-primary bg-blue-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <RiFileList3Line
                          className={
                            activeSection === sectionIdx
                              ? "text-primary"
                              : "text-gray-400"
                          }
                          size={16}
                        />
                        <h4
                          className={`text-sm font-medium capitalize ${
                            activeSection === sectionIdx
                              ? "text-primary font-semibold"
                              : "text-black"
                          }`}
                        >
                          {section.header?.toLowerCase()}
                        </h4>
                      </div>
                      {section.sub_header && (
                        <p className="text-xs text-gray-500 ml-6">
                          {section.sub_header}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Active Indicator */}
                {activeSection === sectionIdx && (
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary rounded-l-lg"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {formattedSections?.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                className={clsx(
                  "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden scroll-mt-6",
                  sectionIndex === activeSection ? "" : "hidden"
                )}
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

            {/* Submit Button */}
            {mode === "fill" && (
              <div className="flex justify-end sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-lg shadow-lg gap-2">
                {canSaveAsDraft && (
                  <Button
                    onPress={() => saveAsDraftFunction(getValues())}
                    isLoading={isDraftLoading}
                  >
                    Save as Draft
                  </Button>
                )}
                <Button type="submit" color="primary" isLoading={isSubmitting}>
                  {submitButtonText || "Submit Form"}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

FormRenderer.propTypes = {
  sections: PropTypes.array,
  onSubmit: PropTypes.func,
  mode: PropTypes.string,
  submitButtonText: PropTypes.string,
  viewer: PropTypes.string,
  responseData: PropTypes.array,
  isSubmitting: PropTypes.bool,
  canSaveAsDraft: PropTypes.bool,
  saveAsDraftFunction: PropTypes.func,
  isDraftLoading: PropTypes.bool,
};

export default FormRenderer;
