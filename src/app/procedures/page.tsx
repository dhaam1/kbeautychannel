import type { Metadata } from 'next';
import ProceduresIndex from '../../pages/procedures/index';

export const metadata: Metadata = {
  title: '전문 시술 분야',
  description:
    'KBEAUTYCHANNEL의 프리미엄 맞춤 시술 영역. 리프팅, 스킨부스터, 쁘띠 시술, 피부레이저, 바디, 케어.',
  alternates: { canonical: 'https://kbeautychannel.com/procedures' },
};

export default function Page() {
  return <ProceduresIndex />;
}
