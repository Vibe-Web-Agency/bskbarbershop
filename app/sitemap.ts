import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://www.bskbarbershop.fr";
    const now = new Date();

    return [
        { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${base}/prestations`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${base}/reserver`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${base}/locks-tresses`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/galerie`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${base}/avis`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${base}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    ];
}
