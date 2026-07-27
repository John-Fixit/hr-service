/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import CreatePost from "./CreatePost";
import PostFeeds from "./PostFeeds";
import Memos from "./components/Memos";
import useAdPopupStore from "../../../hooks/useAdsPopup";

const CenterFeed = () => {
  const { handleHomePageVisit, resetInitialization, visitCount, hasShownOnLogin } =
    useAdPopupStore();

  useEffect(() => {
    handleHomePageVisit();
    return () => {
      resetInitialization();
    };
  }, []);

  useEffect(() => {
    console.log(
      `📊 Current visit count: ${visitCount}, Has logged in: ${hasShownOnLogin}`
    );
  }, [visitCount, hasShownOnLogin]);

  return (
    <div className="flex flex-col gap-5 overflow-hidden">
      <CreatePost />
      <Memos />
      <PostFeeds />
    </div>
  );
};

export default CenterFeed;
