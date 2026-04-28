import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 플러그인 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// 기본 설정 (필요시 추가)
gsap.config({
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger, useGSAP };
