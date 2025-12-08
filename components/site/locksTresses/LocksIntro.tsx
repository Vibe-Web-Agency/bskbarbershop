import Link from "next/link";
import BtnRDVLocksTresses from "@/components/site/locksTresses/BtnRDVLocksTresses";

export default function LocksIntro() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-16 text-center">
            <p className="text-lg text-[#D0D0D0] max-w-3xl mx-auto leading-relaxed">
                Toutes les prestations Locks et Tresses sont réalisées sur demande afin
                de garantir un résultat sur mesure adapté à votre texture de cheveux et
                à votre style.
            </p>

            <p className="mt-4 text-[#C6A667]">
                Pour un devis précis, merci d’envoyer une photo de vos cheveux via WhatsApp.
            </p>

            <BtnRDVLocksTresses />

            <p className="text-lg text-[#D0D0D0] max-w-3xl mx-auto leading-relaxed pt-12">
                Pour toutes autres prestations, merci de nous reserver <Link href="/reserver" className="text-[#C6A667]">ici.</Link>
            </p>

            <p className="text-[#C6A667] pt-4">
                Merci de ne pas remplir le formulaire de contact ci-dessus.
                Il est destiné exclusivement aux prestations Locks et Tresses.
            </p>
        </section>
    );
}
