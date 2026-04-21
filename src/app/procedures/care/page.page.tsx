import type { Metadata } from 'next';
import Care from '../../../pages/procedures/care';

export const metadata: Metadata = {
  title: '피부 케어',
  description: 'KBEAUTYCHANNEL 김연진 원장의 피부 케어. 피부 본연의 건강함을 되찾는 맞춤 케어 솔루션.',
  alternates: { canonical: 'https://kbeautychannel.com/procedures/care' },
};

export default function Page() {
  return <Care />;
}
