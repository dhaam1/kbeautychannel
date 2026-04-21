import type { Metadata } from 'next';
import SkinBooster from '../../../pages/procedures/skin-booster';

export const metadata: Metadata = {
  title: '스킨부스터 시술',
  description: 'KBEAUTYCHANNEL 김연진 원장의 스킨부스터 시술. 피부 속부터 차오르는 본연의 빛과 수분감.',
  alternates: { canonical: 'https://kbeautychannel.com/procedures/skin-booster' },
};

export default function Page() {
  return <SkinBooster />;
}
