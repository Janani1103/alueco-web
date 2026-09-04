import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CTABanner() {
  return (
    <section className="border-t border-border bg-heading py-14 md:py-16">
      <div className="container-main">
        <AnimatedSection className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to Transform Your Space?
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/70 md:text-base">
            From consultation to installation, ALUECO delivers premium aluminium solutions tailored to your project.
          </p>
          <div className="mt-8">
            <Button href="/contact#quote" size="lg" className="bg-brand hover:bg-[#6aaa00]">
              Start Your Project
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
