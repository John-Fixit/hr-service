/* eslint-disable react/prop-types */

import {
  BarChart3,
  Building,
  CalendarDays,
  ClipboardCheck,
  FileText,
  Plane,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BsChatSquareText } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { MdOutlineModelTraining } from "react-icons/md";
import { MdOutlineEvent } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";
// import { CiSquareQuestion } from "react-icons/ci";
import ApplyLeave from "../../../../components/core/leave/ApplyLeave";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import QuickApprovalComponent from "../../../../components/core/approvals/QuickApprovalComponent";
import QuickRequestComponent from "../../../../components/core/requests/QuickRequestComponent";
import AttendanceSetup from "./AttendanceSetup";
import { useDisclosure } from "@nextui-org/react";
import CreatePostDrawer from "../../centerFeed/components/CreatePostDrawer";
import Salary from "../../../../components/profile/Salary";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import PerformanceDrawer from "../../../Performance/PerformanceDrawer";
import { useGetActivePerformance } from "../../../../API/performance";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const QuickLinkIcon = ({ icon: Icon, label, bg, iconColor, onClick }) => (
  <div
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={
      onClick
        ? (e) => {
            if (e.key === "Enter" || e.key === " ") onClick();
          }
        : undefined
    }
    className="flex flex-col justify-center items-center cursor-pointer text-slate-600 w-[80px] gap-y-2"
  >
    <div
      className={`rounded-xl ${bg} w-12 h-12 flex justify-center items-center`}
    >
      <Icon size={20} className={iconColor} />
    </div>
    <div className="w-full text-center truncate text-xs font-medium">
      {label}
    </div>
  </div>
);

const QuickLink2 = ({ clickedTab, isLastTab = false }) => {
  const [currentLinksGroup, setCurrentLinksGroup] = useState(0);
  const {
    isOpen: isCreatePostOpen,
    onOpen: openCreate,
    onOpenChange: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const [openLeaveDrawer, setOpenLeaveDrawer] = useState(false);

  const [isOpen, setIsOpen] = useState({ state: false, type: "" });

  const [openPerformanceDrawer, setOpenPerformanceDrawer] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [aperData, setAperData] = useState(null);

  const { userData } = useCurrentUser();

  const { data: period } = useGetActivePerformance(userData?.data?.COMPANY_ID);

  const handleOpenDrawer = (type) => {
    if (type === "performance") {
      setOpenPerformanceDrawer(true);
    } else {
      setIsOpen({ state: true, type: type });
    }
  };

  const handleCloseDrawer = () => {
    setIsOpen({ state: false, type: "" });
  };

  const nextGroup = () => {
    if (currentLinksGroup === 1) {
      setCurrentLinksGroup(0);
    } else {
      setCurrentLinksGroup(1);
    }
  };

  return (
    <>
      <div className="dashboard-card py-4">
        <div className="text-sm flex flex-col relative">
          <div className="flex px-5 items-center justify-between mb-3">
            <span className="text-slate-800 font-semibold text-base">
              Quick Links
            </span>
            <button
              type="button"
              onClick={nextGroup}
              className="text-sm font-medium text-dashboard-purple hover:text-dashboard-purple-hover"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-4 place-items-center px-3">
            <AttendanceSetup>
              <QuickLinkIcon
                icon={CalendarDays}
                label="Attendance"
                bg="bg-indigo-50"
                iconColor="text-indigo-600"
              />
            </AttendanceSetup>

            <QuickLinkIcon
              icon={isLastTab ? MdPostAdd : Plane}
              label={isLastTab ? "Create Post" : "Leave Request"}
              bg="bg-sky-50"
              iconColor="text-sky-600"
              onClick={() =>
                isLastTab ? openCreate() : setOpenLeaveDrawer(true)
              }
            />

            <QuickLinkIcon
              icon={ClipboardCheck}
              label="Approvals"
              bg="bg-emerald-50"
              iconColor="text-emerald-600"
              onClick={() => handleOpenDrawer("approvals")}
            />

            <QuickLinkIcon
              icon={FileText}
              label="Payslip"
              bg="bg-violet-50"
              iconColor="text-violet-600"
              onClick={() => handleOpenDrawer("payslip")}
            />

            <QuickLinkIcon
              icon={UserCircle2}
              label="My Profile"
              bg="bg-rose-50"
              iconColor="text-rose-600"
              onClick={() => clickedTab("profile")}
            />

            <QuickLinkIcon
              icon={BarChart3}
              label="Performance"
              bg="bg-amber-50"
              iconColor="text-amber-600"
              onClick={() => handleOpenDrawer("performance")}
            />

            {/* <div
            className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
            onClick={() => clickedTab("forms")}
          >
            <div className="rounded-full bg-[#322742]    w-[50px] h-[50px] flex justify-center items-center">
        
              <Aperture size={25} className="!font-bold text-white " />
            </div>
         
            <div className=" w-[70px] text-center truncate  text-xs">
              Request
            </div>
          </div> */}
          </div>
          {currentLinksGroup === 1 && (
            <AnimatePresence>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}
                exit={{ x: 100, opacity: 0.5, transition: { duration: 0.7 } }}
              >
                <div className="grid grid-cols-3 gap-x-3 gap-y-4 place-items-center px-3 pt-2">
                  <QuickLinkIcon
                    icon={BsChatSquareText}
                    label="Chat"
                    bg="bg-sky-100/40"
                    iconColor="text-sky-600"
                    onClick={() => clickedTab("chat")}
                  />
                  <QuickLinkIcon
                    icon={MdOutlineModelTraining}
                    label="Courses"
                    bg="bg-indigo-100/40"
                    iconColor="text-indigo-600"
                    onClick={() => clickedTab("courses")}
                  />
                  <QuickLinkIcon
                    icon={MdOutlineEvent}
                    label="Events"
                    bg="bg-pink-100/40"
                    iconColor="text-pink-600"
                    onClick={() => clickedTab("events")}
                  />
                  <QuickLinkIcon
                    icon={Building}
                    label="Get Loan"
                    bg="bg-amber-100/40"
                    iconColor="text-amber-600"
                    onClick={() => clickedTab("loan")}
                  />
                  <QuickLinkIcon
                    icon={FaMoneyBillTrendUp}
                    label="Pay Bills"
                    bg="bg-teal-100/40"
                    iconColor="text-teal-600"
                    onClick={() => clickedTab("bills")}
                  />
                  <QuickLinkIcon
                    icon={GoWorkflow}
                    label="Memos"
                    bg="bg-cyan-100/40"
                    iconColor="text-cyan-600"
                    onClick={() => clickedTab("memos")}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {
            <div className="flex flex-col mt-4 px-3">
              <button
                type="button"
                className="border border-dashboard-border px-4 py-2.5 w-full rounded-xl text-sm font-medium text-dashboard-purple hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-1"
                onClick={nextGroup}
              >
                View More
                <span className="text-xs">▼</span>
              </button>
            </div>
          }
        </div>
      </div>

      <ApplyLeave isOpen={openLeaveDrawer} setIsOpen={setOpenLeaveDrawer} />

      <ExpandedDrawerWithButton
        isOpen={isOpen.state}
        onClose={handleCloseDrawer}
        maxWidth={isOpen.type === "approvals" ? 900 : 700}
      >
        {isOpen.type === "approvals" ? (
          <QuickApprovalComponent />
        ) : isOpen.type === "requests" ? (
          <QuickRequestComponent />
        ) : isOpen.type === "payslip" ? (
          <>
            <PageHeader
              header_text={"Salary"}
              breadCrumb_data={[{ name: "Self Service" }, { name: "Profile" }]}
            />
            <Salary />
          </>
        ) : null}
      </ExpandedDrawerWithButton>

      <PerformanceDrawer
        isOpen={openPerformanceDrawer}
        setIsOpen={setOpenPerformanceDrawer}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        aperData={aperData}
        setAperData={setAperData}
        period={period}
      />

      <div className="z-[55]">
        <CreatePostDrawer
          isOpen={isCreatePostOpen}
          onOpenChange={() => onCreateOpen()}
          onClose={() => onCreateClose()}
        />
      </div>
    </>
  );
};

export default QuickLink2;
