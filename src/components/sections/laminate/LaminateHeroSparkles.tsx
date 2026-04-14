"use client";

import dynamic from "next/dynamic";

type Props = {
  background: string;
  particleColor: string;
  particleDensity: number;
  minSize: number;
  maxSize: number;
  speed: number;
  className?: string;
};

const SparklesCore = dynamic(
  () => import("@/components/ui/sparkles").then((m) => m.SparklesCore),
  { ssr: false },
);

export function LaminateHeroSparkles(props: Props) {
  return <SparklesCore {...props} />;
}

