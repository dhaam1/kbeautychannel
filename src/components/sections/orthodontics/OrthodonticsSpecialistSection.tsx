'use client';

import Image from 'next/image';

import { useLocale } from 'next-intl';

/**
 * 교정과 전문의 섹션 컴포넌트
 * 
 * @description
 * 교정과 전문의 소개 섹션입니다.
 * 두 개의 동일한 컬럼으로 구성되어 있으며, 각 컬럼에는 의사 이미지와 자격사항이 표시됩니다.
 */

const getDoctorInfo = (isEn: boolean) => ({
    name: isEn ? 'Dr. Ju-hee Baek' : '원장 백주희',
    title: isEn ? 'Orthodontics Specialist' : '교정과 전문의',
    qualifications: isEn ? [
      'Graduated top of class from Kyung Hee University College of Dentistry',
      'Completed Orthodontics Residency at Kyung Hee University Dental Hospital',
      'Master\'s in Orthodontics, Kyung Hee University School of Dentistry',
      'Numerous orthodontic research and case presentations',
    ] : [
      '경희대 치과대학 수석 졸업',
      '경희대 치과병원 교정과 레지던트 수료',
      '경희대 치의대 교정과 치의학 석사',
      '교정 연구 및 사례발표 다수',
    ],
    image: '/assets/about/about-4.webp',
});

export function OrthodonticsSpecialistSection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const doctorInfo = getDoctorInfo(isEn);

  return (
    <section className="relative w-full bg-white">
      <div
        className="relative w-full mx-auto px-[30px] md:px-[80px] pt-[60px] pb-[60px] md:pt-[67px] md:pb-[100px]"
        style={{ maxWidth: '1472px' }}
      >
        {/* 헤더 영역 */}
        <div className="mb-[40px] md:mb-[60px]">
          <p
            style={{
              color: '#000',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '30px',
              letterSpacing: '-0.18px',
              marginBottom: '10px',
            }}
          >
            {isEn ? 'Orthodontics Specialist' : '교정과 전문의'}
          </p>
          <h2
            className="whitespace-pre-line"
            style={{
              color: '#000',
              fontSize: '28px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
              letterSpacing: '-0.28px',
              marginBottom: '20px',
            }}
          >
            {isEn ? <>Blanche Dental Clinic is treated by{'\n'}an orthodontics specialist<br className="block md:hidden" /> with over 20 years of experience</> : <>블랑쉬치과는<br className="block md:hidden" /> 20년 이상 경력의{'\n'}교정과 전문의가 진료합니다</>}
          </h2>
          <p
            className="whitespace-pre-line"
            style={{
              color: '#000',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '26px',
              letterSpacing: '-0.16px',
            }}
          >
            {isEn ? <>Completed the specialist residency,<br className="block md:hidden" /> a path taken by only 4-5% of dentists.{'\n'}Experience from seeing over 10,000 faces<br className="block md:hidden" /> and correcting smiles.</> : <>전체 치과의사 중 4~5%만 거치는<br className="block md:hidden" /> 교정과 전문의 수련과정 이수.{'\n'}10,000명 이상의 얼굴을 보고,<br className="block md:hidden" /> 치열을 교정해온 경험.</>}
          </p>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-[#D7D1CC] mb-[40px] md:mb-[60px]" />

        {/* 두 개의 동일한 컬럼 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* 첫 번째 컬럼 */}
          <div className="relative flex flex-col border-r-0 md:border-r border-[#D7D1CC]">
            {/* 이미지 영역 */}
            <div className="relative w-full aspect-[4/5] bg-white overflow-hidden">
              <Image
                src={doctorInfo.image}
                alt={doctorInfo.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* 텍스트 영역 (검은 배경) */}
            <div className="w-full bg-black p-6 md:p-8">
              <h3
                style={{
                  color: '#FFF',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.18px',
                  marginBottom: '8px',
                }}
              >
                {doctorInfo.title}
              </h3>
              <p
                style={{
                  color: '#FFF',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '20px',
                }}
              >
                {doctorInfo.name}
              </p>
              <ul className="space-y-2">
                {doctorInfo.qualifications.map((qualification, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                    style={{
                      color: '#FFF',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '24px',
                      letterSpacing: '-0.14px',
                    }}
                  >
                    <span className="mr-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>•</span>
                    {qualification}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 두 번째 컬럼 (동일한 구조) */}
          <div className="relative flex flex-col">
            {/* 이미지 영역 */}
            <div className="relative w-full aspect-[4/5] bg-white overflow-hidden">
              <Image
                src={doctorInfo.image}
                alt={doctorInfo.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* 텍스트 영역 (검은 배경) */}
            <div className="w-full bg-black p-6 md:p-8">
              <h3
                style={{
                  color: '#FFF',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.18px',
                  marginBottom: '8px',
                }}
              >
                {doctorInfo.title}
              </h3>
              <p
                style={{
                  color: '#FFF',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '20px',
                }}
              >
                {doctorInfo.name}
              </p>
              <ul className="space-y-2">
                {doctorInfo.qualifications.map((qualification, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                    style={{
                      color: '#FFF',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '24px',
                      letterSpacing: '-0.14px',
                    }}
                  >
                    <span className="mr-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>•</span>
                    {qualification}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
