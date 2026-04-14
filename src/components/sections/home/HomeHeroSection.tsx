import Image from "next/image";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { ASSETS } from "@/constants/assets";
import { HomeVimeoIframe } from "@/components/sections/home/HomeVimeoIframe";
import { HeroBannerImages } from "@/components/sections/home/HeroBannerImages";
import { buildVimeoUrl } from "@/lib/vimeoUtils";
export async function HomeHeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className={cn("relative w-full h-[240svh] md:h-[320svh]")}>
      <div
        className="sticky top-0 z-20 h-screen-safe w-full overflow-hidden bg-[#BFBFAF]"
        style={{
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          contain: 'layout style paint',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={ASSETS.HERO.BG_MAIN}
            alt="Blanche Laminate Hero Background"
            fill
            className="object-cover"
            priority
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            loading="eager"
          />

          <HomeVimeoIframe
            src={buildVimeoUrl('1152128642')}
            className="hidden video-md:block absolute top-1/2 left-1/2 w-[177.77svh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            title="Blanche Laminate Hero Video - Desktop"
            poster={ASSETS.HERO.VIDEO_POSTER}
            eager
          />
          <HomeVimeoIframe
            src={buildVimeoUrl('1152146708')}
            className="block video-md:hidden absolute top-1/2 left-1/2 w-[56.25svh] h-[177.77vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            title="Blanche Laminate Hero Video - Mobile"
            poster={ASSETS.HERO.VIDEO_POSTER}
            eager
          />
        </div>

        <HeroBannerImages />

        <div className="absolute left-1/2 bottom-[18%] -translate-x-1/2 z-20 flex flex-col items-center md:bottom-[15%]">
          <h1
            className="block md:hidden"
            style={{
              color: "#fff",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "22.4px",
              letterSpacing: "-0.16px",
              textAlign: "center",
              margin: 0,
            }}
          >
            {t("subtitle1")}
            <br />
            {t("subtitle2")} {t("subtitle3")}
          </h1>

          <h1
            className="hidden md:block"
            style={{
              color: "#fff",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "28px",
              letterSpacing: "-0.2px",
              textAlign: "center",
              margin: 0,
            }}
          >
            {t("subtitle1")}
            <br />
            {t("subtitle2")} {t("subtitle3")}
          </h1>
        </div>
      </div>
    </section>
  );
}
