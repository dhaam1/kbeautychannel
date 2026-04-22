import ProcedurePageTemplate from '../../../components/templates/ProcedurePageTemplate';
import { PROCEDURES } from '../../../constants/procedures';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '피부레이저 | 전문 시술 분야 - 케이뷰티채널',
  description: '피부 본연의 투명함을 되찾는 빛의 과학.',
};

export default function LaserPage() {
  const data = PROCEDURES['laser'];
  return <ProcedurePageTemplate data={data} />;
}
