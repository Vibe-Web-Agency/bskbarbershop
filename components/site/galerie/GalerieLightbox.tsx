import Image from "next/image";
import { GalleryItem } from "@/data/galerieItem";

// Helper function to check if file is a video
function isVideo(src: string): boolean {
    const videoExtensions = ['.webm', '.mp4', '.mov', '.avi', '.mkv'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
}

interface GalerieLightboxProps {
    isOpen: boolean;
    currentImage: GalleryItem | null;
    onClose: () => void;
    onNavigate: (direction: "prev" | "next") => void;
}

export default function GalerieLightbox({
    isOpen,
    currentImage,
    onClose,
    onNavigate
}: GalerieLightboxProps) {
    if (!isOpen || !currentImage) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNavigate("prev"); }}
                className="absolute left-4 md:left-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div
                className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {isVideo(currentImage.src) ? (
                    <video
                        src={currentImage.src}
                        controls
                        autoPlay
                        playsInline
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                ) : (
                    <Image
                        src={currentImage.src}
                        alt={currentImage.title}
                        fill
                        className="object-contain"
                    />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center">
                    <h3 className="text-xl font-bold text-white">{currentImage.title}</h3>
                </div>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); onNavigate("next"); }}
                className="absolute right-4 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
