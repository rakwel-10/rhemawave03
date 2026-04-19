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
    'Valued', 'Connected', 'Compassionate', 'Kind'
  ];

  const LIFESPAN_MS     = 4000;        // matches CSS animation duration
  const SPAWN_MIN_MS    = 450;
  const SPAWN_MAX_MS    = 1100;
  const DRIFT_MIN_PX    = 80;
  const DRIFT_MAX_PX    = 320;

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

    const angle = Math.random() * Math.PI * 2;
    const dist  = DRIFT_MIN_PX + Math.random() * (DRIFT_MAX_PX - DRIFT_MIN_PX);
    el.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);

    container.appendChild(el);
    setTimeout(() => el.remove(), LIFESPAN_MS + 100);

    const next = SPAWN_MIN_MS + Math.random() * (SPAWN_MAX_MS - SPAWN_MIN_MS);
    setTimeout(spawn, next);
  }

  spawn();
})();
