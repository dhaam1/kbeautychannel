/**
 * UTM 파라미터 추적 유틸리티
 *
 * @description
 * 최초 유입 시 URL의 UTM 파라미터를 sessionStorage에 저장합니다.
 * sessionStorage는 탭(세션) 단위로 유지되므로, 사용자가 사이트 내에서
 * 다른 페이지로 이동해도 최초 UTM값이 보존됩니다.
 * 탭을 닫으면 자동으로 초기화되어 광고 유입 세션을 정확하게 추적합니다.
 */

export interface UTMParams {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;
const UTM_STORAGE_PREFIX = 'utm_';

/**
 * URL에서 UTM 파라미터를 추출하여 sessionStorage에 저장
 *
 * @description
 * 최초 진입 시 호출하여 UTM을 세션 스토리지에 저장합니다.
 * - 이미 저장된 값이 있으면 덮어쓰지 않아 최초 유입 UTM을 끝까지 보존합니다.
 * - 사이트 내 페이지 이동 시에도 UTM이 유지됩니다.
 * - 탭을 닫으면 자동으로 초기화됩니다.
 */
export function captureUTMParams(): void {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);

    UTM_KEYS.forEach(key => {
        const value = params.get(key);
        const storageKey = `${UTM_STORAGE_PREFIX}${key}`;
        // 이미 저장된 최초 유입 UTM이 있으면 덮어쓰지 않음
        if (value && !sessionStorage.getItem(storageKey)) {
            sessionStorage.setItem(storageKey, value);
        }
    });
}

/**
 * sessionStorage에서 저장된 UTM 파라미터 가져오기
 *
 * @returns UTM 파라미터 객체 (없으면 direct로 표시)
 */
export function getStoredUTMParams(): UTMParams {
    if (typeof window === 'undefined') {
        return {
            utm_source: 'direct',
            utm_medium: 'none',
        };
    }

    return {
        utm_source: sessionStorage.getItem(`${UTM_STORAGE_PREFIX}utm_source`) || 'direct',
        utm_medium: sessionStorage.getItem(`${UTM_STORAGE_PREFIX}utm_medium`) || 'none',
        utm_campaign: sessionStorage.getItem(`${UTM_STORAGE_PREFIX}utm_campaign`) || undefined,
        utm_content: sessionStorage.getItem(`${UTM_STORAGE_PREFIX}utm_content`) || undefined,
    };
}

/**
 * 블로그 포스트 제목에서 utm_content 생성
 * 
 * @param title - 블로그 포스트 제목 (H1)
 * @returns URL에 사용 가능한 utm_content 값
 * 
 * @example
 * generateUTMContentFromTitle("인비절라인 후기, 30대 교정부터 돌출입 개선까지")
 * // "인비절라인_후기_30대_교정부터_돌출입_개선까지"
 */
export function generateUTMContentFromTitle(title: string): string {
    return title
        .trim()
        .replace(/\s+/g, '_') // 공백을 언더스코어로
        .replace(/[^\wㄱ-ㅎ가-힣_]/g, '') // 특수문자 제거
        .replace(/_+/g, '_') // 연속된 언더스코어 제거
        .replace(/^_|_$/g, ''); // 앞뒤 언더스코어 제거
}

/**
 * 폼 데이터에 UTM 파라미터 추가
 * 
 * @param formData - 기본 폼 데이터
 * @returns UTM이 추가된 완전한 폼 데이터
 */
export function enrichFormDataWithUTM<T extends Record<string, any>>(formData: T): T & UTMParams {
    const utmParams = getStoredUTMParams();

    return {
        ...formData,
        utmSource: utmParams.utm_source,
        utmMedium: utmParams.utm_medium,
        utmCampaign: utmParams.utm_campaign,
        utmContent: utmParams.utm_content,
    };
}

