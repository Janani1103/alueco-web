import type { Metadata } from "next";
import { ShowroomContent } from "@/components/showroom/ShowroomContent";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Visit the ALUECO Experience Center in Wellaweriya, Sri Lanka. Explore our premium aluminium products and finishes.",
};

export default function ShowroomPage() {
  return <ShowroomContent />;
}
