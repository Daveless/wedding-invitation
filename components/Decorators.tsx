import React from 'react'

export function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            color: 'var(--gold)',
            textAlign: 'center',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
        }}>
            {children}
        </h2>
    )
}

export function GoldDivider({ icon = 'star' }: { icon?: 'star' | 'anchor' | 'diamond' | 'rose' }) {
    const icons: Record<string, React.ReactNode> = {
        star: (
            <svg width="24" height="24" viewBox="0 0 24 24">
                <polygon points="12,2 14,9 21,9 15.5,13.5 17.5,21 12,16.5 6.5,21 8.5,13.5 3,9 10,9" fill="#c9a84c" />
            </svg>
        ),
        anchor: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                <circle cx="12" cy="5" r="3" fill="#c9a84c" stroke="none" />
                <line x1="12" y1="8" x2="12" y2="20" />
                <line x1="6" y1="11" x2="18" y2="11" />
                <path d="M6,20 Q4,16 6,14" />
                <path d="M18,20 Q20,16 18,14" />
                <path d="M6,20 Q12,23 18,20" />
            </svg>
        ),
        diamond: (
            <svg width="20" height="24" viewBox="0 0 20 24">
                <polygon points="10,2 18,12 10,22 2,12" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
                <polygon points="10,7 14,12 10,17 6,12" fill="#c9a84c" />
            </svg>
        ),
        rose: (
            <svg width="24" height="30" viewBox="0 0 24 30">
                <circle cx="12" cy="10" r="6" fill="#c0392b" />
                <circle cx="12" cy="7" r="4" fill="#c9a84c" />
                <rect x="11" y="16" width="2" height="12" fill="#1a6b3c" />
                <path d="M11,20 Q6,18 8,16" fill="#1a6b3c" />
            </svg>
        ),
    }

    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.75rem', marginBottom: '2.5rem',
        }}>
            <div style={{ flex: '0 1 80px', height: '1px', background: 'linear-gradient(to right, transparent, var(--gold))' }} />
            {icons[icon]}
            <div style={{ flex: '0 1 80px', height: '1px', background: 'linear-gradient(to left, transparent, var(--gold))' }} />
        </div>
    )
}

export function BannerDivider({ text }: { text: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '3rem 0', justifyContent: 'center' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
            <div style={{
                border: '2px solid var(--gold)',
                padding: '0.3rem 1.5rem',
                fontFamily: 'var(--font-cinzel)',
                color: 'var(--gold)',
                fontSize: '0.65rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
            }}>
                {text}
            </div>
            <div style={{ flex: 1, height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
        </div>
    )
}
