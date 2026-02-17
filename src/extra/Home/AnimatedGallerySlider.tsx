import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AnimatedGallerySlider.css";

gsap.registerPlugin(ScrollTrigger);

const publicUrl = import.meta.env.BASE_URL || "/";

const AnimatedGallerySlider: React.FC = () => {
  // Root wrapper for everything GSAP touches
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const overlayTextRef = useRef<HTMLDivElement | null>(null);
  const slidesSectionRef = useRef<HTMLElement | null>(null);

  const ANIMATION_CONTROLS = {
    galleryItemStagger: 0.12,
    overlayCharStagger: 0.05,
    overlayCharDuration: 0.4,
    overlayCharEase: "back.out(2)",
    overlayStartY: 40,
  };

  // Split overlay lines into characters (runs inside gsap.context)
  const splitOverlayToChars = (sectionEl: HTMLElement | null) => {
    if (!sectionEl) return;

    const overlayLines = sectionEl.querySelectorAll(".ags-overlay-line");
    overlayLines.forEach((line) => {
      const text = line.getAttribute("data-text") || "";
      // Clear React's empty content and rebuild our spans
      line.textContent = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const span = document.createElement("span");
        span.classList.add("ags-overlay-char");
        span.setAttribute("aria-hidden", "true");

        if (ch === " ") {
          span.textContent = "\u00A0";
          span.classList.add("ags-space-char");
        } else {
          span.textContent = ch;
        }

        line.appendChild(span);
      }
    });
  };

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    // gsap.context safely scopes everything and cleans up on unmount/StrictMode
    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      const galleryEl = galleryRef.current;
      const slidesSectionEl = slidesSectionRef.current;

      if (!sectionEl || !galleryEl) return;

      splitOverlayToChars(sectionEl);

      const galleryItems = gsap.utils.toArray(
        sectionEl.querySelectorAll(".ags-gallery-item")
      ) as HTMLElement[];

      const overlayChars = sectionEl.querySelectorAll(".ags-overlay-char");

      // Initial states
      gsap.set(galleryEl, {
        x: 0,
        y: 0,
        position: "absolute",
        top: -50,
        left: "50%",
        transform: "translateX(-50%)",
      });

      gsap.set(overlayChars, {
        opacity: 0,
        y: ANIMATION_CONTROLS.overlayStartY,
      });

      galleryItems.forEach((item, index) => {
        const offset = -70 * (index + 1);
        gsap.set(item, { autoAlpha: 1, y: offset, scale: 0.98 });
      });

      // Gallery Timeline + ScrollTrigger
      const galleryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "+=1500vh",
          pin: sectionEl, // let ScrollTrigger choose pinType
          scrub: 3,
          invalidateOnRefresh: true,
        },
      });

      galleryTimeline
        .to(
          galleryItems,
          {
            y: "89vh",
            scale: 1,
            stagger: 0.3,
            duration: 5,
            ease: "back.out(1.7)",
          },
          1.5
        )
        .fromTo(
          overlayChars,
          {
            opacity: 0,
            y: ANIMATION_CONTROLS.overlayStartY,
          },
          {
            opacity: 1,
            y: 0,
            duration: ANIMATION_CONTROLS.overlayCharDuration * 3,
            ease: ANIMATION_CONTROLS.overlayCharEase,
            stagger: ANIMATION_CONTROLS.overlayCharStagger * 3,
            force3D: true,
          },
          1.5
        )
        .to(
          galleryItems,
          {
            x: -window.innerWidth - 300,
            stagger: 0.8,
            duration: 8,
            ease: "power2.inOut",
          },
          7
        );

      // Slides Timeline + ScrollTrigger
      if (slidesSectionEl) {
        const slides = gsap.utils.toArray(
          slidesSectionEl.querySelectorAll(".ags-slide")
        ) as HTMLElement[];

        slides.forEach((slide) => {
          gsap.set(slide, {
            x: -window.innerWidth,
            opacity: 1,
          });
        });

        const slidesTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: slidesSectionEl,
            start: "top top",
            end: `+=${slides.length * 800}vh`,
            pin: slidesSectionEl,
            scrub: 5,
            invalidateOnRefresh: true,
          },
        });

        slides.forEach((slide, index) => {
          slidesTimeline.to(
            slide,
            {
              x: 0,
              duration: 1,
              ease: "power1.inOut",
            },
            index * 1.5
          );
        });
      }

      // Make gallery visible once everything is set
      galleryEl.style.visibility = "visible";
    }, rootRef); // end gsap.context

    // Cleanup – this automatically kills all timelines + ScrollTriggers
    // created inside the context and restores inline styles / DOM mutations.
    return () => {
      ctx.revert();
    };
  }, []);

  const backgroundVideo = `${publicUrl}images/hero1.mp4`;

  return (
    <div ref={rootRef}>
      {/* Gallery Section */}
      <section
        ref={sectionRef}
        className="ags-gallery-section"
      >
        <div className="ags-bg-media">
          <video
            className="ags-bg-video"
            src={backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="ags-bg-overlay" aria-hidden="true" />
        </div>

        <div className="ags-section-container">
          {/* Overlay Text */}
          <div
            ref={overlayTextRef}
            className="ags-section-overlay-text"
            aria-label="Own The Extraordinary"
          >
            <div className="ags-overlay-line" data-text="Own  The"></div>
            <div className="ags-overlay-line" data-text="Extraordinary"></div>
          </div>

          {/* Gallery */}
          <div
            ref={galleryRef}
            className="ags-gallery"
            style={{ visibility: "hidden" }}
          >
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/journal_1.jpg`} alt="Property 1" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/journal_2.jpg`} alt="Property 2" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/journal_3.jpg`} alt="Property 3" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/prop_hawcliffe.jpg`} alt="Property 4" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/values_craft.jpg`} alt="Property 5" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/values_evolve.jpg`} alt="Property 6" />
            </div>
            <div className="ags-gallery-item">
              <img src={`${publicUrl}images/hero_architecture.jpg`} alt="Property 7" />
            </div>
          </div>
        </div>
      </section>

      {/* Slides Section */}
      <section
        ref={slidesSectionRef}
        className="ags-slides-section"
      >
        <div className="ags-slides-bg-text">
          <div className="ags-bg-text-line">Real</div>
          <div className="ags-bg-text-line">Gold</div>
          <div className="ags-bg-text-line">Properties</div>
        </div>

        <div className="ags-slides-overlay" />

        <div className="ags-slide">
          <div className="ags-slide-image">
            <img src={`${publicUrl}images/hero_architecture.jpg`} alt="Luxury Villas" />
          </div>
          <div className="ags-slide-content">
            <h2>Luxury Villas</h2>
            <p>
              Architectural masterpieces crafted for those who demand only the
              finest. Our luxury villas blend timeless design with contemporary
              comfort — every detail considered, every material chosen with
              purpose.
            </p>
            <p>
              From private gardens to infinity pools and bespoke interiors,
              each villa is a unique statement of refined living, built to the
              highest standards of quality and craftsmanship.
            </p>
          </div>
        </div>

        <div className="ags-slide">
          <div className="ags-slide-image">
            <img src={`${publicUrl}images/prop_hawcliffe.jpg`} alt="Premium Penthouses" />
          </div>
          <div className="ags-slide-content">
            <h2>Premium Penthouses</h2>
            <p>
              Sky-high living redefined. Our penthouses offer panoramic views,
              private terraces, and impeccably curated interiors that set a new
              standard for elevated urban luxury.
            </p>
            <p>
              Every penthouse is a sanctuary above the city — designed for
              privacy, prestige, and the kind of comfort that can only be
              achieved when nothing is left to chance.
            </p>
          </div>
        </div>

        <div className="ags-slide">
          <div className="ags-slide-image">
            <img src={`${publicUrl}images/values_craft.jpg`} alt="Exclusive Estates" />
          </div>
          <div className="ags-slide-content">
            <h2>Exclusive Estates</h2>
            <p>
              Sprawling private estates that offer seclusion without compromise.
              Gated communities, manicured grounds, and homes of exceptional
              scale — curated for families who value legacy as much as luxury.
            </p>
            <p>
              Our estates are built to endure generations, combining grand
              architecture with the warmth of a true family home in some of the
              most coveted locations.
            </p>
          </div>
        </div>

        <div className="ags-slide">
          <div className="ags-slide-image">
            <img src={`${publicUrl}images/journal_3.jpg`} alt="Your Vision" />
          </div>
          <div className="ags-slide-content">
            <h2>Your Vision</h2>
            <p>
              At Real Gold Properties, we believe every client deserves a home
              that is uniquely theirs. We listen first, then design — ensuring
              your personality, lifestyle, and aspirations are woven into every
              space.
            </p>
            <p>
              350+ premium properties delivered. Schedule a private consultation
              today and let us bring your vision of extraordinary living to life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimatedGallerySlider;
