/* eslint-disable react/prop-types */
import { getPostMediaUrl, isVideoFile } from "../../../utils/postMedia";

const PostMedia = ({ fileName, className = "", onImageClick }) => {
  const src = getPostMediaUrl(fileName);
  const isVideo = isVideoFile(fileName);

  if (!src) return null;

  if (isVideo) {
    return (
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <img
      src={src}
      alt=""
      className={className}
      onClick={onImageClick}
    />
  );
};

export default PostMedia;
