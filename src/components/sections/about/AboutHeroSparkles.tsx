"use client";

import dynamic from "next/dynamic";

type Props = React.ComponentProps<
  typeof import("@/components/ui/sparkles").SparklesCore
>;

const SparklesCore = dynamic(
  () => import("@/components/ui/sparkles").then((m) => m.SparklesCore),
  { ssr: false },
);

export function AboutHeroSparkles(props: Props) {
  return <SparklesCore {...props} />;
}

