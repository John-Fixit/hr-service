/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { dashboardContext } from "../../context/Dashboard";
import { cn } from "@nextui-org/react";

const ThirdSubMenu = ({ data, routeMerge }) => {
  const {
    sidebarOpen,
    tabClicked,
    toggleTab,
    sidebarMinimized,
    setShowminimizedsubMenu,
    setExtendedSubMenuData,
  } = useContext(dashboardContext);
  const { pathname } = useLocation();

  const [showDropDown, setShowDropDown] = useState(false);
  const trigger = useRef(null);

  const showSubMenu = () => {
    if (sidebarMinimized) {
      setShowminimizedsubMenu(true);
      setExtendedSubMenuData(data);
    }
    toggleTab(data.name);
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

  const hasActiveChild = data.menus?.some((menu) =>
    pathname.includes(menu.route)
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
          isParentActive && "sidebar-parent-active"
        )}
        onClick={showSubMenu}
        ref={trigger}
      >
        <data.icon
          size={sidebarMinimized ? 30 : 18}
          className={cn(
            "min-w-max group-hover/navitemsub:text-white",
            sidebarMinimized && "mx-auto",
            isParentActive ? "text-dashboard-purple" : "text-menuItemIcon"
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
              isParentActive && "text-dashboard-purple"
            )}
          />
        )}
      </li>

      {sidebarOpen && (
        <motion.ul
          variants={variants}
          animate={
            !sidebarMinimized && tabClicked === data.name
              ? { height: "fit-content" }
              : { height: 0 }
          }
          className={cn(
            "flex h-0 flex-col pl-7 z-10 font-normal overflow-hidden w-[15rem] relative -top-2 rounded-br-[0.65rem]"
          )}
        >
          <div
            className={cn(
              "left-6 h-full absolute mx-3 border-[0.6px] border-sidebarLineColor",
              tabClicked === data.name || pathname.includes(data.name)
                ? "block"
                : "hidden"
            )}
          />

          {data.menus?.map((menu) => (
            <li
              key={menu.name}
              className="!font-[400] !text-[15px] text-menuItemColor !leading-8"
            >
              <NavLink
                to={routeMerge ? `/${data.name}${menu.route}` : `${menu.route}`}
                className={({ isActive }) =>
                  cn(
                    "link-sub-menu capitalize relative hover:cursor-pointer hover:no-underline visited:no-underline active:no-underline",
                    (isActive || pathname.includes(menu.route)) &&
                      "sidebar-nav-active"
                  )
                }
              >
                {menu.name}
              </NavLink>
            </li>
          ))}
        </motion.ul>
      )}
    </>
  );
};

export default ThirdSubMenu;
