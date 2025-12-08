import { contactInfo } from "@/data/dataContact";

export default function InfosContact() {
    return (
        <section className="w-full py-16 bg-[#1B1C1E]">
            <div className="max-w-5xl mx-auto px-6">

                <div className="grid md:grid-cols-3 gap-8">

                    {/* TELEPHONE */}
                    <div className="bg-[#232426] p-6 rounded-xl border border-white/10 text-center hover:border-[#C6A667]/50 transition">
                        <div className="text-4xl mb-4">📞</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Téléphone</h3>
                        <a
                            href={contactInfo.phoneLink}
                            className="text-[#C6A667] text-lg font-medium hover:text-[#9B8452] transition"
                        >
                            {contactInfo.phone}
                        </a>
                    </div>

                    {/* EMAIL */}
                    <div className="bg-[#232426] p-6 rounded-xl border border-white/10 text-center hover:border-[#C6A667]/50 transition">
                        <div className="text-4xl mb-4">✉️</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                        <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-[#C6A667] text-lg font-medium hover:text-[#9B8452] transition break-all"
                        >
                            {contactInfo.email}
                        </a>
                    </div>

                    {/* ADRESSE */}
                    <div className="bg-[#232426] p-6 rounded-xl border border-white/10 text-center hover:border-[#C6A667]/50 transition">
                        <div className="text-4xl mb-4">📍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Adresse</h3>
                        <a
                            href={contactInfo.googleMapsLink}
                            target="_blank"
                            className="text-[#D0D0D0] hover:text-[#C6A667] transition"
                        >
                            {contactInfo.address}<br />{contactInfo.city}
                        </a>
                    </div>

                </div>

            </div>
        </section>
    );
}
