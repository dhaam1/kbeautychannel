import React from 'react';
import Navbar from '../layout/Navbar';

export default function MediaHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0D0E0E] text-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        >
          <source src="/videos/media-video.webm" type="video/webm" />
        </video>
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Header Integration - Using Global Header */}
      <Navbar isDarkBackground={true} />
      <div className="w-full h-[88px] invisible pointer-events-none" />

      {/* Main Typography Content - KBEAUTYCHANNEL Copywriting */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-12 md:px-24">
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Main Korean Headline - Positioned Middle-Left */}
          <div className="max-w-3xl">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-12 h-[1px] bg-white/40" />
                <span className="text-[16px] md:text-[18px] tracking-[0.4em] text-white font-bold uppercase">Archive Media</span>
              </div>
              
              <h1 className="font-pretendard text-4xl md:text-[48px] font-bold leading-[1.1] tracking-tighter text-white">
                공신력있는 미디어들도<br />
                <span className="text-white">김연진 원장에게 주목합니다.</span>
              </h1>

              <div className="flex flex-col gap-4 mt-4">
                <p className="text-[18px] md:text-[20px] font-bold leading-relaxed text-white/90 max-w-xl">
                  1천2백만 뷰, 1000건 이상의 뷰티 노하우.<br />
                  김연진 원장의 시선으로 담아낸 프리미엄 미디어 아카이브입니다.
                </p>
                <p className="text-[16px] md:text-[17px] font-bold text-white/50 tracking-wide">
                  격차가 만드는 아름다움, 오직 케이뷰티채널에서만 경험할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
