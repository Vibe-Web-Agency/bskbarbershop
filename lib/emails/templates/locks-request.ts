// lib/emails/templates/locks-request.ts
// Template pour les demandes de RDV Locks/Tresses

interface LocksRequestParams {
    clientName: string;
    service: string;
}

export function getLocksRequestTemplate({ clientName, service }: LocksRequestParams): string {
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
                                Locks • Tresses • Coiffure
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="background-color: #1a1a1a; padding: 40px;">
                            <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 22px;">
                                Bonjour ${clientName} 👋
                            </h2>
                            
                            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin: 0 0 25px 0;">
                                Nous avons bien reçu votre demande de rendez-vous pour la prestation suivante :
                            </p>
                            
                            <!-- Service Box -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="background: linear-gradient(135deg, rgba(201, 162, 39, 0.15) 0%, rgba(201, 162, 39, 0.05) 100%); border-left: 4px solid #C9A227; padding: 20px; border-radius: 0 12px 12px 0;">
                                        <p style="color: #C9A227; font-size: 20px; font-weight: 600; margin: 0;">
                                            ✨ ${service}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #e0e0e0; font-size: 16px; line-height: 1.8; margin: 25px 0;">
                                Notre équipe vous recontactera <strong style="color: #C9A227;">très prochainement</strong> pour confirmer les détails de votre rendez-vous.
                            </p>
                            
                            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0; padding-top: 20px; border-top: 1px solid #333;">
                                💡 <em>Pour toute question ou modification, n'hésitez pas à nous contacter par WhatsApp.</em>
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
