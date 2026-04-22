import React from 'react';
import Header from '../../components/layout/Header';

export const metadata = {
  title: 'Reviews | KBEAUTYCHANNEL',
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <div className="px-[5%] py-6 md:py-10">
        <Header isDarkBackground={false} />
      </div>
      <div className="p-20 text-black">
        <h1>Header Test with Global Header</h1>
      </div>
    </main>
  );
}
