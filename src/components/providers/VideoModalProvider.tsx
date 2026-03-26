"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type VideoModalContextType = {
  videoId: string | null;
  openVideo: (id: string) => void;
  closeVideo: () => void;
};

const VideoModalContext = createContext<VideoModalContextType>({
  videoId: null,
  openVideo: () => {},
  closeVideo: () => {},
});

export function useVideoModal() {
  return useContext(VideoModalContext);
}

export default function VideoModalProvider({ children }: { children: ReactNode }) {
  const [videoId, setVideoId] = useState<string | null>(null);

  const openVideo = useCallback((id: string) => {
    setVideoId(id);
  }, []);

  const closeVideo = useCallback(() => {
    setVideoId(null);
  }, []);

  return (
    <VideoModalContext.Provider value={{ videoId, openVideo, closeVideo }}>
      {children}
    </VideoModalContext.Provider>
  );
}
