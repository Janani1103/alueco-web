"use client";

import { useEffect, useState } from "react";
import { processSteps } from "@/data/content";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionHeading";

export function HowWeWork() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });
  const reducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setActiveStep(processSteps.length - 1);
      return;
    }
    const timers = processSteps.map((_, i) =>
      window.setTimeout(() => setActiveStep(i), 400 + i * 350)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reducedMotion]);

  const progress =
    activeStep < 0 ? 0 : ((activeStep + 1) / processSteps.length) * 100;

  return (
    <section className="bg-section py-16 md:py-24" id="process" ref={ref}>
      <div className="container-main">
        <div
          className={`text-center transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <SectionLabel>HOW WE WORK</SectionLabel>
          <SectionHeading className="mt-3">Our Process</SectionHeading>
        </div>

        <div className="relative mt-14">
          {/* Progress line - desktop */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 overflow-hidden rounded-full bg-border lg:block">
            <div
              className="h-full bg-brand transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-5 lg:gap-4">
            {processSteps.map((step, i) => {
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col items-center text-center transition-all duration-500 ${
                    inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {i < processSteps.length - 1 && (
                    <div
                      className={`absolute left-1/2 top-16 h-full w-0.5 -translate-x-1/2 lg:hidden ${
                        isActive ? "bg-brand" : "bg-border"
                      }`}
                      aria-hidden="true"
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-surface transition-all duration-500 ${
                      isActive
                        ? "scale-100 border-brand shadow-[0_0_0_4px_rgba(124,191,0,0.15)]"
                        : "scale-95 border-border"
                    } ${isCurrent ? "scale-110" : ""}`}
                  >
                    <span
                      className={`text-sm font-bold transition-colors duration-300 ${
                        isActive ? "text-brand" : "text-muted"
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3
                    className={`mt-4 text-base font-semibold transition-colors duration-300 ${
                      isActive ? "text-heading" : "text-muted"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-[180px] text-sm text-muted">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
