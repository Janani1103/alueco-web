import fs from "fs/promises";
import path from "path";
import { siteConfig as defaultSiteConfig } from "@/data/site.config";
import { products as defaultProducts, Product } from "@/data/products";
import { projects as defaultProjects, Project } from "@/data/projects";
import { LeadItem } from "@/lib/types";

const STORAGE_DIR = path.join(process.cwd(), "src", "data", "storage");

const SITE_CONFIG_FILE = path.join(STORAGE_DIR, "siteConfig.json");
const PRODUCTS_FILE = path.join(STORAGE_DIR, "products.json");
const PROJECTS_FILE = path.join(STORAGE_DIR, "projects.json");
const LEADS_FILE = path.join(STORAGE_DIR, "leads.json");

async function ensureDirectory() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch {
    // already exists
  }
}

// 1. SITE CONFIG
export async function getStoredSiteConfig(): Promise<typeof defaultSiteConfig> {
  try {
    const raw = await fs.readFile(SITE_CONFIG_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return defaultSiteConfig;
  }
}

export async function saveStoredSiteConfig(data: any): Promise<boolean> {
  try {
    await ensureDirectory();
    await fs.writeFile(SITE_CONFIG_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving site config to disk:", err);
    return false;
  }
}

// 2. PRODUCTS
export async function getStoredProducts(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(PRODUCTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return defaultProducts;
  }
}

export async function saveStoredProducts(data: Product[]): Promise<boolean> {
  try {
    await ensureDirectory();
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving products to disk:", err);
    return false;
  }
}

// 3. PROJECTS
export async function getStoredProjects(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(PROJECTS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return defaultProjects;
  }
}

export async function saveStoredProjects(data: Project[]): Promise<boolean> {
  try {
    await ensureDirectory();
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving projects to disk:", err);
    return false;
  }
}

// 4. LEADS
const initialLeads: LeadItem[] = [
  {
    id: "ALU-LEAD-301",
    type: "quotation",
    customerName: "Dr. Rohana Jayasuriya",
    customerPhone: "077 234 8899",
    customerEmail: "rohana.j@gmail.com",
    location: "Battaramulla, Colombo",
    productName: "Sliding Doors",
    vehicleName: "Sliding Doors",
    systemNeeded: "Thermal Sliding Doors (3 Sets, 8ft x 10ft)",
    estimatedPrice: 3800000,
    estimatedBudget: "LKR 3,800,000",
    notes: "Architect requested custom charcoal matte finish. Site inspection required before fabrication.",
    status: "New",
    createdAt: "Today, 08:30 AM",
  },
  {
    id: "ALU-LEAD-300",
    type: "quotation",
    customerName: "Apex Residencies (Procurement)",
    customerPhone: "071 456 1234",
    customerEmail: "procurement@apexres.lk",
    location: "Kollupitiya, Colombo 03",
    productName: "Casement Windows",
    vehicleName: "Casement Windows",
    systemNeeded: "Acoustic Double Glazed Casement Windows (12 Units)",
    estimatedPrice: 6500000,
    estimatedBudget: "LKR 6,500,000",
    notes: "Requested structural wind-load calculation certification and acoustic Low-E glass samples.",
    status: "Contacted",
    createdAt: "Yesterday, 04:15 PM",
  },
  {
    id: "ALU-LEAD-299",
    type: "contact",
    customerName: "Arch. Shanika Fernando",
    customerPhone: "076 998 7766",
    customerEmail: "shanika.studio@gmail.com",
    location: "Thalawathugoda",
    productName: "Folding Doors",
    vehicleName: "Folding Doors",
    systemNeeded: "Bi-Fold Patio Doors + Slimline Casement Windows",
    estimatedPrice: 4200000,
    estimatedBudget: "LKR 4,200,000",
    notes: "Architectural drawings received. BOQ quotation sent for client signoff.",
    status: "Quoted",
    createdAt: "2 days ago",
  },
];

export async function getStoredLeads(): Promise<LeadItem[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return initialLeads;
  }
}

export async function saveStoredLeads(data: LeadItem[]): Promise<boolean> {
  try {
    await ensureDirectory();
    await fs.writeFile(LEADS_FILE, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving leads to disk:", err);
    return false;
  }
}
