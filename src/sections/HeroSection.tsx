import { useEffect, useRef } from "react";
import gsap from "gsap";
import BtnSecondary from "../components/BtnSecondary";
import "./HeroSection.css";

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */
export default function HeroSection({ ready = false }: { ready?: boolean }) {
  const bgRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const revealSubRef = useRef<HTMLDivElement>(null);
  const revealCtaRef = useRef<HTMLDivElement>(null);

  // Set initial states on mount — bg fully visible, only content hidden
  useEffect(() => {
    const bg = bgRef.current;
    const vignette = vignetteRef.current;
    const revealSub = revealSubRef.current;
    const revealCta = revealCtaRef.current;

    if (!bg || !vignette || !revealSub || !revealCta) return;

    gsap.set(bg, { opacity: 1, scale: 1.02 });
    gsap.set(vignette, { opacity: 0.5 });
    gsap.set([revealSub, revealCta], { x: -60, opacity: 0 });
    gsap.set(revealCta, { scale: 0.9 });
  }, []);

  // Animate subtitle + CTA after ready; titles handled by char-reveal via data-gsap
  useEffect(() => {
    if (!ready) return;

    const revealSub = revealSubRef.current;
    const revealCta = revealCtaRef.current;

    if (!revealSub || !revealCta) return;

    const tl = gsap.timeline({ delay: 0.95 });
    tl.to(revealSub, { x: 0, opacity: 1, duration: 0.7, ease: "power4.out" }, 0.35);
    tl.to(revealCta, { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power4.out" }, 0.45);

    return () => { tl.kill(); };
  }, [ready]);

  /* ═══════════════════════════════════════════════════
     JSX
     ═══════════════════════════════════════════════════ */
  return (
    <div className="rg-hero-wrap">
      <section className="rg-hero">
        <div
          className="rg-hero__bg"
          ref={bgRef}
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(0deg, rgba(7, 20, 37, 0.2), rgba(7, 20, 37, 0.15)), url("public/images/journal_3.jpg")',
          }}
        ></div>
        <div
          className="rg-hero__vignette"
          ref={vignetteRef}
          aria-hidden="true"
        ></div>
        {/* ── REVEAL ── */}
        <div className="rg-hero__reveal">
          <div className="rg-reveal__line">
            <div className="rg-reveal__text" data-gsap="char-reveal" data-gsap-start="top 100%">
              Luxury <span className="rg-gold">Redefined</span>
            </div>
          </div>
          <div className="rg-reveal__line">
            <div className="rg-reveal__text" data-gsap="char-reveal" data-gsap-start="top 100%" data-gsap-delay="0.15">
              Living <span className="rg-amber">Elevated</span>
            </div>
          </div>
          <div className="rg-reveal__sub" ref={revealSubRef}>
            350+ premium properties delivered — luxury villas, penthouses &amp;
            exclusive estates crafted for those who demand the extraordinary.
          </div>
          <div className="rg-reveal__cta" ref={revealCtaRef}>
            <BtnSecondary label="Explore Properties" />
          </div>
        </div>
      </section>
    </div>
  );
}
