import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Language-native greetings (no labels shown)
const GREETINGS: string[] = [
  'नमस्ते',        // Hindi
  'নমস্কার',       // Bengali
  'வணக்கம்',      // Tamil
  'నమస్కారం',     // Telugu
  'ನಮಸ್ಕಾರ',      // Kannada
  'നമസ്കാരം',     // Malayalam
  'નમસ્તે',       // Gujarati
  'नमस्कार',      // Marathi
  'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', // Punjabi
  'السلام علیکم', // Urdu
  'नमस्ते',        // Nepali
  'Hello',        // English
  'Hola',         // Spanish
  'Bonjour',      // French
  'Guten Tag',    // German
  'Ciao',         // Italian
  'Olá',          // Portuguese
  'こんにちは',    // Japanese
  '你好',          // Chinese
  '안녕하세요',    // Korean
];

export const LandingIntro: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const wordsWrapRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finishedRef = useRef(false);
  const progressRef = useRef(0);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const touchYRef = useRef(0);
    const targetProgressRef = useRef(0);
    const smoothRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (finishedRef.current) return;

    // Base layer (landing + navbar) stays put under this overlay.
    // Document scroll is frozen until the overlay fully dissolves.
    document.documentElement.classList.add('intro-active');
    window.scrollTo(0, 0);

    const finishIntro = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      const veil = veilRef.current;
      if (veil) {
        gsap.set(veil, { autoAlpha: 0, pointerEvents: 'none', display: 'none' });
      }

      // Unlock base layer for normal browsing at the absolute top
      document.documentElement.classList.remove('intro-active');
      document.documentElement.classList.add('intro-done');
      window.scrollTo(0, 0);

      requestAnimationFrame(() => window.scrollTo(0, 0));
    };

    const words = wordRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(words, { autoAlpha: 0, scale: 0.78, y: 28, filter: 'blur(10px)' });
    gsap.set(veilRef.current, { autoAlpha: 1 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } });
    timelineRef.current = tl;

    // Phase 1 — quick greeting cascade
    const step = 0.28;
    words.forEach((el, i) => {
      const at = i * step;
      tl.to(
        el,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.18,
          ease: 'back.out(1.6)',
        },
        at
      );
      tl.to(
        el,
        {
          autoAlpha: 0,
          scale: 1.12,
          y: -22,
          filter: 'blur(10px)',
          duration: 0.18,
          ease: 'power2.in',
        },
        at + 0.22
      );
    });

    const afterWords = (words.length - 1) * step + 0.45;

    if (hintRef.current) {
      tl.to(hintRef.current, { autoAlpha: 0, duration: 0.2 }, step * 2);
    }

    // Phase 2 — brief black beat
    tl.to(wordsWrapRef.current, { autoAlpha: 0, duration: 0.2 }, afterWords);
    tl.to({}, { duration: 0.35 }, afterWords);

    // Phase 3 — dissolve veil over the full landing base (navbar + hero)
    tl.to(
      veilRef.current,
      {
        autoAlpha: 0,
        duration: 1.4,
        ease: 'power1.inOut',
      },
      afterWords + 0.35
    );

    const setProgress = (next: number) => {
      if (finishedRef.current) return;
      const p = gsap.utils.clamp(0, 1, next);
      progressRef.current = p;
      tl.progress(p);
      if (p >= 0.999) finishIntro();
    };

    // Smoothly ease the actual timeline toward the touch target so a single
    // swipe reveals only a few greetings gradually instead of dumping them all.
    const startSmoothing = () => {
      if (smoothRafRef.current != null) return;
      const tickSmooth = () => {
        const diff = targetProgressRef.current - progressRef.current;
        if (Math.abs(diff) < 0.0005) {
          progressRef.current = targetProgressRef.current;
          tl.progress(progressRef.current);
          if (progressRef.current >= 0.999) finishIntro();
          smoothRafRef.current = null;
          return;
        }
        setProgress(progressRef.current + diff * 0.08);
        smoothRafRef.current = requestAnimationFrame(tickSmooth);
      };
      smoothRafRef.current = requestAnimationFrame(tickSmooth);
    };

    // Wheel drives overlay progress only — never moves the base page
    const onWheel = (e: WheelEvent) => {
      if (finishedRef.current) return;
      e.preventDefault();
      // Positive deltaY = scroll down = advance intro
      setProgress(progressRef.current + e.deltaY * 0.00055);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (finishedRef.current) return;
      touchYRef.current = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (finishedRef.current) return;
      e.preventDefault();
      const y = e.touches[0]?.clientY ?? touchYRef.current;
      const delta = touchYRef.current - y;
      touchYRef.current = y;
      // Much lower sensitivity + eased toward a target so one swipe only
      // advances a few greetings instead of exhausting the whole timeline.
      targetProgressRef.current = gsap.utils.clamp(
        0,
        1,
        targetProgressRef.current + delta * 0.00035
      );
      startSmoothing();
    };

    // Block keyboard page scroll during overlay
    const onKeyDown = (e: KeyboardEvent) => {
      if (finishedRef.current) return;
      const keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        setProgress(progressRef.current + 0.04);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setProgress(progressRef.current - 0.04);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      if (smoothRafRef.current != null) cancelAnimationFrame(smoothRafRef.current);
      tl.kill();
      document.documentElement.classList.remove('intro-active');
    };
  }, []);

  return (
    <div ref={rootRef} className="landing-intro-root" aria-hidden="true">
      {/* Independent top layer: black + greetings. Base site sits underneath. */}
      <div
        ref={veilRef}
        className="landing-intro-veil"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#000',
          willChange: 'opacity',
        }}
      >
        <div
          ref={wordsWrapRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {GREETINGS.map((text, i) => (
            <div
              key={`${text}-${i}`}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              style={{
                position: 'absolute',
                textAlign: 'center',
                opacity: 0,
                willChange: 'transform, opacity, filter',
                padding: '0 1.25rem',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.6rem, 8.5vw, 6.5rem)',
                fontWeight: 700,
                color: 'hsl(42, 92%, 62%)',
                textShadow: '0 4px 36px rgba(255, 200, 60, 0.45)',
                lineHeight: 1.15,
              }}
            >
              {text}
            </div>
          ))}

          <div
            ref={hintRef}
            style={{
              position: 'absolute',
              bottom: '6vh',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.8rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Scroll to begin
          </div>
        </div>
      </div>
    </div>
  );
};
