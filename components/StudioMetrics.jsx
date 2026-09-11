'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const METRICS_DATA = {
    reach: {
        id: 'reach',
        tabLabel: 'Viral Reach',
        title: 'Viral Reach & Impressions',
        badge: '+340% YoY Growth',
        tagColor: 'var(--color-pink)',
        description: 'Exponential organic reach driven by algorithmic cultural resonance.',
        points: 'M 0,170 Q 150,150 290,115 T 580,65 T 870,20 L 870,200 L 0,200 Z',
        linePath: 'M 0,170 Q 150,150 290,115 T 580,65 T 870,20',
        stats: [
            { label: 'Q1 Launch', value: '180M', delta: '+45%' },
            { label: 'Q2 Scale', value: '640M', delta: '+120%' },
            { label: 'Q3 Peak', value: '1.4B', delta: '+220%' },
            { label: 'Q4 Impact', value: '2.4B', delta: '+340%' },
        ],
        dots: [
            { cx: 30, cy: 170, val: '180M', label: 'Q1 Launch' },
            { cx: 290, cy: 115, val: '640M', label: 'Q2 Scale' },
            { cx: 580, cy: 65, val: '1.4B', label: 'Q3 Peak' },
            { cx: 860, cy: 20, val: '2.4B', label: 'Q4 Impact' },
        ],
    },
    conversion: {
        id: 'conversion',
        tabLabel: 'Conversion Velocity',
        title: 'Conversion Velocity',
        badge: '18.2x Peak ROAS',
        tagColor: 'var(--color-lightgreen)',
        description: 'Turning cultural hype directly into high-intent commercial conversion.',
        points: 'M 0,180 Q 180,155 290,120 T 580,55 T 870,15 L 870,200 L 0,200 Z',
        linePath: 'M 0,180 Q 180,155 290,120 T 580,55 T 870,15',
        stats: [
            { label: 'Avg CTR', value: '6.8%', delta: '3.4x ind.' },
            { label: 'Peak ROAS', value: '18.2x', delta: '+420%' },
            { label: 'CAC Drop', value: '-54%', delta: 'Optimized' },
            { label: 'LTV Lift', value: '+88%', delta: 'Retention' },
        ],
        dots: [
            { cx: 30, cy: 180, val: '6.8%', label: 'Avg CTR' },
            { cx: 290, cy: 120, val: '18.2x', label: 'Peak ROAS' },
            { cx: 580, cy: 55, val: '-54%', label: 'CAC Drop' },
            { cx: 860, cy: 15, val: '+88%', label: 'LTV Lift' },
        ],
    },
    resonance: {
        id: 'resonance',
        tabLabel: 'Cultural Index',
        title: 'Cultural Resonance Index',
        badge: '98.4% Positive Sentiment',
        tagColor: 'var(--color-orange)',
        description: 'Brand love, organic creator mentions, and social conversation dominance.',
        points: 'M 0,165 Q 160,130 290,100 T 580,40 T 870,12 L 870,200 L 0,200 Z',
        linePath: 'M 0,165 Q 160,130 290,100 T 580,40 T 870,12',
        stats: [
            { label: 'Sentiment', value: '98.4%', delta: 'Positive' },
            { label: 'Creator Drops', value: '450+', delta: 'Organic' },
            { label: 'Earned Media', value: '$42M', delta: '+310%' },
            { label: 'Awwwards / FWA', value: '14+', delta: 'Global' },
        ],
        dots: [
            { cx: 30, cy: 165, val: '98.4%', label: 'Sentiment' },
            { cx: 290, cy: 100, val: '450+', label: 'Creators' },
            { cx: 580, cy: 40, val: '$42M', label: 'Earned' },
            { cx: 860, cy: 12, val: '14+', label: 'Awards' },
        ],
    },
};

export default function StudioMetrics() {
    const [activeTab, setActiveTab] = useState('reach');
    const [activeDot, setActiveDot] = useState(null);
    const sectionRef = useRef(null);
    const lineRef = useRef(null);

    const currentData = METRICS_DATA[activeTab];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Animate chart line drawing smoothly
            if (lineRef.current) {
                const len = lineRef.current.getTotalLength();
                gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
                gsap.to(lineRef.current, {
                    strokeDashoffset: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                });
            }

            // Animate stats cards stagger
            gsap.fromTo(
                '.metrics__stat-box',
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power2.out' }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [activeTab]);

    return (
        <section ref={sectionRef} className="metrics-section" id="metrics-section">
            <div className="metrics__container">
                {/* ─── Modern Editorial Section Header ─── */}
                <div className="metrics__header">
                    <div className="metrics__header-top">
                        <span className="metrics__kicker">
                            <span className="metrics__pulse-dot" />
                            VERIFIED STUDIO IMPACT
                        </span>
                        <div className="metrics__telemetry-chip">
                            <span className="metrics__live-led" />
                            TELEMETRY STREAM // 2025–2026
                        </div>
                    </div>

                    <div className="metrics__header-row">
                        <h2 className="metrics__title">
                            quantified impact.
                            <span className="metrics__title-sub"> powered by culture.</span>
                        </h2>

                        {/* Segmented Pill Selector */}
                        <div className="metrics__tabs-wrapper">
                            <div className="metrics__tabs">
                                {Object.values(METRICS_DATA).map((tab) => (
                                    <button
                                        key={tab.id}
                                        className={`metrics__tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setActiveDot(null);
                                        }}
                                    >
                                        {tab.tabLabel}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Main Glassmorphic Console Card ─── */}
                <div className="metrics__console-card">
                    {/* Console Info Header */}
                    <div className="metrics__console-header">
                        <div className="metrics__console-title-group">
                            <span
                                className="metrics__console-badge"
                                style={{
                                    color: currentData.tagColor,
                                    borderColor: currentData.tagColor,
                                    background: `color-mix(in srgb, ${currentData.tagColor} 12%, transparent)`,
                                }}
                            >
                                {currentData.badge}
                            </span>
                            <h3 className="metrics__console-title">{currentData.title}</h3>
                            <p className="metrics__console-desc">{currentData.description}</p>
                        </div>
                    </div>

                    {/* SVG Interactive Chart Canvas */}
                    <div className="metrics__chart-box">
                        <svg viewBox="0 0 900 210" className="metrics__chart-svg" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id={`gradArea-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={currentData.tagColor} stopOpacity="0.32" />
                                    <stop offset="65%" stopColor={currentData.tagColor} stopOpacity="0.06" />
                                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id={`gradLine-${activeTab}`} x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="var(--color-orange)" />
                                    <stop offset="50%" stopColor={currentData.tagColor} />
                                    <stop offset="100%" stopColor="var(--color-lightblue)" />
                                </linearGradient>
                                <filter id="chartGlow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Background Grid Lines & Reference Y-Labels */}
                            <line x1="0" y1="45" x2="900" y2="45" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                            <text x="12" y="40" fill="rgba(255,255,255,0.22)" fontSize="10" fontFamily="var(--font-heading)" letterSpacing="1">MAX PEAK</text>

                            <line x1="0" y1="105" x2="900" y2="105" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                            <text x="12" y="100" fill="rgba(255,255,255,0.22)" fontSize="10" fontFamily="var(--font-heading)" letterSpacing="1">SCALE VELOCITY</text>

                            <line x1="0" y1="165" x2="900" y2="165" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                            <text x="12" y="160" fill="rgba(255,255,255,0.22)" fontSize="10" fontFamily="var(--font-heading)" letterSpacing="1">BASELINE</text>

                            {/* Gradient Area Fill */}
                            <path d={currentData.points} fill={`url(#gradArea-${activeTab})`} />

                            {/* Glow Behind Line */}
                            <path
                                d={currentData.linePath}
                                fill="none"
                                stroke={currentData.tagColor}
                                strokeWidth="8"
                                strokeOpacity="0.25"
                                strokeLinecap="round"
                            />

                            {/* Animated Glowing Line */}
                            <path
                                ref={lineRef}
                                d={currentData.linePath}
                                fill="none"
                                stroke={`url(#gradLine-${activeTab})`}
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                filter="url(#chartGlow)"
                            />

                            {/* Interactive Milestone Nodes */}
                            {currentData.dots.map((dot, i) => (
                                <g
                                    key={i}
                                    className="metrics__chart-dot-group"
                                    onMouseEnter={() => setActiveDot(i)}
                                    onMouseLeave={() => setActiveDot(null)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {/* Outer Ripple */}
                                    <circle
                                        cx={dot.cx}
                                        cy={dot.cy}
                                        r={activeDot === i ? '18' : '12'}
                                        fill={currentData.tagColor}
                                        opacity={activeDot === i ? '0.35' : '0.15'}
                                        className="metrics__pulse-ring"
                                    />
                                    {/* Core Node */}
                                    <circle
                                        cx={dot.cx}
                                        cy={dot.cy}
                                        r={activeDot === i ? '6' : '4.5'}
                                        fill="#ffffff"
                                        stroke={currentData.tagColor}
                                        strokeWidth="2.5"
                                    />
                                    {/* Tooltip Tag */}
                                    <g transform={`translate(${dot.cx - 30}, ${dot.cy - 34})`}>
                                        <rect
                                            width="60"
                                            height="22"
                                            rx="6"
                                            fill="rgba(10,10,12,0.85)"
                                            stroke="rgba(255,255,255,0.15)"
                                        />
                                        <text
                                            x="30"
                                            y="15"
                                            textAnchor="middle"
                                            fill="#ffffff"
                                            fontSize="11"
                                            fontWeight="700"
                                            fontFamily="var(--font-heading)"
                                        >
                                            {dot.val}
                                        </text>
                                    </g>
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Milestone Stats Grid */}
                    <div className="metrics__stats-row">
                        {currentData.stats.map((stat, i) => (
                            <div key={i} className="metrics__stat-box">
                                <div className="metrics__stat-top">
                                    <span className="metrics__stat-value">{stat.value}</span>
                                    <span className="metrics__stat-delta" style={{ color: currentData.tagColor }}>
                                        {stat.delta}
                                    </span>
                                </div>
                                <div className="metrics__stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── 4 Studio Benchmark Pillars ─── */}
                <div className="metrics__pillars-row">
                    <div className="metrics__pillar-card metrics__pillar-card--1">
                        <div className="metrics__pillar-accent" style={{ background: 'var(--color-pink)' }} />
                        <div className="metrics__pillar-num" style={{ color: 'var(--color-pink)' }}>2.4B+</div>
                        <div className="metrics__pillar-name">Organic Impressions</div>
                        <div className="metrics__pillar-sub">Global viral distribution across social, web & streaming.</div>
                    </div>

                    <div className="metrics__pillar-card metrics__pillar-card--2">
                        <div className="metrics__pillar-accent" style={{ background: 'var(--color-lightgreen)' }} />
                        <div className="metrics__pillar-num" style={{ color: 'var(--color-lightgreen)' }}>98.6%</div>
                        <div className="metrics__pillar-name">Client Retention</div>
                        <div className="metrics__pillar-sub">4.2x higher than legacy agency holding models.</div>
                    </div>

                    <div className="metrics__pillar-card metrics__pillar-card--3">
                        <div className="metrics__pillar-accent" style={{ background: 'var(--color-orange)' }} />
                        <div className="metrics__pillar-num" style={{ color: 'var(--color-orange)' }}>18.2x</div>
                        <div className="metrics__pillar-name">Peak ROAS Lift</div>
                        <div className="metrics__pillar-sub">Direct commercial performance engineered from hype.</div>
                    </div>

                    <div className="metrics__pillar-card metrics__pillar-card--4">
                        <div className="metrics__pillar-accent" style={{ background: 'var(--color-lightblue)' }} />
                        <div className="metrics__pillar-num" style={{ color: 'var(--color-lightblue)' }}>14+</div>
                        <div className="metrics__pillar-name">Global Honors</div>
                        <div className="metrics__pillar-sub">Awwwards, FWA of the Day, and digital craft accolades.</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
