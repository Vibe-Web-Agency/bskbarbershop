import { NextResponse } from "next/server";
import { BUSINESS_ID, client, configure } from "@/lib/supabase-serveur";
import { MAX_PAR_CRENEAU, bornesDuJour, compterParCreneau, creneauValide } from "@/lib/creneaux";
import { adresse, tropDeRequetes } from "@/lib/limite-debit";

/**
 * Enregistre un rendez-vous.
 *
 * Tout ce qui décide est ici, côté serveur. Avant, le navigateur insérait
 * directement en base : il choisissait donc son `business_id`, lu dans une
 * variable publique, et la vérification « ce créneau est pris » se faisait
 * dans le composant — donc se contournait.
 *
 * Le salon n'a qu'un siège : deux clients sur le même créneau, ce sont deux
 * personnes qui attendent. Le contrôle de capacité compte donc vraiment.
 */
export const dynamic = "force-dynamic";

export async function POST(requete: Request) {
  if (!configure) {
    return NextResponse.json({ erreur: "Service indisponible" }, { status: 503 });
  }

  // Limite large à l'entrée : elle compte tout et arrête le martèlement.
  // La limite stricte est posée après la validation, pour ne pas pénaliser
  // quelqu'un qui corrige une faute de frappe.
  const ip = adresse(requete);
  if (tropDeRequetes(`rdv-brut:${ip}`, 30, 60_000)) {
    return NextResponse.json(
      { erreur: "Trop de tentatives. Merci de patienter une minute." },
      { status: 429 },
    );
  }

  let corps: {
    nom?: string;
    telephone?: string;
    email?: string;
    date?: string;
    heure?: string;
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
  const jour = (corps.date ?? "").trim();
  const heure = (corps.heure ?? "").trim();

  if (!nom || nom.length > 120) {
    return NextResponse.json({ erreur: "Merci d'indiquer votre nom." }, { status: 400 });
  }
  if (!telephone || telephone.length > 40) {
    return NextResponse.json({ erreur: "Merci d'indiquer un téléphone." }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(jour) || !creneauValide(heure)) {
    return NextResponse.json({ erreur: "Créneau invalide." }, { status: 400 });
  }

  const { debut, fin } = bornesDuJour(jour);
  const quandIso = new Date(
    new Date(debut).getTime() +
      (Number(heure.slice(0, 2)) * 60 + Number(heure.slice(3, 5))) * 60_000,
  ).toISOString();

  if (new Date(quandIso).getTime() < Date.now()) {
    return NextResponse.json({ erreur: "Ce créneau est déjà passé." }, { status: 400 });
  }

  if (tropDeRequetes(`rdv:${ip}`, 3, 60_000) || tropDeRequetes(`rdv-h:${ip}`, 10, 3_600_000)) {
    return NextResponse.json(
      { erreur: "Vous avez déjà pris plusieurs rendez-vous. Merci de nous appeler." },
      { status: 429 },
    );
  }

  const sb = client();

  // La capacité est revérifiée ICI, au moment d'écrire.
  const { data: dejaPris, error: erreurLecture } = await sb
    .from("reservations")
    .select("date")
    .eq("business_id", BUSINESS_ID)
    .gte("date", debut)
    .lte("date", fin);

  if (erreurLecture) {
    console.error("[reservations] lecture :", erreurLecture.message);
    return NextResponse.json({ erreur: "Enregistrement impossible" }, { status: 500 });
  }

  if ((compterParCreneau((dejaPris ?? []).map((r) => r.date as string))[heure] ?? 0) >= MAX_PAR_CRENEAU) {
    return NextResponse.json(
      { erreur: "Ce créneau vient d'être pris. Merci d'en choisir un autre." },
      { status: 409 },
    );
  }

  const prestation = (corps.prestation ?? "").trim();
  const note = (corps.message ?? "").trim();
  const message = prestation
    ? `Prestation: ${prestation}${note ? `\n\n${note}` : ""}`
    : note || null;

  const { error } = await sb.from("reservations").insert({
    // Jamais celui envoyé par le client : il vient de l'environnement du
    // serveur, donc il n'est pas négociable.
    business_id: BUSINESS_ID,
    service_id: null,
    customer_name: nom,
    customer_phone: telephone,
    customer_mail: (corps.email ?? "").trim() || null,
    date: quandIso,
    message,
    status: "scheduled",
  });

  if (error) {
    console.error("[reservations] insertion :", error.message);
    return NextResponse.json({ erreur: "Enregistrement impossible" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
