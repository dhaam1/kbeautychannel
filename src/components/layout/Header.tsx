import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center z-50">
      <Link to="/" className="font-sans font-bold text-2xl text-gray-900 tracking-tight">
        KBEAUTYCHANNEL
      </Link>
      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-6 font-sans text-sm font-semibold text-gray-900 tracking-widest uppercase relative z-50">
          <div className="relative group">
            <Link to="/procedures" className="hover:opacity-70 transition-opacity flex items-center gap-1.5 py-4">
              전문 시술 분야
              <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-900 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-36">
              <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 flex flex-col gap-0.5">
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
                    to={item.path} 
                    className="px-3 py-2.5 text-[11px] font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all tracking-wider text-center"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/media" className="hover:opacity-70 transition-opacity">미디어</Link>
          <Link to="/reviews" className="hover:opacity-70 transition-opacity">후기</Link>
          <Link to="/column" className="hover:opacity-70 transition-opacity">DR.KIM 칼럼</Link>
        </nav>
        <button className="px-5 py-2 rounded-full border border-gray-900 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
          시술 예약
        </button>
      </div>
    </header>
  );
}
