/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { dashboardContext } from "../../context/Dashboard";
import ChatDrawer from "../../pages/home/rightMenu/components/ChatDrawer";
import useCurrentUser from "../../hooks/useCurrentUser";
import { cn } from "@nextui-org/react";

const SubMenu = ({ data, routeMerge }) => {
  const {
    sidebarOpen,
    setSidebarOpen,
    tabClicked,
    toggleTab,
    sidebarMinimized,
    setShowminimizedsubMenu,
    setExtendedSubMenuData,
    isTablet,
    toggleTabLV3,
    tabClickedLV3,
  } = useContext(dashboardContext);
  const { pathname } = useLocation();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const trigger = useRef(null);
  const { userData } = useCurrentUser();

  const showSubMenu = () => {
    if (sidebarMinimized) {
      setShowminimizedsubMenu(true);
      setExtendedSubMenuData(data);
    }
    toggleTab(data.name);
  };

  const showSubMenuLV3 = (name) => {
    if (sidebarMinimized) {
      setShowminimizedsubMenu(true);
      setExtendedSubMenuData(data);
    }
    toggleTabLV3(name);
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!showDropDown || trigger.current.contains(target)) return;
      setShowDropDown(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  const variants = {
    visible: (custom) => ({
      opacity: 1,
      transition: { delay: custom * 0.1 },
    }),
  };

  const openMessageRoom = () => {
    setShowLargeChatContainer(true);
    isTablet && setSidebarOpen(false);
  };

  const getFilteredSideMenu = (menu, userData) => {
    // Create a copy of the side menu to avoid mutating the original
    let filteredMenu = [...menu];

    if (data.name === "HRIS" && !userData?.data?.CAN_ONBOARD) {
      filteredMenu = filteredMenu.filter((el) => el?.name !== "Onboard");
    }
    if (data.name === "HRIS" && !userData?.data?.IS_VARIATION) {
      filteredMenu = filteredMenu.filter((el) => el?.name !== "Variation");
    }
    if (data.name === "HRIS" && !userData?.data?.IS_LEAVE_OFFICER) {
      filteredMenu = filteredMenu.filter((el) => el?.name !== "Leave");
    }
    return filteredMenu;
  };

  const hasActiveChild = data.menus?.some(
    (menu) =>
      pathname.includes(menu.route) ||
      pathname.includes(menu.prefix) ||
      menu.menus?.some((m3) => pathname.includes(m3.route)),
  );
  const isParentActive = hasActiveChild || tabClicked === data.name;

  return (
    <>
      <li
        className={cn(
          "relative z-40 w-[15rem] group/navitemsub hover:cursor-pointer",
          !sidebarMinimized && tabClicked === data.name && "bg-white/5",
          sidebarMinimized
            ? "border-b border-gray-800 py-4 flex flex-col text-center justify-center gap-1 cursor-pointer duration-300 font-medium text-gray-400"
            : "link !pr-2",
          isParentActive && "sidebar-parent-active",
        )}
        onClick={showSubMenu}
        ref={trigger}
      >
        <data.icon
          size={sidebarMinimized ? 30 : 18}
          className={cn(
            "min-w-max group-hover/navitemsub:text-white",
            sidebarMinimized && "mx-auto",
            isParentActive ? "text-dashboard-purple" : "text-menuItemIcon",
          )}
        />

        <p className={cn("flex-1 capitalize", isParentActive && "font-medium")}>
          {data.name}
        </p>

        {!sidebarMinimized && (
          <IoIosArrowDown
            strokeWidth={2}
            className={cn(
              "mr-1 group-hover/navitemsub:text-white",
              tabClicked !== data.name
                ? "-rotate-90 duration-200"
                : "rotate-30 duration-200",
              isParentActive && "text-dashboard-purple",
            )}
          />
        )}
      </li>

      {tabClicked === data.name && sidebarOpen && (
        <motion.ul
          variants={variants}
          animate={
            !sidebarMinimized && tabClicked === data.name
              ? {
                  height: "fit-content",
                }
              : {
                  height: 0,
                }
          }
          className={`flex h-0 flex-col pl-7 pb-4 pt-2 gap-y-2 z-10 font-normal overflow-hidden w-[15rem] relative -top-2 rounded-br-[0.65rem] ${
            (tabClicked === data.name || pathname.includes(data.name)) &&
            "bg-sidebarSubMenuBg"
          }`}
        >
          {!data?.subLV3 && (
            <div
              className={` left-6 h-full absolute mx-3 border-[0.6px] border-sidebarLineColor ${
                tabClicked === data.name || pathname.includes(data.name)
                  ? "block"
                  : "hidden"
              }`}
            ></div>
          )}

          {getFilteredSideMenu(data.menus, userData)?.map((menu) => (
            <li
              key={menu.name}
              className="!font-[400] !text-[15px] text-menuItemColor !leading-8 w-full "
            >
              {menu?.withSubMenu3 ? (
                <div
                  className={cn(
                    "link-sub-menu3 capitalize relative hover:cursor-pointer hover:no-underline visited:no-underline active:no-underline",
                    (pathname.includes(menu.route) ||
                      pathname.includes(menu.prefix) ||
                      tabClickedLV3 === menu.name) &&
                      "sidebar-parent-active",
                  )}
                >
                  <div
                    className="flex justify-between items-center w-[10.8rem]"
                    onClick={() => showSubMenuLV3(menu.name)}
                  >
                    <div className="flex items-center gap-x-1">
                      <menu.icon
                        size={sidebarMinimized ? 30 : 15}
                        className={cn(
                          "min-w-max group-hover/navitemsub:text-white",
                          sidebarMinimized && "mx-auto",
                          pathname.includes(menu.name) ||
                            pathname.includes(menu.prefix) ||
                            tabClickedLV3 === menu.name
                            ? "text-dashboard-purple"
                            : "text-menuItemIcon",
                        )}
                      />
                      {menu.name}
                    </div>

                    {!sidebarMinimized && (
                      <IoIosArrowDown
                        strokeWidth={2}
                        size={12}
                        className={cn(
                          "mr-1 group-hover/navitemsub:text-white",
                          tabClickedLV3 !== menu.name
                            ? "-rotate-90 duration-200"
                            : "rotate-30 duration-200",
                          (pathname.includes(menu.name) ||
                            pathname.includes(menu.prefix) ||
                            tabClickedLV3 === menu.name) &&
                            "text-dashboard-purple",
                        )}
                      />
                    )}
                  </div>

                  {sidebarOpen && (
                    <motion.ul
                      animate={
                        tabClickedLV3 === menu.name
                          ? {
                              height: "fit-content",
                            }
                          : {
                              height: 0,
                            }
                      }
                      className={`flex h-0 flex-col   z-10 font-normal overflow-hidden w-full relative rounded-br-[0.65rem]    ${
                        tabClickedLV3 === menu.name && "bg-sidebarSubMenuBg"
                      }`}
                    >
                      <div
                        className={` -left-[0.35rem] h-full absolute mx-3 border-[0.6px] border-sidebarLineColor ${
                          tabClickedLV3 === menu.name ||
                          pathname.includes(menu.name)
                            ? "block"
                            : "hidden"
                        }`}
                      ></div>

                      {menu?.menus?.map((menu3) => (
                        <li
                          key={menu3.name}
                          className="!font-[400] !text-[15px] text-menuItemColor  !leading-8 "
                        >
                          <NavLink
                            to={menu3?.enabled ? `${menu3.route}` : "#"}
                            className={({ isActive }) =>
                              cn(
                                "link-sub-menu4 capitalize relative hover:cursor-pointer hover:no-underline visited:no-underline active:no-underline",
                                (isActive || pathname.includes(menu3.route)) &&
                                  "sidebar-nav-active",
                              )
                            }
                          >
                            {menu3.name}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              ) : (
                <>
                  {menu?.name?.toLowerCase() === "message room" ? (
                    <div
                      onClick={openMessageRoom}
                      className={cn(
                        menu?.icon ? "link-sub-menu3" : "link-sub-menu",
                        "capitalize relative hover:cursor-pointer hover:no-underline visited:no-underline active:no-underline",
                        pathname.includes(menu.route) && "sidebar-nav-active",
                      )}
                    >
                      <span>{menu.name}</span>
                    </div>
                  ) : (
                    <NavLink
                      to={
                        menu?.enabled
                          ? routeMerge
                            ? `/${data.name}${menu.route}`
                            : `${menu.route}`
                          : `#`
                      }
                      className={({ isActive }) =>
                        cn(
                          menu?.icon ? "link-sub-menu3" : "link-sub-menu",
                          "capitalize relative hover:cursor-pointer hover:no-underline visited:no-underline active:no-underline",
                          (isActive || pathname.includes(menu.route)) &&
                            "sidebar-nav-active",
                        )
                      }
                    >
                      {menu?.icon ? (
                        <div className="flex items-center gap-x-1">
                          <menu.icon
                            size={sidebarMinimized ? 30 : 12}
                            className="min-w-max group-hover/navitemsub:text-white"
                          />
                          {menu.name}
                        </div>
                      ) : (
                        <span
                          className={cn(!menu?.enabled && "text-menuItemIcon")}
                        >
                          {menu.name}
                        </span>
                      )}
                    </NavLink>
                  )}
                </>
              )}
            </li>
          ))}
        </motion.ul>
      )}

      {
        <ChatDrawer
          // fromMessageRoom={true} // from message room PEND for now
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
        />
      }
    </>
  );
};

export default SubMenu;
