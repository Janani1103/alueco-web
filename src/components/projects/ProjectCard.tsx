import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "large";
}

export function ProjectCard({ project, variant = "default" }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-[14px] border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]"
    >
      <div className={`relative overflow-hidden ${variant === "large" ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <Image
          src={project.image}
          alt={`${project.title} - ${project.location}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-[9px] bg-surface px-5 py-2.5 text-sm font-semibold text-heading">
            View Project →
          </span>
        </div>
        <div className="absolute bottom-0 left-0 p-5">
          <span className="mb-1 inline-block rounded-full bg-brand/90 px-2.5 py-0.5 text-xs font-medium text-white capitalize">
            {project.filterCategory}
          </span>
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="text-sm text-white/80">{project.location}</p>
        </div>
      </div>
      {variant === "large" && (
        <p className="p-5 text-sm text-muted">{project.shortDescription}</p>
      )}
    </Link>
  );
}
