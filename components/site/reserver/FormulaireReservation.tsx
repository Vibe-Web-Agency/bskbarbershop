"use client";

import { useState, useEffect } from "react";
import { services } from "@/data/prix";
import { supabase, BUSINESS_ID } from "@/lib/supabase";
import {
    FormInput,
    FormSelect,
    FormTextarea,
    FormDatePicker,
    FormSubmitButton,
    FormSuccessMessage,
    FormErrorMessage,
    FormWrapper,
    type SelectOption,
} from "@/components/ui/forms";

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
    const [bookedSlots, setBookedSlots] = useState<Record<string, number>>({});
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Vérifier si une date est un week-end (samedi ou dimanche)
    const isWeekend = (dateStr: string): boolean => {
        const date = new Date(dateStr);
        const day = date.getDay(); // 0 = dimanche, 6 = samedi
        return day === 0 || day === 6;
    };

    // Récupérer les créneaux réservés pour une date donnée
    const fetchBookedSlots = async (selectedDate: string) => {
        setLoadingSlots(true);
        try {
            // Créer les bornes de la journée en timestamp ISO
            const dateObj = new Date(selectedDate);
            dateObj.setHours(0, 0, 0, 0);
            const startOfDay = dateObj.toISOString();
            dateObj.setHours(23, 59, 59, 999);
            const endOfDay = dateObj.toISOString();

            const { data, error: fetchError } = await supabase
                .from('reservations')
                .select('date')
                .eq('user_id', BUSINESS_ID)
                .gte('date', startOfDay)
                .lte('date', endOfDay);

            if (!fetchError && data) {
                const counts: Record<string, number> = {};
                data.forEach((r) => {
                    // Extraire l'heure du timestamp
                    const dateObj = new Date(r.date);
                    const hours = dateObj.getHours().toString().padStart(2, '0');
                    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
                    const timeSlot = `${hours}:${minutes}`;
                    counts[timeSlot] = (counts[timeSlot] || 0) + 1;
                });
                setBookedSlots(counts);
            }
        } catch (err) {
            console.error("Erreur lors de la récupération des créneaux:", err);
        } finally {
            setLoadingSlots(false);
        }
    };

    // Vérifier si un créneau est disponible
    const isSlotAvailable = (slot: string): boolean => {
        if (!formData.date) return true;
        const count = bookedSlots[slot] || 0;
        const maxBookings = isWeekend(formData.date) ? 2 : 1;
        return count < maxBookings;
    };

    // Générer les créneaux horaires
    const creneaux: SelectOption[] = [];
    let time = new Date();
    time.setHours(10, 0, 0, 0);
    const endTime = new Date();
    endTime.setHours(19, 30, 0, 0);

    while (time <= endTime) {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const slot = `${hours}:${minutes}`;
        const available = isSlotAvailable(slot);
        creneaux.push({
            value: slot,
            label: `${slot}${!available ? ' ── complet' : ''}`,
            disabled: !available,
        });
        time.setMinutes(time.getMinutes() + 45);
    }

    // Liste des prestations
    const prestations: SelectOption[] = [
        ...services.coiffure.map(s => ({ value: s.name, label: s.name, disabled: false })),
        { value: "divider-1", label: "── Soins à la carte ──", disabled: true },
        ...services.soinsAlaCarte.map(s => ({ value: s.name, label: s.name, disabled: false })),
        { value: "divider-2", label: "── Soin visage complet ──", disabled: true },
        ...services.soinVisageComplet.map(s => ({ value: s.name, label: s.name, disabled: false })),
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'date' && value) {
            fetchBookedSlots(value);
            setFormData({ ...formData, date: value, heure: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Créer les bornes de la journée en timestamp ISO pour la vérification
            const selectedDateObj = new Date(formData.date);
            selectedDateObj.setHours(0, 0, 0, 0);
            const startOfDay = selectedDateObj.toISOString();
            selectedDateObj.setHours(23, 59, 59, 999);
            const endOfDay = selectedDateObj.toISOString();

            // Vérification côté serveur avant l'insertion
            const { data: currentReservations, error: checkError } = await supabase
                .from('reservations')
                .select('date')
                .eq('user_id', BUSINESS_ID)
                .gte('date', startOfDay)
                .lte('date', endOfDay);

            if (checkError) {
                console.error("Erreur vérification:", checkError);
                setError("Erreur lors de la vérification de disponibilité.");
                setIsSubmitting(false);
                return;
            }

            // Compter les réservations pour ce créneau
            const timeSlotNormalized = formData.heure.substring(0, 5);
            const currentCount = currentReservations?.filter(r => {
                const dateObj = new Date(r.date);
                const hours = dateObj.getHours().toString().padStart(2, '0');
                const minutes = dateObj.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}` === timeSlotNormalized;
            }).length || 0;

            const maxBookings = isWeekend(formData.date) ? 2 : 1;

            if (currentCount >= maxBookings) {
                await fetchBookedSlots(formData.date);
                setFormData(prev => ({ ...prev, heure: '' }));
                setError("Ce créneau vient d'être réservé par quelqu'un d'autre. Veuillez en choisir un autre.");
                setIsSubmitting(false);
                return;
            }

            // Combiner date et heure en un seul timestamp ISO valide
            const [hours, minutes] = formData.heure.split(':').map(Number);
            const dateObj = new Date(formData.date);
            dateObj.setHours(hours, minutes, 0, 0);
            const dateTimeISO = dateObj.toISOString();

            // Préparer le message avec la prestation incluse
            const fullMessage = formData.prestation
                ? `Prestation: ${formData.prestation}${formData.message ? `\n\n${formData.message}` : ''}`
                : formData.message || null;

            const insertData = {
                user_id: BUSINESS_ID,
                service_id: null,
                customer_name: formData.nom,
                customer_phone: formData.telephone,
                customer_mail: formData.email || null,
                date: dateTimeISO,
                message: fullMessage,
                status: 'scheduled',
            };

            console.log('📤 Données à insérer:', insertData);

            const { data: insertedData, error: insertError } = await supabase
                .from('reservations')
                .insert([insertData])
                .select();

            console.log('📥 Résultat insertion:', { insertedData, insertError });

            if (insertError) {
                console.error("Erreur Supabase:", insertError);
                setError(`Erreur: ${insertError.message || insertError.code || "Erreur inconnue"}`);
                setIsSubmitting(false);
                return;
            }

            if (!insertedData || insertedData.length === 0) {
                console.error("⚠️ Aucune donnée retournée - possible problème RLS");
                setError("Erreur: La réservation n'a pas été enregistrée. Contactez l'administrateur.");
                setIsSubmitting(false);
                return;
            }

            console.log('✅ Réservation enregistrée avec succès:', insertedData);

            // Formater la date pour les emails
            const dateForEmail = new Date(formData.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            // Mettre la première lettre en majuscule
            const formattedDate = dateForEmail.charAt(0).toUpperCase() + dateForEmail.slice(1);

            // Envoyer les emails (client + admin)
            try {
                // Email de confirmation au client
                if (formData.email) {
                    await fetch('/api/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            to: formData.email,
                            clientName: formData.nom,
                            service: formData.prestation,
                            date: formattedDate,
                            time: formData.heure,
                            type: 'appointment-confirmation'
                        })
                    });
                    console.log('📧 Email confirmation client envoyé');
                }

                // Notification au gérant
                await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        clientName: formData.nom,
                        clientPhone: formData.telephone,
                        clientEmail: formData.email || undefined,
                        service: formData.prestation,
                        date: formattedDate,
                        time: formData.heure,
                        type: 'admin-new-reservation'
                    })
                });
                console.log('📧 Notification admin envoyée');
            } catch (emailErr) {
                console.warn('⚠️ Emails non envoyés:', emailErr);
                // On continue même si les emails échouent
            }

            setIsSuccess(true);
            await fetchBookedSlots(formData.date);
            setFormData({ nom: "", telephone: "", email: "", prestation: "", date: "", heure: "", message: "" });
        } catch (err) {
            console.error("Erreur:", err);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <FormWrapper>
            {isSuccess ? (
                <FormSuccessMessage
                    title="Réservation envoyée !"
                    message="Nous vous confirmerons votre rendez-vous très rapidement."
                    subMessage="Un mail de confirmation vous sera envoyé."
                    onReset={() => setIsSuccess(false)}
                    resetButtonText="Nouvelle réservation"
                />
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* NOM + TELEPHONE */}
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

                    {/* EMAIL */}
                    <FormInput
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                    />

                    {/* PRESTATION */}
                    <FormSelect
                        id="prestation"
                        name="prestation"
                        label="Prestation"
                        labelExtra={<span className="text-[#C6A667] text-xs">(Lien pour les rendez-vous locks et tresses plus bas )</span>}
                        required
                        value={formData.prestation}
                        onChange={handleChange}
                        options={prestations}
                        placeholder="Choisissez une prestation"
                    />

                    {/* DATE + HEURE */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormDatePicker
                            id="date"
                            name="date"
                            label="Date souhaitée"
                            required
                            min={today}
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <FormSelect
                            id="heure"
                            name="heure"
                            label="Heure souhaitée"
                            required
                            value={formData.heure}
                            onChange={handleChange}
                            options={creneaux}
                            placeholder="Choisir un créneau"
                            loading={loadingSlots}
                            loadingText="Chargement..."
                        />
                    </div>

                    {/* MESSAGE */}
                    <FormTextarea
                        id="message"
                        name="message"
                        label="Remarques (optionnel)"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Informations supplémentaires..."
                        rows={3}
                    />

                    {/* ERROR MESSAGE */}
                    {error && <FormErrorMessage message={error} />}

                    {/* INFO */}
                    <p className="text-sm text-[#888] italic">
                        La confirmation de votre rendez-vous sera envoyée par email.
                    </p>

                    {/* SUBMIT */}
                    <FormSubmitButton isSubmitting={isSubmitting}>
                        Réserver mon créneau
                    </FormSubmitButton>
                </form>
            )}
        </FormWrapper>
    );
}
