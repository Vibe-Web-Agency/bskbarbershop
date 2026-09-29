import { NextResponse } from "next/server";
import { BUSINESS_ID, client, configure } from "@/lib/supabase-serveur";
import { adresse, tropDeRequetes } from "@/lib/limite-debit";

/**
 * Enregistre une demande de devis (locks et tresses).
 *
 * Deux corrections par rapport au formulaire précédent :
 *
 * 1. Il n'écrit plus depuis le navigateur, donc la clé ne part plus dans la
 *    page.
 * 2. Il écrit `business_id` et non `user_id`. La table `quotes` n'a PAS de
 *    colonne `user_id` : l'insertion échouait donc à chaque fois, et la
 *    demande n'arrivait nulle part. Le formulaire affichait pourtant une
 *    erreur technique, pas un succès — d'où le doute à lever : est-ce que
 *    des clientes ont renoncé en la voyant ?
 */
export const dynamic = "force-dynamic";

export async function POST(requete: Request) {
  if (!configure) {
    return NextResponse.json({ erreur: "Service indisponible" }, { status: 503 });
  }

  const ip = adresse(requete);
  if (tropDeRequetes(`devis-brut:${ip}`, 20, 60_000)) {
    return NextResponse.json(
      { erreur: "Trop de tentatives. Merci de patienter une minute." },
      { status: 429 },
    );
  }

  let corps: {
    nom?: string;
    telephone?: string;
    email?: string;
    prestation?: string;
    message?: string;
  };
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ erreur: "Requête illisible" }, { status: 400 });
  }

  const nom = (corps.nom ?? "").trim();
  const telephone = (corps.telephone ?? "").trim();
  const email = (corps.email ?? "").trim().toLowerCase();

  if (!nom || nom.length > 120) {
    return NextResponse.json({ erreur: "Merci d'indiquer votre nom." }, { status: 400 });
  }
  if (!telephone || telephone.length > 40) {
    return NextResponse.json({ erreur: "Merci d'indiquer un téléphone." }, { status: 400 });
  }
  if (email && (!email.includes("@") || email.length > 200)) {
    return NextResponse.json({ erreur: "Adresse e-mail invalide." }, { status: 400 });
  }

  if (tropDeRequetes(`devis:${ip}`, 2, 60_000) || tropDeRequetes(`devis-h:${ip}`, 5, 3_600_000)) {
    return NextResponse.json(
      { erreur: "Vous avez déjà envoyé une demande. Nous vous répondons vite." },
      { status: 429 },
    );
  }

  const prestation = (corps.prestation ?? "").trim();
  const note = (corps.message ?? "").trim();

  const { error } = await client().from("quotes").insert({
    business_id: BUSINESS_ID,
    customer_name: nom,
    customer_phone: telephone,
    customer_email: email || null,
    service: prestation.slice(0, 200) || null,
    message: `Prestation : ${prestation}${note ? `\n\n${note}` : ""}`,
    status: "pending",
  });

  if (error) {
    console.error("[devis] insertion :", error.message);
    return NextResponse.json({ erreur: "Enregistrement impossible" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
