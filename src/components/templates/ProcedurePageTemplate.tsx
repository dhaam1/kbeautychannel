import TreatmentHero from '../sections/TreatmentHero';
import ProcedureFeatures from '../sections/ProcedureFeatures';
import YoutubeEmbed from '../sections/YoutubeEmbed';
import FooterCTA from '../sections/FooterCTA';
import Footer from '../layout/Footer';
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
        sectionNumber="01"
        sectionTitle="TREATMENT"
      />
      <ProcedureFeatures 
        title={data.featuresTitle}
        subtitle={data.featuresSubtitle}
        description={data.featuresDescription}
        features={data.features}
        bgImage={data.featuresBg}
        sectionNumber="02"
        sectionTitle="FEATURES"
      />
      <div className="relative z-10 bg-white">
        <YoutubeEmbed />
        <FooterCTA />
        <Footer />
      </div>
    </main>
  );
}
