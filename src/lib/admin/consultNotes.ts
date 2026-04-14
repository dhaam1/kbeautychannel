/**
 * 상담 메모 유틸리티 함수
 * 
 * @description
 * 상담 메모의 포맷팅 및 파싱을 담당합니다.
 */

/**
 * 상담 메모를 포맷팅합니다
 * 
 * @param content - 메모 내용
 * @param date - 날짜 객체 (기본값: 현재 날짜)
 * @returns "[MM.DD] 메모내용" 형식의 문자열
 * 
 * @example
 * formatConsultNote("통화완료") // "[1.17] 통화완료" (오늘 날짜 기준)
 * formatConsultNote("예약확정", new Date(2026, 0, 15)) // "[1.15] 예약확정"
 */
export function formatConsultNote(content: string, date: Date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `[${month}.${day}] ${content}`;
}

/**
 * 상담 메모에서 날짜와 내용을 추출합니다
 * 
 * @param note - 상담 메모 문자열
 * @returns { date: string | null, content: string } 날짜와 내용
 * 
 * @example
 * parseConsultNote("[1.17] 통화완료") // { date: "1.17", content: "통화완료" }
 * parseConsultNote("통화완료") // { date: null, content: "통화완료" }
 */
export function parseConsultNote(note: string): { date: string | null; content: string } {
  const match = note.match(/^\[(\d{1,2}\.\d{1,2})\]\s*(.*)$/);
  if (match) {
    return {
      date: match[1],
      content: match[2],
    };
  }
  return {
    date: null,
    content: note,
  };
}
