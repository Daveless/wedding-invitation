import { createServiceClient } from '@/lib/supabase'
import AdminClient from './AdminClient'

export default async function AdminPage() {
    const supabase = createServiceClient()

    // Fetch all guests with their RSVP status
    const { data: guests } = await supabase
        .from('guests')
        .select('id, name, token, created_at')
        .order('created_at', { ascending: false })

    // Fetch all RSVPs with guest name
    const { data: rsvps } = await supabase
        .from('rsvp')
        .select('id, guest_id, attending, comments, submitted_at, guests(name)')
        .order('submitted_at', { ascending: false })

    // Fetch all song requests with guest name
    const { data: songs } = await supabase
        .from('song_requests')
        .select('id, guest_id, song, submitted_at, guests(name)')
        .order('submitted_at', { ascending: false })

    // Map RSVP by guest_id
    const rsvpMap: Record<string, boolean> = {}
    rsvps?.forEach(r => {
        rsvpMap[r.guest_id] = r.attending
    })

    return (
        <AdminClient
            guests={guests || []}
            rsvps={rsvps || []}
            songs={songs || []}
            rsvpMap={rsvpMap}
        />
    )
}
