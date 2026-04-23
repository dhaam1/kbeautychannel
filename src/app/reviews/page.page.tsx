import React from 'react';
import Header from '../../components/layout/Header';
import ReviewsArchive from '../../components/sections/ReviewsArchive';
import Reviews from '../../components/sections/Reviews';
import FooterCTA from '../../components/sections/FooterCTA';

export const metadata = {
  title: 'Reviews | KBEAUTYCHANNEL',
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      {/* Header Container */}
      <div className="fixed top-0 left-0 w-full z-50 px-[5%] py-6 md:py-10">
        <Header isDarkBackground={false} />
      </div>

      {/* Content Sections */}
      <div className="pt-24 md:pt-32">
        <div className="snap-section">
          <ReviewsArchive />
        </div>
        <div className="snap-section">
          <Reviews />
        </div>
        <div className="snap-section">
          <FooterCTA />
        </div>
      </div>
    </main>
  );
}
