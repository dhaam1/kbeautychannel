'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import ReviewCard from './ReviewCard';
import { LogoIcon } from './icons';

export default function CasesOrthodonticsSection() {
    const t = useTranslations('casesOrthodontics');
    const router = useRouter();

    // 치아교정 치료 사례 (3개)
    const orthodonticsReviews = [
        {
            firstImage: '/assets/plus/gyojung01.webp',
            secondImage: '/assets/plus/gyojung02.webp',
            title: t('items.0'),
        },
        {
            firstImage: '/assets/plus/gyojung03.webp',
            secondImage: '/assets/plus/gyojung04.webp',
            title: t('items.1'),
        },
        {
            firstImage: '/assets/plus/gyojung05.webp',
            secondImage: '/assets/plus/gyojung06.webp',
            title: t('items.2'),
        },
    ];
    return (
        <div className="relative w-full bg-white">
            <div className="relative w-full overflow-hidden flex-shrink-0 bg-white mx-auto" style={{ maxWidth: '1472px' }}>
                <div className="flex flex-col items-start text-left w-full pt-[67px] pb-[30px] bg-white pl-[30px] md:pl-[80px]">
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
            {/* 첫 번째 행: 치아교정 사례 3개 */}
            <div className="w-full bg-white border-t-[1px] border-b-[1px] border-white">
                <div className="h-auto w-full mx-auto flex flex-col md:flex-row border-l-[1px] border-r-[1px] border-white" style={{ maxWidth: '1472px' }}>
                    {orthodonticsReviews.map((review, index) => (
                        <ReviewCard key={index} review={review} index={index} isLast={index === 2} isLastRow={true} />
                    ))}
                </div>
            </div>
            {/* 치아교정 상세 페이지 이동 버튼 및 로고 */}
            <div className="relative w-full overflow-hidden flex-shrink-0 bg-white">
                <div className="flex flex-col items-center text-center w-full pt-[85px] pb-[42px] bg-white">
                    <button
                        onClick={() => router.push('/special/orthodontics')}
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
