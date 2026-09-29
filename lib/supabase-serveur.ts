import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase **serveur uniquement**.
 *
 * `lib/supabase.ts` construisait un client avec
 * `NEXT_PUBLIC_SUPABASE_ANON_KEY` et était importé par deux composants
 * `"use client"` : la clé partait donc dans le navigateur de chaque
 * visiteur. Avec elle, on pouvait lire la table `reservations` en entier —
 * noms, téléphones et e-mails de tous les commerces du projet, pas
 * seulement ceux du salon.
 *
 * Tous les accès passent désormais par les routes d'API, qui ne renvoient
 * que des comptages.
 *
 * Même approche que les sites de FiFi et de Toscana, qui partagent ce
 * projet Supabase.
 */

/*
 * Les variables sans préfixe sont préférées, celles avec `NEXT_PUBLIC_`
 * acceptées en repli.
 *
 * Ce repli n'affaiblit RIEN, et c'est le point à comprendre : une variable
 * `NEXT_PUBLIC_` n'est incluse dans le paquet du navigateur que là où elle
 * est RÉFÉRENCÉE. Ce fichier est serveur uniquement ; la valeur reste donc
 * côté serveur. Le trou n'était pas le nom de la variable, c'était le
 * composant « use client » qui importait le client Supabase.
 *
 * Sans ce repli, déployer avant d'avoir ajouté les nouvelles variables dans
 * Vercel aurait cassé le formulaire de réservation. Un correctif de sécurité
 * qui met le site hors service en attendant une manipulation est un
 * correctif qu'on repousse.
 */
const url = () => process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export const BUSINESS_ID =
  process.env.BUSINESS_ID ?? process.env.NEXT_PUBLIC_BUSINESS_ID ?? "";

function cle(): string {
  // La clé de service contourne les politiques RLS — c'est voulu côté
  // serveur, et c'est aussi pourquoi elle ne doit jamais en sortir.
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    ""
  );
}

export const configure = Boolean(url() && cle() && BUSINESS_ID);

export function client() {
  if (!configure) {
    throw new Error(
      "Supabase n'est pas configuré : il faut une URL, une clé et un BUSINESS_ID.",
    );
  }
  return createClient(url(), cle(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
