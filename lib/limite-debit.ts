/**
 * Limiteur de débit en mémoire, sans dépendance.
 *
 * Les formulaires écrivaient directement en base depuis le navigateur :
 * n'importe qui pouvait donc insérer des réservations en boucle. Le passage
 * par une route d'API ferme cette porte, mais il faut encore empêcher qu'on
 * la martèle.
 *
 * Limite : le compteur vit dans la mémoire de l'instance. Sur plusieurs
 * instances, chacune a le sien. C'est suffisant pour décourager un formulaire
 * rejoué à la main, pas pour résister à une attaque distribuée — et c'est
 * assumé : le vrai verrou est que la clé ne quitte plus le serveur.
 */

const passages = new Map<string, number[]>();

export function tropDeRequetes(cle: string, max: number, fenetreMs: number): boolean {
  const maintenant = Date.now();
  const recentes = (passages.get(cle) ?? []).filter((t) => maintenant - t < fenetreMs);

  if (recentes.length >= max) {
    passages.set(cle, recentes);
    return true;
  }

  recentes.push(maintenant);
  passages.set(cle, recentes);

  // Ménage occasionnel : sans ça, la carte grandit indéfiniment.
  if (passages.size > 5000) {
    for (const [k, v] of passages) {
      if (v.every((t) => maintenant - t >= fenetreMs)) passages.delete(k);
    }
  }
  return false;
}

/**
 * L'adresse du client.
 *
 * On prend la PREMIÈRE entrée de `x-forwarded-for` : c'est celle du client,
 * les suivantes étant les relais. Prendre la dernière reviendrait à limiter
 * le relais, donc tout le monde d'un coup.
 */
export function adresse(requete: Request): string {
  const entete = requete.headers.get("x-forwarded-for");
  return entete?.split(",")[0]?.trim() || "inconnue";
}
