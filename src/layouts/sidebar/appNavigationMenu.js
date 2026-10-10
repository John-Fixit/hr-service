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
    title: "LMS",
    items: [
      {
        name: "Dashboard",
        icon: LayoutDashboard,
        route: "/lms/dashboard",
        enabled: true,
      },
      {
        name: "My Learning",
        icon: GraduationCap,
        route: "/lms/learning",
        enabled: true,
      },
      {
        name: "My Courses",
        icon: UserCog,
        route: "/lms/staff",
        enabled: true,
      },
    ],
  },
];

export const buildAppNavigationMenu = () => appNavigationMenu;
