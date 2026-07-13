/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
// import ShopMore from "./components/ShopMore";
import { Button, useDisclosure } from "@nextui-org/react";
import QuickLink2 from "./components/QuickLink2";
import { useNavigate } from "react-router-dom";
import { getUpcomingBirthdaysAction } from "../../../API/post";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ChatDrawer from "../rightMenu/components/ChatDrawer";
import { SocketContext } from "../../../context/SocketContext";
import BirthdayRoom from "../Engage/BirthdayRoom/BirthdayRoom";
import StarLoader from "../../../components/core/loaders/StarLoader";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";

import { useGetProfile } from "../../../API/profile";
import LoanModal from "../../../components/core/loan/LoanModal";
import UtilityModal from "./components/UtilityWidget";
import { useGetExternalLoan } from "../../../API/loan";
import LoanWIdget from "./components/LoanWIdget";
import EcommerceWidget from "./components/EcommerceWidget";
import { IoMdClose } from "react-icons/io";
import UpcomingBirthdaysSection from "../rightMenu/components/UpcomingBirthdaysSection";

const RightBar = () => {
  const { userData } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [allUpcoming, setAllUpcoming] = useState([]);
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [fromBirthday, setFromBirthday] = useState(true);
  const [showWidget, setShowWidget] = useState(false);
  const [utilityOption, setUtilityOption] = useState({});
  const [flightLoading, setFlightLoading] = useState(false);
  const { data: profileData } = useGetProfile({});
  const { data: exData, error } = useGetExternalLoan({
    staff_id: userData?.data?.STAFF_ID, // 2406 ,
    company_id: userData?.data?.COMPANY_ID,
    type: "external",
  });

  // console.log(profileData, exData?.result)

  const {
    isOpen: isUtilityModalOpen,
    onOpen: openUtilityModal,
    onClose: onUtilityCloseModal,
  } = useDisclosure();

  const {
    isOpen: isLoanModalOpen,
    onOpen: openLoanModal,
    onClose: onLoanCloseModal,
  } = useDisclosure();
  const {
    isOpen: isEcommerceOpen,
    onOpen: openEcommerceModal,
    onClose: onEcommerceCloseModal,
  } = useDisclosure();

  const { data: profile } = useGetProfile({
    user: userData?.data,
    path: "/profile/get_profile",
  });

  const { setCurrentPickedChat } = useContext(SocketContext);
  //

  useEffect(() => {
    const utolityData = () => {
      if (profile) {
        const json = {
          name: profile?.BIODATA?.LAST_NAME
            ? profile?.BIODATA?.LAST_NAME + " " + profile?.BIODATA?.FIRST_NAME
            : "",
          phone: profile?.CONTACT_INFORMATION?.PHONE ?? "",
          email: profile?.CONTACT_INFORMATION?.EMAIL ?? "",
        };
        setUtilityOption({ user_data: json });
      }
    };
    utolityData();
  }, [profile]);

  const navigate = useNavigate();

  const handleWidgetOpen = () => {
    setShowWidget(true);
  };

  const handleWidgetClose = () => {
    setShowWidget(false);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const openQuickLink = (tab) => {
    switch (tab) {
      case "attendance":
        return navigate("/people/self/attendance");
      case "leave":
        return navigate("/people/self/leave");
      case "requests":
        return navigate("/people/self/requests");
      case "profile":
        return navigate("/people/self/profile");
      case "performance":
        return navigate("/people/self/performance");
      case "approvals":
        return navigate("/people/self/approvals");
      case "chat":
        setFromBirthday(false);
        return setShowLargeChatContainer(true);
      default:
        break;
    }
  };

  // const moveToCourse = () => {
  //   // navigate('/marketplace/courses')
  // };
  const moveToEvent = () => {
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    const upcoming = async () => {
      try {
        const res = await getUpcomingBirthdaysAction(userData?.data);
        if (res) {
          // console.log(res)
          setAllUpcoming(res?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    upcoming();
  }, [userData]);

  const selectAChat = (user) => {
    setShowLargeChatContainer(true);
    setSelectedChat(user);
  };

  const setCurrent = (data) => {
    selectAChat(data);
    setCurrentPickedChat(data);
    setFromBirthday(true);
  };

  const handleOnclose = () => {
    setShowLargeChatContainer(false);
    setSelectedChat(null);
    setCurrentPickedChat(null);
    setFromBirthday(true);
  };

  const handleOpen = () => {
    setFlightLoading(true);
    // console.log(window.LyncsWidget)
    // const user = userData?.data;
    // const json = {
    //   name : profileData?.BIODATA?.LAST_NAME + ' ' + profileData?.BIODATA?.FIRST_NAME,
    //   company: "NCAA",
    //   phone: profileData?.CONTACT_INFORMATION?.PHONE,
    //   email: profileData?.CONTACT_INFORMATION?.EMAIL,
    //   dateOfBirth: profileData?.BIODATA?.DATE_OF_BIRTH,
    //   maxLoanAmount: Number(maxExternalLoanAmount?.result) ?? 0,
    // }
    const json = {
      name: exData?.name,
      company: exData?.company,
      phone: exData?.phone,
      email: exData?.email,
      dateOfBirth: exData?.dateOfBirth,
      maxLoanAmount: Number(exData?.result) ?? 0,
    };

    // console.log(json)
    window.LyncsWidget.open({
      key: "a3a2d99285894aa88b4340436fb7733151cffe74dc6870c214ecc0",
      path: "/flights/local-flight",
      onReady: () => {
        setFlightLoading(false);
      },
      data: json,
      // {
      //   name: "Seun Suleman",
      //   company: 'Lyncs Africa',
      //   phone: '2348123456789',
      //   dateOfBirth: '1990-01-01',
      //   email: 'sulemanseun@gmail.com',
      //   maxLoanAmount: 150000,
      // }
    });
  };

  return (
    <>
      <div className="space-y-5 mb-6">
        <QuickLink2 clickedTab={openQuickLink} />
        {/* <LoanWIdget openLoanModal={openLoanModal} /> */}

        {/* <div className="dashboard-card overflow-hidden">
          <div className="w-full h-fit bg-[#ecedf1] rounded-t-2xl">
            <img
              src="/assets/images/utility.png"
              alt="adsimg"
              onClick={openUtilityModal}
              className="rounded-t-2xl h-[15rem] w-full object-cover cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-y-2 px-4 py-4">
            <span className="text-gray-700 font-bold text-lg">
              Pay your Utilities Bills at Affordable Prices
            </span>
            <div className="flex justify-end mt-2">
              <Button
                onClick={openUtilityModal}
                size="sm"
                className="bg-dashboard-purple text-white"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <div className="dashboard-card overflow-hidden hidden">
          <div className="w-full h-fit bg-[#ecedf1] rounded-t-2xl">
            <img
              src="/assets/images/ecommerce-cart.jpg"
              alt="adsimg"
              onClick={openEcommerceModal}
              className="rounded-t-2xl h-[15rem] w-full object-cover cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-y-2 px-4 py-4">
            <span className="text-gray-700 font-bold text-lg">
              440 Ecommerce store
            </span>
            <div className="flex justify-end mt-2">
              <Button
                onClick={openEcommerceModal}
                size="sm"
                className="bg-dashboard-purple text-white"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <div className="dashboard-card overflow-hidden">
          <img
            src="/assets/images/flights.png"
            alt="adsimg"
            onClick={handleWidgetOpen}
            className="rounded-t-2xl h-[15rem] w-full object-cover cursor-pointer"
          />
          <div className="flex flex-col gap-y-2 px-4 py-4">
            <span className="text-gray-700 font-extrabold text-lg">
              Flight booking made easy
            </span>
            <div className="flex justify-end mt-2">
              <Button
                onClick={handleOpen}
                size="sm"
                className="bg-dashboard-purple text-white"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div> */}
      </div>
      <div className="space-y-5 sticky top-0">
        <UpcomingBirthdaysSection
          onSendWishes={setCurrent}
          onViewAll={moveToEvent}
        />

        <QuickLink2 clickedTab={openQuickLink} isLastTab={true} />
      </div>

      {
        <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={handleOnclose}
          user={selectedChat}
          setUser={() => setSelectedChat(null)}
          fromBirthday={fromBirthday}
          setFromBirthday={setFromBirthday}
        />
      }

      {isDrawerOpen && (
        <BirthdayRoom isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      )}

      {/* Widget Modal */}
      {showWidget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[99]">
          <div className="bg-white rounded-lg w-full max-w-5xl relative">
            <Button
              onClick={handleWidgetClose}
              className="absolute right-2 top-2 z-10"
              variant="bordered"
              size="sm"
            >
              Close
            </Button>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
                <div className="flex flex-col items-center space-y-4">
                  <StarLoader className="w-8 h-8 animate-spin text-blue-500" />
                  <p className="text-gray-600">Loading...</p>
                </div>
              </div>
            )}

            <iframe
              src="https://lyncs-web-widget.netlify.app/undefined/flights/local-flight"
              className="w-full h-[600px] rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      )}

      {showWidget && (
        <ExpandedDrawerWithButton
          isOpen={showWidget}
          onClose={handleWidgetClose}
          maxWidth={600}
          maskClosable={false}
        >
          <div className="bg-white rounded-lg w-full max-w-[550px] relative shadow">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
                <div className="flex flex-col items-center space-y-4">
                  <StarLoader className="w-8 h-8 animate-spin text-blue-500" />
                  <p className="text-gray-600">Loading...</p>
                </div>
              </div>
            )}

            <iframe
              src="https://lyncs-web-widget.netlify.app/undefined/flights/local-flight"
              style={{ height: "100%" }}
              className="w-full min-h-[700px] rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
            />
          </div>
        </ExpandedDrawerWithButton>
      )}

      {isUtilityModalOpen && (
        <ExpandedDrawerWithButton
          isOpen={isUtilityModalOpen}
          onClose={onUtilityCloseModal}
          maxWidth={800}
          maskClosable={false}
        >
          <UtilityModal
            isOpen={isUtilityModalOpen}
            closeModal={onUtilityCloseModal}
            options={utilityOption}
          />
        </ExpandedDrawerWithButton>
      )}
      {isEcommerceOpen && (
        <ExpandedDrawerWithButton
          isOpen={isEcommerceOpen}
          onClose={onEcommerceCloseModal}
          maxWidth={15000}
          maskClosable={false}
          headerStyle={{
            display: "none",
          }}
        >
          <div className="relative">
            <div className="fixed top-10 left-10 z-50">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer bg-red-700 text-white"
                onClick={onEcommerceCloseModal}
              >
                <IoMdClose size={25} />
              </div>
            </div>
            <EcommerceWidget />
          </div>
        </ExpandedDrawerWithButton>
      )}
      {isLoanModalOpen && (
        <ExpandedDrawerWithButton
          isOpen={isLoanModalOpen}
          onClose={onLoanCloseModal}
          maxWidth={600}
          maskClosable={false}
        >
          <LoanModal oncloseModal={onLoanCloseModal} />
        </ExpandedDrawerWithButton>
      )}
    </>
  );
};

export default RightBar;
