'use client';

import {
    CasesHeroSection,
    CasesPhilosophySection,
    CasesLaminateSection,
    CasesImplantSection,
    CasesOrthodonticsSection,
    CasesReviewsSection,
    CasesPhilosophyDetailsSection,
    CasesCTASection,
} from './components';

export default function CasesPageClient() {
    return (
        <div className="relative">
            {/* 히어로 섹션: 배경 이미지와 메인 타이틀 */}
            <CasesHeroSection />

            {/* 패럴랙스 효과를 위한 메인 콘텐츠 컨테이너 */}
            <div className="relative z-30 -mt-[200svh] md:-mt-[240svh] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] bg-white">
                {/* 진료 철학 섹션: 배경 이미지와 진료 철학 텍스트 */}
                <CasesPhilosophySection />

                {/* 라미네이트 치료 사례 섹션 */}
                <CasesLaminateSection />

                {/* 구분선 */}
                <div className="w-full h-[1px] bg-white" />

                {/* 임플란트 치료 사례 섹션 */}
                <CasesImplantSection />

                {/* 구분선 */}
                <div className="w-full h-[1px] bg-white" />

                {/* 치아교정 치료 사례 섹션 */}
                <CasesOrthodonticsSection />

                {/* 환자 후기 섹션 */}
                <CasesReviewsSection />

                {/* 블랑쉬 철학 상세 섹션 */}
                <CasesPhilosophyDetailsSection />

                {/* 상담 예약 신청 CTA 섹션 */}
                <CasesCTASection />
            </div>
        </div>
    );
}
