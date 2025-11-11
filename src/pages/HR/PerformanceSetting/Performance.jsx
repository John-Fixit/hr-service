import { useState } from "react";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { Drawer, Input } from "antd";
import FormBuilder from "../Performance/Setup/FormBuilder";
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react";
import FormRenderer from "../Performance/Setup/FormRenderer";
import { formatError } from "../../../utils/messagePopup";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useCreateTemplate } from "../../../API/performance";
import { errorToast, successToast } from "../../../utils/toastMsgPop";

const formData = {
  appraisalHeader: "New Quaterly Appraisal",
  allSection: [
    {
      sectionId: "section_23c753d8-1037-4d8b-9563-9318a5d2386a",
      header: "PRELIMINARY ASSESSMENT",
      sub_header: "",
      formElements: [
        {
          id: "70a977e5-abaa-40d1-8863-0fb92c1a1e1f",
          type: "textarea",
          label:
            "2.1State any special contributions you have made during the year to the activities of your Department/Directorate/Organisation. (such contributions that could earn you special commendation, reward, certificate, special mention or honours).",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_08e1017b-f3c8-44de-b393-af2997b3fe58",
          parent_element_key: null,
          placeholder: "",
          isRequired: true,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "38e9104d-b535-40f7-bc91-70fb69d53cac",
          type: "textarea",
          label:
            "2.2What improvement do you think you have made on any unfavourable report made on your work in the last appraisal exercise?",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_ceae9cee-d226-457a-85b9-287869e38d89",
          parent_element_key: null,
          placeholder: "",
          isRequired: true,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "2ca0d63c-d650-4ed6-8ad9-43e2e9d46264",
          type: "textarea",
          label:
            "2.3State what conditions or circumstances facilitated your performance.",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_06435e89-5bd7-4cd1-bbcd-23c2435a7d64",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
      ],
      gradable: false,
      section_grade_element: null,
      grade_by: {},
      respondent: "",
    },
    {
      sectionId: "section_22714e20-5195-4608-9c85-395a29d8c3a2",
      header: "TASK AND TARGET",
      sub_header: "",
      formElements: [
        {
          id: "e062d433-e0f3-4c3a-ae8e-e3f5c278add1",
          type: "header",
          label: "A. RESPONSIBILITIES: TASKS AND TARGETS",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_7d7b5c05-6a90-46b9-a88d-000cfb97a39a",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "f12453ea-0794-4d5f-b7f7-75e259c9a3f1",
          type: "paragraph",
          label:
            "Briefly list your major responsibilities, in order of importance and for each responsibility, note specific goals set during period under review.",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_231e334c-552d-496d-8ea3-cd503fb11326",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "78c8f04c-aba5-4b23-9fd4-fa90c84cc4ad",
          type: "header",
          label: "B. GENERAL ASSESSMENT",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_e08da997-612e-4944-a8fa-fb7de342d80b",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "8e333a4e-0f2c-439c-bd17-41834d6ed662",
          type: "paragraph",
          label:
            "Rate the employee on each task and target by ticking the column that most accurately describe your rating",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_bc565cd8-00e8-40fd-ba8e-2da1ad2fb54f",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "aebcc7ba-d034-44de-9144-918f327463b4",
          type: "textarea",
          label: "1",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_0030c1ef-9097-4ea1-8098-994bf0d74748",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: {
            id: "9fbe7735-2fe3-4094-9072-58b3ce63f76b",
            type: "radio",
            isRequired: true,
            options: [
              {
                id: "option_7346bcfc-7068-4adc-a4c0-1ee03815a41f",
                label: "Poor",
                value: 1,
              },
              {
                id: "option_02c8f38c-2d62-48a8-8faf-bccd519492f2",
                label: "Fair",
                value: 2,
              },
              {
                id: "option_c145fb42-a4aa-49d8-a2ed-7d622e0fcf7a",
                label: "Good",
                value: 3,
              },
              {
                id: "option_035a5b6d-4fec-4162-a1f0-8a3dbd4e132c",
                label: "Very good",
                value: 4,
              },
              {
                id: "option_62c378e6-80e6-4ab5-b1ff-270a2654be46",
                label: "Excellent",
                value: 5,
              },
            ],
          },
          gradable: true,
          grade_by: "appraiser",
        },
        {
          id: "c10d43dc-69ec-4175-ac10-e52844febbc7",
          type: "textarea",
          label: "2.",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_f0c4f89d-6ff3-42e7-940c-e804eb06d0bc",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: {
            id: "6621696c-921b-4ee8-a2bb-0b2c8025f583",
            type: "radio",
            isRequired: true,
            options: [
              {
                id: "option_7346bcfc-7068-4adc-a4c0-1ee03815a41f",
                label: "Poor",
                value: 1,
              },
              {
                id: "option_02c8f38c-2d62-48a8-8faf-bccd519492f2",
                label: "Fair",
                value: 2,
              },
              {
                id: "option_c145fb42-a4aa-49d8-a2ed-7d622e0fcf7a",
                label: "Good",
                value: 3,
              },
              {
                id: "option_035a5b6d-4fec-4162-a1f0-8a3dbd4e132c",
                label: "Very good",
                value: 4,
              },
              {
                id: "option_62c378e6-80e6-4ab5-b1ff-270a2654be46",
                label: "Excellent",
                value: 5,
              },
            ],
          },
          gradable: true,
          grade_by: "appraiser",
        },
        {
          id: "70704ef1-7358-49f6-a80c-cab6aa24fbd5",
          type: "textarea",
          label: "3",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_826f1c66-9007-4713-90b4-bd32bd2ae305",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: {
            id: "4c95f198-9387-4b27-9a4f-ee67eaf3651e",
            type: "radio",
            isRequired: true,
            options: [
              {
                id: "option_7346bcfc-7068-4adc-a4c0-1ee03815a41f",
                label: "Poor",
                value: 1,
              },
              {
                id: "option_02c8f38c-2d62-48a8-8faf-bccd519492f2",
                label: "Fair",
                value: 2,
              },
              {
                id: "option_c145fb42-a4aa-49d8-a2ed-7d622e0fcf7a",
                label: "Good",
                value: 3,
              },
              {
                id: "option_035a5b6d-4fec-4162-a1f0-8a3dbd4e132c",
                label: "Very good",
                value: 4,
              },
              {
                id: "option_62c378e6-80e6-4ab5-b1ff-270a2654be46",
                label: "Excellent",
                value: 5,
              },
            ],
          },
          gradable: true,
          grade_by: "appraiser",
        },
      ],
      gradable: false,
      section_grade_element: null,
      grade_by: {},
      respondent: "",
    },
    {
      sectionId: "section_fe5392c0-0207-4618-b14e-978459060718",
      header: "PERFORMANCE CRITERIA ",
      sub_header: "",
      formElements: [
        {
          id: "8faae61d-5010-4196-b84c-569b31cd41fa",
          type: "paragraph",
          label:
            "PERFORMANCE CRITERIA (Reporting Officer should omit factors not applicable and tick the column that most accurately suites his/her rating)",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_c78b670b-9bbf-4aa5-a7ab-95a0da7785ec",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "f5c0501c-98ad-48ec-b059-733e1a29a664",
          type: "textarea",
          label: "A. LEADERSHIP & MOTIVATION",
          has_sub_question: true,
          sub_question: [
            {
              id: "27fe54aa-c158-41ba-b8d2-e93fe25e6a04",
              type: "radio",
              label: "Ability to develop subordinates and build teammorale",
              has_sub_question: false,
              sub_question: null,
              elementKey: "sub_question__bbeba37a-cb2a-4689-ad55-e7f848cae71e",
              parent_element_key: "field_9a6aa830-2458-45fa-a949-a1d773016a00",
              placeholder: "",
              isRequired: false,
              options: [
                {
                  id: 1762870650543,
                  label: "Poor",
                  value: "poor",
                },
                {
                  id: 1762870652564,
                  label: "Fair",
                  value: "fair",
                },
                {
                  id: 1762870660961,
                  label: "Good",
                  value: "good",
                },
                {
                  id: 1762870663919,
                  label: "Very Good",
                  value: "very_good",
                },
                {
                  id: 1762870668693,
                  label: "Excellent",
                  value: "excellent",
                },
              ],
              specifyFor: {
                all: true,
                for_HR: false,
              },
              grade_element: null,
            },
            {
              id: "46763a73-05e9-42e1-a967-4af154fc40ee",
              type: "radio",
              label: "Communicate, motivate staff and command respect",
              has_sub_question: false,
              sub_question: null,
              elementKey: "sub_question__81161f6d-1c14-42c7-9392-be850e4c18b8",
              parent_element_key: "field_9a6aa830-2458-45fa-a949-a1d773016a00",
              placeholder: "",
              isRequired: false,
              options: [
                {
                  id: 1762870693481,
                  label: "Poor",
                  value: "poor",
                },
                {
                  id: 1762870694969,
                  label: "Fair",
                  value: "fair",
                },
                {
                  id: 1762870697079,
                  label: "Good",
                  value: "good",
                },
                {
                  id: 1762870699695,
                  label: "Very Good",
                  value: "very_good",
                },
                {
                  id: 1762870702582,
                  label: "Excellent",
                  value: "excellent",
                },
              ],
              specifyFor: {
                all: true,
                for_HR: false,
              },
              grade_element: null,
            },
          ],
          elementKey: "field_9a6aa830-2458-45fa-a949-a1d773016a00",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "bdd1b527-330f-4c88-97ae-56858fb50e85",
          type: "textarea",
          label: "B. DECISION MAKING CAPABILITY",
          has_sub_question: true,
          sub_question: [
            {
              id: "a0f47f09-e09a-4c2d-9c64-bec7f8213065",
              type: "radio",
              label:
                "Ability to specify and analyse issues based on specific aims and objectives",
              has_sub_question: false,
              sub_question: null,
              elementKey: "sub_question__990bff88-6f12-4c7a-be16-0b08143d2403",
              parent_element_key: "field_3abb252c-9b2b-4a3c-ada0-1dfe3cc0b280",
              placeholder: "",
              isRequired: false,
              options: [
                {
                  id: 1762870735094,
                  label: "Poor",
                  value: "poor",
                },
                {
                  id: 1762870736398,
                  label: "Fair",
                  value: "fair",
                },
                {
                  id: 1762870738361,
                  label: "Good",
                  value: "good",
                },
                {
                  id: 1762870740788,
                  label: "V. good",
                  value: "v._good",
                },
                {
                  id: 1762870746211,
                  label: "Excellent",
                  value: "excellent",
                },
              ],
              specifyFor: {
                all: true,
                for_HR: false,
              },
              grade_element: null,
            },
            {
              id: "2541376e-8f42-4120-92ca-22f7c6d33a72",
              type: "radio",
              label: "Acceptance of responsibility for decision making",
              has_sub_question: false,
              sub_question: null,
              elementKey: "sub_question__00764d9c-3688-4928-8fe4-42fd03c57cb6",
              parent_element_key: "field_3abb252c-9b2b-4a3c-ada0-1dfe3cc0b280",
              placeholder: "",
              isRequired: false,
              options: [
                {
                  id: 1762870760227,
                  label: "Poor",
                  value: "poor",
                },
                {
                  id: 1762870761432,
                  label: "Fair",
                  value: "fair",
                },
                {
                  id: 1762870763168,
                  label: "Good",
                  value: "good",
                },
                {
                  id: 1762870765113,
                  label: "V. Good",
                  value: "v._good",
                },
                {
                  id: 1762870769441,
                  label: "Excellent",
                  value: "excellent",
                },
              ],
              specifyFor: {
                all: true,
                for_HR: false,
              },
              grade_element: null,
            },
          ],
          elementKey: "field_3abb252c-9b2b-4a3c-ada0-1dfe3cc0b280",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
      ],
      gradable: false,
      section_grade_element: null,
      grade_by: {},
      respondent: "",
    },
    {
      sectionId: "section_3bc8a5d1-58c7-4d72-8a04-e29a529d9d83",
      header: "EMPLOYEE’S STRENGTHS AND WEAKNESSES",
      sub_header: "",
      formElements: [
        {
          id: "9ff3428e-0dc2-42eb-9f33-e263d238d9e4",
          type: "paragraph",
          label:
            "EMPLOYEE’S STRENGTHS AND WEAKNESSES (To be completed by Reporting Officer)",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_8f1fd888-22b1-4030-a7c7-9627d1123314",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "01a8fc8a-bc6f-4df5-8805-fbfaa5f492a4",
          type: "textarea",
          label: "A. WEAKNESS(ES)",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_e3493fe4-85a7-416b-9edb-94ae49da3ecd",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "b555117a-7c6e-4385-bfa7-05737f6b5877",
          type: "textarea",
          label: "And these can be corrected by doing the following:",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_a16a43c5-e042-4183-a5b8-09478781f316",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "8b403d03-148c-4aa4-8b77-265da00722f2",
          type: "textarea",
          label: "B. STRENGTHS",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_5ed84b3a-5010-4fe9-8b73-2bda57637826",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
        {
          id: "58fe4fb9-915f-48e4-bef0-e0c9fc9b61f4",
          type: "textarea",
          label:
            "And these can be further strengthened by doing the following;",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_0f25d930-71e6-4a35-8cb9-749026d4b532",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
      ],
      gradable: false,
      section_grade_element: null,
      grade_by: {},
      respondent: "appraiser",
    },
    {
      sectionId: "section_63eeb157-2079-4d2f-b25d-26a1dbd5868d",
      header: "COMMENTS BY OFFICER APPRAISED",
      sub_header: "",
      formElements: [
        {
          id: "c428a4de-9243-447d-a45b-b1b495dc7497",
          type: "textarea",
          label: "COMMENTS BY OFFICER APPRAISED",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_ee3dd922-98a9-4a9f-ba02-29ca5142cfaa",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
      ],
      gradable: false,
      section_grade_element: null,
      grade_by: {},
      respondent: "appraisee",
    },
    {
      sectionId: "section_cfea33ca-7044-409c-8973-33deaf00d33a",
      header: "Comment By Appraiser",
      sub_header: "",
      formElements: [
        {
          id: "1bfa2792-921d-4845-9065-3ef1dea7ce6d",
          type: "textarea",
          label: "Appraiser's Comments",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_37b37812-817b-4bd3-b6f6-5660314d06e3",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
      ],
      gradable: false,
      section_grade_element: null,
      grade_by: {},
      respondent: "appraiser",
    },
    {
      sectionId: "section_7c577f0e-92fa-4769-b8f2-423f370aacc1",
      header: "Comment By Countersign",
      sub_header: "",
      formElements: [
        {
          id: "ed20d7bc-8172-4971-abc1-ed9f2dc3aa2c",
          type: "textarea",
          label: "Countersigning Officer’s Comments",
          has_sub_question: false,
          sub_question: null,
          elementKey: "field_5f472815-b84d-48bb-9d24-6b2036ee869a",
          parent_element_key: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
      ],
      gradable: false,
      section_grade_element: null,
      grade_by: {},
      respondent: "counter-sign",
    },
    {
      sectionId: "section_57d61717-2512-40f8-b13e-4a59b82fa40a",
      header: "Recommendation By Appraiser",
      sub_header: "",
      formElements: [
        {
          id: "311363c9-c73e-4b85-a9bf-49d135ddc3b6",
          elementKey: "field_122bfd27-eb4a-4074-8097-7ba811b31677",
          type: "textarea",
          label: "Recommendation",
          has_sub_question: false,
          sub_question: null,
          placeholder: "",
          isRequired: false,
          options: [],
          specifyFor: {
            all: true,
            for_HR: false,
          },
          grade_element: null,
        },
      ],
      gradable: false,
      section_grade_element: null,
      grade_by: {},
      respondent: "appraiser",
    },
  ],
};

const HRISPerformance = () => {
  const [openNewAppraisalDrawer, setOpenNewAppraisalDrawer] = useState(false);
  const [appraisalHeader, setAppraisalHeader] = useState("");
  const [isOpenNewHeaderModal, setIsOpenNewHeaderModal] = useState(false);

  const { userData } = useCurrentUser();

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

  const validateSectionVisibility = (data) => {
    const allHasVisibility = data.allSection.every((section) => {
      return section.respondent !== "";
    });

    if (!allHasVisibility) {
      formatError("Please select at least one section to be visible");
      return false;
    }
    return true;
  };

  const { mutateAsync: createTemplate, isPending: isSubmitting } =
    useCreateTemplate();
  const handleSubmit = async (data) => {
    const validVisibility = validateSectionVisibility(data);

    if (validVisibility) {
      const json = {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        title: data.appraisalHeader,
        template: JSON.stringify(data.allSection),
      };

      try {
        const res = await createTemplate(json);
        console.log(res);
        successToast(res?.data?.message);
        handleCloseNewAppraisal();
      } catch (err) {
        const errMsg = err?.response?.data?.message || err?.message;
        errorToast(errMsg);
      }
    }
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

        {/* <FormRenderer
          appraisalHeader={{
            appraisalHeader: formData.appraisalHeader,
            appraisalSubHeader: formData.appraisalSubHeader,
          }}
          sections={formData.allSection}
          //   onSubmit={handleSubmit}
          mode="fill"
        /> */}
      </main>

      <Modal
        isOpen={isOpenNewHeaderModal}
        onClose={closeHeaderModal}
        isDismissable={false}
        placement="top"
      >
        <ModalContent>
          <ModalBody>
            <div className="space-y-4 pt-4">
              <div>
                <label className="block font-medium text-gray-700 mb-2 text-lg">
                  Performance Title
                </label>
                <Input
                  size="large"
                  value={appraisalHeader.header}
                  onChange={(e) =>
                    setAppraisalHeader({
                      ...appraisalHeader,
                      header: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end">
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
        <FormBuilder
          role="builder"
          appraisalHeader={appraisalHeader}
          setAppraisalHeader={setAppraisalHeader}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Drawer>
    </>
  );
};

export default HRISPerformance;
