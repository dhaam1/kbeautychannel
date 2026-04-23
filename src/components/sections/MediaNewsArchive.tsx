'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const NEWS_DATA = [
  {
    id: '01',
    title: "1천2백만 뷰가 증명하는 피부 과학, 김연진 원장의 '진짜' 뷰티",
    publisher: "KBS NEWS",
    date: "2024.03.15",
    image: "/images/news-1.png",
    category: "INTERVIEW"
  },
  {
    id: '02',
    title: "아윤클리닉, K-뷰티의 새로운 기준을 제시하다",
    publisher: "LUXURY MAGAZINE",
    date: "2024.02.28",
    image: "/images/news-2.png",
    category: "EDITORIAL"
  },
  {
    id: '03',
    title: "차세대 리프팅 기술 세미나 강연: 격차가 만드는 아름다움",
    publisher: "MEDICAL TIMES",
    date: "2024.01.20",
    image: "/images/news-3.png",
    category: "SEMINAR"
  }
];

export default function MediaNewsArchive() {
  return (
    <section className="relative w-full py-24 md:py-40 bg-[#1A1A1A] text-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-[5%]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-12 h-[1px] bg-[#E8927D]" />
              <span className="text-[12px] tracking-[0.4em] text-[#E8927D] font-bold uppercase">Archive</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1]"
            >
              MEDIA <span className="text-[#E8927D]">INSIGHTS</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-right hidden md:block"
          >
            <p className="text-white/20 text-sm font-light tracking-widest uppercase">Curated Archive of Excellence</p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {NEWS_DATA.map((news, idx) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[400px] md:h-[600px] w-full overflow-hidden group rounded-sm shadow-2xl"
            >
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover opacity-60 transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24">
                <div className="max-w-3xl">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.15 + 0.3 }}
                    className="text-[#E8927D] text-sm md:text-base font-bold tracking-widest mb-4 block"
                  >
                    {news.publisher}
                  </motion.span>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 + 0.4 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-serif mb-8 md:mb-12 leading-tight"
                  >
                    {news.title}
                  </motion.h3>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.15 + 0.5 }}
                    className="flex items-center gap-6 md:gap-10"
                  >
                    <span className="text-white/40 text-sm md:text-base font-light tracking-wider">{news.date}</span>
                    <button className="flex items-center gap-3 group/btn cursor-pointer">
                      <span className="text-[12px] md:text-[14px] font-bold tracking-[0.2em] uppercase border-b border-white/20 pb-1 group-hover/btn:border-[#E8927D] group-hover/btn:text-[#E8927D] transition-all">
                        View Full Article
                      </span>
                      <ArrowUpRight size={18} className="text-[#E8927D] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </button>
                  </motion.div>
                </div>
              </div>
              
              <div className="absolute right-8 md:right-16 bottom-8 md:bottom-16 text-8xl md:text-[180px] font-serif text-white/5 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                {news.id}
              </div>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E8927D] group-hover:w-full transition-all duration-1000 ease-in-out" />
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          /* PC 레이아웃의 고유한 디테일을 여기서 보존합니다. */
        }
      `}</style>
    </section>
  );
}
