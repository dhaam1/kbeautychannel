import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

/**
 * 블로그 전용 레이아웃
 *
 * @description
 * 블로그 페이지에서 필요한 번역 메시지만 선택적으로 전달하여
 * RSC payload 크기를 대폭 줄입니다.
 *
 * 전체 messages.json (~110KB) 대신 블로그에서 사용하는 키만 전달:
 * - common: 공통 UI 요소 (Dialog 등)
 * - nav: 네비게이션 (Header에서 사용)
 * - cta: 상담 신청 폼 (BlogCTA 컴포넌트)
 * - footer: 푸터
 * - floatingActionButton: 플로팅 버튼
 *
 * 주의: 중첩된 NextIntlClientProvider는 메시지를 병합하지 않고
 * 가장 가까운 Provider의 메시지만 사용합니다.
 */

// 블로그에서 실제 사용하는 모든 메시지 키
const BLOG_MESSAGE_KEYS = [
  'common',
  'nav',
  'cta',
  'footer',
  'floatingActionButton'
] as const;

export default async function BlogLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // locale 유효성 검사
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // 전체 메시지 로드
  const allMessages = await getMessages();

  // 블로그에서 필요한 메시지만 필터링
  const blogMessages = BLOG_MESSAGE_KEYS.reduce((acc, key) => {
    if (allMessages[key]) {
      acc[key] = allMessages[key];
    }
    return acc;
  }, {} as Record<string, unknown>);

  return (
    <NextIntlClientProvider messages={blogMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
