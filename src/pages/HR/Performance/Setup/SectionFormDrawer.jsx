// // ============================================
// // SectionFormDrawer.jsx
// // ============================================
// import { Drawer, Input, Radio, Select } from "antd";
// import { Button, Checkbox, Chip } from "@nextui-org/react";
// import { useEffect, useState } from "react";
// import { MdAdd } from "react-icons/md";
// import { showSuccess } from "../../../../utils/messagePopup";
// import { FaPlus } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";

// const fieldTypes = [
//   { label: "Text", value: "text" },
//   { label: "Text Area", value: "textarea" },
//   { label: "Select", value: "select" },
//   { label: "Radio", value: "radio" },
//   { label: "Checkbox", value: "checkbox" },
//   { label: "Rating", value: "rate" },
//   { label: "Header", value: "header" },
//   { label: "Paragraph", value: "paragraph" },
// ];

// const defaultFieldType = "textarea";
// const newField = {
//   id: crypto.randomUUID(),
//   type: defaultFieldType,
//   label: `Question`,
//   has_sub_question: false,
//   sub_question: null,
//   elementKey: `field_${crypto.randomUUID()}`,
//   placeholder: "",
//   isRequired: false,
//   options:
//     defaultFieldType === "select" ||
//     defaultFieldType === "radio" ||
//     defaultFieldType === "checkbox"
//       ? [{ label: "Option 1", value: "option_1" }]
//       : [],
//   specifyFor: { all: true, for_HR: false },
//   grade_element: null,
// };

// const optionsElements = ["radio", "select", "checkbox"];

// const SectionFormDrawer = ({
//   openSectionEditor,
//   closeSectionEditor,
//   sectionId,
//   selectedSection,
//   onUpdateSection, // Function to update section in parent
// }) => {
//   const [fields, setFields] = useState(
//     selectedSection?.formElements?.length
//       ? [...selectedSection?.formElements]
//       : [newField]
//   );

//   const [expandedField, setExpandedField] = useState(null);

//   const [optionInput, setOptionInput] = useState("");

//   const gradingOption = [
//     { id: `option_${crypto.randomUUID}`, label: "Poor", value: 1 },
//     { id: `option_${crypto.randomUUID}`, label: "Fair", value: 2 },
//     { id: `option_${crypto.randomUUID}`, label: "Good", value: 3 },
//     { id: `option_${crypto.randomUUID}`, label: "Very good", value: 4 },
//     { id: `option_${crypto.randomUUID}`, label: "Excellent", value: 5 },
//   ];

//   useEffect(() => {
//     setExpandedField(fields?.length - 1);
//   }, [fields?.length]);

//   // Add new field
//   const addNewField = () => {
//     setFields([...fields, newField]);
//     setExpandedField(fields.length); // Auto-expand the new field
//     // showSuccess("Field added successfully");
//   };

//   // Update field
//   const updateField = (index, updatedData) => {
//     const updatedFields = [...fields];
//     updatedFields[index] = { ...updatedFields[index], ...updatedData };
//     setFields(updatedFields);
//   };

//   // Delete field
//   const deleteField = (index) => {
//     const updatedFields = fields.filter((_, i) => i !== index);
//     setFields(updatedFields);
//   };

//   // Remove option from field
//   const removeOption = (fieldIndex, optionIndex) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].options = updatedFields[
//       fieldIndex
//     ].options.filter((_, i) => i !== optionIndex);
//     setFields(updatedFields);
//   };

//   // Update option
//   //   const updateOption = (fieldIndex, optionIndex, newLabel) => {
//   //     const updatedFields = [...fields];
//   //     updatedFields[fieldIndex].options[optionIndex] = {
//   //       label: newLabel,
//   //       value: newLabel.toLowerCase().replace(/\s+/g, "_"),
//   //     };
//   //     setFields(updatedFields);
//   //   };

//   // Save and close
//   const handleSave = () => {
//     onUpdateSection(sectionId, fields);
//     showSuccess("Section updated successfully");
//     closeSectionEditor();
//   };

//   // Drag and drop handlers
//   //   const handleDragStart = (e, index) => {
//   //     e.dataTransfer.effectAllowed = "move";
//   //     e.dataTransfer.setData("text/html", index);
//   //   };

//   //   const handleDragOver = (e, index) => {
//   //     e.preventDefault();
//   //   };

//   //   const handleDrop = (e, dropIndex) => {
//   //     const dragIndex = parseInt(e.dataTransfer.getData("text/html"));
//   //     const newFields = [...fields];
//   //     const draggedField = newFields[dragIndex];
//   //     newFields.splice(dragIndex, 1);
//   //     newFields.splice(dropIndex, 0, draggedField);
//   //     setFields(newFields);
//   //   };

//   const addOption = (fieldIndex) => {
//     if (!optionInput) return;
//     const value = optionInput.toLowerCase().replace(/\s+/g, "_");
//     const updatedFields = [...fields];
//     const currentOptions = updatedFields[fieldIndex].options || [];
//     const newOption = {
//       id: Date.now(),
//       label: optionInput,
//       value: value,
//     };
//     updatedFields[fieldIndex].options = [...currentOptions, newOption];
//     setFields(updatedFields);
//     setOptionInput("");
//   };

//   const generateNewSubQuestion = (paremtElementKey) => {
//     const elementKeyId = crypto.randomUUID();
//     return {
//       id: `${elementKeyId}`,
//       elementKey: `sub_question__${elementKeyId}`,
//       parent_element_key: paremtElementKey,
//       label: `Question`,
//       placeholder: "",
//       isRequired: false,
//       options:
//         defaultFieldType === "select" ||
//         defaultFieldType === "radio" ||
//         defaultFieldType === "checkbox"
//           ? [{ label: "Option 1", value: "option_1" }]
//           : [],
//       specifyFor: { all: true, for_HR: false },
//       grade_by: {},
//       grade_element: null,
//       ...defaultFieldType,
//     };
//   };

//   const handleAddSubQuestion = (fieldIndex, field) => {
//     const updatedFields = [...fields];
//     updatedFields[fieldIndex].has_sub_question = true;
//     updatedFields[fieldIndex].sub_question = [
//       { ...generateNewSubQuestion(field.elementKey) },
//     ];
//     setFields(updatedFields);
//   };

//   return (
//     <Drawer
//       open={openSectionEditor}
//       onClose={closeSectionEditor}
//       width="600px"
//       title={
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-semibold">
//               {selectedSection?.header || "Form Section"}
//             </h3>
//             <p className="text-sm text-gray-500 font-normal">
//               {selectedSection?.sub_header || "Add and manage fields"}
//             </p>
//           </div>
//           <div>
//             <Button
//               color="primary"
//               startContent={<MdAdd size={20} />}
//               onPress={addNewField}
//               size="sm"
//             >
//               Add New Field
//             </Button>
//           </div>
//         </div>
//       }
//       footer={
//         <div className="flex justify-between items-center">
//           <Button variant="flat" onPress={closeSectionEditor}>
//             Cancel
//           </Button>
//           <Button color="primary" onPress={handleSave}>
//             Save Changes
//           </Button>
//         </div>
//       }
//       styles={{
//         body: { padding: 0 },
//       }}
//     >
//       <div className="h-full flex flex-col">
//         {/* Fields List */}
//         <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
//           {fields.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               <p>No elements yet.</p>
//               <p className="text-sm">Select a field type below to add one.</p>
//             </div>
//           ) : (
//             fields.map((field, index) => (
//               <div
//                 key={field?.id || index}
//                 // draggable
//                 // onDragStart={(e) => handleDragStart(e, index)}
//                 // onDragOver={(e) => handleDragOver(e, index)}
//                 // onDrop={(e) => handleDrop(e, index)}
//                 className="border border-gray-200 rounded-lg bg-gray-100 hover:shadow-md transition-shadow"
//               >
//                 {/* Field Header */}
//                 <div
//                   className="flex items-center justify-between p-4 cursor-pointer"
//                   onClick={() =>
//                     setExpandedField(expandedField === index ? null : index)
//                   }
//                 >
//                   <div className="flex items-center space-x-3 flex-1">
//                     {/* <MdDragIndicator
//                       className="text-gray-400 cursor-move"
//                       size={20}
//                     /> */}
//                     <div className="flex-1">
//                       <div className="flex justify-between">
//                         <p className="font-medium text-gray-900">
//                           Field {index + 1}
//                         </p>
//                         <div className="z-50">
//                           {fields?.length > 1 && (
//                             <button
//                               className="rounded-full bg-gray-200 text-gray-700 hover:text-red-700 p-1"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 deleteField(index);
//                               }}
//                             >
//                               <IoClose size={20} />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-500">
//                         {field?.label} • {field?.type}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Expanded Field Details */}
//                 {expandedField === index && (
//                   <div className="border-t border-gray-200 p-4 space-y-4 bg-white">
//                     {/* Label */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Question <span className="text-red-500">*</span>
//                       </label>
//                       <Input.TextArea
//                         value={field?.label}
//                         autoSize
//                         onChange={(e) =>
//                           updateField(index, { label: e.target.value })
//                         }
//                         size="large"
//                         placeholder="Enter field label"
//                       />
//                       <div className="mt-2 flex justify-end">
//                         <Button
//                           size="sm"
//                           className="font-serif"
//                           onPress={() => handleAddSubQuestion(index, field)}
//                         >
//                           Has Sub Question?
//                         </Button>
//                       </div>
//                     </div>

//                     {
//                         field?.has_sub_question ? <SubQuestions field={field} index={index} updateField={updateField}/>:

//                     <>
//                       {/* Field Type */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Answer Type
//                         </label>
//                         <Select
//                           value={field.type}
//                           onChange={(value) =>
//                             updateField(index, { type: value })
//                           }
//                           options={fieldTypes}
//                           className="w-full"
//                           size="large"
//                         />
//                       </div>

//                       {/* Name/Key */}
//                       <div className="hidden">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Name (field key)
//                         </label>
//                         <Input
//                           value={field.elementKey}
//                           onChange={(e) =>
//                             updateField(index, { elementKey: e.target.value })
//                           }
//                           placeholder="field_name"
//                         />
//                       </div>

//                       {/* Placeholder (for applicable fields) */}
//                       {/* {![
//                       "checkbox",
//                       "radio",
//                       "header",
//                       "paragraph",
//                       "submit",
//                     ].includes(field.type) && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Placeholder (Optional)
//                         </label>
//                         <Input
//                           value={field.placeholder}
//                           onChange={(e) =>
//                             updateField(index, { placeholder: e.target.value })
//                           }
//                           size="large"
//                           placeholder="Enter placeholder text"
//                         />
//                       </div>
//                     )} */}

//                       {/* Options (for select, radio, checkbox) */}
//                       {optionsElements.includes(field.type) && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Options
//                           </label>
//                           <div className="flex gap-2">
//                             {field?.options?.map((option, optionIndex) => (
//                               <Chip
//                                 key={optionIndex}
//                                 onClose={() => removeOption(index, optionIndex)}
//                                 variant="flat"
//                               >
//                                 {option.label}
//                               </Chip>
//                             ))}
//                           </div>
//                           <div className="flex space-x-2 mt-3">
//                             <Input
//                               placeholder="Option label"
//                               value={optionInput}
//                               onChange={(e) => setOptionInput(e.target.value)}
//                               onPressEnter={() => addOption(index)}
//                             />
//                             <Button
//                               color="primary"
//                               onPress={() => addOption(index)}
//                               isIconOnly
//                               className="min-w-[40px]"
//                             >
//                               <FaPlus />
//                             </Button>
//                           </div>
//                         </div>
//                       )}

//                       {/* Required Field Checkbox */}
//                       {!["header", "paragraph", "submit"].includes(
//                         field.type
//                       ) && (
//                         <div className="flex items-center">
//                           <Checkbox
//                             isSelected={field.isRequired}
//                             onChange={(e) =>
//                               updateField(index, {
//                                 isRequired: e.target.checked,
//                               })
//                             }
//                             classNames={{
//                               label: "text-gray-500 text-sm",
//                             }}
//                           >
//                             Required field
//                           </Checkbox>
//                         </div>
//                       )}

//                       {/* Visibility Options */}
//                       <Checkbox
//                         isSelected={field.gradable}
//                         onChange={(e) => {
//                           if (e.target.checked) {
//                             // eslint-disable-next-line no-unused-vars
//                             const {
//                               elementKey,
//                               grade_element,
//                               label,
//                               ...rest
//                             } = newField;
//                             updateField(index, {
//                               gradable: e.target.checked,
//                               grade_element: {
//                                 ...rest,
//                                 isRequired: true,
//                                 type: "checkbox",
//                                 options: gradingOption,
//                               },
//                             });
//                           } else {
//                             updateField(index, {
//                               gradable: e.target.checked,
//                               grade_element: null,
//                             });
//                           }
//                         }}
//                         classNames={{
//                           label: "text-gray-500 text-sm",
//                         }}
//                       >
//                         Gradable?
//                       </Checkbox>

//                       {field.gradable && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             To be gradaded by:
//                           </label>
//                           <div className="flex gap-4">
//                             <Radio.Group
//                               value={field.grade_by}
//                               onChange={(e) => {
//                                 updateField(index, {
//                                   grade_by: e.target.value,
//                                 });
//                               }}
//                             >
//                               <Radio value="counter_sign">
//                                 Counter Signing
//                               </Radio>
//                               <Radio value="appraiser">Appraiser</Radio>
//                             </Radio.Group>
//                           </div>
//                         </div>
//                       )}
//                       {/* {field.gradable && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           Visibility
//                         </label>
//                         <div className="flex gap-4">
//                           <Checkbox
//                             isSelected={field.specifyFor?.all}
//                             onChange={(e) =>
//                               updateField(index, {
//                                 specifyFor: {
//                                   all: e.target.checked,
//                                   for_HR: false,
//                                 },
//                               })
//                             }
//                             classNames={{
//                               label: "text-gray-500 text-sm",
//                             }}
//                           >
//                             General
//                           </Checkbox>
//                           <Checkbox
//                             isSelected={field.specifyFor?.for_HR}
//                             onChange={(e) =>
//                               updateField(index, {
//                                 specifyFor: {
//                                   for_HR: e.target.checked,
//                                   all: false,
//                                 },
//                               })
//                             }
//                             classNames={{
//                               label: "text-gray-500 text-sm",
//                             }}
//                           >
//                             Official only
//                           </Checkbox>
//                         </div>
//                       </div>
//                     )} */}
//                     </>
//                     }
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </Drawer>
//   );
// };

// export default SectionFormDrawer;

// const SubQuestions = ({field, index, updateField}) => {
//     const [subQuestions, setSubQuestions] = useState(field.sub_question);
//     const handleAddSubQuestion = (fieldIndex, field) => {
//     //   const updatedFields = [...subQuestions];
//     //   updatedFields[fieldIndex].has_sub_question = true;
//     //   updatedFields[fieldIndex].sub_question = [
//     //     { ...generateNewSubQuestion(field.elementKey) },
//     //   ];
//     //   setSubQuestions(updatedFields);
//     };

//     const handleRemoveSubQuestion = (fieldIndex, subQuestionIndex) => {
//     //   const updatedFields = [...subQuestions];
//     //   updatedFields[fieldIndex].sub_question.splice(subQuestionIndex, 1);
//     //   setSubQuestions(updatedFields);
//     };

//     return (
//       <>

//    <>
//                       {/* Field Type */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Answer Type
//                         </label>
//                         <Select
//                           value={field.type}
//                           onChange={(value) =>
//                             updateField(index, { type: value })
//                           }
//                           options={fieldTypes}
//                           className="w-full"
//                           size="large"
//                         />
//                       </div>

//                       {/* Name/Key */}
//                       <div className="hidden">
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Name (field key)
//                         </label>
//                         <Input
//                           value={field.elementKey}
//                           onChange={(e) =>
//                             updateField(index, { elementKey: e.target.value })
//                           }
//                           placeholder="field_name"
//                         />
//                       </div>

//                       {/* Options (for select, radio, checkbox) */}
//                       {optionsElements.includes(field.type) && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Options
//                           </label>
//                           <div className="flex gap-2">
//                             {field?.options?.map((option, optionIndex) => (
//                               <Chip
//                                 key={optionIndex}
//                                 onClose={() => removeOption(index, optionIndex)}
//                                 variant="flat"
//                               >
//                                 {option.label}
//                               </Chip>
//                             ))}
//                           </div>
//                           <div className="flex space-x-2 mt-3">
//                             <Input
//                               placeholder="Option label"
//                               value={optionInput}
//                               onChange={(e) => setOptionInput(e.target.value)}
//                               onPressEnter={() => addOption(index)}
//                             />
//                             <Button
//                               color="primary"
//                               onPress={() => addOption(index)}
//                               isIconOnly
//                               className="min-w-[40px]"
//                             >
//                               <FaPlus />
//                             </Button>
//                           </div>
//                         </div>
//                       )}

//                       {/* Required Field Checkbox */}
//                       {!["header", "paragraph", "submit"].includes(
//                         field.type
//                       ) && (
//                         <div className="flex items-center">
//                           <Checkbox
//                             isSelected={field.isRequired}
//                             onChange={(e) =>
//                               updateField(index, {
//                                 isRequired: e.target.checked,
//                               })
//                             }
//                             classNames={{
//                               label: "text-gray-500 text-sm",
//                             }}
//                           >
//                             Required field
//                           </Checkbox>
//                         </div>
//                       )}

//                       {/* Visibility Options */}
//                       <Checkbox
//                         isSelected={field.gradable}
//                         onChange={(e) => {
//                           if (e.target.checked) {
//                             // eslint-disable-next-line no-unused-vars
//                             const {
//                               elementKey,
//                               grade_element,
//                               label,
//                               ...rest
//                             } = newField;
//                             updateField(index, {
//                               gradable: e.target.checked,
//                               grade_element: {
//                                 ...rest,
//                                 isRequired: true,
//                                 type: "checkbox",
//                                 options: gradingOption,
//                               },
//                             });
//                           } else {
//                             updateField(index, {
//                               gradable: e.target.checked,
//                               grade_element: null,
//                             });
//                           }
//                         }}
//                         classNames={{
//                           label: "text-gray-500 text-sm",
//                         }}
//                       >
//                         Gradable?
//                       </Checkbox>

//                       {field.gradable && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             To be gradaded by:
//                           </label>
//                           <div className="flex gap-4">
//                             <Radio.Group
//                               value={field.grade_by}
//                               onChange={(e) => {
//                                 updateField(index, {
//                                   grade_by: e.target.value,
//                                 });
//                               }}
//                             >
//                               <Radio value="counter_sign">
//                                 Counter Signing
//                               </Radio>
//                               <Radio value="appraiser">Appraiser</Radio>
//                             </Radio.Group>
//                           </div>
//                         </div>
//                       )}
//                     </>
//       </>
//     )
//   }

// ============================================
// SectionFormDrawer.jsx
// ============================================
import { Drawer, Input, Radio, Select } from "antd";
import { Button, Checkbox, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { showSuccess } from "../../../../utils/messagePopup";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

const fieldTypes = [
  { label: "Text", value: "text" },
  { label: "Text Area", value: "textarea" },
  { label: "Select", value: "select" },
  { label: "Radio", value: "radio" },
  { label: "Checkbox", value: "checkbox" },
  { label: "Rating", value: "rate" },
  { label: "Header", value: "header" },
  { label: "Paragraph", value: "paragraph" },
];

const defaultFieldType = "textarea";
const optionsElements = ["radio", "select", "checkbox"];

const gradingOption = [
  { id: `option_${crypto.randomUUID()}`, label: "Poor", value: 1 },
  { id: `option_${crypto.randomUUID()}`, label: "Fair", value: 2 },
  { id: `option_${crypto.randomUUID()}`, label: "Good", value: 3 },
  { id: `option_${crypto.randomUUID()}`, label: "Very good", value: 4 },
  { id: `option_${crypto.randomUUID()}`, label: "Excellent", value: 5 },
];

const createNewField = (parentKey = null) => {
  const elementKeyId = crypto.randomUUID();
  return {
    id: crypto.randomUUID(),
    type: defaultFieldType,
    label: `Question`,
    has_sub_question: false,
    sub_question: null,
    elementKey: parentKey
      ? `sub_question__${elementKeyId}`
      : `field_${elementKeyId}`,
    parent_element_key: parentKey,
    placeholder: "",
    isRequired: false,
    options:
      defaultFieldType === "select" ||
      defaultFieldType === "radio" ||
      defaultFieldType === "checkbox"
        ? [{ label: "Option 1", value: "option_1" }]
        : [],
    specifyFor: { all: true, for_HR: false },
    grade_element: null,
  };
};

const SectionFormDrawer = ({
  openSectionEditor,
  closeSectionEditor,
  sectionId,
  selectedSection,
  onUpdateSection,
}) => {
  const [fields, setFields] = useState(
    selectedSection?.formElements?.length
      ? [...selectedSection?.formElements]
      : [createNewField()]
  );

  const [expandedField, setExpandedField] = useState(null);

  useEffect(() => {
    setExpandedField(fields?.length - 1);
  }, [fields?.length]);

  // Add new field
  const addNewField = () => {
    setFields([...fields, createNewField()]);
    setExpandedField(fields.length);
  };

  // Update field
  const updateField = (index, updatedData) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], ...updatedData };
    setFields(updatedFields);
  };

  // Delete field
  const deleteField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  // Save and close
  const handleSave = () => {
    onUpdateSection(sectionId, fields);
    showSuccess("Section updated successfully");
    closeSectionEditor();
  };

  const handleAddSubQuestion = (fieldIndex, field) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].has_sub_question = true;
    updatedFields[fieldIndex].sub_question = [createNewField(field.elementKey)];
    setFields(updatedFields);
  };

  const handleRemoveSubQuestions = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].has_sub_question = false;
    updatedFields[fieldIndex].sub_question = null;
    setFields(updatedFields);
  };

  return (
    <Drawer
      open={openSectionEditor}
      onClose={closeSectionEditor}
      width="600px"
      title={
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {selectedSection?.header || "Form Section"}
            </h3>
            <p className="text-sm text-gray-500 font-normal">
              {selectedSection?.sub_header || "Add and manage fields"}
            </p>
          </div>
          <div>
            <Button
              color="primary"
              startContent={<MdAdd size={20} />}
              onPress={addNewField}
              size="sm"
            >
              Add New Field
            </Button>
          </div>
        </div>
      }
      footer={
        <div className="flex justify-between items-center">
          <Button variant="flat" onPress={closeSectionEditor}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSave}>
            Save Changes
          </Button>
        </div>
      }
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {fields.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No elements yet.</p>
              <p className="text-sm">Select a field type below to add one.</p>
            </div>
          ) : (
            fields.map((field, index) => (
              <div
                key={field?.id || index}
                className="border border-gray-200 rounded-lg bg-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Field Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() =>
                    setExpandedField(expandedField === index ? null : index)
                  }
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-900">
                          Field {index + 1}
                        </p>
                        <div className="z-50">
                          {fields?.length > 1 && (
                            <button
                              className="rounded-full bg-gray-200 text-gray-700 hover:text-red-700 p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteField(index);
                              }}
                            >
                              <IoClose size={20} />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {field?.label} • {field?.type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expanded Field Details */}
                {expandedField === index && (
                  <div className="border-t border-gray-200 p-4 space-y-4 bg-white">
                    {/* Label */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question <span className="text-red-500">*</span>
                      </label>
                      <Input.TextArea
                        value={field?.label}
                        autoSize
                        onChange={(e) =>
                          updateField(index, { label: e.target.value })
                        }
                        size="large"
                        placeholder="Enter field label"
                      />
                      <div className="mt-2 mb-5 flex justify-end gap-2">
                        <Checkbox
                          size="sm"
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleAddSubQuestion(index, field);
                            } else {
                              handleRemoveSubQuestions(index);
                            }
                          }}
                          className="font-medium"
                        >
                          Has Sub Question
                        </Checkbox>
                      </div>
                    </div>

                    {field?.has_sub_question ? (
                      <SubQuestions
                        field={field}
                        fieldIndex={index}
                        updateField={updateField}
                      />
                    ) : (
                      <FieldEditor
                        field={field}
                        index={index}
                        updateField={updateField}
                      />
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Drawer>
  );
};

// Component for editing regular field properties
const FieldEditor = ({ field, index, updateField }) => {
  const [optionInput, setOptionInput] = useState("");

  const removeOption = (optionIndex) => {
    const updatedOptions = field.options.filter((_, i) => i !== optionIndex);
    updateField(index, { options: updatedOptions });
  };

  const addOption = () => {
    if (!optionInput) return;
    const value = optionInput.toLowerCase().replace(/\s+/g, "_");
    const currentOptions = field.options || [];
    const newOption = {
      id: Date.now(),
      label: optionInput,
      value: value,
    };
    updateField(index, { options: [...currentOptions, newOption] });
    setOptionInput("");
  };

  return (
    <>
      {/* Field Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Answer Type
        </label>
        <Select
          value={field.type}
          onChange={(value) => updateField(index, { type: value })}
          options={fieldTypes}
          className="w-full"
          size="large"
        />
      </div>

      {/* Options (for select, radio, checkbox) */}
      {optionsElements.includes(field.type) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          <div className="flex gap-2 flex-wrap">
            {field?.options?.map((option, optionIndex) => (
              <Chip
                key={optionIndex}
                onClose={() => removeOption(optionIndex)}
                variant="flat"
              >
                {option.label}
              </Chip>
            ))}
          </div>
          <div className="flex space-x-2 mt-3">
            <Input
              placeholder="Option label"
              value={optionInput}
              onChange={(e) => setOptionInput(e.target.value)}
              onPressEnter={addOption}
            />
            <Button
              color="primary"
              onPress={addOption}
              isIconOnly
              className="min-w-[40px]"
            >
              <FaPlus />
            </Button>
          </div>
        </div>
      )}

      {/* Required Field Checkbox */}
      {!["header", "paragraph", "submit"].includes(field.type) && (
        <div className="flex items-center">
          <Checkbox
            isSelected={field.isRequired}
            onChange={(e) =>
              updateField(index, {
                isRequired: e.target.checked,
              })
            }
            classNames={{
              label: "text-gray-500 text-sm",
            }}
          >
            Required field
          </Checkbox>
        </div>
      )}

      {/* Gradable Checkbox */}
      <Checkbox
        isSelected={field.gradable}
        onChange={(e) => {
          if (e.target.checked) {
            updateField(index, {
              gradable: true,
              grade_element: {
                id: crypto.randomUUID(),
                type: "radio",
                isRequired: true,
                options: gradingOption,
              },
            });
          } else {
            updateField(index, {
              gradable: false,
              grade_element: null,
            });
          }
        }}
        classNames={{
          label: "text-gray-500 text-sm",
        }}
      >
        Gradable?
      </Checkbox>

      {field.gradable && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To be graded by:
          </label>
          <div className="flex gap-4">
            <Radio.Group
              value={field.grade_by}
              onChange={(e) => {
                updateField(index, {
                  grade_by: e.target.value,
                });
              }}
            >
              <Radio value="counter_sign">Counter Signing</Radio>
              <Radio value="appraiser">Appraiser</Radio>
            </Radio.Group>
          </div>
        </div>
      )}
    </>
  );
};

// Component for managing sub-questions
const SubQuestions = ({ field, fieldIndex, updateField }) => {
  const [subQuestions, setSubQuestions] = useState(field.sub_question || []);
  const [expandedSubQuestion, setExpandedSubQuestion] = useState(0);

  // Update parent field whenever sub-questions change
  useEffect(() => {
    updateField(fieldIndex, { sub_question: subQuestions });
  }, [subQuestions]);

  const addSubQuestion = () => {
    const newSubQuestion = createNewField(field.elementKey);
    setSubQuestions([...subQuestions, newSubQuestion]);
    setExpandedSubQuestion(subQuestions.length);
  };

  const updateSubQuestion = (subIndex, updatedData) => {
    const updated = [...subQuestions];
    updated[subIndex] = { ...updated[subIndex], ...updatedData };
    setSubQuestions(updated);
  };

  const deleteSubQuestion = (subIndex) => {
    const updated = subQuestions.filter((_, i) => i !== subIndex);
    setSubQuestions(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Sub-Questions
        </label>

        <Button
          size="sm"
          color="primary"
          variant="light"
          onPress={addSubQuestion}
        >
          <FaPlus className="mr-1" /> Add Sub-Question
        </Button>
      </div>

      <div className="space-y-3 pl-4 border-l-2 border-blue-200">
        {subQuestions.map((subQuestion, subIndex) => (
          <div
            key={subQuestion.id}
            className="border border-blue-100 rounded-lg bg-blue-50"
          >
            {/* Sub-question header */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() =>
                setExpandedSubQuestion(
                  expandedSubQuestion === subIndex ? null : subIndex
                )
              }
            >
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900 text-sm">
                    Sub-Question {subIndex + 1}
                  </p>
                  <button
                    className="rounded-full bg-blue-200 text-gray-700 hover:text-red-700 p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSubQuestion(subIndex);
                    }}
                  >
                    <IoClose size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {subQuestion?.label} • {subQuestion?.type}
                </p>
              </div>
            </div>

            {/* Expanded sub-question details */}
            {expandedSubQuestion === subIndex && (
              <div className="border-t border-blue-200 p-3 space-y-3 bg-white">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <Input.TextArea
                    value={subQuestion?.label}
                    autoSize
                    onChange={(e) =>
                      updateSubQuestion(subIndex, { label: e.target.value })
                    }
                    size="middle"
                    placeholder="Enter sub-question"
                  />
                </div>

                <SubQuestionEditor
                  subQuestion={subQuestion}
                  subIndex={subIndex}
                  updateSubQuestion={updateSubQuestion}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for editing sub-question properties
const SubQuestionEditor = ({ subQuestion, subIndex, updateSubQuestion }) => {
  const [optionInput, setOptionInput] = useState("");

  const removeOption = (optionIndex) => {
    const updatedOptions = subQuestion.options.filter(
      (_, i) => i !== optionIndex
    );
    updateSubQuestion(subIndex, { options: updatedOptions });
  };

  const addOption = () => {
    if (!optionInput) return;
    const value = optionInput.toLowerCase().replace(/\s+/g, "_");
    const currentOptions = subQuestion.options || [];
    const newOption = {
      id: Date.now(),
      label: optionInput,
      value: value,
    };
    updateSubQuestion(subIndex, { options: [...currentOptions, newOption] });
    setOptionInput("");
  };

  return (
    <>
      {/* Field Type */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Answer Type
        </label>
        <Select
          value={subQuestion.type}
          onChange={(value) => updateSubQuestion(subIndex, { type: value })}
          options={fieldTypes}
          className="w-full"
          size="middle"
        />
      </div>

      {/* Options (for select, radio, checkbox) */}
      {optionsElements.includes(subQuestion.type) && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Options
          </label>
          <div className="flex gap-2 flex-wrap">
            {subQuestion?.options?.map((option, optionIndex) => (
              <Chip
                key={optionIndex}
                onClose={() => removeOption(optionIndex)}
                variant="flat"
                size="sm"
              >
                {option.label}
              </Chip>
            ))}
          </div>
          <div className="flex space-x-2 mt-2">
            <Input
              placeholder="Option label"
              value={optionInput}
              size="small"
              onChange={(e) => setOptionInput(e.target.value)}
              onPressEnter={addOption}
            />
            <Button
              color="primary"
              onPress={addOption}
              isIconOnly
              size="sm"
              className="min-w-[32px]"
            >
              <FaPlus size={12} />
            </Button>
          </div>
        </div>
      )}

      {/* Required Field Checkbox */}
      {!["header", "paragraph", "submit"].includes(subQuestion.type) && (
        <div className="flex items-center">
          <Checkbox
            isSelected={subQuestion.isRequired}
            size="sm"
            onChange={(e) =>
              updateSubQuestion(subIndex, {
                isRequired: e.target.checked,
              })
            }
            classNames={{
              label: "text-gray-500 text-xs",
            }}
          >
            Required field
          </Checkbox>
        </div>
      )}

      {/* Gradable Checkbox */}
      <Checkbox
        isSelected={subQuestion.gradable}
        size="sm"
        onChange={(e) => {
          if (e.target.checked) {
            updateSubQuestion(subIndex, {
              gradable: true,
              grade_element: {
                id: crypto.randomUUID(),
                type: "radio",
                isRequired: true,
                options: gradingOption,
              },
            });
          } else {
            updateSubQuestion(subIndex, {
              gradable: false,
              grade_element: null,
            });
          }
        }}
        classNames={{
          label: "text-gray-500 text-xs",
        }}
      >
        Gradable?
      </Checkbox>

      {subQuestion.gradable && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            To be graded by:
          </label>
          <div className="flex gap-4">
            <Radio.Group
              value={subQuestion.grade_by}
              size="small"
              onChange={(e) => {
                updateSubQuestion(subIndex, {
                  grade_by: e.target.value,
                });
              }}
            >
              <Radio value="counter_sign">Counter Signing</Radio>
              <Radio value="appraiser">Appraiser</Radio>
            </Radio.Group>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionFormDrawer;
