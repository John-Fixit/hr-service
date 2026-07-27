import { useContext, useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { dashboardContext } from "../../context/Dashboard";
import UserDropdown from "../components/UserDropdown";
import DropdownNotification from "../components/DropdownNotification";
import { Calendar, ChevronDown, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import SearchProfile from "../SearchProfile";
import { TbMessage2 } from "react-icons/tb";
import { cn } from "@nextui-org/react";
import ChatDrawer from "../../pages/home/rightMenu/components/ChatDrawer";
import moment from "moment";

const Navbar = () => {
  const { toggleSideBar } = useContext(dashboardContext);
  const { pathname } = useLocation();
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [openSearchContainer, setOpenSearchContainer] = useState(false);

  const showSearchContainer = () => setOpenSearchContainer(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpenSearchContainer(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectAChat = () => {
    setShowLargeChatContainer(true);
    setSelectedChat(null);
  };

  const handleOnclose = () => {
    setShowLargeChatContainer(false);
    setSelectedChat(null);
  };

  const todayFormatted = moment().format("dddd, MMMM D, YYYY");

  return (
    <div
      className={cn(
        "sticky top-0 z-20 shrink-0 bg-white border-b border-dashboard-border",
        pathname.includes("engage/posts") && "z-40",
      )}
    >
      <div className="px-4 md:px-6 py-3">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Left spacer — balances right cluster for centered search */}
          <div className="lg:hidden flex-1 flex items-center min-w-0">
            <button
              type="button"
              className="lg:hidden cursor-pointer p-1.5 -ml-1"
              onClick={() => toggleSideBar()}
            >
              <MdMenu size={22} className="text-slate-700" />
            </button>
          </div>

          {/* Center — search */}
          <div className="flex justify-center w-full max-w-[520px] shrink-0">
            <button
              type="button"
              onClick={showSearchContainer}
              className="hidden md:flex w-full items-center gap-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl px-4 py-2.5 transition-colors cursor-pointer"
            >
              <Search size={17} className="text-slate-400 shrink-0" />
              <span className="flex-1 text-left text-sm text-slate-400 truncate">
                Search employees, documents, courses...
              </span>
              <kbd className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium text-slate-500 bg-white border border-slate-200 rounded-md shrink-0">
                ⌘ K
              </kbd>
            </button>
            <button
              type="button"
              onClick={showSearchContainer}
              className="md:hidden p-2 rounded-full bg-slate-100 border border-slate-200"
            >
              <Search size={18} className="text-slate-500" />
            </button>
          </div>

          {/* Right — date, notifications, profile */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-4 min-w-0">
            <button
              type="button"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Calendar size={15} className="text-slate-500 shrink-0" />
              <span className="whitespace-nowrap font-medium">
                {todayFormatted}
              </span>
              <ChevronDown size={14} className="text-slate-400 shrink-0" />
            </button>

            <DropdownNotification />

            <UserDropdown />

            <div
              onClick={selectAChat}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && selectAChat()}
              className={cn(
                "rounded-full p-2 bg-slate-100 h-10 w-10 cursor-pointer items-center justify-center border border-slate-200",
                pathname === "/engage/home" ? "flex md:hidden" : "hidden",
              )}
            >
              <TbMessage2 className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      <SearchProfile
        openSearchContainer={openSearchContainer}
        setOpenSearchContainer={setOpenSearchContainer}
      />

      <ChatDrawer
        isOpen={showLargeChatContainer}
        onClose={handleOnclose}
        user={selectedChat}
        setUser={() => setSelectedChat(null)}
      />
    </div>
  );
};

export default Navbar;
