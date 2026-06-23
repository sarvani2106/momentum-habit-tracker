import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Star, Sparkles } from 'lucide-react';

const affirmations = [
  "Defy Gravity. Build Habits.",
  "Houston, we have progress.",
  "Small steps. Giant leaps.",
  "Your potential is infinite.",
  "Orbit your goals today."
];

const SpaceHero = ({ username }) => {
  const [index, setIndex] = useState(0);

  // Cycle through affirmations every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % affirmations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-slate-900 text-white p-8 rounded-2xl shadow-2xl overflow-hidden mb-8 border border-slate-700">
      {/* Background Star Details */}
      <Star className="absolute top-4 left-6 text-slate-700 opacity-30" size={40} />
      <Sparkles className="absolute bottom-4 right-8 text-indigo-500 opacity-20" size={60} />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Main Title */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="flex items-center gap-3 mb-2"
        >
          <Rocket className="text-indigo-400" size={36} />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Momentum
          </h1>
        </motion.div>

        {/* User Greeting */}
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-slate-300 font-medium mb-6"
        >
          Commander {username}, all systems go.
        </motion.p>

        {/* Animated Affirmation Rotator */}
        <div className="h-8 overflow-hidden relative w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute text-lg font-semibold text-indigo-200 tracking-wide"
            >
              {affirmations[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SpaceHero;