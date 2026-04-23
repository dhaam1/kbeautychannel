import Hero from '../components/sections/Hero';
import YoutubeAuthority from '../components/sections/YoutubeAuthority';
import ProfessionalProfile from '../components/sections/ProfessionalProfile';
import SocialProofBridge from '../components/sections/SocialProofBridge';
import YoutubeEmbed from '../components/sections/YoutubeEmbed';
import ColumnSection from '../components/sections/ColumnSection';
import FooterCTA from '../components/sections/FooterCTA';
import Footer from '../components/layout/Footer';


 export default function Home() {
   return (
     <div className="w-full flex flex-col font-sans text-gray-900">
       <div className="snap-section">
         <Hero />
       </div>
       <div className="relative z-10 bg-white">
         <div className="snap-section">
           <YoutubeAuthority />
         </div>
         <div className="snap-section">
           <ProfessionalProfile />
         </div>
         <div className="snap-section">
           <SocialProofBridge />
         </div>
         <div className="snap-section">
           <YoutubeEmbed />
         </div>
         <div className="snap-section">
           <ColumnSection />
         </div>
         <div className="snap-section">
           <FooterCTA />
         </div>
         <Footer />
       </div>
     </div>
   );
 }

