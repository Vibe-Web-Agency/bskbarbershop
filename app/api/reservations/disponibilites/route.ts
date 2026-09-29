import { NextResponse } from "next/server";
import { BUSINESS_ID, client, configure } from "@/lib/supabase-serveur";
import { bornesDuJour, compterParCreneau } from "@/lib/creneaux";

/**
 * Les créneaux occupés d'une journée.
 *
 * Ne renvoie que des COMPTAGES. Le navigateur n'a jamais besoin de savoir
 * QUI a rendez-vous pour afficher « complet » : il lui faut un nombre. La
 * version précédente lisait la table depuis le navigateur, avec la clé
 * embarquée dans la page.
 */
export const dynamic = "force-dynamic";

export async function GET(requete: Request) {
  if (!configure) {
    return NextResponse.json({ erreur: "Service indisponible" }, { status: 503 });
  }

  const jour = new URL(requete.url).searchParams.get("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(jour)) {
    return NextResponse.json({ erreur: "Date attendue au format AAAA-MM-JJ" }, { status: 400 });
  }

  const { debut, fin } = bornesDuJour(jour);

  const { data, error } = await client()
    .from("reservations")
    .select("date")
    .eq("business_id", BUSINESS_ID)
    .gte("date", debut)
    .lte("date", fin);

  if (error) {
    console.error("[disponibilites]", error.message);
    return NextResponse.json({ erreur: "Lecture impossible" }, { status: 500 });
  }

  return NextResponse.json({
    creneaux: compterParCreneau((data ?? []).map((r) => r.date as string)),
  });
}
