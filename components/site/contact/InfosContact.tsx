"use client";

import { contactInfo } from "@/data/dataContact";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function InfosContact() {
    const cards = [
        { icon: "📞", title: "Téléphone", href: contactInfo.phoneLink, text: contactInfo.phone, isGolden: true },
        { icon: "✉️", title: "Email", href: `mailto:${contactInfo.email}`, text: contactInfo.email, isGolden: true, breakAll: true },
        { icon: "📍", title: "Adresse", href: contactInfo.googleMapsLink, text: `${contactInfo.address}\n${contactInfo.city}`, target: "_blank", isGolden: false }
    ];

    return (
        <section className="w-full py-16 bg-[#1B1C1E]">
            <div className="max-w-5xl mx-auto px-6">

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, index) => (
                        <AnimatedSection key={card.title} animation="slide-up" delay={100 + index * 100}>
                            <div className="bg-[#232426] p-6 rounded-xl border border-white/10 text-center hover:border-[#C6A667]/50 transition h-full">
                                <div className="text-4xl mb-4">{card.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                                <a
                                    href={card.href}
                                    target={card.target}
                                    className={`${card.isGolden ? 'text-[#C6A667] hover:text-[#9B8452]' : 'text-[#D0D0D0] hover:text-[#C6A667]'} text-lg font-medium transition ${card.breakAll ? 'break-all' : ''}`}
                                >
                                    {card.text.split('\n').map((line, i) => (
                                        <span key={i}>{line}{i === 0 && card.text.includes('\n') && <br />}</span>
                                    ))}
                                </a>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>

            </div>
        </section>
    );
}
