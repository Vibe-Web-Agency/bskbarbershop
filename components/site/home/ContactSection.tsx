"use client";

import Link from "next/link";
import { contactInfo } from "@/data/dataContact";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactSection() {
  return (
    <section className="w-full py-20 bg-[#1B1C1E] border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* TITLE */}
        <AnimatedSection animation="fade-in">
          <h2 className="text-4xl font-bold text-white mb-4">
            Contact & Rendez-vous
          </h2>
        </AnimatedSection>

        <AnimatedSection animation="fade-in" delay={100}>
          <p className="text-[#D0D0D0] max-w-xl mx-auto mb-8 text-lg">
            Besoin d'une coupe, d'un soin ou d'un rendez-vous Locks/Tresses ?
            Contactez-nous directement ou réservez en ligne.
          </p>
        </AnimatedSection>

        {/* CONTACT INFO */}
        <AnimatedSection animation="slide-up" delay={200}>
          <div className="flex flex-col items-center gap-3 mb-10">

            <a href={contactInfo.phoneLink} className="text-[#C6A667] text-lg font-semibold hover:text-[#9B8452] transition">
              {contactInfo.phone}
            </a>

            <a href={contactInfo.googleMapsLink} target="_blank" className="text-[#D0D0D0] hover:text-[#C6A667] transition">
              {contactInfo.address} — {contactInfo.city}
            </a>

            <p className="text-[#9B8452] text-sm italic">
              Locks & Tresses : prestations sur demande uniquement.
            </p>
          </div>
        </AnimatedSection>

        {/* CTA BUTTONS */}
        <AnimatedSection animation="slide-up" delay={400}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

            {/* RESERVER - outline style for contrast */}
            <Link
              href="/reserver"
              className="px-6 py-2.5 rounded-md border border-[#C6A667] text-[#C6A667] font-medium hover:bg-[#C6A667] hover:text-black transition hover-pulse"
            >
              Prendre rendez-vous
            </Link>

            {/* LOCKS/TRESSES - primary style */}
            <Link
              href="/locks-tresses#form-rdv-locks"
              className="px-6 py-2.5 rounded-md bg-[#C6A667] text-black font-semibold hover:bg-[#9B8452] transition hover-pulse"
            >
              Rendez-vous Locks/Tresses
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
