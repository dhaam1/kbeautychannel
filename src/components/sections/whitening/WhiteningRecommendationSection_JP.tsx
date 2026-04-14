'use client';

import { Compare } from '@/components/ui/compare';
import { motion } from 'framer-motion';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';

/**
 * 치아미백 추천대상/브랜드 섹션 컴포넌트 (일본어)
 */
export function WhiteningRecommendationSection_JP() {
    const { fadeUp } = useResponsiveAnimation();
    const labelMotion = fadeUp({ delay: 0.1 });
    const titleMotion = fadeUp({ delay: 0.15 });
    const bodyMotion = fadeUp({ delay: 0.2 });
    const cardMotion = (index: number) => fadeUp({ delay: 0.3 + index * 0.1 });

    return (
        <div className="relative w-full bg-white">
            <div className="relative w-full overflow-hidden flex-shrink-0 bg-white">
                <div className="flex flex-col items-center w-full pt-[60px] lg:pt-[70px] pb-[77px] px-[30px] md:px-[80px] bg-white" style={{ maxWidth: '1472px', margin: '0 auto' }}>
                    <motion.h2 className="pb-[15px] relative z-10" style={{ color: '#000', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px' }} {...labelMotion}>
                        オフィスホワイトニング施術症例
                    </motion.h2>
                    <motion.p className="relative z-10 whitespace-pre-line mb-[20px]" style={{ color: '#000', textAlign: 'center', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px' }} {...titleMotion}>
                        黄色い印象から明るい印象へ、<br />
                        ブランシュ歯科の歯のホワイトニング症例
                    </motion.p>
                    <motion.p className="relative z-10" style={{ color: '#000', textAlign: 'center', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.16px' }} {...bodyMotion}>
                        画面をドラッグして、Before/Afterを比較してみてください。
                    </motion.p>
                </div>
            </div>
            <div className="w-full h-[1px] bg-white"></div>
            <div className="h-auto w-full mx-auto flex flex-col md:flex-row border-white bg-white" style={{ maxWidth: '1472px' }}>
                {/* 사례 1: 김혜빈님 */}
                <motion.div
                    className={`relative z-25 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col ${0 < 2
                        ? 'border-b-[1px] md:border-b-0 md:border-r-[1px] border-white'
                        : 'border-r border-white'
                        } overflow-hidden`}
                    {...cardMotion(0)}
                >
                    <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                        <div className="overflow-hidden w-full h-full" style={{ position: 'relative', cursor: 'grab' }}>
                            <Compare
                                firstImage="/assets/jp/mibac01a.webp"
                                secondImage="/assets/jp/mibac01b.webp"
                                firstAlt="30代女性のホワイトニング前の写真"
                                secondAlt="30代女性のホワイトニング後の写真"
                                className="w-full h-full"
                                firstImageClassName="object-cover md:object-cover"
                                secondImageClassname="object-cover md:object-cover"
                                slideMode="drag"
                                showHandlebar={true}
                                autoplay={false}
                            />
                        </div>
                    </div>
                    <div className="relative w-full md:h-[50%] pl-[30px] pr-6 pt-[291px] pb-6 md:pl-[80px] md:pr-8 md:pt-8 md:pb-8 flex flex-col bg-white border-l-[1px] border-white">
                        <h3 className="text-left font-['Pretendard'] mb-2" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                            笑うのをためらっていた30代のケース
                        </h3>
                        <p className="text-left font-['Pretendard']" style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                            ホワイトニングで笑顔の印象が明るくなりました。
                        </p>
                    </div>
                </motion.div>

                {/* 사례 2: 이현정님 */}
                <motion.div
                    className={`relative z-15 h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col ${1 < 2
                        ? 'border-b-[1px] md:border-b-0 md:border-r-[1px] border-white'
                        : 'border-r border-white'
                        } overflow-hidden`}
                    {...cardMotion(1)}
                >
                    <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                        <div className="overflow-hidden w-full h-full" style={{ position: 'relative', cursor: 'grab' }}>
                            <Compare
                                firstImage="/assets/jp/mibac02a.webp"
                                secondImage="/assets/jp/mibac02b.webp"
                                firstAlt="20代女性のホワイトニング前の写真"
                                secondAlt="20代女性のホワイトニング後の写真"
                                className="w-full h-full"
                                firstImageClassName="object-cover md:object-cover"
                                secondImageClassname="object-cover md:object-cover"
                                slideMode="drag"
                                showHandlebar={true}
                                autoplay={false}
                            />
                        </div>
                    </div>
                    <div className="relative w-full md:h-[50%] pl-[30px] pr-6 pt-[291px] pb-6 md:pl-[80px] md:pr-8 md:pt-8 md:pb-8 flex flex-col bg-white">
                        <h3 className="text-left font-['Pretendard'] mb-2" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                            黄ばんだ歯に悩んでいた20代のケース
                        </h3>
                        <p className="text-left font-['Pretendard']" style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                            ホワイトニングで自然な明るさを取り戻しました。
                        </p>
                    </div>
                </motion.div>

                {/* 사례 3: 소지원님 */}
                <motion.div
                    className={`relative h-[496px] min-h-[496px] shrink-0 flex-1 flex flex-col ${2 < 2
                        ? 'border-b-[1px] md:border-b-0 md:border-r-[1px] border-white'
                        : 'border-r border-white'
                        } overflow-hidden`}
                    {...cardMotion(2)}
                >
                    <div className="absolute top-0 left-0 w-full h-[50%] md:relative md:h-[248px] md:shrink-0 overflow-hidden">
                        <div className="overflow-hidden w-full h-full" style={{ position: 'relative', cursor: 'grab' }}>
                            <Compare
                                firstImage="/assets/jp/mibac03a.webp"
                                secondImage="/assets/jp/mibac03b.webp"
                                firstAlt="30代女性のホワイトニング前の写真"
                                secondAlt="30代女性のホワイトニング後の写真"
                                className="w-full h-full"
                                firstImageClassName="object-cover md:object-cover"
                                secondImageClassname="object-cover md:object-cover"
                                slideMode="drag"
                                showHandlebar={true}
                                autoplay={false}
                            />
                        </div>
                    </div>
                    <div className="relative w-full md:h-[50%] pl-[30px] pr-6 pt-[291px] pb-6 md:pl-[80px] md:pr-8 md:pt-8 md:pb-8 flex flex-col bg-white">
                        <h3 className="text-left font-['Pretendard'] mb-2" style={{ color: '#000', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px' }}>
                            着色が悩みの30代のケース
                        </h3>
                        <p className="text-left font-['Pretendard']" style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}>
                            ホワイトニングで清潔感のある第一印象を実現しました
                        </p>
                    </div>
                </motion.div>
            </div>
            <div className="w-full h-[1px] bg-white"></div>
        </div>
    );
}
