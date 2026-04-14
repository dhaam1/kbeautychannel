import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

/**
 * 진료서비스 페이지 전용 레이아웃
 */
const SPECIAL_MESSAGE_KEYS = [
  'common', 'nav', 'footer', 'floatingActionButton', 'cta',
  'solutionHeroScale', 'solutionCard', 'solutionGrid1', 'solutionGrid2',
  'solutionBanner', 'solutionIntroduction', 'solutionCTA',
  'solution', 'implant', 'whitening'
] as const;

export default async function SpecialLayout({
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

  const messages = SPECIAL_MESSAGE_KEYS.reduce((acc, key) => {
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
