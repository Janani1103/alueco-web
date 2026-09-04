import type { Metadata } from "next";
import { notFound } from "next/navigation";
<<<<<<< Updated upstream
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PageHero } from "@/components/ui/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
=======
import { projects } from "@/data/projects";
import { getStoredProjects } from "@/lib/serverDataStore";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  const related = getRelatedProjects(slug);
  const galleryImages = project.gallery.map((src, i) => ({
    src,
    alt: `${project.title} gallery ${i + 1}`,
  }));

  return (
    <>
      <PageHero
        label={project.filterCategory.toUpperCase()}
        title={`${project.title} – ${project.location}`}
        description={project.shortDescription}
        image={project.image}
        imageAlt={`${project.title} - ${project.location}`}
        size="large"
      />

      <section className="py-12 md:py-16">
        <div className="container-main">
          <AnimatedSection>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.title },
              ]}
            />
          </AnimatedSection>

          <div className="mt-8 grid gap-10 lg:grid-cols-3">
            <AnimatedSection className="lg:col-span-2">
              <p className="text-base leading-relaxed text-muted">{project.description}</p>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <aside className="rounded-[14px] border border-border bg-section p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-[var(--shadow-subtle)]">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-brand">
                  Project Information
                </h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-xs text-muted">Location</dt>
                    <dd className="text-sm font-medium text-text">{project.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Project Type</dt>
                    <dd className="text-sm font-medium text-text">{project.projectType}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Year</dt>
                    <dd className="text-sm font-medium text-text">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Products Used</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {project.productsUsed.map((p) => (
                        <span
                          key={p}
                          className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-text transition-colors hover:border-brand"
                        >
                          {p}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </aside>
            </AnimatedSection>
          </div>

          {galleryImages.length > 0 && (
            <AnimatedSection delay={150} className="mt-12">
              <h2 className="text-2xl font-bold text-heading">Gallery</h2>
              <div className="mt-6">
                <GalleryGrid images={galleryImages} />
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <PageCTA
        title="Have a Similar Project?"
        description="Let us help bring your architectural vision to life with premium aluminium solutions."
        buttonLabel="Request a Free Quote"
      />

      <section className="py-12 md:py-16">
        <div className="container-main">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-heading">Related Projects</h2>
          </AnimatedSection>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p, i) => (
              <div
                key={p.slug}
                className="animate-fade-up opacity-0"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
=======
  const related = allProjects.filter((p) => p.slug !== slug).slice(0, 3);

  return <ProjectDetailView initialProject={project} relatedProjects={related} />;
>>>>>>> Stashed changes
}
