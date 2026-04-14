'use client';

import { ASSETS } from '@/constants/assets';
import { HomeCustomerContent } from './HomeCustomerContent';
import { HomeVimeoIframe } from '@/components/sections/home/HomeVimeoIframe';
import { buildVimeoUrl } from '@/lib/vimeoUtils';

export function HomeCustomerSection() {
  const procedureCount = 70011;

  return (
    <section 
      className="relative w-full flex items-center justify-center overflow-hidden bg-white"
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 w-full mx-auto h-auto max-w-content">
        <div 
          className="flex items-center justify-start lg:justify-center w-full bg-white h-[520px] md:h-[694px] pl-[30px] md:pl-[80px] lg:pl-0"
        >
          <HomeCustomerContent count={procedureCount} />
        </div>

        <div 
          className="flex items-center justify-center relative overflow-hidden w-full bg-white h-[406px] md:h-[694px]"
        >
          <HomeVimeoIframe
            src={buildVimeoUrl('1152786189')}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none min-w-full min-h-full w-[177.77%] h-full"
            title="Customer Section Video"
            poster={ASSETS.CUSTOMER.VIDEO_POSTER}
            rootMargin="300px"
          />
        </div>
      </div>
    </section>
  );
}
