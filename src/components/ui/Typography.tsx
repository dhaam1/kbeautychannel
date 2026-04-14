import { cn } from "@/lib/utils";
import React from "react";

/**
 * 전역적인 타이포그래피 스타일을 정의합니다.
 * Tailwind 클래스를 사용하여 반응형 텍스트 크기를 제어합니다.
 */

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
}

export function H1({ children, className, ...props }: TypographyProps) {
    return (
        <h1
            className={cn(
                "font-bold tracking-tight text-[#171717]",
                "text-[28px] leading-[1.3] md:text-[40px] md:leading-[1.2] lg:text-[56px]",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
}

export function H2({ children, className, ...props }: TypographyProps) {
    return (
        <h2
            className={cn(
                "font-extrabold tracking-tight text-[#171717]",
                "text-[24px] leading-[1.35] md:text-[32px] lg:text-[48px]",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
}

export function H3({ children, className, ...props }: TypographyProps) {
    return (
        <h3
            className={cn(
                "font-bold tracking-tight text-[#171717]",
                "text-[20px] leading-[1.4] md:text-[24px] lg:text-[32px]",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
}

export function Paragraph({ children, className, ...props }: TypographyProps) {
    return (
        <p
            className={cn(
                "font-normal text-[#4A4A4A]",
                "text-[16px] leading-[1.6] md:text-[18px] lg:text-[20px]",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
}

// 모바일 전용 줄바꿈 (Mobile Only Line Break)
export function MobileBr() {
    return <br className="block md:hidden" />;
}

// PC 전용 줄바꿈 (Desktop Only Line Break)
export function DesktopBr() {
    return <br className="hidden md:block" />;
}
