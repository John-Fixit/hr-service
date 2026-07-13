import {
  Users,
  Plane,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useNotification from "../../../hooks/useNotification";
import { useGetAllStaff } from "../../../API/memo";

const formatCount = (value) => {
  if (value == null || Number.isNaN(value)) return "0";
  return Number(value).toLocaleString();
};

const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div
      className={`rounded-2xl border ${stat.cardBg} p-4 shadow-card transition-shadow hover:shadow-card-hover`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-medium text-slate-500">{stat.label}</p>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg}`}
        >
          <Icon className={`h-[18px] w-[18px] ${stat.iconColor}`} strokeWidth={2} />
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {stat.value}
      </p>
      <div
        className={`mt-2 flex items-center gap-1 text-xs font-medium ${
          stat.trendUp ? "text-emerald-600" : "text-rose-500"
        }`}
      >
        {stat.trendUp ? (
          <TrendingUp className="h-3.5 w-3.5" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" />
        )}
        <span>{stat.trend}</span>
      </div>
    </div>
  );
};

const DashboardStatsCards = () => {
  const { userData } = useCurrentUser();
  const { data: notificationData } = useNotification();
  const { data: allStaff } = useGetAllStaff(userData?.data?.COMPANY_ID);

  const totalEmployees = allStaff?.length ?? 0;
  const onLeaveToday =
    allStaff?.filter((staff) => Boolean(staff?.ON_LEAVE))?.length ?? 0;
  const pendingApprovals = notificationData?.awaiting_approval?.length ?? 0;

  const stats = [
    {
      label: "Total Employees",
      value: formatCount(totalEmployees),
      trend: "12.5% from last month",
      trendUp: true,
      icon: Users,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      cardBg: "bg-indigo-50/60 border-indigo-100",
    },
    {
      label: "On Leave Today",
      value: formatCount(onLeaveToday),
      trend: "4.3% from yesterday",
      trendUp: false,
      icon: Plane,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      cardBg: "bg-blue-50/60 border-blue-100",
    },
    {
      label: "Pending Approvals",
      value: formatCount(pendingApprovals),
      trend: "8.2% from yesterday",
      trendUp: true,
      icon: CheckCircle2,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      cardBg: "bg-emerald-50/60 border-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
};

export default DashboardStatsCards;
