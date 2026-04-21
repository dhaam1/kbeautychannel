import type { Metadata } from 'next';
import Body from '../../../pages/procedures/body';

export const metadata: Metadata = {
  title: '바디 시술',
  description:
    'KBEAUTYCHANNEL 김연진 원장의 바디 시술. 체형 교정과 바디라인을 위한 전문 바디 케어.',
  alternates: { canonical: 'https://kbeautychannel.com/procedures/body' },
};

export default function Page() {
  return <Body />;
}
