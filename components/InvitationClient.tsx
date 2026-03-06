'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import EnvelopeScene from './EnvelopeScene'
import NewspaperLetter from './NewspaperLetter'

interface Props {
    guestName: string
    guestId: string
    hasRsvp: boolean
    rsvpAttending: boolean | null
}

export default function InvitationClient({ guestName, guestId, hasRsvp, rsvpAttending }: Props) {
    const [opened, setOpened] = useState(false)

    return (
        <AnimatePresence mode="wait">
            {!opened ? (
                <EnvelopeScene key="envelope" onOpen={() => setOpened(true)} />
            ) : (
                <NewspaperLetter
                    key="letter"
                    guestName={guestName}
                    guestId={guestId}
                    hasRsvp={hasRsvp}
                    rsvpAttending={rsvpAttending}
                />
            )}
        </AnimatePresence>
    )
}
