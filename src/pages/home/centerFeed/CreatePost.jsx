// /* eslint-disable no-unused-vars */
import { Image, BarChart2, Calendar, Send, Pencil } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import CreatePostDrawer from "./components/CreatePostDrawer";
import { BsStars } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";
import { MdCancel } from "react-icons/md";
import { useCreatePost } from "../../../lib/query/queryandMutation";
import useCurrentUser from "../../../hooks/useCurrentUser";

const actionButtons = [
  {
    id: "photo",
    label: "Photo / Video",
    icon: Image,
    color: "text-emerald-600 border-emerald-200 bg-emerald-50",
  },
  {
    id: "quicknote",
    label: "Quicknote",
    icon: BsStars,
    color: "text-amber-600 border-amber-200 bg-amber-50",
    isQuicknote: true,
  },
  {
    id: "poll",
    label: "Poll",
    icon: BarChart2,
    color: "text-violet-600 border-violet-200 bg-violet-50",
  },
  {
    id: "event",
    label: "Event",
    icon: Calendar,
    color: "text-rose-600 border-rose-200 bg-rose-50",
  },
];

const CreatePost = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [desc, setDesc] = useState("");
  const [bg, setBg] = useState(null);
  const { userData } = useCurrentUser();
  const [backgroundMode, setBackgroundMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("bg-yellow-600");
  const [showBackgroundOption, setShowBackgroundOption] = useState(false);
  const { mutateAsync: create, isPending } = useCreatePost();

  const triggerBackground = () => {
    setShowBackgroundOption(!showBackgroundOption);
    if (backgroundMode) {
      setBackgroundMode(!backgroundMode);
      setBg(null);
    } else {
      setTimeout(() => {
        setBackgroundMode(!backgroundMode);
        setBg("yellow");
      }, 300);
    }
  };

  const setcolor = (c1, c2) => {
    setBackgroundColor(c1);
    setBg(c2);
  };

  const handleCreatePost = async () => {
    try {
      if (isPending) return;
      const res = await create({
        file: null,
        content: desc,
        bg,
        STAFF_ID: userData?.data?.STAFF_ID,
      });
      if (res) {
        setDesc("");
        setBg(null);
        setShowBackgroundOption(false);
        setBackgroundMode(false);
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  const handleAction = (action) => {
    if (action.isQuicknote) {
      triggerBackground();
      return;
    }
    onOpen();
  };

  return (
    <div className="dashboard-card p-5 md:px-5 md:py-3 space-y-2">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
          <Pencil className="h-4 w-4 text-indigo-600" />
        </div>
        <h2 className="text-[15px] font-bold text-slate-800">Create Post</h2>
      </div>
      {backgroundMode ? (
        <div>
          <div
            className={`h-[220px] ${backgroundColor} opacity-90 flex items-center justify-center rounded-xl border`}
          >
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={200}
              className="bg-transparent text-center border-none outline-none text-xl min-h-36 w-full text-white font-bold px-4 py-4 resize-none caret-white"
              placeholder="Write your quicknote..."
              autoFocus
            />
          </div>
        </div>
      ) : (
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onClick={onOpen}
          rows={2}
          placeholder="Share an update, news or announcement..."
          className="mt-4 w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {actionButtons.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => handleAction(action)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors hover:opacity-90 ${
                action.isQuicknote && backgroundMode
                  ? "text-red-600 border-red-200 bg-red-50"
                  : ""
              }`}
            >
              {action.isQuicknote && backgroundMode ? (
                <MdCancel size={14} />
              ) : (
                <action.icon size={14} className={action.color} />
              )}
              <span>
                {action.isQuicknote && backgroundMode ? "Cancel" : action.label}
              </span>
            </button>
          ))}
        </div>

        {backgroundMode ? (
          <button
            type="button"
            onClick={handleCreatePost}
            disabled={isPending || !desc}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-dashboard-purple text-white text-sm font-semibold hover:bg-dashboard-purple-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {isPending ? (
              <Spinner size="sm" classNames={{ circle1: "border-white/80" }} />
            ) : (
              <Send size={15} />
            )}
            Post
          </button>
        ) : (
          <button
            type="button"
            onClick={desc.trim() ? handleCreatePost : onOpen}
            disabled={isPending || !desc.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-dashboard-purple text-white text-sm font-semibold hover:bg-dashboard-purple-hover disabled:opacity-50 transition-colors shrink-0"
          >
            {isPending ? (
              <Spinner size="sm" classNames={{ circle1: "border-white/80" }} />
            ) : null}
            Post
          </button>
        )}
      </div>
      <div
        className={`postBgOptions ${showBackgroundOption && "postBgOptionsShow"}`}
      >
        <ul className="flex space-x-2 mt-2">
          {[
            ["bg-yellow-600", "yellow"],
            ["bg-blue-600", "blue"],
            ["bg-purple-600", "purple"],
            ["bg-red-600", "red"],
            ["bg-green-600", "green"],
            ["bg-cyan-800", "cyan"],
          ].map(([c1, c2]) => (
            <li
              key={c2}
              onClick={() => setcolor(c1, c2)}
              className="p-1 rounded-full cursor-pointer"
            >
              <div
                className={`w-6 h-6 rounded-full ${c1} opacity-70 flex items-center justify-center`}
              >
                <BsStars color="white" size={12} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <CreatePostDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </div>
  );
};

export default CreatePost;
