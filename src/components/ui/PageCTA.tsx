import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface PageCTAProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttonExternal?: boolean;
}

export function PageCTA({
  title = "Ready to Transform Your Space?",
  description = "From consultation to installation, ALUECO delivers premium aluminium solutions tailored to your project.",
  buttonLabel = "Start Your Project",
  buttonHref = "/contact#quote",
  buttonExternal = false,
}: PageCTAProps) {
  return (
    <section className="border-t border-border bg-heading py-14 md:py-16">
      <div className="container-main">
        <AnimatedSection className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-lg text-sm text-white/70 md:text-base">{description}</p>
          <div className="mt-8">
            <Button
              href={buttonHref}
              size="lg"
              external={buttonExternal}
              className="bg-brand hover:bg-[#6aaa00]"
            >
              {buttonLabel}
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
