"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import BtnRDVLocksTresses from "@/components/site/locksTresses/BtnRDVLocksTresses";

export default function LocksHero() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <video
        src="/assets/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0 w-full h-full object-cover
          blur-1xl opacity-40
        "
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatedSection animation="slide-up">
          <h1 className="text-4xl md:text-5xl font-bold">Locks & Tresses</h1>
        </AnimatedSection>
        <AnimatedSection animation="fade-in" delay={200}>
          <p className="mt-4 text-lg max-w-2xl text-[#D0D0D0]">
            Prestations sur demande. Diagnostic personnalisé obligatoire pour la prise de rendez-vous.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-in" delay={300}>
          <BtnRDVLocksTresses />
        </AnimatedSection>

      </div>
    </section>
  );
}
