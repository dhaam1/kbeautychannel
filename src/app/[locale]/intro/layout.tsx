import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

/**
 * 소개 페이지 전용 레이아웃
 * 소개 페이지에서 사용하는 번역 메시지만 전달
 */
const INTRO_MESSAGE_KEYS = [
  'common', 'nav', 'footer', 'floatingActionButton', 'cta',
  'aboutHero', 'aboutStrength', 'aboutDirector', 'aboutDoctors',
  'aboutHistory', 'aboutTech', 'aboutEquipment', 'aboutFacility',
  'aboutOtherCompany', 'aboutMap'
] as const;

export default async function IntroLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const allMessages = await getMessages();

  const messages = INTRO_MESSAGE_KEYS.reduce((acc, key) => {
    if (allMessages[key]) {
      acc[key] = allMessages[key];
    }
    return acc;
  }, {} as Record<string, unknown>);

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
