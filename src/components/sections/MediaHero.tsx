import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import Header from '../layout/Header';

export default function MediaHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#1A1A1A] text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/media-hero-bg.png"
          alt="Media Hero Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Header Integration - Using Global Header */}
      <div className="absolute top-0 left-0 w-full z-20 px-[5%] py-6 md:py-10">
        <Header isDarkBackground={true} />
      </div>

      {/* Main Typography Content - KBEAUTYCHANNEL Copywriting */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-12 md:px-24">
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col gap-2 md:gap-4">
            {/* Row 1 */}
            <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
              <h1 className="font-serif text-[6vw] md:text-[80px] lg:text-[110px] leading-none tracking-tight">
                CRAFTING
              </h1>
              <h1 className="font-serif text-[6vw] md:text-[80px] lg:text-[110px] leading-none tracking-tight">
                THE BEAUTY,
              </h1>
            </div>

            {/* Row 2 */}
            <div className="mt-2">
              <h1 className="font-serif text-[6vw] md:text-[80px] lg:text-[110px] leading-none tracking-tight">
                THE DEPTH OF
              </h1>
            </div>

            {/* Row 3 & 4 (Shifted Right) */}
            <div className="flex flex-col items-end mt-4 md:mt-8">
              <h1 className="font-serif text-[6vw] md:text-[80px] lg:text-[110px] leading-none tracking-tight italic text-[#E8927D]">
                EXPERTISE.
              </h1>
              <div className="h-[1px] w-1/3 bg-white/20 mt-4 self-end" />
            </div>
          </div>

          {/* Bottom Left Korean Text - KBEAUTYCHANNEL Specific */}
          <div className="absolute bottom-12 left-12 md:left-24 max-w-lg">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-10 h-[1px] bg-[#E8927D]" />
                <span className="text-[11px] tracking-[0.3em] text-[#E8927D] font-bold uppercase">Archive Media</span>
              </div>
              <p className="text-[15px] md:text-[17px] font-medium leading-relaxed text-white/90">
                1천2백만 뷰, 1000건 이상의 뷰티 노하우.<br />
                김연진 원장의 시선으로 담아낸 프리미엄 미디어 아카이브입니다.
              </p>
              <p className="text-[13px] font-light text-white/50">
                격차가 만드는 아름다움, 오직 케이뷰티채널에서만 경험할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="absolute bottom-10 right-10 z-20 w-14 h-14 bg-[#E8927D] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group border border-white/20">
        <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* Scroll Indicator Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-around opacity-5">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white" />
      </div>
    </section>
  );
}
