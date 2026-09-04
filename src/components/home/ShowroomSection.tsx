"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteData } from "@/context/SiteDataContext";

export function ShowroomSection() {
  const { siteConfig } = useSiteData();
  const { showroom } = siteConfig;
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      const section = document.getElementById("showroom-section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      setOffset(progress * 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <section className="bg-section py-16 md:py-24" id="showroom-section">
      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-[24px] shadow-[var(--shadow-premium)]">
              <div
                style={{
                  transform: reducedMotion ? undefined : `translateY(${offset}px)`,
                  transition: "transform 0.1s linear",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85"
                  alt="ALUECO showroom interior with aluminium product displays"
                  width={600}
                  height={480}
                  className="aspect-[5/4] w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating card overlay */}
              <div className="animate-float absolute bottom-5 left-5 right-5 rounded-[14px] border border-white/20 bg-white/95 p-5 shadow-[var(--shadow-hover)] backdrop-blur-sm md:left-auto md:right-6 md:max-w-[280px]">
                <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                  ALUECO Experience Center
                </p>
                <p className="mt-1 text-base font-semibold text-heading">{showroom.location}</p>
                <p className="mt-2 text-sm text-muted">
                  {showroom.hours}
                  <br />
                  {showroom.time}
                </p>
                <div className="mt-4">
                  <Button href="/showroom" size="sm">
                    Visit Showroom
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
              Visit Our Showroom
            </p>
            <h2 className="mt-3 text-3xl font-bold text-heading md:text-4xl">
              Experience Quality
              <br />
              First Hand
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Explore our product range, compare finishes and consult with our team at the ALUECO Experience Center.
            </p>

            <div className="mt-8 overflow-hidden rounded-[14px] border border-border">
              <iframe
                title="ALUECO showroom location map"
                src="https://maps.google.com/maps?q=Wellaweriya+Sri+Lanka&output=embed"
                className="h-52 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
