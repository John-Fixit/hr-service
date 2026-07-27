/* eslint-disable react/prop-types */
import { Avatar, Button } from "@nextui-org/react";
import { Wand2 } from "lucide-react";
import { filePrefix } from "../../../../utils/filePrefix";

const BirthdaySidebarCard = ({ birthday, onSendWishes }) => {
  if (!birthday) {
    return (
      <div className="dashboard-card overflow-hidden p-6 text-center">
        <p className="text-sm text-dashboard-muted">No birthdays today</p>
      </div>
    );
  }

  const fullName = `${birthday?.LAST_NAME || ""} ${birthday?.FIRST_NAME || ""}`.trim();
  const role =
    birthday?.DESIGNATION ||
    birthday?.DEPARTMENT ||
    birthday?.DIRECTORATE ||
    "Staff";

  return (
    <div className="dashboard-card overflow-hidden relative">
      <div className="absolute top-3 left-4 text-2xl opacity-80 pointer-events-none select-none">
        🎈
      </div>
      <div className="absolute top-2 right-6 text-xl opacity-80 pointer-events-none select-none">
        🎁
      </div>
      <div className="absolute bottom-20 left-3 text-lg opacity-60 pointer-events-none select-none">
        🎉
      </div>

      <div className="px-5 pt-5 pb-2 text-center">
        <p className="text-xs font-semibold text-dashboard-muted uppercase tracking-wide">
          Today&apos;s Birthday Celebration
        </p>
      </div>

      <div className="flex flex-col items-center px-5 pb-5">
        <div className="relative my-3">
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md scale-110" />
          <Avatar
            src={birthday?.FILE_NAME ? filePrefix + birthday.FILE_NAME : undefined}
            name={birthday?.FIRST_NAME?.trim()?.[0]}
            className="w-24 h-24 text-2xl border-4 border-amber-400 relative z-10"
          />
        </div>

        <p className="font-semibold text-slate-800 text-base">{fullName}</p>
        <p className="text-xs text-dashboard-muted mt-0.5 mb-3">{role}</p>

        <p className="text-2xl font-script text-dashboard-purple mb-4" style={{ fontFamily: "cursive" }}>
          Happy Birthday!
        </p>

        <Button
          onPress={onSendWishes}
          className="w-full bg-dashboard-purple text-white font-semibold rounded-xl"
          startContent={<Wand2 size={16} />}
        >
          Send Wishes
        </Button>
      </div>
    </div>
  );
};

export default BirthdaySidebarCard;
