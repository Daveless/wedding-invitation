import type { Metadata } from 'next'
import { UnifrakturCook, Jost, Lora, Licorice } from 'next/font/google'
import './globals.css'

const unifraktur = UnifrakturCook({
    weight: ['700'],
    subsets: ['latin'],
    variable: '--font-gothic',
})

const jost = Jost({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-sans',
})

const lora = Lora({
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-serif',
})

const licorice = Licorice({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-script',
})

export const metadata: Metadata = {
    title: 'Brenda & David — Nuestra Boda',
    description: 'Te invitamos a nuestra boda. Guarda la fecha.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="es"
            className={`${unifraktur.variable} ${jost.variable} ${lora.variable} ${licorice.variable}`}
        >
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Manufacturing+Consent&family=Birthstone+Bounce:wght@400;500&display=swap" rel="stylesheet" />
            </head>
            <body>{children}</body>
        </html>
    )
}

