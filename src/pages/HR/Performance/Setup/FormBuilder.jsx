// ============================================
// 4. FormBuilder.jsx (Main Component)
// ============================================
import { useState } from "react";
import { Card, CardBody, Button, Chip } from "@nextui-org/react";
import { Modal, Input, Dropdown } from "antd";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DraggableFormElement from "./DraggableFormElement";
import ElementDrawer from "./ElementDrawer";
import { formatError, showSuccess } from "../../../../utils/messagePopup";
import { BsInputCursorText } from "react-icons/bs";
import SectionFormDrawer from "./SectionFormDrawer";

const elemetWithOptions = ["radio", "select", "checkbox"];

const defaultSection = [
  {
    sectionId: `section_${crypto.randomUUID()}`,
    header: "PRELIMINARY ASSESSMENT",
    sub_header: "",
    formElements: [],
  },
  {
    sectionId: `section_${crypto.randomUUID()}`,
    header: "JOB PERFORMANCE",
    sub_header: "",
    formElements: [],
  },
  {
    sectionId: `section_${crypto.randomUUID()}`,
    header: "PERFORMANCE CRITERIA",
    sub_header: "",
    formElements: [],
  },
];

const FormBuilder = ({ role = "builder", appraisalHeader }) => {
  const [allSection, setAllSection] = useState(defaultSection || []);
  const [activeSelectedSection, setActiveSelectedSection] = useState(null);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [editSection, setEditSection] = useState(false);

  const [openSectionDrawerDetail, setOpenSectionDrawerDetail] = useState({
    state: false,
    sectionIdx: null,
  });

  const [sectionHeader, setSectionHeader] = useState({
    header: "",
    sub_header: "",
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [elementForm, setElementForm] = useState({
    type: "text",
    label: "",
    placeholder: "",
    options: [],
    isRequired: false,
    specifyFor: { all: true, for_HR: false },
    editIndex: null,
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  // Drag and Drop Handlers
  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOverItem(index);
  };

  const handleDrop = (e, sectionIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedOverItem === null) return;

    const newElements = [...allSection[sectionIndex].formElements];
    const draggedElement = newElements[draggedItem];
    newElements.splice(draggedItem, 1);
    newElements.splice(draggedOverItem, 0, draggedElement);

    const updatedSections = [...allSection];
    updatedSections[sectionIndex].formElements = newElements;
    setAllSection(updatedSections);

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  // Section Management
  const addSection = () => {
    if (!sectionHeader.header && !sectionHeader.sub_header) {
      formatError("Please provide at least a header or sub header");
      return;
    }

    if (editSection && activeSelectedSection !== null) {
      const updatedSections = [...allSection];
      updatedSections[activeSelectedSection] = {
        ...updatedSections[activeSelectedSection],
        header: sectionHeader.header,
        sub_header: sectionHeader.sub_header,
      };
      setAllSection(updatedSections);
      setEditSection(false);
    } else {
      setAllSection([
        ...allSection,
        {
          sectionId: `section_${crypto.randomUUID()}`,
          header: sectionHeader.header,
          sub_header: sectionHeader.sub_header,
          formElements: [],
        },
      ]);
      setActiveSelectedSection(allSection.length);
    }

    setSectionHeader({ header: "", sub_header: "" });
    setOpenSectionModal(false);
    showSuccess("Section added successfully");
  };

  const editSectionFn = (index) => {
    setActiveSelectedSection(index);
    setEditSection(true);
    setSectionHeader({
      header: allSection[index].header,
      sub_header: allSection[index].sub_header,
    });
    setOpenSectionModal(true);
  };

  const removeSection = (index) => {
    setAllSection(allSection.filter((_, i) => i !== index));
    if (activeSelectedSection === index) {
      setActiveSelectedSection(null);
    }
    showSuccess("Section removed successfully");
  };

  const saveElement = () => {
    if (!elementForm.label) {
      formatError("Label is required");
      return;
    }

    const elementKey = `field_${crypto.randomUUID()}`;
    const updatedSections = [...allSection];

    // Check for duplicate labels
    const isDuplicate = updatedSections[
      activeSelectedSection
    ].formElements.some(
      (el, idx) => el.elementKey === elementKey && idx !== elementForm.editIndex
    );

    if (isDuplicate) {
      formatError("This label already exists. Please use a different label.");
      return;
    }

    if (
      elemetWithOptions.includes(elementForm.type) &&
      elementForm.options.length === 0
    ) {
      formatError("Please add options for this element");
      return;
    }

    const newElement = {
      type: elementForm.type,
      label: elementForm.label,
      placeholder: elementForm.placeholder,
      options: elementForm.options,
      isRequired: elementForm.isRequired,
      specifyFor: elementForm.specifyFor,
      elementKey,
    };

    if (elementForm.editIndex !== null) {
      updatedSections[activeSelectedSection].formElements[
        elementForm.editIndex
      ] = newElement;
    } else {
      updatedSections[activeSelectedSection].formElements.push(newElement);
    }

    setAllSection(updatedSections);
    setDrawerOpen(false);
    // showSuccess(
    //   elementForm.editIndex !== null
    //     ? "Element updated successfully"
    //     : "Element added successfully"
    // );
  };

  const editElement = (sectionIdx, elementIdx) => {
    const element = allSection[sectionIdx].formElements[elementIdx];
    setActiveSelectedSection(sectionIdx);
    setElementForm({
      ...element,
      editIndex: elementIdx,
    });
    setDrawerOpen(true);
  };

  const removeElement = (elementIdx) => {
    const updatedSections = [...allSection];
    updatedSections[activeSelectedSection].formElements.splice(elementIdx, 1);
    setAllSection(updatedSections);
    showSuccess("Element removed successfully");
  };

  // Save Form
  const handleSaveFn = () => {
    const payload = {
      appraisalHeader: appraisalHeader.header,
      appraisalSubHeader: appraisalHeader.sub_header,
      allSection,
    };
    console.log("Form Structure:", allSection, JSON.stringify(payload));

    showSuccess("Form saved successfully");
  };

  const openSectionDrawer = (sectionIdx) => {
    setOpenSectionDrawerDetail({
      state: true,
      sectionIdx,
    });
  };
  const closeSectionDrawer = (sectionIdx) => {
    setOpenSectionDrawerDetail({
      state: false,
      sectionIdx,
    });
  };

  const handleUpdateSection = (sectionId, updatedFields) => {
    const updatedSections = [...allSection];
    updatedSections[sectionId].formElements = updatedFields;
    setAllSection(updatedSections);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {appraisalHeader?.header}
            </h1>
            <p className="text-gray-600 mt-1">{appraisalHeader?.sub_header}</p>
          </div>
          {allSection.length > 0 && (
            <Button
              color="primary"
              onPress={handleSaveFn}
              className="bg-blue-500"
            >
              Save Form
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Form Canvas */}
          <div className="sidebar-for-sections"></div>
          <div
            className={allSection.length ? "lg:col-span-3" : "lg:col-span-4"}
          >
            {allSection.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-16 text-center">
                <IoIosAddCircleOutline
                  size={80}
                  className="text-gray-300 mx-auto mb-4 cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => setOpenSectionModal(true)}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Start Building Your Form
                </h3>
                <p className="text-gray-600 mb-6">
                  Add your first section to get started
                </p>
                <Button
                  color="primary"
                  onPress={() => setOpenSectionModal(true)}
                  className="bg-blue-500"
                >
                  Add New Section
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {allSection.map((section, sectionIdx) => (
                  <div
                    key={sectionIdx}
                    onClick={() => setActiveSelectedSection(sectionIdx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, sectionIdx)}
                    className="border rounded-xl"
                  >
                    <Card
                      className={`shadow-sm transition-all cursor-pointer ${
                        activeSelectedSection === sectionIdx
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      {/* Section Header */}
                      <div className="bg-gray-200 border-b border-gray-200 px-6 py-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                              {section.header}
                            </h2>
                            {section.sub_header && (
                              <p className="text-sm text-gray-600 mt-1">
                                {section.sub_header}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-3 items-center">
                            <Button
                              isIconOnly
                              radius="full"
                              variant="light"
                              onPress={() => openSectionDrawer(sectionIdx)}
                            >
                              <BsInputCursorText size={22} />
                            </Button>
                            <Dropdown
                              menu={{
                                items: [
                                  {
                                    key: "edit",
                                    label: (
                                      <button
                                        onClick={() =>
                                          editSectionFn(sectionIdx)
                                        }
                                        className="flex items-center gap-2"
                                      >
                                        <FaEdit size={16} color="blue" />
                                        Edit
                                      </button>
                                    ),
                                  },
                                  {
                                    key: "delete",
                                    label: (
                                      <button
                                        onClick={() =>
                                          removeSection(sectionIdx)
                                        }
                                        className="flex items-center gap-2"
                                      >
                                        <MdOutlineDeleteOutline
                                          size={18}
                                          color="red"
                                        />
                                        Delete
                                      </button>
                                    ),
                                  },
                                ],
                              }}
                              placement="bottomRight"
                            >
                              <button
                                type="button"
                                className="hover:bg-gray-100 p-1 rounded"
                              >
                                <IoEllipsisVerticalSharp size={20} />
                              </button>
                            </Dropdown>
                          </div>
                        </div>
                      </div>

                      <SectionFormDrawer
                        openSectionEditor={openSectionDrawerDetail.state}
                        closeSectionEditor={() => closeSectionDrawer()}
                        sectionId={sectionIdx}
                        selectedSection={section}
                        onUpdateSection={handleUpdateSection}
                      />

                      {/* Section Content */}
                      <CardBody>
                        {section.formElements.length === 0 ? (
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
                            <p className="text-gray-500">
                              No elements yet. Select an element type from the
                              sidebar.
                            </p>
                          </div>
                        ) : (
                          <div className="gri grid-cols-1 md:grid-cols-2 gap-4 space-y-6">
                            {section.formElements.map((element, elementIdx) => (
                              <div
                                key={elementIdx}
                                draggable
                                onDragStart={() => handleDragStart(elementIdx)}
                                onDragOver={(e) =>
                                  handleDragOver(e, elementIdx)
                                }
                                className={
                                  [
                                    "submit",
                                    "header",
                                    "paragraph",
                                    "textarea",
                                  ].includes(element.type)
                                    ? "md:col-span-2"
                                    : ""
                                }
                              >
                                <DraggableFormElement
                                  element={element}
                                  index={elementIdx}
                                  onEdit={() =>
                                    editElement(sectionIdx, elementIdx)
                                  }
                                  onRemove={() => removeElement(elementIdx)}
                                  isDragging={draggedItem === elementIdx}
                                  isDraggedOver={draggedOverItem === elementIdx}
                                  componentRole={role}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </div>
                ))}

                {/* Add New Section Button */}
                <div className="text-center py-8">
                  <IoIosAddCircleOutline
                    size={60}
                    className="text-blue-500 mx-auto mb-3 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => setOpenSectionModal(true)}
                  />
                  <p className="text-gray-600">Add New Section</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Modal */}
      <Modal
        open={openSectionModal}
        onCancel={() => {
          setOpenSectionModal(false);
          setEditSection(false);
          setSectionHeader({ header: "", sub_header: "" });
        }}
        title={editSection ? "Edit Section" : "Add New Section"}
        footer={[
          <Button
            className="ml-4"
            key="save"
            color="primary"
            onPress={addSection}
            size="small"
          >
            {editSection ? "Update" : "Add"} Section
          </Button>,
        ]}
      >
        <div className="space-y-4 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Header
            </label>
            <Input
              size="large"
              value={sectionHeader.header}
              onChange={(e) =>
                setSectionHeader({ ...sectionHeader, header: e.target.value })
              }
              placeholder="e.g., Personal Information"
            />
          </div>
        </div>
      </Modal>

      {/* Element Drawer */}
      <ElementDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        elementForm={elementForm}
        setElementForm={setElementForm}
        onSave={saveElement}
        isEditing={elementForm.editIndex !== null}
      />
    </div>
  );
};

export default FormBuilder;
