import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-gray-600 mb-8">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
