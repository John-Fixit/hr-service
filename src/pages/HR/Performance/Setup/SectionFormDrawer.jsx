// ============================================
// SectionFormDrawer.jsx
// ============================================
import { Drawer, Input, Select } from "antd";
import { Button, Checkbox, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { showSuccess } from "../../../../utils/messagePopup";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

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

const SectionFormDrawer = ({
  openSectionEditor,
  closeSectionEditor,
  sectionId,
  selectedSection,
  onUpdateSection, // Function to update section in parent
}) => {
  const [fields, setFields] = useState(selectedSection?.formElements || []);

  const [expandedField, setExpandedField] = useState(null);

  const [optionInput, setOptionInput] = useState("");

  const gradingOption = ["Poor", "Fair", "Good", "Very good", "Excellent"];

  const defaultFieldType = "textarea";
  const newField = {
    id: crypto.randomUUID(),
    type: defaultFieldType,
    label: `Question`,
    elementKey: `field_${crypto.randomUUID()}`,
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

  useEffect(() => {
    if (!selectedSection?.formElements?.length) {
      setFields([...fields, newField]);
    }

    setExpandedField(fields?.length - 1);
  }, []);

  // Add new field
  const addNewField = () => {
    setFields([...fields, newField]);
    setExpandedField(fields.length); // Auto-expand the new field
    // showSuccess("Field added successfully");
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

  // Remove option from field
  const removeOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options = updatedFields[
      fieldIndex
    ].options.filter((_, i) => i !== optionIndex);
    setFields(updatedFields);
  };

  // Update option
  const updateOption = (fieldIndex, optionIndex, newLabel) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].options[optionIndex] = {
      label: newLabel,
      value: newLabel.toLowerCase().replace(/\s+/g, "_"),
    };
    setFields(updatedFields);
  };

  // Save and close
  const handleSave = () => {
    onUpdateSection(sectionId, fields);
    showSuccess("Section updated successfully");
    closeSectionEditor();
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    const dragIndex = parseInt(e.dataTransfer.getData("text/html"));
    const newFields = [...fields];
    const draggedField = newFields[dragIndex];
    newFields.splice(dragIndex, 1);
    newFields.splice(dropIndex, 0, draggedField);
    setFields(newFields);
  };

  const addOption = (fieldIndex) => {
    if (!optionInput) return;
    const value = optionInput.toLowerCase().replace(/\s+/g, "_");
    const updatedFields = [...fields];
    const currentOptions = updatedFields[fieldIndex].options || [];
    const newOption = {
      id: Date.now(),
      label: optionInput,
      value: value,
    };
    updatedFields[fieldIndex].options = [...currentOptions, newOption];
    setFields(updatedFields);
    setOptionInput("");
  };

  const optionsElements = ["radio", "select", "checkbox"];

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
        {/* Fields List */}
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
                // draggable
                // onDragStart={(e) => handleDragStart(e, index)}
                // onDragOver={(e) => handleDragOver(e, index)}
                // onDrop={(e) => handleDrop(e, index)}
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
                    {/* <MdDragIndicator
                      className="text-gray-400 cursor-move"
                      size={20}
                    /> */}
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
                      <Input
                        value={field?.label}
                        onChange={(e) =>
                          updateField(index, { label: e.target.value })
                        }
                        size="large"
                        placeholder="Enter field label"
                      />
                    </div>

                    {/* Field Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Answer Type
                      </label>
                      <Select
                        value={field.type}
                        onChange={(value) =>
                          updateField(index, { type: value })
                        }
                        options={fieldTypes}
                        className="w-full"
                        size="large"
                      />
                    </div>

                    {/* Name/Key */}
                    <div className="hidden">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name (field key)
                      </label>
                      <Input
                        value={field.elementKey}
                        onChange={(e) =>
                          updateField(index, { elementKey: e.target.value })
                        }
                        placeholder="field_name"
                      />
                    </div>

                    {/* Placeholder (for applicable fields) */}
                    {/* {![
                      "checkbox",
                      "radio",
                      "header",
                      "paragraph",
                      "submit",
                    ].includes(field.type) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Placeholder (Optional)
                        </label>
                        <Input
                          value={field.placeholder}
                          onChange={(e) =>
                            updateField(index, { placeholder: e.target.value })
                          }
                          size="large"
                          placeholder="Enter placeholder text"
                        />
                      </div>
                    )} */}

                    {/* Options (for select, radio, checkbox) */}
                    {optionsElements.includes(field.type) && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Options
                        </label>
                        <div className="flex gap-2">
                          {field?.options?.map((option, optionIndex) => (
                            <Chip
                              key={optionIndex}
                              onClose={() => removeOption(index, optionIndex)}
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
                            onPressEnter={() => addOption(index)}
                          />
                          <Button
                            color="primary"
                            onPress={() => addOption(index)}
                            isIconOnly
                            className="min-w-[40px]"
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Required Field Checkbox */}
                    {!["header", "paragraph", "submit"].includes(
                      field.type
                    ) && (
                      <div className="flex items-center">
                        <Checkbox
                          isSelected={field.isRequired}
                          onChange={(e) =>
                            updateField(index, { isRequired: e.target.checked })
                          }
                          classNames={{
                            label: "text-gray-500 text-sm",
                          }}
                        >
                          Required field
                        </Checkbox>
                      </div>
                    )}

                    {/* Visibility Options */}
                    <Checkbox
                      isSelected={field.gradable}
                      onChange={(e) => {
                        if (e.target.checked) {
                          newField.grade_element = { ...newField };
                        } else {
                          newField.grade_element = null;
                        }
                        updateField(index, {
                          gradable: e.target.checked,
                        });
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
                          To be gradaded by:
                        </label>
                        <div className="flex gap-4">
                          <Checkbox
                            isSelected={field.graded_by?.general}
                            onChange={(e) =>
                              updateField(index, {
                                graded_by: {
                                  general: e.target.checked,
                                  for_HR: false,
                                },
                              })
                            }
                            classNames={{
                              label: "text-gray-500 text-sm",
                            }}
                          >
                            General
                          </Checkbox>
                          <Checkbox
                            isSelected={field.graded_by?.counter_sign}
                            onChange={(e) =>
                              updateField(index, {
                                graded_by: {
                                  counter_sign: e.target.checked,
                                  all: false,
                                },
                              })
                            }
                            classNames={{
                              label: "text-gray-500 text-sm",
                            }}
                          >
                            Counter signing
                          </Checkbox>
                          <Checkbox
                            isSelected={field.graded_by?.appraisee}
                            onChange={(e) =>
                              updateField(index, {
                                graded_by: {
                                  appraisee: e.target.checked,
                                  all: false,
                                },
                              })
                            }
                            classNames={{
                              label: "text-gray-500 text-sm",
                            }}
                          >
                            Appraisee
                          </Checkbox>
                        </div>
                      </div>
                    )}
                    {/* {field.gradable && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Visibility
                        </label>
                        <div className="flex gap-4">
                          <Checkbox
                            isSelected={field.specifyFor?.all}
                            onChange={(e) =>
                              updateField(index, {
                                specifyFor: {
                                  all: e.target.checked,
                                  for_HR: false,
                                },
                              })
                            }
                            classNames={{
                              label: "text-gray-500 text-sm",
                            }}
                          >
                            General
                          </Checkbox>
                          <Checkbox
                            isSelected={field.specifyFor?.for_HR}
                            onChange={(e) =>
                              updateField(index, {
                                specifyFor: {
                                  for_HR: e.target.checked,
                                  all: false,
                                },
                              })
                            }
                            classNames={{
                              label: "text-gray-500 text-sm",
                            }}
                          >
                            Official only
                          </Checkbox>
                        </div>
                      </div>
                    )} */}
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

export default SectionFormDrawer;
