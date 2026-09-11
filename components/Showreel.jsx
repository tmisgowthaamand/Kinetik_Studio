'use client';

import { useEffect, useRef, useState } from 'react';

export default function Showreel() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);
    const [introVisible, setIntroVisible] = useState(true);

    // Initial intro title shows for 2.2 seconds then fades away permanently
    useEffect(() => {
        const timer = setTimeout(() => {
            setIntroVisible(false);
            setHasStarted(true);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (!hasStarted) {
            setIntroVisible(false);
            setHasStarted(true);
        }
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const toggleMute = (e) => {
        if (e) e.stopPropagation();
        if (!videoRef.current) return;
        const nextMuted = !isMuted;
        videoRef.current.muted = nextMuted;
        if (!nextMuted) {
            videoRef.current.volume = 1.0;
            videoRef.current.play().catch(() => {});
        }
        setIsMuted(nextMuted);
    };

    return (
        <section
            className={`showreel-section ${introVisible ? 'is--intro-visible' : 'is--intro-hidden'} ${isPlaying ? 'is--playing' : 'is--paused'}`}
            id="showreel-section"
            onClick={togglePlay}
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                poster="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                suppressHydrationWarning
                className="showreel__video"
                style={{ backgroundColor: '#0a0a0a' }}
            >
                <source src="/videos/showreel.mp4" type="video/mp4" />
            </video>

            {/* Subtle Vignette */}
            <div className="showreel__overlay" />

            {/* Initial Intro Splash Title (Fades away permanently after start) */}
            <div className="showreel__intro-banner">
                <div className="showreel__tag">Selected Works • 2025–2026</div>
                <h2 className="showreel__title">KINETIK REEL</h2>
            </div>

            {/* Subtle Center Pause Indicator (Only shows when paused, without blocking the screen) */}
            {!isPlaying && (
                <div className="showreel__pause-indicator">
                    <div className="showreel__play-circle">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6,3 20,12 6,21" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Floating Bottom Mini HUD (Clean, always responsive, never pops up disturbing text) */}
            <div className="showreel__hud" onClick={(e) => e.stopPropagation()}>
                <button
                    className="showreel__hud-btn"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause Reel' : 'Play Reel'}
                >
                    {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                </button>
                <div className="showreel__hud-divider" />
                <button
                    className="showreel__hud-btn showreel__hud-btn--sound"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                    {isMuted ? '🔇 SOUND OFF' : '🔊 SOUND ON'}
                </button>
            </div>
        </section>
    );
}
