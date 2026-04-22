import ProcedurePageTemplate from '../../../components/templates/ProcedurePageTemplate';
import { PROCEDURES } from '../../../constants/procedures';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '쁘띠 시술 | 전문 시술 분야 - 케이뷰티채널',
  description: '섬세한 터치로 완성되는 우아한 입체감.',
};

export default function PetitPage() {
  const data = PROCEDURES['petit'];
  return <ProcedurePageTemplate data={data} />;
}
