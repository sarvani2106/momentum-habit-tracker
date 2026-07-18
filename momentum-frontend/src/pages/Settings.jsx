import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--color-text-main)] tracking-tight mb-2">Settings</h1>
        <p className="text-[var(--color-text-muted)]">Manage your profile and application preferences.</p>
      </div>
      
      <div className="soft-card p-8 flex flex-col items-center justify-center text-center text-[var(--color-text-muted)] gap-4 min-h-[300px]">
        <SettingsIcon size={48} className="text-slate-300" />
        <p>Settings configuration coming soon.</p>
      </div>
    </motion.div>
  );
}
