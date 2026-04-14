import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

/**
 * 상담 페이지 전용 레이아웃
 */
const CONSULTATION_MESSAGE_KEYS = [
  'common', 'nav', 'footer', 'floatingActionButton', 'cta'
] as const;

export default async function ConsultationLayout({
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

  const messages = CONSULTATION_MESSAGE_KEYS.reduce((acc, key) => {
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
