import ProcedurePageTemplate from '../../../components/templates/ProcedurePageTemplate';
import { PROCEDURES } from '../../../constants/procedures';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '케어 | 전문 시술 분야 - 케이뷰티채널',
  description: '지친 피부에 선사하는 깊은 휴식과 재생.',
};

export default function CarePage() {
  const data = PROCEDURES['care'];
  return <ProcedurePageTemplate data={data} />;
}
