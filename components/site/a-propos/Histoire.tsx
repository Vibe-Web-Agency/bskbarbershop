import Image from "next/image";

export default function Histoire() {
    return (
        <section className="w-full py-20 bg-[#1B1C1E]">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* IMAGE */}
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-xl order-2 md:order-1">
                    <Image
                        src="/assets/sieges.jpeg"
                        alt="L'intérieur de BSK Barbershop"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* TEXT CONTENT */}
                <div className="order-1 md:order-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Notre Histoire
                    </h2>

                    <p className="text-[#D0D0D0] leading-relaxed mb-4 text-lg">
                        BSK Barbershop est né d'une passion profonde pour l'art de la coiffure
                        et du soin masculin. Fondé avec l'ambition de créer un espace où chaque
                        client se sent valorisé et écouté.
                    </p>

                    <p className="text-[#D0D0D0] leading-relaxed mb-4">
                        Depuis nos débuts, notre mission reste la même : offrir des prestations
                        de qualité exceptionnelle dans une ambiance chaleureuse et professionnelle.
                        Que ce soit pour une coupe classique, des locks, des tresses ou un soin
                        visage, nous mettons notre expertise au service de votre style.
                    </p>

                    <p className="text-[#C6A667] font-medium text-lg">
                        Chaque passage chez BSK est une expérience, pas juste un rendez-vous.
                    </p>
                </div>

            </div>
        </section>
    );
}
