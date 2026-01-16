// lib/emails/templates/appointment-confirmation.ts
// Template pour les confirmations de RDV classiques (coupe, barbe, etc.)

interface AppointmentConfirmationParams {
    clientName: string;
    service: string;
    date: string;      // Format: "Samedi 21 Décembre 2024"
    time: string;      // Format: "14:30"
}

export function getAppointmentConfirmationTemplate({
    clientName,
    service,
    date,
    time
}: AppointmentConfirmationParams): string {
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
                        <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px; border-radius: 16px 16px 0 0; text-align: center;">
                            <h1 style="color: #C9A227; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
                                BSK BARBERSHOP
                            </h1>
                            <p style="color: #888; margin: 10px 0 0 0; font-size: 14px;">
                                Barbier • Coiffeur
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Success Badge -->
                    <tr>
                        <td style="background-color: #1a1a1a; padding: 30px 40px 0 40px; text-align: center;">
                            <div style="display: inline-block; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 12px 30px; border-radius: 50px;">
                                <span style="color: #ffffff; font-size: 16px; font-weight: 600;">
                                    ✅ Rendez-vous Confirmé
                                </span>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #1a1a1a; padding: 30px 40px 40px 40px;">
                            <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 22px;">
                                Bonjour ${clientName} 👋
                            </h2>
                            
                            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0;">
                                Votre rendez-vous est confirmé ! Voici les détails :
                            </p>
                            
                            <!-- Appointment Details Box -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, rgba(201, 162, 39, 0.02) 100%); border: 1px solid rgba(201, 162, 39, 0.3); border-radius: 12px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <!-- Service -->
                                            <tr>
                                                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                                    <span style="color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Prestation</span>
                                                    <p style="color: #C9A227; font-size: 18px; font-weight: 600; margin: 5px 0 0 0;">
                                                        ✂️ ${service}
                                                    </p>
                                                </td>
                                            </tr>
                                            <!-- Date -->
                                            <tr>
                                                <td style="padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                                                    <span style="color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Date</span>
                                                    <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 5px 0 0 0;">
                                                        📅 ${date}
                                                    </p>
                                                </td>
                                            </tr>
                                            <!-- Time -->
                                            <tr>
                                                <td style="padding: 15px 0 10px 0;">
                                                    <span style="color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Heure</span>
                                                    <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 5px 0 0 0;">
                                                        🕐 ${time}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #e0e0e0; font-size: 15px; line-height: 1.8; margin: 25px 0 0 0;">
                                Nous vous attendons au salon ! En cas d'empêchement, merci de nous prévenir au moins <strong style="color: #C9A227;">24h à l'avance</strong>.
                            </p>
                            
                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; padding-top: 20px; border-top: 1px solid #333;">
                                💡 <em>Pour toute modification ou annulation, contactez-nous par téléphone ou WhatsApp.</em>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #141414; padding: 30px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #2a2a2a;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="color: #888; font-size: 13px; line-height: 1.8;">
                                        <p style="margin: 0 0 5px 0;">📍 10 rue du Vieux Pilori, 78200 Mantes-la-Jolie</p>
                                        <p style="margin: 0 0 5px 0;">📞 <a href="tel:0782451173">07 82 45 11 73</a></p>
                                        <p style="margin: 0;">🌐 <a href="https://bskbarbershop.fr">bskbarbershop.fr</a></p>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #555; font-size: 11px; margin: 20px 0 0 0; text-align: center;">
                                © ${new Date().getFullYear()} BSK Barbershop - Tous droits réservés
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
