"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ReservationChoice() {

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.getElementById('formulaire');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="w-full bg-[#1B1C1E]">
            <div className="max-w-4xl mx-auto px-6 pb-40">

                <AnimatedSection animation="slide-up" delay={100}>
                    <div className="grid sm:grid-cols-2 gap-6">

                        {/* COUPES & BARBES */}
                        <a
                            href="#formulaire"
                            onClick={handleSmoothScroll}
                            className="group bg-[#232426] p-8 rounded-xl border border-white/10 hover:border-[#C6A667]/50 transition-all duration-300 text-center"
                        >
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C6A667] transition">
                                Coupes & Barbes
                            </h3>
                            <p className="text-[#A0A0A0] text-sm mb-16">
                                Dégradés, contours, barbes, soins visage
                            </p>
                            <span className="inline-block px-6 py-2.5 rounded-lg bg-[#C6A667] text-black font-semibold group-hover:bg-[#9B8452] transition">
                                Réserver maintenant
                            </span>
                        </a>

                        {/* LOCKS & TRESSES */}
                        <Link
                            href="/locks-tresses#form-rdv-locks"
                            className="group bg-[#232426] p-8 rounded-xl border border-[#C6A667]/30 hover:border-[#C6A667] transition-all duration-300 text-center"
                        >
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C6A667] transition">
                                Locks & Tresses
                            </h3>
                            <p className="text-[#A0A0A0] text-sm mb-16">
                                Retwist, crochet, vanilles, nattes collées
                            </p>
                            <span className="inline-block px-6 py-2.5 rounded-lg border-2 border-[#C6A667] text-[#C6A667] font-semibold group-hover:bg-[#C6A667] group-hover:text-black transition">
                                Faire une demande
                            </span>
                        </Link>

                    </div>
                </AnimatedSection>

            </div>
        </section>
    );
}
