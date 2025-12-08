import Link from "next/link";

export default function ServicesIntro() {
  return (
    <section className="w-full py-24 bg-[#1B1C1E]">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Nos prestations
        </h2>

        <p className="text-[#D0D0D0] text-lg md:text-xl max-w-3xl mx-auto">
          Coiffure, tresses, locks et soins visage.  
          Découvrez un savoir-faire complet au service de votre style.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
          <CategoryBox title="Coiffure">
            Dégradés, contours, barbe, colorations…  
          </CategoryBox>

          <CategoryBox title="Tresses">
            Vanilles, nattes et styles variés.
          </CategoryBox>

          <CategoryBox title="Locks">
            Retwist, crochet et départ locks.
          </CategoryBox>

          <CategoryBox title="Soins à la carte">
            Nettoyage, gommage, masque, extraction…
          </CategoryBox>

          <CategoryBox title="Soin visage complet">
            Soin complet en plusieurs étapes.
          </CategoryBox>
        </div>

        <Link
          href="/prestations"
          className="mt-16 inline-block px-8 py-3 rounded-md bg-[#C6A667] text-black font-semibold hover:bg-[#9B8452] transition"
        >
          Voir prestations & tarifs
        </Link>
      </div>
    </section>
  );
}

function CategoryBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#232426] p-6 rounded-lg border border-white/10">
      <h3 className="text-xl font-semibold text-[#C6A667] mb-3">{title}</h3>
      <p className="text-[#D0D0D0] text-sm leading-relaxed">{children}</p>
    </div>
  );
}
