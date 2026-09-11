'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        // ② Start white (on-dark) — video is dark background
        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const metricsSection = document.querySelector('#metrics-section');
            const metricsTop = metricsSection ? metricsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= metricsTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp
        const cleanups = [];
        const logoTruus = document.querySelector('.logo-truus');
        if (logoTruus) cleanups.push(initWiggle(logoTruus, WIGGLE_CONFIG.logoTruus));

        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
            gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
        }
        const showOverlay = () => {
            if (overlay) {
                gsap.set(overlay, { visibility: 'visible' });
                gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
            }
        };
        const hideOverlay = () => {
            if (overlay) {
                gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
            }
        };

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');
        const workBlob = document.querySelector('.nav-bar__work-blob-svg');

        if (navLeft && workBox && workBlob) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            // Temporarily show to measure both the box AND the blob icon center
            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const blobRect = workBlob.getBoundingClientRect();
            // Icon center relative to the box's own top-left
            const originX = (blobRect.left + blobRect.width / 2) - boxRect.left;
            const originY = (blobRect.top + blobRect.height / 2) - boxRect.top;
            const workOrigin = `${originX}px ${originY}px`;

            // Start collapsed, scaling FROM the icon center
            gsap.set(workBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: workOrigin
            });
            gsap.set(workItems, { y: 10, opacity: 0 });
            gsap.set(workBlob, { transformOrigin: 'center center' });

            const onEnterLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                showOverlay();

                // Fast 360 blob spin — like it's spinning then releasing the box
                gsap.to(workBlob, { rotation: '+=360', duration: 0.7, ease: 'power3.inOut' });

                gsap.set(workBox, { visibility: 'visible' });
                // Box grows out smoothly from the icon center
                gsap.fromTo(workBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveLeft = () => {
                gsap.killTweensOf(workBox);
                gsap.killTweensOf(workItems);
                gsap.killTweensOf(workBlob);
                hideOverlay();

                gsap.to(workBlob, { rotation: 0, duration: 0.5, ease: 'power2.out' });

                // Items fade quickly
                gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into icon smoothly
                gsap.to(workBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                });
            };

            navLeft.addEventListener('mouseenter', onEnterLeft);
            navLeft.addEventListener('mouseleave', onLeaveLeft);
            cleanups.push(() => {
                navLeft.removeEventListener('mouseenter', onEnterLeft);
                navLeft.removeEventListener('mouseleave', onLeaveLeft);
            });
        }

        // ─── Navbar Right (WhatsApp) Hover ───
        const navRight = document.querySelector('.nav-right');
        const waBox = document.querySelector('.nav-wa-box');
        const waSvgPath = document.querySelector('.nav-bar__whatsapp-svg path');

        if (navRight && waBox) {
            const waInner = waBox.querySelector('.nav-popout-inner');
            const waItems = waInner ? Array.from(waInner.children) : [];
            const waIcon = document.querySelector('.nav-bar__whatsapp-svg');

            // Temporarily show to measure both the box AND the WA icon center
            gsap.set(waBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const waBoxRect = waBox.getBoundingClientRect();
            const waIconRect = waIcon ? waIcon.getBoundingClientRect() : waBoxRect;
            // Icon center relative to the box's own top-left
            const waOriginX = (waIconRect.left + waIconRect.width / 2) - waBoxRect.left;
            const waOriginY = (waIconRect.top + waIconRect.height / 2) - waBoxRect.top;
            const waOrigin = `${waOriginX}px ${waOriginY}px`;

            // Start collapsed, scaling FROM the WA icon center
            gsap.set(waBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: waOrigin
            });
            gsap.set(waItems, { y: 10, opacity: 0 });

            const onEnterRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                showOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: '#0e6634ff', duration: 0.3 }); // Darker WA green

                gsap.set(waBox, { visibility: 'visible' });
                // Box grows out smoothly from the WA icon center
                gsap.fromTo(waBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(waItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                hideOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: 'currentColor', duration: 0.3 });

                // Items fade quickly
                gsap.to(waItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into WA icon smoothly
                gsap.to(waBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(waBox, { visibility: 'hidden' })
                });
            };

            navRight.addEventListener('mouseenter', onEnterRight);
            navRight.addEventListener('mouseleave', onLeaveRight);
            cleanups.push(() => {
                navRight.removeEventListener('mouseenter', onEnterRight);
                navRight.removeEventListener('mouseleave', onLeaveRight);
            });
        }

        // ─── Work Item: badge wiggle + image tilt on hover ───
        const workItems = document.querySelectorAll('.nav-work-item');
        workItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        // ─── All Our Work btn: wiggle intensity 4 (bubble handled by CursorBubble) ───
        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className="navbar">
                <div className="nav-left" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="55" viewBox="0 0 52 48" fill="none" className="nav-bar__work-blob-svg" aria-hidden="true">
                                <path
                                    d="M51.9374 7.15723C51.4261 6.40359 50.38 7.32816 49.7458 7.55542C48.6021 7.9944 47.2965 8.46446 46.2388 8.97919C45.7938 9.20257 45.4737 9.40458 44.9214 9.60853C43.7798 9.97564 42.4703 10.0475 41.233 10.3175C40.5733 10.4476 40.0308 10.739 39.4199 10.8614C38.9457 10.9682 38.4422 10.9604 37.9601 11.0032C37.1737 11.1022 36.5043 11.2052 35.7412 11.178C35.144 11.1955 34.4571 11.1877 33.8404 11.0945C33.3134 11.0304 32.7358 11.1003 32.2264 11.0711C30.7959 10.9255 29.4864 10.7973 28.1886 10.0961C27.326 9.66291 26.5571 8.96365 25.7491 8.46446C24.7538 7.79239 24.0942 6.90084 23.4131 5.95101C22.689 4.95651 21.9923 3.83575 21.4166 2.76938C21.1024 2.24882 20.9307 1.68747 20.7394 1.12418C20.6125 0.809514 20.5891 0.467654 20.4271 0.275357C20.1734 -0.0470787 19.6192 -0.122832 19.3635 0.246222C19.1606 0.535637 19.102 0.898864 18.983 1.28151C18.7839 2.05264 18.6219 2.70917 18.4814 3.49001C18.4034 4.06495 18.3721 4.61465 18.2004 5.15658C17.7828 6.21906 17.7125 7.40974 17.3027 8.43144C17.1387 8.94423 16.7406 9.85521 16.4928 10.4768C16.1122 11.3761 15.9463 12.392 15.5423 13.2816C15.2652 13.874 15.1481 14.2411 14.8768 14.7714C14.4416 15.6513 13.8698 16.4263 13.3878 17.3237C13.0209 18.0404 12.5271 18.5804 12.1329 19.2952C11.93 19.6507 11.7524 20.0547 11.4889 20.346C10.7785 21.123 9.9452 21.9252 9.18993 22.6517C8.63373 23.1897 8.14779 23.9142 7.49011 24.3066C6.59824 24.8038 5.9386 25.6818 4.92183 25.9537C4.08655 26.3305 2.99366 26.2198 2.13692 26.4412C1.7466 26.6549 1.42654 26.82 0.938646 26.9754C0.636151 27.0628 0.331705 27.1444 0.146304 27.3678C-0.0644664 27.595 -0.0508039 27.9777 0.208756 28.1661C0.493687 28.4031 1.05769 28.339 1.48899 28.2652C2.27743 28.1913 2.97024 28.2244 3.79967 28.1603C4.42807 28.1525 5.05649 28.3137 5.67319 28.3526C7.13687 28.4322 8.56933 29.248 9.49633 30.3396C10.0603 31.1438 10.7434 31.9906 11.202 32.8822C11.5631 33.7874 12.01 34.6478 12.2422 35.5977C12.3554 36.6543 12.4491 37.711 12.5115 38.7657C12.531 39.6437 12.4803 40.4808 12.4745 41.3879C12.5623 42.6272 12.613 43.7771 12.2344 45.0027C12.1251 45.5699 11.9124 46.1662 11.8324 46.7178C11.7797 47.1665 12.0373 47.489 12.3417 47.7706C13.3527 48.532 13.6278 47.1976 14.2543 46.677C14.5704 46.3818 15.0505 46.0982 15.3823 45.7913C15.9248 45.2902 16.4303 44.7968 17.0568 44.3947C17.8101 43.9247 18.456 43.3983 19.225 42.936C19.8397 42.6136 20.3764 42.3882 20.9111 42.1357C21.8284 41.755 22.6812 41.3627 23.6492 41.0208C24.2171 40.8207 24.8514 40.6615 25.3783 40.3856C25.6886 40.2205 25.9013 40.0787 26.2136 39.9797C26.5883 39.8554 27.0176 39.8379 27.4138 39.7408C28.0032 39.5757 28.6374 39.5543 29.26 39.496C30.1851 39.3659 30.9813 39.2319 31.881 39.1076C32.7084 38.9696 33.5515 39.0629 34.381 39.0104C35.1811 38.9541 35.9871 39.0396 36.7424 39.1522C37.4254 39.2183 38.1397 39.2455 38.8208 39.4164C39.5331 39.5776 40.185 39.5796 40.8485 39.7058C41.5276 39.8495 42.1034 39.9855 42.8293 40.172C43.731 40.3992 44.6111 40.7702 45.5108 40.9742C46.2212 41.0849 46.8711 41.4811 47.5951 41.7822C48.4987 42.0813 49.9077 43.4022 50.8152 42.9379C51.1919 42.5631 50.3488 41.8308 50.1673 41.5045C50.0092 41.2889 49.8336 41.0422 49.6365 40.881C49.1544 40.5177 48.6665 40.1409 48.3465 39.6242C47.841 38.8725 47.3336 38.0995 46.8672 37.307C46.6291 36.8893 46.3246 36.6096 46.0456 36.1066C45.8075 35.6656 45.5655 35.1276 45.3488 34.6517C44.777 33.4824 44.5448 32.5423 44.2852 31.3671C44.1213 30.9534 43.9749 30.495 43.8266 30.0716C43.6646 29.5743 43.6783 29.0499 43.6119 28.5021C43.5358 27.494 43.407 26.4529 43.4402 25.4972C43.4382 24.3299 43.8539 23.1139 43.9749 21.9582C44.256 20.7054 44.7712 19.6604 45.2474 18.4192C45.667 17.4635 45.9148 16.4574 46.4671 15.5503C46.6974 15.1482 46.9589 14.7403 47.1033 14.3169C47.1306 14.2353 47.1287 14.2411 47.1423 14.2023C47.1736 14.1051 47.2029 14.008 47.2263 13.909C47.3395 13.3088 47.7161 12.7591 48.1299 12.3104C48.5729 11.817 48.8324 11.2848 49.2754 10.7487C49.6462 10.3058 49.9936 9.8455 50.3703 9.38709C50.9479 8.67424 52.2809 8.27022 51.9471 7.18637L51.9374 7.16695V7.15723Z"
                                    fill="#F5693C"
                                />
                            </svg>
                            <span className="logo-work-text">work</span>
                        </div>

                        {/* Pop-out Box for Left Side */}
                        <div className="nav-popout nav-work-box">
                            <div className="nav-popout-inner">
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80" crossOrigin="anonymous" referrerPolicy="no-referrer" loading="eager" alt="Neo-Tokyo 2088" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-maroon">cyberpunk / ar</span>
                                        <h4 className="nav-work-title">neo-tokyo 2088</h4>
                                    </div>
                                </div>
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80" crossOrigin="anonymous" referrerPolicy="no-referrer" loading="eager" alt="Aura Street Culture" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-pink">digital fashion</span>
                                        <h4 className="nav-work-title">aura street culture</h4>
                                    </div>
                                </div>
                                <div className="nav-work-item">
                                    <div className="nav-work-item__img-wrap">
                                        <img src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80" crossOrigin="anonymous" referrerPolicy="no-referrer" loading="eager" alt="Hyper Space Odyssey" className="nav-work-item__img" />
                                    </div>
                                    <div className="nav-work-item__text">
                                        <span className="nav-work-badge badge-darkblue">immersive webgl</span>
                                        <h4 className="nav-work-title">hyper space odyssey</h4>
                                    </div>
                                </div>
                                <a href="#cards-wrapper" className="nav-work-btn"><span className="nav-work-btn__text">All Selected Work</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-center" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <svg className="logo-truus" width="240" height="40" viewBox="0 0 240 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                        <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontFamily="var(--font-display)" fontWeight="900" fontSize="26" letterSpacing="3.5">
                            KINETIK
                        </text>
                    </svg>
                </div>
                <div className="nav-right" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-whatsapp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 25 27" fill="none" className="nav-bar__whatsapp-svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.601 0.986335C11.8021 1.01421 11.8112 1.04366 12.0483 1.04591C12.4513 1.04943 12.8582 1.03181 13.2602 1.04591C14.7297 1.09749 16.3092 1.56281 17.684 2.0713C18.1173 2.2315 18.4074 2.52491 18.7836 2.75782C18.9541 2.86323 19.1764 2.93811 19.3335 3.03712C19.5277 3.15943 19.7215 3.30714 19.9233 3.43555C20.3796 3.7252 20.7523 4.04895 21.1381 4.42383C21.197 4.48126 21.2369 4.59395 21.2729 4.62403C21.314 4.65863 21.388 4.65528 21.4399 4.6963C21.7068 4.90722 22.4207 5.74735 22.6147 6.04298C22.7185 6.20149 22.7985 6.47832 22.9067 6.61329C23.0415 6.7815 23.1644 6.86231 23.2963 7.08692C23.7885 7.92434 24.1902 8.84837 24.4702 9.7793C24.6279 10.304 24.8111 10.9219 24.8608 11.4668C24.9707 12.6708 25.0812 13.7784 24.9155 14.9785C24.8495 15.4578 24.7632 15.9691 24.6469 16.4365C24.4028 17.4173 23.9978 18.3669 23.5952 19.3125L23.5942 19.3154C23.2319 20.1653 22.4331 20.9908 21.8686 21.71C21.6788 21.9518 21.5246 22.1892 21.2797 22.3965C21.0348 22.6037 20.7282 22.768 20.4858 22.9746C20.3515 23.0889 20.2324 23.2615 20.0844 23.3711C19.9297 23.4854 19.7093 23.5536 19.5795 23.6641C18.8674 24.2709 18.4307 24.4852 17.5708 24.8457C16.3894 25.341 15.3983 25.5527 14.143 25.8154C14.0198 25.8414 13.6705 25.8663 13.5473 25.8525C12.9146 25.7827 12.2271 25.9044 11.5727 25.8545C10.0414 25.7376 8.57578 25.2528 7.1401 24.7734C7.00809 24.7291 6.84411 24.5744 6.72701 24.5498C6.36124 24.4742 5.86748 24.7318 5.5151 24.8535C4.11582 25.337 2.69086 25.7679 1.29732 26.2774C1.16321 26.3264 1.01916 26.4488 0.862752 26.4805C0.562812 26.5413 0.382276 26.4893 0.175252 26.2725C-0.0110214 26.0774 -0.0238393 25.8442 0.0414625 25.5899C0.195974 24.988 0.457528 24.3357 0.623494 23.7432C0.689129 23.509 0.689327 23.2415 0.768025 22.9912C0.86868 22.6711 1.01713 22.3593 1.10885 22.0225C1.25986 21.4672 1.50066 20.9638 1.61568 20.3877C1.66507 20.1397 1.73727 19.8129 1.65474 19.5703C1.54703 19.2542 1.22105 18.8061 1.07857 18.4512C0.98014 18.2061 0.934053 17.924 0.84615 17.6924C0.795172 17.5578 0.685305 17.446 0.623494 17.3076C0.333338 16.6573 0.234002 15.75 0.137166 15.044C0.0291742 14.2597 -0.0144194 13.51 0.00435316 12.7207C0.00976743 12.4965 0.125735 12.263 0.156697 12.0391C0.225199 11.5469 0.215443 11.048 0.327595 10.5459C0.427657 10.0991 0.607537 9.65975 0.740681 9.23341C1.04177 8.26936 1.59197 7.3249 2.13326 6.47266C2.68319 5.60691 3.57311 4.75118 4.3276 4.06934C4.65535 3.77309 4.99265 3.53295 5.33345 3.25684C5.60926 3.03334 5.96284 2.93518 6.23677 2.75782C6.99243 2.26894 7.82882 1.80324 8.70553 1.52735C9.27166 1.34921 11.0774 0.914319 11.601 0.986335ZM8.61275 6.26563C8.24195 6.2935 7.52111 6.42855 7.19381 6.59864C7.0884 6.6534 7.03981 6.75373 6.9526 6.80469C6.77895 6.90626 6.5672 6.92775 6.35787 7.0713C5.53363 7.63716 5.10203 9.42643 5.26802 10.3643C5.304 10.5685 5.34605 10.781 5.38521 10.9824C5.4843 11.4925 5.65625 11.8143 5.77095 12.292C5.86034 12.6635 6.20472 13.0539 6.33052 13.4258C8.20336 16.9242 11.6057 19.8244 15.6147 20.3848C16.7183 20.42 17.5983 20.0958 18.5063 19.5127C18.9765 19.211 19.0117 18.9824 19.1938 18.5078C19.2868 18.2656 19.5158 18.014 19.5639 17.7266C19.5849 17.6004 19.5657 17.4844 19.5854 17.3643C19.6052 17.2441 19.6944 17.1274 19.7231 16.9902C19.7846 16.6955 19.8101 16.284 19.5297 16.0918C19.3912 15.9972 19.1379 15.9595 19.0063 15.8828C18.956 15.8537 18.9069 15.7462 18.8461 15.6914C18.5871 15.4585 18.1002 15.3976 17.7778 15.2607C17.3352 15.0726 16.4148 14.5509 15.9633 14.5606C15.9382 14.5622 15.5716 14.6637 15.5424 14.6758C15.3846 14.7418 15.0675 15.2811 14.976 15.4502C14.8888 15.611 14.7512 16.0087 14.6655 16.1143C14.3396 16.5154 13.5792 16.4394 13.1704 16.2139C12.3996 15.7887 11.4294 14.9649 10.8569 14.3145C10.5344 13.9479 9.89438 13.3129 9.76314 12.8535C9.62042 12.3534 9.57275 11.9847 9.94869 11.5781C10.159 11.351 10.6709 10.903 10.7944 10.6367C10.8861 10.4394 10.8788 10.1244 10.7983 9.92481C10.4411 9.04176 10.0609 8.17693 9.69478 7.28907C9.64899 7.17828 9.63771 7.05901 9.58931 6.94727C9.51318 6.77179 9.28563 6.52143 9.13717 6.41016C9.00243 6.30927 8.7781 6.25318 8.61275 6.26563Z" fill="currentColor"></path>
                            </svg>
                        </div>

                        {/* Pop-out Box for Right Side */}
                        <div className="nav-popout nav-wa-box">
                            <div className="nav-popout-inner">
                                <img src="/assets/wa_qr_code.png" className="nav-wa-qr" alt="WhatsApp QR Code" />
                                <h4 className="nav-wa-title">talk with kinetik</h4>
                                <p className="nav-wa-desc">Scan to connect with our executive team directly via WhatsApp.</p>
                                <a href="mailto:hello@kinetik.studio" className="nav-wa-link">
                                    <span className="nav-wa-link-text">Email us directly</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="draw-btn__svg nav-wa-link-svg">
                                        <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                        <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
