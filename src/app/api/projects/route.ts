import { NextResponse } from "next/server";
import { getStoredProjects, saveStoredProjects } from "@/lib/serverDataStore";
import { Project } from "@/data/projects";

export async function GET() {
  const projects = await getStoredProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const data: Partial<Project> = await req.json();
    const currentProjects = await getStoredProjects();

    const newProject: Project = {
      slug: data.slug || `project-${Date.now()}`,
      title: data.title || "Untitled Project",
      location: data.location || "Sri Lanka",
      category: data.category || "residential",
      filterCategory: (data.category as string) || "residential",
      year: data.year || new Date().getFullYear().toString(),
      projectType: data.projectType || "Residential",
      productsUsed: data.productsUsed || ["Sliding Doors"],
      shortDescription: data.shortDescription || "",
      description: data.description || "",
      image: data.image || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      gallery: data.gallery || [],
    };

    const updated = [newProject, ...currentProjects];
    await saveStoredProjects(updated);

    return NextResponse.json({ success: true, project: newProject });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const data: Project = await req.json();
    const currentProjects = await getStoredProjects();

    const updated = currentProjects.map((p) =>
      p.slug === data.slug ? { ...p, ...data } : p
    );
    await saveStoredProjects(updated);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const currentProjects = await getStoredProjects();
      const updated = currentProjects.filter((p) => p.slug !== slug);
      await saveStoredProjects(updated);
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
