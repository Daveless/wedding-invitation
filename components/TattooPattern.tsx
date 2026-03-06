'use client'

import React from 'react'

export default function TattooPattern() {
    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                style={{ opacity: 0.12 }}
            >
                <defs>
                    <pattern id="tattoo-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        {/* Rose — top left */}
                        <g transform="translate(20,20)" fill="#c9a84c">
                            <circle cx="0" cy="-8" r="5" />
                            <circle cx="4" cy="-5" r="4" />
                            <circle cx="-4" cy="-5" r="4" />
                            <circle cx="0" cy="-2" r="6" />
                            <path d="M-3,2 Q0,8 3,2" stroke="#c9a84c" strokeWidth="1" fill="none" />
                            <path d="M-5,4 Q-8,10 -3,8" stroke="#c9a84c" strokeWidth="1" fill="none" />
                            <path d="M5,4 Q8,10 3,8" stroke="#c9a84c" strokeWidth="1" fill="none" />
                            <rect x="-1" y="8" width="2" height="8" />
                            <path d="M-4,12 Q-6,10 -4,9" fill="#c9a84c" />
                        </g>

                        {/* Anchor — top right */}
                        <g transform="translate(165,25)" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                            <circle cx="0" cy="-10" r="4" fill="#c9a84c" stroke="none" />
                            <line x1="0" y1="-6" x2="0" y2="10" />
                            <line x1="-8" y1="-4" x2="8" y2="-4" />
                            <path d="M-6,10 Q-10,8 -8,4" />
                            <path d="M6,10 Q10,8 8,4" />
                            <path d="M-6,10 Q0,14 6,10" />
                        </g>

                        {/* Swallow — center top */}
                        <g transform="translate(100,15)" fill="#c9a84c">
                            <path d="M0,0 Q-6,-8 -14,-4 Q-8,0 0,4 Q8,0 14,-4 Q6,-8 0,0Z" />
                            <circle cx="0" cy="0" r="2" />
                        </g>

                        {/* Heart with arrow — center left */}
                        <g transform="translate(30,100)">
                            <path d="M0,-5 C-3,-10 -10,-10 -10,-3 C-10,3 0,10 0,10 C0,10 10,3 10,-3 C10,-10 3,-10 0,-5Z" fill="#c9a84c" />
                            <line x1="-12" y1="5" x2="12" y2="-5" stroke="#c9a84c" strokeWidth="1.5" />
                            <path d="M10,-6 L12,-5 L10,-4" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
                            <path d="M-10,6 L-12,5 L-10,4" fill="none" stroke="#c9a84c" strokeWidth="1.5" />
                        </g>

                        {/* Nautical star — center */}
                        <g transform="translate(100,100)">
                            <polygon points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3" fill="#c9a84c" />
                            <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#0a1628" />
                        </g>

                        {/* Skull with flower — center right */}
                        <g transform="translate(170,100)">
                            <ellipse cx="0" cy="-5" rx="9" ry="10" fill="#c9a84c" />
                            <rect x="-6" y="4" width="12" height="6" rx="1" fill="#c9a84c" />
                            <circle cx="-3" cy="-6" r="2.5" fill="#0a1628" />
                            <circle cx="3" cy="-6" r="2.5" fill="#0a1628" />
                            <line x1="-4" y1="5" x2="-4" y2="10" stroke="#0a1628" strokeWidth="1.5" />
                            <line x1="0" y1="5" x2="0" y2="10" stroke="#0a1628" strokeWidth="1.5" />
                            <line x1="4" y1="5" x2="4" y2="10" stroke="#0a1628" strokeWidth="1.5" />
                            {/* flower on skull */}
                            <circle cx="0" cy="-18" r="4" fill="#c9a84c" />
                            <circle cx="0" cy="-23" r="2" fill="#c9a84c" />
                            <circle cx="5" cy="-20" r="2" fill="#c9a84c" />
                            <circle cx="-5" cy="-20" r="2" fill="#c9a84c" />
                        </g>

                        {/* Horseshoe — bottom left */}
                        <g transform="translate(25,170)" fill="none" stroke="#c9a84c" strokeWidth="2.5">
                            <path d="M-8,-10 Q-12,0 -8,8 Q0,14 8,8 Q12,0 8,-10" strokeLinecap="round" />
                            <line x1="-8" y1="-10" x2="-8" y2="-14" />
                            <line x1="8" y1="-10" x2="8" y2="-14" />
                        </g>

                        {/* Diamond — bottom center */}
                        <g transform="translate(100,175)">
                            <polygon points="0,-12 10,0 0,12 -10,0" fill="#c9a84c" />
                            <polygon points="0,-7 6,0 0,7 -6,0" fill="#0a1628" />
                        </g>

                        {/* Banner/Scroll — bottom right */}
                        <g transform="translate(165,165)">
                            <path d="M-18,-6 Q-18,-10 -14,-10 L14,-10 Q18,-10 18,-6 L18,6 Q18,10 14,10 L-14,10 Q-18,10 -18,6Z" fill="#c9a84c" />
                            <path d="M-18,-6 Q-22,-2 -18,6" fill="#c9a84c" stroke="none" />
                            <path d="M18,-6 Q22,-2 18,6" fill="#c9a84c" stroke="none" />
                            <text x="0" y="3" textAnchor="middle" fontSize="6" fill="#0a1628" fontFamily="serif">AMOR</text>
                        </g>

                        {/* Panther outline — top center */}
                        <g transform="translate(100,60)" fill="#c9a84c">
                            <path d="M0,-8 C-4,-12 -10,-10 -12,-6 C-14,-2 -12,4 -8,8 C-4,12 0,14 0,14 C0,14 4,12 8,8 C12,4 14,-2 12,-6 C10,-10 4,-12 0,-8Z" />
                            <circle cx="-3" cy="-5" r="1.5" fill="#0a1628" />
                            <circle cx="3" cy="-5" r="1.5" fill="#0a1628" />
                            <path d="M-8,-8 Q-10,-14 -6,-12" stroke="#c9a84c" strokeWidth="1" fill="none" />
                            <path d="M8,-8 Q10,-14 6,-12" stroke="#c9a84c" strokeWidth="1" fill="none" />
                        </g>

                        {/* Snake — left center */}
                        <g transform="translate(60,130)" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                            <path d="M0,-20 Q8,-15 4,-5 Q-2,5 6,12 Q14,18 8,25" />
                            <ellipse cx="0" cy="-22" rx="3" ry="4" fill="#c9a84c" stroke="none" />
                            <path d="M-2,-25 L0,-28 L2,-25" fill="#c9a84c" stroke="none" />
                        </g>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#tattoo-pattern)" />
            </svg>
        </div>
    )
}
