"use client";

import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function LocksTressesSection() {
  return (
    <section className="w-full py-20 bg-[#1B1C1E]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <AnimatedSection animation="slide-right">
          <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/assets/photos/IMG_1581.webp"
              alt="Locks & Tresses"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </AnimatedSection>

        <AnimatedSection animation="slide-left" delay={200}>
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Locks & Tresses
            </h2>

            <p className="text-[#D0D0D0] text-lg leading-relaxed mb-6">
              Des looks uniques, réalisés sur mesure selon votre style.
              Les prestations Locks et Tresses sont effectuées **exclusivement sur demande**, afin
              de garantir un service irréprochable et parfaitement adapté à vos cheveux.
            </p>

            <p className="text-[#C6A667] text-sm italic mb-6">
              Les prestations Locks et Tresses sont effectuées <span className="underline">exclusivement sur demande,</span> afin
              de garantir un service irréprochable et parfaitement adapté à vos cheveux.
            </p>

            <Link
              href="/locks-tresses"
              className="
                inline-block px-6 py-3 rounded-md
                bg-[#C6A667] text-black font-semibold
                hover:bg-[#9B8452] transition hover-pulse
              "
            >
              Voir les prestations Locks & Tresses
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
