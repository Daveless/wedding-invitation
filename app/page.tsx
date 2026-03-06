import { redirect } from 'next/navigation'

export default function HomePage() {
    // The home page just shows a nice placeholder 
    // Actual invitations are at /invite/[token]
    redirect('/not-found')
}
