"use client";

import { useVideoModal } from "@/components/providers/VideoModalProvider";

type PiezaProps = {
  videoId: string;
  thumb: string;
  titulo: string;
  meta: string;
};

export default function Pieza({ videoId, thumb, titulo, meta }: PiezaProps) {
  const { openVideo } = useVideoModal();

  return (
    <button type="button" className="pieza reveal" onClick={() => openVideo(videoId)}>
      <div className="pieza-media">
        <img src={thumb} alt="" loading="lazy" />
        <span className="pieza-play placa" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 1.5v11l9-5.5z" />
          </svg>
          Ver
        </span>
      </div>
      <div className="pieza-info">
        <span className="display">{titulo}</span>
        <span className="placa">{meta}</span>
      </div>
    </button>
  );
}
