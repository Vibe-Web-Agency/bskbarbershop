"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

export default function GalerieHero() {
    return (
        <section className="relative py-24 px-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-[#C6A667]/10 to-transparent pointer-events-none" />
            <div className="max-w-4xl mx-auto relative z-10">
                <AnimatedSection animation="slide-up">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Notre <span className="text-[#C6A667]">Galerie</span>
                    </h1>
                </AnimatedSection>
                <AnimatedSection animation="fade-in" delay={200}>
                    <p className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto">
                        Découvrez nos réalisations : coupes, fades, locks, tresses et plus encore.
                        Chaque création reflète notre passion pour l'excellence.
                    </p>
                </AnimatedSection>
            </div>
        </section>
    );
}
