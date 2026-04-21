import React from 'react';
import { motion } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

export default function Reviews() {
  const processSteps = [
    { 
      id: '01', 
      title: '심층 분석', 
      desc: '고객의 피부 상태와 골격을 정밀 분석하여 본연의 개성을 파악합니다.',
      shortDesc: '고객의 피부 상태와 본연의 개성을 파악합니다.',
      x: '52%', 
      y: '0%',
      rotate: '1.5deg'
    },
    { 
      id: '02', 
      title: '정밀 설계', 
      desc: '단순 보편화된 시술이 아닌, 1:1 맞춤형 디자인 설계를 진행합니다.',
      shortDesc: '단순 보편화된 시술이 아닌, 1:1 맞춤형 디자인을 실현합니다.',
      x: '8%', 
      y: '22%',
      rotate: '-2deg'
    },
    { 
      id: '03', 
      title: '섬세한 시술', 
      desc: '최상의 장비와 숙련된 기술력으로 설계된 디자인을 실현합니다.',
      shortDesc: '최상의 장비와 숙련된 기술력으로 디자인을 실현합니다.',
      x: '48%', 
      y: '48%',
      rotate: '2.5deg'
    },
    { 
      id: '04', 
      title: '사후 케어', 
      desc: '시술 후 체계적인 케어를 통해 완성된 아름다움을 오래 유지하도록 돕습니다.',
      shortDesc: '체계적인 케어를 통해 완성된 아름다움을 오래 유지합니다.',
      x: '12%', 
      y: '72%',
      rotate: '-1.5deg'
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#FDFDFD]">
      <SectionLabel number="06" title="REVIEWS" />
      
      <div className="min-h-screen flex flex-col py-32 md:py-48 px-[5%] relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px), linear-gradient(#000 0.5px, transparent 0.5px), linear-gradient(90deg, #000 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Header */}
          <div className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black tracking-[0.2em] text-[#9CA3AF] w-fit">HOW WE WORK</span>
              <h2 className="text-[36px] md:text-[64px] font-sans font-bold text-[#111827] leading-[1.05] tracking-tight">
                당신의 아름다움이<br />최상의 정점에 도달하는 과정
              </h2>
              <p className="max-w-2xl text-[16px] md:text-[18px] text-[#9CA3AF] font-pretendard leading-relaxed mt-8 opacity-80">
                단순한 시술을 넘어, 당신의 고유한 아름다움이 자연스럽게 피어나는 과정을 함께합니다.<br /> 
                세밀한 분석부터 체계적인 사후 관리까지, KBEAUTYCHANNEL만의 차별화된 방식입니다.
              </p>
            </motion.div>
          </div>

          {/* Desktop Layout (Tag System - Finalized) */}
          <div className="relative min-h-[1600px] hidden lg:block">
            {/* Refined Curved Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <motion.path 
                d="M 800 100 Q 500 50, 350 200 T 300 500 T 700 800 T 350 1200 T 500 1500" 
                fill="none" 
                stroke="#D1D5DB" 
                strokeWidth="1.5" 
                strokeDasharray="8 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "linear" }}
              />
              {/* Scribble Arrow Near Header */}
              <motion.path
                d="M 500 50 Q 530 30, 550 70 L 542 63 M 550 70 L 558 63"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </svg>

            {/* Finalized Large Cards */}
            {processSteps.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ left: item.x, top: item.y, rotate: item.rotate }}
                className="absolute w-[640px] perspective-2000"
              >
                {/* Tag Shape Card (Double Size) */}
                <div className="relative bg-white rounded-[48px] p-16 pt-24 shadow-[0_60px_120px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_80px_160px_rgba(0,0,0,0.08)] transition-all duration-1000 overflow-visible group">
                  {/* Top Tab with Eyelet (Scale up) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 bg-white rounded-t-[32px] border-t border-x border-gray-100 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#F9FAFB] flex items-center justify-center shadow-inner border border-gray-50">
                      <div className="w-5 h-5 rounded-full bg-white shadow-sm border border-gray-100" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] font-black text-[#E5E7EB] font-sans tracking-tighter">{item.id}</span>
                      <div className="w-16 h-[1px] bg-gray-100" />
                    </div>
                    
                    <h4 className="text-[42px] font-sans font-black text-[#111827] tracking-tighter leading-none">{item.title}</h4>
                    
                    <p className="text-[18px] text-[#4B5563] font-pretendard leading-[1.8] opacity-70 group-hover:opacity-100 transition-opacity duration-700">
                      {item.desc}
                    </p>
                    
                    {/* Decorative bottom detail */}
                    <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                       <span className="text-[12px] font-bold text-[#D1D5DB] tracking-widest uppercase">KBEAUTYCHANNEL ARCHIVE</span>
                       <div className="flex gap-2">
                          {[...Array(3)].map((_, i) => (
                             <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-100" />
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* "Ready to be delivered!" Decor */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute right-[15%] bottom-[5%] flex flex-col items-center gap-4"
            >
              <span className="text-[#9CA3AF] text-[20px] font-pretendard italic font-medium tracking-tight translate-x-10">Ready to be delivered!</span>
              <svg width="80" height="40" viewBox="0 0 80 40" className="opacity-20 text-gray-400">
                <path d="M 0 20 Q 40 40, 80 0" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </motion.div>
          </div>

          {/* Mobile Layout (Strictly preserved and optimized) */}
          <div className="lg:hidden flex flex-col gap-12 mt-20 px-4">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.04)] relative overflow-visible"
              >
                {/* Mobile Tag Tab */}
                <div className="absolute top-0 right-12 -translate-y-1/2 w-20 h-8 bg-white rounded-t-xl border-t border-x border-gray-100 flex items-center justify-center">
                   <div className="w-4 h-4 rounded-full bg-gray-50 shadow-inner" />
                </div>

                <span className="text-[12px] font-black tracking-widest text-[#D1D5DB] mb-6 block">{item.id}</span>
                <h4 className="text-[28px] font-sans font-black text-[#111827] mb-6">{item.title}</h4>
                <p className="text-[16px] text-[#6B7280] font-pretendard leading-relaxed">
                  {item.shortDesc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
