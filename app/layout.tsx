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
            <body>{children}</body>
        </html>
    )
}
