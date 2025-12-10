"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function GalerieSection() {
  const items = [
    { type: "image", src: "/assets/photos/canape.jpeg" },
    { type: "image", src: "/assets/photos/fade1.jpeg" },
    { type: "video", src: "/assets/videos/1.mp4" },
    { type: "video", src: "/assets/videos/3.mp4" },
    { type: "image", src: "/assets/photos/fade2.jpeg" },
    { type: "image", src: "/assets/photos/sieges.jpeg" },
  ];

  return (
    <section className="w-full py-20 bg-[#1B1C1E]">
      <div className="max-w-6xl mx-auto px-6">

        <AnimatedSection animation="fade-in">
          <h2 className="text-4xl font-bold text-white mb-4">Galerie</h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-in" delay={100}>
          <p className="text-[#D0D0D0] mb-10 max-w-2xl">
            Découvrez un aperçu de notre travail : locks, tresses, coupes
            personnalisées et soins professionnels réalisés au salon.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={i} animation="scale-in" delay={150 + i * 80}>
              <div
                className="relative w-full h-[260px] md:h-[300px] rounded-xl overflow-hidden group shadow-xl"
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt="Galerie BSK"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="fade-in" delay={700}>
          <div className="mt-10">
            <Link
              href="/galerie"
              className="inline-block px-6 py-3 rounded-md bg-[#C6A667] text-black font-semibold hover:bg-[#9B8452] transition hover-pulse"
            >
              Voir la galerie complète
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
