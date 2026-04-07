import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Police principale - moderne et élégante
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Police pour les titres - luxe et sophistiquée
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BSK Barber 💈",
    default: "BSK Barber 💈 Coiffeur & Barbier Expert | Réservez en Ligne !",
  },
  description: "Envie d'une coupe parfaite ? BSK Barber est votre spécialiste en dégradés, barbe, locks et tresses ! ✂️ Gagnez du temps et réservez votre créneau en ligne.",
  keywords: [
    "Barbershop",
    "Coiffeur homme",
    "Barbier",
    "Coupes afro",
    "Tresses",
    "Locks",
    "Dégradé",
    "Réservation barber en ligne",
    "BSK Barber",
    "Entretien barbe",
  ],
  authors: [{ name: "BSK Barber" }],
  creator: "BSK Barber",
  openGraph: {
    title: "BSK Barber 💈 Votre Coiffeur & Barbier Expert",
    description: "Besoin d'un rafraîchissement ou d'une nouvelle coupe ? Découvrez BSK Barber, spécialiste en coiffure homme, barbe et afro. Réservez votre créneau en 2 clics !",
    siteName: "BSK Barber",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "BSK Barber 💈 Coiffeur & Barbier Expert",
    description: "Envie d'une coupe parfaite ? BSK Barber est votre spécialiste en dégradés, barbe, locks et tresses ! ✂️ Réservez votre créneau en ligne.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* VWA Tracker */}
        <Script
          src={`https://tracker-production-9a75.up.railway.app/track.js?id=${process.env.NEXT_PUBLIC_BUSINESS_ID}`}
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HCG82NENYK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HCG82NENYK');
          `}
        </Script>
      </head>
      <body
        className={`${outfit.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
