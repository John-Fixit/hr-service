/* eslint-disable no-unused-vars */
// import React from 'react'

import Header from "../../components/PerformanceComponents/Header";
import Separator from "../../components/payroll_components/Separator";
import React, { useState } from "react";
import PerformanceDrawer from "./PerformanceDrawer";
import RequestCard from "../Approval/RequestCard";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  useGetActivePerformance,
  useGetAwaitingPerformance,
  useGetMyAper,
  useGetPendingPerformance,
  useGetPerformanceListing,
} from "../../API/performance";
import { errorToast } from "../../utils/toastMsgPop";

import PerformanceTable from "../../components/core/performance/PerformanceTable";
import { FaFirstdraft } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { useGetRequestDetail } from "../../API/api_urls/my_approvals";
import PerformanceApprovalDrawer from "../Approval/AperApprovalView";
import { useDisclosure } from "@nextui-org/react";
import { CiNoWaitingSign } from "react-icons/ci";
import { FcCancel } from "react-icons/fc";

const Performance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewIndex, setViewIndex] = useState(null);
  const [aperData, setAperData] = useState(null);
  const [canApprove, setCanApprove] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const [detailsStatus, setDetailsStatus] = useState("pending");

  const { userData } = useCurrentUser();

  //===============get my APER =====================

  const payload = {
    staff_id: userData?.data?.STAFF_ID,
    company_id: userData?.data?.COMPANY_ID,
  };
  const {
    data: apers,
    isLoading: aperLoading,
    refetch,
  } = useGetMyAper({
    staff_id: userData?.data?.STAFF_ID,
    status: detailsStatus,
  });
  const {
    data: pendingApers,
    isLoading: pendingAperLoading,
    refetch: refetchPending,
  } = useGetPerformanceListing({
    ...payload,
    status: "pending",
  });
  const {
    data: awaitingApers,
    isLoading: awaitingAperLoading,
    refetch: refetchAwaiting,
  } = useGetPerformanceListing({
    ...payload,
    status: "awaiting",
  });

  const { data: draftApers, isLoading: draftAperLoading } =
    useGetPerformanceListing({
      ...payload,
      status: "draft",
    });
  const { data: completedApers, isLoading: completedAperLoading } =
    useGetPerformanceListing({
      ...payload,
      status: "approved",
    });

  const { mutate: mutateRequestDetail, isPending } = useGetRequestDetail();

  const { data: period } = useGetActivePerformance(userData?.data?.COMPANY_ID);

  // -------------------approval------------------------
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });
  const {
    isOpen: isAperOpen,
    onOpen: onAperOpen,
    onClose: onAperClose,
  } = useDisclosure();
  // -------------------approval------------------------

  const statusData = [
    {
      id: "pending",
      label: "Pending",
      icon: MdOutlinePending,
      b_color: "bg-amber-100",
      t_color: "text-amber-600",
    },
    {
      id: "awaiting",
      label: "Awaiting",
      icon: CiNoWaitingSign,
      b_color: "bg-teal-100",
      t_color: "text-teal-600",
    },
    {
      id: "draft",
      label: "Draft",
      icon: FaFirstdraft,
      b_color: "bg-purple-100",
      t_color: "text-purple-600",
    },
    {
      id: "completed",
      label: "Approved",
      icon: AiOutlineFileDone,
      b_color: "bg-green-100",
      t_color: "text-green-600",
    },
  ];

  const detailsNo = (value) => {
    if (value == "pending") {
      return pendingApers;
    } else if (value == "draft") {
      return draftApers;
    } else if (value == "awaiting") {
      return awaitingApers;
    } else if (value == "completed") {
      return completedApers;
    }
  };

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const handleViewAper = (aper, index) => {
    console.log(aper, index);
    setViewIndex(index);
    setSelectedTab(0);
    mutateRequestDetail(
      {
        request_id: aper?.REQUEST_ID,
      },

      {
        onError: (err) => {
          const errMsg = err?.response?.data?.message || err?.message;
          errorToast(errMsg);
        },
        onSuccess: (res) => {
          const resData = res?.data?.data;

          if (Number(aper?.canApprove)) {
            handleViewApproval(resData, aper?.request_id);
          } else {
            setAperData({ ...resData, is_draft: aper?.is_draft });
            setIsOpen(true);
          }
        },
      }
    );
  };

  const handleViewApproval = (value, reqID) => {
    const approvers = value?.approvers;
    const attachments = value?.attachments;
    const requestData = value?.data;
    const notes = value?.notes;
    setDetails({
      ...details,
      approvers,
      attachments,
      notes,
      data: requestData,
      requestID: reqID,
    });
    onAperOpen();
  };

  const handleClose = (refreshSignnal) => {
    setIsOpen({ type: "", status: false });

    setDetails({
      approvers: [],
      attachments: [],
      data: null,
      notes: [],
      requestID: null,
    });

    if (refreshSignnal === "refresh") {
      refetch();
      refetchPending();
    }
  };

  const handleCreateAppraise = () => {
    setSelectedTab(0);
    setIsOpen(true);
    // setCanApprove()
  };

  return (
    <div className="py-8 font-helvetica">
      <Header handleCreateAppraise={handleCreateAppraise} period={period} />
      <div className="mb-6">
        <Separator separator_text={"History"} />
        <RequestCard
          requestHistory={statusData}
          selectTab={selectTab}
          requestStatus={detailsStatus}
          requestNo={detailsNo}
        />
      </div>

      <PerformanceTable
        tableData={detailsNo(detailsStatus)?.map((item) => {
          return {
            ...item,
            status: detailsStatus,
          };
        })}
        handleViewAper={handleViewAper}
        tableStatus={detailsStatus}
        viewIndex={viewIndex}
        isPending={isPending}
      />

      <PerformanceDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        aperData={aperData}
        setAperData={setAperData}
        period={period}
      />

      <PerformanceApprovalDrawer
        isOpen={isAperOpen}
        setIsOpen={() => onAperClose()}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        incomingData={details}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Performance;
