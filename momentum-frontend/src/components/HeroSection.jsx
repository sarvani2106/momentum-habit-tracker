import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fetchAuth } from '../utils/api';
import { useUser } from '../context/UserContext';
import Mascot from './coach/Mascot';

export default function HeroSection() {
  const { user } = useUser();
  const userId = user?.id || 1;
  const [insight, setInsight] = useState(null);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchAuth(`/api/coach/insight/${userId}`)
      .then(data => {
        setInsight(data);
      })
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <div 
      onClick={() => navigate('/ai-coach')}
      className="soft-card relative overflow-hidden h-full flex flex-col min-h-[300px] cursor-pointer group hover:shadow-md transition-shadow bg-white"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-80" />
      
      <div className="relative z-10 flex flex-col h-full p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Mascot mood={insight?.mood || 'encouraging'} size="sm" />
            <span className="text-sm font-bold tracking-wide text-indigo-600 uppercase">
              {insight?.coachTitle || 'Momentum Coach'}
            </span>
          </div>
          <ArrowRight className="text-indigo-300 group-hover:text-indigo-500 transition-colors group-hover:translate-x-1" size={20} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.p
            className="text-xl font-serif text-[var(--color-text-main)] italic leading-relaxed"
          >
            "{insight?.observation || 'Analyzing your habit patterns... click here to see more.'}"
          </motion.p>
        </div>
        
        {/* Subtle decorative bottom elements */}
        <div className="mt-8 flex justify-end">
          <Sparkles className="text-purple-200 group-hover:text-purple-400 transition-colors" size={32} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
}
