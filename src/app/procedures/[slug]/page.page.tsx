import { notFound } from 'next/navigation';
import TreatmentHero from '../../../components/sections/TreatmentHero';
import ProcedureDetailIntro from '../../../components/sections/ProcedureDetailIntro';
import ProcedureFeatures from '../../../components/sections/ProcedureFeatures';
import YoutubeEmbed from '../../../components/sections/YoutubeEmbed';
import FooterCTA from '../../../components/sections/FooterCTA';
import { PROCEDURES } from '../../../constants/procedures';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const procedure = PROCEDURES[slug];
  
  if (!procedure) {
    return {
      title: '페이지를 찾을 수 없습니다',
    };
  }

  return {
    title: `${procedure.title} ${procedure.titleItalic || ''} | 전문 시술 분야 - 케이뷰티채널`,
    description: procedure.description,
  };
}

export default async function ProcedurePage({ params }: Props) {
  const { slug } = await params;
  const procedure = PROCEDURES[slug];

  if (!procedure) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <TreatmentHero 
        category={procedure.category}
        title={procedure.title}
        titleItalic={procedure.titleItalic}
        description={procedure.description}
        bgImage={procedure.heroBg}
        reservationLink={procedure.reservationLink}
      />
      
      {/* 주요 시술 기계 상세 소개 섹션 (3가지 시안 포함) */}
      {procedure.features && procedure.features.length > 0 && (
        <ProcedureDetailIntro feature={procedure.features[0]} />
      )}
      <ProcedureFeatures 
        title={procedure.featuresTitle}
        subtitle={procedure.featuresSubtitle}
        description={procedure.featuresDescription}
        features={procedure.features}
        bgImage={procedure.featuresBg}
      />
      <div className="relative z-10 bg-white">
        <YoutubeEmbed />
        <FooterCTA />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(PROCEDURES).map((slug) => ({
    slug: slug,
  }));
}
