'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { throttle } from '@/lib/utils';
import { ASSETS } from '@/constants/assets';

interface ReviewItem {
    image: string;
    name: string;
    info: string;
    content: string;
}

// 후기 카드 컴포넌트
function ReviewCard({ review }: { review: ReviewItem }) {
    const t = useTranslations('casesReviews');
    return (
        <div className="flex-shrink-0 flex flex-col" style={{ width: '312px', height: '682px', background: '#E5F0EE' }}>
            <div className="relative" style={{ width: '312px', height: '366px' }}>
                <Image
                    alt={review.name || t('altText')}
                    src={review.image}
                    fill
                    className="object-cover"
                    sizes="312px"
                />
            </div>
            <div className="p-5 flex flex-col" style={{ background: '#E5F0EE' }}>
                <p
                    style={{
                        color: '#262626',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.2px',
                        marginBottom: '4px',
                    }}
                >
                    {review.name}
                </p>
                <h3
                    style={{
                        color: '#262626',
                        fontSize: '20px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.2px',
                        marginBottom: '12px',
                    }}
                >
                    {review.info}
                </h3>
                <p
                    style={{
                        color: 'rgba(38, 38, 38, 0.80)',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '22px',
                        letterSpacing: '-0.14px',
                        whiteSpace: 'pre-line',
                    }}
                >
                    {review.content}
                </p>
            </div>
        </div>
    );
}

export default function CasesReviewsSection() {
    const t = useTranslations('casesReviews');
    const commonT = useTranslations('common.ariaLabels');

    // 후기 데이터
    const reviewsData = [
        {
            image: ASSETS.REVIEW.CARD_01,
            name: t('items.0.name'),
            info: t('items.0.info'),
            content: t('items.0.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_02,
            name: t('items.1.name'),
            info: t('items.1.info'),
            content: t('items.1.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_03,
            name: t('items.2.name'),
            info: t('items.2.info'),
            content: t('items.2.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_04,
            name: t('items.3.name'),
            info: t('items.3.info'),
            content: t('items.3.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_05,
            name: t('items.4.name'),
            info: t('items.4.info'),
            content: t('items.4.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_06,
            name: t('items.5.name'),
            info: t('items.5.info'),
            content: t('items.5.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_07,
            name: t('items.6.name'),
            info: t('items.6.info'),
            content: t('items.6.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_08,
            name: t('items.7.name'),
            info: t('items.7.info'),
            content: t('items.7.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_09,
            name: t('items.8.name'),
            info: t('items.8.info'),
            content: t('items.8.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_10,
            name: t('items.9.name'),
            info: t('items.9.info'),
            content: t('items.9.content'),
        },
        {
            image: ASSETS.REVIEW.CARD_11,
            name: t('items.10.name'),
            info: t('items.10.info'),
            content: t('items.10.content'),
        },
    ];

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // 스크롤 가능 여부 확인 (왼쪽/오른쪽 버튼 활성화 상태 결정)
    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const threshold = 1; // 부동소수점 오차를 위한 임계값
            setCanScrollLeft(scrollLeft > threshold);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - threshold);
        }
    };

    // 스크롤 이벤트 감지 및 리사이즈 감지
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            checkScrollPosition();
            const throttledCheckScrollPosition = throttle(checkScrollPosition, 150);
            container.addEventListener('scroll', throttledCheckScrollPosition, { passive: true });

            const observer = new ResizeObserver(() => {
                checkScrollPosition();
            });

            observer.observe(container);

            return () => {
                container.removeEventListener('scroll', throttledCheckScrollPosition);
                observer.disconnect();
            };
        }
    }, []);

    // 장비 카드 좌우 스크롤 함수 (버튼 클릭 시 호출)
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 322;
            const container = scrollContainerRef.current;

            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });

            // 스크롤 애니메이션이 끝난 후 상태 업데이트
            const checkAfterScroll = () => {
                requestAnimationFrame(() => {
                    checkScrollPosition();
                    setTimeout(() => {
                        checkScrollPosition();
                    }, 100);
                });
            };

            checkAfterScroll();
            setTimeout(checkAfterScroll, 200);
            setTimeout(checkAfterScroll, 400);
        }
    };

    return (
        <section className="relative w-full" style={{ background: '#F7F8F8' }}>
            <div className="relative w-full mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[80px]" style={{ maxWidth: '1472px' }}>
                <p
                    style={{
                        color: '#000',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.18px',
                    }}
                >
                    {t('category')}
                </p>
                <h2
                    className="mt-[10px]"
                    style={{
                        color: '#000',
                        fontSize: '28px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.28px',
                        whiteSpace: 'pre-line',
                    }}
                >
                    {/* PC/태블릿: 블랑쉬는 다릅니다 / 10년 뒤에도 건강한 치아를 목표로 합니다 */}
                    {t('title')}
                </h2>
            </div>
            <div className="w-full overflow-x-auto hide-scrollbar" ref={scrollContainerRef}>
                <div className="flex gap-5 py-[40px] px-[30px] md:px-[80px]" style={{ minWidth: 'max-content' }}>
                    {reviewsData.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </div>
            </div>
            {/* 스크롤 버튼 - 모바일/PC 모두 중앙정렬 */}
            <div className="flex w-full pb-[60px] md:pb-[80px]">
                <div className="w-full mx-auto flex justify-center gap-4" style={{ maxWidth: '1472px' }}>
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                        style={{ width: '36px', height: '36px' }}
                        aria-label={commonT('prevCard')}
                    >
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="18" fill={canScrollLeft ? '#C3C3CB' : 'rgba(215, 209, 204, 0.30)'} />
                            <g transform="translate(6, 6)">
                                <path d="M15 6L9 12L15 18" stroke={canScrollLeft ? '#5A5A5A' : '#B3B3B3'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                        style={{ width: '36px', height: '36px' }}
                        aria-label={commonT('nextCard')}
                    >
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="18" cy="18" r="18" fill={canScrollRight ? '#C3C3CB' : 'rgba(215, 209, 204, 0.30)'} />
                            <g transform="translate(6, 6)">
                                <path d="M9 18L15 12L9 6" stroke={canScrollRight ? '#5A5A5A' : '#B3B3B3'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
