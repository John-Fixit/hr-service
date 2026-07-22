/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "@nextui-org/react";
import moment from "moment";
import { Cake, Gift, PartyPopper } from "lucide-react";
import { getUpcomingBirthdaysAction } from "../../../../API/post";
import { useLoadBirthday } from "../../../../lib/query/queryandMutation";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { filePrefix } from "../../../../utils/filePrefix";

const confetti = [
  { top: "12%", left: "8%", color: "bg-rose-400", delay: "0s" },
  { top: "18%", left: "82%", color: "bg-amber-400", delay: "0.4s" },
  { top: "40%", left: "5%", color: "bg-indigo-400", delay: "0.8s" },
  { top: "28%", left: "46%", color: "bg-emerald-400", delay: "0.2s" },
  { top: "55%", left: "88%", color: "bg-violet-400", delay: "0.6s" },
  { top: "8%", left: "60%", color: "bg-sky-400", delay: "1s" },
];

function Balloon({ className = "" }) {
  return (
    <svg
      width="26"
      height="40"
      viewBox="0 0 26 40"
      fill="none"
      className={className}
    >
      <ellipse
        cx="13"
        cy="13"
        rx="11"
        ry="13"
        fill="currentColor"
        opacity="0.85"
      />
      <path d="M13 26 L11 30 L15 30 Z" fill="currentColor" opacity="0.85" />
      <path
        d="M13 30 Q15 35 12 40"
        stroke="#94a3b8"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

const isBirthdayToday = (dateOfBirth) =>
  moment(dateOfBirth).format("MM-DD") === moment().format("MM-DD");

const formatBirthdayDate = (dateOfBirth) =>
  moment(dateOfBirth).format("MMM DD");

const getFullName = (user) =>
  `${user?.LAST_NAME ?? ""} ${user?.FIRST_NAME ?? ""}`.trim()?.toLowerCase();

const getDesignation = (user) =>
  user?.DESIGNATION_NAME || user?.DESIGNATION || "";

const ProfileAvatar = ({ user, className = "" }) => {
  const name = getFullName(user);
  const initials =
    (user?.LAST_NAME?.trim()?.[0] ?? "") +
    (user?.FIRST_NAME?.trim()?.[0] ?? "");

  if (user?.FILE_NAME) {
    return (
      <Avatar
        className={className}
        src={filePrefix + user.FILE_NAME}
        title={name}
      />
    );
  }

  return (
    <Avatar
      className={className}
      name={initials}
      color="default"
      isBordered
      title={name}
    />
  );
};

const UpcomingBirthdaysSection = ({ onSendWishes, onViewAll }) => {
  const { userData } = useCurrentUser();
  const [allUpcoming, setAllUpcoming] = useState([]);
  const { data: birthdayData } = useLoadBirthday(userData?.data);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await getUpcomingBirthdaysAction(userData?.data);
        if (res) {
          setAllUpcoming(res?.data ?? []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userData?.data) {
      fetchUpcoming();
    }
  }, [userData]);

  const todaysBirthdays = birthdayData?.data?.data ?? [];

  const featuredToday = useMemo(() => {
    if (todaysBirthdays.length > 0) return todaysBirthdays[0];
    return (allUpcoming ?? []).find((user) =>
      isBirthdayToday(user?.DATE_OF_BIRTH),
    );
  }, [allUpcoming, todaysBirthdays]);

  const upcomingList = useMemo(() => {
    return (allUpcoming ?? [])
      .filter((user) => !isBirthdayToday(user?.DATE_OF_BIRTH))
      .slice(0, 4);
  }, [allUpcoming]);

  const handleSendWishes = () => {
    if (featuredToday) {
      onSendWishes(featuredToday);
    }
  };

  return (
    <div className="space-y-4">
      {featuredToday && (
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-indigo-50/80 via-white to-white p-5 shadow-card">
          <h2 className="relative z-10 text-[15px] font-bold text-slate-800">
            Today&apos;s Birthday Celebration
          </h2>

          {confetti.map((c, i) => (
            <span
              key={i}
              className={`absolute h-2 w-2 rounded-sm ${c.color} opacity-80`}
              style={{
                top: c.top,
                left: c.left,
                animation: `float 4s ease-in-out ${c.delay} infinite`,
              }}
            />
          ))}

          <div className="pointer-events-none absolute left-3 top-20 animate-float-slow">
            <Balloon className="text-sky-400" />
          </div>
          <div className="pointer-events-none absolute right-4 top-12 animate-float">
            <Balloon className="text-rose-400" />
          </div>

          <div className="relative z-10 mt-6 flex flex-col items-center text-center">
            <div className="rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 p-1 shadow-lg shadow-indigo-200">
              {featuredToday?.FILE_NAME ? (
                <img
                  src={filePrefix + featuredToday.FILE_NAME}
                  alt={getFullName(featuredToday)}
                  className="h-28 w-28 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <Avatar
                  name={
                    (featuredToday?.LAST_NAME?.trim()?.[0] ?? "") +
                    (featuredToday?.FIRST_NAME?.trim()?.[0] ?? "")
                  }
                  className="h-28 w-28 border-4 border-white text-2xl"
                />
              )}
            </div>

            <p className="mt-3 text-lg font-bold text-slate-900 capitalize">
              {getFullName(featuredToday)}
            </p>
            {getDesignation(featuredToday) && (
              <p className="text-xs text-slate-500">
                {getDesignation(featuredToday)}
              </p>
            )}

            <p
              className="mt-2 text-xl font-bold text-indigo-500"
              style={{ fontFamily: "cursive" }}
            >
              Happy Birthday!
            </p>

            <Gift className="absolute bottom-12 right-2 h-9 w-9 text-rose-400 opacity-80" />

            <button
              type="button"
              onClick={handleSendWishes}
              className="relative z-10 mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg"
            >
              Send Wishes
              <PartyPopper className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-slate-800">
            Upcoming Birthdays
          </h2>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            View all
          </button>
        </div>

        <ul className="mt-3 divide-y divide-slate-100">
          {upcomingList.length > 0 ? (
            upcomingList.map((user) => (
              <li key={user?.STAFF_ID}>
                <button
                  type="button"
                  onClick={() => onSendWishes(user)}
                  className="flex w-full items-center gap-3 py-2.5 text-left transition-colors hover:bg-slate-50"
                >
                  <ProfileAvatar
                    user={user}
                    className="h-9 w-9 shrink-0 text-xs"
                  />
                  <div className="min-w-0 flex-1 flex gap-0 flex-col">
                    <span className="truncate text-sm font-semibold text-slate-800 capitalize">
                      {getFullName(user)}
                    </span>
                    {getDesignation(user) && (
                      <span className="truncate text-xs text-slate-400">
                        {getDesignation(user)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {formatBirthdayDate(user?.DATE_OF_BIRTH)}
                  </span>
                  <Cake className="h-4 w-4 shrink-0 text-rose-400" />
                </button>
              </li>
            ))
          ) : (
            <li className="py-2 text-center text-xs text-slate-500">
              No upcoming birthdays
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingBirthdaysSection;
