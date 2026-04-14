'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Compare } from '@/components/ui/compare';
import { cn } from '@/lib/utils';

/**
 * 탭 메뉴 아이템 인터페이스
 */
/** 탭별 대표 이미지 경로 */
const TAB_IMAGES: Record<string, string> = {
    digital: '/assets/implant/tabs/tab-digital.webp',
    all: '/assets/implant/tabs/tab-all.webp',
    incisionless: '/assets/implant/tabs/tab-incisionless.webp',
    navi: '/assets/implant/tabs/tab-navi.webp',
};

interface TabItem {
    id: string;
    label: string;
    href: string; // Added href
    title: string;
    description: string;
    features: {
        title: string;
        items: string[];
    }[];
    duration: string[];
    tech: string[];
    cases?: {
        before: string;
        beforeAlt: string;
        after: string;
        afterAlt: string;
        title: string;
        description: string;
        label: string;
        guide: string;
    }[];
}

interface ImplantTabSectionProps {
    activeTab?: string;
}

/**
 * 임플란트 탭 섹션 컴포넌트
 * 
 * @description
 * 임플란트 종류를 탭으로 구분하여 상세 내용을 보여주는 섹션입니다.
 * 
 * 레이아웃 구조:
 * - 상단: 섹션 타이틀
 * - 중단: 탭 메뉴 네비게이션 (Sticky 가능)
 * - 하단: 선택된 탭의 상세 콘텐츠 (페이드/슬라이드 전환)
 */
export function ImplantTabSection({ activeTab = 'fullarch' }: ImplantTabSectionProps) {
    const t = useTranslations('implant.tabs');
    const params = useParams();
    const locale = params?.locale as string;
    const isJp = locale === 'jp';
    const isEn = locale === 'en';

    const tabs: TabItem[] = [
        {
            id: 'digital',
            label: t('items.digital.label'),
            href: '/special/implant/fullarch', // URL path
            title: t('items.digital.title'),
            description: t('items.digital.description'),
            features: t.raw('items.digital.features'),
            duration: t.raw('items.digital.duration'),
            tech: t.raw('items.digital.tech'),
            cases: [
                {
                    before: isJp ? '/assets/jp/digital01a.webp' : '/assets/implant/digital/digital-1.webp',
                    beforeAlt: "디지털 풀아치 임플란트 시술 전 구강 상태, 잇몸 염증과 치아 상실이 동반된 블랑쉬치과 치료 전 사례",
                    after: isJp ? '/assets/jp/digital01b.webp' : '/assets/implant/digital/digital-4.webp',
                    afterAlt: "디지털 풀아치 임플란트 시술 후 모습, 저작 기능과 심미를 회복한 블랑쉬치과 치료 결과 사례",
                    title: t('items.digital.cases.items.0.title'),
                    description: t('items.digital.cases.items.0.description'),
                    label: t('items.digital.cases.label'),
                    guide: t('items.digital.cases.guide')
                },
                {
                    before: isJp ? '/assets/jp/digital02a.webp' : '/assets/implant/digital/digital-3.webp',
                    beforeAlt: "디지털 풀아치 임플란트 시술 전 하악 치아 상태, 잔존 치아와 잇몸 문제를 확인하는 블랑쉬치과 사례",
                    after: isJp ? '/assets/jp/digital02b.webp' : '/assets/implant/digital/digital-2.webp',
                    afterAlt: "디지털 풀아치 임플란트 시술 후 하악 전악 복원 모습, 안정적인 교합을 완성한 블랑쉬치과 사례",
                    title: t('items.digital.cases.items.1.title'),
                    description: t('items.digital.cases.items.1.description'),
                    label: t('items.digital.cases.label'),
                    guide: t('items.digital.cases.guide')
                },
                {
                    before: isJp ? '/assets/jp/digital03a.webp' : '/assets/implant/digital/digital-5.webp',
                    beforeAlt: "70대 남성 풀아치 임플란트 하악 시술 전 구강 상태",
                    after: isJp ? '/assets/jp/digital03b.webp' : '/assets/implant/digital/digital-6.webp',
                    afterAlt: "70대 남성 풀아치 임플란트 하악 시술 후 결과",
                    title: t('items.digital.cases.items.2.title'),
                    description: t('items.digital.cases.items.2.description'),
                    label: t('items.digital.cases.label'),
                    guide: t('items.digital.cases.guide')
                },
                {
                    before: isJp ? '/assets/jp/digital04a.webp' : '/assets/implant/digital/digital-7.webp',
                    beforeAlt: "70대 여성 풀아치 임플란트 전악 시술 전 구강 상태",
                    after: isJp ? '/assets/jp/digital04b.webp' : '/assets/implant/digital/digital-8.webp',
                    afterAlt: "70대 여성 풀아치 임플란트 전악 시술 후 결과",
                    title: t('items.digital.cases.items.3.title'),
                    description: t('items.digital.cases.items.3.description'),
                    label: t('items.digital.cases.label'),
                    guide: t('items.digital.cases.guide')
                }
            ]
        },
        {
            id: 'all',
            label: t('items.all.label'),
            href: '/special/implant/all',
            title: t('items.all.title'),
            description: t('items.all.description'),
            features: t.raw('items.all.features'),
            duration: t.raw('items.all.duration'),
            tech: t.raw('items.all.tech'),
            cases: [
                {
                    before: isJp ? '/assets/jp/all02a.webp' : '/assets/implant/full/full-3.webp',
                    beforeAlt: "전체임플란트 시술 전 고령 환자 얼굴 모습, 다수 치아 소실로 표정과 발음이 불편했던 치료 전 사례",
                    after: isJp ? '/assets/jp/all02b.webp' : '/assets/implant/full/full-4.webp',
                    afterAlt: "전체임플란트 시술 후 얼굴 정면 모습, 자연스러운 미소와 저작 기능을 회복한 블랑쉬치과 치료 결과",
                    title: t('items.all.cases.items.1.title'),
                    description: t('items.all.cases.items.1.description'),
                    label: t('items.all.cases.label'),
                    guide: t('items.all.cases.guide')
                },
                {
                    before: isJp ? '/assets/jp/all01a.webp' : '/assets/implant/full/full-1.webp',
                    beforeAlt: "전체임플란트 시술 전 얼굴 정면 모습, 치아 상실로 미소와 입술 지지가 부족한 블랑쉬치과 치료 전 사례",
                    after: isJp ? '/assets/jp/all01b.webp' : '/assets/implant/full/full-2.webp',
                    afterAlt: "전체임플란트 시술 후 얼굴 정면 모습, 자연스러운 미소와 저작 기능을 회복한 블랑쉬치과 치료 결과",
                    title: t('items.all.cases.items.0.title'),
                    description: t('items.all.cases.items.0.description'),
                    label: t('items.all.cases.label'),
                    guide: t('items.all.cases.guide')
                },
                {
                    before: isJp ? '/assets/jp/all03a.webp' : '/assets/implant/full/full-5.webp',
                    beforeAlt: "50대 남성 전체임플란트 상악 시술 전 구강 상태",
                    after: isJp ? '/assets/jp/all03b.webp' : '/assets/implant/full/full-6.webp',
                    afterAlt: "50대 남성 전체임플란트 상악 시술 후 결과",
                    title: t('items.all.cases.items.2.title'),
                    description: t('items.all.cases.items.2.description'),
                    label: t('items.all.cases.label'),
                    guide: t('items.all.cases.guide')
                }
            ]
        },
        {
            id: 'incisionless',
            label: t('items.incisionless.label'),
            href: '/special/implant/incisionless',
            title: t('items.incisionless.title'),
            description: t('items.incisionless.description'),
            features: t.raw('items.incisionless.features'),
            duration: t.raw('items.incisionless.duration'),
            tech: t.raw('items.incisionless.tech'),
            cases: [
                {
                    before: isJp ? '/assets/jp/nocut01a.webp' : '/assets/implant/no-cut/no-cut-1.webp',
                    beforeAlt: "무절개 임플란트 시술 전 파노라마 엑스레이, 치아 결손과 잇몸뼈 상태를 정밀 진단한 치료 전 영상",
                    after: isJp ? '/assets/jp/nocut01b.webp' : '/assets/implant/no-cut/no-cut-2.webp',
                    afterAlt: "무절개 임플란트 시술 후 파노라마 엑스레이, 최소 침습으로 임플란트 식립이 완료된 치료 결과",
                    title: t('items.incisionless.cases.items.0.title'),
                    description: t('items.incisionless.cases.items.0.description'),
                    label: t('items.incisionless.cases.label'),
                    guide: t('items.incisionless.cases.guide')
                },
                {
                    before: isJp ? '/assets/jp/nocut02a.webp' : '/assets/implant/no-cut/no-cut-3.webp',
                    beforeAlt: "무절개 임플란트 시술 전 파노라마 엑스레이, 치아 상실 부위와 잔존 치근 상태를 확인한 전 상태",
                    after: isJp ? '/assets/jp/nocut02b.webp' : '/assets/implant/no-cut/no-cut-4.webp',
                    afterAlt: "무절개 임플란트 시술 후 파노라마 엑스레이, 절개 없이 임플란트가 안정적으로 자리한 모습",
                    title: t('items.incisionless.cases.items.1.title'),
                    description: t('items.incisionless.cases.items.1.description'),
                    label: t('items.incisionless.cases.label'),
                    guide: t('items.incisionless.cases.guide')
                }
            ]
        },
        {
            id: 'navi',
            label: t('items.navi.label'),
            href: '/special/implant/navi',
            title: t('items.navi.title'),
            description: t('items.navi.description'),
            features: t.raw('items.navi.features'),
            duration: t.raw('items.navi.duration'),
            tech: t.raw('items.navi.tech'),
            cases: [
                {
                    before: isJp ? '/assets/jp/navi01a.webp' : '/assets/implant/navigation/navigation-1.webp',
                    beforeAlt: "네비게이션 임플란트 시술 전 파노라마 엑스레이, 치아 결손 부위와 잇몸뼈 상태를 분석한 영상",
                    after: isJp ? '/assets/jp/navi01b.webp' : '/assets/implant/navigation/navigation-2.webp',
                    afterAlt: "네비게이션 임플란트 시술 후 파노라마 엑스레이, 계획에 따라 임플란트가 정확히 식립된 상태",
                    title: t('items.navi.cases.items.0.title'),
                    description: t('items.navi.cases.items.0.description'),
                    label: t('items.navi.cases.label'),
                    guide: t('items.navi.cases.guide')
                },
                {
                    before: isJp ? '/assets/jp/navi02a.webp' : '/assets/implant/navigation/navigation-3.webp',
                    beforeAlt: "네비게이션 임플란트 시술 전 파노라마 엑스레이, 기존 보철물과 치조골 상태를 확인한 모습",
                    after: isJp ? '/assets/jp/navi02b.webp' : '/assets/implant/navigation/navigation-4.webp',
                    afterAlt: "네비게이션 임플란트 시술 후 파노라마 엑스레이, 오차를 최소화해 임플란트가 자리한 결과",
                    title: t('items.navi.cases.items.1.title'),
                    description: t('items.navi.cases.items.1.description'),
                    label: t('items.navi.cases.label'),
                    guide: t('items.navi.cases.guide')
                }
            ]
        }
    ];

    // Map activeTab prop to correct tab data. 
    // We handle potential mismatch by defaulting to 'digital'
    const currentTab = tabs.find(t => {
        // Logic to match activeTab prop (e.g., 'digital', 'full') with tab.id or href end
        // For simplicity, we expect activeTab to match the ID-like part of the URL
        if (activeTab === 'no-cut') return t.id === 'incisionless'; // Mapping for specific case
        return t.id === activeTab;
    }) || tabs[0];

    return (
        <section className="w-full bg-white py-[60px] md:py-20 overflow-hidden" id="implant-types">
            {/* 섹션 헤더 */}
            <div className="max-w-[1472px] mx-auto mb-12 px-4 md:px-20">
                <h2
                    className="mb-2 font-['Pretendard']"
                    style={{
                        color: '#000',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.24px'
                    }}
                >
                    {t('label')}
                </h2>
                <div
                    className="font-['Pretendard'] text-[24px] md:text-[28px]"
                    style={{
                        color: '#000',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.28px'
                    }}
                >
                    {t('subtitle').split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* 통합된 탭 및 콘텐츠 영역 (SEO 구조: 탭 목록 사이에 콘텐츠가 DOM 상 위치하여 H3 > H4 계층 형성) */}
            <div className="max-w-[1472px] mx-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 w-full gap-0 px-4 md:px-20 relative">
                {tabs.map((tab, index) => {
                    // Calculate isActive based on the currentTab derived from props
                    const isActive = currentTab.id === tab.id;
                    const isFirst = index === 0;
                    const isLast = index === tabs.length - 1;

                    return (
                        <React.Fragment key={tab.id}>
                            {/* 탭 버튼 (H3) */}
                            <Link
                                href={tab.href as any}
                                scroll={false}
                                className={cn(
                                    "font-['Pretendard']",
                                    "border-l border-r border-black h-[40px]",
                                    // Mobile: first gets top, all get bottom
                                    isFirst && "border-t",
                                    "border-b",
                                    // Desktop: all get top + bottom, collapse horizontal borders
                                    "md:border-t md:border-b",
                                    index % 2 !== 0 && "md:border-l-0",
                                    !isFirst && "lg:border-l-0",
                                )}
                                style={{
                                    order: index, // 시각적 순서 유지: 0, 1, 2, 3
                                    display: 'flex',
                                    width: '100%',
                                    height: '40px',
                                    padding: '9px 14px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: isActive ? '#000' : 'transparent',
                                    color: isActive ? '#FFF' : '#000',
                                    textAlign: 'center',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.18px'
                                }}
                            >
                                <h3>
                                    {tab.label}
                                </h3>
                            </Link>

                            {/* 활성화된 탭의 상세 콘텐츠 (DOM상으로는 해당 탭 바로 뒤에 위치 -> H4가 H3의 하위 흐름으로 연결됨) */}
                            {isActive && (
                                <div
                                    className="col-span-1 md:col-span-2 lg:col-span-4 w-full order-[9999]"
                                >
                                    {/* 탭과 콘텐츠 사이의 구분선 (뷰포트 전체 너비) */}
                                    <div className="h-[1px] bg-white hidden md:block w-screen" style={{ marginLeft: 'calc(-50vw + 50%)' }}></div>
                                    <div className="h-[1px] bg-white md:hidden w-auto -mx-4"></div>

                                    {/* 탭별 대표 이미지 */}
                                    <div className="w-full my-8 md:mb-16 md:mt-0">
                                        <Image
                                            src={TAB_IMAGES[currentTab.id]}
                                            alt={currentTab.title}
                                            width={806}
                                            height={599}
                                            className="w-full h-auto max-w-[806px] mx-auto"
                                            sizes="(max-width: 806px) 100vw, 806px"
                                        />
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col gap-12"
                                        >
                                            {/* 상단: 설명 및 그리드 */}
                                            <div className="flex flex-col gap-8 lg:gap-12">

                                                {/* 왼쪽: 타이틀 및 설명 */}
                                                <div className="flex-1">
                                                    {/* [Style 1] 메인 타이틀: H3 -> DIV로 변경하여 구조적 위계 정리 (탭 H3 아래에 위치) */}
                                                    <div
                                                        className="mb-6 font-['Pretendard']"
                                                        style={{
                                                            color: '#000',
                                                            fontSize: '34px',
                                                            fontStyle: 'normal',
                                                            fontWeight: 600,
                                                            lineHeight: 'normal',
                                                            letterSpacing: '-0.24px'
                                                        }}
                                                    >
                                                        {currentTab.title}
                                                    </div>

                                                    {/* [Style 2] 설명 텍스트 */}
                                                    <div
                                                        className="font-['Pretendard'] whitespace-pre-line"
                                                        style={{
                                                            color: '#000',
                                                            fontSize: '24px',
                                                            fontStyle: 'normal',
                                                            fontWeight: 500,
                                                            lineHeight: '36px',
                                                            letterSpacing: '-0.24px'
                                                        }}
                                                    >
                                                        {currentTab.description}
                                                    </div>
                                                </div>

                                                {/* 오른쪽: 상세 정보 카드 영역 */}
                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-[34px]">

                                                    {/* 주요 특징 카드들 (H4) */}
                                                    {currentTab.features.map((feature, idx) => (
                                                        <div key={idx} className="p-6 flex-1 flex flex-col min-h-[150px] md:min-h-[442px]" style={{ background: '#F3F3F6' }}>
                                                            <h4
                                                                className="font-['Pretendard'] mb-[50px]"
                                                                style={{
                                                                    color: '#262626',
                                                                    fontSize: '24px',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 500,
                                                                    lineHeight: 'normal',
                                                                    letterSpacing: '-0.24px'
                                                                }}
                                                            >
                                                                {feature.title}
                                                            </h4>
                                                            <ul className="space-y-2">
                                                                {feature.items.map((item, i) => (
                                                                    <li key={i} className="flex items-start font-['Pretendard']" style={{
                                                                        color: '#262626',
                                                                        fontSize: '22px',
                                                                        fontStyle: 'normal',
                                                                        fontWeight: 400,
                                                                        lineHeight: '28px',
                                                                        letterSpacing: '-0.22px'
                                                                    }}>
                                                                        <span className="mr-2" style={{ color: '#262626' }}>•</span>
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}

                                                    {/* 시술 기간 카드 (H4) */}
                                                    <div className="p-6 flex-1 flex flex-col min-h-[150px] md:min-h-[442px]" style={{ background: '#F3F3F6' }}>
                                                        <h4
                                                            className="font-['Pretendard'] mb-[50px]"
                                                            style={{
                                                                color: '#262626',
                                                                fontSize: '24px',
                                                                fontStyle: 'normal',
                                                                fontWeight: 500,
                                                                lineHeight: 'normal',
                                                                letterSpacing: '-0.24px'
                                                            }}
                                                        >
                                                            {isJp ? '施術期間' : isEn ? 'Procedure Duration' : '시술 기간'}
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {currentTab.duration.map((line, i) => (
                                                                <li key={i} className="flex items-start font-['Pretendard']" style={{
                                                                    color: '#262626',
                                                                    fontSize: '22px',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 400,
                                                                    lineHeight: '28px',
                                                                    letterSpacing: '-0.22px'
                                                                }}>
                                                                    <span className="mr-2" style={{ color: '#262626' }}>•</span>
                                                                    {line}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* 기술력 카드 (H4) */}
                                                    <div className="p-6 flex-1 flex flex-col min-h-[150px] md:min-h-[442px]" style={{ background: '#F3F3F6' }}>
                                                        <h4
                                                            className="font-['Pretendard'] mb-4 whitespace-pre-line"
                                                            style={{
                                                                color: '#262626',
                                                                fontSize: '24px',
                                                                fontStyle: 'normal',
                                                                fontWeight: 500,
                                                                lineHeight: 'normal',
                                                                letterSpacing: '-0.24px'
                                                            }}
                                                        >
                                                            {isJp ? 'ブランシュ歯科の\n技術力' : isEn ? 'Blanche\'s\nMastery' : '블랑쉬치과의\n기술력'}
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {currentTab.tech.map((item, i) => (
                                                                <li key={i} className="flex items-start font-['Pretendard']" style={{
                                                                    color: '#262626',
                                                                    fontSize: '22px',
                                                                    fontStyle: 'normal',
                                                                    fontWeight: 400,
                                                                    lineHeight: '28px',
                                                                    letterSpacing: '-0.22px'
                                                                }}>
                                                                    <span className="mr-2" style={{ color: '#262626' }}>•</span>
                                                                    <span className="whitespace-pre-line">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* 하단: 시술 사례 (있을 경우) (H4) */}
                                            {currentTab.cases && currentTab.cases.length > 0 && (
                                                <div className="mt-8">
                                                    <div className="flex flex-col">
                                                        <h4
                                                            className="font-['Pretendard']"
                                                            style={{
                                                                color: '#000',
                                                                fontSize: '20px',
                                                                fontStyle: 'normal',
                                                                fontWeight: 500,
                                                                lineHeight: 'normal',
                                                                letterSpacing: '-0.2px',
                                                                marginBottom: '4px' // 디자인에 따라 간격 조정
                                                            }}
                                                        >
                                                            {currentTab.cases[0].label}
                                                        </h4>
                                                        <p
                                                            style={{
                                                                color: '#000',
                                                                fontSize: '16px',
                                                                fontStyle: 'normal',
                                                                fontWeight: 300,
                                                                lineHeight: 'normal',
                                                                letterSpacing: '-0.14px',
                                                                paddingBottom: '10px'
                                                            }}
                                                        >
                                                            {currentTab.cases[0].guide}
                                                        </p>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                                                        {currentTab.cases.map((caseItem, idx) => {
                                                            const shouldHideText = !(currentTab.id === 'digital' || currentTab.id === 'all');
                                                            const isFullTab = currentTab.id === 'all';
                                                            const aspectRatioClass = isFullTab
                                                                ? 'aspect-[639/539]'
                                                                : 'aspect-[331/169]';

                                                            return (
                                                                <div key={idx} className="flex flex-col w-full">
                                                                    <div className={`relative overflow-hidden group w-full ${aspectRatioClass}`}>
                                                                        <Compare
                                                                            firstImage={caseItem.before}
                                                                            secondImage={caseItem.after}
                                                                            firstAlt={caseItem.beforeAlt}
                                                                            secondAlt={caseItem.afterAlt}
                                                                            className="w-full h-full"
                                                                            firstImageClassName="object-contain"
                                                                            secondImageClassname="object-contain"
                                                                            slideMode="drag"
                                                                            showHandlebar={true}
                                                                            autoplay={false}
                                                                        />
                                                                    </div>

                                                                    {!shouldHideText && (
                                                                        <div
                                                                            className="flex flex-col p-6"
                                                                            style={{
                                                                                background: '#F3F3F6',
                                                                                width: '100%'
                                                                            }}
                                                                        >
                                                                            <p
                                                                                className="font-['Pretendard']"
                                                                                style={{
                                                                                    color: '#262626',
                                                                                    fontSize: '20px',
                                                                                    fontStyle: 'normal',
                                                                                    fontWeight: 500,
                                                                                    lineHeight: 'normal',
                                                                                    letterSpacing: '-0.2px',
                                                                                    marginBottom: '8px'
                                                                                }}
                                                                            >
                                                                                {caseItem.title}
                                                                            </p>
                                                                            <p
                                                                                className="font-['Pretendard'] whitespace-pre-line"
                                                                                style={{
                                                                                    color: '#262626',
                                                                                    fontSize: '17px',
                                                                                    fontStyle: 'normal',
                                                                                    fontWeight: 400,
                                                                                    lineHeight: 'normal',
                                                                                    letterSpacing: '-0.17px'
                                                                                }}
                                                                            >
                                                                                {caseItem.description}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            )}
                        </React.Fragment>
                    )
                })}
            </div>
        </section>
    );
}
