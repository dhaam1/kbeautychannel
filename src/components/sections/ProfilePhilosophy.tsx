import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import SectionLabel from '../common/SectionLabel';

const DOCTOR_DATA = {
  name: "김연진",
  title: "대표원장",
  education: [
    "서울대학교 대학원 졸업",
    "서울대학병원 수련의"
  ],
  academic: [
    "대한미용의사회 학술 의사 강사"
  ],
  societies: [
    { ko: "대한임상미용의학회", en: "KACAM" },
    { ko: "대한미용성형 레이저 의학회", en: "KASLS" }
  ],
  experience: [
    "미스코리아 경기, 인천 심사위원",
    "아나테이너 월드 코리아 심사위원",
    "Allergan (Juvederm, botox) Korea Faculty Member",
    "포텐자, 울트라셀Z Key Doctor"
  ]
};

const PlaceholderImage = () => (
  <div className="w-full h-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 opacity-50" />
    <span className="relative z-10 font-sans text-gray-400 text-xs tracking-widest uppercase">
      [DR. KIM PORTRAIT PHOTO / VIDEO]
    </span>
    {/* Subtle light effect */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full" />
  </div>
);

export default function ProfilePhilosophy() {
  return (
    <section className="relative w-full overflow-hidden transition-colors duration-700 ease-in-out bg-white">
      <SectionLabel number="03" title="DOCTOR PHILOSOPHY" />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full h-full min-h-screen flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Image Section */}
        <div className="w-full md:w-[45%] h-[50vh] md:h-screen relative overflow-hidden group">
           <PlaceholderImage />
           <div className="absolute inset-0 bg-gray-900/5 group-hover:bg-transparent transition-all duration-[2s]" />
           <div className="absolute bottom-12 left-12 z-20">
              <h2 className="font-sans text-5xl font-black text-white mix-blend-difference tracking-tighter">
                {DOCTOR_DATA.name}
              </h2>
           </div>
        </div>

        {/* Right Info Section */}
        <div className="w-full md:w-[55%] bg-[#fafafa] p-12 md:p-24 flex flex-col justify-center gap-16 md:gap-20">
           <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-gray-900" />
                <span className="text-xs font-black tracking-[0.3em] uppercase">{DOCTOR_DATA.title} 프로필</span>
              </div>
              <p className="font-sans text-xl md:text-2xl font-light text-gray-600 leading-relaxed max-w-xl">
                서울대학교 학부 및 대학원 졸업,<br/>
                서울대학병원 수련을 거친 정통파 클래식 뷰티 스탠다드.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h5 className="font-sans text-[11px] font-black uppercase text-gray-300 tracking-widest border-b border-gray-100 pb-4">Specialization</h5>
                <div className="space-y-4">
                   {DOCTOR_DATA.societies.map((s, i) => (
                     <div key={i} className="group">
                        <p className="text-sm font-bold text-gray-900 mb-1">{s.ko}</p>
                        <p className="text-[10px] text-gray-400 uppercase font-medium">{s.en} Regular Member</p>
                     </div>
                   ))}
                </div>
              </div>
              <div className="space-y-6">
                <h5 className="font-sans text-[11px] font-black uppercase text-gray-300 tracking-widest border-b border-gray-100 pb-4">Global Credentials</h5>
                <div className="space-y-4">
                   {DOCTOR_DATA.experience.map((item, i) => (
                     <div key={i} className="flex gap-3">
                        <CheckCircle2 size={14} className="text-gray-900 mt-1 shrink-0" />
                        <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
                     </div>
                   ))}
                </div>
              </div>
           </div>
        </div>
      </motion.div>
    </section>
  );
}
