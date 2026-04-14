import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';

export function SolutionIntroductionSection() {
    const t = useTranslations('solutionIntroduction');
    const locale = useLocale();

    return (
        <section className="w-full" style={{ backgroundColor: '#F7F8F8' }}>
            <div className="mx-auto w-full px-[30px] md:px-[80px] lg:px-[80px] max-w-[1472px]">
                <div className="pt-[60px] md:pt-[80px] pb-0">
                    <div className="flex flex-col lg:flex-row gap-[40px] md:gap-[60px]">
                        <div className="flex-1 flex flex-col self-start">
                            <div style={{ opacity: 1, transform: 'none' }}>
                                <h2 style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', marginBottom: '12px' }}>
                                    {t('category')}
                                </h2>
                            </div>
                            <p className="whitespace-pre-line mb-[24px]" style={{ color: 'rgb(0, 0, 0)', fontSize: locale === 'jp' ? '20px' : '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}>
                                {t('title')}
                            </p>
                            <p className="whitespace-pre-line" style={{ color: 'rgb(0, 0, 0)', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}>
                                {t('description')}
                            </p>
                        </div>
                        <div className="flex-1 relative w-full aspect-[4/3] self-end flex items-end" style={{ opacity: 1, transform: 'none' }}>
                            <Image
                                alt={t('category')}
                                loading="lazy"
                                fill
                                className="object-contain object-bottom"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                src="/assets/asset-13.webp"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
