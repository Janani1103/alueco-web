export interface Testimonial {
  id: string;
  quote: string;
  customer: string;
  location: string;
  rating: number;
  projectType?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "namli-family",
    quote:
      "ALUECO provided an excellent service from measurement to installation. The quality and finishing are outstanding. Highly recommended.",
    customer: "Namli Family",
    location: "Kotte, Sri Lanka",
    rating: 5,
    projectType: "Residential",
  },
  {
    id: "colombo-residence",
    quote:
      "The sliding doors transformed our living room completely. Professional team, on-time delivery, and flawless installation.",
    customer: "Perera Residence",
    location: "Colombo, Sri Lanka",
    rating: 5,
    projectType: "Villa",
  },
  {
    id: "commercial-client",
    quote:
      "We chose ALUECO for our office facade project. The precision and finish exceeded our expectations. A trusted partner.",
    customer: "Tech Park Battaramulla",
    location: "Battaramulla, Sri Lanka",
    rating: 5,
    projectType: "Commercial",
  },
];

export const heroTrustIndicators = [
  { label: "Professional Measurement", icon: "ruler" },
  { label: "Precision Fabrication", icon: "gear" },
  { label: "Expert Installation", icon: "install" },
  { label: "After-sales Support", icon: "warranty" },
] as const;

export const heroQuickChecks = [
  "Professional Measurement",
  "Expert Fabrication",
  "Quality Installation",
] as const;

export const beforeAfter = {
  heading: "From Opening to Finished Space",
  subheading:
    "See how precision aluminium fabrication transforms architectural openings into elegant, functional spaces.",
  before: {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
    label: "Before Installation",
  },
  after: {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    label: "Completed Installation",
  },
} as const;

export const whyChooseFeatures = [
  {
    title: "Durable Aluminium",
    description: "High grade aluminium for long lasting performance.",
    icon: "shield",
  },
  {
    title: "Professional Measurement",
    description: "Accurate on-site measurements for a perfect fit.",
    icon: "ruler",
  },
  {
    title: "Expert Fabrication",
    description: "Precision fabrication using advanced machinery.",
    icon: "gear",
  },
  {
    title: "Quality Installation",
    description: "Trained installers ensure flawless installation.",
    icon: "install",
  },
  {
    title: "Premium Finishing",
    description: "Superior finishes for a modern, elegant look.",
    icon: "finish",
  },
  {
    title: "Warranty Support",
    description: "Reliable after-sales support with strong warranty.",
    icon: "warranty",
  },
] as const;

export const processSteps = [
  { number: "01", title: "Site Visit", description: "Visit your location" },
  { number: "02", title: "Measurement", description: "Accurate on-site measurements" },
  { number: "03", title: "Quotation", description: "Transparent best pricing" },
  { number: "04", title: "Fabrication", description: "Precision manufacturing" },
  { number: "05", title: "Installation", description: "Expert installation & handover" },
] as const;
