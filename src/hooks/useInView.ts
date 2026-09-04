"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -8% 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, reducedMotion]);

  return { ref, inView };
}
