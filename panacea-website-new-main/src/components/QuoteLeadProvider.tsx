"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import QuoteLeadPopup from "./QuoteLeadPopup";

const STORAGE_KEY = "panacea-quote-lead-seen";
const TRIGGER_SELECTOR = "#partners";

type QuoteLeadContextValue = {
  isOpen: boolean;
  openQuote: (reason?: "scroll" | "manual") => void;
  closeQuote: () => void;
};

const QuoteLeadContext = createContext<QuoteLeadContextValue | null>(null);

export function useQuoteLead() {
  const ctx = useContext(QuoteLeadContext);
  if (!ctx) {
    return {
      isOpen: false,
      openQuote: () => {},
      closeQuote: () => {},
    };
  }
  return ctx;
}

function hasSeenPopup() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

export default function QuoteLeadProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const openedRef = useRef(false);
  const scrolledRef = useRef(false);

  const openQuote = useCallback((reason: "scroll" | "manual" = "manual") => {
    if (openedRef.current && reason === "scroll") return;
    openedRef.current = true;
    markSeen();
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => {
    markSeen();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return undefined;
    if (typeof window === "undefined") return undefined;
    if (hasSeenPopup()) {
      openedRef.current = true;
      return undefined;
    }

    const target = document.querySelector(TRIGGER_SELECTOR);
    if (!target) return undefined;

    let enabled = false;
    const enableTimer = window.setTimeout(() => {
      enabled = true;
    }, 1400);

    const onScroll = () => {
      if (window.scrollY > 160) scrolledRef.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const shouldOpen = (entry: IntersectionObserverEntry) => {
      if (!enabled || !scrolledRef.current || openedRef.current) return false;
      const vh = window.innerHeight || 1;
      const { top, bottom, height } = entry.boundingClientRect;
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      const band = mobile ? 0.52 : 0.42;
      const enteredBand = top <= vh * band && bottom > vh * 0.18;
      const coverage = height > 0 ? Math.min(1, (vh - Math.max(top, 0)) / height) : 0;
      const minCoverage = mobile ? 0.12 : 0.28;
      return entry.isIntersecting && enteredBand && coverage >= minCoverage;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || !shouldOpen(entry)) return;
        observer.disconnect();
        openQuote("scroll");
      },
      {
        root: null,
        threshold: [0, 0.08, 0.12, 0.2, 0.28, 0.35, 0.4, 0.45, 0.55, 0.7],
        rootMargin: window.matchMedia("(max-width: 768px)").matches
          ? "0px 0px -32% 0px"
          : "0px 0px -18% 0px",
      },
    );

    observer.observe(target);

    return () => {
      window.clearTimeout(enableTimer);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname, openQuote]);

  const value = useMemo(
    () => ({ isOpen, openQuote, closeQuote }),
    [isOpen, openQuote, closeQuote],
  );

  return (
    <QuoteLeadContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen ? <QuoteLeadPopup key="quote-lead" open={isOpen} onClose={closeQuote} /> : null}
      </AnimatePresence>
    </QuoteLeadContext.Provider>
  );
}
