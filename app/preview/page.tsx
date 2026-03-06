// Preview route — shows the full invitation without a real Supabase token
// Useful for local development: http://localhost:3000/preview
import InvitationClient from '@/components/InvitationClient'

export default function PreviewPage() {
    return (
        <InvitationClient
            guestName="Invitado Especial"
            guestId="00000000-0000-0000-0000-000000000000"
            hasRsvp={false}
            rsvpAttending={null}
        />
    )
}
