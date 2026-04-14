/**
 * 워드프레스에서 가져온 HTML 본문 내용을 화면에 안전하게 그려주는 컴포넌트입니다.
 */
export function WpContentRenderer({ content }: { content: string }) {
  return (
    <div
      className="entry-content wp-block-post-content mt-[26px]"
      dangerouslySetInnerHTML={{ __html: content }}
      suppressHydrationWarning={true}
    />
  );
}
