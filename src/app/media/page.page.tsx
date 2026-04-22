import React from 'react';
import MediaHero from '../../components/sections/MediaHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media | AYUN CLINIC',
  description: '아윤클리닉 미디어 - 당신만의 아름다움을 큐레이팅합니다.',
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-[#2C241E]">
      <MediaHero />
      {/* Additional sections can be added here later */}
    </main>
  );
}
