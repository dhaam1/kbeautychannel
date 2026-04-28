'use client';

import { motion, AnimatePresence } from 'motion/react';
import Navbar from '../layout/Navbar';
import SectionLabel from '../common/SectionLabel';

interface TreatmentHeroProps {
  category?: string;
  title?: string;
  titleItalic?: string;
  description?: string;
  bgImage?: string;
  bgVideo?: string;
  reservationLink?: string;
  sectionNumber?: string;
  sectionTitle?: string;
  isCenter?: boolean;
  isTop?: boolean;
  isDarkText?: boolean;
  hideButton?: boolean;
  isSplitLayout?: boolean;
  titleSize?: string;
  descSize?: string;
}

export default function TreatmentHero({ 
  category, 
  title, 
  titleItalic, 
  description, 
  bgImage,
  bgVideo,
  reservationLink = '/contact',
  sectionNumber = "01",
  sectionTitle = "TREATMENT",
  isCenter = false,
  isTop = false,
  isDarkText = false,
  hideButton = false,
  isSplitLayout = false,
  titleSize,
  descSize
}: TreatmentHeroProps) {
  return (
    <div className={`relative w-full h-screen overflow-hidden ${isDarkText ? 'bg-white' : 'bg-black'} flex flex-col`}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          {bgVideo ? (
            <video
              src={bgVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-100"
            />
          ) : (
            <img
              src={bgImage}
              alt={`${title} Background`}
              className={`w-full h-full object-cover ${isDarkText ? 'opacity-60 mix-blend-soft-light' : 'opacity-40'}`}
            />
          )}
          <div className={`absolute inset-0 ${isDarkText ? 'bg-white/5' : 'bg-black/20'}`} />
        </motion.div>
      </AnimatePresence>

      <SectionLabel number={sectionNumber} title={sectionTitle} />
      <div className="relative z-10 px-[4%] py-4 md:py-5 flex flex-col h-full">
        <Navbar isDarkBackground={!isDarkText} />
        <div className="w-full h-[88px] invisible pointer-events-none" />

        <main className={`flex-grow flex flex-col ${isTop ? 'justify-start pt-20' : 'justify-center'} ${isDarkText ? 'text-gray-900' : 'text-white'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: isTop ? -30 : 0, x: isCenter ? 0 : (isSplitLayout ? 0 : -30) }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: isTop ? 30 : 0, x: isCenter ? 0 : (isSplitLayout ? 0 : 30) }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full max-w-[1600px] mx-auto flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} gap-6 px-4 md:px-0`}
            >
              {category && (
                <div className={`flex items-center gap-4 ${isCenter ? 'justify-center' : ''}`}>
                  {(!isCenter && !isSplitLayout) && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: 40 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-[1px] ${isDarkText ? 'bg-gray-900/30' : 'bg-white/30'}`}
                    />
                  )}
                  <h2 className={`text-xl md:text-2xl font-sans font-bold ${isDarkText ? 'text-gray-400' : 'text-white/50'} tracking-[0.2em] uppercase`}>{category}</h2>
                </div>
              )}
              
              <div className={`w-full flex flex-col ${isSplitLayout ? 'md:flex-row md:justify-between md:items-end gap-10' : 'items-start gap-6'}`}>
                {title && (
                  <h1 className={`${titleSize || 'text-[42px] md:text-[54px]'} font-sans font-bold tracking-tighter leading-[1.1] uppercase whitespace-pre-line text-pretty ${isSplitLayout ? 'md:text-left flex-1' : ''}`}>
                    {title} {titleItalic && <span className={`${isDarkText ? 'text-gray-300' : 'text-white/30'} font-normal`}>{titleItalic}</span>}
                  </h1>
                )}

                {description && (
                  <p className={`${descSize || 'text-lg md:text-2xl'} ${isDarkText ? 'text-gray-600' : 'text-white/70'} max-w-xl font-pretendard leading-relaxed font-light whitespace-pre-line text-pretty ${isSplitLayout ? 'md:text-right md:pb-2' : 'mt-4'}`}>
                    {description}
                  </p>
                )}
              </div>

              {!hideButton && (
                <motion.button
                  onClick={() => {
                     if (reservationLink?.startsWith('http')) {
                       window.open(reservationLink, '_blank');
                     } else {
                       window.location.href = reservationLink || '/contact';
                     }
                  }}
                  whileHover={{ scale: 1.02, backgroundColor: isDarkText ? '#111' : '#fff', color: isDarkText ? '#fff' : '#000' }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-10 px-12 py-5 border ${isDarkText ? 'border-gray-200 bg-white text-gray-900' : 'border-white/20 bg-transparent text-white'} rounded-full text-[16px] tracking-[0.3em] font-pretendard uppercase transition-all duration-500 shadow-sm`}
                >
                  Reservation
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
