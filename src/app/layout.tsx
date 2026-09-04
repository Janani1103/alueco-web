import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { PageTransition } from "@/components/layout/PageTransition";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
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

const themeInitScript = `
(function(){try{var t=localStorage.getItem('alueco-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-surface font-sans text-text antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
