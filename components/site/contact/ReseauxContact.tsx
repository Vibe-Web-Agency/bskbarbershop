import Link from "next/link";
import { contactInfo } from "@/data/dataContact";

export default function ReseauxContact() {
    return (
        <section className="w-full py-16 bg-[#1B1C1E]">
            <div className="max-w-4xl mx-auto px-6 text-center">

                {/* SECTION HEADER */}
                <h2 className="text-3xl font-bold text-white mb-3">
                    Prendre rendez-vous
                </h2>
                <p className="text-[#D0D0D0] mb-8">
                    BSK Barbershop n'attend plus que vous !
                </p>

                {/* SOCIAL BUTTONS */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

                    <Link
                        href="/reserver"
                        className="flex items-center gap-3 px-6 py-3 rounded-lg bg-[#C6A667] text-black font-semibold hover:bg-[#9B8452] transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Réserver en ligne
                    </Link>

                </div>

            </div>
        </section>
    );
}
