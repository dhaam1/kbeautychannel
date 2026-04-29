"use client";

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

import Hero from '../components/sections/Hero';

// 뷰포트 아래에 있는 무거운 섹션들을 동적으로 로딩하여 초기 번들 사이즈와 메인 스레드 부담을 줄입니다.
const YoutubeAuthority = dynamic(() => import('../components/sections/YoutubeAuthority'), { ssr: true });
const ProfessionalProfile = dynamic(() => import('../components/sections/ProfessionalProfile'), { ssr: true });
const SocialProofBridge = dynamic(() => import('../components/sections/SocialProofBridge'), { ssr: true });
const YoutubeEmbed = dynamic(() => import('../components/sections/YoutubeEmbed'), { ssr: true });
const ColumnSection = dynamic(() => import('../components/sections/ColumnSection'), { ssr: true });
const FooterCTA = dynamic(() => import('../components/sections/FooterCTA'), { ssr: true });
const Footer = dynamic(() => import('../components/layout/Footer'), { ssr: true });

 export default function Home() {
   const profileRef = useRef<HTMLDivElement>(null);

   return (
     <div className="w-full snap-container font-sans text-gray-900">
       <div className="snap-section relative z-50">
         <Hero />
       </div>
       <div className="snap-section relative z-10 bg-white">
         <YoutubeAuthority />
       </div>
       <div ref={profileRef} className="snap-section relative z-10 bg-white">
         <ProfessionalProfile />
       </div>
       <div className="snap-section relative z-10 bg-white">
         <SocialProofBridge />
       </div>
       <div className="snap-section relative z-10 bg-white">
         <YoutubeEmbed />
       </div>
       <div className="snap-section relative z-10 bg-white">
         <ColumnSection />
       </div>
       <div className="relative z-10 bg-white">
         <FooterCTA />
       </div>
       <Footer />
     </div>
   );
 }
