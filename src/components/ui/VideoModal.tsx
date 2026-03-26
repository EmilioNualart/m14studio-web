"use client";

import { useEffect, useCallback } from "react";
import { useVideoModal } from "@/components/providers/VideoModalProvider";

export default function VideoModal() {
  const { videoId, closeVideo } = useVideoModal();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && videoId) {
        closeVideo();
      }
    },
    [videoId, closeVideo]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeVideo();
    }
  };

  return (
    <div
      className={`video-modal${videoId ? " active" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className="video-modal-content">
        <button className="video-modal-close" onClick={closeVideo}>
          ✕
        </button>
        {videoId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
