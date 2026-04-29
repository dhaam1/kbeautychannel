import ProcedurePageTemplate from '../../components/templates/ProcedurePageTemplate';
import ProcedureCollectionSection from '../../components/sections/ProcedureCollectionSection';
import { PROCEDURES } from '../../constants/procedures';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '리프팅 컬렉션 | 케이뷰티채널',
  description: 'UHCELL이 제안하는 최상위 리프팅 라인업.',
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
        titleSize: 'md:text-[48px] text-[32px]',
        descSize: 'md:text-[24px] text-[18px]'
      }}
      middleSection={
        <ProcedureCollectionSection features={data.features} />
      }
    />
  );
}
