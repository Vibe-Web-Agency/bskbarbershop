"use client";

import { useState, useEffect } from "react";
import { services } from "@/data/prix";
import { CRENEAUX, MAX_PAR_CRENEAU } from "@/lib/creneaux";
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
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        nom: "",
        telephone: "",
        email: "",
        prestation: "",
        date: today,
        heure: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookedSlots, setBookedSlots] = useState<Record<string, number>>({});
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Charger les créneaux réservés au démarrage (date du jour par défaut)
    useEffect(() => {
        fetchBookedSlots(today);
    }, []);

    // Vérifier si une date est un jour de fermeture
    const isClosedDay = (_dateStr: string): boolean => {
        return false; // Salon ouvert tous les jours
    };

    /*
     * Les créneaux occupés viennent d'une route d'API qui ne renvoie que des
     * COMPTAGES.
     *
     * Avant, ce composant lisait la table `reservations` directement depuis
     * le navigateur, avec une clé Supabase embarquée dans la page : n'importe
     * quel visiteur pouvait donc lire les noms, téléphones et e-mails de
     * toutes les réservations du projet — celles du salon comme celles des
     * deux restaurants qui partagent la même base.
     */
    const fetchBookedSlots = async (selectedDate: string) => {
        setLoadingSlots(true);
        try {
            const reponse = await fetch(`/api/reservations/disponibilites?date=${selectedDate}`);
            if (!reponse.ok) throw new Error("Lecture des créneaux impossible");
            const { creneaux } = await reponse.json();
            setBookedSlots(creneaux);
        } catch (err) {
            console.error("Erreur lors de la récupération des créneaux:", err);
        } finally {
            setLoadingSlots(false);
        }
    };

    // Vérifier si un créneau est disponible
    const isSlotAvailable = (slot: string): boolean => {
        if (!formData.date) return true;
        // La capacité vient de `lib/creneaux.ts`, partagé avec le serveur :
        // c'est lui qui décide vraiment, ce contrôle-ci évite juste un
        // aller-retour inutile.
        return (bookedSlots[slot] || 0) < MAX_PAR_CRENEAU;
    };

    // Vérifier si un créneau est dans le passé (pour aujourd'hui)
    const isSlotInPast = (slot: string): boolean => {
        if (!formData.date) return false;
        const today = new Date().toISOString().split('T')[0];
        if (formData.date !== today) return false;

        const now = new Date();
        const [slotHours, slotMinutes] = slot.split(':').map(Number);
        const slotTime = new Date();
        slotTime.setHours(slotHours, slotMinutes, 0, 0);

        return slotTime <= now;
    };

    // Les créneaux viennent de `lib/creneaux.ts` : le serveur doit refuser
    // exactement ce que le formulaire n'affiche pas.
    const creneaux: SelectOption[] = [];
    for (const slot of CRENEAUX) {
        if (isSlotInPast(slot)) continue;
        const available = isSlotAvailable(slot);
        creneaux.push({
            value: slot,
            label: `${slot}${!available ? " ── complet" : ""}`,
            disabled: !available,
        });
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
            if (isClosedDay(value)) {
                setError("Le salon est fermé le lundi. Veuillez choisir un autre jour.");
                setFormData({ ...formData, date: value, heure: '' });
                setBookedSlots({});
            } else {
                setError(null);
                fetchBookedSlots(value);
                setFormData({ ...formData, date: value, heure: '' });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setError(null);

        // Vérification jour de fermeture (lundi)
        if (isClosedDay(formData.date)) {
            setError("Le salon est fermé le lundi. Veuillez choisir un autre jour.");
            setIsSubmitting(false);
            return;
        }

        try {
            /*
             * Plus de contrôle de disponibilité ici.
             *
             * Celui qui s'y trouvait interrogeait la base depuis le
             * navigateur ET autorisait 2 rendez-vous par créneau, alors que
             * l'affichage n'en annonçait qu'1 : le salon pouvait donc se
             * retrouver avec deux clients à la même heure. Le serveur
             * revérifie désormais, avec la seule valeur qui fait foi,
             * `MAX_PAR_CRENEAU`, partagée avec l'affichage.
             */
            const reponse = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom: formData.nom,
                    telephone: formData.telephone,
                    email: formData.email || null,
                    // La date et l'heure partent séparément : c'est le serveur
                    // qui les assemble dans le fuseau du salon. Les assembler
                    // ici donnait l'heure du navigateur du visiteur.
                    date: formData.date,
                    heure: formData.heure,
                    prestation: formData.prestation,
                    message: formData.message || null,
                }),
            });

            if (!reponse.ok) {
                const { erreur } = await reponse.json().catch(() => ({}));
                setError(erreur || "Nous n'avons pas pu enregistrer votre rendez-vous.");
                setIsSubmitting(false);
                return;
            }


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

    return (
        <FormWrapper>
            {isSuccess ? (
                <FormSuccessMessage
                    title="Réservation confirmée !"
                    message="Merci pour votre confiance. Nous avons hâte de vous accueillir."
                    // subMessage=""
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
                        required
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
                        {formData.date && isClosedDay(formData.date) ? (
                            <div className="flex items-center">
                                <p className="text-[#C6A667] text-sm font-medium">
                                    Fermé le lundi
                                </p>
                            </div>
                        ) : (
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
                        )}
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
