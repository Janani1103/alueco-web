import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteDataProvider } from "@/context/SiteDataContext";
import { siteConfig } from "@/data/site.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ALUECO | Premium Aluminium Doors & Windows in Sri Lanka",
    template: "%s | ALUECO",
  },
  description: siteConfig.description,
  keywords: [
    "Aluminium doors Sri Lanka",
    "Aluminium windows Sri Lanka",
    "Aluminium fabrication Sri Lanka",
    "Sliding doors Sri Lanka",
    "Aluminium windows Colombo",
    "Aluminium doors Colombo",
    "Aluminium fabrication company",
    "Premium aluminium solutions",
  ],
  openGraph: {
    title: "ALUECO | Premium Aluminium Doors & Windows in Sri Lanka",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "ALUECO",
    locale: "en_LK",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-surface font-sans text-text antialiased">
        <ThemeProvider>
          <SiteDataProvider>
            <SiteShell>{children}</SiteShell>
          </SiteDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
