import React from 'react';
import { motion } from 'motion/react';
import SectionLabel from '../common/SectionLabel';

const CREDENTIALS = [
  {
    label: 'Academic Foundation',
    items: [
      '서울대학교 대학원 졸업',
      '서울대학병원 수련의',
      '대한미용의사회 학술 의사 강사',
    ],
  },
  {
    label: 'Specialization',
    items: [
      '대한임상미용의학회 (KACAM)',
      '대한미용성형 레이저 의학회 (KASLS)',
    ],
  },
  {
    label: 'Global Credentials',
    items: [
      '미스코리아 경기, 인천 심사위원',
      '아나테이너 월드 코리아 심사위원',
      'Allergan (Juvederm, botox) Korea Faculty Member',
      '포텐자, 울트라셀Z Key Doctor',
    ],
  },
];

const PlaceholderImage = () => (
  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
    <span className="text-[16px] tracking-[0.4em] uppercase text-gray-300 select-none font-sans">
      DR. KIM PORTRAIT
    </span>
  </div>
);

export default function ProfilePhilosophy() {
  return (
    <section className="relative w-full bg-white min-h-[85vh] flex flex-col lg:flex-row overflow-hidden">
      <SectionLabel number="03" title="DOCTOR PHILOSOPHY" />

      {/* LEFT — Portrait */}
      <div className="w-full lg:w-[45%] h-[55vh] lg:h-auto overflow-hidden flex-shrink-0 relative">
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <PlaceholderImage />
        </motion.div>
      </div>

      {/* RIGHT — Content */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-[8%] py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <p className="text-[16px] font-black tracking-[0.45em] text-gray-300 uppercase mb-8">
            Seoul National University
          </p>

          {/* Headline */}
          <h2 className="font-sans text-[28px] md:text-[36px] font-black text-gray-900 leading-[1.08] tracking-tighter mb-6">
            서울대 출신의<br />
            정통파 클래식<br />
            뷰티 스탠다드
          </h2>

          {/* Subtitle */}
          <p className="text-[16px] font-pretendard text-gray-400 leading-relaxed max-w-sm mb-14">
            서울대학교 학부 및 대학원 졸업,<br />
            서울대학병원 수련을 거친 정통파 클래식 뷰티 스탠다드.
          </p>

          {/* Credentials */}
          <div className="border-l border-gray-900/10 pl-10 space-y-8">
            {CREDENTIALS.map((cred, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.15, duration: 0.8, ease: 'easeOut' }}
              >
                <span className="block text-[16px] font-black tracking-[0.35em] text-gray-300 uppercase mb-2">
                  {cred.label}
                </span>
                <ul className="space-y-1">
                  {cred.items.map((item, i) => (
                    <li key={i} className="text-[16px] font-pretendard text-gray-500 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
