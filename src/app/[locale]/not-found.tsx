'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing'; // 경로 설정에 맞는 Link 컴포넌트
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';

/**
 * 프로젝트 전체에서 사용하는 커스텀 404 (페이지를 찾을 수 없음) 페이지입니다.
 * * 디자인 포인트:
 * - 전체 콘텐츠는 화면 정중앙에 위치 (text-center, items-center)
 * - 메뉴 리스트 박스는 중앙에 위치하되, 내부 텍스트는 왼쪽 정렬 (inline-block, text-left)
 */
export default function NotFound() {
    // 다국어 지원이 필요하다면 t('key') 사용, 현재는 디자인 시안 텍스트 적용
    const t = useTranslations('notFound');

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            {/* 메인 콘텐츠 영역: 화면 중앙 정렬 */}
            <main className="flex-grow flex flex-col items-center justify-center px-5 py-20">
                <div className="w-full max-w-[600px] text-center font-['Pretendard'] text-black">

                    {/* 404 배경 텍스트 */}
                    <p className="text-[140px] font-thin leading-none text-[#EBEBEB] mb-[-40px] select-none break-words">
                        404
                    </p>

                    {/* 타이틀 */}
                    <h1 className="text-[28px] font-medium tracking-[-0.28px] mb-[30px] leading-normal">
                        {t('title')}
                    </h1>

                    {/* 안내 문구 */}
                    <p className="text-[18px] font-normal leading-[31px] tracking-[-0.18px] mb-[50px] whitespace-pre-line">
                        {t('description')}
                    </p>

                    {/* 메뉴 리스트 영역 */}
                    <div className="inline-block text-left text-[16px] font-normal leading-[28px] tracking-[-0.16px]">
                        <ul className="m-0 p-0 list-none">
                            {/* 홈으로 이동 */}
                            <li className="mb-1">
                                <Link href="/" className="hover:underline">
                                    [{t('goHome')}]
                                </Link>
                            </li>

                            {/* 병원 소개 */}
                            <li className="flex items-start mb-1">
                                <span className="mr-2 font-bold">·</span>
                                <Link href="/intro" className="hover:underline">
                                    [{t('quickLinks.intro')}]
                                </Link>
                            </li>

                            {/* 진료 서비스 (서브 메뉴 포함) */}
                            <li className="flex flex-col mb-1">
                                <div className="flex items-start">
                                    <span className="mr-2 font-bold">·</span>
                                    <Link href="/special" className="hover:underline">
                                        [{t('quickLinks.special')}]
                                    </Link>
                                </div>

                                {/* 서브 메뉴 리스트 */}
                                <ul className="pl-[15px] mt-1 list-none text-[#444]">
                                    <li className="flex items-start">
                                        <span className="mr-2">·</span>
                                        <Link href="/special/implant" className="hover:underline">{t('specialMenu.implant')}</Link>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">·</span>
                                        <Link href="/special/laminate" className="hover:underline">{t('specialMenu.laminate')}</Link>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">·</span>
                                        <Link href="/special/orthodontics" className="hover:underline">{t('specialMenu.orthodontics')}</Link>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">·</span>
                                        <Link href="/special/whitening" className="hover:underline">{t('specialMenu.whitening')}</Link>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">·</span>
                                        <Link href="/special/sleep" className="hover:underline">{t('specialMenu.sleep')}</Link>
                                    </li>
                                </ul>
                            </li>

                            {/* 치료 사례 */}
                            <li className="flex items-start mb-1">
                                <span className="mr-2 font-bold">·</span>
                                <Link href="/review" className="hover:underline">
                                    [{t('quickLinks.review')}]
                                </Link>
                            </li>

                            {/* 블로그 */}
                            <li className="flex items-start">
                                <span className="mr-2 font-bold">·</span>
                                <Link href="/blog" className="hover:underline">
                                    [{t('quickLinks.blog')}]
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}