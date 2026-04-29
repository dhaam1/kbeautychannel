import ProcedurePageTemplate from '../../../components/templates/ProcedurePageTemplate';
import ProcedureCollectionSection from '../../../components/sections/ProcedureCollectionSection';
import { PROCEDURES } from '../../../constants/procedures';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '바디 | 전문 시술 분야 - 케이뷰티채널',
  description: '건강하고 균형 잡힌 바디 라인의 완성.',
};

export default function BodyPage() {
  const data = PROCEDURES['body'];
  return (
    <ProcedurePageTemplate 
      data={data} 
      middleSection={
        <ProcedureCollectionSection 
          features={data.features} 
          sectionTitle="Body Collection"
        />
      }
    />
  );
}
