import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D({ username }) {
  return (
    <div className="relative w-full rounded-[2.5rem] bg-white/40 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-3xl overflow-hidden shadow-sm">
      
      {/* --- Ambient Background Glows --- */}
      <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-10">
        
        {/* --- Left Side: Premium Typography --- */}
        <div className="flex-1 space-y-6 text-center md:text-left z-10">
          
          {/* Sleek Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
              Momentum
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
            Welcome back,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">
              {username || 'Hacker'}.
            </span>
          </h1>
          
          <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-md mx-auto md:mx-0 font-medium leading-relaxed">
            Every checkmark is a step forward. Let's keep the momentum going today.
          </p>
        </div>

        {/* --- Right Side: 3D Canvas Container --- */}
        {/* We wrap the Spline in a soft, masked container so its background blends smoothly */}
        <div className="w-full md:w-[450px] h-[350px] relative rounded-[2rem] overflow-hidden bg-black/5 dark:bg-black/20 border border-black/5 dark:border-white/5 shadow-inner">
          
          {/* ⚠️ PASTE YOUR SPLINE URL HERE ⚠️ */}
          {/* A working interactive 3D shape from the Spline community */}
<Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
          
        </div>

      </div>
    </div>
  );
}