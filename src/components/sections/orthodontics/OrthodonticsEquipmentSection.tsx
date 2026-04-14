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
export function OrthodonticsEquipmentSection() {
  const locale = useLocale();
  const isEn = locale === 'en';

  const doctorInfo = {
    name: isEn ? 'Dr. Ju-hee Baek' : '원장 백주희',
    title: isEn ? 'Orthodontic Specialist' : '교정과 전문의',
    qualifications: isEn ? [
      'Graduated top of class, Kyung Hee University College of Dentistry',
      'Completed Residency in Orthodontics, Kyung Hee University Dental Hospital',
      'Master of Science in Orthodontics, Kyung Hee University',
      'Extensive orthodontic research and case presentations',
    ] : [
      '경희대 치과대학 수석 졸업',
      '경희대 치과병원 교정과 레지던트 수료',
      '경희대 치의대 교정과 치의학 석사',
      '교정 연구 및 사례발표 다수',
    ],
    image: '/assets/about/about-4.webp',
  };

  const doctorInfo2 = {
    name: isEn ? 'Dr. Kyung-ri Park' : '원장 박경리',
    title: isEn ? 'Specialist in Advanced General Dentistry' : '통합치의학과 전문의',
    qualifications: isEn ? [
      'Graduated from Stanford University',
      'Graduated from Seoul National University College of Dentistry',
      'Master\'s Degree, Seoul National University School of Dentistry',
      'Fellowship at UCLA and Columbia University Dental Hospitals',
      'Former Orthodontic Director at Min Dental Clinic and Seoul Haru Dental Clinic',
    ] : [
      '스탠포드대학교 졸업',
      '서울대학교 치과대학 졸업',
      '서울대학교 치의학대학원 석사',
      '미국 UCLA, Columbia대학 치과대학병원 연수',
      '전) 압구정 민치과 교정과 원장, 전) 서울하루치과 교정과 대표원장',
    ],
  };

  return (
    <section className="relative w-full bg-white">
      <div className="relative w-full mx-auto px-[30px] md:px-[80px] py-[60px] md:py-[80px]" style={{ maxWidth: '1472px' }}>
        {/* 헤더 영역 */}
        <div className="mb-[40px] md:mb-[60px]">
          <h2
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
            교정과 전문의
          </h2>
          <p
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
            {isEn ? <>Blanche Dental Clinic is led by{'\n'}orthodontic specialists with over 20 years of experience</> : <>블랑쉬치과는<br className="block md:hidden" /> 20년 이상 경력의{'\n'}교정과 전문의가 진료합니다</>}
          </p>
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
            {isEn ? <>Completed specialized orthodontic training, achieved by only 4-5% of dentists.{'\n'}Extensive experience treating over 10,000 cases.</> : <>전체 치과의사 중 4~5%만 거치는<br className="block md:hidden" /> 교정과 전문의 수련과정 이수.{'\n'}10,000명 이상의 얼굴을 보고,<br className="block md:hidden" /> 치열을 교정해온 경험.</>}
          </p>
        </div>

        {/* 두 개의 동일한 컬럼 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]" style={{ gridTemplateRows: 'auto auto' }}>
          {/* 첫 번째 컬럼 */}
          <div className="relative flex flex-col md:grid md:row-span-2" style={{ background: '#F0F0F0', gridTemplateRows: 'subgrid' }}>
            {/* B 로고 - 절대 위치 */}
            <div className="absolute top-0 left-0 z-10 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="22.651" height="21.81" viewBox="0 0 23 22" fill="none">
                <path d="M6.54772 11.3727C3.97922 11.5272 1.89313 13.9457 1.89313 16.5187V19.6856C1.89313 20.3515 1.35324 20.8914 0.686866 20.8914H0V21.8092H11.8157V16.3248C11.8157 13.4833 9.42666 11.1998 6.54772 11.3727Z" fill="black"/>
                <path d="M17.692 11.3638C14.953 11.3638 12.7324 13.5843 12.7324 16.3233V21.8097H17.692C20.4309 21.8097 22.6515 19.5892 22.6515 16.8502V16.3233C22.6515 13.5843 20.4309 11.3638 17.692 11.3638Z" fill="black"/>
                <path d="M11.8157 0H0V0.917821H0.686866C1.35274 0.917821 1.89263 1.45772 1.89263 2.12358V5.29097C1.89263 7.86396 3.97922 10.2825 6.54722 10.4365C9.42666 10.6099 11.8157 8.32637 11.8157 5.48443V0Z" fill="black"/>
                <path d="M17.692 0H12.7324V5.48643C12.7324 8.22539 14.953 10.446 17.692 10.446C20.4309 10.446 22.6515 8.22539 22.6515 5.48643V4.95953C22.6515 2.22057 20.4309 0 17.692 0Z" fill="black"/>
              </svg>
            </div>
            {/* 이미지 영역 래퍼 - 중앙 정렬 */}
            <div className="relative flex items-end justify-center" style={{ background: '#F0F0F0' }}>
              {/* 이미지 영역 */}
              <div className="relative w-full h-[300px] md:h-[400px] lg:w-[372px] lg:h-[416px] overflow-hidden flex items-end justify-center" style={{ background: '#F0F0F0' }}>
                <Image
                  src="/assets/asset-115.webp"
                  alt= "블랑쉬치과 교정과 전문의 백주희 원장이 교정 진료 경험을 바탕으로 환자를 상담하는 프로필 사진"
                  fill
                  className="object-contain object-bottom lg:object-cover lg:object-bottom"
                  style={{ objectPosition: 'center bottom' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* 텍스트 영역 (검은 배경) */}
            <div className="w-full bg-black p-6 md:p-8">
              <p
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
              </p>
              <h3
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
              </h3>
              <ul className="space-y-2">
                {doctorInfo.qualifications.map((qualification, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                    style={{
                      color: '#FFF',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '22px',
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
          <div className="relative flex flex-col md:grid md:row-span-2" style={{ background: '#F0F0F0', gridTemplateRows: 'subgrid' }}>
            {/* B 로고 - 절대 위치 */}
            <div className="absolute top-0 left-0 z-10 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="22.651" height="21.81" viewBox="0 0 23 22" fill="none">
                <path d="M6.54772 11.3727C3.97922 11.5272 1.89313 13.9457 1.89313 16.5187V19.6856C1.89313 20.3515 1.35324 20.8914 0.686866 20.8914H0V21.8092H11.8157V16.3248C11.8157 13.4833 9.42666 11.1998 6.54772 11.3727Z" fill="black"/>
                <path d="M17.692 11.3638C14.953 11.3638 12.7324 13.5843 12.7324 16.3233V21.8097H17.692C20.4309 21.8097 22.6515 19.5892 22.6515 16.8502V16.3233C22.6515 13.5843 20.4309 11.3638 17.692 11.3638Z" fill="black"/>
                <path d="M11.8157 0H0V0.917821H0.686866C1.35274 0.917821 1.89263 1.45772 1.89263 2.12358V5.29097C1.89263 7.86396 3.97922 10.2825 6.54722 10.4365C9.42666 10.6099 11.8157 8.32637 11.8157 5.48443V0Z" fill="black"/>
                <path d="M17.692 0H12.7324V5.48643C12.7324 8.22539 14.953 10.446 17.692 10.446C20.4309 10.446 22.6515 8.22539 22.6515 5.48643V4.95953C22.6515 2.22057 20.4309 0 17.692 0Z" fill="black"/>
              </svg>
            </div>
            {/* 이미지 영역 래퍼 - 중앙 정렬 */}
            <div className="relative flex items-end justify-center" style={{ background: '#F0F0F0' }}>
              {/* 이미지 영역 */}
              <div className="relative w-full h-[300px] md:h-[400px] lg:w-[448px] lg:h-[442px] overflow-hidden flex items-end justify-center" style={{ background: '#F0F0F0' }}>
                <Image
                  src="/assets/asset-116.webp"
                  alt="블랑쉬치과 교정과 전문의 박경리 원장이 정밀한 치아교정 설계를 담당하는 의료진 프로필 이미지"
                  fill
                  className="object-contain lg:object-cover"
                  style={{ objectPosition: 'center center' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
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
                {doctorInfo2.title}
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
                {doctorInfo2.name}
              </p>
              <ul className="space-y-2">
                {doctorInfo2.qualifications.map((qualification, index) => (
                  <li
                    key={index}
                    className="flex items-start"
                    style={{
                      color: '#FFF',
                      fontSize: '14px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '22px',
                      letterSpacing: '-0.14px',
                      visibility: qualification ? 'visible' : 'hidden',
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
