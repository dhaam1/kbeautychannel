import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    // 0. Block malicious probe requests (.php, wp-login, etc.)
    if (pathname.endsWith('.php')) {
        return new NextResponse(null, { status: 404 });
    }
    // Firebase App Hosting uses x-forwarded-host for the original host
    const forwardedHost = request.headers.get('x-forwarded-host');
    const host = forwardedHost || request.headers.get('host') || '';
    const protocol = request.headers.get('x-forwarded-proto') || 'https';

    let targetHost = host;
    let targetPathname = pathname;
    let needsRedirect = false;

    // 1. non-WWW to WWW normalization (www.blanche.kr가 기본 도메인)
    if (!targetHost.startsWith('www.') && targetHost.includes('blanche.kr')) {
        targetHost = 'www.' + targetHost;
        needsRedirect = true;
    }

    // 2. Trailing slash normalization (except root - root "/" cannot be redirected)
    if (targetPathname.length > 1 && targetPathname.endsWith('/')) {
        targetPathname = targetPathname.slice(0, -1);
        needsRedirect = true;
    }

    // 3. Blog path normalization: /blog/ja/* -> /jp/blog/*, /blog/en/* -> /en/blog/*
    if (targetPathname === '/blog/ja' || targetPathname.startsWith('/blog/ja/')) {
        targetPathname = targetPathname.replace('/blog/ja', '/jp/blog');
        needsRedirect = true;
    }
    if (targetPathname === '/blog/en' || targetPathname.startsWith('/blog/en/')) {
        targetPathname = targetPathname.replace('/blog/en', '/en/blog');
        needsRedirect = true;
    }

    // Single redirect for all normalizations
    if (needsRedirect) {
        const redirectUrl = `${protocol}://${targetHost}${targetPathname}${search}`;
        return NextResponse.redirect(redirectUrl, 308);
    }

    // 4. Root language detection (first visit only)
    if (pathname === '/' && !request.cookies.has('NEXT_LOCALE')) {
        const acceptLanguage = request.headers.get('accept-language') || '';
        const lowerLang = acceptLanguage.toLowerCase();
        
        const koIndex = lowerLang.indexOf('ko');
        const jaIndex = lowerLang.indexOf('ja');
        const enIndex = lowerLang.indexOf('en');

        const validIndices = [
            { lang: 'ko', index: koIndex },
            { lang: 'ja', index: jaIndex },
            { lang: 'en', index: enIndex }
        ].filter(item => item.index !== -1);

        if (validIndices.length > 0) {
            validIndices.sort((a, b) => a.index - b.index);
            const preferredLang = validIndices[0].lang;

            if (preferredLang === 'ja') {
                const redirectUrl = `${protocol}://${targetHost}/jp${search}`;
                return NextResponse.redirect(redirectUrl, 302);
            } else if (preferredLang === 'en') {
                const redirectUrl = `${protocol}://${targetHost}/en${search}`;
                return NextResponse.redirect(redirectUrl, 302);
            }
            // If preferredLang is 'ko', do nothing and let it fall through to default (kr)
        }
    }

    // 5. next-intl 미들웨어 실행
    const response = handleI18nRouting(request);

    // 6. 블로그 경로에서 next-intl의 리다이렉트 차단
    // 비-ASCII 슬러그(虫歯 등)에서 percent-encoding 정규화 무한 리다이렉트 방지
    // locale 설정은 유지하되 불필요한 리다이렉트만 억제
    if ((pathname.startsWith('/blog/') || pathname.startsWith('/jp/blog/') || pathname.startsWith('/en/blog/')) && response.status >= 300 && response.status < 400) {
        return NextResponse.next(response);
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|blog/feed|.*\\.(?:css|js|map|svg|png|jpe?g|webp|gif|ico|woff2?|ttf|eot|mp4|webm|json|xml|xsl|txt)).*)']
};
