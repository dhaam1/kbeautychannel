'use client';

import { motion, AnimatePresence } from 'motion/react';
import Header from '../layout/Header';

interface TreatmentHeroProps {
  category: string;
  title: string;
  titleItalic?: string;
  description: string;
  bgImage: string;
  reservationLink?: string;
}

export default function TreatmentHero({ 
  category, 
  title, 
  titleItalic, 
  description, 
  bgImage,
  reservationLink = '/contact'
}: TreatmentHeroProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={bgImage}
            alt={`${title} Background`}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 px-[5%] py-6 md:py-10 flex flex-col h-full">
        <Header isDarkBackground={true} />

        <main className="flex-grow flex flex-col justify-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-7xl mx-auto flex flex-col items-start text-left gap-6 px-4 md:px-0"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-[1px] bg-amber-200/50"
                />
                <h2 className="text-xl md:text-2xl font-serif text-white/70 tracking-[0.2em] uppercase">{category}</h2>
              </div>
              <h1 className="text-7xl md:text-[120px] font-serif tracking-tighter leading-none">
                {title} {titleItalic && <span className="text-amber-200/90 italic">{titleItalic}</span>}
              </h1>
              <p className="text-lg md:text-2xl text-white/60 max-w-2xl mt-4 font-pretendard leading-relaxed font-light whitespace-pre-line text-pretty">
                {description}
              </p>
              <motion.button
                onClick={() => {
                   if (reservationLink.startsWith('http')) {
                     window.open(reservationLink, '_blank');
                   } else {
                     window.location.href = reservationLink;
                   }
                }}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,1)', color: '#000' }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 px-12 py-5 border border-white/20 rounded-full text-sm tracking-[0.3em] font-pretendard uppercase transition-all duration-500 bg-white/5 backdrop-blur-sm"
              >
                Reservation
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Plus Button Decoration */}
        <div className="absolute bottom-12 right-12 flex flex-col items-end gap-6">
          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            className="w-20 h-20 rounded-full bg-amber-200/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-[0_0_50px_rgba(251,191,36,0.1)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
