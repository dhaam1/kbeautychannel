import type { Metadata } from 'next';
import Column from '../../pages/column';

export const metadata: Metadata = {
  title: 'DR.KIM 칼럼',
  description: '김연진 원장이 직접 전하는 피부 미용 전문 칼럼. 인터넷에서 얻을 수 없는 정보를 KBEAUTYCHANNEL에서 확인하세요.',
  alternates: { canonical: 'https://kbeautychannel.com/column' },
};

export default function Page() {
  return <Column />;
}
