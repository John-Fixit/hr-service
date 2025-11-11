import { useState } from "react";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { Drawer, Input } from "antd";
import FormBuilder from "../Performance/Setup/FormBuilder";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import FormRenderer from "../Performance/Setup/FormRenderer";

const formData = {
  appraisalHeader: "fjvjhdfvdfv",
  appraisalSubHeader: "vdjhbjfdbvjdjvdv",
  allSection: [
    {
      sectionId: 0,
      header: "Biography",
      sub_header: "",
      formElements: [
        {
          id: 1762801599560,
          type: "textarea",
          label: "Can you explain your task you did yesterday",
          elementKey: "field_1",
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: { all: true, for_HR: false },
        },
      ],
    },
    {
      sectionId: 1,
      header: "Performance",
      sub_header: "",
      formElements: [
        {
          id: 1762804695397,
          type: "textarea",
          label: "What's your age range",
          elementKey: "field_2",
          placeholder: "",
          isRequired: true,
          options: [],
          specifyFor: { all: true, for_HR: false },
        },
        {
          id: 1762805147393,
          type: "textarea",
          label: "What's your certification",
          elementKey: "field_2",
          placeholder: "",
          isRequired: true,
          options: [],
          specifyFor: { all: true, for_HR: false },
        },
        {
          id: 1762805899773,
          type: "textarea",
          label: "Label 3",
          elementKey: "field_3",
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: { all: true, for_HR: false },
        },
        {
          id: "c8a60b4b-7251-42f9-bed7-a31445ccbbd3",
          type: "select",
          label: "Where did you come from",
          elementKey: "field_10717d05-3bef-4868-85f6-f64faf4b8e11",
          placeholder: "select your state",
          isRequired: false,
          options: [
            { id: 1762806652361, label: "Oyo", value: "oyo" },
            { id: 1762806659493, label: "Lagos", value: "lagos" },
            { id: 1762806663254, label: "Ekiti", value: "ekiti" },
            { id: 1762806666067, label: "Osun", value: "osun" },
            { id: 1762806669240, label: "Ijebu", value: "ijebu" },
          ],
          specifyFor: { all: true, for_HR: false },
        },
      ],
    },
  ],
};

const HRISPerformance = () => {
  const [openNewAppraisalDrawer, setOpenNewAppraisalDrawer] = useState(false);
  const [appraisalHeader, setAppraisalHeader] = useState("");
  const [isOpenNewHeaderModal, setIsOpenNewHeaderModal] = useState(false);

  const openHeaderModal = () => {
    setIsOpenNewHeaderModal(true);
  };
  const closeHeaderModal = () => {
    setIsOpenNewHeaderModal(false);
  };

  const handleOpenNewAppraisal = () => {
    setOpenNewAppraisalDrawer(true);
  };
  const handleCloseNewAppraisal = () => {
    setOpenNewAppraisalDrawer(false);
  };

  const handleSaveAppraisalHeader = () => {
    closeHeaderModal();
    handleOpenNewAppraisal();
  };

  const handleSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <>
      <main>
        <PageHeader
          header_text={"Performance"}
          breadCrumb_data={[{ name: "HR" }, { name: "Performance" }]}
          buttonProp={[
            {
              button_text: "New Appraisal",
              fn: () => openHeaderModal(),
            },
          ]}
        />

        <FormRenderer
          appraisalHeader={{
            appraisalHeader: formData.appraisalHeader,
            appraisalSubHeader: formData.appraisalSubHeader,
          }}
          sections={formData.allSection}
          onSubmit={handleSubmit}
          mode="fill"
        />
      </main>

      <Modal
        isOpen={isOpenNewHeaderModal}
        onClose={closeHeaderModal}
        isDismissable={false}
        //   open={openSectionModal}

        //   title={editSection ? "Edit Section" : "Add New Section"}
        //   footer={[
        //     <Button
        //       key="cancel"
        //       variant="flat"
        //       onPress={() => {
        //         setOpenSectionModal(false);
        //         setEditSection(false);
        //         setSectionHeader({ header: "", sub_header: "" });
        //       }}
        //     >
        //       Cancel
        //     </Button>,
        //     <Button key="save" color="primary" onPress={addSection}>
        //       {editSection ? "Update" : "Add"} Section
        //     </Button>,
        //   ]}
      >
        <ModalContent>
          <ModalBody>
            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Performance Title
                </label>
                <Input
                  size="large"
                  // value={sectionHeader.header}
                  onChange={(e) =>
                    setAppraisalHeader({
                      ...appraisalHeader,
                      header: e.target.value,
                    })
                  }
                  placeholder="e.g., Personal Information"
                />
              </div>

              <div>
                <Button color="primary" onPress={handleSaveAppraisalHeader}>
                  Continue
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Drawer
        open={openNewAppraisalDrawer}
        maskClosable={false}
        width={"1500px"}
        onClose={handleCloseNewAppraisal}
      >
        <FormBuilder role="builder" appraisalHeader={appraisalHeader} />
      </Drawer>
    </>
  );
};

export default HRISPerformance;
