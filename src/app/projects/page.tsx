import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore ALUECO's portfolio of premium aluminium fabrication projects across Sri Lanka.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label="PORTFOLIO"
        title="Projects That Speak for Themselves"
        description="From luxury villas to commercial buildings — explore completed aluminium projects across Sri Lanka."
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=3000&q=90&auto=format&fit=crop"
        imageAlt="Architectural project with premium aluminium glazing"
        size="large"
        align="center"
      />

      <section className="py-12 md:py-16">
        <div className="container-main">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <PageCTA
        title="Have a Similar Project in Mind?"
        description="Let's discuss how ALUECO can bring your architectural vision to life."
        buttonLabel="Request a Free Quote"
      />
    </>
  );
}
