import Link from 'next/link';
import SectionLabel from '../../components/common/SectionLabel';

export default function ProceduresIndex() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-[#FAFAFA]">
      <SectionLabel number="01" title="PROCEDURES MAIN" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full bg-gradient-to-tr from-rose-100/40 via-purple-100/40 to-blue-100/40 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-6 shadow-sm">
          PROCEDURES
        </span>
        <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6">
          전문 시술 분야
        </h1>
        <p className="font-sans text-gray-500 max-w-lg mx-auto leading-relaxed font-light mb-12">
          KBEAUTYCHANNEL의 프리미엄 맞춤 시술 영역입니다.<br/>각 카테고리별 상세 시술 정보를 확인해보세요.
        </p>

        <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
          {[
            { name: '리프팅', path: '/procedures/lifting' },
            { name: '스킨부스터', path: '/procedures/skin-booster' },
            { name: '쁘띠 시술', path: '/procedures/petit' },
            { name: '피부레이저', path: '/procedures/laser' },
            { name: '바디', path: '/procedures/body' },
            { name: '케어', path: '/procedures/care' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="px-6 py-3 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all shadow-sm hover:shadow-md"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
