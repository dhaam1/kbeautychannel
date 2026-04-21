import type { Metadata } from 'next';
import Lifting from '../../../pages/procedures/lifting';

export const metadata: Metadata = {
  title: '리프팅 시술',
  description: 'KBEAUTYCHANNEL 김연진 원장의 리프팅 시술. SMAS층 깊이의 미학, 근본적인 처짐을 해결하는 전문 리프팅.',
  alternates: { canonical: 'https://kbeautychannel.com/procedures/lifting' },
};

export default function Page() {
  return <Lifting />;
}
