"use client";

import { useState } from "react";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import {
    FormInput,
    FormSelect,
    FormTextarea,
    FormSubmitButton,
    FormSuccessMessage,
    FormErrorMessage,
    type SelectOption,
} from "@/components/ui/forms";

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
    const [error, setError] = useState<string | null>(null);

    const prestations: SelectOption[] = [
        { value: "locks-creation", label: "Départ Locks" },
        { value: "retwist", label: "Retwist" },
        { value: "locks-crochet", label: "Locks au Crochet" },
        { value: "tresses", label: "Tresses" },
        { value: "vanilles", label: "Vanilles" },
        { value: "nattes-collees", label: "Nattes collées" },
        { value: "autre", label: "Autre (préciser dans le message)" },
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
            // Trouver le label de la prestation sélectionnée
            const prestationLabel = prestations.find(p => p.value === formData.prestation)?.label || formData.prestation;

            // Préparer le message complet avec la prestation
            const fullMessage = `Prestation : ${prestationLabel}${formData.message ? `\n\n${formData.message}` : ''}`;

            const insertData = {
                user_id: BUSINESS_ID,
                // service_id: formData.prestation,
                customer_name: formData.nom,
                customer_phone: formData.telephone,
                customer_email: formData.email.toLowerCase(),
                message: fullMessage,
                status: 'pending', // En attente car c'est une demande de devis
            };

            // Envoyer les emails (client + admin) via l'API
            try {
                // Email au client
                if (formData.email) {
                    await fetch('/api/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            to: formData.email,
                            clientName: formData.nom,
                            service: prestationLabel,
                            type: 'locks-request'
                        })
                    });
                    console.log('📧 Email client envoyé');
                }

                // Email au gérant
                await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        clientName: formData.nom,
                        clientPhone: formData.telephone,
                        clientEmail: formData.email || undefined,
                        service: prestationLabel,
                        message: formData.message || undefined,
                        type: 'admin-new-quote'
                    })
                });
                console.log('📧 Notification admin envoyée');
            } catch (emailErr) {
                console.warn('⚠️ Email non envoyé:', emailErr);
                // On continue même si l'email échoue
            }

            console.log('📤 Données demande locks/tresses à insérer:', insertData);

            const { error: insertError } = await supabase
                .from('quotes')
                .insert([insertData]);

            console.log('📥 Résultat insertion demande:', { error: insertError });

            if (insertError) {
                console.error("Erreur Supabase:", insertError);
                setError(`Erreur: ${insertError.message || insertError.code || "Erreur inconnue"}`);
                setIsSubmitting(false);
                return;
            }

            console.log('✅ Demande locks/tresses enregistrée avec succès');
            setIsSuccess(true);
            setFormData({ nom: "", telephone: "", email: "", prestation: "", message: "" });
        } catch (err) {
            console.error("Erreur:", err);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
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
                    <FormSuccessMessage
                        title="Demande envoyée !"
                        message="Nous vous recontacterons très bientôt."
                        onReset={() => setIsSuccess(false)}
                        resetButtonText="Envoyer une autre demande"
                    />
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormInput
                                id="nom"
                                name="nom"
                                label="Nom complet"
                                required
                                value={formData.nom}
                                onChange={handleChange}
                                placeholder="Votre nom"
                            />
                            <FormInput
                                id="telephone"
                                name="telephone"
                                label="Téléphone"
                                type="tel"
                                required
                                value={formData.telephone}
                                onChange={handleChange}
                                placeholder="06 XX XX XX XX"
                            />
                        </div>

                        {/* Email */}
                        <FormInput
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                        />

                        {/* Type de prestation */}
                        <FormSelect
                            id="prestation"
                            name="prestation"
                            label="Type de prestation"
                            required
                            value={formData.prestation}
                            onChange={handleChange}
                            options={prestations}
                            placeholder="Choisissez une prestation"
                        />

                        <FormTextarea
                            id="message"
                            name="message"
                            label="Décrivez votre projet"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Décrivez le style souhaité, envoyez une photo d'inspiration par WhatsApp, etc."
                            rows={4}
                        />

                        {/* ERROR MESSAGE */}
                        {error && <FormErrorMessage message={error} />}

                        <p className="text-sm text-[#888] italic">
                            💡 Pour un devis précis, n'hésitez pas à nous envoyer une photo d'inspiration par WhatsApp.
                        </p>

                        <FormSubmitButton isSubmitting={isSubmitting}>
                            Envoyer ma demande
                        </FormSubmitButton>
                    </form>
                )}
            </div>
        </section>
    );
}
