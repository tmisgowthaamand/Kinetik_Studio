'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const HorizontalWords = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Run heavy GSAP pinning and letter bounce only on desktop (≥ 901px)
        // Mobile uses lightweight, hardware-accelerated 60fps CSS ticker for zero lag
        if (typeof window === 'undefined' || window.innerWidth < 901) {
            return;
        }

        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            if (!container) return;

            const textRef = container.querySelector('.horizontal-words__relative');
            const letters = container.querySelectorAll('.letter');
            const stickers = container.querySelectorAll('.horizontal-words__sticker-watch, .horizontal-words__sticker-cursor, .horizontal-words__sticker-phone');
            const arrows = container.querySelectorAll('.horizontal-words__arrow-svg path, .horizontal-words__arrow-end-svg path');

            const entranceDistance = window.innerHeight;
            const pinnedDistance = 2500;

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: () => `+=${entranceDistance + pinnedDistance}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            scrollTween
                .fromTo(textRef, {
                    x: window.innerWidth
                }, {
                    x: window.innerWidth * 0.5,
                    ease: "none",
                    duration: entranceDistance
                })
                .to(textRef, {
                    x: () => -(textRef.scrollWidth - window.innerWidth * 0.5),
                    ease: "none",
                    duration: pinnedDistance
                });

            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: () => `+=${pinnedDistance}`,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true
            });

            letters.forEach((letter) => {
                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 500,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%',
                        scrub: 0.5
                    }
                });
            });

            stickers.forEach((sticker) => {
                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 400,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 50%',
                        scrub: 0.5
                    }
                });
            });

            arrows.forEach((arrowPath) => {
                if (arrowPath.getTotalLength) {
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 50%',
                            scrub: 0.5
                        }
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const wordContent = (
        <div className="horizontal-words__sticker-svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg"><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>
            <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-thumps-up.svg" className="horizontal-words__sticker-watch" alt="thumbs up sticker" />
            <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-cursor.svg" className="horizontal-words__sticker-cursor" alt="cursor sticker" />
            <img src="/assets/HorizontalWords SVG/horizontal-words-sticker-phone.svg" className="horizontal-words__sticker-phone" alt="phone sticker" />
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg"><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path><path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" ></path></svg>

            <h2 className="display horizontal-words__h2" aria-label="We make the world stop and stare">
                <span className="letter" aria-hidden="true">W</span>
                <span className="letter" aria-hidden="true">e</span>
                {" "}
                <span className="letter" aria-hidden="true">m</span>
                <span className="letter" aria-hidden="true">a</span>
                <span className="letter" aria-hidden="true">k</span>
                <span className="letter" aria-hidden="true">e</span>
                {" "}
                <span className="letter" aria-hidden="true">t</span>
                <span className="letter" aria-hidden="true">h</span>
                <span className="letter" aria-hidden="true">e</span>
                {" "}
                <span className="letter" aria-hidden="true">w</span>
                <span className="letter" aria-hidden="true">o</span>
                <span className="letter" aria-hidden="true">r</span>
                <span className="letter" aria-hidden="true">l</span>
                <span className="letter" aria-hidden="true">d</span>
                {" "}
                <span className="letter" aria-hidden="true">s</span>
                <span className="letter" aria-hidden="true">t</span>
                <span className="letter" aria-hidden="true">o</span>
                <span className="letter" aria-hidden="true">p</span>
                {" "}
                <span className="letter" aria-hidden="true">a</span>
                <span className="letter" aria-hidden="true">n</span>
                <span className="letter" aria-hidden="true">d</span>
                {" "}
                <span className="letter" aria-hidden="true">s</span>
                <span className="letter" aria-hidden="true">t</span>
                <span className="letter" aria-hidden="true">a</span>
                <span className="letter" aria-hidden="true">r</span>
                <span className="letter" aria-hidden="true">e</span>
            </h2>
        </div>
    );

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section">
            <div className="horizontal-words__track-wrapper">
                <div className="horizontal-words__relative">
                    {wordContent}
                    <div className="horizontal-words__mobile-repeat" aria-hidden="true">
                        {wordContent}
                    </div>
                </div>
            </div>

            <div className="horizontal-words__bottom-text">
                <div className="horizontal-words__bottom-text-l">
                    In an era of fleeting attention, we engineer <em>unforgettable</em> digital<br className="desktop-br" />
                    moments. From viral cultural drops to high-voltage web experiences,<br className="desktop-br" />
                    we turn brands into digital powerhouses.
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;
