'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feature } from '../../constants/procedures';

interface ProcedureDetailIntroProps {
  feature: Feature;
}

type DesignStyle = 'A' | 'B' | 'C';

export default function ProcedureDetailIntro({ feature }: ProcedureDetailIntroProps) {
  const [style, setStyle] = useState<DesignStyle>('A');

  const infoItems = [
    { label: '추천부위', value: feature.recommendedArea },
    { label: '시술시간', value: feature.duration },
    { label: '다운타임', value: feature.downtime },
    { label: '마취', value: feature.anesthesia },
    { label: '유지기간', value: feature.maintenance },
  ].filter(item => item.value);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {style === 'A' && (
          <motion.div
            key="style-a"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex-grow flex flex-col items-center justify-center px-[5%] py-20 relative"
          >
            {/* Background Large Text */}
            <h2 className="absolute inset-0 flex items-center justify-center text-[10vw] md:text-[15vw] font-sans font-black text-gray-50 uppercase select-none tracking-tighter opacity-50 z-0">
              {feature.title}
            </h2>

            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full">
              {/* Machine Image with Glow */}
              <div className="relative mb-12 md:mb-16">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-blue-400/20 blur-[100px] rounded-full"
                />
                <motion.img
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  src={feature.icon}
                  alt={feature.title}
                  className="w-64 h-64 md:w-[500px] md:h-[500px] object-contain relative z-10 drop-shadow-2xl"
                />
              </div>

              {/* Title & Description */}
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[42px] md:text-[80px] font-sans font-bold tracking-tighter uppercase mb-6 leading-none text-gray-900"
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[18px] md:text-[22px] text-gray-500 max-w-2xl font-pretendard leading-relaxed mb-16 break-keep"
              >
                {feature.description}
              </motion.p>

              {/* Info List - Horizontal Style A */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center gap-x-12 gap-y-8"
              >
                {infoItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <span className="text-[12px] font-bold tracking-widest text-gray-300 uppercase">{item.label}</span>
                    <span className="text-[16px] md:text-[18px] font-bold text-gray-900">{item.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {style === 'B' && (
          <motion.div
            key="style-b"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex-grow flex items-center justify-center px-[5%] py-20"
          >
            <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              {/* Left Image Area */}
              <div className="relative aspect-square flex items-center justify-center bg-gray-50 rounded-[60px] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent opacity-50" />
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  src={feature.icon}
                  alt={feature.title}
                  className="w-4/5 h-4/5 object-contain relative z-10 transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Right Content Area */}
              <div className="flex flex-col">
                <motion.div
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-[14px] font-bold tracking-[0.4em] text-gray-400 uppercase mb-4 block">Premium Procedure</span>
                  <h3 className="text-[48px] md:text-[72px] font-sans font-bold tracking-tighter uppercase mb-8 leading-[0.9] text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-[18px] md:text-[20px] text-gray-500 font-pretendard leading-relaxed mb-16 max-w-lg break-keep">
                    {feature.description}
                  </p>
                </motion.div>

                {/* Info Grid - Style B */}
                <div className="grid grid-cols-2 gap-y-12 gap-x-8 border-t border-gray-100 pt-12">
                  {infoItems.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">{item.label}</span>
                      <span className="text-[18px] font-bold text-gray-900 border-l-2 border-black pl-3">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {style === 'C' && (
          <motion.div
            key="style-c"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex-grow flex items-center justify-center px-[5%] py-20 relative"
          >
            {/* Elegant Background Texture (Optional/Subtle) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-[1200px] w-full flex flex-col items-center">
              <div className="flex flex-col md:flex-row items-center gap-16 md:gap-32 w-full">
                {/* Floating Machine Area */}
                <div className="relative md:w-1/2 flex justify-center">
                  <motion.div
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gray-200/50 blur-[80px] rounded-full scale-150 -z-10" />
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-72 h-72 md:w-[480px] md:h-[480px] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]"
                    />
                  </motion.div>
                </div>

                {/* Floating Glass Info Area */}
                <div className="md:w-1/2 flex flex-col gap-6">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col mb-10"
                  >
                    <h3 className="text-[54px] md:text-[64px] font-sans font-bold tracking-tighter uppercase text-gray-900 mb-6">{feature.title}</h3>
                    <div className="w-16 h-1 bg-black mb-8" />
                    <p className="text-[17px] md:text-[19px] text-gray-500 font-pretendard leading-relaxed break-keep">
                      {feature.description}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {infoItems.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (idx * 0.1) }}
                        className="bg-gray-50/80 backdrop-blur-md border border-white/50 p-6 rounded-[24px] flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase">{item.label}</span>
                        <span className="text-[16px] font-bold text-gray-800">{item.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Style Selector - Requirement Rule #4 */}
      <div className="fixed bottom-10 right-10 z-[200] flex gap-2 p-2 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-2xl">
        {(['A', 'B', 'C'] as DesignStyle[]).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`w-12 h-12 rounded-full text-[12px] font-bold transition-all duration-500 flex items-center justify-center ${
              style === s 
                ? 'bg-black text-white scale-110' 
                : 'bg-white/50 text-gray-400 hover:bg-white hover:text-black'
            }`}
          >
            {s}
          </button>
        ))}
        <div className="absolute -top-10 right-0 whitespace-nowrap bg-black text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-widest opacity-50">
          SELECT DESIGN STYLE
        </div>
      </div>
    </section>
  );
}
