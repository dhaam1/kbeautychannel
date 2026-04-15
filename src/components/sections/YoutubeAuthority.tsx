import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import SectionLabel from '../common/SectionLabel';

const YOUTUBE_VIDEO_ID = 'Webl3-Rk7uE'; // 사용자 지정 배경 영상

const BackgroundVideo = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-black/40 z-10" />
    <iframe
      className="absolute top-1/2 left-1/2 w-[115%] h-[115%] -translate-x-1/2 -translate-y-1/2 scale-125 md:scale-110"
      src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&autohide=1&start=90`}
      title="Background Video"
      allow="autoplay; encrypted-media"
      frameBorder="0"
    />
  </div>
);

export default function YoutubeAuthority() {
  const stats = [
    { label: 'Total Views', value: '12,000,000', suffix: '+' },
    { label: 'Beauty Videos', value: '990', suffix: '+' },
    { label: 'History', value: '730', suffix: 'Days' },
  ];

  const mainText = "1000개의 영상으로 인사 드렸지만\n아직 할 얘기가 더 많은 김연진 원장입니다.";

  return (
    <section className="relative z-10 w-full min-h-[85vh] md:min-h-screen flex items-center overflow-hidden bg-black transition-all duration-1000">
      <SectionLabel number="02" title="HEAD DOCTOR INTRO" dark />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-full min-h-[85vh] md:min-h-screen flex flex-col justify-between py-[10vh] px-[5%]"
      >
        <BackgroundVideo />
        
        {/* Top Left: Headline Only */}
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-start w-full">
          <div className="max-w-4xl mb-0">
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-white leading-[1.2] tracking-tighter mb-0 whitespace-pre-line">
              {mainText}
            </h2>
          </div>
        </div>

        {/* Bottom Right: Stats with Thin Lines */}
        <div className="relative z-20 self-end w-full md:w-[320px] mt-auto">
          <div className="flex flex-col gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="w-full h-[1px] bg-white/30 mb-4 overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '0%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (idx * 0.2), duration: 1.5, ease: "circOut" }}
                    className="w-full h-full bg-white/60"
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-[11px] font-medium text-white/50 uppercase tracking-widest">{stat.label}</span>
                  <div className="flex items-center gap-1 group-hover:gap-3 transition-all">
                    <span className="font-sans text-4xl font-semibold text-white tracking-tighter">{stat.value}</span>
                    <Plus size={12} className="text-white/30" />
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full h-[1px] bg-white/30" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
