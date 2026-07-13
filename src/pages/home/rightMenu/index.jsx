/* eslint-disable react-hooks/exhaustive-deps */
import { MessageCircleMore, Search, Users2, X } from "lucide-react";
import { RiArrowUpSLine, RiSunLine } from "react-icons/ri";
import MiniMessagePopup from "./components/MiniMessagePopup";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ChatDrawer from "./components/ChatDrawer";
import {
  useGetAllChatHistory,
  useGetAllChatHistoryByName,
} from "../../../lib/query/queryandMutation";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Avatar } from "@nextui-org/react";
import { SocketContext } from "../../../context/SocketContext";
import { useLocation } from "react-router-dom";
import { filePrefix } from "../../../utils/filePrefix";

const statusColor = {
  online: "bg-emerald-500",
  away: "bg-amber-400",
  offline: "bg-slate-300",
};

const RightMenu = () => {
  const [showChatContainer, setShowChatContainer] = useState(false);
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [showSearchInp, setShowSearchInp] = useState(false);

  //
  const { userData } = useCurrentUser();
  const { mutateAsync: allChatHistoryCall } = useGetAllChatHistory();
  const { mutateAsync: searchChat } = useGetAllChatHistoryByName();

  const [searchTerm, setSearchTerm] = useState("");

  // const [allChatHistory, setAllChatHistory] = useState([]);
  // const [allChatHistoryFilter, setAllChatHistoryFilter] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);
  const {
    allChatHistory,
    setChatHistory,
    setChatHistoryFilter,
    allChatHistoryFilter,
    setCurrentPickedChat,
    onlineUsers,
    currentPickedChat,
  } = useContext(SocketContext);
  const { pathname } = useLocation();
  const chatTimeRef = useRef();
  const inputRef = useRef(null);

  const setCurrent = (data) => {
    selectAChat(data);
    setCurrentPickedChat(data);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (
          (pathname === "/engage/home" || pathname === "/engage/posts") &&
          chatTimeRef.current !== 1
        ) {
          const res = await allChatHistoryCall(userData?.data);
          if (res) {
            const incoming = [...res.data.data, ...res.data.dept_data];
            const uniqueIds = new Set();
            const uniqueArray = incoming.filter((obj) => {
              if (!uniqueIds.has(obj.STAFF_ID)) {
                uniqueIds.add(obj.STAFF_ID);
                return true;
              }
              return false;
            });

            const all = uniqueArray.map((el) => {
              if (el.STAFF_ID === 1) {
                ((el.DEPARTMENT = "CUSTOMER SUPPORT"),
                  (el.DIRECTORATE = ""),
                  (el.LAST_NAME = "Support Team"));
                el.FIRST_NAME = "";
                return el;
              }
              return el;
            });

            setChatHistory([...all]);
            chatTimeRef.current = 1;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();

    return () => {
      chatTimeRef.current = 0;
    };
  }, [pathname]);

  const openLargeChatContainer = () => {
    setShowLargeChatContainer(true);
    setShowChatContainer(false);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const searchConversation = async (value) => {
    try {
      if (value.length < 2) return;

      const data = { ...userData?.data, SEARCH: value };
      const res = await searchChat(data);
      if (res) {
        // console.log(res?.data?.data)
        setChatHistoryFilter(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = debounce((searchTerm) => {
    // console.log("Searching for:", searchTerm);

    searchConversation(searchTerm);
  }, 2500);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  const closeSearch = () => {
    setShowSearchInp(false);
    setChatHistoryFilter([]);
    setSearchTerm("");
  };

  const toggleInp = () => {
    if (showSearchInp) {
      closeSearch();
    } else {
      setShowSearchInp(true);
    }
  };

  useEffect(() => {
    if (showSearchInp) inputRef.current?.focus();
  }, [showSearchInp]);

  const displayedChats = useMemo(() => {
    const source =
      allChatHistoryFilter?.length > 0
        ? allChatHistoryFilter
        : allChatHistory?.slice(0, 19);

    return (
      source?.filter(
        (el) =>
          el?.STAFF_ID !== userData?.data?.STAFF_ID && el?.STAFF_ID !== 1,
      ) ?? []
    );
  }, [allChatHistoryFilter, allChatHistory, userData?.data?.STAFF_ID]);

  const getStaffStatus = (staffId) => {
    const isOnline = onlineUsers?.find((el) => el?.userId === staffId);
    return isOnline ? statusColor.online : statusColor.offline;
  };

  const selectAChat = (user) => {
    setShowLargeChatContainer(true);
    // setShowChatContainer(true)
    setSelectedChat(user);
  };

  // console.log(allChatHistory)

  // const filePrefix = "http://lamp3.ncaa.gov.ng/pub/"

  return (
    <div className="sticky top-6 z-10 hidden max-h-[calc(100vh-3rem)] w-[88px] flex-col items-center overflow-visible rounded-2xl border border-slate-200/80 bg-white py-4 shadow-card md:flex">
      {/* xlg:space-y-8 */}

      <div className="flex-col space-y-6 relative  justify-center items-center  hidden  w-full">
        {/* xlg:items-start xlg:flex  */}
        <div className="flex justify-between text-gray-600 w-full">
          <div className="flex flex-col gap-1 leading-tight">
            <span className=" font-extrabold text-xl">Friends</span>
            <span className="text-xs tracking-wide font-thin">
              Start New Conversation
            </span>
          </div>

          <div className="flex gap-x-2 items-start">
            <div className="p-2 h-fit rounded-lg cursor-pointer bg-xinputLight  z-10 text-mainColor">
              <RiSunLine className=" z-20 " size={12} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-col relative   justify-center items-center   hidden  w-full">
        {/* xlg:flex xlg:items-start */}

        <div className="flex items-center h-full bg-xinputLight rounded-md w-full">
          <div className="mr-auto flex  h-full ">
            <button className="pl-3  py-3 outline-none rounded">
              {" "}
              <Search className=" text-mainColor" size={15} />
            </button>
          </div>
          <input
            name=""
            id=""
            className="outline-none border-none bg-transparent  px-4 w-full placeholder:text-xs py-3 placeholder:text-gray-400 text-gray-500"
            type="text"
            placeholder="Find Friends..."
          />
        </div>
      </div>

      <div className="flex-col   justify-center text-gray-500 items-center hidden w-full">
        {/* xlg:flex xlg:items-start  */}
        <div className="flex items-center h-full  justify-between w-full">
          <div>
            <span className="text-sm">Close friend</span>
          </div>
          <div className=" w-6 h-6 rounded-full flex items-center justify-center bg-xinputLight text-mainColor ">
            <RiArrowUpSLine />
          </div>
        </div>
      </div>

      {/* Header: title icon + search toggle */}
      <div className="relative flex flex-col items-center gap-3">
        <div
          title="Chat with Employees"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200"
        >
          <Users2 className="h-5 w-5" />
        </div>

        <button
          type="button"
          onClick={toggleInp}
          title="Search employees"
          className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
            showSearchInp
              ? "border-indigo-200 bg-indigo-50 text-indigo-600"
              : "border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          {showSearchInp ? (
            <X className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </button>

        {showSearchInp && (
          <div className="absolute right-full top-9 z-30 mr-3 w-64 animate-fade-down animate-once animate-duration-300 rounded-xl border border-slate-200 bg-white p-2 shadow-card-hover">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Escape" && closeSearch()}
                placeholder="Search employee..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            {searchTerm.trim() && (
              <p className="px-1 pt-1.5 text-[11px] text-slate-400">
                {displayedChats.length}{" "}
                {displayedChats.length === 1 ? "match" : "matches"}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="my-3 h-px w-10 bg-slate-100" />

      {/* Avatar-only list */}
      <ul className="scrollbar-slim flex flex-1 flex-col items-center gap-3 overflow-y-auto px-2">
        {displayedChats.length === 0 && (
          <li className="px-1 py-4 text-center text-[11px] text-slate-400">
            No match
          </li>
        )}
        {displayedChats.map((chatH) => (
          <li key={chatH.STAFF_ID}>
            <button
              type="button"
              onClick={() => setCurrent(chatH)}
              className={`group relative block rounded-full transition-transform hover:scale-105 ${
                currentPickedChat?.STAFF_ID === chatH.STAFF_ID
                  ? "ring-2 ring-indigo-500 ring-offset-2"
                  : ""
              }`}
            >
              {chatH.LAST_NAME === "Support Team" ? (
                <Avatar
                  size="md"
                  className="h-11 w-11 bg-supportIconBg text-white"
                  icon={<MessageCircleMore className="h-5 w-5 text-white" />}
                />
              ) : chatH?.FILE_NAME ? (
                <Avatar
                  size="md"
                  className="h-11 w-11"
                  src={filePrefix + chatH?.FILE_NAME}
                  title={chatH?.LAST_NAME + " " + chatH?.FIRST_NAME}
                />
              ) : (
                <Avatar
                  size="md"
                  className="h-11 w-11 cursor-pointer"
                  name={chatH?.FIRST_NAME?.trim()[0]}
                  title={chatH?.LAST_NAME + " " + chatH?.FIRST_NAME}
                />
              )}

              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white ${getStaffStatus(chatH.STAFF_ID)}`}
              />

              {chatH?.UNREAD_COUNT > 0 && (
                <span className="absolute -top-1 -right-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                  {chatH.UNREAD_COUNT}
                </span>
              )}

              <span className="pointer-events-none absolute right-full top-1/2 z-30 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1.5 text-left text-xs font-medium text-white shadow-lg group-hover:block">
                {chatH?.LAST_NAME} {chatH?.FIRST_NAME}
                <span className="block text-[10px] font-normal text-slate-300">
                  {chatH?.DEPARTMENT}
                </span>
                <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800" />
              </span>
            </button>
          </li>
        ))}

        {/* <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-05.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden">
  
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup> */}

        {/* <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}> */}
        {/* <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-06.jpg"
            alt="adsimg" */}

        {/* // subsemi:grid-cols-[1.5fr_1fr] subsemi:gap-4  semi:grid-cols-[1.5fr_1fr] semi:gap-6 xmd:grid-cols-[1.5fr_1fr] xmd:gap-8 xm:grid-cols-[1.6fr_1fr]

          //   className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl" */}
        {/* // /> */}
        {/* w-14 subsemi:w-45 semi:w-50 xmd:w-60 xm:w-76 */}
        {/* <div className=" flex-col hidden "> */}
        {/* xlg:flex */}
        {/* <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup> */}

        {/* <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-09.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup> */}
        {/* 
      <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-19.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup>

      <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-12.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup>

      <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-01.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup>

      <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-11.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup> */}
      </ul>

      <div className="mt-3 h-px w-10 bg-slate-100" />

      <button
        type="button"
        title="View all employees"
        onClick={() => setShowLargeChatContainer(true)}
        className="mt-3 flex h-9 w-9 items-center justify-center rounded-xl text-indigo-600 transition-colors hover:bg-indigo-50"
      >
        <Users2 className="h-5 w-5" />
      </button>

      {showChatContainer && (
        <MiniMessagePopup
          user={selectedChat}
          expand={openLargeChatContainer}
          ShowChatPopup={setShowChatContainer}
        />
      )}

      {
        <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
          user={selectedChat}
          setUser={() => setSelectedChat(null)}
        />
      }
    </div>
  );
};

export default RightMenu;
