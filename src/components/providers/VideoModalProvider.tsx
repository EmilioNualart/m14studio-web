"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type VideoModalContextType = {
  videoId: string | null;
  vertical: boolean;
  openVideo: (id: string, vertical?: boolean) => void;
  closeVideo: () => void;
};

const VideoModalContext = createContext<VideoModalContextType>({
  videoId: null,
  vertical: false,
  openVideo: () => {},
  closeVideo: () => {},
});

export function useVideoModal() {
  return useContext(VideoModalContext);
}

export default function VideoModalProvider({ children }: { children: ReactNode }) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [vertical, setVertical] = useState(false);

  const openVideo = useCallback((id: string, esVertical = false) => {
    setVideoId(id);
    setVertical(esVertical);
  }, []);

  const closeVideo = useCallback(() => {
    setVideoId(null);
  }, []);

  return (
    <VideoModalContext.Provider value={{ videoId, vertical, openVideo, closeVideo }}>
      {children}
    </VideoModalContext.Provider>
  );
}
