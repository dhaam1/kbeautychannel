'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Link as LocalizedLink } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ASSETS } from '@/constants/assets';
import { ConsultationButton, MobileConsultationButton } from '@/components/ui/ConsultationButton';
import { GlobeIcon, LanguageBackgroundIcon, LanguageCheckIconSelect } from '@/components/ui/HeaderIcons';
import { getBlogBasePath } from '@/lib/blogPathHelper';

// ============================================
// Types
// ============================================
interface NavItem {
    label: string;
    href: string;
    enabled?: boolean;
}

interface HeaderProps {
    navItems?: NavItem[];
    ctaLabel?: string;
    onCtaClick?: () => void;
}

interface NavLinkProps {
    href: string;
    enabled?: boolean;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

// ============================================
// Constants
// ============================================
const HEADER_BG_COLOR = "rgba(244, 247, 254, 0.70)";

const HEADER_TRANSLATIONS = {
    kr: {
        home: '홈',
        intro: '블랑쉬치과 소개',
        special: '진료 서비스',
        review: '치료 사례',
        blog: '블로그',
        consultationBtn: '상담 예약',
        specialMenu: {
            laminate: '블랑쉬 라미네이트',
            implant: '임플란트',
            orthodontics: '치아교정',
            whitening: '치아미백',
            sleep: '치과 수면 치료'
        },
        mobile: {
            intro: '블랑쉬 치과 소개',
            special: '블랑쉬 솔루션',
            specialMenu: {
                implant: '임플란트',
                laminate: '무삭제 라미네이트',
                orthodontics: '인비절라인 치아교정',
                whitening: '치아미백',
                sleep: '수면 마취 치료'
            }
        }
    },
    jp: {
        home: 'ホーム',
        intro: 'ブランシュ歯科の紹介',
        special: '診療サービス',
        review: '治療事例',
        blog: 'ブログ',
        consultationBtn: '相談予約',
        specialMenu: {
            laminate: 'ブランシュラミネート',
            implant: 'インプラント',
            orthodontics: 'インビザライン歯列矯正',
            whitening: '歯のホワイトニング',
            sleep: '歯科睡眠治療'
        },
        mobile: {
            intro: 'ブランシュ歯科の紹介',
            special: 'ブランシュソリューション',
            specialMenu: {
                implant: 'インプラント',
                laminate: '無切削ラミネート',
                orthodontics: 'インビザライン歯列矯正',
                whitening: '歯のホワイトニング',
                sleep: '睡眠麻酔治療'
            }
        }
    },
    en: {
        home: 'Home',
        intro: 'About Us',
        special: 'Treatments',
        review: 'Before & After',
        blog: 'Blog',
        consultationBtn: 'Book Appointment',
        specialMenu: {
            laminate: 'Blanche Veneer',
            implant: 'Implant',
            orthodontics: 'Orthodontics',
            whitening: 'Whitening',
            sleep: 'Sedation'
        },
        mobile: {
            intro: 'About Us',
            special: 'Blanche Solutions',
            specialMenu: {
                implant: 'Implant',
                laminate: 'Non-Prep Laminate',
                orthodontics: 'Invisalign',
                whitening: 'Whitening',
                sleep: 'Sleep Anesthesia'
            }
        }
    }
};

const NAV_LINK_STYLE: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '16px',
    lineHeight: 'normal',
    letterSpacing: '-0.16px',
};

const MOBILE_NAV_LINK_STYLE: React.CSSProperties = {
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '52px',
    letterSpacing: '-0.24px',
};

const MOBILE_SUB_LINK_STYLE: React.CSSProperties = {
    fontSize: '24px',
    fontStyle: 'normal',
    lineHeight: '52px',
    letterSpacing: '-0.24px',
};

// ============================================
// Helper Functions
// ============================================

/**
 * blog 경로인지 확인 (/blog 또는 /jp/blog)
 */
const isBlogPath = (href: string): boolean => href.includes('/blog');

/**
 * 언어 전환 URL 생성
 */
const getLanguageSwitchUrl = (rawPathname: string, targetLocale: string): string => {
    // 블로그 경로 처리 (/jp/blog, /en/blog, /blog)
    const isJpBlog = rawPathname?.startsWith('/jp/blog');
    const isEnBlog = rawPathname?.startsWith('/en/blog');
    const isKrBlog = rawPathname?.startsWith('/blog') && !isJpBlog && !isEnBlog;
    
    if (isJpBlog || isEnBlog || isKrBlog) {
        if (targetLocale === 'kr') return '/blog';
        if (targetLocale === 'jp') return '/jp/blog';
        if (targetLocale === 'en') return '/en/blog';
    }

    // 일반 경로 처리 (locale prefix 제거 후 타겟 로케일 결합)
    let pathWithoutLocale = rawPathname || '/';
    if (rawPathname?.startsWith('/jp')) {
        pathWithoutLocale = rawPathname.replace('/jp', '') || '/';
    } else if (rawPathname?.startsWith('/en')) {
        pathWithoutLocale = rawPathname.replace('/en', '') || '/';
    } else if (rawPathname?.startsWith('/kr')) {
        pathWithoutLocale = rawPathname.replace('/kr', '') || '/';
    }

    if (targetLocale === 'kr') return pathWithoutLocale;
    if (pathWithoutLocale === '/') return `/${targetLocale}`;
    return `/${targetLocale}${pathWithoutLocale}`;
};

// ============================================
// Sub-Components
// ============================================

/**
 * 통합 네비게이션 링크 컴포넌트
 * - blog 경로: 일반 Link 사용 (locale prefix 방지)
 * - 기타 경로: LocalizedLink 사용
 */
function NavLink({ href, enabled = true, isActive, onClick, onMouseEnter, onMouseLeave, className, style, children }: NavLinkProps) {
    const useBlogLink = isBlogPath(href);
    const finalHref = enabled ? href : '#';

    const handleClick = (e: React.MouseEvent) => {
        if (!enabled) e.preventDefault();
        onClick?.(e);
    };

    if (useBlogLink) {
        return (
            <Link
                href={finalHref}
                onClick={handleClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={className}
                style={style}
            >
                {children}
            </Link>
        );
    }

    return (
        <LocalizedLink
            href={finalHref as any}
            onClick={handleClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={className}
            style={style}
        >
            {children}
        </LocalizedLink>
    );
}

/**
 * 밑줄 애니메이션 컴포넌트
 */
function UnderlineIndicator({ isActive, enabled, bottom = '0' }: { isActive: boolean; enabled: boolean; bottom?: string }) {
    return (
        <>
            {isActive && (
                <span
                    className="absolute left-0 h-px bg-black w-full transition-all duration-300"
                    style={{ bottom }}
                />
            )}
            {!isActive && enabled && (
                <span
                    className="absolute left-0 h-px bg-black w-0 group-hover:w-full transition-all duration-300"
                    style={{ bottom }}
                />
            )}
        </>
    );
}

// ============================================
// Main Component
// ============================================
export function Header({
    navItems,
    ctaLabel,
    onCtaClick,
}: HeaderProps) {
    const params = useParams();
    const rawPathname = usePathname();

    // Locale 감지
    const locale: 'kr' | 'jp' | 'en' = (() => {
        if ((rawPathname as string)?.startsWith('/jp')) return 'jp';
        if ((rawPathname as string)?.startsWith('/en')) return 'en';
        if ((params?.locale as string) === 'jp') return 'jp';
        if ((params?.locale as string) === 'en') return 'en';
        return 'kr';
    })();

    const t = HEADER_TRANSLATIONS[locale];

    // 네비게이션 아이템 설정
    const defaultNavItems: NavItem[] = [
        { label: t.home, href: '/', enabled: true },
        { label: t.intro, href: '/intro', enabled: true },
        { label: t.special, href: '/special', enabled: true },
        { label: t.review, href: '/review', enabled: true },
        { label: t.blog, href: getBlogBasePath(locale), enabled: true },
    ];

    const solutionSubItems: NavItem[] = [
        { label: t.specialMenu.laminate, href: '/special/laminate', enabled: true },
        { label: t.specialMenu.implant, href: '/special/implant', enabled: true },
        { label: t.specialMenu.orthodontics, href: '/special/orthodontics', enabled: true },
        { label: t.specialMenu.whitening, href: '/special/whitening', enabled: true },
        { label: t.specialMenu.sleep, href: '/special/sleep', enabled: true },
    ];

    // 모바일 전용 nav items (피그마 모바일 디자인 기준 라벨)
    const mobileNavItems: NavItem[] = [
        { label: t.home, href: '/', enabled: true },
        { label: t.mobile.intro, href: '/intro', enabled: true },
        { label: t.mobile.special, href: '/special', enabled: true },
        { label: t.review, href: '/review', enabled: true },
        { label: t.blog, href: getBlogBasePath(locale), enabled: true },
    ];

    const mobileSolutionSubItems: NavItem[] = [
        { label: t.mobile.specialMenu.implant, href: '/special/implant', enabled: true },
        { label: t.mobile.specialMenu.laminate, href: '/special/laminate', enabled: true },
        { label: t.mobile.specialMenu.orthodontics, href: '/special/orthodontics', enabled: true },
        { label: t.mobile.specialMenu.whitening, href: '/special/whitening', enabled: true },
        { label: t.mobile.specialMenu.sleep, href: '/special/sleep', enabled: true },
    ];

    const actualNavItems = navItems || defaultNavItems;
    const actualCtaLabel = ctaLabel || t.consultationBtn;
    const currentPath = rawPathname;

    // State
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSolutionMenuHovered, setIsSolutionMenuHovered] = useState(false);
    const [isLanguageMenuHovered, setIsLanguageMenuHovered] = useState(false);
    const [isLanguageMenuOpenMobile, setIsLanguageMenuOpenMobile] = useState(false);

    // Helper: 현재 경로가 active인지 확인
    const isPathActive = (href: string): boolean => {
        if (href === '/') return currentPath === '/' || currentPath === '/jp';
        return currentPath?.includes(href) ?? false;
    };

    // Helper: Solution 메뉴인지 확인 (label 기반이 아닌 href 기반)
    const isSolutionItem = (item: NavItem): boolean => {
        return item.href === '/special' || item.href.includes('/special');
    };

    // 모바일 메뉴 스크롤 잠금
    useEffect(() => {
        if (isMobileMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isMobileMenuOpen]);

    // ============================================
    // Render Helpers
    // ============================================

    // PC 네비게이션 아이템 렌더링
    const renderPCNavItem = (item: NavItem, index: number) => {
        const isSolution = isSolutionItem(item);
        const linkHref = isSolution ? '/special' : item.href;
        const isActive = isSolution
            ? (currentPath === '/special' || currentPath?.startsWith('/special/'))
            : isPathActive(linkHref);
        const isEnabled = item.enabled !== false;

        return (
            <NavLink
                key={`${item.href}-${index}`}
                href={linkHref}
                enabled={isEnabled}
                className={cn(
                    "relative group transition-all duration-300",
                    isActive ? "font-medium" : "font-normal",
                    isEnabled ? "text-black cursor-pointer" : "text-gray-400 cursor-not-allowed"
                )}
                style={NAV_LINK_STYLE}
                onMouseEnter={() => {
                    if (isSolution) setIsSolutionMenuHovered(true);
                }}
            >
                {item.label}
                <UnderlineIndicator isActive={isActive} enabled={isEnabled} />
            </NavLink>
        );
    };

    // PC 솔루션 서브메뉴 아이템 렌더링
    const renderPCSolutionSubItem = (subItem: NavItem) => {
        const isSubActive = isPathActive(subItem.href);
        const isEnabled = subItem.enabled !== false;

        return (
            <NavLink
                key={subItem.href}
                href={subItem.href}
                enabled={isEnabled}
                className={cn(
                    "block group text-base leading-[48px] tracking-[-0.16px] transition-all",
                    isEnabled ? "text-black cursor-pointer" : "text-gray-400 cursor-not-allowed"
                )}
                style={{ fontWeight: isSubActive ? 500 : 400 }}
            >
                <span className="relative inline-block">
                    {subItem.label}
                    <UnderlineIndicator isActive={isSubActive} enabled={isEnabled} bottom="10px" />
                </span>
            </NavLink>
        );
    };

    // 모바일 네비게이션 아이템 렌더링
    const renderMobileNavItem = (item: NavItem, index: number) => {
        const isSolution = isSolutionItem(item);
        const linkHref = isSolution ? '/special' : item.href;
        const isActive = isSolution
            ? currentPath?.startsWith('/special')
            : isPathActive(linkHref);
        const isEnabled = item.enabled !== false;

        return (
            <div key={`${item.href}-${index}`} className="w-full">
                <NavLink
                    href={linkHref}
                    enabled={isEnabled}
                    onClick={() => isEnabled && setIsMobileMenuOpen(false)}
                    className={cn(
                        "inline-block transition-all relative group",
                        isActive ? "text-black font-semibold" : "text-black",
                        isEnabled ? "cursor-pointer" : "text-gray-400 cursor-not-allowed"
                    )}
                    style={MOBILE_NAV_LINK_STYLE}
                >
                    {item.label}
                    <UnderlineIndicator isActive={isActive} enabled={isEnabled} bottom="14px" />
                </NavLink>

                {isSolution && (
                    <div className="flex flex-row gap-[28px]">
                        <div className="h-[238px] w-[1px] bg-black self-stretch mt-[10px]" />
                        <div className="flex flex-col">
                            {mobileSolutionSubItems.map(renderMobileSolutionSubItem)}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // 모바일 솔루션 서브메뉴 아이템 렌더링
    const renderMobileSolutionSubItem = (subItem: NavItem) => {
        const isSubActive = isPathActive(subItem.href);
        const isEnabled = subItem.enabled !== false;

        return (
            <NavLink
                key={subItem.href}
                href={subItem.href}
                enabled={isEnabled}
                onClick={() => isEnabled && setIsMobileMenuOpen(false)}
                className={cn(
                    "block transition-all group",
                    isEnabled ? "text-black cursor-pointer" : "text-gray-400 cursor-not-allowed"
                )}
                style={{ ...MOBILE_SUB_LINK_STYLE, fontWeight: isSubActive ? 500 : 400 }}
            >
                <span className="relative inline-block">
                    {subItem.label}
                    <UnderlineIndicator isActive={isSubActive} enabled={isEnabled} bottom="2px" />
                </span>
            </NavLink>
        );
    };

    // ============================================
    // Main Render
    // ============================================
    return (
        <>
            {/* PC: 솔루션 메뉴 호버 시 배경 블러 */}
            <AnimatePresence>
                {isSolutionMenuHovered && (
                    <motion.div
                        key="solution-blur-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hidden header-md:block fixed inset-0 pointer-events-none z-[59]"
                        style={{
                            backdropFilter: 'blur(50px)',
                            WebkitBackdropFilter: 'blur(50px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.20)',
                        }}
                    />
                )}
            </AnimatePresence>

            <header
                className="fixed top-0 left-0 right-0 z-[60] w-full"
                style={{
                    pointerEvents: 'none',
                    transform: 'translate3d(0, 0, 0)',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                }}
                onMouseLeave={() => setIsSolutionMenuHovered(false)}
            >
                <div className="flex flex-col w-full" style={{ pointerEvents: 'auto' }}>
                    {/* 1. 로고 영역 */}
                    <div className={cn(
                        "w-full h-[84px] backdrop-blur-[20px] flex items-center justify-center",
                        "bg-[rgba(244,247,254,0.70)]"
                    )}>
                        <div className="max-w-[1632px] w-full mx-auto relative flex items-center justify-between header-md:justify-center px-[30px] md:px-[80px]">
                            <LocalizedLink href="/" className="cursor-pointer z-[62]">
                                <Image
                                    src={ASSETS.COMMON.LOGO}
                                    alt="Blanche"
                                    width={176}
                                    height={32}
                                    className="w-[145px] h-[27px] header-md:w-[176px] header-md:h-[32px]"
                                />
                            </LocalizedLink>

                            {/* 모바일 우측 버튼 그룹 */}
                            <div className="flex items-center gap-[20px] header-md:hidden z-[62]">
                                <button
                                    className="flex items-center justify-center w-[43px] h-[31px] bg-[#E6E6E6] rounded-[50px]"
                                    onClick={() => setIsLanguageMenuOpenMobile(!isLanguageMenuOpenMobile)}
                                >
                                    <GlobeIcon />
                                </button>

                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(!isMobileMenuOpen);
                                        setIsLanguageMenuOpenMobile(false);
                                    }}
                                    className="flex flex-col items-end justify-center"
                                    aria-label="메뉴"
                                >
                                    {isMobileMenuOpen ? (
                                        <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
                                            <path d="M23.25 7.75L7.75 23.25M7.75 7.75L23.25 23.25" stroke="#000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <div className="flex flex-col items-end gap-[8px]">
                                            <span className="block bg-black w-[31px] h-[1px]" />
                                            <span className="block bg-black w-[31px] h-[1px]" />
                                            <span className="block bg-black w-[31px] h-[1px]" />
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2. PC 네비게이션 */}
                    <div className="hidden header-md:flex w-full h-[41px] backdrop-blur-[20px] items-center justify-center relative bg-[rgba(244,247,254,0.70)] border-t border-b border-white">
                        <div className="max-w-[1632px] w-full mx-auto relative flex items-center justify-between">
                            <nav className="flex items-center gap-[55px] mx-auto max-[1200px]:mx-0 max-[1200px]:ml-20">
                                {actualNavItems.map(renderPCNavItem)}
                            </nav>

                            {/* PC 우측 버튼 */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 right-20 flex flex-row items-center gap-[6px]"
                                onMouseLeave={() => setIsLanguageMenuHovered(false)}
                            >
                                <div
                                    onMouseEnter={() => setIsLanguageMenuHovered(true)}
                                    className="cursor-pointer"
                                >
                                    <div className="flex w-[43px] h-[31px] p-[6px_5px] justify-center items-center gap-[10px] rounded-[50px] bg-[#E6E6E6]">
                                        <GlobeIcon />
                                    </div>
                                </div>
                                <ConsultationButton
                                    onClick={onCtaClick}
                                    label={actualCtaLabel}
                                    className="transition-opacity hover:opacity-80 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* PC: 솔루션 드롭다운 */}
                    <AnimatePresence>
                        {isSolutionMenuHovered && (
                            <motion.div
                                key="solution-dropdown"
                                initial={{ opacity: 0, height: 0, clipPath: 'inset(0 0 100% 0)' }}
                                animate={{ opacity: 1, height: 'auto', clipPath: 'inset(0 0 0% 0)' }}
                                exit={{ opacity: 0, height: 0, clipPath: 'inset(0 0 100% 0)' }}
                                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                className="hidden header-md:block w-full overflow-hidden relative z-[61]"
                                onMouseEnter={() => setIsSolutionMenuHovered(true)}
                                onMouseLeave={() => setIsSolutionMenuHovered(false)}
                            >
                                <div className="flex items-start justify-center w-full pt-8 pb-0 bg-[rgba(244,247,254,0.70)] backdrop-blur-[20px]">
                                    <div className="flex items-start gap-[140px] w-[522px]">
                                        <div className="flex flex-col items-center justify-between self-stretch">
                                            <div className="text-black font-medium text-[32px] leading-[44px] tracking-[-0.32px] mb-4 cursor-default select-none self-start">
                                                {t.special}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-0 pb-[60px]">
                                            {solutionSubItems.map(renderPCSolutionSubItem)}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* PC: 언어 메뉴 호버 시 배경 블러 */}
            <AnimatePresence>
                {isLanguageMenuHovered && (
                    <motion.div
                        key="language-blur-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hidden header-md:block fixed inset-0 pointer-events-none z-[59]"
                        style={{
                            backdropFilter: 'blur(50px)',
                            WebkitBackdropFilter: 'blur(50px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.20)',
                        }}
                    />
                )}
            </AnimatePresence>

            {/* 언어 선택 드롭다운 (PC & Mobile 공용) */}
            <AnimatePresence>
                {(isLanguageMenuHovered || isLanguageMenuOpenMobile) && (
                    <motion.div
                        key="language-dropdown-menu"
                        initial={{ opacity: 0, height: 0, clipPath: 'inset(0 0 100% 0)' }}
                        animate={{
                            opacity: 1,
                            height: isLanguageMenuOpenMobile ? 'calc(100vh - 85px)' : '117px',
                            clipPath: 'inset(0 0 0% 0)'
                        }}
                        exit={{ opacity: 0, height: 0, clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed w-full z-[61] top-[85px] header-md:top-[126px] left-0"
                        style={{
                            background: HEADER_BG_COLOR,
                            backdropFilter: 'blur(50px)',
                            WebkitBackdropFilter: 'blur(50px)',
                        }}
                        onMouseEnter={() => !isMobileMenuOpen && setIsLanguageMenuHovered(true)}
                        onMouseLeave={() => setIsLanguageMenuHovered(false)}
                    >
                        <div className="w-full border-t border-black" />

                        <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
                            <LanguageBackgroundIcon />
                        </div>

                        <div className="relative w-full h-full mx-auto z-10 px-[30px] md:px-[80px]" style={{ maxWidth: '1472px' }}>
                            <div className={cn(
                                "flex h-full items-center",
                                "flex-col justify-center gap-[40px]",
                                "header-md:flex-row header-md:justify-end header-md:gap-0"
                            )}>
                                {/* Korean */}
                                <div className="flex items-center">
                                    <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden border-[0.5px] border-white box-border">
                                        <Image src="/assets/plus/korea_logo.webp" alt="Korean" fill className="object-cover" />
                                        <div className="absolute inset-0"><LanguageCheckIconSelect /></div>
                                    </div>
                                    <Link
                                        href={getLanguageSwitchUrl(rawPathname as string, 'kr')}
                                        className="cursor-pointer"
                                        onClick={() => setIsLanguageMenuOpenMobile(false)}
                                    >
                                        <span
                                            className="pl-[8px] header-md:pr-[12px]"
                                            style={{
                                                color: '#000',
                                                fontSize: isLanguageMenuOpenMobile ? '24px' : '16px',
                                                fontWeight: locale === 'kr' ? 500 : 400,
                                                letterSpacing: '-0.16px',
                                                textDecorationLine: locale === 'kr' ? 'underline' : 'none',
                                                textUnderlineOffset: '25%',
                                            }}
                                        >
                                            한국어
                                        </span>
                                    </Link>
                                </div>

                                {/* Japanese */}
                                <div className="flex items-center">
                                    <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden border-[0.5px] border-white box-border bg-[#E6E6E6]">
                                        <Image src="/assets/plus/japan_logo.webp" alt="Japanese" fill className="object-cover" />
                                        <div className="absolute inset-0"><LanguageCheckIconSelect /></div>
                                    </div>
                                    <Link
                                        href={getLanguageSwitchUrl(rawPathname as string, 'jp')}
                                        className="cursor-pointer"
                                        onClick={() => setIsLanguageMenuOpenMobile(false)}
                                    >
                                        <span
                                            className="pl-[8px] header-md:pr-[12px]"
                                            style={{
                                                color: '#000',
                                                fontFamily: '"Pretendard JP Variable"',
                                                fontSize: isLanguageMenuOpenMobile ? '24px' : '16px',
                                                fontWeight: locale === 'jp' ? 500 : 400,
                                                letterSpacing: '-0.16px',
                                                textDecorationLine: locale === 'jp' ? 'underline' : 'none',
                                                textUnderlineOffset: '25%',
                                            }}
                                        >
                                            日本語
                                        </span>
                                    </Link>
                                </div>

                                {/* English */}
                                <div className="flex items-center">
                                    <div className="relative w-[32px] h-[32px] rounded-full overflow-hidden border-[0.5px] border-white box-border bg-[#E6E6E6]">
                                        <Image src="/assets/plus/usa_logo.png" alt="English" fill className="object-cover" />
                                        <div className="absolute inset-0"><LanguageCheckIconSelect /></div>
                                    </div>
                                    <Link
                                        href={getLanguageSwitchUrl(rawPathname as string, 'en')}
                                        className="cursor-pointer"
                                        onClick={() => setIsLanguageMenuOpenMobile(false)}
                                    >
                                        <span
                                            className="pl-[8px]"
                                            style={{
                                                color: '#000',
                                                fontSize: isLanguageMenuOpenMobile ? '24px' : '16px',
                                                fontWeight: locale === 'en' ? 500 : 400,
                                                letterSpacing: '-0.16px',
                                                textDecorationLine: locale === 'en' ? 'underline' : 'none',
                                                textUnderlineOffset: '25%',
                                            }}
                                        >
                                            English
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 모바일 메뉴 오버레이 */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-full-menu"
                        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                        className="header-md:hidden fixed inset-0 w-full h-screen-safe overflow-y-auto bg-[rgba(244,247,254,0.70)] backdrop-blur-[50px] z-[59]"
                    >
                        <nav className="flex flex-col items-start justify-between px-[46px] pt-[122px] pb-[48px] min-h-full">
                            <div className="flex flex-col items-start w-full">
                                {mobileNavItems.map(renderMobileNavItem)}
                            </div>

                            <div className="w-full flex justify-center shrink-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: actualNavItems.length * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <MobileConsultationButton
                                        onClick={() => {
                                            onCtaClick?.();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="transition-opacity hover:opacity-80 cursor-pointer"
                                    />
                                </motion.div>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
