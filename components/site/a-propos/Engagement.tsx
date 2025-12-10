"use client";

import { engagements } from "@/data/dataEngagements";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Engagement() {
    return (
        <section className="w-full py-20 bg-[#1B1C1E]">
            <div className="max-w-5xl mx-auto px-6">

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* TEXT CONTENT */}
                    <AnimatedSection animation="slide-right">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Notre Engagement
                            </h2>

                            <p className="text-[#D0D0D0] text-lg leading-relaxed mb-8">
                                Chez BSK Barbershop, la satisfaction client est notre priorité absolue.
                                Nous nous engageons à vous offrir bien plus qu'une simple coupe.
                            </p>

                            {/* ENGAGEMENT LIST */}
                            <ul className="space-y-4">
                                {engagements.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <span className="text-2xl">{item.icon}</span>
                                        <span className="text-[#D0D0D0] leading-relaxed">
                                            {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedSection>

                    {/* DECORATIVE QUOTE */}
                    <AnimatedSection animation="slide-left" delay={200}>
                        <div className="bg-[#232426] p-8 rounded-xl border border-[#C6A667]/30">
                            <div className="text-6xl text-[#C6A667] mb-4">"</div>
                            <blockquote className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-6">
                                Chaque client qui entre chez nous doit repartir avec le sourire,
                                confiant et fier de son style.
                            </blockquote>
                            <cite className="text-[#C6A667] font-medium not-italic">
                                — L'équipe BSK
                            </cite>
                        </div>
                    </AnimatedSection>

                </div>

            </div>
        </section>
    );
}
