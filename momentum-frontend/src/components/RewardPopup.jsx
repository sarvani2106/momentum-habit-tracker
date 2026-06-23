import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const RewardPopup = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          // Initial position starts off-screen above the header viewport
          initial={{ y: -100, opacity: 0, scale: 0.9 }}
          // Animates directly below the navigation area interface
          animate={{ y: 84, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          // Set to z-[100] to sit cleanly over the navigation elements
          className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4"
        >
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-500/30 font-medium text-sm md:text-base">
            <CheckCircle2 size={20} className="shrink-0 text-emerald-100" />
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardPopup;