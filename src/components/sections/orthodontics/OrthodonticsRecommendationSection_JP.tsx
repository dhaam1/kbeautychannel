import { cn } from '@/lib/utils';
import Image from 'next/image';
import { OrthodonticsBannerSection_JP } from './OrthodonticsBannerSection_JP';

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

/**
 * 추천 섹션 컴포넌트 (일본어)
 * ImplantLocationSection을 기반으로 복제 (의존성 제거)
 */
export function OrthodonticsRecommendationSection_JP() {
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
                    マウスピース矯正 vs インビザライン
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
                    インビザライン歯列矯正、{'\n'}
                    一般のマウスピース矯正とは異なります
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
                    マウスピース矯正はすべて同じではありません。{'\n'}
                    技術力、素材、矯正可能範囲において{'\n'}
                    大きな差があります。
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
                                    alt=""
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
                                インビザライン | Invisalign
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
                                                製造
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
                                                米国本社 (人工知能(AI)及びロボットによる一括製作)
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
                                                素材
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
                                                特許取得済みのSmartTrack (弾性と密着力に優れる)
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
                                                範囲
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
                                                抜歯、不正咬合などの複雑な症例も可能
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
                                                システム
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
                                                ClinCheckソフトウェアで全過程シミュレーション
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
                                                固定
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
                                                アタッチメント装着による歯の移動の精密制御
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
                                        alt=""
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
                                一般のマウスピース矯正
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
                                                製造
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
                                                国内外の歯科技工所 (手作業/小規模製作)
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
                                                素材
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
                                                一般的なプラスチック素材 (PET-G)
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
                                                範囲
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
                                                前歯などの軽微な単純症例に限定
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
                                                システム
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
                                                段階ごとに型取りして製作
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
                                                固定
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
                                                装置の力だけで移動 (制御に限界)
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
            <OrthodonticsBannerSection_JP />
        </section>
    );
}
