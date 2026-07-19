import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function MoMotivationCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3" />
      
      <div className="relative z-10 flex flex-col items-center text-center gap-3">
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-20 h-20 bg-lime-400 rounded-3xl flex items-center justify-center text-4xl shadow-lg border-4 border-white/20 relative"
        >
          🌱
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Sparkles size={12} className="text-purple-500" />
          </div>
        </motion.div>
        
        <div>
          <h3 className="font-bold text-lg">Keep it up, Sarva! ✨</h3>
          <p className="text-indigo-100 text-sm mt-1 font-medium leading-relaxed">
            Consistency today,<br/>success tomorrow.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
