import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
}

export function Container({ children, className, fullWidth = false, ...props }: ContainerProps) {
    return (
        <div
            className={cn(
                "mx-auto w-full",
                "px-[30px] md:px-[80px] lg:px-[80px]",
                !fullWidth && "max-w-content",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    id?: string;
    bgClassName?: string;
    paddingClassName?: string;
}

export function Section({
    children,
    className,
    bgClassName,
    paddingClassName,
    id,
    ...props
}: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "relative w-full overflow-hidden",
                paddingClassName || "py-[80px] md:py-[120px] lg:py-[160px]",
                bgClassName
            )}
            {...props}
        >
            <div className={cn("mx-auto w-full max-w-content", className)}>
                {children}
            </div>
        </section>
    );
}

export const LayoutSpacing = {
    Divider: ({ className }: { className?: string }) => (
        <div className={cn("w-full h-[1px] bg-black", className)} />
    ),
};
