import React from 'react';

export default function AnimatedBackground() {
  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(99,102,241,0.08), transparent 40%),
          radial-gradient(circle at bottom right, rgba(236,72,153,0.06), transparent 50%),
          var(--color-bg-main)
        `
      }}
    >
      {/* Subtle grain overlay for premium texture (optional, kept very light) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
