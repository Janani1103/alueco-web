"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { beforeAfter } from "@/data/content";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BeforeAfterSection() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(98, Math.max(2, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-main">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <SectionHeading>{beforeAfter.heading}</SectionHeading>
          <p className="mt-4 text-base text-muted">{beforeAfter.subheading}</p>
        </AnimatedSection>

        <AnimatedSection delay={150} className="mt-10">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] cursor-ew-resize select-none overflow-hidden rounded-[20px] border border-border shadow-[var(--shadow-subtle)]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
          >
            {/* After (full) */}
            <Image
              src={beforeAfter.after.image}
              alt={beforeAfter.after.label}
              fill
              className="object-cover"
              sizes="100vw"
              draggable={false}
            />
            <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {beforeAfter.after.label}
            </span>

            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <Image
                src={beforeAfter.before.image}
                alt={beforeAfter.before.label}
                fill
                className="object-cover"
                sizes="100vw"
                draggable={false}
              />
              <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {beforeAfter.before.label}
              </span>
            </div>

            {/* Handle */}
            <div
              className="absolute bottom-0 top-0 z-10 w-1 bg-white shadow-lg"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand shadow-[var(--shadow-hover)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M5 4l-3 4 3 4M11 4l3 4-3 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted">
            Drag the slider to compare before and after installation
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
