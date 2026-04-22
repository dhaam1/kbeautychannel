import TreatmentHero from '../sections/TreatmentHero';
import ProcedureFeatures from '../sections/ProcedureFeatures';
import YoutubeEmbed from '../sections/YoutubeEmbed';
import FooterCTA from '../sections/FooterCTA';
import { ProcedureData } from '../../constants/procedures';

interface ProcedurePageTemplateProps {
  data: ProcedureData;
}

export default function ProcedurePageTemplate({ data }: ProcedurePageTemplateProps) {
  return (
    <main className="min-h-screen bg-white">
      <TreatmentHero 
        category={data.category}
        title={data.title}
        titleItalic={data.titleItalic}
        description={data.description}
        bgImage={data.heroBg}
        reservationLink={data.reservationLink}
      />
      <ProcedureFeatures 
        title={data.featuresTitle}
        subtitle={data.featuresSubtitle}
        description={data.featuresDescription}
        features={data.features}
        bgImage={data.featuresBg}
      />
      <div className="relative z-10 bg-white">
        <YoutubeEmbed />
        <FooterCTA />
      </div>
    </main>
  );
}
