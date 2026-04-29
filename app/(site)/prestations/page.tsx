import { supabase, BUSINESS_ID } from "@/lib/supabase";
import Category from "@/components/site/prestations/Category";
import SoinComplet from "@/components/site/prestations/SoinComplet";
import HeaderPrestations from "@/components/site/prestations/HeaderPrestations";
import Link from "next/link";

export const revalidate = 60;

// Ordre d'affichage des catégories
const CATEGORY_ORDER = [
  "Coiffure",
  "Tresses",
  "Locks / Retwist",
  "Locks Crochet",
  "Soins à la carte",
];

// Titre affiché sur la page (peut différer du slug en DB)
const CATEGORY_DISPLAY: Record<string, string> = {
  "Coiffure":          "Coiffure",
  "Tresses":           "Tresses",
  "Locks / Retwist":   "Locks - Retwist",
  "Locks Crochet":     "Locks - Crochet",
  "Soins à la carte":  "Soins à la carte",
};

function formatPrice(price: number | null, description: string | null): string {
  const rangeMatch = description?.match(/:\s*(\d[\d\-]*€)/)
  if (rangeMatch) return rangeMatch[1];
  if (description?.toLowerCase().includes("à partir de")) return `+${price}€`;
  if (description?.startsWith("*")) return `${price}€*`;
  if (price != null) return `${price}€`;
  return "—";
}

// Ne pas afficher les descriptions qui sont des notes de prix internes
function displayDescription(description: string | null): string | null {
  if (!description) return null;
  if (description.startsWith("Prix variable")) return null;
  if (description.toLowerCase().includes("à partir de")) return null;
  if (description.startsWith("*")) return null;
  return description;
}

export default async function PrestationsPage() {
  const { data, error } = await supabase
    .from("services")
    .select("id, name, description, price, category, display_order")
    .eq("business_id", BUSINESS_ID)
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) console.error("[prestations] Supabase error:", error.message, error.code);

  const services = data || [];

  // Grouper par catégorie
  const grouped: Record<string, { name: string; price: string; description: string | null }[]> = {};
  for (const s of services) {
    if (!s.category || s.category === "Soin visage complet") continue;
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push({
      name: s.name,
      price: formatPrice(s.price, s.description),
      description: displayDescription(s.description),
    });
  }

  // Soin visage complet — steps dans description séparés par "·"
  const soin = services.find(s => s.category === "Soin visage complet");
  const soinSteps = soin?.description
    ? soin.description.split("·").map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-[#1B1C1E] text-[#D0D0D0]">
      <HeaderPrestations />

      <section className="w-full py-16">
        <div className="max-w-5xl mx-auto px-6">

          {CATEGORY_ORDER.map(cat =>
            grouped[cat]?.length > 0 ? (
              <Category
                key={cat}
                title={CATEGORY_DISPLAY[cat]}
                items={grouped[cat]}
              />
            ) : null
          )}

          {soin && (
            <SoinComplet
              price={formatPrice(soin.price, null)}
              steps={soinSteps}
            />
          )}

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
