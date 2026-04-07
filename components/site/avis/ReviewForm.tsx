"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [form, setForm] = useState({ author_name: "", email: "", comment: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) { setError("Veuillez sélectionner une note"); return; }
        setLoading(true);
        setError(null);

        const res = await fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, rating }),
        });

        if (res.ok) {
            setSuccess(true);
        } else {
            const data = await res.json();
            setError(data.error || "Une erreur est survenue");
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-white font-semibold text-lg">Merci pour votre avis !</p>
                <p className="text-[#A0A0A0] text-sm mt-1">Il sera visible dans quelques instants.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Étoiles */}
            <div>
                <p className="text-sm text-[#A0A0A0] mb-2">Votre note</p>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(0)}
                        >
                            <Star
                                className="w-8 h-8 transition-colors"
                                fill={(hovered || rating) >= star ? "#C6A667" : "transparent"}
                                stroke={(hovered || rating) >= star ? "#C6A667" : "#555"}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-sm text-[#A0A0A0] block mb-1">Votre prénom</label>
                <input
                    type="text"
                    required
                    value={form.author_name}
                    onChange={(e) => setForm(p => ({ ...p, author_name: e.target.value }))}
                    placeholder="Jean"
                    className="w-full bg-[#2A2B2D] border border-[#333] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C6A667] transition"
                />
            </div>

            <div>
                <label className="text-sm text-[#A0A0A0] block mb-1">Votre email <span className="text-[#555]">(non publié)</span></label>
                <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="jean@exemple.fr"
                    className="w-full bg-[#2A2B2D] border border-[#333] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C6A667] transition"
                />
            </div>

            <div>
                <label className="text-sm text-[#A0A0A0] block mb-1">Votre commentaire</label>
                <textarea
                    required
                    rows={4}
                    value={form.comment}
                    onChange={(e) => setForm(p => ({ ...p, comment: e.target.value }))}
                    placeholder="Partagez votre expérience..."
                    className="w-full bg-[#2A2B2D] border border-[#333] text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-[#C6A667] transition resize-none"
                />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-[#C6A667] text-[#1B1C1E] font-semibold py-3 rounded-lg hover:bg-[#D4B87A] transition disabled:opacity-50"
            >
                {loading ? "Envoi..." : "Publier mon avis"}
            </button>
        </form>
    );
}
