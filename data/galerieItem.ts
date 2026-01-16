// Types de la galerie
export interface GalleryItem {
    id: number;
    src: string;
    category: string;
    title: string;
    aspect: "portrait" | "landscape";
    objectPosition?: string; // Position CSS personnalisée (ex: "bottom", "center", "top")
}

export interface GalleryCategory {
    id: string;
    label: string;
}


export const galleryItems: GalleryItem[] = [

    { id: 1, src: "/assets/videos/RFK.webm", category: "coupes", title: "RFK chez BSK", aspect: "portrait", objectPosition: "bottom" },
    
    { id: 3, src: "/assets/videos/Tresses.webm", category: "tresses", title: "Tresses Femme", aspect: "portrait" },
    { id: 16, src: "/assets/photos/IMG_1581.webp", category: "tresses", title: "Nattes style", aspect: "portrait" },
    { id: 6, src: "/assets/photos/IMG_0269.jpeg", category: "tresses", title: "Tresses Homme", aspect: "portrait" },
    { id: 15, src: "/assets/photos/IMG_1035.webp", category: "coupes", title: "Fade Net", aspect: "portrait", objectPosition: "bottom" },
    { id: 22, src: "/assets/photos/WhatsApp Image 2025-12-22 at 15.32.57.webp", category: "coupes", title: "Locks Twist", aspect: "portrait" },
    { id: 18, src: "/assets/photos/IMG_9542.webp", category: "salon", title: "Notre Salon", aspect: "portrait" },
    { id: 7, src: "/assets/photos/IMG_0324.jpeg", category: "tresses", title: "Locks Retwist", aspect: "portrait" },
    { id: 17, src: "/assets/photos/IMG_9536.webp", category: "salon", title: "Espace de coupe", aspect: "portrait" },
    { id: 8, src: "/assets/photos/IMG_0512.jpeg", category: "tresses", title: "Tresses Collées", aspect: "portrait" },
    { id: 9, src: "/assets/photos/IMG_0554.jpeg", category: "tresses", title: "Nattes collées", aspect: "portrait" },
    { id: 20, src: "/assets/photos/IMG_1305.webp", category: "coupes", title: "Dégradé court", aspect: "portrait", objectPosition: "bottom" },
    { id: 10, src: "/assets/photos/IMG_0725.jpeg", category: "tresses", title: "Locks Crochet", aspect: "portrait" },
    { id: 11, src: "/assets/photos/IMG_0734.jpeg", category: "tresses", title: "Tresses Style", aspect: "portrait" },
    { id: 26, src: "/assets/photos/canape.jpeg", category: "salon", title: "Espace Détente", aspect: "portrait" },
    { id: 12, src: "/assets/photos/IMG_0742.jpeg", category: "tresses", title: "Nattes Collées", aspect: "portrait" },
    { id: 13, src: "/assets/photos/IMG_0743.jpeg", category: "tresses", title: "Tresses Design", aspect: "portrait" },
    { id: 21, src: "/assets/photos/WhatsApp Image 2025-12-22 at 15.30.17.webp", category: "coupes", title: "Tresses Africaines", aspect: "portrait", objectPosition: "bottom" },
    { id: 14, src: "/assets/photos/IMG_0820.jpeg", category: "tresses", title: "Nattes", aspect: "portrait" },
    { id: 19, src: "/assets/photos/IMG_0261.webp", category: "coupes", title: "Locks Naturels", aspect: "portrait" },
    { id: 2, src: "/assets/videos/degrade.webm", category: "coupes", title: "Degradé", aspect: "portrait", objectPosition: "bottom" },
    { id: 23, src: "/assets/photos/WhatsApp Image 2025-12-22 at 15.32.57 (1).webp", category: "tresses", title: "Tresses nattées", aspect: "portrait" },
    { id: 24, src: "/assets/photos/WhatsApp Image 2025-12-22 at 15.35.27.webp", category: "tresses", title: "Nattes", aspect: "portrait" },

    // Le Salon
];

// Catégories de la galerie
export const galleryCategories: GalleryCategory[] = [
    { id: "all", label: "Tout" },
    { id: "coupes", label: "Coupes" },
    { id: "tresses", label: "Tresses & Locks" },
    { id: "salon", label: "Le Salon" },
];
