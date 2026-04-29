import ProcedurePageTemplate from '../../../components/templates/ProcedurePageTemplate';
import ProcedureCollectionSection from '../../../components/sections/ProcedureCollectionSection';
import SkinBoosterHero from '../../../components/sections/SkinBoosterHero';
import { PROCEDURES } from '../../../constants/procedures';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '스킨부스터 | 전문 시술 분야 - 케이뷰티채널',
  description: '피부 속 깊은 곳까지 전달되는 수분과 영양.',
};

export default function SkinBoosterPage() {
  const data = PROCEDURES['skin-booster'];
  return (
    <ProcedurePageTemplate 
      data={data} 
      customHero={<SkinBoosterHero />}
      middleSection={
        <ProcedureCollectionSection 
          features={data.features} 
          sectionTitle="Skin Collection"
        />
      }
    />
  );
}
