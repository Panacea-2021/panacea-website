"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

function isHomePath(pathname: string) {
  return pathname === "/";
}

function resetHomeToTop(stripHash: boolean) {
  if (typeof window === "undefined") return;

  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  if (stripHash && window.location.hash) {
    window.history.replaceState(null, "", `/${window.location.search}`);
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function HomeScrollReset() {
  const pathname = usePathname();
  const isDocumentLoad = useRef(true);

  useLayoutEffect(() => {
    const firstLoad = isDocumentLoad.current;
    isDocumentLoad.current = false;

    if (!isHomePath(pathname)) {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
      return;
    }

    if (firstLoad) {
      resetHomeToTop(true);
      return;
    }

    if (!window.location.hash) {
      resetHomeToTop(false);
    }
  }, [pathname]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!isHomePath(window.location.pathname)) return;
      if (event.persisted) resetHomeToTop(true);
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
