"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function LocksIntro() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
            <AnimatedSection animation="fade-in">
                <p className="text-lg text-[#D0D0D0] max-w-3xl mx-auto leading-relaxed">
                    Toutes les prestations Locks et Tresses sont réalisées sur demande afin
                    de garantir un résultat sur mesure adapté à votre texture de cheveux et
                    à votre style.
                </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-in" delay={100}>
                <p className="mt-4 text-[#C6A667]">
                    Pour un devis précis, merci d'envoyer une photo de vos cheveux via WhatsApp.
                </p>
            </AnimatedSection>

            <AnimatedSection animation="fade-in" delay={300}>
                <p className="text-lg text-[#D0D0D0] max-w-3xl mx-auto leading-relaxed pt-12">
                    Pour toutes autres prestations, merci de reserver <Link href="/reserver" className="text-[#C6A667]">ici.</Link>
                </p>
            </AnimatedSection>
        </section>
    );
}
