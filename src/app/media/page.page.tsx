import MediaHero from '../../components/sections/MediaHero';
import MediaNewsArchive from '../../components/sections/MediaNewsArchive';
import FooterCTA from '../../components/sections/FooterCTA';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media | KBEAUTYCHANNEL',
  description: '케이뷰티채널 미디어 - 당신만의 아름다움을 큐레이팅합니다.',
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-white">
      <MediaHero />
      <MediaNewsArchive />
      <FooterCTA />
      <Footer />
    </main>
  );
}
