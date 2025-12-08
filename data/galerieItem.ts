// Types de la galerie
export interface GalleryItem {
    id: number;
    src: string;
    category: string;
    title: string;
    aspect: "portrait" | "landscape";
}

export interface GalleryCategory {
    id: string;
    label: string;
}


export const galleryItems: GalleryItem[] = [
    { id: 1, src: "/assets/photos/fade1.jpeg", category: "coupes", title: "Fade Classique", aspect: "portrait" },
    { id: 2, src: "/assets/photos/fade2.jpeg", category: "coupes", title: "Fade Dégradé", aspect: "portrait" },
    { id: 3, src: "/assets/photos/fade3.jpeg", category: "coupes", title: "Fade Premium", aspect: "portrait" },

    { id: 4, src: "/assets/photos/tresses.jpeg", category: "tresses", title: "Tresses Africaines", aspect: "portrait" },
    { id: 5, src: "/assets/photos/IMG_0141.jpeg", category: "tresses", title: "Tresses Femme", aspect: "portrait" },
    { id: 6, src: "/assets/photos/IMG_0269.jpeg", category: "tresses", title: "Tresses Homme", aspect: "portrait" },
    { id: 7, src: "/assets/photos/IMG_0324.jpeg", category: "tresses", title: "Locks Retwist", aspect: "portrait" },
    { id: 8, src: "/assets/photos/IMG_0512.jpeg", category: "tresses", title: "Tresses Collées", aspect: "portrait" },
    { id: 9, src: "/assets/photos/IMG_0554.jpeg", category: "tresses", title: "Vanilles", aspect: "portrait" },
    { id: 10, src: "/assets/photos/IMG_0725.jpeg", category: "tresses", title: "Locks Crochet", aspect: "portrait" },
    { id: 11, src: "/assets/photos/IMG_0734.jpeg", category: "tresses", title: "Tresses Style", aspect: "portrait" },
    { id: 12, src: "/assets/photos/IMG_0742.jpeg", category: "tresses", title: "Nattes Collées", aspect: "portrait" },
    { id: 13, src: "/assets/photos/IMG_0743.jpeg", category: "tresses", title: "Tresses Design", aspect: "portrait" },
    { id: 14, src: "/assets/photos/IMG_0820.jpeg", category: "tresses", title: "Locks Homme", aspect: "portrait" },

    // Le Salon
    { id: 15, src: "/assets/photos/sieges.jpeg", category: "salon", title: "Notre Salon", aspect: "portrait" },
    { id: 16, src: "/assets/photos/canape.jpeg", category: "salon", title: "Espace Détente", aspect: "portrait" },
];

// Catégories de la galerie
export const galleryCategories: GalleryCategory[] = [
    { id: "all", label: "Tout" },
    { id: "coupes", label: "Coupes" },
    { id: "tresses", label: "Tresses & Locks" },
    { id: "salon", label: "Le Salon" },
];
