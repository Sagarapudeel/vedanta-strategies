import React, { useState, useEffect } from 'react';

/**
 * Cinematic Logo Opening Animation for Vedanta Strategies
 * Shows the official site logo by rendering the exact /images/logo.svg file
 * (same asset used in the Navbar, Footer, and Admin) — no re-created
 * geometry, so the logo and its text are pixel-identical to the real one.
 * No tagline, buttons, or extra text.
 * On exit, the logo settles into the top-left corner of the viewport
 * (where the site logo sits in the navbar) and the overlay fades,
 * revealing the homepage beneath.
 */
export default function LogoIntroAnimation({ onComplete, forceShow = false }) {
  const [stage, setStage] = useState('init'); // 'init' -> 'crest' -> 'flare' -> 'exit' -> 'done'
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Check if already seen in current session (unless forceShow is requested)
    const hasSeen = sessionStorage.getItem('vedanta_intro_seen');
    if (hasSeen && !forceShow) {
      if (onComplete) onComplete();
      return;
    }

    // Sequence timeline:
    // 0ms: init
    // 150ms: logo emerges
    const t1 = setTimeout(() => setStage('crest'), 150);

    // 900ms: luxury light sweep
    const t2 = setTimeout(() => setStage('flare'), 900);

    // 1800ms: logo settles into top-left (navbar) position
    const t3 = setTimeout(() => setStage('exit'), 1800);

    // 2450ms: unmount completely
    const t4 = setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('vedanta_intro_seen', 'true');
      if (onComplete) onComplete();
    }, 2450);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceShow]);

  const handleSkip = () => {
    if (skipped || stage === 'done') return;
    setSkipped(true);
    setStage('exit');
    setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('vedanta_intro_seen', 'true');
      if (onComplete) onComplete();
    }, 700);
  };

  if (stage === 'done') return null;

  return (
    <div
      className={`vedanta-intro-overlay ${stage === 'exit' ? 'intro-exiting' : ''}`}
      onClick={handleSkip}
      title="Click or press Esc to enter immediately"
    >
      {/* Central Stage — The Official Logo */}
      <div className={`intro-stage-wrap ${stage}`}>

        {/* Soft Golden Bloom behind Logo */}
        <div className="crest-halo-glow" />

        {/* The exact site logo asset — identical to Navbar/Footer */}
        <div className="intro-svg-box">
          <img
            src="/images/logo.svg"
            alt="Vedanta Strategies"
            className="intro-svg-element"
            draggable={false}
          />
        </div>

      </div>
    </div>
  );
}