'use client';

import { motion } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface FeatureCardProps extends Feature {}

const FeatureCard = ({ number, title, description, icon }: FeatureCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-[40px] p-8 md:p-12 flex flex-col min-h-[420px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] transition-all duration-700 group"
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col gap-3">
          <span className="text-3xl md:text-4xl font-sans font-black tracking-tighter text-gray-900 leading-none">
            ({number})
          </span>
          <h3 className="text-3xl md:text-[48px] font-sans font-black tracking-tighter text-gray-900 leading-[0.9] uppercase max-w-[150px] md:max-w-[250px]">
            {title}
          </h3>
        </div>
        <div className="w-24 h-24 md:w-36 md:h-36 -mt-4 -mr-4">
          <img 
            src={icon} 
            alt={title} 
            className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 ease-out" 
          />
        </div>
      </div>
      
      <div className="mt-auto pt-8">
        <p className="text-[16px] text-gray-500 font-pretendard leading-relaxed max-w-sm whitespace-pre-line text-pretty">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

interface ProcedureFeaturesProps {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  bgImage: string;
  sectionNumber?: string;
  sectionTitle?: string;
}

export default function ProcedureFeatures({
  title,
  subtitle,
  description,
  features,
  bgImage,
  sectionNumber = "02",
  sectionTitle = "FEATURES"
}: ProcedureFeaturesProps) {
  return (
    <section className="relative w-full py-24 md:py-40 px-[5%]">
      <SectionLabel number={sectionNumber} title={sectionTitle} />
      
      {/* Background with Pastel Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src={bgImage} 
          alt="Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-soft-light"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-stretch">
          {/* Sticky Left Column */}
          <div className="md:w-5/12 relative">
            <div className="md:sticky md:top-40 flex flex-col gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-gray-900/30" />
                  <span className="text-[16px] font-bold tracking-[0.4em] uppercase text-gray-500">{subtitle}</span>
                </div>
                <h2 className="text-[54px] md:text-[54px] font-sans font-black leading-[0.85] tracking-tight text-gray-900 uppercase whitespace-pre-line">
                  {title}
                </h2>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-[16px] text-gray-500 font-pretendard leading-relaxed max-w-xs whitespace-pre-line text-pretty"
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Scrolling Right Column - Fixed to List Layout */}
          <div className="md:w-7/12 flex flex-col gap-8 md:pt-20">
            {features.map((feature, idx) => (
              <FeatureCard 
                key={feature.number} 
                {...feature} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
