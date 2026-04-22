'use client';

import React from 'react';
import { motion } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

export default function FooterCTA() {
  return (
    <section id="footer-cta" className="relative w-full overflow-hidden bg-gray-900 min-h-screen">
      <SectionLabel number="07" title="CONTACT" />

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="relative w-full min-h-screen flex items-stretch justify-start overflow-hidden bg-gray-900"
      >
        <div className="absolute inset-0 z-0">
          <img src="/images/premium_clinic_portrait.png" alt="Premium Clinic" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto pl-0 md:pl-[5%] lg:pl-[8%] flex pointer-events-none h-full min-h-screen">
          
          <motion.div 
            initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full md:w-[500px] lg:w-[600px] h-full min-h-screen bg-black/70 backdrop-blur-2xl flex flex-col pt-24 pb-16 md:pt-32 px-8 md:px-14 lg:px-16 shadow-[20px_0_40px_rgba(0,0,0,0.5)] pointer-events-auto border-r border-white/10 text-white"
          >
            <div className="flex items-center gap-2 mb-12 md:mb-16">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 2L2 22h20L12 2zm0 3.8l6.1 12.2H5.9L12 5.8z"/></svg>
              <span className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-white/80">KBEAUTYCHANNEL</span>
            </div>

            <div className="mb-10 md:mb-12">
              <h2 className="font-sans text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-white leading-[1.3] tracking-tight">
                미용의 최전선<br />
                <span className="font-medium text-white/70">김연진 대표 원장</span>
              </h2>
            </div>

            <div className="w-full aspect-[2.5/1] rounded-xl overflow-hidden mb-10 shadow-sm border border-white/10 shrink-0">
              <img src="/images/water_texture_cta.png" alt="Water Texture" className="w-full h-full object-cover opacity-80" />
            </div>

            <div className="mb-12">
              <p className="font-bold text-sm md:text-base text-white mb-2">당신의 아름다움을 책임질 케이뷰티채널의 프리미엄 컬렉션</p>
              <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-[90%]">
                최신 기술이 구현하는 맞춤형 변화를 통해<br />
                더욱 섬세하고 완성도 높은 아름다움을 경험하세요.
              </p>
            </div>

            <div className="mt-auto flex items-end justify-between">
              <a 
                href="https://line.me/R/ti/p/@kbeauty_clinic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/30 rounded-md px-6 py-3 text-xs md:text-sm font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                LINE 상담 및 예약
              </a>
              
              <div className="font-serif text-5xl md:text-6xl font-light tracking-tighter text-white/80">
                07
              </div>
            </div>
          </motion.div>
        </div>

        <motion.a 
          href="https://line.me/R/ti/p/@kbeauty_clinic"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8, type: "spring" }}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-[#06C755] shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:scale-110 transition-transform cursor-pointer z-20 group"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 3.938 8.902 9.312 9.585.391.087.922.258 1.057.592.114.288.038.736.015.992-.036.331-.168 1.002-.208 1.23-.049.27-.229 1.127.986.616 1.215-.512 6.541-3.854 8.806-6.495 2.656-3.136 4.032-6.527 4.032-6.52Z"/>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}


