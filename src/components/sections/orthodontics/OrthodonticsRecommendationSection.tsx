import { cn } from '@/lib/utils';
import Image from 'next/image';
import { OrthodonticsBannerSection } from './OrthodonticsBannerSection';

/**
 * Table 컴포넌트들 (복제본 - 의존성 제거)
 */
const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);

const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
);

const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
);

const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
);

const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
);

import { useLocale } from 'next-intl';

/**
 * 추천 섹션 컴포넌트
 * ImplantLocationSection을 기반으로 복제 (의존성 제거)
 */
export function OrthodonticsRecommendationSection() {
    const locale = useLocale();
    const isEn = locale === 'en';
    return (
        <section className="relative w-full flex flex-col items-center justify-center overflow-visible bg-black">
            {/* Top Section */}
            <div
                className="flex flex-col items-start w-full mx-auto pl-[30px] md:pl-[80px] pr-0 pt-[60px] md:pt-[80px] pb-0 overflow-visible"
                style={{ maxWidth: '1472px' }}
            >
                <h2
                    style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.18px',
                    }}
                >
                    {isEn ? 'Clear Aligners vs. Invisalign' : '투명교정 vs 인비절라인'}
                </h2>
                <p
                    className="overflow-visible whitespace-pre-line"
                    style={{
                        color: '#ffffff',
                        fontSize: '28px',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.35px',
                        marginTop: '10px',
                    }}
                >
                    {isEn ? <>Invisalign Orthodontics,{'\n'}different from regular clear aligners</> : <>인비절라인 치아교정,{'\n'}일반 투명교정과 다릅니다</>}
                </p>
                <p
                    className="mt-[24px] md:mt-[24x] whitespace-pre-line"
                    style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '30px',
                        letterSpacing: '-0.18px',
                    }}
                >
                    {isEn ? <>Not all clear aligners are the same.{'\n'}There is a significant difference in{'\n'}technology, materials, and treatment scope.</> : <>투명교정이 모두 같은 투명교정이 아닙니다.{'\n'}기술력, 소재, 교정가능범위에서{'\n'}큰 차이가 있습니다.</>}
                </p>
            </div>

            {/* Content Grid - 인비절라인 vs 일반 투명교정 비교 */}
            <div
                className="w-full px-[30px] md:px-[80px] pt-[70px] pb-0 mx-auto overflow-visible"
                style={{ maxWidth: '1472px' }}
            >
                <div
                    className="relative grid grid-cols-1 lg:grid-cols-2 w-full mx-auto h-auto overflow-visible gap-[30px] lg:gap-0 lg:border lg:border-white"
                    style={{ maxWidth: '1472px', background: '#FEFEFE' }}
                >
                    {/* 왼쪽: 인비절라인 (모바일에서 아래로) */}
                    <div className="flex items-start justify-center w-full bg-white order-2 lg:order-1 border-r-0 lg:border-r border-white">
                        <div className="relative flex flex-col items-start w-full px-[5%] md:px-[10%] lg:px-[15%] py-[60px] gap-[30px] md:gap-0">
                            {/* 이미지 */}
                            <div
                                className="relative mb-0 md:mb-[36px] w-full max-w-full sm:max-w-[300px] md:max-w-[383px] mx-auto"
                                style={{ height: 'auto', aspectRatio: '383/375' }}
                            >
                                <Image
                                    alt="인비절라인 투명교정 장치, SmartTrack 소재와 ClinCheck 시스템 기반 정밀 교정"
                                    src="/assets/asset-126.webp"
                                    fill
                                    className="object-contain"
                                    style={{ aspectRatio: '383/375' }}
                                />
                            </div>

                            {/* 텍스트 + 표 */}
                            <h3
                                className="text-[18px] sm:text-[19px] md:text-[20px]"
                                style={{
                                    color: 'rgb(0, 0, 0)',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: '26px',
                                    letterSpacing: '-0.2px',
                                    opacity: 1,
                                    transform: 'none',
                                }}
                            >
                                {isEn ? 'Invisalign' : '인비절라인 | Invisalign'}
                            </h3>
                            <div className="w-full mt-0 md:mt-[20px]" style={{ opacity: 1, transform: 'none' }}>
                                <Table
                                    className="border-collapse min-w-full"
                                    style={{ borderTop: '1px solid #fff', borderBottom: '1px solid #fff' }}
                                >
                                    <TableBody>
                                        <TableRow style={{ borderColor: '#fff' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#FFF',
                                                }}
                                            >
                                                {isEn ? 'Manufacturing' : '제조'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    letterSpacing: '-0.16px',
                                                    alignSelf: 'stretch',
                                                    backgroundColor: '#F3F3F6',
                                                }}
                                            >
                                                {isEn ? 'US Headquarters (AI & Robot Automated)' : '미국 본사 (AI 및 로봇 일괄 제작)'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{ borderColor: '#fff' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#FFF',
                                                }}
                                            >
                                                {isEn ? 'Material' : '소재'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    letterSpacing: '-0.16px',
                                                    alignSelf: 'stretch',
                                                    backgroundColor: '#F3F3F6',
                                                }}
                                            >
                                                {isEn ? 'SmartTrack (Excellent elasticity & adhesion)' : '특허 SmartTrack (탄성·밀착력 우수)'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{ borderColor: '#fff' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#FFF',
                                                }}
                                            >
                                                {isEn ? 'Scope' : '범위'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    letterSpacing: '-0.16px',
                                                    alignSelf: 'stretch',
                                                    backgroundColor: '#F3F3F6',
                                                }}
                                            >
                                                {isEn ? 'Protruding teeth, Malocclusion (Complex Cases)' : '돌출입, 부정교합 등 복합 케이스'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{ borderColor: '#fff' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#FFF',
                                                }}
                                            >
                                                {isEn ? 'System' : '시스템'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    letterSpacing: '-0.16px',
                                                    alignSelf: 'stretch',
                                                    backgroundColor: '#F3F3F6',
                                                }}
                                            >
                                                {isEn ? 'Full process simulation via ClinCheck' : 'ClinCheck 소프트웨어로 전 과정 시뮬레이션'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{ borderBottom: '1px solid #fff' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#FFF',
                                                }}
                                            >
                                                {isEn ? 'Fixation' : '고정'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#000',
                                                    fontStyle: 'normal',
                                                    fontWeight: 600,
                                                    letterSpacing: '-0.16px',
                                                    alignSelf: 'stretch',
                                                    backgroundColor: '#F3F3F6',
                                                }}
                                            >
                                                {isEn ? 'Precise control with attachments' : '어태치먼트 부착으로 정밀 제어'}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 일반 투명교정 (모바일에서 위로) */}
                    <div className="flex items-start justify-center w-full order-1 lg:order-2" style={{ backgroundColor: '#4C4C4C' }}>
                        <div
                            className="relative flex flex-col items-start w-full px-[5%] md:px-[10%] lg:px-[15%] py-[60px] gap-[30px] md:gap-0"
                            style={{ backgroundColor: '#4C4C4C' }}
                        >
                            {/* 이미지 */}
                            <div
                                className="mb-0 md:mb-[36px] w-full max-w-full sm:max-w-[300px] md:max-w-[383px] mx-auto"
                                style={{ backgroundColor: '#272727', height: 'auto', aspectRatio: '383/375' }}
                            >
                                <div className="relative w-full h-full" style={{ aspectRatio: '383/375' }}>
                                    <Image
                                        alt="일반 투명교정 장치, 플라스틱 소재 기반의 단순 케이스 교정 방식"
                                        src="/assets/asset-127.webp"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* 텍스트 + 표 */}
                            <h3
                                className="text-[18px] sm:text-[19px] md:text-[20px]"
                                style={{
                                    color: 'rgb(224, 224, 224)',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: '26px',
                                    letterSpacing: '-0.2px',
                                    opacity: 1,
                                    transform: 'none',
                                }}
                            >
                                {isEn ? 'Regular Clear Aligners' : '일반 투명교정'}
                            </h3>
                            <div className="w-full mt-0 md:mt-[20px]" style={{ opacity: 1, transform: 'none' }}>
                                <Table
                                    className="border-collapse min-w-full"
                                    style={{ borderTop: '1px solid #CFCFCF', borderBottom: '1px solid #CFCFCF' }}
                                >
                                    <TableBody>
                                        <TableRow style={{ borderColor: '#CFCFCF' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#414141',
                                                }}
                                            >
                                                {isEn ? 'Manufacturing' : '제조'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#272727',
                                                }}
                                            >
                                                {isEn ? 'Local/Overseas Labs (Manual/Small-scale)' : '국내외 기공소 (수동/소규모)'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{ borderColor: '#CFCFCF' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#414141',
                                                }}
                                            >
                                                {isEn ? 'Material' : '소재'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#272727',
                                                }}
                                            >
                                                {isEn ? 'Standard Plastic (PET-G)' : '일반 플라스틱 (PET-G)'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{ borderColor: '#CFCFCF' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#414141',
                                                }}
                                            >
                                                {isEn ? 'Scope' : '범위'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#272727',
                                                }}
                                            >
                                                {isEn ? 'Mild simple cases like front teeth' : '앞니 등 경미한 단순 케이스'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{ borderColor: '#CFCFCF' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#414141',
                                                }}
                                            >
                                                {isEn ? 'System' : '시스템'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#272727',
                                                }}
                                            >
                                                {isEn ? 'Step-by-step molding' : '단계별로 본을 떠서 제작'}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow style={{ borderBottom: '1px solid #CFCFCF' }}>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] px-[8px] sm:px-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    textAlign: 'center',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#414141',
                                                }}
                                            >
                                                {isEn ? 'Fixation' : '고정'}
                                            </TableCell>
                                            <TableCell
                                                className="py-[10px] sm:py-[12px] pl-[12px] sm:pl-[16px] pr-[8px] sm:pr-0 text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px]"
                                                style={{
                                                    color: '#CFCFCF',
                                                    fontStyle: 'normal',
                                                    fontWeight: 400,
                                                    letterSpacing: '-0.16px',
                                                    backgroundColor: '#272727',
                                                }}
                                            >
                                                {isEn ? 'Movement purely by appliance force' : '장치의 힘으로만 이동'}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner Section (inside this section, at bottom) */}
            <OrthodonticsBannerSection />
        </section>
    );
}
