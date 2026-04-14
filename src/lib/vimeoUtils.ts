/**
 * Vimeo 플레이어 URL 생성
 *
 * background=true (기본값): 자동재생, 음소거, 루프, 컨트롤 숨김이 자동 적용되는 배경영상 모드
 * background=false: 일반 플레이어 모드 (autoplay, loop 개별 설정)
 */
export function buildVimeoUrl(
  videoId: string,
  options: { autoplay?: boolean; loop?: boolean; background?: boolean } = {},
): string {
  const { autoplay = true, loop = true, background = true } = options;

  const params = new URLSearchParams({
    dnt: "1",
    playsinline: "1",
    autopause: "0",
    pip: "0",
    badge: "0",
    portrait: "0",
    byline: "0",
    title: "0",
  });

  if (background) {
    params.set("background", "1");
  } else {
    params.set("muted", "1");
    params.set("controls", "0");
    if (autoplay) params.set("autoplay", "1");
    if (loop) params.set("loop", "1");
  }

  return `https://player.vimeo.com/video/${videoId}?${params}`;
}
