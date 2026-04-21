import type { Metadata } from 'next';
import Petit from '../../../pages/procedures/petit';

export const metadata: Metadata = {
  title: '쁘띠 시술',
  description:
    'KBEAUTYCHANNEL 김연진 원장의 쁘띠 시술. 자연스러운 윤곽과 볼륨을 위한 섬세한 필러·보톡스 시술.',
  alternates: { canonical: 'https://kbeautychannel.com/procedures/petit' },
};

export default function Page() {
  return <Petit />;
}
