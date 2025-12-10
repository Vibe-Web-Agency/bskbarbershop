"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function SoinComplet({
  price,
  steps,
}: {
  price: string;
  steps: string[];
}) {
  return (
    <AnimatedSection animation="slide-up" delay={100}>
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-[#C6A667] mb-4">
          Soin visage complet — {price}
        </h2>

        <p className="mb-4 text-[#D0D0D0]">
          Un soin en plusieurs étapes pour nettoyer, purifier et revitaliser la peau.
        </p>

        <ul className="list-disc list-inside space-y-2 text-sm text-[#D0D0D0] ml-4">
          {steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}
