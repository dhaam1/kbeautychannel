import ProcedurePageTemplate from '../../components/templates/ProcedurePageTemplate';
import { PROCEDURES } from '../../constants/procedures';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '써마지 FLX | 전문 시술 분야 - 케이뷰티채널',
  description: '피부 본연의 아름다움을 깨우는 혁신적인 탄력 솔루션.',
};

export default function LiftingPage() {
  const data = PROCEDURES['thermage'];
  return (
    <ProcedurePageTemplate 
      data={data} 
      heroOptions={{
        bgVideo: '/videos/lifting-hero.webm',
        mainCopy: 'UHCELL에는\n어제 나온 장비도 다 있다.',
        subCopy: '앞서가는 여러분께 어울리는 건 오직 UHCELL뿐',
        isCenter: false,
        isDarkText: true,
        hideButton: true,
        isSplitLayout: true,
        titleSize: 'md:text-[54px] text-[32px]',
        descSize: 'md:text-[24px] text-[18px]'
      }}
    />
  );
}
