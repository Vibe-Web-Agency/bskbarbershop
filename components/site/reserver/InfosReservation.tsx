"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function InfosReservation() {
    return (
        <section className="w-full py-16 bg-[#232426]">
            <div className="max-w-4xl mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-8">

                    {/* INFO COIFFURE */}
                    <AnimatedSection animation="slide-up" delay={100}>
                        <div className="bg-[#1B1C1E] p-6 rounded-xl border border-white/10 h-full">
                            <h3 className="text-xl font-semibold text-[#C6A667] mb-3">
                                Coupes & Barbes
                            </h3>
                            <p className="text-[#D0D0D0] text-sm mb-4">
                                Réservez directement via le formulaire ci-dessus.
                                La confirmation vous sera envoyée par SMS.
                            </p>
                            <p className="text-[#888] text-sm">
                                Durée moyenne : 30 min à 1h
                            </p>
                        </div>
                    </AnimatedSection>

                    {/* INFO LOCKS/TRESSES */}
                    <AnimatedSection animation="slide-up" delay={200}>
                        <div className="bg-[#1B1C1E] p-6 rounded-xl border border-[#C6A667]/30 h-full">
                            <h3 className="text-xl font-semibold text-[#C6A667] mb-3">
                                Locks & Tresses
                            </h3>
                            <p className="text-[#D0D0D0] text-sm mb-4">
                                Ces prestations nécessitent un diagnostic personnalisé préalable.
                            </p>
                            <Link
                                href="/locks-tresses#form-rdv-locks"
                                className="inline-block text-[#C6A667] text-sm font-medium hover:underline"
                            >
                                Faire une demande Locks/Tresses →
                            </Link>
                        </div>
                    </AnimatedSection>

                </div>

            </div>
        </section>
    );
}
