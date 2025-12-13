import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ID du business BSK Barbershop
const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID;

if (!businessId) {
    throw new Error("NEXT_PUBLIC_BUSINESS_ID is not defined");
}

export const BUSINESS_ID = businessId;
