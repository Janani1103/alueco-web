export interface AluminiumItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  series?: string;
  glassThickness?: string;
  finishOptions?: string[];
  priceEstimate?: string;
  basePrice?: number;
  badge?: string;
  badgeColor?: string;
  colorTheme?: string;
  image: string;
  gallery?: string[];
  shortDesc?: string;
  description?: string;
  features?: string[];
  specifications?: { label: string; value: string }[];
  applications?: string[];
  isPopular?: boolean;
  status?: "Active" | "Draft" | "Featured";
}

// Aliases for compatibility
export type VehicleItem = AluminiumItem;
export type ProductItem = AluminiumItem;

export interface LeadItem {
  id: string;
  type: "quotation" | "contact";
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  location?: string;
  productId?: string;
  productName?: string;
  vehicleId?: string;
  vehicleName?: string;
  systemNeeded?: string;
  estimatedPrice?: number;
  estimatedBudget?: string;
  notes?: string;
  status: "New" | "Contacted" | "Quoted" | "Won" | "Lost";
  createdAt: string;
}

export interface SiteContentData {
  general: {
    siteName: string;
    tagline: string;
    contactPhone: string;
    contactEmail: string;
    showroomAddress: string;
    whatsappNumber: string;
    announcementBar: {
      enabled: boolean;
      text: string;
      linkText?: string;
      linkUrl?: string;
    };
  };
  home: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      ctaPrimaryText: string;
      ctaSecondaryText: string;
      heroImage: string;
    };
    stats: {
      projectsCompleted: string;
      satisfactionRate: string;
      yearsWarranty: string;
      profilesAvailable: string;
    };
    trustIndicators: string[];
  };
  about: {
    title: string;
    description: string;
    story: string;
    image: string;
  };
  showroom: {
    heading: string;
    description: string;
    visitingHours: string;
    googleMapsEmbedUrl?: string;
  };
}
