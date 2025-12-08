"use client";

import { useState } from "react";
import { services } from "@/data/prix";
import { supabase, BUSINESS_ID } from "@/lib/supabase";

export default function FormulaireReservation() {
    const [formData, setFormData] = useState({
        nom: "",
        telephone: "",
        email: "",
        prestation: "",
        date: "",
        heure: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const creneaux = [];
    let time = new Date();
    time.setHours(10, 0, 0, 0); // Start at 10:00

    const endTime = new Date();
    endTime.setHours(19, 30, 0, 0); // End at 19:30

    while (time <= endTime) {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        creneaux.push(`${hours}:${minutes}`);
        time.setMinutes(time.getMinutes() + 45);
    }

    // Liste des prestations
    const prestations = [
        ...services.coiffure.map(s => ({ value: s.name, label: `${s.name}`, disabled: false })),
        { value: "divider-1", label: "── Soins à la carte ──", disabled: true },
        ...services.soinsAlaCarte.map(s => ({ value: s.name, label: `${s.name}`, disabled: false })),
        { value: "divider-2", label: "── Soin visage complet ──", disabled: true },
        ...services.soinVisageComplet.map(s => ({ value: s.name, label: `${s.name}`, disabled: false })),
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { error: insertError } = await supabase
                .from('reservations')
                .insert([
                    {
                        business_id: BUSINESS_ID,
                        user_name: formData.nom,
                        user_phone: formData.telephone,
                        user_mail: formData.email,
                        prestation: formData.prestation,
                        appointment_date: formData.date,
                        appointment_time: formData.heure,
                        message: formData.message || null,
                    }
                ]);

            if (insertError) {
                console.error("Erreur Supabase:", insertError);
                console.error("Message:", insertError.message);
                console.error("Details:", insertError.details);
                console.error("Hint:", insertError.hint);
                console.error("Code:", insertError.code);
                setError(`Erreur: ${insertError.message || insertError.code || "Erreur inconnue"}`);
                setIsSubmitting(false);
                return;
            }

            setIsSuccess(true);
            setFormData({ nom: "", telephone: "", email: "", prestation: "", date: "", heure: "", message: "" });
        } catch (err) {
            console.error("Erreur:", err);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Date minimum = aujourd'hui
    const today = new Date().toISOString().split("T")[0];

    return (
        <section className="w-full py-16 bg-[#1B1C1E]">
            <div className="max-w-2xl mx-auto px-6">

                <div className="bg-[#232426] rounded-2xl p-8 md:p-12 shadow-2xl border border-[#333]">

                    {isSuccess ? (
                        <div className="text-center py-10">
                            <div className="w-16 h-16 bg-[#C6A667] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Réservation envoyée !</h3>
                            <p className="text-[#A0A0A0] mb-2">Nous vous confirmerons votre rendez-vous très rapidement.</p>
                            <p className="text-[#9B8452] text-sm">Un mail de confirmation vous sera envoyé.</p>
                            <button
                                onClick={() => setIsSuccess(false)}
                                className="mt-6 text-[#C6A667] hover:underline"
                            >
                                Nouvelle réservation
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* NOM + TELEPHONE */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nom" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                        Nom complet *
                                    </label>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        required
                                        value={formData.nom}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition"
                                        placeholder="Votre nom"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="telephone" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                        Téléphone *
                                    </label>
                                    <input
                                        type="tel"
                                        id="telephone"
                                        name="telephone"
                                        required
                                        value={formData.telephone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition"
                                        placeholder="06 XX XX XX XX"
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            {/* PRESTATION */}
                            <div>
                                <label htmlFor="prestation" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                    Prestation * <span className="text-[#C6A667] text-xs">(Lien pour les rendez-vous locks et tresses plus bas )</span>                                </label>
                                <select
                                    id="prestation"
                                    name="prestation"
                                    required
                                    value={formData.prestation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Choisissez une prestation</option>
                                    {prestations.map((p, i) => (
                                        <option key={i} value={p.value} disabled={p.disabled}>
                                            {p.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* DATE + HEURE */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                        Date souhaitée *
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        required
                                        min={today}
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="heure" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                        Heure souhaitée *
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="heure"
                                            name="heure"
                                            required
                                            value={formData.heure}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Choisir un créneau</option>
                                            {creneaux.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#000]">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MESSAGE */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                    Remarques (optionnel)
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition resize-none"
                                    placeholder="Informations supplémentaires..."
                                />
                            </div>

                            {/* ERROR MESSAGE */}
                            {error && (
                                <div className="p-4 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* INFO */}
                            <p className="text-sm text-[#888] italic">
                                La confirmation de votre rendez-vous sera envoyée par email.
                            </p>

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-[#C6A667] text-black font-bold rounded-lg hover:bg-[#9B8452] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Envoi en cours...
                                    </>
                                ) : (
                                    "Réserver mon créneau"
                                )}
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </section>
    );
}
