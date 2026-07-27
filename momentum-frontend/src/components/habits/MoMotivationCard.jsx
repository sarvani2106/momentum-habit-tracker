import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquareHeart } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export default function MoMotivationCard() {
  const { user } = useUser();
  const firstName = user?.username ? user.username.split(' ')[0] : 'Builder';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2rem] bg-white border border-indigo-50 p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-row items-center gap-4"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3" />
      
      <div className="relative z-10 flex-shrink-0">
        <motion.div 
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-12 h-12 md:w-14 md:h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-sm relative border border-indigo-100/50"
        >
          <span className="text-2xl">🌱</span>
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-50">
            <Sparkles size={10} className="text-indigo-500" />
          </div>
        </motion.div>
      </div>
      
      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="font-bold text-slate-800 text-base md:text-lg tracking-tight truncate">
          Keep it up, {firstName}! ✨
        </h3>
        <p className="text-slate-500 text-xs md:text-sm mt-0.5 font-medium leading-relaxed">
          Consistency today, success tomorrow.
        </p>
      </div>
      
      <div className="relative z-10 flex-shrink-0 self-start">
        <div className="p-2 bg-indigo-50/50 text-indigo-400 rounded-xl">
           <MessageSquareHeart size={18} />
        </div>
      </div>
    </motion.div>
  );
}
