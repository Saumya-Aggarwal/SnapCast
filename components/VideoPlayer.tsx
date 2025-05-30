import { createIframeLink } from "@/lib/utils";
import React from "react";

const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  return (
    <div className="video-player">
      <iframe
        src={createIframeLink(videoId)}
        loading="lazy"
        title="Video Player"
        style={{ border: 0, zIndex: 50 }}
        allowFullScreen
        allow="accelerometer;  encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
