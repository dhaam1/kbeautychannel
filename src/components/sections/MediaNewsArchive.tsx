'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const NEWS_DATA = [
  {
    id: '01',
    title: "UH CELL 강남점 김연진 원장, 2026 한국 미용 트렌드 교류회 개최",
    publisher: "스포츠동아",
    date: "2026.03.11",
    image: "/images/media-미용 교류회.png",
    category: "EVENT",
    url: "https://sports.donga.com/life/article/all/20260311/133508701/1"
  },
  {
    id: '02',
    title: "유에이치씨 그룹 ‘UH CELL’ 공식 출범",
    publisher: "데일리안",
    date: "2026.01.25",
    image: "/images/news-4.png",
    category: "NEWS",
    url: "https://www.dailian.co.kr/news/view/1613502/%EC%9C%A0%EC%97%90%EC%9D%B4%EC%B9%98%EC%94%A8-%EA%B7%B8%EB%A3%B9-%EB%8B%A5%ED%84%B0%EC%81%98%EB%9D%A0%EC%9D%98%EC%9B%90-%E2%80%98UH-2026"
  },
  {
    id: '03',
    title: "이크루즈-UH CELL 강남점, MOU 체결로 관광 및 뷰티산업 협력 강화",
    publisher: "이넷뉴스",
    date: "2024.05.17",
    image: "/images/uhcell-media-이크루즈.png",
    category: "MOU",
    url: "https://www.enetnews.co.kr/news/articleView.html?idxno=34155"
  },
  {
    id: '04',
    title: "UH CELL 강남점, 더에스에스에이와 MOU 체결",
    publisher: "더페어",
    date: "2024.05.07",
    image: "/images/uhcell-더에스에스에이.png",
    category: "MOU",
    url: "https://www.thefairnews.co.kr/news/articleView.html?idxno=46786"
  },
  {
    id: '05',
    title: "UH CELL 강남점 소프웨이브 3대 도입…안티에이징 수요 적극 대응",
    publisher: "메디소비자뉴스",
    date: "2024.04.16",
    image: "/images/uhcell-소프웨이브.png",
    category: "MEDICAL",
    url: "https://www.medisobizanews.com/news/articleView.html?idxno=124252"
  },
  {
    id: '06',
    title: "\"한국 여자처럼, K브랜드의 파워\"…외국인 의료관광객 잡는다",
    publisher: "이코노미스트",
    date: "2024.01.09",
    image: "/images/uhcell-외국인 의료관광객.png",
    category: "TREND",
    url: "https://economist.co.kr/article/view/ecn202401090043"
  },
  {
    id: '07',
    title: "[UH CELL 겨울철 피부상식] 여름보다 무서운 겨울철 자외선, 기미·색소침착 관리법",
    publisher: "메디칼트리뷴",
    date: "2020.02.04",
    image: "/images/uhcell-겨울청 피부상식.png",
    category: "COLUMN",
    url: "https://www.medical-tribune.co.kr/news/articleView.html?idxno=89109"
  },
  {
    id: '08',
    title: "\"지방 쏙\" 부분비만 개선한다는 주사… 효과는?",
    publisher: "스포츠월드",
    date: "2020.06.11",
    image: "/images/uhcell-지방 주사.png",
    category: "MEDICAL",
    url: "https://www.sportsworldi.com/newsView/20200611521480"
  }
];

export default function MediaNewsArchive() {
  const [showAll, setShowAll] = useState(false);
  
  const displayedNews = showAll ? NEWS_DATA : NEWS_DATA.slice(0, 4);

  // 시안 1 스타일 고정
  const styles = {
    bg: 'bg-white',
    text: 'text-[#1A1A1A]',
    heading: 'text-[#1A1A1A]',
    subText: 'text-[#1A1A1A]/60',
    cardOverlay: 'bg-gradient-to-r from-white via-white/40 to-transparent',
    itemTitle: 'text-[#1A1A1A]',
    itemMeta: 'text-[#1A1A1A]/60',
    itemDate: 'text-[#1A1A1A]/40',
    headerLine: 'bg-[#0D0E0E]',
    border: 'border-[#1A1A1A]/5',
    imageOpacity: 'opacity-100'
  };

  return (
    <section className={`relative w-full py-24 md:py-40 ${styles.bg} ${styles.text} overflow-hidden`}>
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#0D0E0E]/[0.03] to-transparent pointer-events-none`} />
      
      <div className="container mx-auto px-[5%]">
        {/* Main Copywriting Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className={`w-12 h-[1px] ${styles.headerLine}`} />
              <span className="text-[16px] tracking-[0.4em] text-[#0D0E0E] font-bold uppercase">Archive</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`font-pretendard text-3xl md:text-[38px] lg:text-[42px] font-black leading-[1.2] tracking-tighter ${styles.heading} whitespace-pre-line`}
            >
              공신력있는 미디어들도<br />
              <span className="text-[#0D0E0E]">김연진 원장에게 주목합니다.</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-right hidden md:block"
          >
            <p className="text-[#0D0E0E]/60 text-[16px] font-bold tracking-widest uppercase">Curated Archive of Excellence</p>
          </motion.div>
        </div>

        {/* News List */}
        <div className="flex flex-col gap-12 md:gap-20">
          {displayedNews.map((news) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`relative h-[450px] md:h-[650px] w-full overflow-hidden group border ${styles.border} transition-all duration-500 rounded-sm`}
            >
              <Image 
                src={news.image} 
                alt={news.title} 
                fill 
                className={`object-cover ${styles.imageOpacity} transition-transform duration-[2s] group-hover:scale-105`} 
              />
              <div className={`absolute inset-0 ${styles.cardOverlay}`} />
              
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24">
                <div className="max-w-4xl">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-[#0D0E0E] text-white text-[12px] font-black tracking-widest uppercase">
                      {news.category}
                    </span>
                    <span className={`${styles.itemMeta} text-[14px] font-bold tracking-wider`}>{news.publisher}</span>
                  </div>
                  
                  <h3 className={`text-2xl md:text-4xl lg:text-[36px] font-pretendard font-black mb-8 md:mb-12 leading-[1.3] tracking-tighter group-hover:text-[#0D0E0E] transition-colors duration-500 ${styles.itemTitle}`}>
                    {news.title}
                  </h3>
                  
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className={`${styles.itemDate} text-[16px] md:text-base font-medium tracking-widest`}>{news.date}</span>
                    <a 
                      href={news.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group/btn cursor-pointer"
                    >
                      <span className="text-[16px] font-black tracking-[0.2em] uppercase border-b border-black/10 pb-1 group-hover/btn:border-[#0D0E0E] group-hover/btn:text-[#0D0E0E] transition-all duration-300">
                        View Full Article
                      </span>
                      <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover/btn:border-[#0D0E0E] group-hover/btn:bg-[#0D0E0E] transition-all duration-300">
                        <ArrowUpRight size={16} className="text-[#0D0E0E] group-hover/btn:text-white transition-colors" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="absolute right-8 md:right-16 bottom-8 md:bottom-16 text-8xl md:text-[200px] font-pretendard font-black text-[#0D0E0E] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none select-none">
                {news.id}
              </div>
              
              <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[#0D0E0E] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-center" />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        {!showAll && NEWS_DATA.length > 4 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-20 md:mt-32"
          >
            <button 
              onClick={() => setShowAll(true)}
              className="group relative px-12 py-5 overflow-hidden rounded-full border border-[#0D0E0E]/10 hover:border-[#0D0E0E] transition-all duration-500"
            >
              <div className="relative z-10 flex items-center gap-4">
                <span className="text-[16px] font-black tracking-[0.4em] text-[#0D0E0E] uppercase">View More Archive</span>
                <div className="w-6 h-6 rounded-full bg-[#0D0E0E] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ArrowUpRight size={12} className="text-white" />
                </div>
              </div>
              <div className="absolute inset-0 bg-[#0D0E0E] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-[0.03]" />
            </button>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .font-pretendard {
            letter-spacing: -0.04em;
          }
        }
      `}</style>
    </section>
  );
}
