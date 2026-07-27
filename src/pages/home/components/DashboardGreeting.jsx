import useCurrentUser from "../../../hooks/useCurrentUser";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const DashboardGreeting = () => {
  const { userData } = useCurrentUser();
  const name =
    userData?.data?.LAST_NAME || userData?.data?.FIRST_NAME || "there";

  return (
    <div className="mb-5">
      <h1 className="text-2xl font-bold text-slate-900 normal-case">
        {getGreeting()}, {name} <span className="inline-block">👋</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Here&apos;s what&apos;s happening with your HR activities today.
      </p>
    </div>
  );
};

export default DashboardGreeting;
