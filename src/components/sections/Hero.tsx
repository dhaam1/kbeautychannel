import Navbar from '../layout/Navbar';

export default function Hero() {
  return (
    <div className="sticky top-0 z-0 min-h-screen flex flex-col px-[5%] py-4 md:py-5 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/herolanding-herolanding/0413-01-water-skin.webm"
      />
      <Navbar isDarkBackground={true} />
      {/* Spacer to maintain layout flow since Navbar is fixed */}
      <div className="w-full h-[88px] invisible pointer-events-none" />

      <main className="flex-grow flex flex-col justify-center z-10 max-w-2xl px-4 md:px-0">
        <h1 className="font-sans text-[40px] font-bold text-gray-900 leading-tight tracking-tight">
          더 가까이서 봐봐.<br />격차를 보여줄테니.
        </h1>
        <div className="mt-8 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 flex items-center gap-4 shadow-sm w-fit">
          <input
            type="text"
            placeholder="4월. 오버레이 프로모션 살펴보기"
            className="bg-transparent border-none outline-none text-[16px] text-gray-700 placeholder-gray-700 w-64 md:w-80"
          />
          <button className="text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
