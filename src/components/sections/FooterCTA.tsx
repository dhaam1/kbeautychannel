import React from 'react';
import SectionLabel from '../common/SectionLabel';

export default function FooterCTA() {
  return (
    <section className="relative w-full overflow-hidden transition-colors duration-700 ease-in-out">
      <SectionLabel number="07" title="FOOTER CTA" />


      <div className="w-full min-h-[70vh] flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Panel */}
        <div className="relative flex-1 md:flex-1 h-[40vh] md:h-auto bg-white border-b md:border-b-0 md:border-r border-gray-200 group/left hover:flex-[1.8] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between p-8 md:p-16">
          <div className="w-full h-full absolute inset-0 bg-gray-50 opacity-0 group-hover/left:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
          
          <h2 className="relative z-10 font-sans text-5xl md:text-8xl lg:text-[10vw] font-bold text-gray-900 tracking-tighter leading-none transform origin-left transition-transform duration-[1200ms] group-hover/left:scale-105">
            CONNECT
          </h2>
          
          <div className="relative z-10 mt-auto md:mt-0 opacity-60 group-hover/left:opacity-100 transition-opacity duration-700">
            <button className="flex items-center gap-4 text-gray-900 hover:text-[#07C160] transition-colors duration-300">
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center bg-transparent group-hover/left:border-[#07C160] transition-colors duration-500">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
              </div>
              <span className="font-sans text-sm md:text-lg font-medium tracking-wide uppercase">
                WeChat
              </span>
              <svg className="w-6 h-6 ml-4 transform -translate-x-4 opacity-0 group-hover/left:translate-x-0 group-hover/left:opacity-100 transition-all duration-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="relative flex-1 md:flex-1 h-[40vh] md:h-auto bg-[#0a0a0a] group/right hover:flex-[1.8] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between items-end md:items-start text-right md:text-left p-8 md:p-16">
          <div className="w-full h-full absolute inset-0 bg-[#111] opacity-0 group-hover/right:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
          
          <div className="hidden md:block w-full h-[15vw]"></div> {/* Spacer for staggered typo alignment on PC */}

          <h2 className="relative z-10 w-full font-sans text-5xl md:text-8xl lg:text-[10vw] font-bold text-white tracking-tighter leading-none transform origin-right md:origin-left transition-transform duration-[1200ms] group-hover/right:scale-105">
            NOW
          </h2>
          
          <div className="relative z-10 mt-auto md:mt-0 opacity-60 group-hover/right:opacity-100 transition-opacity duration-700 w-full flex justify-end md:justify-start">
            <button className="flex items-center flex-row-reverse md:flex-row gap-4 text-white hover:text-[#00C300] transition-colors duration-300">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center bg-transparent group-hover/right:border-[#00C300] transition-colors duration-500">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <span className="font-sans text-sm md:text-lg font-medium tracking-wide uppercase">
                Line
              </span>
              <svg className="w-6 h-6 mr-4 md:mr-0 md:ml-4 transform translate-x-4 md:-translate-x-4 opacity-0 group-hover/right:translate-x-0 group-hover/right:opacity-100 transition-all duration-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
