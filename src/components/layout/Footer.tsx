'use client';

import React from 'react';
import Link from 'next/link';
import { Youtube, Instagram, MessageCircle } from 'lucide-react';

const OFFICIAL_DATA = {
  tel: '02-6941-0375',
  gangnam: {
    name: '유에이치셀의원 강남점',
    alias: '(UH CELL. 구 닥터쁘띠의원 강남점)',
    address: '서울특별시 강남구 테헤란로 8길 13 (WD빌딩 2층)',
    bizNo: '304-10-45683',
    privacy: '김연진'
  },
  seocho: {
    name: '유에이치셀의원 서초점',
    address: '서울특별시 서초구 반포대로16길 30 서초로이움지젤 (UH플랫 더 서초 아넥스) 1층',
    bizNo: '320-54-00886',
    privacy: '김경수'
  },
  hours: [
    { days: '월 화 수 금', time: 'AM 10:00 ~ PM 08:00', note: '점심시간 없음' },
    { days: '목 토', time: 'AM 10:00 ~ PM 05:00', note: '점심시간 없음' },
    { days: '일요일', time: '휴진', note: '' }
  ]
};

const navMenu = [
  { name: '리프팅', path: '/lifting' },
  { name: '스킨부스터', path: '/procedures/skin-booster' },
  { name: '더 알아보기', path: 'https://uhcell.com/' },
  { name: '미디어', path: '/media' },
  { name: '후기', path: '/reviews' },
  { name: 'DR.KIM 칼럼', path: '/column' },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0D0E0E] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-8 md:px-[5%] lg:px-[8%] py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0">
          <div className="lg:col-span-4 lg:border-r border-white/10 pr-0 lg:pr-16 flex flex-col justify-between">
            <div className="space-y-12">
              <Link href="/" className="font-sans font-bold text-[32px] tracking-tight block">KBEAUTYCHANNEL</Link>
              <div className="space-y-8">
                 <div>
                    <span className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">Centralized Line</span>
                    <a href={`tel:${OFFICIAL_DATA.tel}`} className="text-[32px] font-bold hover:text-white/70 transition-colors">{OFFICIAL_DATA.tel}</a>
                 </div>
                 <div className="flex gap-4">
                   {[<Youtube key="yt" size={18}/>, <Instagram key="ig" size={18}/>, <MessageCircle key="mc" size={18}/>].map((icon, i) => (
                     <button key={i} className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all">{icon}</button>
                   ))}
                 </div>
              </div>
            </div>
            <div className="mt-20 lg:mt-0">
               <p className="text-[12px] text-white/10 tracking-[0.5em] uppercase font-bold">Architecture of Beauty</p>
            </div>
          </div>

          <div className="lg:col-span-8 lg:pl-16 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-16">
              <div className="space-y-8">
                <h4 className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase border-b border-white/10 pb-4">Clinic Space</h4>
                <div className="space-y-10">
                  <div className="space-y-2">
                    <p className="text-[16px] font-bold">강남점</p>
                    <p className="text-[15px] text-white/40 leading-relaxed font-light">{OFFICIAL_DATA.gangnam.address}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[16px] font-bold">서초점</p>
                    <p className="text-[15px] text-white/40 leading-relaxed font-light">{OFFICIAL_DATA.seocho.address}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <h4 className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase border-b border-white/10 pb-4">Corporate</h4>
                <div className="space-y-4 text-[13px] text-white/20 font-medium leading-relaxed">
                  <div className="space-y-1">
                    <p className="text-white/40">{OFFICIAL_DATA.gangnam.name} {OFFICIAL_DATA.gangnam.alias}</p>
                    <p>사업자번호 {OFFICIAL_DATA.gangnam.bizNo} | 담당자 {OFFICIAL_DATA.gangnam.privacy}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/40">{OFFICIAL_DATA.seocho.name}</p>
                    <p>사업자번호 {OFFICIAL_DATA.seocho.bizNo} | 담당자 {OFFICIAL_DATA.seocho.privacy}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-16">
              <div className="space-y-8">
                <h4 className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase border-b border-white/10 pb-4">Timeline</h4>
                <div className="space-y-6 text-[15px] font-medium text-white/60">
                  {OFFICIAL_DATA.hours.map(h => (
                    <div key={h.days} className="space-y-1">
                      <p className="flex justify-between"><span>{h.days}</span> <span className="text-white">{h.time}</span></p>
                      {h.note && <p className="text-[12px] text-white/20 uppercase tracking-widest font-light">{h.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h4 className="text-white/20 text-[10px] font-bold tracking-[0.4em] uppercase border-b border-white/10 pb-4">Menu</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {navMenu.map(item => (
                    <Link key={item.name} href={item.path} className="text-[15px] font-bold text-white/40 hover:text-white transition-colors">{item.name}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/10 text-[11px] tracking-[0.2em] uppercase font-bold">© 2026 KBEAUTYCHANNEL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <Link href="#" className="text-[11px] text-white/20 hover:text-white uppercase tracking-[0.2em] font-bold transition-all">Privacy Policy</Link>
            <Link href="#" className="text-[11px] text-white/20 hover:text-white uppercase tracking-[0.2em] font-bold transition-all">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
