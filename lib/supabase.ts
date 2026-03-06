import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key (never expose to browser)
export function createServiceClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )
}

export type Guest = {
    id: string
    name: string
    token: string
    created_at: string
}

export type RSVP = {
    id: string
    guest_id: string
    attending: boolean
    comments: string | null
    submitted_at: string
}

export type SongRequest = {
    id: string
    guest_id: string
    song: string
    submitted_at: string
}
