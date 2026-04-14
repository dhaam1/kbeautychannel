'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';

const getOrthodonticTypes = (isEn: boolean) => [
    {
        name: isEn ? 'Adult Orthodontics' : '성인교정',
        image: '/assets/asset-122.webp',
        description: isEn ? 'We improve teeth alignment, jaw contour,\nand chewing function.' : '치아 배열, 턱 라인,\n씹는 기능까지 개선합니다.',
        features: isEn ? [
            'Minimized pain with Clippy-C and Invisalign',
            '2 to 6 months shorter than traditional braces',
            'Simultaneous jaw contour improvement',
        ] : [
            '클리피씨, 인비절라인으로 통증 최소화',
            '일반 교정 대비 2~6개월 단축',
            '턱 라인까지 함께 개선',
        ],
        alt: '블랑쉬치과 성인 치아교정 이미지, 치아 배열과 턱 라인을 함께 고려한 교정 치료',
    },
    {
        name: isEn ? 'Pediatric Orthodontics' : '어린이 교정',
        image: '/assets/asset-123.webp',
        description: isEn ? 'Careful orthodontic treatment is crucial\nduring jawbone and facial development.' : '턱뼈와 얼굴형이 만들어지는 시기,\n세심한 교정이 필요합니다.',
        features: isEn ? [
            'Guides normal permanent teeth development',
            'Balanced facial profile and shape',
            'Invisalign First available',
        ] : [
            '영구치 정상 발달 유도',
            '균형 잡힌 안모와 얼굴형',
            '인비절라인 퍼스트 가능',
        ],
        alt: '블랑쉬치과 어린이 치아교정 이미지, 성장 단계에 맞춰 턱과 치열을 교정하는 치료',
    },
    {
        name: isEn ? 'Partial Orthodontics (Front Teeth)' : '부분교정(앞니교정)',
        image: '/assets/asset-124.webp',
        description: isEn ? 'If full orthodontics feels burdensome,\nwe can focus solely on the necessary areas.' : '전체 교정이 부담스럽다면,\n필요한 부분만 집중 교정할 수 있습니다.',
        features: isEn ? [
            'Short-term treatment possible in 3 months',
            'Low burden with minimal appliances',
            'Invisible using lingual (inner) braces',
        ] : [
            '3개월 단기 교정 가능',
            '최소 장치로 낮은 부담',
            '설측(안쪽)교정으로 티 안 나게',
        ],
        alt: '블랑쉬치과 부분교정 이미지, 앞니 중심으로 필요한 부위만 교정하는 치아교정',
    },
];

export function OrthodonticsLocationSection() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const ORTHODONTIC_TYPES = getOrthodonticTypes(isEn);
    return (
        <div className="relative w-full bg-white">
            {/* 첫 번째 섹션: 블랑쉬치과 차별점 */}
            <div className="relative w-full bg-[#F7F8F8]">
                <div className="w-full mx-auto" style={{ maxWidth: '1472px' }}>
                    {/* Header */}
                    <div className="flex flex-col items-start w-full pt-[60px] md:pt-[67px] pb-[67px] pl-[30px] md:pl-[80px]">
                        <h2 className="pb-[15px] text-black text-left text-[18px] font-normal leading-[30px] tracking-[-0.18px]">
                            {isEn ? 'The Blanche Difference' : '블랑쉬치과 차별점'}
                        </h2>
                        <p className="whitespace-pre-line text-black text-left text-[28px] font-medium leading-normal tracking-[-0.28px]">
                            {isEn ? <>Orthodontics is one of the treatments{'\n'}Blanche Dental Clinic{'\n'}is most confident in.</> : <>교정은 블랑쉬치과가{'\n'}가장 자신 있는 진료 중{'\n'}하나입니다.</>}
                        </p>
                    </div>

                    {/* 구분선 */}
                    <div className="w-full px-[30px] md:px-[80px]">
                        <div className="w-full h-[1px] bg-white" />
                    </div>

                    {/* 2컬럼 차별점 */}
                    <div className="w-full px-[30px] md:px-[80px] pt-[60px] pb-[60px] md:pb-[100px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[60px]">
                            <div className="flex flex-col">
                                <h3 className="mb-4 text-black text-[22px] font-medium leading-normal tracking-[-0.22px]">
                                    {isEn ? <>The dentist personally consults{'\n'}and attaches the appliances</> : <>치과의사가 직접 상담하고{'\n'}장치를 부착합니다</>}
                                </h3>
                                <p className="whitespace-pre-line text-black/70 text-[17px] font-normal leading-[28px] tracking-[-0.17px]">
                                    {isEn ? <>Orthodontics is a life-designing treatment.{'\n'}To ensure this, Blanche's dentists conduct{'\n'}consultations lasting over an hour per patient.</> : <>교정은 인생을 설계하는 진료입니다.{'\n'}이를 위해, 블랑쉬치과는 치과의사가{'\n'}1시간 이상 환자분과 상담을 진행합니다.</>}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="mb-4 text-black text-[22px] font-medium leading-normal tracking-[-0.22px]">
                                    {isEn ? <>1:1{'\n'}Private Care</> : <>1:1{'\n'}프라이빗 진료</>}
                                </h3>
                                <p className="whitespace-pre-line text-black/70 text-[17px] font-normal leading-[28px] tracking-[-0.17px]">
                                    {isEn ? <>Rejecting factory-style treatments,{'\n'}we provide tailored care for each patient,{'\n'}achieving 100% satisfaction for 7 consecutive years.</> : <>공장형 진료를 지양하고{'\n'}환자분의 상황에 맞는 맞춤형 진료를 진행해{'\n'}7년 연속 만족도 100%를 이뤄나가고 있습니다.</>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 두 번째 섹션: 상황별 치아교정 */}
            <div className="relative w-full bg-white">
                {/* Header */}
                <div className="w-full mx-auto" style={{ maxWidth: '1472px' }}>
                    <div className="flex flex-col items-start w-full pt-[60px] md:pt-[67px] pb-[77px] pl-[30px] md:pl-[80px]">
                        <h2 className="pb-[15px] text-black text-left text-[18px] font-normal leading-[30px] tracking-[-0.18px]">
                            {isEn ? 'Orthodontics by Case' : '상황별 치아교정'}
                        </h2>
                        <p className="whitespace-pre-line text-black text-left text-[28px] font-medium leading-normal tracking-[-0.28px]">
                            {isEn ? <>We design the optimal orthodontics{'\n'}for your specific situation and age</> : <>상황, 연령에 맞는{'\n'}최적의 교정을 설계합니다</>}
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="w-full bg-white">
                    <div className="w-full mx-auto" style={{ maxWidth: '1472px' }}>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-3">
                            {ORTHODONTIC_TYPES.map((type, index) => (
                                <div
                                    key={index}
                                    className="relative shrink-0 flex flex-col overflow-hidden bg-white"
                                >
                                    {/* 이미지 */}
                                    <div className="relative w-full h-[314px] overflow-hidden bg-black">
                                        <Image
                                            alt={type.alt}
                                            src={type.image}
                                            fill
                                            className="object-cover min-[1472px]:object-contain"
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>

                                    {/* 텍스트 */}
                                    <div className="w-full h-[320px] pt-6 pl-[30px] pr-6 pb-[48px] md:pl-[80px] md:pt-8 md:pr-8 md:pb-8 flex flex-col justify-start bg-white">
                                        <h3 className="text-left mb-4 text-black text-[22px] font-medium leading-normal tracking-[-0.22px]">
                                            {type.name}
                                        </h3>
                                        <p className="text-left whitespace-pre-line mb-4 text-black/70 text-[17px] font-normal leading-[20px] tracking-[-0.17px]">
                                            {type.description}
                                        </p>
                                        <ul className="space-y-2 text-black/70 text-[17px] font-normal leading-[20px] tracking-[-0.17px]">
                                            {type.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="mr-2 text-black/40">•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
