import { filePrefix } from "./filePrefix";

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|m4v|ogg|ogv|avi|mkv)$/i;

export const isVideoFile = (fileName) => {
  if (!fileName || typeof fileName !== "string") return false;
  return VIDEO_EXTENSIONS.test(fileName.split("?")[0]);
};

export const getPostMediaUrl = (fileName, prefix = filePrefix) => {
  if (!fileName) return "";
  if (fileName.includes("http://") || fileName.includes("https://")) {
    return fileName;
  }
  return prefix + fileName;
};
