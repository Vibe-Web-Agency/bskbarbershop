"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function TressesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

      <AnimatedSection animation="slide-right">
        <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/assets/tresses.jpeg"
            alt="Tresses BSK"
            fill
            className="object-cover"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slide-left" delay={200}>
        <div>
          <h2 className="text-3xl font-bold mb-4">Tresses</h2>

          <p className="text-[#D0D0D0] leading-relaxed mb-4">
            Les tresses permettent d'exprimer votre style tout en protégeant vos cheveux.
            Vanilles, nattes collées, motifs ou barrel twists : chaque modèle est conçu
            pour s'adapter à votre texture et votre personnalité.
          </p>

          <p className="text-[#D0D0D0] leading-relaxed mb-4">
            Réalisées avec précision, nos techniques garantissent une tension maîtrisée
            et un confort optimal pour une tenue longue durée.
          </p>

          <p className="text-[#C6A667] italic">
            Le tarif varie selon la complexité du modèle. Envoyez une photo ou inspiration pour un devis rapide.
          </p>
        </div>
      </AnimatedSection>

    </section>
  );
}
