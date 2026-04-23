(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (matchMedia('(max-width: 768px)').matches) return;

  const container = document.querySelector('.hero__words');
  if (!container) return;

  const words = [
    'Healthy', 'Healing', 'Restored', 'Balanced', 'Aligned', 'Whole',
    'Vibrant', 'Renewed', 'Revitalized', 'Energized', 'Strong',
    'Resilient', 'Thriving', 'Flourishing', 'Nourished',
    'Calm', 'Peaceful', 'Grounded', 'Focused', 'Relaxed', 'Serene',
    'Still', 'Present', 'Mindful', 'Aware', 'Tranquil',
    'Confident', 'Capable', 'Worthy', 'Deserving', 'Secure', 'Bold',
    'Courageous', 'Fearless', 'Empowered', 'Assured', 'Stable',
    'Certain', 'Decisive',
    'Happy', 'Joyful', 'Grateful', 'Content', 'Fulfilled', 'Loved',
    'Supported', 'Safe', 'Comforted', 'Accepted', 'Appreciated',
    'Valued', 'Connected', 'Compassionate', 'Kind',
    'Abundant', 'Prosperous', 'Successful', 'Growing', 'Expanding',
    'Achieving', 'Winning', 'Elevated', 'Advancing', 'Limitless',
    'Harmonious', 'Soothing',
    'Vital', 'Youthful', 'Radiant', 'Enduring', 'Ageless',
    'Regenerated', 'Regenerative', 'Rejuvenated', 'Alive',
    'Awakened', 'Activated', 'Optimized', 'Fortified', 'Strengthened',
    'Peace', 'Harmony', 'Grace', 'Faith', 'Trust', 'Inspired',
    'Guided', 'Protected', 'Sacred',
    'Infinite', 'Expansive', 'Dynamic', 'Brilliant', 'Driven',
    'Clear-minded', 'Empowering', 'Stabilized', 'Radiating'
  ];

  const LIFESPAN_MS       = 3500;      // matches CSS animation duration
  const SPAWN_MIN_MS      = 28;
  const SPAWN_MAX_MS      = 60;
  const START_ROTATE_MIN  = 0;         // random starting angle across full circle
  const START_ROTATE_MAX  = 360;
  const SWEEP_MIN_DEG     = 60;        // how far each word arcs (same direction for all)
  const SWEEP_MAX_DEG     = 180;
  const END_SCALE_MIN     = 2.0;
  const END_SCALE_MAX     = 2.8;
  const DRIFT_MIN_PX      = 80;        // how far the pivot moves outward during lifecycle
  const DRIFT_MAX_PX      = 220;

  let lastIndex = -1;
  function pickWord() {
    let i;
    do { i = Math.floor(Math.random() * words.length); } while (i === lastIndex);
    lastIndex = i;
    return words[i];
  }

  function spawn() {
    const el = document.createElement('span');
    el.className = 'hero__word';
    el.textContent = pickWord();

    const startRotate = START_ROTATE_MIN + Math.random() * (START_ROTATE_MAX - START_ROTATE_MIN);
    const sweep       = SWEEP_MIN_DEG   + Math.random() * (SWEEP_MAX_DEG   - SWEEP_MIN_DEG);
    const endRotate   = startRotate + sweep;   // always positive sweep → consistent direction
    const endScale    = END_SCALE_MIN   + Math.random() * (END_SCALE_MAX   - END_SCALE_MIN);

    // Drift the anchor outward along the word's initial rotation direction —
    // this way the pivot "hub" visibly expands as the lifecycle progresses.
    const driftAngleRad = startRotate * Math.PI / 180;
    const driftDist     = DRIFT_MIN_PX + Math.random() * (DRIFT_MAX_PX - DRIFT_MIN_PX);
    const tx = Math.cos(driftAngleRad) * driftDist;
    const ty = Math.sin(driftAngleRad) * driftDist;

    el.style.setProperty('--start-rotate', `${startRotate}deg`);
    el.style.setProperty('--end-rotate',   `${endRotate}deg`);
    el.style.setProperty('--end-scale',    endScale);
    el.style.setProperty('--tx', `${tx}px`);
    el.style.setProperty('--ty', `${ty}px`);

    container.appendChild(el);
    setTimeout(() => el.remove(), LIFESPAN_MS + 100);

    const next = SPAWN_MIN_MS + Math.random() * (SPAWN_MAX_MS - SPAWN_MIN_MS);
    setTimeout(spawn, next);
  }

  spawn();
})();
