'use client'

import { useState } from 'react'

export default function EnvelopeHP({ onOpenComplete }: { onOpenComplete: () => void }) {
    const [step, setStep] = useState(0) // 0: closed, 1: seal broken & flap open, 2: letter sliding, 3: zoom in

    const handleClick = () => {
        if (step === 0) {
            setStep(1)
            setTimeout(() => setStep(2), 800)
            setTimeout(() => setStep(3), 1600)
            setTimeout(() => onOpenComplete(), 2800)
        }
    }

    return (
        <div className="envelope-container" onClick={step === 0 ? handleClick : undefined}>
            <div className={`envelope-wrapper ${step >= 3 ? 'is-opening' : ''}`}>

                {/* FRONT OF ENVELOPE (Address Side) - Hidden initially by rotation */}
                <div className="env-face env-front">
                    <div style={{ textAlign: 'center', opacity: 0.8 }}>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Entregada por lechuza
                        </p>
                    </div>
                </div>

                {/* BACK OF ENVELOPE (Seal Side) */}
                <div className="env-face env-back">

                    {/* Inner Letter Preview */}
                    <div className={`env-letter-preview ${step >= 2 ? 'is-sliding' : ''}`}>
                        {/* Just a fake top of the letter to look realistic */}
                        <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.2 }}>
                            <div style={{ height: '4px', width: '60%', background: 'currentColor', margin: '0 auto 10px' }} />
                            <div style={{ height: '4px', width: '40%', background: 'currentColor', margin: '0 auto 10px' }} />
                            <div style={{ height: '4px', width: '80%', background: 'currentColor', margin: '0 auto 10px' }} />
                        </div>
                    </div>

                    <div className="env-left" />
                    <div className="env-right" />
                    <div className="env-bottom" />

                    <div className={`env-flap ${step >= 1 ? 'is-open' : ''}`} />

                    <div className={`wax-seal ${step >= 1 ? 'is-broken' : ''}`}>
                        H
                    </div>

                </div>
            </div>
        </div>
    )
}
