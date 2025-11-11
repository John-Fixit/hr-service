/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Spinner } from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { Trash2Icon } from "lucide-react";
import { GrDocumentCsv, GrDocumentZip } from "react-icons/gr";
import { IoCloudUploadOutline } from "react-icons/io5";

import {
  BsFileEarmarkPdfFill,
  BsFiletypeDoc,
  BsFiletypeDocx,
} from "react-icons/bs";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { baseURL } from "../../../../utils/filePrefix";
import PropTypes from "prop-types";

const AdvanceAttachments = ({ 
  setValue,
  getValues,
  watch,
  goToNextTab,
 }) => {
  const [uploadLoading, setUploadLoading] = useState(false);

  const { userData } = useCurrentUser();

  const attachments = watch("attachment");


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (file?.name.trim() !== "" && file) {
        // console.log({ name: file?.name, file: file, file_url: URL.createObjectURL(file) })
        setValue("attachment", [
          ...getValues().attachment,
          { name: file?.name, file: file, file_url: URL.createObjectURL(file) },
        ]);
      }
    }
  };

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = getValues().attachment?.filter(
      (_, i) => i !== index
    );
    setValue("attachment", updatedAttachments);
  };

  const uploadFile = async (formData) => {
    setUploadLoading(true);
    try {
      const res = await axios({
        method: "post",
        url:baseURL +"attachment/addChatFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: userData?.token,
        },
      });
      setUploadLoading(false);

      if (res) {
        return res.data;
      }
    } catch (err) {
      setUploadLoading(false);
      if (
        err?.response?.data?.message !==
        "There was an error uploading your file"
      )
        toast.error(err?.response?.data?.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    var attachments = getValues().attachment
    setUploadLoading(true);
    try {
      const uploadedAttachmentIDs = await Promise.all(
        attachments?.map(async (attachment, index) => {
          const formData = new FormData();
          formData.append("file", attachment.file);

          const res = await uploadFile(formData);

          return res?.file_url_id;
        })
      );
      setUploadLoading(false);

 

      //step 1: split the IDs and join first
      const reversedArray = uploadedAttachmentIDs.map((item) =>
        item.split("").join("")
      );

      // Step 2: Join the reversed strings with a comma
      const resultIDs = reversedArray.join(",");

      // console.log(uploadedAttachmentIDs);

      setValue(
        "uploadedAttachment",
        uploadedAttachmentIDs.map((item, index) => ({
          ...getValues().attachment[index], // Preserve other existing properties
          file_url_id: item, // Update the file_url
        }))
      );



      goToNextTab();
    } catch (error) {
      console.log("Error:", error);
      setUploadLoading(false);
    }
  };

  const fileExtension = useCallback((filePath) => {
    return filePath?.split(".")?.pop()?.toLowerCase();
  }, []);

  const checkFileType = (fileName, extensions) => {
    return extensions.some((ext) => fileName?.toLowerCase().includes(ext));
  };


  return (
    <>
      <div className="">
        <form onSubmit={onSubmit}>
          <div className="bg-white rounded mb-3">
          <h1 className="font-helvetica text-[#212529]">
           Attachment
          </h1>
          <p className="font-helvetica opacity-70">Upload your Last two Payslip</p>
            
          </div>

          <div className="w-full px-8 bg-white rounded">
            <div
              className={`border-2 border-dashed rounded-xl p-4 min-h-[15rem]`}
            >
              <div>
                <div className="flex flex-col justify-center items-center">
                  <div className="inline-block p-4 my-5 rounded-full bg-slate-100">
                    <IoCloudUploadOutline color="gray" size={32} />
                  </div>
                  <p>
                    <label htmlFor="onboardFile">
                      <span className="text-blue-400 font-medium cursor-pointer">
                        Click to upload
                      </span>{" "}
                      <input
                        type="file"
                        hidden
                        name=""
                        id="onboardFile"
                        onChange={handleFileInputChange}
                      />
                    </label>
                  </p>
                  <p className="text-gray-300">SVG, PNG, JPG or GIF</p>
                </div>
              </div>
            </div>
          </div>
        <div>
         
            {attachments?.map((data, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white shadow p-2 my-2"
              >
                {data?.file_url ? (
                  <div className="group w-full">
                    {checkFileType(data?.name || data?.file_url, [
                      ".jpg",
                      ".jpeg",
                      ".png",
                    ]) ? (
                      <div className="relative">
                        <img
                          alt="Image"
                          height="80"
                          width="80"
                          // onClick={() =>
                          //   setImageModalOpen({
                          //     status: true,
                          //     file: data?.file_url,
                          //   })
                          // }
                          src={data.file_url}
                          className="
                                      object-cover 
                                      cursor-zoom-in 
                                      hover:scale-110 
                                      transition 
                                      translate
                                      flex items-center gap-2
                                    "
                        />
                        <div
                          onClick={() => handleDeleteAttachment(i)}
                          className="absolute bottom-1 right-1 group-hover:block   rounded-full bg-gray-100 p-1 cursor-pointer items-center gap-2"
                        >
                          <Trash2Icon className="text-red-500" />
                        </div>
                      </div>
                    ) : (
                      checkFileType(data?.name || data?.file_url, [
                        ".pdf",
                        ".doc",
                        ".csv",
                        ".docx",
                        ".zip",
                      ]) && (
                        <div className="flex gap-x-4 flex-wrap space-y-1 mt-5 items-center w-full">
                          <div className="relative w-full flex">
                            <div className=" flex gap-1 px-2 pr-4 cursor-pointer items-center flex-1 truncate ">
                              {checkFileType(data?.name || data?.file_url, [
                                ".pdf",
                              ]) ? (
                                <BsFileEarmarkPdfFill
                                  size={35}
                                  className="text-red-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".doc",
                                ]) ? (
                                <BsFiletypeDoc
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".docx",
                                ]) ? (
                                <BsFiletypeDocx
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".csv",
                                ]) ? (
                                <GrDocumentCsv
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : (
                                checkFileType(data?.name || data?.file_url, [
                                  ".zip",
                                ]) && (
                                  <GrDocumentZip
                                    size={35}
                                    className="text-blue-500"
                                  />
                                )
                              )}

                              <span className=" line-clamp-1 truncate w-full">
                                {data?.name}
                              </span>
                            </div>
                            <div
                              onClick={() => handleDeleteAttachment(i)}
                              className=" ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer  gap-2"
                            >
                              <Trash2Icon className="text-red-500" />
                            </div>
                          </div>
                        </div>
                      )
                    )}

                    <div></div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          {/* {attachments.length > 0 && 
        ( */}

          <div className="flex justify-end py-3">
            <button
              type="submit"
              className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex gap-2"
            >
              {uploadLoading ? <Spinner color="default" size="sm" /> : ""}
              Continue
            </button>
          </div>
          {/* )} */}
        </form>
      </div>
    </>
  );
};

export default AdvanceAttachments;

AdvanceAttachments.propTypes = {
  setValue: PropTypes.func,
  getValues: PropTypes.func,
  goToNextTab: PropTypes.func,
};





























// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// // import React from 'react'

// import { Fragment, useRef, useState } from "react";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { Divider, Progress } from "rsuite";
// import {
//   Avatar,
//   Badge,
//   Button,
//   Card,
//   CardBody,
//   CircularProgress,
//   Spinner,
//   Tooltip,
// } from "@nextui-org/react";
// import { BsFileEarmarkPdfFill } from "react-icons/bs";
// import { Upload } from "antd";
// import { GrDocumentPdf } from "react-icons/gr";
// import { FaFileUpload, FaRegFileImage } from "react-icons/fa";
// import { Trash2Icon } from "lucide-react";
// import { uploadFileData } from "../../../../utils/uploadfile";
// import { fileExtension } from "../../../../utils/fileExtension";

// const AdvanceAttachments = ({
//   setInformation,
//   goToNextTab,
//   token,
//   setValue,
//   trigger,
// }) => {
//   const fileInputRef = useRef(null);
//   const [percent, setPercent] = useState(30);
//   const [isUploading, setisUploading] = useState(false);
//   const [attachments, setAttachments] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);

//   const [previewImage, setPreviewImage] = useState(null);

//   const [isLoading, setIsLoading] = useState(false);

//   const status = percent === 100 ? "success" : null;
//   const color = percent === 100 ? "#52c41a" : "#3385ff";

//   const uploadAttachment = async () => {
//     // setisUploading(true)
//     if (attachments[0]?.file) {
//       const file = attachments[0]?.file;
//       setIsLoading(true);
//       const result = await uploadFileData(file, token);

//       setIsLoading(false);
//       if (setValue) {
//         // setValue("attachments", [result.file_url_id]);
//       } else {

//         // setValue("attachments", [result.file_url_id])

//         setInformation((information) => {
//           return {
//             ...information,
//             attachment: information.isAnnouncement
//               ? result.file_url
//               : result.file_url_id,
//           };
//         });
//       }
//     }



//     // goToNextTab();
//   };
//   const onFileSelect = (e) => {
//     const files = e.target.files;
//     if (files.length == 0) return;
//     for (let i = 0; i < files.length; i++) {
//       if (!attachments.some((e) => e.name == files[i].name)) {
//         setAttachments((previousAttachments) => [
//           // ...previousAttachments,
//           {
//             name: files[i].name,
//             imageUrl: URL.createObjectURL(files[i]),
//             file: files[i],
//           },
//         ]);
//       }
//     }

//     // uploadAttachment(files)

//     // const file = e.target.files[0]
//     // setPreviewImage(URL.createObjectURL(file))

//     // console.log(file
//   };

//   const onDragOver = (event) => {
//     event.preventDefault();
//     setIsDragging(true);
//     event.dataTransfer.dropEffect = "copy";
//   };
//   const onDragLeave = (event) => {
//     event.preventDefault();
//     setIsDragging(false);
//   };
//   const onDrop = (event) => {
//     event.preventDefault();
//     setIsDragging(false);
//     const files = event.dataTransfer.files;
//     for (let i = 1; i < files.length; i++) {
//       if (!attachments.some((e) => e.name == files[i].name)) {
//         setAttachments((previousAttachments) => [
//           // ...previousAttachments,
//           { name: files[i].name, imageUrl: URL.createObjectURL(files[i]) },
//         ]);
//       }
//     }

//     // //  uploadAttachment(files)

//     // const file = event.dataTransfer.files[0]
//     // // console.log(file);
//     //  uploadAttachment(file)
//   };

//   const handleDeleteAttachment = (i) => {
//     setAttachments((previousAttachments) =>
//       previousAttachments.filter((_, index) => index !== i)
//     );
//   };

//   return (
//     <Fragment>
//       <div className="w-full shadow p-8 bg-white rounded">
//         <div
//           className={`${
//             isUploading || (isDragging && "bg-slate-50 border-blue-400")
//           } border-2 border-dashed rounded-xl p-4 min-h-[15rem]`}
//           onDragOver={onDragOver}
//           onDragLeave={onDragLeave}
//           onDrop={onDrop}
//         >
//           {/* Before upload */}
//           {!isUploading ? (
//             <div>
//               {isDragging ? (
//                 <div className="flex flex-col justify-center items-center h-[12rem]">
//                   <div className="inline-block p-4 my-5 rounded-full bg-slate-100 animate-bounce">
//                     <IoCloudUploadOutline color="blue" size={32} />
//                   </div>
//                   <p className="text-blue-400 font-medium cursor-pointer">
//                     {" "}
//                     Drop file(s) here{" "}
//                   </p>
//                 </div>
//               ) : (
//                 <div>
//                   <div className="flex flex-col justify-center items-center">
//                     <div className="inline-block p-4 my-5 rounded-full bg-slate-100">
//                       <IoCloudUploadOutline color="gray" size={32} />
//                     </div>
//                     <p>
//                       <label htmlFor="imageFile">
//                         <span className="text-blue-400 font-medium cursor-pointer">
//                           Click to upload
//                         </span>{" "}
//                         <input
//                           type="file"
//                           ref={fileInputRef}
//                           hidden
//                           name=""
//                           id="imageFile"
//                           onChange={onFileSelect}
//                         />
//                       </label>
//                       or drag and drop
//                     </p>
//                     <p className="text-gray-300">
//                       SVG, PNG, JPG or GIF (max. 800x400px)
//                     </p>
//                   </div>
//                   {/* <Divider>OR</Divider> */}
//                   <div className=" flex justify-center mb-4">
//                     {/* <Button
//                       onClick={() => fileInputRef.current.click()}
//                       size="sm"
//                       color="primary"
//                       className="rounded-md text-white shadow font-medium"
//                     >
//                       Browse Files
//                     </Button> */}
//                     {/* <input
//                       type="file"
//                       multiple
//                       ref={fileInputRef}
//                       hidden
//                       name=""
//                       id=""
//                       onChange={onFileSelect}
//                     /> */}
//                     {/* <input
//                       type="file"
//                       ref={fileInputRef}
//                       hidden
//                       name=""
//                       id=""
//                       onChange={onFileSelect}
//                     /> */}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div>
//               {/* When uploading */}
//               <BsFileEarmarkPdfFill
//                 size={35}
//                 className="text-red-500 mx-auto my-4"
//               />
//               <p
//                 className={`w-[${percent}%] text-end text-gray-400 text-xs m-0`}
//               >
//                 {percent}%
//               </p>
//               <Progress.Line
//                 percent={percent}
//                 strokeColor={color}
//                 status={status}
//                 strokeWidth={6}
//                 showInfo={false}
//               />
//               <div className="flex flex-col justify-center items-center my-4">
//                 <span className="font-semibold text-md tracking-[2px]">
//                   Uploading Document...
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   [Name of the document]
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div>
//           <ul className="">
//             {attachments.map((attachment, index) => (
//               <Card key={index} className=" my-2 shadow ">
//                 <CardBody className="flex flex-row justify-between items-center gap-3">
//                   <div className="flex items-center gap-x-2">
//                     {" "}
//                     <span className="font-semibold">
//                       {" "}
//                       {fileExtension(attachment?.name) === "pdf" ? (
//                         <GrDocumentPdf
//                           fontSize={"2rem"}
//                           className="text-red-500"
//                         />
//                       ) : ["jpg", "jpeg", "png", "gif"].includes(
//                           fileExtension(attachment?.name)
//                         ) ? (
//                         <FaRegFileImage
//                           fontSize={"2rem"}
//                           className="text-[#00BCD4]"
//                         />
//                       ) : (
//                         <FaFileUpload
//                           fontSize={"2rem"}
//                           className="text-[#9E9E9E]"
//                         />
//                       )}
//                     </span>{" "}
//                     {attachment.name}
//                   </div>
//                   <Button
//                     type="button"
//                     className="bg-white text-md font-semibold rounded-md"
//                     onClick={() => handleDeleteAttachment(index)}
//                     isIconOnly
//                   >
//                     <Trash2Icon className="text-red-500" />
//                   </Button>
//                 </CardBody>
//               </Card>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* <div className=" flex justify-center">
//           <Button
//             color="primary"
//             onClick={uploadAttachment}
//             className="rounded-md text-white shadow font-medium"
//             isLoading={isLoading}
//           >
//             Next
//           </button>
//         </div> */}
//       <div className="flex justify-end py-3">
//         {/* <button
//               onClick={uploadAttachment}
//               className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex gap-2"

//             >
//               {
//                 isLoading? (
//                   <Spinner color="default" size="sm"/>
//                 ): (
//                   ""
//                 )
//               }
//               Save
//             </button> */}
//         <Button
//           size="sm"
//           className="rounded-md font-medium shadow font-helvetica uppercase"
//           color="secondary"
//           onClick={uploadAttachment}
//         >
//           {isLoading ? <Spinner color="default" size="sm" /> : ""}
//           Next
//         </Button>
//       </div>
//     </Fragment>
//   );
// };

// export default AdvanceAttachments;
