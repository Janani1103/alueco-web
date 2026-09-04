"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AnimatedCounter({
  value,
  duration = 1800,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    const numeric = parseInt(value.replace(/\D/g, ""), 10);
    const suffix = value.replace(/[\d]/g, "");
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(numeric * eased)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
