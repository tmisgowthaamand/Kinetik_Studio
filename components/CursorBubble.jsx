'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function CursorBubble() {
    useEffect(() => {
        // Disable custom cursor bubble on touch / mobile devices for maximum performance
        if (typeof window === 'undefined' || window.matchMedia('(hover: none), (pointer: coarse), (max-width: 768px)').matches) {
            return;
        }

        const cursorBubble = document.querySelector('.cursor-bubble');
        if (!cursorBubble) return;

        const xTo = gsap.quickTo(cursorBubble, 'x', { duration: 0.35, ease: 'power3' });
        const yTo = gsap.quickTo(cursorBubble, 'y', { duration: 0.35, ease: 'power3' });

        let isHoveringClickable = false;
        gsap.set(cursorBubble, { rotation: -30, opacity: 0, scale: 0 });

        const onMouseMove = (e) => {
            xTo(e.clientX + 13);
            yTo(e.clientY - 43);
        };

        const onMouseOver = (e) => {
            const targetSelector = '.footer-column h3, .footer-map-link span, .footer-email, .footer-whatsapp, .single-social, .logo-truus, .nav-work-btn';
            const found = e.target.closest(targetSelector);

            if (found && !isHoveringClickable) {
                isHoveringClickable = true;
                if (found.matches('.logo-truus')) cursorBubble.textContent = 'to home';
                else if (found.matches('.nav-work-btn')) cursorBubble.textContent = 'click';
                else cursorBubble.textContent = 'click';
                gsap.killTweensOf(cursorBubble);
                gsap.to(cursorBubble, { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.8)' });
            } else if (!found && isHoveringClickable) {
                isHoveringClickable = false;
                gsap.killTweensOf(cursorBubble);
                gsap.to(cursorBubble, { opacity: 0, scale: 0, rotation: -30, duration: 0.25, ease: 'power2.in' });
            }
        };

        const onMouseLeave = () => {
            if (isHoveringClickable) {
                isHoveringClickable = false;
                gsap.killTweensOf(cursorBubble);
                gsap.to(cursorBubble, { opacity: 0, scale: 0, rotation: -30, duration: 0.25, ease: 'power2.in' });
            }
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseover', onMouseOver, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave, { passive: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', onMouseOver);
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return <div className="cursor-bubble" aria-hidden="true">click</div>;
}
