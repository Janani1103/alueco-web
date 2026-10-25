import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with ALUECO for premium aluminium doors, windows and fabrication in Sri Lanka.",
};

export default function ContactPage() {
  return <ContactContent />;
}
