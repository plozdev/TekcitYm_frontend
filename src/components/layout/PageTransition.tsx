import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function PageTransition() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full flex-grow flex flex-col"
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}
