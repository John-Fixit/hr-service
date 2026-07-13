/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import CommentReply from "./CommentReply";
import TimeAgo from "./TimeAgo";
import { filePrefix } from "../../../utils/filePrefix";
import { AiTwotoneDelete } from "react-icons/ai";
import { MoreVertical } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import ConfirmDeleteModal from "../../../components/core/shared/ConfirmDelete";
import { useDeletePostComment } from "../../../lib/query/queryandMutation";
import { postContext } from "../../../context/Post";
import toast from "react-hot-toast";
import useCurrentUser from "../../../hooks/useCurrentUser";

const Comment = ({ data, withReply }) => {
  const {
    isOpen: isConfirmDeleteModalOpen,
    onOpen: openConfirmDeleteModal,
    onClose: onConfirmDeleteModalCancel,
  } = useDisclosure();
  const [msgValue, setMsgValue] = useState("");
  const { userData } = useCurrentUser();
  const [editedMsgData, seteditedMsgData] = useState(null);
  const { mutateAsync: removePostComment, isPending: isDeletingPostComment } =
    useDeletePostComment();

  const { deleteAPostComment, editAPostComment } = useContext(postContext);

  const textareaRef = useRef(null);

  const authorName =
    `${data?.LAST_NAME || ""} ${data?.FIRST_NAME || ""} ${data?.OTHER_NAMES || ""}`.trim();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120,
      )}px`;
    }
  }, [msgValue]);

  const editComment = async () => {
    try {
      const res = true;
      if (res) {
        editAPostComment(data?.POST_ID, data.COMMENT_ID, msgValue);
        seteditedMsgData(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit comment, please retry");
    }
  };

  const deleteComment = async () => {
    try {
      if (isDeletingPostComment) return;
      onConfirmDeleteModalCancel();
      const res = await removePostComment({
        post_id: data?.POST_ID,
        comment_id: data.COMMENT_ID,
        staff_id: userData?.data?.STAFF_ID,
      });
      if (res) {
        deleteAPostComment(data?.POST_ID, data.COMMENT_ID);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete comment, please retry");
    }
  };

  return (
    <div className="">
      <div className="flex w-full items-start gap-2.5 py-1.5">
        {data?.FILE_NAME ? (
          <Avatar
            size="sm"
            className="h-8 w-8 shrink-0"
            src={filePrefix + data?.FILE_NAME || ""}
            title={authorName}
          />
        ) : (
          <Avatar
            size="sm"
            name={data?.FIRST_NAME?.trim()?.[0]}
            className="h-8 w-8 shrink-0 text-xs"
            title={authorName}
          />
        )}

        <div className={cn("min-w-0 flex-1", editedMsgData ? "w-full" : "")}>
          <div
            className={cn(
              "rounded-2xl bg-slate-50 px-3.5 py-2",
              editedMsgData ? "w-full" : "",
            )}
          >
            <div className="flex items-center gap-2">
              <p className="truncate text-xs font-semibold text-slate-800">
                {authorName}
              </p>
              <span className="text-[11px] text-slate-400">
                <TimeAgo timestamp={data?.DATE_POSTED} />
              </span>
            </div>

            {editedMsgData ? (
              <div className="relative mt-2 flex items-center gap-2">
                <textarea
                  ref={textareaRef}
                  value={msgValue}
                  onChange={(e) => setMsgValue(e.target.value)}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Edit comment..."
                  style={{
                    height: "auto",
                    minHeight: "40px",
                    maxHeight: "120px",
                    overflow: "auto",
                  }}
                />
                <button
                  onClick={editComment}
                  disabled={!msgValue}
                  type="submit"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <p className="mt-0.5 text-sm leading-snug text-slate-600">
                {data?.MESSAGE}
              </p>
            )}
          </div>

          <div className="mt-1 flex items-center justify-between px-1">
            {editedMsgData ? (
              <button
                type="button"
                className="cursor-pointer text-xs text-indigo-600"
                onClick={() => seteditedMsgData(null)}
              >
                Cancel
              </button>
            ) : (
              data?.USER_ID === userData?.data?.STAFF_ID && (
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <button
                      type="button"
                      className="rounded-full p-0.5 text-slate-400 hover:bg-slate-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex w-30 flex-col items-start justify-center">
                      <Button color="" onClick={openConfirmDeleteModal}>
                        <AiTwotoneDelete size={18} className="w-4" />
                        <span className="text-gray-600"> Delete</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )
            )}
          </div>
        </div>
      </div>

      <div>
        {withReply && (
          <>
            <CommentReply
              name={"Sufiya Elija"}
              image={"/assets/images/profiles/avatar-05.jpg"}
            />
            <CommentReply
              name={"Sofaj Eliyya"}
              image={"/assets/images/profiles/avatar-08.jpg"}
            />
          </>
        )}
      </div>

      <ConfirmDeleteModal
        subject={"Are you sure? comment will be deleted"}
        isOpen={isConfirmDeleteModalOpen}
        handleOk={deleteComment}
        handleCancel={onConfirmDeleteModalCancel}
        loading={isDeletingPostComment}
      />
    </div>
  );
};

export default Comment;
