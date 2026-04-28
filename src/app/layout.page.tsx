import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: {
    default: 'KBEAUTYCHANNEL | 케이뷰티채널 - 김연진 원장',
    template: '%s | KBEAUTYCHANNEL',
  },
  description:
    '1천2백만 뷰, 1000건 이상의 뷰티 영상. 서울대 출신 김연진 원장의 피부 미용 전문 클리닉. 리프팅, 필러, 스킨부스터, 피부레이저 전문.',
  keywords: [
    '케이뷰티채널',
    '김연진 원장',
    '피부과',
    '미용 클리닉',
    '리프팅',
    '필러',
    '스킨부스터',
    '피부레이저',
    '강남 피부과',
  ],
  authors: [{ name: '김연진' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://kbeautychannel.com',
    siteName: 'KBEAUTYCHANNEL',
    title: 'KBEAUTYCHANNEL | 케이뷰티채널 - 김연진 원장',
    description:
      '1천2백만 뷰, 1000건 이상의 뷰티 영상. 서울대 출신 김연진 원장의 피부 미용 전문 클리닉.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'KBEAUTYCHANNEL',
  description: '서울대 출신 김연진 원장의 피부 미용 전문 클리닉',
  url: 'https://kbeautychannel.com',
  sameAs: ['https://www.youtube.com/@kbeautychannel'],
  founder: {
    '@type': 'Physician',
    name: '김연진',
    medicalSpecialty: 'Dermatology',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: '서울대학교',
    },
  },
};

import SnapController from '../components/layout/SnapController';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SnapController />
        {children}
      </body>
    </html>
  );
}
