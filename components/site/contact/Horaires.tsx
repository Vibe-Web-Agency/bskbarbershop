import { horaires } from "@/data/dataContact";

export default function Horaires() {
    return (
        <section className="w-full py-16 bg-[#1B1C1E]">
            <div className="max-w-2xl mx-auto px-6">

                {/* SECTION HEADER */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-3">
                        Horaires d'ouverture
                    </h2>
                    <p className="text-[#D0D0D0]">
                        Retrouvez-nous aux horaires suivants
                    </p>
                </div>

                {/* HORAIRES TABLE */}
                <div className="bg-[#232426] rounded-xl border border-white/10 overflow-hidden">
                    {horaires.map((item, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center px-6 py-4 ${index !== horaires.length - 1 ? 'border-b border-white/10' : ''
                                } ${item.horaire === 'Fermé' ? 'opacity-50' : ''}`}
                        >
                            <span className="text-white font-medium">{item.jour}</span>
                            <span className={`${item.horaire === 'Fermé' ? 'text-[#888]' : 'text-[#C6A667]'} font-medium`}>
                                {item.horaire}
                            </span>
                        </div>
                    ))}
                </div>

                {/* NOTE */}
                <p className="text-center text-[#9B8452] text-sm italic mt-6">
                    Locks & Tresses : sur rendez-vous uniquement
                </p>

            </div>
        </section>
    );
}
