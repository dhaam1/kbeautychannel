'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function CasesPhilosophyDetailsSection() {
    const t = useTranslations('casesPhilosophyDetails');
    return (
        <div style={{ backgroundColor: '#E9EBEF' }}>
            <div className="relative w-full h-[800px] md:h-[587px]">
                {/* 데스크탑 이미지 */}
                <Image
                    src="/assets/asset-2.webp"
                    alt="블랑쉬치과 진료 철학을 상징하는 수술모자 이미지"
                    fill
                    className="hidden md:block object-cover"
                    style={{ objectPosition: 'calc(50% + 100px) center' }}
                    sizes="100vw"
                    priority
                />
                {/* 모바일 이미지 */}
                <Image
                    src="/assets/asset-2-mobile.webp"
                    alt="블랑쉬치과 진료 철학을 상징하는 수술모자 이미지"
                    fill
                    className="md:hidden object-cover"
                    sizes="100vw"
                    priority
                />
                {/* 모바일: 하단 블러 오버레이 */}
                <div
                    className="md:hidden absolute bottom-0 left-0 w-full z-[5]"
                    style={{
                        height: '300px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(20px)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                />

                <div className="relative w-full h-full mx-auto" style={{ maxWidth: '1474px' }}>
                    {/* 데스크탑: 기존 레이아웃 */}
                    <div className="hidden md:block absolute md:left-[81px] md:top-[67px] z-[20]">
                        <p
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '30px',
                                letterSpacing: '-0.18px',
                                marginBottom: '10px',
                                whiteSpace: 'pre-line',
                            }}
                        >
                            {t('category')}
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
                                paddingBottom: '50px',
                                marginBottom: '0px',
                            }}
                        >
                            {t('title')}
                        </h2>
                        <p
                            className="whitespace-pre-line"
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.18px',
                                paddingBottom: '20px',
                                marginBottom: '0px',
                            }}
                        >
                            {t('description1')}
                        </p>
                        <p
                            className="whitespace-pre-line"
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.18px',
                                paddingBottom: '20px',
                                marginBottom: '0px',
                            }}
                        >
                            {t('description2')}
                        </p>
                        <p
                            className="whitespace-pre-line"
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.18px',
                                marginBottom: '0px',
                            }}
                        >
                            {t('description3')}
                        </p>
                    </div>

                    {/* 모바일: 상단 그룹 (철학, 블랑쉬치과 철학) */}
                    <div className="md:hidden absolute left-[30px] top-[16px] z-[20]">
                        <p
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '30px',
                                letterSpacing: '-0.18px',
                                whiteSpace: 'pre-line',
                            }}
                        >
                            {t('category')}
                        </p>
                        <p
                            className="whitespace-pre-line"
                            style={{
                                color: '#000',
                                fontSize: '28px',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                letterSpacing: '-0.28px',
                                marginBottom: '0px',
                            }}
                        >
                            {t('title')}
                        </p>
                    </div>

                    {/* 모바일: 하단 그룹 (본문 내용) */}
                    <div className="md:hidden absolute left-[30px] bottom-[90px] z-[20]">
                        <p
                            className="whitespace-pre-line"
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.18px',
                                paddingBottom: '20px',
                                marginBottom: '0px',
                            }}
                        >
                            {t('description1')}
                        </p>
                        <p
                            className="whitespace-pre-line"
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.18px',
                                paddingBottom: '20px',
                                marginBottom: '0px',
                            }}
                        >
                            {t('description2')}
                        </p>
                        <p
                            className="whitespace-pre-line"
                            style={{
                                color: '#000',
                                fontSize: '18px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.18px',
                                marginBottom: '0px',
                            }}
                        >
                            {t('description3')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
