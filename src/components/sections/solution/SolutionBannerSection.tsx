import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { QuickLinkButton } from '@/components/ui/QuickLinkButton';

export function SolutionBannerSection() {
    const t = useTranslations('solutionBanner');

    return (
        <div className="relative w-full" style={{ backgroundColor: '#EAEEF1', height: '800px' }}>
            <Image
                alt={t('category')}
                src="/assets/asset-135.webp"
                fill
                className="object-cover"
                sizes="100vw"
                style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, color: 'transparent' }}
            />
            <div className="relative w-full mx-auto h-full" style={{ maxWidth: '1474px' }}>
                {/* PC/태블릿 전용 그라데이션 레이어 */}
                <div
                    className="hidden md:block absolute left-0 h-full z-[10]"
                    style={{
                        width: '464px',
                        background: 'linear-gradient(90deg, #7D7360 0%, rgba(217, 217, 217, 0.00) 100%)',
                    }}
                />
                <div className="absolute left-[30px] bottom-[40px] md:left-[81px] md:top-[67px] md:bottom-auto z-[20]">
                    <h2
                        className="whitespace-pre-line text-black/70 md:text-white"
                        style={{
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
                    </h2>
                    <p
                        className="whitespace-pre-line pb-[25px] md:pb-[320px] text-black/70 md:text-white"
                        style={{
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
                    <p
                        className="whitespace-pre-line text-[17px] md:text-[18px] text-black/70 md:text-white"
                        style={{
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.18px',
                            marginBottom: '0px',
                        }}
                    >
                        {t('description')}
                    </p>
                </div>
                {/* 우측 하단 요소 */}
                <div
                    className="absolute right-[30px] bottom-[40px] md:right-[80px] md:bottom-[148px] z-[20]"
                >
                    <QuickLinkButton href="/special/sleep" borderless>
                        {t('more')}
                    </QuickLinkButton>
                </div>
                <div
                    className="md:hidden absolute bottom-0 left-0 w-full z-[5]"
                    style={{
                        height: '350px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        backdropFilter: 'blur(20px)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                />
            </div>
        </div>
    );
}
