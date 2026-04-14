import type { Metadata } from 'next';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { ClientOnlyComponents } from '@/components/layouts/ClientOnlyComponents';
import { getTranslations } from 'next-intl/server';
import { getSiteUrl } from '@/lib/utils';
import ConsultationForm from './ConsultationForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const isJp = locale === 'jp';

  const title = locale === 'en' ? 'Blanche Dental Clinic | Consultation' : isJp ? 'ブランシュ歯科 | 相談予約' : '블랑쉬치과 의원 | 상담 예약';
  const description = locale === 'en'
    ? 'Get professional dental consultation at Blanche Dental Clinic. We provide accurate diagnosis and customized treatment plans.'
    : isJp
    ? 'ブランシュ歯科で専門的な歯科相談を受けてみてください。正確な診断とカスタマイズされた治療方針をご提案いたします。'
    : '블랑쉬치과에서 전문적인 치과 상담을 받아보세요. 정확한 진단과 맞춤형 치료 방향을 제안해드립니다.';
  const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      languages: {
        'ko': `${siteUrl}/consultation`,
        'ja': `${siteUrl}/jp/consultation`,
        'x-default': `${siteUrl}/consultation`
      }
    },
    openGraph: {
      title,
      description,
      siteName: isJp ? 'ブランシュ歯科' : '블랑쉬치과 의원',
      locale: isJp ? 'ja_JP' : 'ko_KR',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ConsultationPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      {/* 1. min-h-screen으로 전체 화면 높이 확보 */}
      <div className="relative min-h-screen bg-[#F7F8F8] flex flex-col">
        <Header />

        {/* 2. main 설정 (가장 중요)
            - flex-grow: 헤더/푸터 사이 빈 공간을 모두 채움
            - flex-col: 세로 배치
            - justify-end: 내용을 무조건 '아래쪽' 끝으로 밀어버림
            - pb-0: 하단 여백 0 (푸터와 딱 붙음)
            - pt-[100px]: 헤더와 겹치지 않도록 최소한의 상단 여백
        */}
        <main className="flex-grow w-full flex flex-col justify-end pt-[100px] pb-0">
          <ConsultationForm />
        </main>

        <Footer breadcrumbs={[
          { label: tCommon('home'), href: '/' },
          { label: tNav('consultationBtn'), href: '/consultation' }
        ]} />
      </div>
    </>
  );
}