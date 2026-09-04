"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroQuickChecks, heroTrustIndicators } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { LineIcon } from "@/components/ui/LineIcon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSiteData } from "@/context/SiteDataContext";

export function Hero() {
  const { siteConfig } = useSiteData();
  const { hero } = siteConfig;
  const slides = hero.images?.length ? hero.images : [{ src: hero.image, alt: hero.imageAlt }];
  const slideInterval = hero.slideIntervalMs ?? 7000;

  const reducedMotion = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [visibleTrust, setVisibleTrust] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  const nextSlide = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    setLoaded(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loaded || reducedMotion || slides.length <= 1 || paused) return;
    const timer = window.setInterval(nextSlide, slideInterval);
    return () => clearInterval(timer);
  }, [loaded, reducedMotion, slides.length, paused, slideInterval, nextSlide, activeIndex]);

  useEffect(() => {
    if (!loaded || reducedMotion) {
      setVisibleTrust(heroTrustIndicators.length);
      return;
    }
    const timers = heroTrustIndicators.map((_, i) =>
      window.setTimeout(() => setVisibleTrust(i + 1), 900 + i * 150)
    );
    return () => timers.forEach(clearTimeout);
  }, [loaded, reducedMotion]);

  const parallaxY = reducedMotion ? 0 : scrollY * 0.35;
  const imageScale = reducedMotion ? 1 : 1 + Math.min(scrollY * 0.0002, 0.06);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative -mt-20 min-h-[100svh] w-full overflow-hidden pt-20 md:min-h-[100svh]"
      aria-label="Hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Full-bleed rotating background images */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 ${loaded ? "animate-hero-image" : "opacity-0"}`}
          style={{
            transform: reducedMotion
              ? undefined
              : `translateY(${parallaxY}px) scale(${imageScale})`,
            transition: reducedMotion ? undefined : "transform 0.08s linear",
          }}
        >
          {slides.map((slide, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={slide.src}
                className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
                  isActive ? "opacity-100 z-[1]" : "opacity-0 z-0"
                }`}
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.src}
                  alt={isActive ? slide.alt : ""}
                  fill
                  priority={i <= 1}
                  className={`object-cover object-center transition-transform duration-[9000ms] ease-out ${
                    isActive && !reducedMotion ? "scale-105" : "scale-100"
                  }`}
                  sizes="100vw"
                  quality={90}
                />
              </div>
            );
          })}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/75 via-black/45 to-black/15" aria-hidden="true" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-transparent to-black/20" aria-hidden="true" />
        <div
          className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_70%_50%,transparent_0%,rgba(0,0,0,0.25)_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div
          className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-24"
          role="tablist"
          aria-label="Hero image slides"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => goToSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-8 bg-brand" : "w-4 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="container-main relative z-10 flex min-h-[calc(100svh-5rem)] flex-col justify-center pb-28 pt-8 md:pb-32">
        <div
          className={`max-w-2xl ${loaded ? "animate-hero-content" : "opacity-0"}`}
          style={{ animationDelay: "0.15s" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
            {hero.title}
            <br />
            {hero.titleLine2}
            <br />
            <span className="text-brand">for {hero.titleHighlight}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.ctas.primary.href} size="lg">
              Request a Free Quote
            </Button>
            <Link
              href={hero.ctas.secondary.href}
              className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-white/40 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20"
            >
              Explore Our Products
            </Link>
          </div>

          <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {heroQuickChecks.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/90 text-[10px] text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {heroTrustIndicators.map((item, i) => (
              <li
                key={item.label}
                className={`flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-md transition-all duration-500 ${
                  i < visibleTrust ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <LineIcon name={item.icon} className="shrink-0 scale-75 text-brand-secondary" />
                <span className="text-xs font-medium leading-tight text-white/90">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={hero.floatingCard.href}
          className={`animate-float absolute bottom-28 right-4 z-20 hidden max-w-[240px] rounded-[14px] border border-white/20 bg-surface/95 p-5 shadow-[var(--shadow-premium)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 md:block lg:right-8 xl:bottom-32 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
            {hero.floatingCard.title}
          </span>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">{hero.floatingCard.tags}</p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand">
            Explore Product
            <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>

      <button
        type="button"
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-brand-secondary"
        aria-label="Scroll to products section"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll to Explore</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-scroll-hint" aria-hidden="true">
          <path d="M10 4v10M6 11l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
