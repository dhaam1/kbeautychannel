'use client';

import { motion } from 'framer-motion';
import Header from '../layout/Header';
import Image from 'next/image';

export default function ReviewsHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/reviews_hero_premium_1776835115798.png"
          alt="Reviews Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col px-[5%] py-6 md:py-10">
        <Header />

        <div className="flex-grow flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/60 backdrop-blur-md border border-white/30 text-[16px] uppercase tracking-[0.4em] font-black text-gray-400 mb-8 shadow-sm">
              True Stories of Transformation
            </span>
            
            <h1 className="font-sans text-[48px] md:text-[84px] font-black text-gray-900 leading-[1.05] tracking-tighter mb-10">
              결과로 증명하는<br />
              <span className="text-gray-400">압도적 만족도</span>
            </h1>

            <p className="font-sans text-[16px] md:text-[18px] text-gray-600 max-w-2xl leading-relaxed font-light mb-14 mx-auto">
              수만 명의 고객이 경험한 드라마틱한 변화.<br />
              단순한 시술을 넘어, 삶의 활력을 되찾아드린 진솔한 후기를 직접 확인하세요.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              {[
                { label: '누적 시술 건수', value: '150,000+' },
                { label: '고객 만족도', value: '98.7%' },
                { label: '재방문율', value: '92%' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  className="bg-white/40 backdrop-blur-lg border border-white/50 p-6 rounded-3xl"
                >
                  <div className="text-[28px] font-black text-gray-900 tracking-tight mb-1">{stat.value}</div>
                  <div className="text-[16px] font-black tracking-widest text-gray-400 uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
