import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAuth } from '../utils/api';
import { useUser } from '../context/UserContext';
import InsightCard from '../components/coach/InsightCard';
import GrowthJourneySection from '../components/coach/GrowthJourneySection';

export default function AiCoach() {
  const { user } = useUser();
  const userId = user?.id || 1;
  const [coachData, setCoachData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInsight = (forceRefresh = false) => {
    setIsLoading(true);
    const endpoint = forceRefresh ? `/api/coach/refresh/${userId}` : `/api/coach/insight/${userId}`;
    const method = forceRefresh ? 'POST' : 'GET';
    
    fetchAuth(endpoint, { method })
      .then(data => {
        setCoachData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        alert(err.message || "Failed to fetch coaching insight");
      });
  };

  useEffect(() => {
    fetchInsight(false);
  }, [userId]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto pb-12"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Your Coach "Mo"</h1>
        <p className="text-slate-500 mt-2">Mo learns from your habit data to give you personalized guidance.</p>
      </div>

      <InsightCard 
        coachData={coachData} 
        isLoading={isLoading} 
        onRefresh={() => fetchInsight(true)} 
      />

      <GrowthJourneySection coachData={coachData} />
      
    </motion.div>
  );
}
