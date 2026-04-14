import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function SolutionGridSection1() {
    const t = useTranslations('solutionGrid1');

    const aestheticProcedures = [
        {
            id: 'gummySmile',
            image: '/assets/asset-140.webp',
            alt: "블랑쉬치과 거미스마일 보톡스 시술을 통해 웃을 때 잇몸 노출을 완화한 입 주변 이미지"
        },
        {
            id: 'vestibuloplasty',
            image: '/assets/asset-141.webp',
            alt: "블랑쉬치과 구강전정술로 스마일 라인의 균형을 고려한 입술과 치아 이미지"
        },
        {
            id: 'lipFiller',
            image: '/assets/asset-142.webp',
            alt: "블랑쉬치과 입술 필러 시술로 입술 볼륨과 라인을 표현한 이미지"
        }
    ];

    return (
        <div className="relative w-full" style={{ backgroundColor: '#F7F8F8' }}>
            {/* 1행: Header */}
            <div className="relative w-full overflow-hidden flex-shrink-0 bg-[#F7F8F8]">
                <div className="w-full mx-auto" style={{ maxWidth: '1472px' }}>
                    <div className="flex flex-col items-start w-full pt-[60px] md:pt-[67px] pb-[77px] pl-[30px] md:pl-[80px] bg-[#F7F8F8]">
                        <h2
                            className="pb-[15px] relative z-10"
                            style={{ color: 'rgb(0, 0, 0)', textAlign: 'left', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '30px', letterSpacing: '-0.18px', opacity: 1, transform: 'none' }}
                        >
                            {t('category')}
                        </h2>
                        <p
                            className="relative z-10 whitespace-pre-line"
                            style={{ color: 'rgb(0, 0, 0)', textAlign: 'left', fontSize: '28px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.28px', opacity: 1, transform: 'none' }}
                        >
                            <span className="md:hidden">{t('title')}</span>
                            <span className="hidden md:inline">{t('title')}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* 2행: Brands Grid */}
            <div className="w-full bg-[#F7F8F8] border-t border-b border-white">
                <div className="w-full mx-auto" style={{ maxWidth: '1472px' }}>
                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 bg-white border-l border-r border-white">
                        {aestheticProcedures.map((procedure, index) => (
                            <div
                                key={procedure.id}
                                className={`relative shrink-0 flex flex-col overflow-hidden bg-[#F7F8F8] border-b border-white lg:border-b-0 ${index < aestheticProcedures.length - 1 ? 'lg:border-r lg:border-white' : ''}`}
                                style={{ height: 'auto', minHeight: '400px' }}
                            >
                                <div className="relative w-full flex flex-col h-full">
                                    {/* 이미지 영역 */}
                                    <div className="relative w-full h-[314px] overflow-hidden bg-black">
                                        <Image
                                            alt={procedure.alt}
                                            src={procedure.image}
                                            fill
                                            className="object-cover min-[1472px]:object-contain"
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    {/* 텍스트 영역 */}
                                    <div className="relative w-full h-[320px] pt-6 pl-[30px] pr-6 pb-[48px] md:pl-[80px] md:pt-8 md:pr-8 md:pb-8 flex flex-col justify-start bg-[#F7F8F8]">
                                        <h3
                                            className="text-left mb-4 font-['Pretendard']"
                                            style={{ color: 'rgb(0, 0, 0)', fontSize: '22px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '-0.22px', opacity: 1, transform: 'none' }}
                                        >
                                            {t(`items.${procedure.id}.name`)}
                                        </h3>
                                        <p
                                            className="text-left whitespace-pre-line mb-4 font-['Pretendard']"
                                            style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.16px', opacity: 1, transform: 'none' }}
                                        >
                                            {t(`items.${procedure.id}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
