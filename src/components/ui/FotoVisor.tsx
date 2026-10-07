"use client";

import { useCallback, useEffect, useRef } from "react";
import { categoriaLabel, fotoSrc, type Sesion } from "@/lib/fotos";

type Props = {
  sesion: Sesion | null;
  indice: number;
  onIndice: (i: number) => void;
  onClose: () => void;
};

export default function FotoVisor({ sesion, indice, onIndice, onClose }: Props) {
  const touchX = useRef<number | null>(null);
  const total = sesion?.fotos.length ?? 0;

  const ir = useCallback(
    (d: number) => {
      if (total) onIndice((indice + d + total) % total);
    },
    [indice, total, onIndice]
  );

  useEffect(() => {
    if (!sesion) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") ir(1);
      else if (e.key === "ArrowLeft") ir(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [sesion, ir, onClose]);

  if (!sesion) return null;
  const foto = sesion.fotos[indice];
  const sig = sesion.fotos[(indice + 1) % total];

  return (
    <div
      className="foto-visor"
      role="dialog"
      aria-modal="true"
      aria-label={sesion.titulo}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1);
      }}
    >
      <div className="foto-visor-top placa">
        <span>
          {sesion.titulo}
          <span className="foto-visor-sub"> · {categoriaLabel[sesion.categoria]}</span>
        </span>
        <span>
          {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button type="button" className="placa" onClick={onClose}>
          Cerrar
        </button>
      </div>
      <img
        key={foto.n}
        className="foto-visor-img"
        src={fotoSrc(sesion.slug, foto.n)}
        width={foto.w}
        height={foto.h}
        alt={`${sesion.titulo}, foto ${indice + 1} de ${total}`}
      />
      <link rel="preload" as="image" href={fotoSrc(sesion.slug, sig.n)} />
      {total > 1 && (
        <>
          <button type="button" className="foto-visor-nav prev placa" onClick={() => ir(-1)} aria-label="Foto anterior">
            ←
          </button>
          <button type="button" className="foto-visor-nav next placa" onClick={() => ir(1)} aria-label="Foto siguiente">
            →
          </button>
        </>
      )}
    </div>
  );
}
