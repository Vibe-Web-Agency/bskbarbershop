"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

interface GalerieFiltersProps {
    categories: { id: string; label: string }[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function GalerieFilters({
    categories,
    activeCategory,
    onCategoryChange
}: GalerieFiltersProps) {
    return (
        <AnimatedSection animation="fade-in" delay={300}>
            <div className="max-w-6xl mx-auto px-6 mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === cat.id
                                ? "bg-[#C6A667] text-black shadow-lg shadow-[#C6A667]/25"
                                : "bg-[#2A2B2E] text-[#D0D0D0] hover:bg-[#333] hover:text-white"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
