'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Compare } from '@/components/ui/compare';
import ReviewCard from './ReviewCard';
import { LogoIcon, SmallLogoIcon } from './icons';

export default function CasesImplantSection() {
    const t = useTranslations('casesImplant');
    const router = useRouter();

    // 임플란트 치료 사례 - 두 번째 행 (3개)
    const implantReviewsRow2 = [
        {
            firstImage: '/assets/plus/implant-1.webp',
            secondImage: '/assets/plus/implant-2.webp',
            title: t('items.3'),
        },
        {
            firstImage: '/assets/plus/implant-3.webp',
            secondImage: '/assets/plus/implant-4.webp',
            title: t('items.4'),
        },
        {
            firstImage: '/assets/plus/implant-5.webp',
            secondImage: '/assets/plus/implant-6.webp',
            title: t('items.5'),
        },
    ];
    return (
        <div className="relative w-full" style={{ background: '#F7F8F8' }}>
            <div className="relative w-full overflow-hidden flex-shrink-0 mx-auto" style={{ maxWidth: '1472px', background: '#F7F8F8' }}>
                <div className="flex flex-col items-start text-left w-full pt-[67px] pb-[30px] pl-[30px] md:pl-[80px]" style={{ background: '#F7F8F8' }}>
                    <p
                        className="relative z-10 whitespace-pre-line"
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '30px',
                            letterSpacing: '-0.18px',
                            paddingBottom: '10px',
                            opacity: 1,
                            transform: 'none',
                        }}
                    >
                        {t('category')}
                    </p>
                    <h2
                        className="relative z-10 whitespace-pre-line"
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontSize: '28px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: 'normal',
                            letterSpacing: '-0.28px',
                            paddingBottom: '50px',
                            opacity: 1,
                            transform: 'none',
                        }}
                    >
                        {t('title')}
                    </h2>
                    <p
                        className="relative z-10 whitespace-pre-line"
                        style={{
                            color: '#000',
                            textAlign: 'left',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.18px',
                            paddingBottom: '50px',
                            opacity: 1,
                            transform: 'none',
                        }}
                    >
                        {t('description')}
                    </p>
                    <p
                        className="relative z-10 whitespace-pre-line"
                        style={{
                            color: 'rgba(0, 0, 0, 0.70)',
                            textAlign: 'center',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.18px',
                            opacity: 1,
                            transform: 'none',
                        }}
                    >
                        {t('instruction')}
                    </p>
                </div>
            </div>
            {/* 임플란트 상세 사례 카드 2개 */}
            <div className="relative w-full" style={{ background: '#F7F8F8' }}>
                <div className="w-full mx-auto px-[30px] md:px-[80px] py-[60px] md:py-[80px]" style={{ maxWidth: '1472px' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-[30px]">
                        {/* 첫 번째 의사 카드 */}
                        <div className="relative flex flex-col" style={{ background: '#F7F8F8' }}>
                            <div className="absolute bottom-0 right-0 z-10 p-4">
                                <SmallLogoIcon />
                            </div>
                            <div className="relative flex items-center justify-center flex-1" style={{ background: '#F7F8F8' }}>
                                <div className="relative overflow-hidden flex items-center justify-center w-full" style={{ aspectRatio: '639/539', background: '#F7F8F8' }}>
                                    <Compare
                                        firstImage="/assets/implant/full/full-3.webp"
                                        secondImage="/assets/implant/full/full-4.webp"
                                        className="w-full h-full"
                                        firstImageClassName="object-cover"
                                        secondImageClassname="object-cover"
                                        slideMode="drag"
                                        showHandlebar={true}
                                        autoplay={false}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 flex flex-col w-full min-h-[300px] lg:min-h-0" style={{ background: '#F3F3F6' }}>
                                <h3
                                    style={{
                                        color: '#262626',
                                        fontSize: '20px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.2px',
                                        marginBottom: '20px',
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {t('cases.daegu.title')}
                                </h3>
                                <p
                                    className="md:hidden"
                                    style={{
                                        color: '#262626',
                                        fontSize: '17px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '1.6',
                                        letterSpacing: '-0.17px',
                                        whiteSpace: 'pre-line',
                                    }}
                                >
                                    {t('cases.daegu.story')}
                                </p>
                                <p
                                    className="hidden md:block whitespace-pre-line"
                                    style={{
                                        color: '#262626',
                                        fontSize: '17px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.17px',
                                    }}
                                >
                                    {t('cases.daegu.story')}
                                </p>
                            </div>
                        </div>
                        {/* 두 번째 의사 카드 */}
                        <div className="relative flex flex-col" style={{ background: '#F7F8F8' }}>
                            <div className="absolute bottom-0 right-0 z-10 p-4">
                                <SmallLogoIcon />
                            </div>
                            <div className="relative flex items-center justify-center flex-1" style={{ background: '#F7F8F8' }}>
                                <div className="relative overflow-hidden flex items-center justify-center w-full" style={{ aspectRatio: '639/539', background: '#F7F8F8' }}>
                                    <Compare
                                        firstImage="/assets/implant/full/full-1.webp"
                                        secondImage="/assets/implant/full/full-2.webp"
                                        className="w-full h-full"
                                        firstImageClassName="object-cover"
                                        secondImageClassname="object-cover"
                                        slideMode="drag"
                                        showHandlebar={true}
                                        autoplay={false}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 flex flex-col w-full min-h-[300px] lg:min-h-0" style={{ background: '#F3F3F6' }}>
                                <h3
                                    style={{
                                        color: '#262626',
                                        fontSize: '20px',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.2px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    {t('cases.usa.title')}
                                </h3>
                                <p
                                    className="md:hidden"
                                    style={{
                                        color: '#262626',
                                        fontSize: '17px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '1.6',
                                        letterSpacing: '-0.17px',
                                    }}
                                >
                                    {t('cases.usa.story')}
                                </p>
                                <p
                                    className="hidden md:block whitespace-pre-line"
                                    style={{
                                        color: '#262626',
                                        fontSize: '17px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.17px',
                                    }}
                                >
                                    {t('cases.usa.story')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 두 번째 행: 임플란트 사례 3개 */}
            <div className="w-full border-t-[1px] border-b-[1px] border-white" style={{ background: '#F7F8F8' }}>
                <div className="h-auto w-full mx-auto flex flex-col md:flex-row border-l-[1px] border-r-[1px] border-white" style={{ maxWidth: '1472px' }}>
                    {implantReviewsRow2.map((review, index) => (
                        <ReviewCard key={index + 3} review={review} index={index + 3} isLast={index === 2} isLastRow={true} />
                    ))}
                </div>
            </div>

            {/* 임플란트 상세 페이지 이동 버튼 및 로고 */}
            <div className="relative w-full overflow-hidden flex-shrink-0" style={{ background: '#F7F8F8' }}>
                <div className="flex flex-col items-center text-center w-full pt-[85px] pb-[42px]" style={{ background: '#F7F8F8' }}>
                    <button
                        onClick={() => router.push('/special/implant')}
                        className="relative z-10 transition-opacity hover:opacity-80"
                        style={{
                            display: 'flex',
                            minWidth: '230px',
                            width: 'fit-content',
                            height: '37px',
                            padding: '15px 20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            borderRadius: '30px',
                            background: '#61D5CA',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <span
                            style={{
                                color: '#000',
                                textAlign: 'center',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                            }}
                        >
                            {t('more')}
                        </span>
                    </button>
                    <div className="relative z-10" style={{ width: '148px', height: '27px', opacity: 1, marginTop: '40px' }}>
                        <LogoIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}
