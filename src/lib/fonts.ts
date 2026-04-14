import { Song_Myung, Prata, Zen_Antique, Bodoni_Moda } from "next/font/google";

/**
 * next/font/google를 통한 폰트 로드
 *
 * 빌드 시점에 폰트 파일을 self-host하여:
 * - 외부 Google Fonts CDN 요청 제거 (네트워크 왕복 감소)
 * - 렌더블로킹 CSS @import / <link> 제거
 * - font-display: swap 자동 적용
 * - CSS 변수(--font-xxx)로 Tailwind와 연동
 */

// LCP-critical font on Home Hero title.
export const songMyung = Song_Myung({
  weight: "400",
  display: "swap",
  variable: "--font-song-myung",
});

// 세리프 제목용 (HomeCustomerContent, sleep 페이지 등)
export const prata = Prata({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-prata",
});

// 일본어 전통 서체 (Hero 일본어 모드)
export const zenAntique = Zen_Antique({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-zen-antique",
});

// 디스플레이 서체 (AboutHistorySection)
export const bodoniModa = Bodoni_Moda({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
});
