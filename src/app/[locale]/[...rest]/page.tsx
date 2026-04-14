import { notFound } from 'next/navigation';

/**
 * 정의되지 않은 모든 경로를 잡아내어 404 페이지를 표시합니다.
 * 이 파일이 있어야 [locale] 폴더 내의 커스텀 not-found.tsx가 정상적으로 작동합니다.
 */
export default function CatchAllPage() {
    notFound();
}
