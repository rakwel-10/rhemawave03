(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  const media = document.querySelector('.hero__media');
  const stage = document.querySelector('.hero__stage');
  if (!media || !stage) return;

  gsap.registerPlugin(ScrollTrigger);

  // Desktop only: pinned timeline for the video stage.
  // Add tweens with position labels 0–1 as more objects are introduced
  // into .hero__media — they'll scrub across the same pin.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 769px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: media,
        start: 'top top',
        end: '+=500%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });

    tl.to(stage, { scale: 1, ease: 'none' }, 0);
  });
})();
