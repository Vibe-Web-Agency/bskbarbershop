"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function LocksRetwist() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

      <AnimatedSection animation="slide-right">
        <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/assets/photos/IMG_0734.jpeg"
            alt="Locks Retwist BSK"
            fill
            className="object-cover"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection animation="slide-left" delay={200}>
        <div>
          <h2 className="text-3xl font-bold mb-4">Locks – Retwist</h2>

          <p className="text-[#D0D0D0] leading-relaxed mb-4">
            Le retwist permet de redonner forme et structure à vos locks en travaillant
            la racine. Cette technique offre un rendu propre, net et durable tout en
            respectant votre texture naturelle.
          </p>

          <p className="text-[#D0D0D0] leading-relaxed mb-4">
            Réalisé avec précision chez BSK Barbershop, le retwist évite la tension
            excessive sur le cuir chevelu et garantit une finition élégante.
          </p>

          <p className="text-[#C6A667] italic">
            Un devis précis est communiqué après analyse de votre cuir chevelu (photo nécessaire).
          </p>
        </div>
      </AnimatedSection>

    </section>
  );
}
