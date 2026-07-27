/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@nextui-org/react";
import { hasActiveChild, isRouteActive } from "./filterNavigationMenu";

const itemBase =
  "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all";

const inactiveItem = "text-slate-300 hover:bg-white/5 hover:text-white";
const activeItem =
  "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-900/40";

const iconInactive = "text-slate-400 group-hover:text-white";
const iconActive = "text-white";

const SidebarNavItem = ({ item, depth = 0 }) => {
  const { pathname } = useLocation();
  const hasChildren = Boolean(item.children?.length);
  const childActive = hasActiveChild(pathname, item);
  const [open, setOpen] = useState(childActive);

  useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive, pathname]);

  if (!hasChildren) {
    const active = isRouteActive(pathname, item.route);
    return (
      <li>
        <NavLink
          to={item.enabled === false ? "#" : item.route}
          end={item.route === "/engage/home" && item.name === "Dashboard"}
          className={cn(
            itemBase,
            depth > 0 && "py-2 pl-9",
            active ? activeItem : inactiveItem
          )}
        >
          {item.icon && depth === 0 && (
            <item.icon
              className={cn(
                "h-[18px] w-[18px] shrink-0",
                active ? iconActive : iconInactive
              )}
              strokeWidth={2}
            />
          )}
          <span className="flex-1 truncate">{item.name}</span>
        </NavLink>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(itemBase, inactiveItem, "text-left")}
      >
        {item.icon && (
          <item.icon
            className={cn("h-[18px] w-[18px] shrink-0", iconInactive)}
            strokeWidth={2}
          />
        )}
        <span className="flex-1 truncate text-left">{item.name}</span>
        <ChevronRight
          className={cn(
            "h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-hover:text-slate-300",
            open && "rotate-90"
          )}
          strokeWidth={2}
        />
      </button>
      {open && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => (
            <SidebarNavItem key={child.name} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarNavItem;
