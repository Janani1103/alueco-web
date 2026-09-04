"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  priority?: boolean;
}

export function ImageGallery({ images, priority = false }: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!images.length) return null;

  return (
    <AnimatedSection>
      <div className="space-y-4">
        <div className="group relative overflow-hidden rounded-[16px] border border-border">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]"
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                className={`overflow-hidden rounded-[12px] border-2 transition-all duration-300 ${
                  i === active
                    ? "border-brand shadow-[var(--shadow-subtle)]"
                    : "border-border opacity-70 hover:border-brand/50 hover:opacity-100"
                }`}
                aria-label={`View image ${i + 1}`}
                aria-pressed={i === active}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={160}
                  height={120}
                  className="aspect-[4/3] w-full object-cover"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
