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
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
          >
            <source src="/videos/CTA-video.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto pl-0 md:pl-[5%] lg:pl-[8%] flex pointer-events-none h-full min-h-screen">
          
          <motion.div 
            initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full md:w-[500px] lg:w-[600px] h-full min-h-screen bg-black/70 backdrop-blur-2xl flex flex-col pt-24 pb-16 md:pt-32 px-8 md:px-14 lg:px-16 shadow-[20px_0_40px_rgba(0,0,0,0.5)] pointer-events-auto border-r border-white/10 text-white"
          >
            <div className="flex items-center gap-2 mb-12 md:mb-16">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 2L2 22h20L12 2zm0 3.8l6.1 12.2H5.9L12 5.8z"/></svg>
              <span className="font-sans font-bold text-[16px] tracking-[0.2em] uppercase text-white/80">KBEAUTYCHANNEL</span>
            </div>

            <div className="mb-10 md:mb-12">
              <h2 className="font-sans text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-white leading-[1.3] tracking-tight">
                미용의 최전선<br />
                <span className="font-medium text-white/70">김연진 대표 원장</span>
              </h2>
            </div>

            {/* Prestige Ticket Container */}
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -2, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative w-full aspect-[2.8/1] mb-12 group cursor-default perspective-1000"
            >
              {/* Ticket Body */}
              <div className="absolute inset-0 bg-[#151515] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] flex overflow-hidden rounded-xl">
                {/* Background Textures */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent z-0" />
                <img src="/images/water_texture_cta.png" alt="Ticket Texture" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay z-0" />
                
                {/* Left Section (Main) */}
                <div className="relative flex-grow h-full p-6 md:p-8 flex flex-col justify-between overflow-hidden">
                  <div className="relative z-10 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E8927D] shadow-[0_0_8px_#E8927D] animate-pulse" />
                      <span className="text-[11px] font-bold tracking-[0.4em] text-[#E8927D] uppercase">KBC Prestige Member</span>
                    </div>
                    <h3 className="text-2xl md:text-[32px] font-black text-white tracking-tighter leading-[1.1] mt-1">
                      PREMIUM<br/>ESTHETIC PASS
                    </h3>
                  </div>

                  <div className="relative z-10 flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Membership No.</span>
                      <span className="text-[13px] font-mono text-white/70">777-KBC-PREMIUM-2026</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Verified by</span>
                      <span className="text-[13px] font-mono text-white/70 tracking-tight">DIRECTOR KIM</span>
                    </div>
                  </div>
                </div>

                {/* Perforation Line & Notches Area */}
                <div className="relative w-[60px] md:w-[100px] h-full flex flex-col items-center justify-center border-l border-white/10 bg-white/[0.03]">
                  {/* Perforation Dots */}
                  <div className="absolute inset-y-6 left-0 border-l border-dashed border-white/20 -ml-[0.5px] z-10" />
                  
                  {/* The Notches (Visual cutout effect) */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] z-20" />
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] z-20" />
                  
                  <div className="rotate-90 whitespace-nowrap">
                    <span className="text-[11px] md:text-[13px] font-black tracking-[0.5em] text-white/15 uppercase select-none">
                      V.I.P ACCESS
                    </span>
                  </div>
                </div>

                {/* Shine Animation Effect */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </div>
            </motion.div>

            <div className="mb-12">
              <p className="font-bold text-[16px] md:text-base text-white mb-2">당신의 아름다움을 책임질 케이뷰티채널의 프리미엄 컬렉션</p>
              <p className="text-[16px] md:text-[16px] text-white/60 leading-relaxed max-w-[90%]">
                최신 기술이 구현하는 맞춤형 변화를 통해<br />
                더욱 섬세하고 완성도 높은 아름다움을 경험하세요.
              </p>
            </div>

            <div className="mt-auto flex items-end justify-between">
              <motion.a 
                href="https://line.me/R/ti/p/@kbeauty_clinic" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 199, 85, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-[#06C755] border border-[#06C755] rounded-full px-8 py-4 text-[16px] font-bold text-white transition-all duration-300 shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M19.467 11.233c0-4.004-3.348-7.266-7.467-7.266s-7.467 3.262-7.467 7.266c0 3.59 2.65 6.6 6.222 7.164.242.052.571.161.654.37.075.187.05.479.025.668l-.112.671c-.034.205-.157.801.678.437.834-.363 4.5-2.65 6.138-4.542 1.057-1.127 1.334-2.81 1.334-4.768zm-11.4 3.037H7.014a.276.276 0 01-.277-.277V9.014a.276.276 0 01.277-.277h1.053a.276.276 0 01.277.277v4.679a.276.276 0 01-.277.277zm2.467 0h-1.053a.276.276 0 01-.277-.277V9.014a.276.276 0 01.277-.277h1.053a.276.276 0 01.277.277v4.679a.276.276 0 01-.277.277zm3.746 0H12.94a.276.276 0 01-.277-.277V9.014a.276.276 0 01.277-.277h1.053a.276.276 0 01.277.277v4.062h1.341a.276.276 0 01.277.277v.661a.276.276 0 01-.277.277zm3.084-2.222h-1.341a.276.276 0 01-.277-.277V9.014a.276.276 0 01.277-.277h1.053a.276.276 0 01.277.277v.661h1.341a.276.276 0 01.277.277v1.053a.276.276 0 01-.277.277z"/>
                </svg>
                LINE 상담 및 예약
              </motion.a>
            </div>
          </motion.div>
        </div>


      </motion.div>
    </section>
  );
}


