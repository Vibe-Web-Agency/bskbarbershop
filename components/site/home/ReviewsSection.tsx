import { createClient } from "@supabase/supabase-js";
import { Star } from "lucide-react";
import Link from "next/link";

interface Review {
    id: string;
    author_name: string;
    rating: number;
    comment: string;
    created_at: string;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5" fill={rating >= s ? "#C6A667" : "transparent"} stroke={rating >= s ? "#C6A667" : "#555"} />
            ))}
        </div>
    );
}

export default async function ReviewsSection() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: reviews } = await supabase
        .from("reviews")
        .select("id, author_name, rating, comment, created_at")
        .eq("business_id", process.env.NEXT_PUBLIC_BUSINESS_ID)
        .gte("rating", 4)
        .order("created_at", { ascending: false })
        .limit(3);

    const { data: allReviews } = await supabase
        .from("reviews")
        .select("rating")
        .eq("business_id", process.env.NEXT_PUBLIC_BUSINESS_ID);

    const list = (reviews as Review[]) || [];
    const all = allReviews || [];

    if (list.length === 0) return null;

    const avgRating = all.length > 0
        ? (all.reduce((acc: number, r: { rating: number }) => acc + r.rating, 0) / all.length).toFixed(1)
        : null;

    return (
        <section className="bg-[#1B1C1E] py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Ce que disent nos clients</h2>
                        {avgRating && (
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[#C6A667] font-bold text-lg">{avgRating}</span>
                                <StarRating rating={Math.round(parseFloat(avgRating))} />
                                <span className="text-[#A0A0A0] text-sm">({all.length} avis)</span>
                            </div>
                        )}
                    </div>
                    <Link href="/avis" className="text-sm text-[#C6A667] hover:text-[#D4B87A] transition border-b border-[#C6A667]">
                        Voir tous les avis →
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {list.map((review) => (
                        <div key={review.id} className="bg-[#242526] rounded-xl p-6 flex flex-col gap-3">
                            <StarRating rating={review.rating} />
                            <p className="text-[#D0D0D0] text-sm leading-relaxed flex-1">&ldquo;{review.comment}&rdquo;</p>
                            <p className="text-[#A0A0A0] text-sm font-semibold">— {review.author_name}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link
                        href="/avis"
                        className="inline-block border border-[#C6A667] text-[#C6A667] px-8 py-3 rounded-lg hover:bg-[#C6A667] hover:text-[#1B1C1E] transition font-semibold"
                    >
                        Laisser un avis
                    </Link>
                </div>
            </div>
        </section>
    );
}
