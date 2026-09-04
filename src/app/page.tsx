import { Hero } from "@/components/home/Hero";
import { ProductCategories } from "@/components/home/ProductCategories";
import { StatsSection } from "@/components/home/StatsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HowWeWork } from "@/components/home/HowWeWork";
import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { Testimonial } from "@/components/home/Testimonial";
import { ShowroomSection } from "@/components/home/ShowroomSection";
import { QuoteSection } from "@/components/home/QuoteSection";
import { CTABanner } from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <StatsSection />
      <WhyChooseUs />
      <FeaturedProjects />
      <HowWeWork />
      <BeforeAfterSection />
      <Testimonial />
      <ShowroomSection />
      <QuoteSection />
      <CTABanner />
    </>
  );
}
