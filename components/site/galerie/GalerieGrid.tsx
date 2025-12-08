import Image from "next/image";
import { GalleryItem } from "@/data/galerieItem";

interface GalerieGridProps {
    items: GalleryItem[];
    categories: { id: string; label: string }[];
    onImageClick: (item: GalleryItem) => void;
}

export default function GalerieGrid({ items, categories, onImageClick }: GalerieGridProps) {
    return (
        <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => onImageClick(item)}
                        className={`group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#C6A667]/10 ${item.aspect === "landscape" ? "sm:col-span-2 lg:col-span-1" : ""
                            }`}
                        style={{
                            animationDelay: `${index * 100}ms`,
                        }}
                    >
                        <div className={`relative ${item.aspect === "portrait" ? "h-[450px]" : "h-[350px]"}`}>
                            <Image
                                src={item.src}
                                alt={item.title}
                                fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-[#C6A667] text-sm uppercase tracking-wider">
                                    {categories.find((c) => c.id === item.category)?.label}
                                </p>
                            </div>

                            <div className="absolute top-4 right-4 w-10 h-10 bg-[#C6A667] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500">
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {items.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-[#666] text-lg">Aucune image dans cette catégorie pour le moment.</p>
                </div>
            )}
        </section>
    );
}
