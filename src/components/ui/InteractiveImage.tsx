"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface InteractiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspect?: string;
  delay?: number;
  sizes?: string;
}

export function InteractiveImage({
  src,
  alt,
  width = 600,
  height = 400,
  aspect = "aspect-[3/2]",
  delay = 0,
  sizes = "50vw",
}: InteractiveImageProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group overflow-hidden rounded-[16px] border border-border shadow-[var(--shadow-subtle)]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${aspect} w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
          sizes={sizes}
        />
      </div>
    </AnimatedSection>
  );
}
