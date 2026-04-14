'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function CasesPhilosophySection() {
    const t = useTranslations('casesPhilosophy');
    return (
        <div className="relative w-full" style={{ backgroundColor: '#EAEEF1', height: '800px' }}>
            <Image
                alt="Highlight"
                src="/assets/asset-3.webp"
                fill
                className="object-cover"
                sizes="100vw"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
            />
            <div className="relative w-full mx-auto h-full" style={{ maxWidth: '1474px' }}>
                <div className="absolute left-[30px] bottom-[40px] md:left-[81px] md:top-[67px] md:bottom-auto z-[20]">
                    <p
                        className="whitespace-pre-line"
                        style={{
                            color: '#000',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '30px',
                            letterSpacing: '-0.18px',
                            paddingBottom: '10px',
                            marginBottom: '0px',
                        }}
                    >
                        {t('category')}
                    </p>
                    <h2
                        style={{
                            color: '#000',
                            fontSize: '28px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: 'normal',
                            letterSpacing: '-0.28px',
                            paddingBottom: '50px',
                            marginBottom: '0px',
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {t('title')}
                    </h2>
                    <p
                        style={{
                            color: '#000',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.18px',
                            marginBottom: '0px',
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {t('description')}
                    </p>
                </div>
                {/* 모바일: 하단 블러 오버레이 */}
                <div
                    className="md:hidden absolute bottom-0 left-0 w-full z-[5]"
                    style={{
                        height: '320px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(20px)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                />
            </div>
        </div>
    );
}
