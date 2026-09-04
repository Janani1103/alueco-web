export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Sliding Doors", href: "/products/sliding-doors" },
      { label: "Casement Windows", href: "/products/casement-windows" },
      { label: "Folding Doors", href: "/products/folding-doors" },
      { label: "Swing Doors", href: "/products/swing-doors" },
      { label: "Lift & Sliding", href: "/products/lift-sliding" },
      { label: "Tilt & Turn", href: "/products/tilt-turn" },
      { label: "Louver Windows", href: "/products/louver-windows" },
      { label: "Fanlights", href: "/products/fanlights" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Showroom", href: "/showroom" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  quick: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "About Us", href: "/about" },
    { label: "Showroom", href: "/showroom" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Measurement", href: "/about#process" },
    { label: "Fabrication", href: "/about#process" },
    { label: "Installation", href: "/about#process" },
    { label: "After-sales Support", href: "/contact" },
    { label: "Warranty", href: "/contact" },
  ],
} as const;
