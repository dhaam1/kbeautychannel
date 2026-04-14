'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import ReviewCard from './ReviewCard';
import { LogoIcon } from './icons';

export default function CasesLaminateSection() {
    const t = useTranslations('casesLaminate');
    const router = useRouter();

    // 라미네이트 치료 사례 - 첫 번째 행 (3개)
    const reviewsRow1 = [
        {
            firstImage: '/assets/plus/laminate-1.webp',
            secondImage: '/assets/plus/laminate-2.webp',
            title: t('items.0'),
        },
        {
            firstImage: '/assets/plus/laminate-3.webp',
            secondImage: '/assets/plus/laminate-4.webp',
            title: t('items.1'),
        },
        {
            firstImage: '/assets/plus/laminate-5.webp',
            secondImage: '/assets/plus/laminate-6.webp',
            title: t('items.2'),
        },
    ];

    // 라미네이트 치료 사례 - 두 번째 행 (3개)
    const reviewsRow2 = [
        {
            firstImage: '/assets/plus/laminate-7.webp',
            secondImage: '/assets/plus/laminate-8.webp',
            title: t('items.3'),
        },
        {
            firstImage: '/assets/plus/laminate-9.webp',
            secondImage: '/assets/plus/laminate-10.webp',
            title: t('items.4'),
        },
        {
            firstImage: '/assets/plus/laminate-11.webp',
            secondImage: '/assets/plus/laminate-12.webp',
            title: t('items.5'),
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
            {/* 리뷰 카드 영역 - 흰색 배경 */}
            <div className="w-full bg-white border-t-[1px] border-b-[1px] border-white">
                {/* 첫 번째 행: 라미네이트 사례 3개 */}
                <div className="h-auto w-full mx-auto flex flex-col md:flex-row border-l-[1px] border-r-[1px] border-white" style={{ maxWidth: '1472px' }}>
                    {reviewsRow1.map((review, index) => (
                        <ReviewCard key={index} review={review} index={index} isLast={index === 2} isLastRow={false} />
                    ))}
                </div>
                {/* 행 구분선 (데스크톱 전용) */}
                <div className="hidden md:block w-full mx-auto h-[1px] bg-white border-l-[1px] border-r-[1px] border-white" style={{ maxWidth: '1472px' }} />
                {/* 두 번째 행: 라미네이트 사례 3개 */}
                <div className="h-auto w-full mx-auto flex flex-col md:flex-row border-l-[1px] border-r-[1px] border-white" style={{ maxWidth: '1472px' }}>
                    {reviewsRow2.map((review, index) => (
                        <ReviewCard key={index + 3} review={review} index={index + 3} isLast={index === 2} isLastRow={true} />
                    ))}
                </div>
            </div>
            {/* 라미네이트 상세 페이지 이동 버튼 및 로고 */}
            <div className="relative w-full overflow-hidden flex-shrink-0 bg-white">
                <div className="flex flex-col items-center text-center w-full pt-[85px] pb-[42px] bg-white">
                    <button
                        onClick={() => router.push('/special/laminate')}
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
