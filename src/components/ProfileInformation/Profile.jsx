/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import { Skeleton } from "@nextui-org/react";
import { file_Prefix } from "../../API/leave";

const Profile = ({
  personal_information,
  contact_information,
  isLoading,
  profile_picture,
}) => {
  return (
    <div className="relative flex flex-col min-w-0 rounded-xl break-words border bg-white shadow">
      <div className="flex-auto p-6 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-8  items-center">
          <div className="md:col-span-3 mx-auto md:mx-0">
            <div className="text-center mx-auto md:mx-0 flex flex-col items-center">
              <div className="w-[7rem] h-[7rem] rounded-full border-2 border-gray-200 mx-auto overflow-auto bg-gray-50">
                <img
                  src={`${file_Prefix}${profile_picture}`}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <h4 className="text-secondary font-helvetica font-[500] mt-3 text-[19px] uppercase">
                {personal_information?.FIRST_NAME}{" "}
                {personal_information?.LAST_NAME}
              </h4>
              <h5 className="text-gray-400 font-[400] mb-4 text-[14px]">
                {personal_information?.DEPARTMENT}
              </h5>
            </div>
          </div>
          {/* <!-- end col --> */}
          <div className="md:col-span-5 px-4 md:px-2 md:border-l md:pl-2">
            <div className="ms-3">
              <div>
                <h4 className="mb-2 text-[16px] font-[500] font-helvetica text-gray-500">
                  CONTACT INFORMATION
                </h4>
                {isLoading ? (
                  <div className="max-w-[300px] w-full flex items-center gap-3">
                    <div className="w-full flex flex-col gap-2">
                      <Skeleton className="h-3 w-3/5 rounded-lg" />
                      <Skeleton className="h-3 w-4/5 rounded-lg" />
                      <Skeleton className="h-3 w-4/5 rounded-lg" />
                      <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                  </div>
                ) : (
                  <ul className=" mt-2 text-[0.9rem] flex flex-col space-y-3">
                    <li className=" grid grid-cols-2  ">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                        EMAIL:
                      </span>
                      <span className="text-[#888888] text-end pb-2 w-full  max-w-sm fontbold font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                        {contact_information?.EMAIL ?? "N/A"}
                      </span>
                    </li>
                    <li className="grid grid-cols-2">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                        {" "}
                        OTHER EMAIL:
                      </span>
                      <span className="text-[#888888] text-[0.9rem] text-end pb-2 w-full max-w-sm   font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                        {contact_information?.OTHER_EMAIL ?? "N/A"}
                      </span>
                    </li>
                    <li className="grid grid-cols-2">
                      <span className="text-gray-500 text-sm font-medium font-helvetica uppercase">
                        {" "}
                        PHONE NUMBER:
                      </span>
                      <span className="text-[#888888] text-[0.9rem] text-end pb-2 w-full max-w-sm   font-profileFontSize font-helvetica hyphens-auto overflow-hidden break-words opacity-[0.7]">
                        {contact_information?.PHONE ?? "N/A"}
                      </span>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
