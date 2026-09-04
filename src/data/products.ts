export type ProductCategory =
  | "all"
  | "sliding-doors"
  | "windows"
  | "folding"
  | "swing"
  | "lift-sliding"
  | "louver"
  | "fanlights";

export interface Product {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ProductCategory;
  filterCategory: string;
  applications: string[];
  finishes: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  configurations: string[];
  image: string;
  gallery: string[];
}

export const productCategories = [
  { slug: "sliding-doors", name: "Sliding Doors", icon: "sliding" },
  { slug: "casement-windows", name: "Casement Windows", icon: "casement" },
  { slug: "folding-doors", name: "Folding Doors", icon: "folding" },
  { slug: "swing-doors", name: "Swing Doors", icon: "swing" },
  { slug: "lift-sliding", name: "Lift & Sliding", icon: "lift" },
  { slug: "tilt-turn", name: "Tilt & Turn", icon: "tilt" },
  { slug: "louver-windows", name: "Louver Windows", icon: "louver" },
  { slug: "fanlights", name: "Fanlights", icon: "fanlight" },
] as const;

export const productFilters = [
  { id: "all", label: "All" },
  { id: "sliding-doors", label: "Sliding Doors" },
  { id: "windows", label: "Windows" },
  { id: "folding", label: "Folding" },
  { id: "swing", label: "Swing" },
  { id: "lift-sliding", label: "Lift & Sliding" },
  { id: "louver", label: "Louver" },
  { id: "fanlights", label: "Fanlights" },
] as const;

export const products: Product[] = [
  {
    slug: "sliding-doors",
    name: "Premium Sliding Doors",
    shortDescription: "Smooth-gliding aluminium doors for seamless indoor-outdoor living.",
    description:
      "Our premium sliding door systems feature high-grade aluminium profiles with smooth operation, large glass panels and weather-resistant sealing for modern homes and commercial spaces.",
    category: "sliding-doors",
    filterCategory: "sliding-doors",
    applications: ["Living rooms", "Balconies", "Patios", "Commercial storefronts"],
    finishes: ["Powder coated", "Anodized", "Wood grain", "Custom RAL colors"],
    features: [
      "High-grade aluminium profile",
      "Smooth sliding mechanism",
      "Large glass panels",
      "Weather resistant",
      "Custom dimensions",
      "Multiple finish options",
    ],
    specifications: [
      { label: "Profile", value: "Premium aluminium thermal break" },
      { label: "Glass", value: "Single / Double glazed options" },
      { label: "Max Height", value: "Up to 3.0m" },
      { label: "Max Width", value: "Up to 6.0m per panel" },
    ],
    configurations: ["2-track", "3-track", "Corner sliding", "Pocket sliding"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
  },
  {
    slug: "casement-windows",
    name: "Casement Windows",
    shortDescription: "Classic hinged windows with superior ventilation and security.",
    description:
      "Elegant casement windows designed for optimal airflow, thermal performance and lasting durability in Sri Lankan climates.",
    category: "windows",
    filterCategory: "windows",
    applications: ["Bedrooms", "Offices", "Bathrooms", "Kitchens"],
    finishes: ["Powder coated", "Anodized", "Custom RAL colors"],
    features: [
      "Multi-point locking",
      "Superior weather sealing",
      "Energy efficient glazing",
      "Smooth operation",
      "Custom sizes",
    ],
    specifications: [
      { label: "Opening", value: "Inward / Outward" },
      { label: "Glass", value: "Single / Double glazed" },
      { label: "Locking", value: "Multi-point espagnolette" },
    ],
    configurations: ["Single casement", "Double casement", "Top hung", "Side hung"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    ],
  },
  {
    slug: "folding-doors",
    name: "Folding Doors",
    shortDescription: "Bi-fold systems that open entire walls to the outdoors.",
    description:
      "Transform your space with premium bi-fold door systems that create wide openings and connect interiors with gardens, pools and terraces.",
    category: "folding",
    filterCategory: "folding",
    applications: ["Pool areas", "Terraces", "Restaurants", "Event spaces"],
    finishes: ["Powder coated", "Anodized", "Wood grain"],
    features: [
      "Wide opening spans",
      "Smooth folding mechanism",
      "Low threshold options",
      "Weather sealed",
      "Custom panel counts",
    ],
    specifications: [
      { label: "Panels", value: "2 to 7 panels" },
      { label: "Max Width", value: "Up to 7.0m" },
      { label: "Threshold", value: "Standard / Low profile" },
    ],
    configurations: ["Inward fold", "Outward fold", "Corner bi-fold"],
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    ],
  },
  {
    slug: "swing-doors",
    name: "Swing Doors",
    shortDescription: "Elegant hinged aluminium doors for entrances and interiors.",
    description:
      "Premium swing door systems with robust hinges, secure locking and refined finishes for main entrances and interior transitions.",
    category: "swing",
    filterCategory: "swing",
    applications: ["Main entrances", "Office doors", "Internal partitions"],
    finishes: ["Powder coated", "Anodized", "Custom RAL colors"],
    features: [
      "Heavy-duty hinges",
      "Secure locking systems",
      "Thermal break options",
      "Custom dimensions",
    ],
    specifications: [
      { label: "Opening", value: "Single / Double leaf" },
      { label: "Max Height", value: "Up to 2.7m" },
    ],
    configurations: ["Single swing", "Double swing", "Pivot door"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ],
  },
  {
    slug: "lift-sliding",
    name: "Lift & Sliding Doors",
    shortDescription: "Premium lift-slide systems for large-format openings.",
    description:
      "Engineered for oversized openings, our lift and slide systems combine effortless operation with exceptional weather performance.",
    category: "lift-sliding",
    filterCategory: "lift-sliding",
    applications: ["Luxury villas", "Penthouses", "Hotel lobbies"],
    finishes: ["Powder coated", "Anodized", "Custom RAL colors"],
    features: [
      "Lift-slide mechanism",
      "Oversized panels",
      "Superior insulation",
      "Premium hardware",
    ],
    specifications: [
      { label: "Panel Weight", value: "Up to 400kg" },
      { label: "Max Height", value: "Up to 3.5m" },
    ],
    configurations: ["2-panel", "3-panel", "4-panel"],
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
  },
  {
    slug: "tilt-turn",
    name: "Tilt & Turn Windows",
    shortDescription: "Versatile European-style windows with dual opening modes.",
    description:
      "Tilt and turn windows offer secure ventilation and full opening capability — ideal for modern residential and commercial buildings.",
    category: "windows",
    filterCategory: "windows",
    applications: ["Apartments", "Offices", "Hotels", "Residential towers"],
    finishes: ["Powder coated", "Anodized"],
    features: [
      "Dual opening function",
      "Enhanced security",
      "Excellent sealing",
      "Easy cleaning access",
    ],
    specifications: [
      { label: "Opening", value: "Tilt / Turn / Tilt-turn" },
      { label: "Glass", value: "Double glazed standard" },
    ],
    configurations: ["Standard tilt-turn", "Reversible", "Top-guided"],
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
    ],
  },
  {
    slug: "louver-windows",
    name: "Louver Windows",
    shortDescription: "Adjustable ventilation with architectural elegance.",
    description:
      "Aluminium louver windows provide controlled airflow and privacy while maintaining a clean, contemporary aesthetic.",
    category: "louver",
    filterCategory: "louver",
    applications: ["Bathrooms", "Stairwells", "Utility areas", "Commercial facades"],
    finishes: ["Powder coated", "Anodized"],
    features: [
      "Adjustable blades",
      "Privacy control",
      "Weather resistant",
      "Low maintenance",
    ],
    specifications: [
      { label: "Blade", value: "Fixed / Adjustable" },
      { label: "Material", value: "Premium aluminium" },
    ],
    configurations: ["Fixed louver", "Adjustable louver", "Glass louver combo"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
  },
  {
    slug: "fanlights",
    name: "Fanlights",
    shortDescription: "Transom windows that add light and architectural detail.",
    description:
      "Enhance doorways and windows with elegant fanlight transoms that bring natural light and refined character to any space.",
    category: "fanlights",
    filterCategory: "fanlights",
    applications: ["Entrance doors", "Interior doorways", "Feature windows"],
    finishes: ["Powder coated", "Anodized", "Custom shapes"],
    features: [
      "Custom shapes",
      "Decorative glazing options",
      "Matched to door systems",
      "Weather sealed",
    ],
    specifications: [
      { label: "Shape", value: "Rectangular / Arched / Custom" },
      { label: "Glass", value: "Clear / Frosted / Decorative" },
    ],
    configurations: ["Fixed fanlight", "Opening fanlight", "Arched top"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return products.slice(0, limit);
  return products.filter((p) => p.slug !== slug).slice(0, limit);
}
