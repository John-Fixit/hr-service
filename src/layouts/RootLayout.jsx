import { useContext } from "react";
import { dashboardContext } from "../context/Dashboard";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet, useLocation } from "react-router-dom";

function RootLayout() {
  const { sidebarOpen } = useContext(dashboardContext);
  const { pathname } = useLocation();

  const isMemos = pathname === "/engage/memos";
  const isProfileDetails = pathname?.includes("/self/profile_details/");

  const mainClassName = [
    "scrollbar-slim flex-1 w-full overflow-y-auto overflow-x-clip pr-8",
    isMemos || isProfileDetails ? "py-0" : "py-5",
    !isMemos && "pl-4 md:pl-6",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`h-screen bg-lighten dark:text-gray-100 dark:bg-slate-700 duration-200 ease-in-out ${
        // sidebarOpen ? "lg:pl-[260px]" : "lg:pl-0"
        "lg:pl-0"
      }`}
    >
      <Sidebar />
      <div className="flex h-screen w-full flex-col overflow-hidden">
        {pathname !== "/engage/memos" && <Navbar />}
        <main className={mainClassName}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
