"use client";

import { useEffect, useState } from "react";

export default function FilmGrain() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;
  return <div className="film-grain" />;
}
