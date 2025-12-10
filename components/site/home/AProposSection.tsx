"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function AboutSection() {
  return (
    <section className="w-full py-20 bg-[#1B1C1E]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <AnimatedSection animation="slide-right">
          <div className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/assets/photos/sieges.jpeg"
              alt="BSK Barbershop"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-left" delay={200}>
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              À propos de BSK Barbershop
            </h2>

            <p className="text-[#D0D0D0] leading-relaxed mb-6 text-lg">
              BSK Barbershop est bien plus qu'un simple salon de coiffure.
              Nous mettons la passion, l'expérience et la précision au cœur
              de chaque coupe, barbe, locks ou tresses.
              Notre objectif : sublimer votre style tout en vous offrant une
              expérience unique et personnalisée.
            </p>

            <p className="text-[#C6A667] font-medium mb-8">
              Excellence, respect et savoir-faire : bienvenue chez BSK.
            </p>

            <Link
              href="/contact"
              className="
                inline-block px-6 py-3 rounded-md
                bg-[#C6A667] text-black font-semibold
                hover:bg-[#9B8452] transition hover-pulse
              "
            >
              Prendre rendez-vous
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}