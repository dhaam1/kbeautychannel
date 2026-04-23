import TreatmentHero from '../sections/TreatmentHero';
import ProcedureFeatures from '../sections/ProcedureFeatures';
import YoutubeEmbed from '../sections/YoutubeEmbed';
import FooterCTA from '../sections/FooterCTA';
import Footer from '../layout/Footer';
import { ProcedureData } from '../../constants/procedures';

interface ProcedurePageTemplateProps {
  data: ProcedureData;
  heroOptions?: {
    bgVideo?: string;
    isCenter?: boolean;
    isTop?: boolean;
    isDarkText?: boolean;
    hideButton?: boolean;
    isSplitLayout?: boolean;
    titleSize?: string;
    descSize?: string;
    mainCopy?: string;
    subCopy?: string;
  };
}

export default function ProcedurePageTemplate({ data, heroOptions }: ProcedurePageTemplateProps) {
  return (
    <main className="min-h-screen bg-white">
      <TreatmentHero 
        category={heroOptions?.mainCopy ? undefined : data.category}
        title={heroOptions?.mainCopy || data.title}
        titleItalic={heroOptions?.mainCopy ? undefined : data.titleItalic}
        description={heroOptions?.subCopy || data.description}
        bgImage={data.heroBg}
        bgVideo={heroOptions?.bgVideo}
        reservationLink={data.reservationLink}
        sectionNumber="01"
        sectionTitle="TREATMENT"
        isCenter={heroOptions?.isCenter}
        isTop={heroOptions?.isTop}
        isDarkText={heroOptions?.isDarkText}
        hideButton={heroOptions?.hideButton}
        isSplitLayout={heroOptions?.isSplitLayout}
        titleSize={heroOptions?.titleSize}
        descSize={heroOptions?.descSize}
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
