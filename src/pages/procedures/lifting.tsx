import SectionLabel from '../../components/common/SectionLabel';

export default function Lifting() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#FAFAFA]">
      <SectionLabel number="01" title="LIFTING DETAIL" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full bg-gradient-to-tr from-rose-100/40 via-purple-100/40 to-blue-100/40 blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 text-center flex flex-col items-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-6 shadow-sm">
          LIFTING
        </span>
        <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6">
          리프팅
        </h1>
        <p className="font-sans text-gray-500 max-w-lg mx-auto leading-relaxed font-light">
          시간의 흐름을 되돌리는 가장 우아한 방법.<br/>당신의 숨겨진 라인을 찾아드립니다.
        </p>
      </div>
    </div>
  );
}
