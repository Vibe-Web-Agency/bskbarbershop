"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ServicesIntro() {
  const categories = [
    { title: "Coiffure", description: "Dégradés, contours, barbe, colorations… Une expertise maîtrisée pour un style soigné." },
    { title: "Tresses", description: "Vanilles, nattes, motifs. Des tresses définies, propres et durables." },
    { title: "Locks", description: "Retwist, crochet, départ locks et entretien complet. Locks structurées et parfaitement entretenues." },
    { title: "Soins à la carte", description: "Nettoyage facial, gommage, masque, extraction… Des soins personnalisés pour un visage propre et éclatant." },
    { title: "Soin visage complet", description: "Un soin en plusieurs étapes : nettoyage, vapeur, extraction, sérum et masque. Le traitement idéal pour une peau saine." },
  ];

  return (
    <section className="w-full py-24 bg-[#1B1C1E]">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <AnimatedSection animation="fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Nos prestations
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-in" delay={100}>
          <p className="text-[#D0D0D0] text-lg md:text-xl max-w-3xl mx-auto">
            Coiffure, tresses, locks et soins visage.
            Découvrez un savoir-faire complet au service de votre style.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
          {categories.map((cat, index) => (
            <AnimatedSection key={cat.title} animation="slide-up" delay={150 + index * 100}>
              <div className="bg-[#232426] p-6 rounded-lg border border-white/10 h-full hover:border-[#C6A667]/50 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-[#C6A667] mb-3">{cat.title}</h3>
                <p className="text-[#D0D0D0] text-sm leading-relaxed">{cat.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection animation="fade-in" delay={700}>
          <Link
            href="/prestations"
            className="
              mt-16 inline-block
              px-8 py-3
              rounded-md
              bg-[#C6A667] text-black font-semibold
              hover:bg-[#9B8452] transition hover-pulse
            "
          >
            Voir prestations & tarifs
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
}
