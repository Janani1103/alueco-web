"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
      style={{
        transitionDuration: reducedMotion ? "0ms" : "650ms",
        transitionDelay: reducedMotion ? "0ms" : `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
