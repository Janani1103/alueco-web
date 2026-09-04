"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { projects as defaultProjects } from "@/data/projects";
import { useSiteData } from "@/context/SiteDataContext";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedProjects() {
  const { projects: contextProjects } = useSiteData();
  const projects = contextProjects && contextProjects.length > 0 ? contextProjects : defaultProjects;
  const scrollRef = useRef<HTMLDivElement>(null);
  const featured = projects[0] || defaultProjects[0];
  const others = projects.slice(1);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = dir === "next" ? 320 : -320;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-main">
        <AnimatedSection className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel>FEATURED PROJECTS</SectionLabel>
            <SectionHeading className="mt-3">Crafted for Every Space</SectionHeading>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scroll("prev")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text transition-all hover:border-brand hover:text-brand"
                aria-label="Previous projects"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scroll("next")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text transition-all hover:border-brand hover:text-brand"
                aria-label="Next projects"
              >
                →
              </button>
            </div>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors hover:text-[#6aaa00]"
            >
              View All Projects
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
            </Link>
          </div>
        </AnimatedSection>

        {/* Editorial grid - desktop */}
        <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-12 lg:grid-rows-2">
          <AnimatedSection className="lg:col-span-7 lg:row-span-2">
            <Link
              href={`/projects/${featured.slug}`}
              className="group relative block h-full min-h-[480px] overflow-hidden rounded-[16px] border border-border"
            >
              <Image
                src={featured.image}
                alt={`${featured.title} - ${featured.location}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="58vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
              <div className="absolute inset-0 flex items-end justify-between p-8">
                <div>
                  <span className="rounded-full bg-brand/90 px-3 py-1 text-xs font-medium text-white capitalize">
                    {featured.filterCategory}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-white">{featured.title}</h3>
                  <p className="text-white/80">{featured.location}</p>
                </div>
                <span className="translate-y-2 rounded-[9px] bg-white px-4 py-2 text-sm font-semibold text-heading opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                  View Project →
                </span>
              </div>
            </Link>
          </AnimatedSection>

          {others.slice(0, 2).map((project, i) => (
            <AnimatedSection key={project.slug} delay={(i + 1) * 100} className="lg:col-span-5">
              <Link
                href={`/projects/${project.slug}`}
                className="group relative block h-full min-h-[230px] overflow-hidden rounded-[16px] border border-border"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.location}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.location}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/20">
                  <span className="translate-y-2 rounded-[9px] bg-white px-4 py-2 text-sm font-semibold text-heading opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                    View Project →
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Horizontal scroll - mobile/tablet */}
        <div
          ref={scrollRef}
          className="mt-10 flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:hidden"
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group min-w-[280px] snap-start overflow-hidden rounded-[14px] border border-border bg-surface sm:min-w-[320px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.location}`}
                  fill
                  className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-white/80">{project.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
