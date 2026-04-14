"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  className: string;
  title: string;
  style?: React.CSSProperties;
  eager?: boolean;
  rootMargin?: string;
  poster?: string;
};

const VIMEO_ORIGIN = "https://player.vimeo.com";

function postToVimeo(iframe: HTMLIFrameElement | null, method: string, value: string) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ method, value }),
    VIMEO_ORIGIN,
  );
}

function parseVimeoMessage(data: unknown): { event?: string; method?: string } | null {
  if (typeof data === "string") {
    try { return JSON.parse(data); } catch { return null; }
  }
  if (typeof data === "object" && data !== null) return data as { event?: string; method?: string };
  return null;
}

export function HomeVimeoIframe({
  src,
  className,
  title,
  style,
  eager = false,
  rootMargin = "200px",
  poster,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [showPoster, setShowPoster] = useState(!!poster);

  // IntersectionObserver로 lazy load (display:none 요소는 intersect 안 함 → 모바일/데스크톱 충돌 방지)
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: eager ? "9999px" : rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, rootMargin]);

  // poster가 있으면 play 이벤트 감지해서 poster 숨기기
  useEffect(() => {
    if (!poster || !shouldLoad) return;

    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== VIMEO_ORIGIN) return;

      const data = parseVimeoMessage(e.data);
      if (!data?.event) return;

      if (data.event === "ready") {
        postToVimeo(iframeRef.current, "addEventListener", "play");
      }

      if (data.event === "play") {
        setShowPoster(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [poster, shouldLoad]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {poster && showPoster && (
        <div className="absolute inset-0 z-10 transition-opacity duration-500">
          <Image
            src={poster}
            alt={`${title} poster`}
            fill
            className="object-cover"
            quality={85}
            sizes="100vw"
            priority={eager}
          />
        </div>
      )}

      {shouldLoad && (
        <iframe
          ref={iframeRef}
          src={src}
          className="absolute inset-0 w-full h-full"
          title={title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
