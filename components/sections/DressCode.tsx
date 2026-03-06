export default function DressCode() {
    return (
        <section className="section" id="dress-code" style={{ textAlign: 'center', background: '#fafaf8' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>👗</div>

            <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                marginBottom: '0.4rem',
            }}>
                Dress Code
            </h2>
            <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                color: 'var(--text-mid)',
                fontSize: '1.05rem',
                marginBottom: '2rem',
            }}>
                Próximamente compartiremos los detalles
            </p>

            {/* Color swatches */}
            <div style={{ marginBottom: '1.75rem' }}>
                <p style={{
                    fontFamily: 'var(--font-lato)', fontSize: '0.7rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'var(--text-light)', marginBottom: '1rem',
                }}>
                    Paleta sugerida
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    {[
                        { color: '#0a1628', label: 'Marino' },
                        { color: '#b8935a', label: 'Dorado' },
                        { color: '#1a1a1a', label: 'Negro' },
                        { color: '#fdf6e3', label: 'Marfil', border: '1px solid #ddd' },
                    ].map(sw => (
                        <div key={sw.label} style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '42px', height: '42px', borderRadius: '50%',
                                background: sw.color,
                                border: sw.border || 'none',
                                margin: '0 auto 0.4rem',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                            }} />
                            <span style={{ fontFamily: 'var(--font-lato)', fontSize: '0.65rem', color: 'var(--text-light)' }}>
                                {sw.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                border: '1.5px dashed var(--border)',
                borderRadius: '8px',
                background: '#fff',
            }}>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: 'var(--text-mid)', fontSize: '1rem' }}>
                    ✨ Pronto más detalles
                </p>
            </div>
        </section>
    )
}
