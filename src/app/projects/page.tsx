import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore ALUECO's portfolio of premium aluminium fabrication projects across Sri Lanka.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-section py-16 md:py-24">
        <div className="container-main text-center">
          <SectionLabel>PORTFOLIO</SectionLabel>
          <SectionHeading className="mt-3">
            Projects That Speak for Themselves
          </SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">
            From luxury villas to commercial buildings, explore our completed aluminium projects across Sri Lanka.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-main">
          <ProjectGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
