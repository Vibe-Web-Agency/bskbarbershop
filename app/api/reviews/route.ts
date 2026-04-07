import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
    const { author_name, email, rating, comment } = await request.json();

    if (!author_name || !email || !rating || !comment) {
        return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
        return NextResponse.json({ error: "Note invalide" }, { status: 400 });
    }

    const { error } = await supabase.from("reviews").insert({
        business_id: process.env.NEXT_PUBLIC_BUSINESS_ID,
        author_name,
        email,
        rating,
        comment,
    });

    if (error) {
        console.error("Erreur insertion avis:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
