/* eslint-disable no-unused-vars */
import PageHeader from "../../../components/payroll_components/PageHeader";
import Body from "../../home/Engage/memo/components/Body";
import { useState } from "react";
import { Input, Button, Select, SelectItem, Checkbox } from "@nextui-org/react";
import ReactQuill from "react-quill";
export default function WorkflowMemos() {
    const recipients = ["CEO", "HR", "Product Manager", "COO", "CTO"];

    const [memo_body, setMemo_body] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [multipleRecipient, setMultipleRecipient] = useState(0);
    const handleSubmitMemo = () => {
      setIsLoading(true);
      // console.log(to, subject, memo_body);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };




     //react quill customized module
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };


  
  return (
    <>
      <main className="bg-white p-3">
        <PageHeader header_text={"Create New Memo Template"} btnAvailable={false} />
            <section>
            <form className="my-4">
          <div className="_compose_to">
            
              <Select
                label="Recipients"
                placeholder="Select The Recipients"
                selectionMode={multipleRecipient?'multiple':'single'}
                variant="underlined"
                onChange={(e) => setTo(e.target.value)}
                classNames={{
                    trigger: [
                    "outline-none",
                    'border-b-2',
                    'border-b-gray',
                    'shadow-none'
                  ],
                }}
               
              >
                {recipients.map((recipient) => (
                  <SelectItem key={recipient} value={recipient}
                >
                    {recipient}
                  </SelectItem>
                ))}
              </Select>
             {/* <Input
                type="text"
                variant="underlined"
                label="To"
                onChange={(e) => setTo(e.target.value)}
                 classNames={{
                  inputWrapper: [
                    "outline-none",
                    'border-b-2',
                    'shadow-none'
                  ]
                }}
              /> */}
        
            <div className="mt-2">
              <Checkbox
                isSelected={multipleRecipient}
                onValueChange={setMultipleRecipient}
                size={'sm'}
                classNames={{
                    label: [
                        'text-[#A1A1AA] font-Exotic'
                    ]
                }}
              >
                Multiple Recipients?
              </Checkbox>
            </div>
          </div>
          <div className="_compose_subject my-2">
            <Input
              type="text"
              variant="underlined"
              label="Subject"
              onChange={(e) => setSubject(e.target.value)}
              classNames={{
                inputWrapper: [
                  "outline-none",
                  'border-b-2',
                  'shadow-none'
                ]
              }}
            />
          </div>
          <div className="_compose_body my-4">
            <label htmlFor="body">Body</label>
            <div className="flex flex-col rounded mt-2 mb-4">
            <ReactQuill
                theme="snow"
                value={memo_body}
                placeholder="Write Something Here..."
                onChange={setMemo_body}
                style={{ height: "500px" }}
                className="flex-1 border-none h-[280px] rounded-md w-full"
                modules={quillModules}
              />
            </div>
          </div>
          <div className="_compose_submit flex justify-end">
            <Button
              color="primary"
              radius="sm"
              isLoading={isLoading}
              className="px-3"
              onClick={handleSubmitMemo}
            >
              Save
            </Button>
          </div>
        </form>
            </section>
        {/* <Body /> */}
      </main>
    </>
  );
}
