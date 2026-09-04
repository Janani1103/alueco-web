import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ALUECO — Sri Lanka's premium aluminium fabrication company for doors, windows and architectural solutions.",
};

export default function AboutPage() {
  return <AboutContent />;
}
