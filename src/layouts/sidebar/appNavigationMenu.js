import {
  LayoutDashboard,
  UserCog,
  CalendarDays,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
  Bell,
  Wallet,
  Coins,
  CircleDollarSign,
  CalendarRange,
  FileBarChart,
  Users2,
  Building2,
  Settings,
} from "lucide-react";

/**
 * Sidebar menu matching the enterprise template layout.
 * Parents without children are hidden after filtering.
 */
export const appNavigationMenu = [
  {
    title: null,
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        route: "/engage/home",
        enabled: true,
      },
      {
        name: "Self Service",
        icon: UserCog,
        children: [
          { name: "Profile", route: "/people/self/profile", enabled: true },
          { name: "Leave", route: "/people/self/leave", enabled: true },
          { name: "Approvals", route: "/people/self/approvals", enabled: true },
          {
            name: "Attendance",
            route: "/people/self/attendance",
            enabled: true,
          },
          { name: "Requests", route: "/people/self/requests", enabled: true },
          { name: "Hospital", route: "/people/self/hospital", enabled: true },
          { name: "Exit", route: "/people/self/exit", enabled: true },
          {
            name: "Performance",
            route: "/people/self/performance",
            enabled: true,
          },
          {
            name: "Salary Advance",
            route: "/people/self/salary-advance",
            enabled: true,
          },
          { name: "Training", route: "/people/self/training", enabled: true },
        ],
      },
      {
        name: "Leave Management",
        icon: CalendarDays,
        children: [
          { name: "My Leave", route: "/people/self/leave", enabled: true },
          {
            name: "Leave (HR)",
            route: "/people/hr/leave",
            enabled: true,
            requiresHR: true,
          },
        ],
      },
      {
        name: "Performance",
        icon: TrendingUp,
        children: [
          {
            name: "My Performance",
            route: "/people/self/performance",
            enabled: true,
          },
          {
            name: "Performance Dashboard",
            route: "/performance/dashboard",
            enabled: true,
          },
          {
            name: "HR Performance",
            route: "/people/hr/performance",
            enabled: true,
            requiresHR: true,
          },
        ],
      },
      {
        name: "Training & Courses",
        icon: GraduationCap,
        children: [
          { name: "My Training", route: "/people/self/training", enabled: true },
          { name: "Courses", route: "/people/learning/courses", enabled: true },
          { name: "LMS", route: "/lms/dashboard", enabled: true },
        ],
      },
      {
        name: "Approvals",
        icon: CheckCircle2,
        children: [
          {
            name: "My Approvals",
            route: "/people/self/approvals",
            enabled: true,
          },
          {
            name: "HR Approvals",
            route: "/people/hr/approvals",
            enabled: true,
            requiresHR: true,
          },
        ],
      },
      {
        name: "News & Notices",
        icon: Bell,
        children: [
          { name: "News", route: "/engage/news", enabled: true },
          { name: "Memos", route: "/engage/memos", enabled: true },
          { name: "Posts", route: "/engage/home", enabled: true },
        ],
      },
    ],
  },
  {
    title: "PAYROLL",
    items: [
      {
        name: "Payslip",
        icon: Wallet,
        route: "/people/self/salary",
        enabled: true,
      },
      {
        name: "Allowances",
        icon: Coins,
        route: "/payroll/settings/allowances",
        enabled: true,
        requiresSalary: true,
      },
      {
        name: "Loans",
        icon: CircleDollarSign,
        route: "/payroll/loan",
        enabled: true,
        requiresSalary: true,
      },
      {
        name: "13th Month",
        icon: CalendarRange,
        route: "/payroll/13thmonth",
        enabled: true,
        requiresSalary: true,
      },
    ],
  },
  {
    title: "REPORTS",
    items: [
      {
        name: "Reports",
        icon: FileBarChart,
        route: "/payroll/report",
        enabled: true,
        requiresSalary: true,
      },
      {
        name: "HR Reports",
        icon: FileBarChart,
        route: "/people/hr/report",
        enabled: true,
        requiresHR: true,
      },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      {
        name: "Users Management",
        icon: Users2,
        route: "/people/admin/administrator",
        enabled: true,
        requiresAdmin: true,
      },
      {
        name: "Departments",
        icon: Building2,
        route: "/hr/settings/departments",
        enabled: true,
        requiresHR: true,
      },
      {
        name: "Settings",
        icon: Settings,
        children: [
          {
            name: "Institution",
            route: "/hr/settings/institution",
            enabled: true,
            requiresHR: true,
          },
          {
            name: "Courses",
            route: "/hr/settings/courses",
            enabled: true,
            requiresHR: true,
          },
          {
            name: "Designations",
            route: "/hr/settings/designations",
            enabled: true,
            requiresHR: true,
          },
          {
            name: "Directorates",
            route: "/hr/settings/directorates",
            enabled: true,
            requiresHR: true,
          },
          {
            name: "Units",
            route: "/hr/settings/units",
            enabled: true,
            requiresHR: true,
          },
          {
            name: "Holidays",
            route: "/hr/settings/holidays",
            enabled: true,
            requiresHR: true,
          },
          {
            name: "Connect Accounts",
            route: "/integrate/connect_accounts",
            enabled: true,
          },
          {
            name: "Integrations",
            route: "/integrate/settings",
            enabled: true,
          },
        ],
      },
    ],
  },
];

export const buildAppNavigationMenu = () => appNavigationMenu;
