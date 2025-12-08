export default function HeaderPrestations() {
    return (
        <section className="relative w-full py-24 bg-[#1B1C1E]">
            {/* GOLDEN GLOW */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#C6A667]/10 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">

                {/* TITLE */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Prestations & <span className="text-[#C6A667]">Tarifs</span>
                </h1>

                {/* SUBTITLE */}
                <p className="text-[#D0D0D0] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                    Découvrez l'ensemble de nos services : coiffure, tresses, locks et soins visage.
                </p>

            </div>
        </section>
    );
}
