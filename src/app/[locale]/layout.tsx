import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { getSiteUrl } from '@/lib/utils';
import { ScrollRestorationDisabler } from '@/components/ScrollRestorationDisabler';
import { UTMTracker } from '@/components/UTMTracker';
import { UTMURLSync } from '@/components/UTMURLSync';
import { ClientOnlyComponents } from '@/components/layouts/ClientOnlyComponents';
import { songMyung, prata, zenAntique, bodoniModa } from '@/lib/fonts';

/**
 * 루트 layout에서 전달하는 최소 메시지 키
 * ClientOnlyComponents (FloatingActionButton, FloatingConsultationForm)에서 사용
 *
 * 각 페이지별 layout에서 추가 메시지를 전달하여 중첩 Provider가 병합됨
 */
const ROOT_MESSAGE_KEYS = ['floatingActionButton', 'cta', 'common', 'notFound'] as const;

// ... (Metadata code omitted, moved to generateMetadata or kept if static)
// Since explicit metadata was here, we can keep the static export but adding locale to it 
// might require generateMetadata if we want localized titles eventually.
// For now, let's just make the layout valid for [locale].

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

/**
 * SEO 메타데이터 설정
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const siteUrl = getSiteUrl();
  const ogImageUrl = `${siteUrl}/assets/og/home_og.webp`;
  
  const siteName = t('common.siteName');
  const title = t('siteMetadata.title');
  const description = t('siteMetadata.description');

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: `%s | ${siteName}`,
      default: title,
    },
    description,
    verification: {
      google: "jX8PJsSWKfSLIYmmpcipbbnuf_M3ock6tddU18U9DQ0",
      other: {
        'naver-site-verification': "d0100a76a0bbb104305d0d0e590dd4dea0aa7872",
      }
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    icons: {
      icon: [
        { url: '/assets/icons/favicon.ico', sizes: '32x32' },
        { url: '/assets/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/assets/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/assets/icons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      apple: [
        { url: '/assets/icons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: '/assets/icons/favicon.ico',
    },
    manifest: '/assets/icons/site.webmanifest',
  };
}

// Static params for static generation
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // 전체 메시지 로드 후 루트에서 필요한 최소 메시지만 필터링
  const allMessages = await getMessages();
  const rootMessages = ROOT_MESSAGE_KEYS.reduce((acc, key) => {
    if (allMessages[key]) {
      acc[key] = allMessages[key];
    }
    return acc;
  }, {} as Record<string, unknown>);

  // Normalize lang attribute for Korean
  const htmlLang = locale === 'kr' ? 'ko' : locale;

  return (
    <html lang={htmlLang} className={`${songMyung.variable} ${prata.variable} ${zenAntique.variable} ${bodoniModa.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
        <link rel="stylesheet" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-jp-dynamic-subset.min.css" />
        <link rel="preconnect" href="https://player.vimeo.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://vimeocdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vimeocdn.com" />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start': new Date().getTime(),
                    event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-K2M2S9S7');
          `}
        </Script>

        {/* Naver Log Analysis */}
        <Script src="//wcs.naver.net/wcslog.js" strategy="afterInteractive" />
        <Script id="naver-log-script" strategy="afterInteractive">
          {`
            if (!window.wcs_add) window.wcs_add = {};
            window.wcs_add["wa"] = "s_3d17bd66b674";
            if (!window._nasa) window._nasa = {};
            if (window.wcs) {
              window.wcs.inflow();
              window.wcs_do();
            }
          `}
        </Script>
      </head>
      <body className={`${locale === 'jp' ? 'font-sans-jp' : 'font-sans'} antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K2M2S9S7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <NextIntlClientProvider messages={rootMessages}>
          <UTMTracker />
          <UTMURLSync />
          <ScrollRestorationDisabler />
          <ClientOnlyComponents />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
