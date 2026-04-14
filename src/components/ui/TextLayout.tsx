import { cn } from "@/lib/utils";
import React from "react";

interface TextLayoutProps {
  text: string;
  subtitle: string | React.ReactNode;
  className?: string;
  color?: string;
}

export function TextLayout({ text, subtitle, className, color = "#FFF" }: TextLayoutProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {/* 1행: Row - SVG + 텍스트 */}
      <div className="flex flex-row items-center justify-center gap-3 pb-[10px] md:justify-start md:pb-5">
        {/* SVG 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14.999"
          height="14.442"
          viewBox="0 0 15 15"
          fill="none"
          style={{ aspectRatio: '15.00/14.44' }}
        >
          <path
            d="M4.33613 7.53069C2.63518 7.63298 1.2537 9.23439 1.2537 10.9381V13.035C1.2537 13.4759 0.89616 13.8334 0.454867 13.8334H0V14.4412H7.82477V10.8097C7.82477 8.92821 6.24267 7.41616 4.33613 7.53069Z"
            fill={color}
          />
          <path
            d="M11.715 7.52473C9.9012 7.52473 8.43066 8.99507 8.43066 10.8087V14.4415H11.715C13.5289 14.4415 14.9994 12.9711 14.9994 11.1576V10.8087C14.9994 8.99507 13.5289 7.52473 11.715 7.52473Z"
            fill={color}
          />
          <path
            d="M7.82697 0H0.00219727V0.607731H0.457064C0.898027 0.607731 1.25556 0.965221 1.25556 1.40612V3.50339C1.25556 5.20709 2.63738 6.80851 4.338 6.91046C6.24486 7.02532 7.82697 5.51327 7.82697 3.63149V0Z"
            fill={color}
          />
          <path
            d="M11.715 4.57764e-05H8.43066V3.63286C8.43066 5.44646 9.9012 6.9168 11.715 6.9168C13.5289 6.9168 14.9994 5.44646 14.9994 3.63286V3.28398C14.9994 1.47038 13.5289 4.57764e-05 11.715 4.57764e-05Z"
            fill={color}
          />
        </svg>
        {/* 텍스트 */}
        <h1
          className="text-[16px] tracking-[-0.16px]"
          style={{
            color: color,
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "16px",
            letterSpacing: "-0.16px",
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </h1>
      </div>

      {/* 2행: 서브텍스트 */}
      <p
        className="text-center md:text-left text-[24px] tracking-[-0.24px] font-semibold md:text-[38px] md:font-normal md:tracking-[-0.38px] subtitle-hero whitespace-pre-wrap"
        style={{
          color: color,
          fontStyle: "normal",
          lineHeight: "normal",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
