import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import YoutubeAuthority from '../components/sections/YoutubeAuthority';
import ProfilePhilosophy from '../components/sections/ProfilePhilosophy';
import SocialProofBridge from '../components/sections/SocialProofBridge';
import YoutubeEmbed from '../components/sections/YoutubeEmbed';
import Reviews from '../components/sections/Reviews';
import FooterCTA from '../components/sections/FooterCTA';

export default function Home() {
  return (
    <div className="w-full flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <Hero />
      <div className="relative z-10 bg-white">
        <YoutubeAuthority />
        <ProfilePhilosophy />
        <SocialProofBridge />
        <YoutubeEmbed />
        <Reviews />
        <FooterCTA />
      </div>
    </div>
  );
}
