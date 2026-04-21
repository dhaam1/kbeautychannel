import type { Metadata } from 'next';
import Laser from '../../../pages/procedures/laser';

export const metadata: Metadata = {
  title: '피부레이저 시술',
  description: 'KBEAUTYCHANNEL 김연진 원장의 피부레이저 시술. 색소, 모공, 탄력 개선을 위한 정밀 레이저 치료.',
  alternates: { canonical: 'https://kbeautychannel.com/procedures/laser' },
};

export default function Page() {
  return <Laser />;
}
