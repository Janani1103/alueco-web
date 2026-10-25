import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getStoredProjects } from "@/lib/serverDataStore";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const allProjects = await getStoredProjects();
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} – ${project.location}`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const allProjects = await getStoredProjects();
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = allProjects.filter((p) => p.slug !== slug).slice(0, 3);

  return <ProjectDetailView initialProject={project} relatedProjects={related} />;
}
