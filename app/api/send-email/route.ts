// app/api/send-email/route.ts
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import {
    getLocksRequestTemplate,
    getAppointmentConfirmationTemplate,
    getAdminNewReservationTemplate,
    getAdminNewQuoteTemplate
} from "@/lib/emails/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

// Email du gérant pour les notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "contact@bskbarbershop.fr";

type EmailType =
    | 'locks-request'
    | 'appointment-confirmation'
    | 'admin-new-reservation'
    | 'admin-new-quote';

interface EmailRequestBody {
    to?: string;  // Optionnel pour les emails admin (on utilise ADMIN_EMAIL)
    clientName: string;
    clientPhone?: string;
    clientEmail?: string;
    service: string;
    type: EmailType;
    // Pour les confirmations de RDV classiques
    date?: string;
    time?: string;
    // Pour les demandes de devis
    message?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: EmailRequestBody = await request.json();
        const { to, clientName, clientPhone, clientEmail, service, type, date, time, message } = body;

        // Validation des champs requis
        if (!clientName || !service || !type) {
            return NextResponse.json(
                { error: "Champs requis manquants (clientName, service, type)" },
                { status: 400 }
            );
        }

        let htmlContent: string;
        let subject: string;
        let recipient: string;

        // Sélection du template selon le type
        switch (type) {
            // ===== EMAILS CLIENTS =====
            case 'locks-request':
                if (!to) {
                    return NextResponse.json(
                        { error: "Email du client requis" },
                        { status: 400 }
                    );
                }
                htmlContent = getLocksRequestTemplate({ clientName, service });
                subject = "Demande de rendez-vous Locks/Tresses - BSK Barbershop";
                recipient = to;
                break;

            case 'appointment-confirmation':
                if (!to || !date || !time) {
                    return NextResponse.json(
                        { error: "Email, date et heure requis pour les confirmations" },
                        { status: 400 }
                    );
                }
                htmlContent = getAppointmentConfirmationTemplate({
                    clientName,
                    service,
                    date,
                    time
                });
                subject = "✅ Rendez-vous confirmé - BSK Barbershop";
                recipient = to;
                break;

            // ===== EMAILS ADMIN =====
            case 'admin-new-reservation':
                if (!clientPhone || !date || !time) {
                    return NextResponse.json(
                        { error: "Téléphone, date et heure requis pour les notifications admin" },
                        { status: 400 }
                    );
                }
                htmlContent = getAdminNewReservationTemplate({
                    clientName,
                    clientPhone,
                    clientEmail,
                    service,
                    date,
                    time
                });
                subject = `📅 Nouvelle réservation - ${clientName} - ${service}`;
                recipient = ADMIN_EMAIL;
                break;

            case 'admin-new-quote':
                if (!clientPhone) {
                    return NextResponse.json(
                        { error: "Téléphone requis pour les notifications devis" },
                        { status: 400 }
                    );
                }
                htmlContent = getAdminNewQuoteTemplate({
                    clientName,
                    clientPhone,
                    clientEmail,
                    service,
                    message
                });
                subject = `✨ Nouvelle demande devis - ${clientName} - ${service}`;
                recipient = ADMIN_EMAIL;
                break;

            default:
                return NextResponse.json(
                    { error: `Type d'email inconnu: ${type}` },
                    { status: 400 }
                );
        }

        // Envoi de l'email via Resend
        const { data, error } = await resend.emails.send({
            from: "BSK Barbershop <contact@bskbarbershop.fr>",
            to: recipient,
            subject: subject,
            html: htmlContent,
        });

        if (error) {
            console.error("❌ Erreur Resend:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        console.log(`✅ Email "${type}" envoyé à ${recipient}`);
        return NextResponse.json({ success: true, data });

    } catch (err) {
        console.error("❌ Erreur API email:", err);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}
