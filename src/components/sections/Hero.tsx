import Navbar from '../layout/Navbar';
import TypewriterText from '../ui/TypewriterText';

export default function Hero() {
  return (
    <div className="sticky top-0 z-0 min-h-screen flex flex-col px-[5%] py-4 md:py-5 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://hzhedioacvqzxxlkttah.supabase.co/storage/v1/object/public/10.%20kbeautychannel/main-hero.webm"
      />
      <Navbar isDarkBackground={true} />
      {/* Spacer to maintain layout flow since Navbar is fixed */}
      <div className="w-full h-[88px] invisible pointer-events-none" />

      <main className="flex-grow relative z-10 w-full flex flex-col justify-between px-8 md:px-16 lg:px-24 pb-20 md:pb-32 pt-16 md:pt-24">
        {/* Top Left Text */}
        <h1 className="font-sans text-[40px] md:text-[48px] font-bold text-white drop-shadow-md leading-tight tracking-tight self-start">
          <TypewriterText text={"강남에서만 10년.\n사랑받는데는 이유가 있습니다."} delay={500} speed={80} />
        </h1>
        
        {/* Bottom Right Text */}
        <h2 className="font-sans text-[40px] md:text-[48px] font-bold text-white drop-shadow-md leading-tight tracking-tight self-end text-right">
          <TypewriterText text={"38,000건의 피부과 시술.\n대표 원장 김연진입니다."} delay={2500} speed={80} />
        </h2>
      </main>
    </div>
  );
}
