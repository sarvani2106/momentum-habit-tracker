import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { fetchAuth } from '../utils/api';
import { useUser } from '../context/UserContext';

export default function MomentumInsightCard() {
  const { user } = useUser();
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    
    setLoading(true);
    fetchAuth(`/api/habit-records/insight/${user.id}`)
      .then(data => {
        setInsight(data.insight);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch insight", err);
        setInsight("Keep up the great work! Every day you show up is a victory.");
        setLoading(false);
      });
  }, [user]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#FFFAEB] to-[#FFF4D4] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10 border border-amber-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] h-full w-full"
    >
      {/* Mascot Illustration Area */}
      <div className="relative shrink-0">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl shadow-sm border border-amber-50 flex items-center justify-center relative z-10 overflow-hidden group">
          {/* A playful CSS representation of Mo if no image is available, or an actual image if we had one.
              We'll build a cute CSS mascot here so we don't rely on missing images. */}
          <div className="w-20 h-20 bg-[#a6e22e] rounded-3xl relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-3 shadow-inner border-4 border-[#86bb21]">
             {/* Hat/Band */}
             <div className="absolute top-0 left-0 w-full h-4 bg-purple-500 rounded-t-2xl opacity-90"></div>
             {/* Eyes */}
             <div className="absolute top-6 left-4 w-3 h-3 bg-slate-800 rounded-full"></div>
             <div className="absolute top-6 right-4 w-3 h-3 bg-slate-800 rounded-full"></div>
             {/* Smile */}
             <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4 h-2 border-b-4 border-slate-800 rounded-full"></div>
             {/* Little arms */}
             <div className="absolute top-8 -left-3 w-4 h-2 bg-slate-800 rounded-full -rotate-45"></div>
             <div className="absolute top-6 -right-3 w-4 h-2 bg-slate-800 rounded-full rotate-45 group-hover:-rotate-12 transition-transform"></div>
          </div>
        </div>
        {/* Decorative sparkles */}
        <div className="absolute -top-4 -right-4 text-amber-400 animate-pulse"><Sparkles size={24} fill="currentColor" /></div>
        <div className="absolute -bottom-2 -left-2 text-amber-300 animate-bounce" style={{ animationDelay: '0.5s' }}><Sparkles size={16} fill="currentColor" /></div>
      </div>

      {/* Content Area */}
      <div className="flex-1 text-center md:text-left flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm mb-3 justify-center md:justify-start">
          <Sparkles size={16} />
          Momentum Insight
        </div>
        
        {loading ? (
          <div className="space-y-2 w-full max-w-md mx-auto md:mx-0">
            <div className="h-4 bg-amber-200/50 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-amber-200/50 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-amber-200/50 rounded animate-pulse w-4/6"></div>
          </div>
        ) : (
          <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed mb-6">
            "{insight}"
          </p>
        )}
      </div>
    </motion.div>
  );
}
