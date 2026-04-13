import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string;
                    title_ar: string;
                    title_en: string;
                    description_ar: string | null;
                    description_en: string | null;
                    category: string | null;
                    image_url: string | null;
                    featured: boolean;
                    created_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at">;
                Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
            };
            services: {
                Row: {
                    id: string;
                    slug: string;
                    title_ar: string;
                    title_en: string;
                    description_ar: string | null;
                    description_en: string | null;
                    icon: string | null;
                    order_index: number;
                };
                Insert: Omit<Database["public"]["Tables"]["services"]["Row"], "id">;
                Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
            };
            contact_submissions: {
                Row: {
                    id: string;
                    name: string;
                    email: string;
                    phone: string | null;
                    message: string;
                    service_interest: string | null;
                    created_at: string;
                };
                Insert: Omit<Database["public"]["Tables"]["contact_submissions"]["Row"], "id" | "created_at">;
                Update: Partial<Database["public"]["Tables"]["contact_submissions"]["Insert"]>;
            };
        };
    };
};
