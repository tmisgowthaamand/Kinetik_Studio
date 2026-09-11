"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARDS_DATA } from "@/lib/data";

export default function ServiceCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ─── Animate underline SVG paths on scroll ───
      gsap.to(".title-underline-svg path", {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      const cards = gsap.utils.toArray(".card");
      if (!cards.length) return;

      const originalData = [
        { rotation: -6, zIndex: 1, floatDelay: 0, floatDuration: 3.6 },
        { rotation: -2.5, zIndex: 2, floatDelay: 0.4, floatDuration: 4.0 },
        { rotation: 3, zIndex: 3, floatDelay: 0.8, floatDuration: 3.4 },
        { rotation: -4, zIndex: 4, floatDelay: 1.2, floatDuration: 4.2 },
        { rotation: 6, zIndex: 5, floatDelay: 1.6, floatDuration: 3.8 },
      ];

      const mm = gsap.matchMedia();

      // ─── Desktop & Laptop / Tablet Landscape (≥ 901px) ───
      mm.add("(min-width: 901px)", () => {
        // Scroll Entry Fan-Out Animation
        gsap.fromTo(
          cards,
          { scale: 0.8, y: 80, opacity: 0 },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
              trigger: ".cards-wrapper",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Continuous Floating Idle Breathing Animations
        const floatTweens = cards.map((card, i) => {
          const data = originalData[i];
          return gsap.to(card, {
            y: "+=10",
            rotation: `${data.rotation + 1.5}deg`,
            duration: data.floatDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: data.floatDelay,
          });
        });

        // Sticker Floating Micro-Motion
        const stickers = gsap.utils.toArray(".card-sticker");
        stickers.forEach((sticker, i) => {
          gsap.to(sticker, {
            y: i % 2 === 0 ? "-=8" : "+=8",
            rotation: i % 2 === 0 ? "+=5" : "-=5",
            duration: 2.8 + (i * 0.4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });

        // Interactive Card Hover & 3D Elastic Physics
        cards.forEach((card, index) => {
          const sticker = card.querySelector(".card-sticker");

          card.addEventListener("mouseenter", () => {
            floatTweens.forEach((t) => t.pause());
            const spreadDistance = 55;
            const leftCards = [];
            const rightCards = [];

            cards.forEach((otherCard, otherIndex) => {
              if (otherIndex < index) {
                leftCards.push({ card: otherCard, index: otherIndex, distance: index - otherIndex });
              } else if (otherIndex > index) {
                rightCards.push({ card: otherCard, index: otherIndex, distance: otherIndex - index });
              }
            });

            gsap.to(card, {
              x: 0,
              y: -36,
              rotation: 0,
              scale: 1.06,
              zIndex: 35,
              duration: 0.8,
              ease: "elastic.out(1, 0.6)",
              overwrite: "auto",
            });

            if (sticker) {
              gsap.to(sticker, {
                scale: 1.18,
                rotation: 8,
                y: -10,
                duration: 0.45,
                ease: "back.out(2)",
                overwrite: "auto",
              });
            }

            leftCards.forEach((item) => {
              const shiftX = -Math.min(spreadDistance * item.distance, 110);
              gsap.to(item.card, {
                x: shiftX,
                y: 8 * item.distance,
                rotation: originalData[item.index].rotation - 1.5,
                scale: 0.98,
                zIndex: originalData[item.index].zIndex,
                duration: 0.85,
                ease: "elastic.out(1, 0.6)",
                overwrite: "auto",
              });
            });

            rightCards.forEach((item) => {
              const shiftX = Math.min(spreadDistance * item.distance, 110);
              gsap.to(item.card, {
                x: shiftX,
                y: 8 * item.distance,
                rotation: originalData[item.index].rotation + 1.5,
                scale: 0.98,
                zIndex: originalData[item.index].zIndex,
                duration: 0.85,
                ease: "elastic.out(1, 0.6)",
                overwrite: "auto",
              });
            });
          });

          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;
            const tiltX = (mouseY / rect.height) * -10;
            const tiltY = (mouseX / rect.width) * 10;

            gsap.to(card, {
              rotateX: tiltX,
              rotateY: tiltY,
              duration: 0.3,
              ease: "power2.out",
              transformPerspective: 1000,
              overwrite: "auto",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.5,
              ease: "power2.out",
            });

            if (sticker) {
              gsap.to(sticker, {
                scale: 1,
                rotation: 0,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto",
              });
            }

            cards.forEach((c, i) => {
              gsap.to(c, {
                x: 0,
                y: 0,
                scale: 1,
                rotation: originalData[i].rotation,
                zIndex: originalData[i].zIndex,
                duration: 1.0,
                ease: "elastic.out(1, 0.6)",
                overwrite: "auto",
                onComplete: () => {
                  if (i === cards.length - 1) {
                    floatTweens.forEach((t) => t.resume());
                  }
                },
              });
            });
          });
        });
      });

      // ─── Mobile, Foldables & Tablets in Portrait (≤ 900px) ───
      mm.add("(max-width: 900px)", () => {
        // Natural swipeable scroll without vertical pin spacers or blank gaps
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".cards-wrapper",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* ─── "Call us if you need:" Heading ─── */}
      <div className="title-container">
        <h2 className="main-title">
          call us if you <span className="italic-text">need:</span>
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          viewBox="0 0 159 17"
          fill="none"
          className="title-underline-svg"
        >
          <path
            d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>

      {/* ─── Service Cards ─── */}
      <div className="cards-wrapper" id="cards-wrapper">
        {CARDS_DATA.map((card) => (
          <div key={card.color} className={`card card-${card.color}`}>
            <div className={`card-sticker sticker-${card.sticker}`}>
              <img
                src={`/assets/Card-Sticker SVG/sticker-${card.sticker}.svg`}
                alt=""
                width="100%"
                loading="lazy"
                aria-hidden="true"
              />
            </div>
            <h3 className="card-title">{card.title}</h3>
            <svg
              width="100%"
              height="10"
              className="card-divider-svg"
              aria-hidden="true"
            >
              <use href="#card-divider" />
            </svg>
            <ul className="card-list">
              {card.services.map((service) => (
                <li key={service}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="16"
                    className="services-card__bullet-svg"
                    aria-hidden="true"
                  >
                    <use href="#bullet-icon" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
