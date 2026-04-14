import Image from 'next/image';
import { useLocale } from 'next-intl';

/**
 * 교정 전문 장비 섹션 컴포넌트
 * ImplantDesignSection을 기반으로 복제 (의존성 제거, 좌우 2열 레이아웃)
 */
export function OrthodonticsTechnologySection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  return (
    <section className="relative w-full bg-white">
      <div className="relative w-full h-auto flex flex-col lg:block">
        {/* 모바일 레이아웃 */}
        <div className="lg:hidden w-full flex flex-col">
          {/* 상단 헤더 영역 */}
          <div
            className="w-full px-[30px] md:px-[80px] pt-[60px] md:pt-[67px] pb-[40px] overflow-visible"
            style={{ backgroundColor: '#F7F8F8' }}
          >
            <h2
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '30px',
                letterSpacing: '-0.18px',
                marginBottom: 0,
              }}
            >
              {isEn ? 'Specialized Orthodontic Equipment' : '교정 전문 장비'}
            </h2>
            <p
              className="whitespace-pre-line mt-[17px]"
              style={{
                color: '#000',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
                letterSpacing: '-0.28px',
                marginBottom: 0,
              }}
            >
              {isEn ? <>Invisalign Orthodontics,{'\n'}designed with precision equipment</> : <>인비절라인 치아교정,{'\n'}정밀한 장비로 설계합니다</>}
            </p>
            <p
              className="mt-[17px] whitespace-pre-line"
              style={{
                color: '#000',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '30px',
                letterSpacing: '-0.18px',
              }}
            >
              {isEn ? <>Blanche Dental Clinic uses the premium{'\n'}iTero digital oral scanner to provide{'\n'}a more accurate and comfortable diagnosis.</> : <>블랑쉬치과는 고가의 전문장비인{'\n'}아이테로(iTero)디지털 구강 스캐너로{'\n'}더 정확하고, 더 편안한 진단을 제공합니다.</>}
            </p>
          </div>

          {/* 이미지 영역 (모바일: 위로) */}
          <div
            className="w-full px-[30px] md:px-[80px] py-[0px] overflow-visible"
            style={{ backgroundColor: '#F7F8F8' }}
          >
            <div className="flex flex-col items-end">
              <div className="relative w-full justify-end" style={{ aspectRatio: 'auto', minHeight: '500px' }}>
                <Image
                  src="/assets/asset-128.webp"
                  alt="iTero 스캐너"
                  fill
                  className="object-contain object-bottom"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* 3개 카드 */}
          <div
            className="w-full px-[0px] md:px-[80px] pt-[0px] pb-[60px] md:pb-[100px] overflow-visible"
            style={{ backgroundColor: '#F7F8F8' }}
          >
            <div className="flex flex-col gap-[24px] px-[30px]">
              {/* 카드 1: 본뜨기 없이, 빠르고 정확하게 */}
              <div
                className="p-6 flex flex-col w-full lg:w-[377px] lg:h-[154px]"
                style={{
                  background: '#FFFFFF',
                }}
              >
                <h3
                  style={{
                    color: '#000',
                    fontSize: '22px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.22px',
                    marginBottom: '12px',
                  }}
                >
                  {isEn ? 'Fast and accurate, without molding' : '본뜨기 없이, 빠르고 정확하게'}
                </h3>
                <p
                  className="whitespace-pre-line"
                  style={{
                    color: 'rgba(0, 0, 0, 0.70)',
                    fontSize: '17px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '28px',
                    letterSpacing: '-0.17px',
                  }}
                >
                  {isEn ? <>Creates high-resolution 3D images{'\n'}using only a scanner, no cold putty.</> : <>차가운 반죽 없이 스캐너만으로{'\n'}고해상도 3D이미지를 구현합니다.</>}
                </p>
              </div>

              {/* 카드 2: 치료 전, 결과를 눈으로 먼저 */}
              <div
                className="p-6 flex flex-col w-full lg:w-[377px] lg:h-[154px]"
                style={{
                  background: '#FFFFFF',
                }}
              >
                <h3
                  style={{
                    color: '#000',
                    fontSize: '22px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.22px',
                    marginBottom: '12px',
                  }}
                >
                  {isEn ? 'See the results before treatment' : '치료 전, 결과를 눈으로 먼저'}
                </h3>
                <p
                  className="whitespace-pre-line"
                  style={{
                    color: 'rgba(0, 0, 0, 0.70)',
                    fontSize: '17px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '28px',
                    letterSpacing: '-0.17px',
                  }}
                >
                  {isEn ? <>Preview the post-orthodontic changes{'\n'}through a 3D simulation.</> : <>3D시뮬레이션으로 교정 후 변화를{'\n'}미리 확인할 수 있습니다.</>}
                </p>
              </div>

              {/* 카드 3: 데이터 기반 정교한 설계 */}
              <div
                className="p-6 flex flex-col w-full lg:w-[377px] lg:h-[154px]"
                style={{
                  background: '#FFFFFF',
                }}
              >
                <h3
                  style={{
                    color: '#000',
                    fontSize: '22px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.22px',
                    marginBottom: '12px',
                  }}
                >
                  {isEn ? 'Data-driven precise design' : '데이터 기반 정교한 설계'}
                </h3>
                <p
                  className="whitespace-pre-line"
                  style={{
                    color: 'rgba(0, 0, 0, 0.70)',
                    fontSize: '17px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '28px',
                    letterSpacing: '-0.17px',
                  }}
                >
                  {isEn ? <>Precisely fabricates Invisalign aligners{'\n'}using digital scan data.</> : <>디지털 스캔 데이터로<br className="block md:hidden" /> 인비절라인 교정 장치를{'\n'}정밀하게 제작합니다.</>}
                </p>
              </div>
            </div>

            {/* CTA 문구: 모바일 전용 줄바꿈/폰트 적용 */}
            <p
              className="whitespace-pre-line text-center mt-[100px] md:hidden"
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: '26px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '40px',
                letterSpacing: '-0.28px',
              }}
            >
              {isEn ? <>Proper Invisalign orthodontics,{'\n'}trust Blanche Dental Clinic{'\n'}equipped with professional tools.</> : <>제대로 된 인비절라인 치아교정,{'\n'}전문 장비까지 갖춘{'\n'}블랑쉬치과에 맡기세요.</>}
            </p>

            <p
              className="whitespace-pre-line text-center mt-[100px] hidden md:block"
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '40px',
                letterSpacing: '-0.28px',
              }}
            >
              {isEn ? <>Proper Invisalign orthodontics,{'\n'}trust Blanche Dental Clinic equipped with professional tools</> : <>제대로 된 인비절라인 치아교정,{'\n'}전문 장비까지 갖춘 블랑쉬치과에 맡기세요</>}
            </p>
          </div>


        </div>

        {/* 태블릿/PC 레이아웃 */}
        <div className="hidden lg:block relative w-full h-full" style={{ background: '#F7F8F8' }}>
          {/* 컨텐츠 래퍼: max-w-[1472px] 중앙 정렬 */}
          <div className="relative w-full max-w-[1472px] h-full mx-auto px-[80px] pt-[67px] pb-[100px]">
            {/* 좌우 2열 그리드 */}
            <div className="grid grid-cols-2 gap-[60px] items-stretch h-full">
              {/* 좌측 열: 헤더 + 3개 카드 (고정 폭) */}
              <div className="flex flex-col" style={{ width: '100%', maxWidth: '600px' }}>
                {/* 헤더 영역 */}
                <div className="mb-[60px]">
                  <p
                    style={{
                      color: '#000',
                      fontSize: '18px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '30px',
                      letterSpacing: '-0.18px',
                      marginBottom: 0,
                    }}
                  >
                    {isEn ? 'Specialized Orthodontic Equipment' : '교정 전문 장비'}
                  </p>
                  <p
                    className="whitespace-pre-line mt-[17px]"
                    style={{
                      color: '#000',
                      fontSize: '28px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: 'normal',
                      letterSpacing: '-0.28px',
                      marginTop: '17px',
                      marginBottom: 0,
                    }}
                  >
                    {isEn ? <>Invisalign Orthodontics,{'\n'}designed with precision equipment</> : <>인비절라인 치아교정,{'\n'}정밀한 장비로 설계합니다</>}
                  </p>
                  <p
                    className="mt-[17px] whitespace-pre-line"
                    style={{
                      color: '#000',
                      fontSize: '18px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '30px',
                      letterSpacing: '-0.18px',
                    }}
                  >
                    {isEn ? <>Blanche Dental Clinic uses the premium{'\n'}iTero digital oral scanner to provide{'\n'}a more accurate and comfortable diagnosis.</> : <>블랑쉬치과는 고가의 전문장비인{'\n'}아이테로(iTero)디지털 구강 스캐너로{'\n'}더 정확하고, 더 편안한 진단을 제공합니다.</>}
                  </p>
                </div>

                {/* 3개 카드 */}
                <div className="flex flex-col gap-[24px]">
                  {/* 카드 1: 본뜨기 없이, 빠르고 정확하게 */}
                  <div
                    className="p-6 flex flex-col"
                    style={{
                      background: '#FFFFFF',
                      width: '377px',
                      height: '154px',
                    }}
                  >
                    <p
                      style={{
                        color: '#000',
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.22px',
                        marginBottom: '12px',
                      }}
                    >
                      {isEn ? 'Fast and accurate, without molding' : '본뜨기 없이, 빠르고 정확하게'}
                    </p>
                    <p
                      className="whitespace-pre-line"
                      style={{
                        color: 'rgba(0, 0, 0, 0.70)',
                        fontSize: '17px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '28px',
                        letterSpacing: '-0.17px',
                      }}
                    >
                      {isEn ? <>Creates high-resolution 3D images{'\n'}using only a scanner, no cold putty.</> : <>차가운 반죽 없이 스캐너만으로{'\n'}고해상도 3D이미지를 구현합니다.</>}
                    </p>
                  </div>

                  {/* 카드 2: 치료 전, 결과를 눈으로 먼저 */}
                  <div
                    className="p-6 flex flex-col"
                    style={{
                      background: '#FFFFFF',
                      width: '377px',
                      height: '154px',
                    }}
                  >
                    <p
                      style={{
                        color: '#000',
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.22px',
                        marginBottom: '12px',
                      }}
                    >
                      {isEn ? 'See the results before treatment' : '치료 전, 결과를 눈으로 먼저'}
                    </p>
                    <p
                      className="whitespace-pre-line"
                      style={{
                        color: 'rgba(0, 0, 0, 0.70)',
                        fontSize: '17px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '28px',
                        letterSpacing: '-0.17px',
                      }}
                    >
                      {isEn ? <>Preview the post-orthodontic changes{'\n'}through a 3D simulation.</> : <>3D시뮬레이션으로 교정 후 변화를{'\n'}미리 확인할 수 있습니다.</>}
                    </p>
                  </div>

                  {/* 카드 3: 데이터 기반 정교한 설계 */}
                  <div
                    className="p-6 flex flex-col"
                    style={{
                      background: '#FFFFFF',
                      width: '377px',
                      height: '154px',
                    }}
                  >
                    <p
                      style={{
                        color: '#000',
                        fontSize: '22px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.22px',
                        marginBottom: '12px',
                      }}
                    >
                      {isEn ? 'Data-driven precise design' : '데이터 기반 정교한 설계'}
                    </p>
                    <p
                      className="whitespace-pre-line"
                      style={{
                        color: 'rgba(0, 0, 0, 0.70)',
                        fontSize: '17px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '28px',
                        letterSpacing: '-0.17px',
                      }}
                    >
                      {isEn ? <>Precisely fabricates Invisalign aligners{'\n'}using digital scan data.</> : <>디지털 스캔 데이터로<br className="block md:hidden" /> 인비절라인 교정 장치를{'\n'}정밀하게 제작합니다.</>}
                    </p>
                  </div>
                </div>
              </div>

              {/* 우측 열: 이미지 (반응형) */}
              <div className="flex flex-col items-end h-full w-full">
                <div className="relative w-full h-full flex flex-col justify-end">
                  <div className="relative w-full flex-1 max-h-[400px] lg:max-h-[560px]">
                    <Image
                      src="/assets/plus/iam.webp"
                      alt="iTero 스캐너"
                      fill
                      className="object-contain object-bottom"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p
              className="whitespace-pre-line text-center mt-[100px]"
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: '28px',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '40px',
                letterSpacing: '-0.28px',
              }}
            >
              {isEn ? <>Proper Invisalign orthodontics,{'\n'}trust Blanche Dental Clinic equipped with professional tools</> : <>제대로 된 인비절라인 치아교정,{'\n'}전문 장비까지 갖춘 블랑쉬치과에 맡기세요</>}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
