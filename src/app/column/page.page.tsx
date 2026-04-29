import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Metadata } from 'next';
import { blogPosts } from '../../constants/column';

export const metadata: Metadata = {
  title: 'DR.KIM 칼럼 | KBEAUTYCHANNEL',
  description: '신뢰할 수 없었던 의료 정보, 이제 안찾아보셔도 됩니다. 단순 시술이라면 이 정도의 정보는 필요없을 겁니다. 하지만 평생의 아름다움과 피부 건강을 위해선 필요합니다.',
};


export default function BlogPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white font-sans">
      {/* Header Area */}
      <Navbar isDarkBackground={false} />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-12 md:pt-48 md:pb-20 relative z-10">
        {/* Title Section */}
        <div className="mb-12 md:mb-16 pl-2">
          <h1 className="text-3xl md:text-[32px] font-bold text-gray-900 mb-3 tracking-tight">
            신뢰할 수 없었던 의료 정보,<br />
            이제 안찾아보셔도 됩니다.
          </h1>
          <p className="text-gray-500 text-[16px] md:text-base">
            단순 시술이라면 이 정도의 정보는 필요없을 겁니다.<br />
            하지만 평생의 아름다움과 피부 건강을 위해선 필요합니다.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="flex flex-col overflow-hidden group cursor-pointer transition-all duration-500 bg-white border border-gray-100 rounded-2xl hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              {/* Image Area (Editorial Cover Style) */}
              <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                <img 
                  src={post.image}
                  alt={post.category}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                
                {/* ID & Category Watermark */}
                <div className="absolute top-6 left-6">
                  <span className="text-[16px] font-bold tracking-[0.4em] text-white/40 uppercase">
                    Archive {String(post.id).padStart(2, '0')}
                  </span>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[16px] font-bold tracking-[0.2em] text-white/70 uppercase mb-3">
                    {post.category.split(',')[0]}
                  </span>
                  <h3 className="font-bold text-white leading-[1.3] text-xl line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex flex-col p-6 md:p-8">
                <p className="text-gray-500 text-[16px] leading-[1.6] line-clamp-2 mb-6">
                  {post.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-6">
                  <span className="text-gray-400 text-[16px] font-medium uppercase tracking-wider">{post.authorInfo.includes('/') ? post.authorInfo.split('/')[1].trim() : post.authorInfo}</span>
                  <span className="text-[16px] font-bold text-gray-900 border-b border-gray-900/20 pb-0.5 group-hover:border-gray-900 transition-colors">Read Article</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
