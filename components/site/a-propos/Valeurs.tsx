"use client";

import { valeurs } from "@/data/dataValeurs";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Valeurs() {
    return (
        <section className="w-full py-20 bg-[#1B1C1E]">
            <div className="max-w-6xl mx-auto px-6">

                {/* SECTION HEADER */}
                <div className="text-center mb-12">
                    <AnimatedSection animation="fade-in">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Nos Valeurs
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection animation="fade-in" delay={100}>
                        <p className="text-[#D0D0D0] text-lg max-w-2xl mx-auto">
                            Les principes qui guident notre travail au quotidien
                        </p>
                    </AnimatedSection>
                </div>

                {/* VALUES GRID */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {valeurs.map((valeur, index) => (
                        <AnimatedSection key={index} animation="slide-up" delay={200 + index * 100}>
                            <div
                                className="
                                    bg-[#232426] p-6 rounded-xl
                                    border border-white/10
                                    hover:border-[#C6A667]/50
                                    transition-all duration-300
                                    hover:transform hover:-translate-y-1 h-full
                                "
                            >
                                {/* ICON */}
                                <div className="text-4xl mb-4">{valeur.icon}</div>

                                {/* TITLE */}
                                <h3 className="text-xl font-semibold text-[#C6A667] mb-3">
                                    {valeur.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="text-[#D0D0D0] text-sm leading-relaxed">
                                    {valeur.description}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

            </div>
        </section>
    );
}
