// lib/emails/templates/admin-new-reservation.ts
// Template pour notifier le gérant d'une nouvelle réservation

interface AdminNewReservationParams {
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    service: string;
    date: string;
    time: string;
}

export function getAdminNewReservationTemplate({
    clientName,
    clientPhone,
    clientEmail,
    service,
    date,
    time
}: AdminNewReservationParams): string {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Segoe UI', Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px 40px; border-radius: 16px 16px 0 0;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td>
                                        <h1 style="color: #C9A227; margin: 0; font-size: 22px; font-weight: 700;">
                                            BSK BARBERSHOP
                                        </h1>
                                        <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
                                            Notification Admin
                                        </p>
                                    </td>
                                    <td style="text-align: right;">
                                        <div style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 8px 16px; border-radius: 20px;">
                                            <span style="color: #ffffff; font-size: 12px; font-weight: 600;">
                                                📅 NOUVELLE RÉSA
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #1a1a1a; padding: 35px 40px;">
                            <h2 style="color: #3b82f6; margin: 0 0 25px 0; font-size: 20px;">
                                🔔 Nouvelle réservation reçue !
                            </h2>
                            
                            <!-- Client Info Box -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #141414; border: 1px solid #2a2a2a; border-radius: 12px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">
                                            Informations Client
                                        </p>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #2a2a2a;">
                                                    <span style="color: #888; font-size: 13px;">👤 Nom</span>
                                                    <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 3px 0 0 0;">
                                                        ${clientName}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #2a2a2a;">
                                                    <span style="color: #888; font-size: 13px;">📞 Téléphone</span>
                                                    <p style="color: #ffffff; font-size: 16px; margin: 3px 0 0 0;">
                                                        <a href="tel:${clientPhone.replace(/\s/g, '')}" style="color: #3b82f6; text-decoration: none;">${clientPhone}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            ${clientEmail ? `
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span style="color: #888; font-size: 13px;">✉️ Email</span>
                                                    <p style="color: #ffffff; font-size: 16px; margin: 3px 0 0 0;">
                                                        <a href="mailto:${clientEmail}" style="color: #3b82f6; text-decoration: none;">${clientEmail}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            ` : ''}
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Reservation Details Box -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <p style="color: #888; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">
                                            Détails Réservation
                                        </p>
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">
                                                    <span style="color: #888; font-size: 13px;">✂️ Prestation</span>
                                                    <p style="color: #3b82f6; font-size: 18px; font-weight: 600; margin: 3px 0 0 0;">
                                                        ${service}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">
                                                    <span style="color: #888; font-size: 13px;">📅 Date</span>
                                                    <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 3px 0 0 0;">
                                                        ${date}
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <span style="color: #888; font-size: 13px;">🕐 Heure</span>
                                                    <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 3px 0 0 0;">
                                                        ${time}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Action Button -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 25px;">
                                <tr>
                                    <td align="center">
                                        <a href="https://bskbarbershop.fr/dashboard/reservations" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                                            Voir dans le Dashboard →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #141414; padding: 20px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #2a2a2a; text-align: center;">
                            <p style="color: #555; font-size: 11px; margin: 0;">
                                Notification automatique - ${new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
}
