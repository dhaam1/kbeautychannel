"use client";

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import Hero from '../components/sections/Hero';
import YoutubeAuthority from '../components/sections/YoutubeAuthority';
import ProfessionalProfile from '../components/sections/ProfessionalProfile';
import SocialProofBridge from '../components/sections/SocialProofBridge';
import YoutubeEmbed from '../components/sections/YoutubeEmbed';
import ColumnSection from '../components/sections/ColumnSection';
import FooterCTA from '../components/sections/FooterCTA';
import Footer from '../components/layout/Footer';


 export default function Home() {
   const profileRef = useRef<HTMLDivElement>(null);

   return (
     <div className="w-full snap-container font-sans text-gray-900">
       <div className="snap-section">
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
       <div className="snap-section relative z-10 bg-white">
         <FooterCTA />
       </div>
       <Footer />
     </div>
   );
 }
