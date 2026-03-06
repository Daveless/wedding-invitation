import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'
import InvitationClient from '@/components/InvitationClient'
import type { Metadata } from 'next'

interface Props {
    params: { token: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: 'Brenda & David te invitan a su boda',
        description: 'Brenda & David te invitan a celebrar el día más especial de su vida.',
    }
}

export default async function InvitePage({ params }: Props) {
    const { token } = params

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(token)) {
        notFound()
    }

    const supabase = createServiceClient()

    // Fetch guest by token
    const { data: guest, error } = await supabase
        .from('guests')
        .select('id, name, token')
        .eq('token', token)
        .single()

    if (error || !guest) {
        notFound()
    }

    // Check for existing RSVP
    const { data: rsvp } = await supabase
        .from('rsvp')
        .select('attending')
        .eq('guest_id', guest.id)
        .order('submitted_at', { ascending: false })
        .limit(1)
        .single()

    const hasRsvp = !!rsvp
    const rsvpAttending = rsvp?.attending ?? null

    return (
        <InvitationClient
            guestName={guest.name}
            guestId={guest.id}
            hasRsvp={hasRsvp}
            rsvpAttending={rsvpAttending}
        />
    )
}
