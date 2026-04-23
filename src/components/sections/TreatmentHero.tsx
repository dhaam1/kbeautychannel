'use client';

import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../layout/Navbar';
import SectionLabel from '../common/SectionLabel';

interface TreatmentHeroProps {
  category: string;
  title: string;
  titleItalic?: string;
  description: string;
  bgImage: string;
  reservationLink?: string;
  sectionNumber?: string;
  sectionTitle?: string;
}

export default function TreatmentHero({ 
  category, 
  title, 
  titleItalic, 
  description, 
  bgImage,
  reservationLink = '/contact',
  sectionNumber = "01",
  sectionTitle = "TREATMENT"
}: TreatmentHeroProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white flex flex-col">
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
            className="w-full h-full object-cover opacity-60 mix-blend-soft-light"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10" />
        </motion.div>
      </AnimatePresence>

      <SectionLabel number={sectionNumber} title={sectionTitle} />
      <div className="relative z-10 px-[5%] py-4 md:py-5 flex flex-col h-full">
        <Navbar isDarkBackground={false} />
        <div className="w-full h-[88px] invisible pointer-events-none" />

        <main className="flex-grow flex flex-col justify-center text-gray-900">
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
                  className="h-[1px] bg-gray-900/30"
                />
                <h2 className="text-xl md:text-2xl font-sans font-bold text-gray-400 tracking-[0.2em] uppercase">{category}</h2>
              </div>
              <h1 className="text-[54px] md:text-[54px] font-sans font-black tracking-tighter leading-none uppercase">
                {title} {titleItalic && <span className="text-gray-300 font-normal">{titleItalic}</span>}
              </h1>
              <p className="text-lg md:text-2xl text-gray-500 max-w-2xl mt-4 font-pretendard leading-relaxed font-light whitespace-pre-line text-pretty">
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
                whileHover={{ scale: 1.02, backgroundColor: '#111', color: '#fff' }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 px-12 py-5 border border-gray-200 rounded-full text-[16px] tracking-[0.3em] font-pretendard uppercase transition-all duration-500 bg-white shadow-sm text-gray-900"
              >
                Reservation
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}
