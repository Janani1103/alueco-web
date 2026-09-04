"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryGridProps {
  images: { src: string; alt: string }[];
}

/** Masonry-style gallery with click-to-enlarge main view */
export function GalleryGrid({ images }: GalleryGridProps) {
  const [active, setActive] = useState<number | null>(null);
  const preview = active !== null ? images[active] : null;

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  if (!images.length) return null;

  return (
    <>
      {preview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setActive(null)}
            aria-label="Close preview"
          >
            ✕
          </button>
          <Image
            src={preview.src}
            alt={preview.alt}
            width={1200}
            height={900}
            className="max-h-[85vh] max-w-full rounded-[12px] object-contain"
            sizes="90vw"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className="group overflow-hidden rounded-[14px] border border-border text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[var(--shadow-hover)]"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={300}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="33vw"
            />
          </button>
        ))}
      </div>
    </>
  );
}
