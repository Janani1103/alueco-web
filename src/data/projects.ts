export type ProjectCategory =
  | "all"
  | "residential"
  | "commercial"
  | "apartments"
  | "villas"
  | "renovations";

export interface Project {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  filterCategory: string;
  year: string;
  projectType: string;
  productsUsed: string[];
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
}

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "apartments", label: "Apartments" },
  { id: "villas", label: "Villas" },
  { id: "renovations", label: "Renovations" },
] as const;

export const projects: Project[] = [
  {
    slug: "modern-residence-colombo",
    title: "Modern Residence",
    location: "Colombo",
    category: "residential",
    filterCategory: "residential",
    year: "2025",
    projectType: "Residential",
    productsUsed: ["Sliding Doors", "Casement Windows", "Lift & Sliding"],
    shortDescription: "A contemporary home featuring floor-to-ceiling aluminium glazing.",
    description:
      "This modern Colombo residence showcases premium sliding doors and casement windows throughout, creating seamless connections between living spaces and the garden while maintaining excellent thermal performance.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
  },
  {
    slug: "luxury-villa-kandy",
    title: "Luxury Villa",
    location: "Kandy",
    category: "villas",
    filterCategory: "villas",
    year: "2024",
    projectType: "Villa",
    productsUsed: ["Folding Doors", "Casement Windows", "Fanlights"],
    shortDescription: "Hill-country villa with panoramic bi-fold door openings.",
    description:
      "Set against Kandy's lush landscape, this luxury villa features expansive folding doors that open entire walls to terraced gardens and mountain views.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    ],
  },
  {
    slug: "apartment-project-nugegoda",
    title: "Apartment Project",
    location: "Nugegoda",
    category: "apartments",
    filterCategory: "apartments",
    year: "2025",
    projectType: "Apartment",
    productsUsed: ["Tilt & Turn", "Sliding Doors", "Louver Windows"],
    shortDescription: "Multi-unit apartment development with uniform aluminium systems.",
    description:
      "A comprehensive aluminium package for this Nugegoda apartment complex, delivering consistent quality across all units with tilt-turn windows and sliding balcony doors.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
    ],
  },
  {
    slug: "commercial-building-battaramulla",
    title: "Commercial Building",
    location: "Battaramulla",
    category: "commercial",
    filterCategory: "commercial",
    year: "2024",
    projectType: "Commercial",
    productsUsed: ["Curtain Wall", "Sliding Doors", "Casement Windows"],
    shortDescription: "Corporate office facade with premium aluminium glazing.",
    description:
      "This Battaramulla commercial building features a striking aluminium facade with large glazed panels, delivering natural light and a professional corporate aesthetic.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    ],
  },
  {
    slug: "beach-house-galle",
    title: "Beach House",
    location: "Galle",
    category: "villas",
    filterCategory: "villas",
    year: "2025",
    projectType: "Villa",
    productsUsed: ["Folding Doors", "Sliding Doors", "Louver Windows"],
    shortDescription: "Coastal retreat with weather-resistant aluminium systems.",
    description:
      "Designed for Galle's coastal environment, this beach house uses corrosion-resistant aluminium profiles with folding doors that frame ocean views.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  return projects.filter((p) => p.slug !== slug).slice(0, limit);
}
