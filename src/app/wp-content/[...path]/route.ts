import { NextRequest, NextResponse } from 'next/server';

/**
 * WordPress 미디어 프록시 Route Handler
 *
 * /wp-content/* 경로의 이미지/비디오를 wp.blanche.kr에서 가져와
 * 올바른 Content-Type 헤더와 함께 응답합니다.
 */

// MIME type 매핑
const MIME_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.ogg': 'video/ogg',
  '.ogv': 'video/ogg',
};

function getMimeType(path: string): string {
  const ext = path.substring(path.lastIndexOf('.')).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const mediaPath = path.join('/');
  const wpUrl = `https://wp.blanche.kr/wp-content/${mediaPath}`;
  const contentType = getMimeType(mediaPath);
  const isVideo = contentType.startsWith('video/');

  try {
    const response = await fetch(wpUrl, {
      headers: {
        'Accept': isVideo ? 'video/*,*/*' : 'image/*,*/*',
      },
      next: {
        revalidate: 86400, // 24시간
      },
    });

    if (!response.ok) {
      return new NextResponse('Media not found', { status: 404 });
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        ...(isVideo && { 'Accept-Ranges': 'bytes' }),
      },
    });
  } catch (error) {
    console.error('Media proxy error:', error);
    return new NextResponse('Failed to fetch media', { status: 500 });
  }
}
