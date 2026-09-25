"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

// Aparición sobria: cada .reveal entra una sola vez al llegar al viewport.
export default function RevealProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );

    const observeAll = () =>
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => observer.observe(el));

    observeAll();
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
