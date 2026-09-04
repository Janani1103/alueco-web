import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, getProjectBySlug, getRelatedProjects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} – ${project.location}`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug);

  return (
    <>
      <section className="relative">
        <div className="relative h-[40vh] min-h-[320px] max-h-[480px] w-full overflow-hidden md:h-[50vh]">
          <Image
            src={project.image}
            alt={`${project.title} - ${project.location}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full">
            <div className="container-main pb-8 md:pb-12">
              <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {project.title} – {project.location}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-main">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-base leading-relaxed text-muted">{project.description}</p>
            </div>
            <aside className="rounded-[14px] border border-border bg-section p-6">
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
                        className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-text"
                      >
                        {p}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-heading">Gallery</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-[14px] border border-border">
                  <Image
                    src={img}
                    alt={`${project.title} gallery ${i + 1}`}
                    width={400}
                    height={300}
                    className="aspect-[4/3] w-full object-cover"
                    sizes="33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-soft-green py-12 md:py-16">
        <div className="container-main text-center">
          <h2 className="text-2xl font-bold text-heading">Have a Similar Project?</h2>
          <p className="mt-3 text-muted">Let us help bring your vision to life.</p>
          <div className="mt-6">
            <Button href="/contact#quote" size="lg">
              Request a Free Quote
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-heading">Related Projects</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
