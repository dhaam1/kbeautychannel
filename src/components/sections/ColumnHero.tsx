'use client';

import { motion } from 'framer-motion';
import Header from '../layout/Header';
import Image from 'next/image';

export default function ColumnHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/column_hero_premium_1776835228428.png"
          alt="Column Hero"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col px-[5%] py-6 md:py-10">
        <Header />

        <div className="flex-grow flex flex-col justify-end max-w-5xl pb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.4em] font-black text-white/60 mb-8 shadow-sm">
              Medical Insight Archive
            </span>
            
            <h1 className="font-sans text-[48px] md:text-[84px] font-black text-white leading-[1.05] tracking-tighter mb-10">
              인터넷에서 얻을 수 없는<br />
              <span className="text-gray-500 font-serif font-light">깊이 있는 지식</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-12">
              <p className="font-sans text-[16px] md:text-[18px] text-white/40 max-w-xl leading-relaxed font-light">
                오랜 임상 경험과 최신 피부과학 트렌드를 결합한 김연진 원장의 칼럼.<br />
                당신의 아름다움을 위한 가장 정직하고 전문적인 가이드를 제시합니다.
              </p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-all">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase">전체 칼럼 읽기</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
