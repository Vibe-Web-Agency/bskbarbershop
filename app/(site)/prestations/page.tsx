import { services } from "@/data/prix";
import Category from "@/components/site/prestations/Category";
import SoinComplet from "@/components/site/prestations/SoinComplet";
import HeaderPrestations from "@/components/site/prestations/HeaderPrestations";
import Link from "next/link";

export default function PrestationsPage() {
  return (
    <div className="bg-[#1B1C1E] text-[#D0D0D0]">
      <HeaderPrestations />

      <section className="w-full py-16">
        <div className="max-w-5xl mx-auto px-6">

          <Category title="Coiffure" items={services.coiffure} />
          <Category title="Tresses" items={services.tresses} />
          <Category title="Locks - Retwist" items={services.locksRetwist} />
          <Category title="Locks - Crochet" items={services.locksCrochet} />
          <Category title="Soins à la carte" items={services.soinsAlaCarte} />

          <SoinComplet
            price={services.soinVisageComplet[0].price}
            steps={services.soinVisageComplet[0].steps}
          />

          <div className="text-center mt-16">
            <Link
              href="/reserver"
              className="inline-block px-8 py-3 rounded-md bg-[#C6A667] text-black font-semibold hover:bg-[#9B8452] transition"
            >
              Prendre rendez-vous
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
