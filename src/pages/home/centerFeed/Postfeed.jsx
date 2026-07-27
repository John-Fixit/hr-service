/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import {
  MessageSquare,
  MoreVertical,
  Pin,
  Send,
  ThumbsUp,
} from "lucide-react";
import Comment from "./Comment";
import { useEffect, useRef, useState } from "react";
import PostModal from "../../../components/modals/PostModal";
import {
  Avatar as NextAvatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import TimeAgo from "./TimeAgo";
import PostFeedWithBg from "./PostFeedWithBg";
import {
  useAddComment,
  useDeletePost,
  useLikePost,
  useLoadMoreComment,
} from "../../../lib/query/queryandMutation";
import useCurrentUser from "../../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { useContext } from "react";
import { postContext } from "../../../context/Post";
import { IoReloadOutline } from "react-icons/io5";
import ChatDrawer from "../rightMenu/components/ChatDrawer";
import { filePrefix } from "../../../utils/filePrefix";
import { isVideoFile } from "../../../utils/postMedia";
import PostMedia from "./PostMedia";
import { AiTwotoneDelete } from "react-icons/ai";
import ConfirmDeleteModal from "../../../components/core/shared/ConfirmDelete";

const Postfeed = ({
  data,
  withoutImg,
  setOpenLikesModal,
  setLikeData,
  isPinned = false,
  badge = null,
}) => {
  const {
    isOpen: isConfirmDeleteModalOpen,
    onOpen: openConfirmDeleteModal,
    onClose: onConfirmDeleteModalCancel,
  } = useDisclosure();
  const [showComment, setShowComment] = useState(false);
  const [msgValue, setMsgValue] = useState("");
  const { userData } = useCurrentUser();
  const { addAComment, deleteAPost, likeAPost, loadMoreComments } =
    useContext(postContext);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const { mutateAsync: add, isPending: isAddingComment } = useAddComment();
  const { mutateAsync: removePost, isPending: isDeletingPost } =
    useDeletePost();
  const { mutateAsync: like } = useLikePost();
  const { mutateAsync: loadComment, isPending: isLoadCommentPending } =
    useLoadMoreComment();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const textareaRef = useRef(null);

  const authorName = `${data?.LAST_NAME || ""} ${data?.FIRST_NAME || ""}`.trim();
  const isSystemAuthor = /system/i.test(authorName);
  const isLiked = data?.LIKES?.some(
    (l) => l.USER_ID === userData?.data?.STAFF_ID,
  );
  const commentCount = data?.COMMENTS?.length || 0;
  const likeCount = data?.TOTAL_LIKES || 0;
  const userInitial =
    userData?.data?.FIRST_NAME?.trim()?.[0]?.toUpperCase() || "U";

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120,
      )}px`;
    }
  }, [msgValue]);

  const addComment = async () => {
    try {
      if (isAddingComment) return;
      const res = await add({
        comment: msgValue,
        postId: data?.POST_ID,
        STAFF_ID: userData?.data?.STAFF_ID,
      });
      if (res) {
        setMsgValue("");
        addAComment(msgValue, userData, data?.POST_ID, res?.data?.comment_id);
        toast.success("comment added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async () => {
    try {
      const res = await like({
        POST_ID: data?.POST_ID,
        USER_ID: userData?.data?.STAFF_ID,
      });
      if (res) {
        likeAPost(
          data?.POST_ID,
          userData?.data,
          res?.data?.likes,
          res?.data?.total_likes,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreComment = async () => {
    try {
      const res = await loadComment({
        post_id: data?.POST_ID,
        limit: data?.COMMENTS?.length,
      });

      if (res) {
        loadMoreComments(data?.POST_ID, res?.data?.data?.COMMENTS);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setUserLikedata = () => {
    setOpenLikesModal(true);
    setLikeData(data?.LIKES);
  };

  const deletePost = async () => {
    try {
      if (isDeletingPost) return;
      onConfirmDeleteModalCancel();
      const res = await removePost({
        post_id: data?.POST_ID,
        staff_id: userData?.data?.STAFF_ID,
      });

      if (res) {
        deleteAPost(data?.POST_ID);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete post, please retry");
    }
  };

  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card text-slate-600">
      {/* Header */}
      <div className="flex items-start gap-3">
        {isSystemAuthor ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
            S
          </div>
        ) : data?.FILE_NAME ? (
          <NextAvatar
            className="h-10 w-10 shrink-0"
            src={filePrefix + data?.FILE_NAME || ""}
            title={authorName}
          />
        ) : (
          <NextAvatar
            name={data?.FIRST_NAME?.trim()?.[0]}
            className="h-10 w-10 shrink-0 cursor-pointer text-large"
            title={authorName}
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-slate-800">
            {authorName}
          </p>
          <p className="text-xs text-slate-400">
            {data?.DIRECTORATE || data?.ROLE || "Staff"} ·{" "}
            <TimeAgo timestamp={data?.DATE_POSTED} />
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isPinned && (
            <span className="flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600">
              <Pin className="h-3 w-3" />
              Pinned
            </span>
          )}
          {badge && (
            <span
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                badge.color || "bg-emerald-50 text-emerald-700"
              }`}
            >
              ★ {badge.label}
            </span>
          )}
          {data?.POSTED_BY === userData?.data?.STAFF_ID && (
            <Popover placement="bottom">
              <PopoverTrigger>
                <button
                  type="button"
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex w-30 flex-wrap items-center justify-center">
                  <Button color="" onClick={openConfirmDeleteModal}>
                    <AiTwotoneDelete size={18} color="red" />
                    <span className="text-red-600"> Delete</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          {data?.POSTED_BY !== userData?.data?.STAFF_ID && (
            <button
              type="button"
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {data?.BACKGROUND_COLOR ? (
        <div className="mt-3">
          <PostFeedWithBg data={data} />
        </div>
      ) : (
        <>
          {data?.POST_FILE_NAME && !withoutImg && (
            <div
              className="mt-3 w-full overflow-hidden rounded-xl bg-black/5"
              onClick={
                isVideoFile(data.POST_FILE_NAME)
                  ? undefined
                  : () => setPostModalOpen(true)
              }
            >
              <PostMedia
                fileName={data.POST_FILE_NAME}
                className={`max-h-[22rem] w-full ${
                  isVideoFile(data.POST_FILE_NAME)
                    ? "object-contain bg-black"
                    : "cursor-zoom-in object-cover object-top"
                }`}
                onImageClick={() => setPostModalOpen(true)}
              />
            </div>
          )}

          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
            <span dangerouslySetInnerHTML={{ __html: data?.POST_CONTENT }} />
          </p>
        </>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <button
            type="button"
            onClick={setUserLikedata}
            className="flex items-center gap-1 hover:text-slate-700"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4C6FFF] text-white">
              <ThumbsUp className="h-2.5 w-2.5" fill="currentColor" />
            </span>
            {likeCount}
          </button>
          {commentCount > 0 && (
            <button
              type="button"
              onClick={() => setShowComment(true)}
              className="hover:text-slate-700"
            >
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={likePost}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors hover:bg-slate-50 ${
              isLiked ? "text-indigo-600" : "text-slate-500"
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-indigo-600" : ""}`} />
            Like
          </button>
          <button
            type="button"
            onClick={() => setShowComment((v) => !v)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors hover:bg-slate-50 ${
              showComment ? "text-indigo-600" : "text-slate-500"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Comment
          </button>
        </div>
      </div>

      {/* Comments */}
      {showComment && (
        <div className="mt-3 border-t border-slate-100 pt-3">
          <ul className="space-y-1">
            {data?.COMMENTS?.map((comment) => (
              <li key={comment?.COMMENT_ID}>
                <Comment data={comment} />
              </li>
            ))}
            {commentCount === 0 && (
              <li className="px-1 text-xs text-slate-400">
                Be the first to comment.
              </li>
            )}
          </ul>

          {data?.TOTAL_COMMENTS > 10 &&
            data?.TOTAL_COMMENTS > data?.COMMENTS?.length && (
              <div className="my-2 mb-4 grid place-items-center text-mainColor">
                <div
                  className="flex cursor-pointer items-center gap-3 rounded-lg bg-xinputLight px-3 py-2"
                  onClick={loadMoreComment}
                >
                  <IoReloadOutline
                    className={`${isLoadCommentPending && "animate-spin"}`}
                  />
                  <span>Load More Replies</span>
                </div>
              </div>
            )}

          {/* Comment composer */}
          <div className="mt-3 flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
              {userInitial}
            </div>
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                rows={1}
                value={msgValue}
                onChange={(e) => setMsgValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                  }
                }}
                placeholder="Write a comment..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/60 py-2 pl-3.5 pr-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                style={{
                  height: "auto",
                  minHeight: "36px",
                  maxHeight: "120px",
                }}
              />
              <button
                type="button"
                onClick={addComment}
                disabled={!msgValue.trim() || isAddingComment}
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send comment"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <PostModal
        data={data}
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />

      <ChatDrawer
        isOpen={showLargeChatContainer}
        onClose={() => setShowLargeChatContainer(false)}
        user={selectedChat}
        setUser={() => setSelectedChat(null)}
      />

      <ConfirmDeleteModal
        subject={"Are you sure? post will be deleted"}
        isOpen={isConfirmDeleteModalOpen}
        handleOk={deletePost}
        handleCancel={onConfirmDeleteModalCancel}
        loading={isDeletingPost}
      />
    </article>
  );
};

export default Postfeed;
