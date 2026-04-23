'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

const YOUTUBE_VIDEO_ID = 'Webl3-Rk7uE';

const STATS = [
  { label: 'Total Views',   value: '12,000,000', suffix: '+',    desc: '1천2백만 뷰가 증명하는 피부 전문성' },
  { label: 'Beauty Videos', value: '1,000',       suffix: '+',    desc: '유튜브 뷰티 채널 최다 영상 제작' },
  { label: 'History',       value: '730',         suffix: 'Days', desc: '2년간 쉬지 않고 이어온 콘텐츠 여정' },
];

const HEADLINE_WORDS = ['뷰티 영상 1000건으로 인사드렸지만,', '아직 할 얘기가 더 많은 김연진 원장입니다.'];

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

export default function YoutubeAuthority() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full min-h-[85vh] md:min-h-screen overflow-hidden bg-[#0A0A0A] flex flex-col md:flex-row"
    >
      <SectionLabel number="02" title="HEAD DOCTOR INTRO" dark />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-[1]" style={{ backgroundImage: NOISE_BG }} />

      {/* ── LEFT: Headline + Stat list ───────────────────────────── */}
      <div className="relative flex-1 flex flex-col justify-center px-[6%] py-28 md:py-32 z-10">

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="block text-[9px] font-black tracking-[0.5em] text-white/20 uppercase mb-10"
        >
          Head Doctor — Kim Yeonjin
        </motion.span>

        {/* Headline */}
        <div className="mb-10">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.h2
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-[24px] md:text-[36px] font-black text-white tracking-tighter leading-[1.05]"
            >
              {word}
            </motion.h2>
          ))}
        </div>

        {/* Stat list */}
        <div>
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 + idx * 0.14, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group py-6 border-t border-white/[0.07] cursor-default"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="block text-[10px] font-black tracking-[0.35em] text-white/25 uppercase mb-2">
                    {stat.label}
                  </span>
                  <p className="text-[13px] text-white/35 leading-relaxed group-hover:text-white/55 transition-colors duration-500">
                    {stat.desc}
                  </p>
                </div>
                <div className="flex items-baseline gap-1 flex-shrink-0">
                  <span className="font-sans text-[28px] md:text-[32px] font-black text-white tracking-tighter leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-white/20 font-semibold">{stat.suffix}</span>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/[0.07]" />
        </div>
      </div>

      {/* ── RIGHT: YouTube Video ─────────────────────────────────── */}
      <div className="relative w-full md:w-[42%] h-[55vh] md:h-auto flex-shrink-0 overflow-hidden bg-[#0A0A0A]">
        {/* Left-edge blend into bg */}
        <motion.div className="absolute inset-x-0 top-[-15%] bottom-[-15%] h-[130%]" style={{ y: videoY }}>
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&autohide=1&start=90&playsinline=1`}
              title="Doctor Video"
              allow="autoplay; encrypted-media"
              frameBorder="0"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '56.25%',
                minHeight: '120%',
                minWidth: '210%',
                transform: 'translate(-50%, -50%) scale(1.1)',
              }}
            />
          </div>
        </motion.div>
        {/* Dark overlay fixed to container to prevent parallax gaps and block interactions */}
        <div className="absolute inset-0 bg-black/80 z-20" />
      </div>
    </section>
  );
}
