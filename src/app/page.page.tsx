import type { Metadata } from 'next';
import Home from '../pages/Home';

export const metadata: Metadata = {
  title: 'KBEAUTYCHANNEL | 케이뷰티채널 - 김연진 원장',
  description: '1천2백만 뷰, 1000건 이상의 뷰티 영상. 서울대 출신 김연진 원장의 피부 미용 전문 클리닉.',
  alternates: { canonical: 'https://kbeautychannel.com' },
};

export default function Page() {
  return <Home />;
}
