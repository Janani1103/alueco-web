import { NextResponse } from "next/server";
import { getStoredProducts, saveStoredProducts } from "@/lib/serverDataStore";
import { Product } from "@/data/products";

export async function GET() {
  const products = await getStoredProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const data: Partial<Product> = await req.json();
    const currentProducts = await getStoredProducts();

    const newProduct: Product = {
      slug: data.slug || `product-${Date.now()}`,
      name: data.name || "Untitled Aluminium Product",
      shortDescription: data.shortDescription || "",
      description: data.description || "",
      category: data.category || "sliding-doors",
      filterCategory: (data.category as string) || "sliding-doors",
      applications: data.applications || ["Residential", "Commercial"],
      finishes: data.finishes || ["Powder coated", "Anodized"],
      features: data.features || ["Weather resistant", "Smooth operation"],
      specifications: data.specifications || [{ label: "Profile", value: "Premium thermal aluminium" }],
      configurations: data.configurations || ["Standard configuration"],
      image: data.image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      gallery: data.gallery || [],
    };

    const updated = [newProduct, ...currentProducts];
    await saveStoredProducts(updated);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const data: Product = await req.json();
    const currentProducts = await getStoredProducts();

    const updated = currentProducts.map((p) =>
      p.slug === data.slug ? { ...p, ...data } : p
    );
    await saveStoredProducts(updated);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || searchParams.get("id");

    if (slug) {
      const currentProducts = await getStoredProducts();
      const updated = currentProducts.filter((p) => p.slug !== slug);
      await saveStoredProducts(updated);
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
