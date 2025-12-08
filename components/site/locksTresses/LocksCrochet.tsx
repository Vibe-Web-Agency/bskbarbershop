import Image from "next/image";

export default function LocksCrochet() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

      <div>
        <h2 className="text-3xl font-bold mb-4">Locks – Crochet</h2>

        <p className="text-[#D0D0D0] leading-relaxed mb-4">
          La méthode crochet est idéale pour créer des locks denses et homogènes ou
          pour renforcer des locks existantes. Le résultat est immédiat, naturel et sans produits chimiques.
        </p>

        <p className="text-[#D0D0D0] leading-relaxed mb-4">
          Travail minutieux lock par lock, cette technique demande une grande expertise
          pour assurer une finition durable et harmonieuse.
        </p>

        <p className="text-[#C6A667] italic">
          Le prix dépend de la longueur et de la densité de vos cheveux. Diagnostic photo requis.
        </p>
      </div>


      <div className="relative w-full h-[380px] rounded-xl overflow-hidden shadow-xl">
        <Image
          src="/assets/photos/IMG_0554.jpeg"
          alt="Locks Crochet BSK"
          fill
          className="object-cover"
        />
      </div>

    </section>
  );
}
