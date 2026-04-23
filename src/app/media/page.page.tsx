import React from 'react';
import MediaNewsArchive from '../../components/sections/MediaNewsArchive';
import FooterCTA from '../../components/sections/FooterCTA';
import Header from '../../components/layout/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media | KBEAUTYCHANNEL',
  description: '케이뷰티채널 미디어 - 당신만의 아름다움을 큐레이팅합니다.',
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <div className="relative z-50 px-[5%] py-6 md:py-10">
        <Header isDarkBackground={true} />
      </div>
      <MediaNewsArchive />
      <FooterCTA />
    </main>
  );
}
