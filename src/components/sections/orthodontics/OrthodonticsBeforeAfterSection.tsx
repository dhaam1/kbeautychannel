import Image from 'next/image';

import { useLocale } from 'next-intl';

/**
 * Before/After 섹션 컴포넌트
 * OrthodonticsEquipmentSection과 동일한 구조
 */
export function OrthodonticsBeforeAfterSection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  return (
    <section 
      className="relative w-full flex flex-col items-center justify-center overflow-visible"
      style={{ backgroundColor: '#F7F8F8' }}
    >
      {/* 상단 영역 (제목 및 설명) */}
      <div 
        className="flex flex-col items-start w-full mx-auto px-[30px] md:px-[80px] pt-[70px] pb-[70px] overflow-visible"
        style={{ maxWidth: '1472px' }}
      >
        <h2
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
            marginBottom: '12px',
          }}
        >
          {isEn ? 'Adult Orthodontic Appliances' : '성인 치아교정 장치'}
        </h2>
        <p
          className="whitespace-pre-line"
          style={{
            color: '#000',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            letterSpacing: '-1px',
            marginBottom: '24px',
          }}
        >
          {isEn ? <>Blanche Dental Clinic's{'\n'}Custom Adult Orthodontics</> : <>블랑쉬치과가 제안하는{'\n'}성인 맞춤 교정 장치</>}
        </p>
        <p
          className="whitespace-pre-line"
          style={{
            color: '#000',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '30px',
            letterSpacing: '-0.18px',
          }}
        >
          {isEn ? <>Beyond basic alignment,{'\n'}we restore overall facial harmony,{'\n'}jawline contour, and chewing function.</> : <>치아 배열을 넘어{'\n'}턱 라인과 씹는 기능까지,{'\n'}얼굴의 전체적인 조화를 찾아드립니다.</>}
        </p>
      </div>

      {/* 그리드 컨테이너 */}
      <div className="w-full px-[30px] md:px-[80px] pb-[60px] md:pb-[100px] mx-auto overflow-visible" style={{ maxWidth: '1472px' }}>
        {/* 카드 컨테이너: 모바일/태블릿 세로, PC 가로 */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch w-full mx-auto overflow-visible gap-[30px] lg:gap-x-[30px] lg:gap-y-0" style={{ maxWidth: '1472px', background: '#F7F8F8' }}>
          {/* 첫 번째 카드: 인비절라인 */}
          <div className="flex flex-col w-full lg:h-full">
            {/* 이미지 */}
            <div 
              className="relative w-full h-[225px]"
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '225px', height: '100%' }}>
                <Image
                  src="/assets/asset-95.webp"
                  alt= "블랑쉬치과 인비절라인 교정 장치, 투명한 맞춤형 성인 치아교정 시스템"
                  fill
                  className="object-contain"
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {/* 텍스트 */}
            <div 
              className="flex flex-col items-start justify-start w-full bg-white pt-[40px] pb-[40px] px-[40px] lg:flex-1"
            >
              <h3
                style={{
                  color: '#262626',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '16px',
                }}
              >
                {isEn ? 'Invisalign' : '인비절라인 교정'}
              </h3>
              <p
                className="whitespace-pre-line"
                style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '17px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '28px',
                  letterSpacing: '-0.17px',
                }}
              >
                {isEn ? <>Secretly transparent orthodontics.{'\n'}Custom-crafted clear aligners{'\n'}that are fully removable,{'\n'}allowing absolute freedom<br className="md:hidden" /><span className="hidden md:inline"> </span>for meals and brushing.</> : <>아무도 모르게 투명한 교정.{'\n'}개인별 맞춤 제작으로 진행되는{'\n'}투명한 재질의 교정 장치로,{'\n'}탈부착이 가능해<br className="md:hidden" /><span className="hidden md:inline"> </span>식사와 양치 모두 자유로움.</>}
              </p>
            </div>
          </div>

          {/* 두 번째 카드: 클리피씨 */}
          <div className="flex flex-col w-full lg:h-full">
            {/* 이미지 */}
            <div 
              className="relative w-full h-[225px]"
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '225px', height: '100%' }}>
                <Image
                  src="/assets/asset-96.webp"
                  alt="블랑쉬치과 클리피씨 2세대 교정 장치, 통증을 줄인 세라믹 성인 교정"
                  width={400}
                  height={300}
                  className="object-contain w-full h-full"
                  quality={85}
                />
              </div>
            </div>
            {/* 텍스트 */}
            <div 
              className="flex flex-col items-start justify-start w-full bg-white pt-[40px] pb-[40px] px-[40px] lg:flex-1"
            >
              <h3
                style={{
                  color: '#262626',
                  fontSize: '20px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  letterSpacing: '-0.2px',
                  marginBottom: '16px',
                }}
              >
                {isEn ? 'Clippy-C Orthodontics (2nd Gen)' : '클리피씨 교정(클리피씨 2세대)'}
              </h3>
              <p
                className="whitespace-pre-line"
                style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '17px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '28px',
                  letterSpacing: '-0.17px',
                }}
              >
                {isEn ? <>Fast and comfortable ceramic braces.{'\n'}Self-ligating sliding doors{'\n'}minimize pain, while ceramic{'\n'}material blends naturally<br className="md:hidden" /><span className="hidden md:inline"> </span>with your tooth color.</> : <>빠르고 편안한 세라믹 교정.{'\n'}슬라이딩 도어 방식의{'\n'}자가결찰 시스템으로 통증 최소화,{'\n'}치아색과 유사한 세라믹 재질로<br className="md:hidden" /><span className="hidden md:inline"> </span>자연스러운 색감.</>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
