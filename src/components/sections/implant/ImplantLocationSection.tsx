'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ASSETS } from '@/constants/assets';
import { motionProps, useMotionEnabled } from '@/lib/motionToggle';
import { useResponsiveAnimation } from '@/hooks/useResponsiveAnimation';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

/**
 * 임플란트 위치 섹션 (AboutMapSection base)
 * 대부분의 정보가 공통이므로 구조와 텍스트를 그대로 유지하되 
 * 컴포넌트 이름과 필요시 텍스트를 커스터마이징합니다.
 */
export function ImplantLocationSection() {
    const motionEnabled = useMotionEnabled();
    const t = useTranslations('implant.location');
    const P = (motionEnabled ? motion.p : 'p') as typeof motion.p;
    const Div = (motionEnabled ? motion.div : 'div') as typeof motion.div;
    const H2 = (motionEnabled ? motion.h2 : 'h2') as typeof motion.h2;
    const H3 = (motionEnabled ? motion.h3 : 'h3') as typeof motion.h3;
    const { fadeUp } = useResponsiveAnimation();

    const implantTable = t.raw('implant.table') as Array<{ label: string; value: string }>;
    const dentureTable = t.raw('denture.table') as Array<{ label: string; value: string }>;

    const VIEWPORT_CONFIG = { once: true, amount: 0.3 };

    return (
        <section className="relative w-full flex flex-col items-center justify-center overflow-visible bg-black">
            {/* Top Section */}
            <div
                className="flex flex-col items-start w-full mx-auto pl-[30px] md:pl-[80px] pr-0 pt-[60px] md:pt-[80px] pb-0 overflow-visible"
                style={{ maxWidth: '1472px' }}
            >
                <H2
                    style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.24px',
                    }}
                    {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
                >
                    {t('label')}
                </H2>
                <P
                    className="overflow-visible"
                    style={{
                        color: '#ffffff',
                        fontSize: '28px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.28px',
                        marginTop: '10px',
                    }}
                    {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
                >
                    <span className="md:hidden whitespace-pre-line">
                        {t('title.mobile')}
                    </span>
                    <span className="hidden md:inline whitespace-pre-line">
                        {t('title.desktop')}
                    </span>
                </P>
                <P
                    className="mt-[24px] md:mt-[42px]"
                    style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        letterSpacing: '-0.24px',
                    }}
                    {...(motionEnabled ? fadeUp({ delay: 0.3 }) : {})}
                >
                    <span className="md:hidden whitespace-pre-line">
                        {t('description.mobile')}
                    </span>
                    <span className="hidden md:inline whitespace-pre-line">
                        {t('description.desktop')}
                    </span>
                </P>
                <P
                    className="mt-[78px]"
                    style={{
                        color: '#FFF',
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: '30px',
                        letterSpacing: '-0.2px',
                    }}
                    {...(motionEnabled ? fadeUp({ delay: 0.4 }) : {})}
                >
                    {t('differenceTitle')}
                </P>
                <Div
                    className="mt-[16px]"
                    style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        letterSpacing: '-0.24px',
                        whiteSpace: 'pre-line' // <br /> 및 줄바꿈 허용
                    }}
                    {...(motionEnabled ? fadeUp({ delay: 0.5 }) : {})}
                >
                    <span className="md:hidden" dangerouslySetInnerHTML={{ __html: t.raw('differenceDesc.mobile') }} />
                    <span className="hidden md:block" dangerouslySetInnerHTML={{ __html: t.raw('differenceDesc.desktop') }} />
                </Div>
            </div>

            {/* Content Grid */}
            <div className="w-full px-[30px] md:px-[80px] pt-[26px] pb-0 mx-auto overflow-visible" style={{ maxWidth: '1472px' }}>
                <div className="relative grid grid-cols-1 lg:grid-cols-2 w-full mx-auto h-auto overflow-visible gap-[30px] lg:gap-0 lg:border lg:border-black" style={{ maxWidth: '1472px', background: '#000' }}>

                    {/* Implant Table */}
                    <div className="flex items-start justify-center w-full bg-white order-2 lg:order-1 border-r-0 lg:border-r border-black">
                        <div className="relative flex flex-col items-start w-full px-[5%] md:px-[10%] lg:px-[15%] py-[60px]">
                            <Image
                                src="/assets/implant/implant-3.webp"
                                alt={t('implant.alt')}
                                width={383}
                                height={375}
                                className="object-contain md:object-cover mb-0 md:mb-[36px] mx-auto h-[280px] md:h-[375px]"
                                style={{ width: '383px', aspectRatio: '383/375' }}
                            />
                            <H3
                                style={{ color: '#000', fontSize: '18px', fontStyle: 'normal', fontWeight: 500, lineHeight: '26px', letterSpacing: '-0.2px' }}
                                {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
                            >
                                {t('implant.title')}
                            </H3>

                            <Div
                                className="w-full mt-[20px]"
                                {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
                            >
                                <Table className="w-full border-collapse" style={{ borderTop: '1px solid #000', borderBottom: '1px solid #000' }}>
                                    <TableBody>
                                        {implantTable.map((row, index) => (
                                            <TableRow key={index} className="border-b" style={{ borderColor: '#000', borderBottom: index === implantTable.length - 1 ? '1px solid #000' : undefined }}>
                                                <TableCell className="py-[12px] px-0" style={{ color: '#000', textAlign: 'center', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.16px', backgroundColor: '#FFF' }}>{row.label}</TableCell>
                                                <TableCell className="py-[12px] pl-[16px] pr-0" style={{ color: '#000', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: '24px', letterSpacing: '-0.16px', alignSelf: 'stretch', backgroundColor: '#F3F3F6' }}>{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Div>
                        </div>
                    </div>

                    {/* Right Column (General Denture) */}
                    <div className="flex items-start justify-center w-full order-1 lg:order-2 border border-white" style={{ backgroundColor: '#515151' }}>
                        <div className="relative flex flex-col items-start w-full px-[5%] md:px-[10%] lg:px-[15%] py-[60px]">
                            <Image
                                src="/assets/implant/implant-4.webp"
                                alt={t('denture.alt')}
                                width={383}
                                height={375}
                                className="object-contain md:object-cover mb-0 md:mb-[36px] mx-auto h-[280px] md:h-[375px]"
                                style={{ width: '383px', aspectRatio: '383/375' }}
                            />
                            <H3
                                style={{ color: '#E0E0E0', fontSize: '18px', fontStyle: 'normal', fontWeight: 500, lineHeight: '26px', letterSpacing: '-0.2px' }}
                                {...(motionEnabled ? fadeUp({ delay: 0.1 }) : {})}
                            >
                                {t('denture.title')}
                            </H3>

                            <Div
                                className="w-full mt-[20px]"
                                {...(motionEnabled ? fadeUp({ delay: 0.2 }) : {})}
                            >
                                <Table className="w-full border-collapse" style={{ borderTop: '1px solid #CFCFCF', borderBottom: '1px solid #CFCFCF' }}>
                                    <TableBody>
                                        {dentureTable.map((row, index) => (
                                            <TableRow key={index} className="border-b" style={{ borderColor: '#CFCFCF', borderBottom: index === dentureTable.length - 1 ? '1px solid #CFCFCF' : undefined }}>
                                                <TableCell className="py-[12px] px-0" style={{ color: '#CFCFCF', textAlign: 'center', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.2px', backgroundColor: '#414141' }}>{row.label}</TableCell>
                                                <TableCell className="py-[12px] pl-[16px] pr-0" style={{ color: '#CFCFCF', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.2px', backgroundColor: '#272727' }}>{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Banner Section (Bottom) */}
            <div className="relative w-full overflow-hidden flex-shrink-0 bg-black">
                <div className="flex flex-col items-center text-center w-full pt-[85px] pb-[97px] bg-black">
                    <P
                        className="pb-[97px] relative z-10 whitespace-pre-line"
                        style={{
                            color: '#FFF',
                            textAlign: 'center',
                            fontSize: '28px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.38px'
                        }}
                        {...(motionEnabled ? fadeUp({ delay: 0.5 }) : {})}
                    >
                        <span className="md:hidden">
                            {t('banner.mobile')}
                        </span>
                        <span className="hidden md:inline">
                            {t('banner.desktop')}
                        </span>
                    </P>

                    {/* Logo or Icon */}
                    <Div
                        className="relative z-10"
                        style={{ width: '148px', height: '27px' }}
                        {...(motionEnabled ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.4, delay: 0.7 } } : {})}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="148" height="27" viewBox="0 0 148 27" fill="none">
                            <path d="M8.10523 14.0788C4.92576 14.27 2.34345 17.2638 2.34345 20.4489V24.3691C2.34345 25.1933 1.67513 25.8616 0.850251 25.8616H0V26.9978H14.6263V20.2088C14.6263 16.6914 11.669 13.8647 8.10523 14.0788Z" fill="white" />
                            <path d="M21.9029 14.0674C18.5124 14.0674 15.7637 16.8162 15.7637 20.2066V26.9981H21.9029C25.2934 26.9981 28.0422 24.2494 28.0422 20.8589V20.2066C28.0422 16.8162 25.2934 14.0674 21.9029 14.0674Z" fill="white" />
                            <path d="M14.6263 0H0V1.13614H0.850251C1.67451 1.13614 2.34283 1.80446 2.34283 2.62873V6.54953C2.34283 9.73457 4.92576 12.7284 8.10461 12.919C11.669 13.1337 14.6263 10.307 14.6263 6.78902V0Z" fill="white" />
                            <path d="M21.9029 0H15.7637V6.79149C15.7637 10.182 18.5124 12.9307 21.9029 12.9307C25.2934 12.9307 28.0422 10.182 28.0422 6.79149V6.13926C28.0422 2.74877 25.2934 0 21.9029 0Z" fill="white" />
                            <path d="M45.9291 21.6707C48.5541 21.6707 50.796 20.4615 50.796 18.102C50.796 15.6534 48.4656 14.3854 45.8703 14.3854H40.4724V21.6707H45.9291ZM45.369 11.6125C48.0231 11.6125 50.0584 10.4033 50.0584 8.10258C50.0584 5.68425 47.7874 4.50417 45.2806 4.50417H40.4724V11.6125H45.369ZM37.3164 1.58398H46.1945C50.8251 1.58398 53.3914 4.29749 53.3914 7.57164C53.3914 9.75481 52.1525 12.0549 49.4687 12.8223V12.8811C52.4477 13.4417 54.1581 15.5358 54.1581 18.3675C54.1581 22.5556 50.3827 24.5909 46.6958 24.5909H37.3164V1.58398Z" fill="white" />
                            <path d="M59.4091 0.994141H56.4004V24.5908H59.4091V0.994141Z" fill="white" />
                            <path d="M79.6719 8.2202H82.6211V11.0222H82.6806C83.9188 8.75115 85.925 7.74805 88.1373 7.74805C91.0865 7.74805 93.977 9.57664 93.977 14.2963V24.5903H90.9683V15.6231C90.9683 12.438 89.6119 10.5797 87.1639 10.5797C84.4497 10.5797 82.6806 12.792 82.6806 15.8001V24.5903H79.6719V8.2202Z" fill="white" />
                            <path d="M109.124 12.371C108.79 10.2689 107.289 7.80041 104.786 7.80041C101.617 7.80041 98.4137 10.8697 98.4137 16.0412C98.4137 21.2794 102.05 24.3494 105.454 24.3494C108.156 24.3494 110.692 22.9812 112.427 19.9781L112.727 20.1451C110.892 23.048 108.624 24.7499 104.753 24.7499C100.349 24.7499 95.7441 21.4799 95.7441 16.0412C95.7441 10.6698 100.349 7.39941 104.753 7.39941C108.456 7.39941 111.46 10.1358 111.793 12.371H109.124Z" fill="white" />
                            <path d="M114.066 24.4149V1.05957H116.736V15.3728C117.703 10.9686 120.506 7.39871 124.209 7.39871C126.612 7.39871 129.014 8.66666 129.014 12.2366V24.4149H126.345V13.0373C126.345 9.20008 125.377 7.79908 123.81 7.79908C120.072 7.79908 116.869 13.0373 116.736 18.1091V24.4149H114.066Z" fill="white" />
                            <path d="M141.657 14.9403C143.559 14.8066 144.392 13.6723 144.392 12.3041C144.392 10.2689 142.558 7.80041 140.055 7.80041C136.886 7.80041 133.683 10.8697 133.683 16.0412C133.683 17.2757 133.883 18.3766 134.25 19.3778C134.584 17.0424 136.552 15.2404 141.657 14.9403ZM134.517 20.0449C135.785 22.8141 138.32 24.3494 140.723 24.3494C143.426 24.3494 145.961 22.9812 147.696 19.9781L147.996 20.1451C146.161 23.048 143.892 24.7499 140.022 24.7499C135.618 24.7499 131.014 21.4799 131.014 16.0412C131.014 10.6698 135.618 7.39941 140.022 7.39941C143.725 7.39941 147.062 10.1358 147.062 12.371C147.062 13.8728 145.394 15.2404 141.691 15.3407C137.387 15.4743 134.65 17.0758 134.517 20.0449Z" fill="white" />
                            <path d="M74.3039 14.027C69.4778 14.1972 64.2438 16.2022 64.2438 21.2319C64.2438 22.5914 64.5836 24.4609 66.7927 24.4609C70.8713 24.4609 73.5904 20.5865 74.3039 16.4398V14.027ZM64.38 13.0753C64.38 8.65695 67.6083 7.19531 71.2111 7.19531C74.5762 7.19531 77.023 8.4874 77.023 12.1242V24.5289H74.3039V18.0376C73.3862 21.2319 70.9054 24.8687 66.2494 24.8687C63.0885 24.8687 61.5254 23.2034 61.5254 20.8247C61.5254 15.7603 69.2402 13.8234 74.3039 13.6873V12.9392C74.3039 9.03072 73.3181 7.60373 70.6671 7.60373C67.9147 7.60373 64.7197 9.03072 64.7197 13.0753H64.38Z" fill="white" />
                        </svg>
                    </Div>
                </div>
            </div>
        </section>
    );
}
