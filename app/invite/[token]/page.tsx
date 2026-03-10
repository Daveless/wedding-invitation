import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase'
import InvitationClient from '@/components/InvitationClient'
import { capitalizeName } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
    params: { token: string }
    searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: 'Brenda & David te invitan a su boda',
        description: 'Brenda & David te invitan a celebrar el día más especial de su vida.',
    }
}

export default async function InvitePage({ params, searchParams }: Props) {
    const { token } = params

    const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : undefined
    const passesParam = typeof searchParams?.passes === 'string' ? searchParams.passes : undefined
    const passes = passesParam ? parseInt(passesParam, 10) : undefined

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
            guestName={guest.name ? capitalizeName(guest.name) : ''}
            guestId={guest.id}
            hasRsvp={hasRsvp}
            rsvpAttending={rsvpAttending}
            lang={lang}
            passes={passes}
        />
    )
}
