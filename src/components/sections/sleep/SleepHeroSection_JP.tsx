import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container } from '@/components/layouts/Container';
import { HeroConsultationButton } from '@/components/ui/ConsultationButton';

/**
 * 睡眠歯科治療 ヒーローセクションコンポーネント (日本語)
 */
export function SleepHeroSection_JP() {
    return (
        <section className="relative w-full h-[300svh] md:h-[340svh]">
            <div
                className="sticky top-0 h-screen-safe w-full overflow-hidden"
                style={{
                    transform: 'translate3d(0, 0, 0)',
                    WebkitTransform: 'translate3d(0, 0, 0)',
                    willChange: 'transform',
                    contain: 'layout style paint',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                }}
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/asset-134.webp"
                        alt=""
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                </div>

                <Container className="relative h-full">
                    <div className="relative h-full flex flex-col md:flex-row items-center md:items-end justify-end md:justify-between pb-[87px] md:pb-[114px] gap-[27px]">
                        <div className={cn("flex flex-col", "z-10")}>
                            {/* 1행: Row - SVG + 텍스트 */}
                            <div className="flex flex-row items-center justify-center gap-3 pb-[10px] md:justify-start md:pb-5">
                                {/* SVG 아이콘 */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14.999"
                                    height="14.442"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    style={{ aspectRatio: '15.00/14.44' }}
                                >
                                    <path
                                        d="M4.33613 7.53069C2.63518 7.63298 1.2537 9.23439 1.2537 10.9381V13.035C1.2537 13.4759 0.89616 13.8334 0.454867 13.8334H0V14.4412H7.82477V10.8097C7.82477 8.92821 6.24267 7.41616 4.33613 7.53069Z"
                                        fill="#FFF"
                                    />
                                    <path
                                        d="M11.715 7.52473C9.9012 7.52473 8.43066 8.99507 8.43066 10.8087V14.4415H11.715C13.5289 14.4415 14.9994 12.9711 14.9994 11.1576V10.8087C14.9994 8.99507 13.5289 7.52473 11.715 7.52473Z"
                                        fill="#FFF"
                                    />
                                    <path
                                        d="M7.82697 0H0.00219727V0.607731H0.457064C0.898027 0.607731 1.25556 0.965221 1.25556 1.40612V3.50339C1.25556 5.20709 2.63738 6.80851 4.338 6.91046C6.24486 7.02532 7.82697 5.51327 7.82697 3.63149V0Z"
                                        fill="#FFF"
                                    />
                                    <path
                                        d="M11.715 4.57764e-05H8.43066V3.63286C8.43066 5.44646 9.9012 6.9168 11.715 6.9168C13.5289 6.9168 14.9994 5.44646 14.9994 3.63286V3.28398C14.9994 1.47038 13.5289 4.57764e-05 11.715 4.57764e-05Z"
                                        fill="#FFF"
                                    />
                                </svg>
                                {/* 텍스트 */}
                                <h1
                                    className="text-[16px] tracking-[-0.16px]"
                                    style={{
                                        color: "#FFF",
                                        fontStyle: "normal",
                                        fontWeight: 400,
                                        lineHeight: "16px",
                                        letterSpacing: "-0.16px",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    ブランシュ歯科の睡眠治療
                                </h1>
                            </div>

                            {/* 2행: 서브텍스트 */}
                            <h2
                                className="text-center md:text-left text-[24px] tracking-[-0.24px] font-semibold md:text-[38px] md:font-normal md:tracking-[-0.38px] subtitle-hero whitespace-pre-wrap"
                                style={{
                                    color: "#FFF",
                                    fontStyle: "normal",
                                    lineHeight: "normal",
                                }}
                            >
                                <>気づけば終わる、<br />睡眠治療システム</>
                            </h2>
                        </div>
                        <div className="z-20">
                            <HeroConsultationButton label="今すぐカウンセリング予約をする" />
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
}
