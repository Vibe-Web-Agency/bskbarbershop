import { createClient } from '@supabase/supabase-js'

/**
 * Client Supabase **serveur uniquement**.
 *
 * Il était importé par deux composants « use client » — le formulaire de
 * réservation et celui des locks — donc la clé partait dans le paquet servi
 * à chaque visiteur. Avec elle, on pouvait lire la table `reservations` en
 * entier : noms, téléphones et e-mails de tous les commerces du projet, pas
 * seulement ceux du salon.
 *
 * Ces deux formulaires passent désormais par des routes d'API. Ce fichier
 * n'est plus importé que par des composants serveur ; il reste en place
 * pour eux.
 *
 * C'est aussi le SEUL endroit du projet qui construit un client. Trois
 * fichiers le faisaient chacun de leur côté avec `NEXT_PUBLIC_*` : autant
 * d'endroits où rendre un composant interactif aurait relâché la clé, et
 * autant de chaînes de repli à tenir à jour.
 *
 * Les variables sans préfixe sont préférées, celles avec `NEXT_PUBLIC_`
 * acceptées en repli. Ça n'affaiblit rien : une variable `NEXT_PUBLIC_`
 * n'est incluse dans le paquet du navigateur que là où elle est RÉFÉRENCÉE.
 */
const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) throw new Error("Supabase n'est pas configuré (URL ou clé manquante)")

export const supabase = createClient(url, key)

export const BUSINESS_ID =
    process.env.BUSINESS_ID ?? process.env.NEXT_PUBLIC_BUSINESS_ID ?? ''
