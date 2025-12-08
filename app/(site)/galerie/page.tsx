"use client";

import { useState } from "react";
import {
  GalerieHero,
  GalerieFilters,
  GalerieGrid,
  GalerieCTA,
  GalerieLightbox,
  GalleryItem,
  galleryItems,
  galleryCategories,
} from "@/data";

export default function GaleriePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (item: GalleryItem) => {
    setCurrentImage(item);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!currentImage) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === currentImage.id);
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentImage(filteredItems[newIndex]);
  };

  return (
    <div className="bg-[#1B1C1E] text-white min-h-screen">
      <GalerieHero />

      <GalerieFilters
        categories={galleryCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <GalerieGrid
        items={filteredItems}
        categories={galleryCategories}
        onImageClick={openLightbox}
      />

      <GalerieCTA />

      <GalerieLightbox
        isOpen={lightboxOpen}
        currentImage={currentImage}
        onClose={closeLightbox}
        onNavigate={navigateImage}
      />
    </div>
  );
}