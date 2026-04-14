import Image from 'next/image';

/**
 * 교정 전문 장비 섹션 컴포넌트 (일본어)
 * ImplantDesignSection을 기반으로 복제 (의존성 제거, 좌우 2열 레이아웃)
 */
export function OrthodonticsTechnologySection_JP() {
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
                            矯正専門装備
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
                            インビザライン歯列矯正、{'\n'}
                            精密な装備で設計します
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
                            ブランシュ歯科は高価な専門装備である{'\n'}
                            iTero（アイテロ）デジタル口腔スキャナーで{'\n'}
                            より正確で、より快適な診断を提供します。
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
                                    型取りなしで、速く正確に
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
                                    冷たい印象材を使わずスキャナーだけで{'\n'}
                                    高解像度3D画像を取得します。
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
                                    治療前、結果を目で確認
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
                                    3Dシミュレーションで矯正後の変化を{'\n'}
                                    事前に確認できます。
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
                                    データに基づく精巧な設計
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
                                    デジタルスキャンデータで、マウスピース型{'\n'}
                                    矯正装置を精密に製作します。
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
                            本格的なインビザライン歯列矯正、{'\n'}
                            専門装備まで備えた{'\n'}
                            ブランシュ歯科にお任せください。
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
                            本格的なインビザライン歯列矯正、{'\n'}
                            専門装備まで備えたブランシュ歯科にお任せください
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
                                        矯正専門装備
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
                                        インビザライン歯列矯正、{'\n'}
                                        精密な装備で設計します
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
                                        ブランシュ歯科は高価な専門装備である{'\n'}
                                        iTero（アイテロ）デジタル口腔スキャナーで{'\n'}
                                        より正確で、より快適な診断を提供します。
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
                                            型取りなしで、速く正確に
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
                                            冷たい印象材を使わずスキャナーだけで{'\n'}
                                            高解像度3D画像を取得します。
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
                                            治療前、結果を目で確認
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
                                            3Dシミュレーションで矯正後の変化を{'\n'}
                                            事前に確認できます。
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
                                            データに基づく精巧な設計
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
                                            デジタルスキャンデータで、マウスピース型{'\n'}
                                            矯正装置を精密に製作します。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 우측 열: 이미지 (반응형) */}
                            <div className="flex flex-col items-end h-full w-full">
                                <div className="relative w-full h-full flex flex-col justify-end">
                                    <div className="relative w-full flex-1 max-h-[400px] lg:max-h-[560px]">
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
                            本格的なインビザライン歯列矯正、{'\n'}
                            専門装備まで備えたブランシュ歯科にお任せください
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
