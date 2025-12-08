"use client";

import { useState } from "react";

export default function LocksFormRDV() {
    const [formData, setFormData] = useState({
        nom: "",
        telephone: "",
        email: "",
        prestation: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulation d'envoi - à remplacer par ton API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ nom: "", telephone: "", email: "", prestation: "", message: "" });
    };

    return (
        <section id="form-rdv-locks" className="max-w-3xl mx-auto px-6 py-20">
            <div className="bg-[#232426] rounded-2xl p-8 md:p-12 shadow-2xl border border-[#333]">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Demande de Rendez-vous
                    </h2>
                    <p className="text-[#A0A0A0]">
                        Locks, Retwist, Tresses... Décrivez votre projet et nous vous recontactons rapidement.
                    </p>
                </div>

                {isSuccess ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-[#C6A667] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Demande envoyée !</h3>
                        <p className="text-[#A0A0A0]">Nous vous recontacterons très bientôt.</p>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 text-[#C6A667] hover:underline"
                        >
                            Envoyer une autre demande
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        {/* Email */}
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

                        {/* Type de prestation */}
                        <div>
                            <label htmlFor="prestation" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                Type de prestation *
                            </label>
                            <select
                                id="prestation"
                                name="prestation"
                                required
                                value={formData.prestation}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Choisissez une prestation</option>
                                <option value="locks-creation">Départ Locks</option>
                                <option value="retwist">Retwist</option>
                                <option value="locks-crochet">Locks au Crochet</option>
                                <option value="tresses">Tresses</option>
                                <option value="vanilles">Vanilles</option>
                                <option value="nattes-collees">Nattes collées</option>
                                <option value="autre">Autre (préciser dans le message)</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-[#D0D0D0] mb-2">
                                Décrivez votre projet
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-[#1B1C1E] border border-[#444] rounded-lg text-white placeholder-[#666] focus:outline-none focus:border-[#C6A667] focus:ring-1 focus:ring-[#C6A667] transition resize-none"
                                placeholder="Décrivez le style souhaité, envoyez une photo d'inspiration par WhatsApp, etc."
                            />
                        </div>


                        <p className="text-sm text-[#888] italic">
                            💡 Pour un devis précis, n'hésitez pas à nous envoyer une photo d'inspiration par WhatsApp.
                        </p>

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
                                "Envoyer ma demande"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
