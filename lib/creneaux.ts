/**
 * Les créneaux du salon et la capacité, partagés entre le navigateur et le
 * serveur.
 *
 * Ils étaient calculés dans le composant du formulaire. Le serveur doit
 * pourtant appliquer EXACTEMENT les mêmes règles : une vérification faite
 * uniquement dans le navigateur se contourne avec la console, ou en
 * appelant l'API directement.
 */

/** Un siège, donc une personne à la fois. */
export const MAX_PAR_CRENEAU = 1;

/** Rendez-vous toutes les 45 minutes, de 10h00 à 19h30. */
function genererCreneaux(): string[] {
  const creneaux: string[] = [];
  for (let minutes = 10 * 60; minutes <= 19 * 60 + 30; minutes += 45) {
    creneaux.push(
      `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`,
    );
  }
  return creneaux;
}

export const CRENEAUX = genererCreneaux();

export function creneauValide(heure: string): boolean {
  return CRENEAUX.includes(heure);
}

/**
 * Compte les rendez-vous par créneau, à partir de leurs seules dates.
 *
 * Volontairement séparé de la requête : c'est la partie qu'on veut pouvoir
 * relire sans base, et elle ne voit jamais autre chose qu'une liste de
 * dates — aucun nom, aucun téléphone.
 */
export function compterParCreneau(dates: string[], fuseau = "Europe/Paris"): Record<string, number> {
  const comptes: Record<string, number> = {};
  for (const c of CRENEAUX) comptes[c] = 0;

  for (const iso of dates) {
    // L'heure du créneau est celle du salon, pas celle du serveur qui
    // exécute le code — Vercel tourne en UTC.
    const heure = new Intl.DateTimeFormat("fr-FR", {
      timeZone: fuseau,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(new Date(iso))
      .replace("h", ":");

    if (comptes[heure] !== undefined) comptes[heure]++;
  }

  return comptes;
}

/** Le jour parisien d'une date `AAAA-MM-JJ`, en bornes UTC. */
export function bornesDuJour(jour: string, fuseau = "Europe/Paris"): { debut: string; fin: string } {
  const versUtc = (local: string) => {
    const naif = new Date(`${local}Z`);
    const enFuseau = new Date(
      new Intl.DateTimeFormat("sv-SE", {
        timeZone: fuseau,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
        .format(naif)
        .replace(" ", "T") + "Z",
    );
    // Deux fois l'instant naïf moins sa lecture dans le fuseau : c'est la
    // conversion inverse. Passer par `Intl` évite un décalage codé en dur,
    // qui se tromperait six mois par an.
    return new Date(naif.getTime() * 2 - enFuseau.getTime()).toISOString();
  };

  return { debut: versUtc(`${jour}T00:00:00`), fin: versUtc(`${jour}T23:59:59.999`) };
}
