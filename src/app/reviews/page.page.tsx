import React from 'react';
import Navbar from '../../components/layout/Navbar';
import ReviewsArchive from '../../components/sections/ReviewsArchive';
import FooterCTA from '../../components/sections/FooterCTA';
import Footer from '../../components/layout/Footer';

export const metadata = {
  title: 'Reviews | KBEAUTYCHANNEL',
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Container */}
      <Navbar isDarkBackground={false} />

      {/* Content Sections */}
      <div className="pt-24 md:pt-32">
        <ReviewsArchive />
        <FooterCTA />
      </div>
      <Footer />
    </main>
  );
}
