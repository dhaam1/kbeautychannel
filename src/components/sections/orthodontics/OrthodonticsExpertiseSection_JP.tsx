'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// throttle 함수 복제 (의존성 제거)
function throttle<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    let previous = 0;

    return function (this: any, ...args: Parameters<T>) {
        const now = Date.now();
        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

interface EquipmentCardData {
    id: number;
    image: string;
    nameKo: string;
    nameEn: string;
    tag: string;
    headline: string;
    description: string;
    objectFit?: 'cover' | 'contain';
    bgColor?: string;
    alt: string;
}

// 장비 데이터 배열 - 어린이 치아교정 장치
// 주의: 이미지(파일명)는 유지하고, 텍스트만 이미지 내용에 맞게 매칭합니다.
// 또한 "왼쪽(첫 카드) → 오른쪽" 순서대로 배열을 정렬합니다.
const equipmentData: EquipmentCardData[] = [
    {
        id: 1,
        image: '/assets/asset-117.webp',
        nameKo: 'インビザライン・ファースト',
        nameEn: '',
        tag: '混合歯列期',
        headline: '乳歯と永久歯が混ざった時期のお子様専用',
        description:
            '混合歯列期（乳歯と永久歯が混ざった時期）のお子様専用マウスピース型矯正。',
        alt: ""
    },
    {
        id: 2,
        image: '/assets/asset-118.webp',
        nameKo: 'フェイシャル・マスク',
        nameEn: '',
        tag: '上顎の成長不足',
        headline: '上顎の前方成長を誘導',
        description:
            '上顎の成長が不足している場合に、上顎の前方成長を誘導する装置。',
        alt: ""
    },
    {
        id: 3,
        image: '/assets/asset-119.webp',
        nameKo: '拡大装置',
        nameEn: '',
        tag: '顎が狭い場合',
        headline: '顎を広げ、永久歯のスペースを確保',
        description:
            '狭い顎を広げ、永久歯が生えるための十分なスペースを確保する装置。',
        alt: ""
    },
    {
        id: 4,
        image: '/assets/asset-120.webp',
        nameKo: 'マイオブレース',
        nameEn: '',
        tag: '悪い口腔習慣',
        headline: '口腔習慣を改善し、自然な成長をサポート',
        description:
            '悪い口腔習慣（口呼吸、舌の癖など）を改善し、自然な顎の成長をサポートします。',
        alt: ""
    },
    {
        id: 5,
        image: '/assets/asset-121.webp',
        nameKo: 'ツイン・ブロック',
        nameEn: '',
        tag: '下顎の後退',
        headline: '下顎の前方成長を促進',
        description:
            '下顎が後退している（いわゆる「出っ歯」など）場合に、下顎の前方成長を促す装置。',
        alt: ""
    },
];

/**
 * 장비 카드 컴포넌트
 */
function EquipmentCard({ image, nameKo, nameEn, tag, headline, description, objectFit = 'contain', bgColor = '#F7F7F7', alt }: EquipmentCardData) {
    return (
        <div className="flex-shrink-0 w-[302px] flex flex-col">
            {/* 이미지 영역 - 꽉 차게 */}
            <div className="relative w-[302px] h-[200px] overflow-hidden" style={{ background: bgColor }}>
                <Image
                    src={image}
                    alt={alt}
                    fill
                    className={objectFit === 'cover' ? 'object-cover' : 'object-contain'}
                    sizes="302px"
                    style={{ transform: 'scale(1.2)' }}
                />
            </div>
            {/* 텍스트 영역 */}
            <div
                className="p-5 flex flex-col"
                style={{
                    width: '302px',
                    height: '319px',
                    background: '#F3F3F6',
                }}
            >
                {/* 제목 */}
                <h3
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
                    {nameKo}
                </h3>
                {/* 부제목 */}
                {nameEn?.trim() ? (
                    <p
                        style={{
                            color: '#262626',
                            fontSize: '20px',
                            fontStyle: 'normal',
                            fontWeight: 300,
                            lineHeight: 'normal',
                            letterSpacing: '-0.2px',
                            marginBottom: '20px',
                        }}
                    >
                        {nameEn}
                    </p>
                ) : null}
                {/* 태그 버튼 */}
                <span
                    className="inline-flex mb-[20px]"
                    style={{
                        display: 'inline-flex',
                        padding: '6px 10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        borderRadius: '50px',
                        background: '#FFF',
                        color: '#000',
                        textAlign: 'right',
                        fontSize: '12px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.12px',
                        width: 'fit-content',
                    }}
                >
                    {tag}
                </span>
                {/* 설명 */}
                <p
                    className="whitespace-pre-line"
                    style={{
                        color: '#262626',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '24px',
                        letterSpacing: '-0.16px',
                    }}
                >
                    {description}
                </p>
            </div>
        </div>
    );
}

/**
 * 교정 장비 섹션 컴포넌트 (일본어)
 * ImplantEquipmentSection을 기반으로 복제 (의존성 제거)
 * 
 * @description
 * 교정 진료에 사용되는 장비를 소개하는 섹션입니다.
 * 
 * @returns {JSX.Element} 장비 섹션 컴포넌트
 */
export function OrthodonticsExpertiseSection_JP() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            // 초기 체크
            checkScrollPosition();

            // 스크롤 이벤트에 throttle 및 passive 옵션 적용
            const throttledCheckScrollPosition = throttle(checkScrollPosition, 150);
            container.addEventListener('scroll', throttledCheckScrollPosition, { passive: true });

            // ResizeObserver로 컨테이너 크기 변경만 감지
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


    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 322; // 카드 너비(302px) + gap(20px)
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
            // smooth 스크롤 완료 후 버튼 상태 업데이트
            setTimeout(() => {
                checkScrollPosition();
            }, 350);
        }
    };

    const getButtonColor = (isActive: boolean) => ({
        fill: isActive ? '#C3C3CB' : 'rgba(215, 209, 204, 0.30)',
        stroke: isActive ? '#5A5A5A' : '#B3B3B3',
    });

    return (
        <section className="relative w-full bg-[#FEFEFE]">
            {/* 1. 상단 텍스트 영역 */}
            <div
                className="relative w-full mx-auto px-[30px] md:px-[80px] pt-[60px] md:pt-[80px]"
                style={{ maxWidth: '1472px' }}
            >
                <h2
                    style={{
                        color: '#000',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.18px',
                    }}
                >
                    小児矯正装置
                </h2>
                <p
                    className="mt-[10px] whitespace-pre-line"
                    style={{
                        color: '#000',
                        fontSize: '28px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.28px',
                    }}
                >
                    お子様の矯正、{'\n'}
                    ブランシュ歯科は多角的にアプローチします
                </p>
                <p
                    className="mt-[30px] whitespace-pre-line"
                    style={{
                        color: '#000',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.18px',
                    }}
                >
                    小児矯正は時期と方法が非常に重要です。{'\n'}
                    最新の専用装置を使用し、お子様の成長に合わせた最適な治療を提供します。
                </p>
            </div>

            {/* 2. 가로 스크롤 영역 */}
            <div
                ref={scrollContainerRef}
                className="w-full overflow-x-auto hide-scrollbar"
            >
                <div
                    className="flex gap-5 py-[40px] pl-[30px] pr-[30px] md:pl-[80px] lg:[padding-left:calc((100vw-1472px)/2+80px)]"
                >
                    {equipmentData.map((card) => (
                        <EquipmentCard key={card.id} {...card} />
                    ))}
                </div>
            </div>

            {/* 3. 네비게이션 버튼 - 모바일 (첫 번째 카드 오른쪽 끝에 맞춤) */}
            <div
                className="md:hidden flex justify-center gap-4 pb-[60px]"

            >
                <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                    style={{ width: '36px', height: '36px' }}
                    aria-label="이전 카드"
                >
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollLeft).fill} />
                        <g transform="translate(6, 6)">
                            <path
                                d="M15 6L9 12L15 18"
                                stroke={getButtonColor(canScrollLeft).stroke}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                    style={{ width: '36px', height: '36px' }}
                    aria-label="다음 카드"
                >
                    <svg
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollRight).fill} />
                        <g transform="translate(6, 6)">
                            <path
                                d="M9 18L15 12L9 6"
                                stroke={getButtonColor(canScrollRight).stroke}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
            </div>

            {/* 3. 네비게이션 버튼 - 태블릿/PC (4번째 카드에 맞춤) */}
            <div className="hidden md:flex w-full pb-[80px]">
                <div className="w-full mx-auto flex justify-center gap-4" style={{ maxWidth: '1472px' }}>
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                        style={{ width: '36px', height: '36px' }}
                        aria-label="이전 카드"
                    >
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollLeft).fill} />
                            <g transform="translate(6, 6)">
                                <path
                                    d="M15 6L9 12L15 18"
                                    stroke={getButtonColor(canScrollLeft).stroke}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className="flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                        style={{ width: '36px', height: '36px' }}
                        aria-label="다음 카드"
                    >
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="18" cy="18" r="18" fill={getButtonColor(canScrollRight).fill} />
                            <g transform="translate(6, 6)">
                                <path
                                    d="M9 18L15 12L9 6"
                                    stroke={getButtonColor(canScrollRight).stroke}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
