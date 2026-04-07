import { createClient } from "@supabase/supabase-js";
import { Star } from "lucide-react";
import ReviewForm from "@/components/site/avis/ReviewForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Avis clients",
    description: "Découvrez les avis de nos clients sur BSK Barbershop.",
};

export const revalidate = 60;

interface Review {
    id: string;
    author_name: string;
    rating: number;
    comment: string;
    reply: string | null;
    created_at: string;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className="w-4 h-4"
                    fill={rating >= s ? "#C6A667" : "transparent"}
                    stroke={rating >= s ? "#C6A667" : "#555"}
                />
            ))}
        </div>
    );
}

export default async function AvisPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: reviews } = await supabase
        .from("reviews")
        .select("id, author_name, rating, comment, reply, created_at")
        .eq("business_id", process.env.NEXT_PUBLIC_BUSINESS_ID)
        .order("created_at", { ascending: false });

    const list = (reviews as Review[]) || [];
    const avgRating = list.length > 0
        ? (list.reduce((acc, r) => acc + r.rating, 0) / list.length).toFixed(1)
        : null;
    const distribution = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: list.filter((r) => r.rating === star).length,
    }));

    return (
        <div className="bg-[#1B1C1E] text-white min-h-screen">
            {/* Header */}
            <section className="pt-28 pb-14 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">Avis clients</h1>
                <p className="text-[#A0A0A0] max-w-xl mx-auto">
                    Ce que nos clients pensent de BSK Barbershop
                </p>
            </section>

            <div className="max-w-5xl mx-auto px-6 pb-24">
                {/* Stats */}
                {avgRating && (
                    <div className="bg-[#242526] rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
                        <div className="text-center">
                            <p className="text-6xl font-bold text-[#C6A667]">{avgRating}</p>
                            <StarRating rating={Math.round(parseFloat(avgRating))} />
                            <p className="text-[#A0A0A0] text-sm mt-2">{list.length} avis</p>
                        </div>
                        <div className="flex-1 w-full flex flex-col gap-2">
                            {distribution.map(({ star, count }) => (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="text-sm text-[#A0A0A0] w-4">{star}</span>
                                    <Star className="w-3.5 h-3.5 text-[#C6A667]" fill="#C6A667" />
                                    <div className="flex-1 bg-[#333] rounded-full h-2">
                                        <div
                                            className="bg-[#C6A667] h-2 rounded-full transition-all"
                                            style={{ width: list.length > 0 ? `${(count / list.length) * 100}%` : "0%" }}
                                        />
                                    </div>
                                    <span className="text-sm text-[#A0A0A0] w-4">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Liste des avis */}
                    <div className="flex flex-col gap-5">
                        <h2 className="text-xl font-semibold">Tous les avis</h2>
                        {list.length === 0 ? (
                            <p className="text-[#A0A0A0] text-sm">Soyez le premier à laisser un avis !</p>
                        ) : (
                            list.map((review) => (
                                <div key={review.id} className="bg-[#242526] rounded-xl p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-semibold">{review.author_name}</p>
                                        <StarRating rating={review.rating} />
                                    </div>
                                    <p className="text-[#D0D0D0] text-sm leading-relaxed">{review.comment}</p>
                                    {review.reply && (
                                        <div className="mt-4 pl-4 border-l-2 border-[#C6A667]">
                                            <p className="text-xs text-[#C6A667] font-semibold mb-1">Réponse de BSK Barbershop</p>
                                            <p className="text-sm text-[#A0A0A0]">{review.reply}</p>
                                        </div>
                                    )}
                                    <p className="text-xs text-[#555] mt-3">
                                        {new Date(review.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Formulaire */}
                    <div className="lg:sticky lg:top-28 self-start">
                        <div className="bg-[#242526] rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-5">Laisser un avis</h2>
                            <ReviewForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
