// Preview route — shows the full invitation without a real Supabase token
// Useful for local development: http://localhost:3000/preview
import InvitationClient from '@/components/InvitationClient'

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined }
}

export default function PreviewPage({ searchParams }: Props) {
    const lang = typeof searchParams?.lang === 'string' ? searchParams.lang : undefined
    const passesParam = typeof searchParams?.passes === 'string' ? searchParams.passes : undefined
    const passes = passesParam ? parseInt(passesParam, 10) : undefined

    return (
        <InvitationClient
            guestName="Invitado Especial"
            guestId="00000000-0000-0000-0000-000000000000"
            hasRsvp={false}
            rsvpAttending={null}
            lang={lang}
            passes={passes}
        />
    )
}
