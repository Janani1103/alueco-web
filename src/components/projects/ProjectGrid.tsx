"use client";

import { useState } from "react";
import { projectFilters } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/data/projects";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.filterCategory === active);

  return (
    <>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Project categories"
      >
        {projectFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={active === filter.id}
            onClick={() => setActive(filter.id)}
            className={`rounded-[9px] border px-4 py-2 text-sm font-medium transition-all ${
              active === filter.id
                ? "border-brand bg-brand text-white"
                : "border-border bg-surface text-text hover:border-brand hover:text-brand"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} variant="large" />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">No projects found in this category.</p>
      )}
    </>
  );
}
