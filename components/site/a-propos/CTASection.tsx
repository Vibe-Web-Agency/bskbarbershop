"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CTASection() {
    return (
        <section className="w-full py-20 bg-[#1B1C1E] border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6 text-center">

                {/* TITLE */}
                <AnimatedSection animation="fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Prêt à découvrir l'expérience BSK ?
                    </h2>
                </AnimatedSection>

                {/* SUBTITLE */}
                <AnimatedSection animation="fade-in" delay={100}>
                    <p className="text-[#D0D0D0] text-lg max-w-2xl mx-auto mb-8">
                        Réservez votre rendez-vous dès maintenant et rejoignez notre communauté
                        de clients satisfaits.
                    </p>
                </AnimatedSection>

                {/* CTA BUTTONS */}
                <AnimatedSection animation="slide-up" delay={200}>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">

                        {/* PRIMARY CTA */}
                        <Link
                            href="/reserver"
                            className="
                                px-8 py-4 rounded-lg
                                bg-[#C6A667] text-black font-semibold text-lg
                                hover:bg-[#9B8452] transition-colors
                                shadow-lg shadow-[#C6A667]/20 hover-pulse
                            "
                        >
                            Prendre rendez-vous
                        </Link>

                        {/* SECONDARY CTA */}
                        <Link
                            href="/contact"
                            className="
                                px-8 py-4 rounded-lg
                                border-2 border-[#C6A667] text-[#C6A667] font-semibold text-lg
                                hover:bg-[#C6A667] hover:text-black transition-colors
                            "
                        >
                            Nous contacter
                        </Link>

                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
