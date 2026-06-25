import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

// 🚀 Grounded, everyday productivity quotes
const quotes = [
  "Small steps lead to big achievements.",
  "Small habits build big results.",
  "Focus on the step in front of you.",
  "Consistency over intensity.",
  "Great work today. Keep showing up.",
  "Every checkmark is a step forward."
];

const Hero3D = ({ username }) => {
  const [index, setIndex] = useState(0);

  // Cycle through quotes every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => setIndex(prev => (prev + 1) % quotes.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Clean, deep blue glassmorphism wrapper
    <div className="relative bg-slate-900/80 dark:bg-[#080d1a] text-white p-8 rounded-3xl shadow-2xl overflow-hidden mb-8 border border-blue-500/20 backdrop-blur-xl min-h-[350px] flex flex-col md:flex-row items-center">
      
      {/* Text Content - Left Side */}
      <div className="relative z-10 flex flex-col items-start text-left flex-1 space-y-4 pointer-events-none">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Momentum
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-slate-300 font-medium text-lg"
        >
          Welcome back, <span className="text-white font-bold">{username}</span>.<br/>Let's keep the momentum going.
        </motion.p>

        {/* Animated Quote Rotator */}
        <div className="h-8 overflow-hidden relative w-full flex justify-start mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute text-md font-semibold text-blue-300 tracking-wide"
            >
              {quotes[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 💻 3D Interactive Scene - Right Side */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[400px] absolute right-0 bottom-0 md:relative z-0 cursor-grab active:cursor-grabbing">
         {/* This renders a 3D modern computer setup you can drag and spin! */}
          <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>
    </div>
  );
};

export default Hero3D;