'use client';

import { useTranslations } from 'next-intl';
import { Compare } from '@/components/ui/compare';
import { QuoteIcon } from './icons';

// 리뷰 카드 z-index 배열 (겹침 효과를 위한 레이어 순서)
const zIndexes = ['z-25', 'z-15', 'z-10', 'z-25', 'z-15', 'z-10'];

interface ReviewCardProps {
    review: {
        firstImage: string;
        secondImage: string;
        title: string;
    };
    index: number;
    isLast: boolean;
    isLastRow?: boolean;
}

// 치료 전후 비교 카드 컴포넌트 (드래그로 전후 비교 가능)
export default function ReviewCard({ review, index, isLast, isLastRow = false }: ReviewCardProps) {
    const t = useTranslations('casesReviews');
    // Border 전략: 각 카드는 우측 border만 담당 (마지막 카드 제외)
    // 모바일: 하단 border (마지막 행의 마지막 카드 제외)
    // 데스크톱: 우측 border (마지막 카드 제외)
    const showRightBorder = !isLast;
    const showBottomBorderMobile = !(isLast && isLastRow);

    return (
        <div
            className={`relative ${zIndexes[index]} h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col overflow-hidden border-white ${showBottomBorderMobile ? 'border-b-[1px] md:border-b-0' : ''
                } ${showRightBorder ? 'md:border-r-[1px]' : ''}`}
        >
            <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                <div className="overflow-hidden w-full h-full" style={{ position: 'relative', cursor: 'grab' }}>
                    <Compare
                        firstImage={review.firstImage}
                        secondImage={review.secondImage}
                        firstAlt={t('beforeAlt')}
                        secondAlt={t('afterAlt')}
                        className="w-full h-full"
                        firstImageClassName="object-cover md:object-cover"
                        secondImageClassname="object-cover md:object-cover"
                        slideMode="drag"
                        showHandlebar={true}
                        autoplay={false}
                    />
                </div>
            </div>
            <div className="h-auto pt-[291px] md:pt-[43px] md:flex-1 md:flex md:flex-col md:justify-start pb-[13px] pl-[30px] md:pl-[80px] pr-0 flex items-start overflow-hidden">
                <div className={`relative ${zIndexes[index]}`} style={{ opacity: 1, transform: 'none' }}>
                    <h3
                        className="text-left"
                        style={{
                            color: '#000',
                            fontSize: '22px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: 'normal',
                            letterSpacing: '-0.22px',
                            whiteSpace: 'pre-line',
                        }}
                    >
                        {review.title}
                    </h3>
                </div>
            </div>
            <div className="absolute right-[20px] bottom-[34px] z-40" style={{ width: '32px', height: '30.809px' }}>
                <QuoteIcon />
            </div>
        </div>
    );
}
