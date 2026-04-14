'use client';

import { useEffect, useRef } from 'react';

/**
 * 네이버 지도 컴포넌트
 * 
 * @description
 * 네이버 지도 API를 사용하여 지도를 표시하는 컴포넌트입니다.
 * 
 * @param {Object} props - 컴포넌트 props
 * @param {number} props.lat - 위도 (기본값: 37.5112)
 * @param {number} props.lng - 경도 (기본값: 127.0213)
 * @param {string} props.address - 주소 (마커에 표시)
 * @param {string} props.className - 추가 CSS 클래스
 * @returns {JSX.Element} 네이버 지도 컴포넌트
 */
interface NaverMapProps {
  lat?: number;
  lng?: number;
  address?: string;
  className?: string;
}

declare global {
  interface Window {
    naver: any;
  }
}

// 전역 스크립트 로딩 상태 추적
let scriptLoading = false;
let scriptLoaded = false;
const scriptLoadCallbacks: Array<() => void> = [];

export function NaverMap({
  lat = 37.509425461631,
  lng = 127.02177777742,
  address = '블랑쉬치과 의원',
  className = ''
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // 환경 변수 디버깅
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

    console.log('[NaverMap] 환경 변수 확인:', {
      hasClientId: !!clientId,
      clientIdValue: clientId ? `${clientId.substring(0, 5)}...` : 'undefined',
      allNextPublicVars: Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')),
    });

    // Client ID가 없으면 경고 메시지 표시하고 지도 영역에 안내 메시지 표시
    if (!clientId) {
      console.warn('[NaverMap] 네이버 지도 API Client ID가 설정되지 않았습니다.');
      console.warn('[NaverMap] 해결 방법:');
      console.warn('1. .env.local 파일에 NEXT_PUBLIC_NAVER_MAP_CLIENT_ID가 올바르게 설정되어 있는지 확인');
      console.warn('2. 개발 서버를 완전히 종료하고 재시작 (Ctrl+C 후 npm run dev)');
      console.warn('3. .next 폴더를 삭제하고 재시작 (rm -rf .next && npm run dev)');
      if (mapRef.current) {
        mapRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:14px;">지도를 불러올 수 없습니다</div>';
      }
      return;
    }

    // 네이버 지도 API가 완전히 로드되었는지 확인
    const isNaverMapsReady = () => {
      const naverObj = (window as any).naver || window.naver;
      return naverObj && naverObj.maps && typeof naverObj.maps.LatLng === 'function';
    };

    // 스크립트 로드 함수
    const loadScript = (callback: () => void) => {
      if (scriptLoaded && isNaverMapsReady()) {
        callback();
        return;
      }

      if (scriptLoading) {
        // 이미 로딩 중이면 콜백만 등록
        scriptLoadCallbacks.push(callback);
        return;
      }

      // 이미 같은 스크립트가 있는지 확인
      const existingScript = document.querySelector(`script[src*="oapi.map.naver.com"]`);
      if (existingScript) {
        // 스크립트가 이미 있으면 로드 완료를 기다림
        if (isNaverMapsReady()) {
          scriptLoaded = true;
          scriptLoading = false;
          callback();
          return;
        }
        // 스크립트는 있지만 아직 로드 중이면 콜백만 등록
        scriptLoadCallbacks.push(callback);
        return;
      }

      scriptLoading = true;
      const script = document.createElement('script');
      // 네이버 지도 API v3는 ncpKeyId 파라미터를 사용합니다
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
      script.async = true;
      script.type = 'text/javascript';
      script.id = 'naver-maps-script';

      script.onload = () => {
        console.log('네이버 지도 API 스크립트 로드 완료');

        // 스크립트가 로드되면 약간의 지연 후 maps 객체 확인
        // 네이버 지도 API는 스크립트 로드 후 즉시 사용 가능해야 함
        setTimeout(() => {
          // window.naver 또는 전역 naver 객체 확인
          const naverObj = (window as any).naver || window.naver;

          if (naverObj && naverObj.maps && naverObj.maps.LatLng) {
            scriptLoaded = true;
            scriptLoading = false;
            console.log('네이버 지도 API 준비 완료');
            callback();
            // 대기 중인 모든 콜백 실행
            scriptLoadCallbacks.forEach(cb => cb());
            scriptLoadCallbacks.length = 0;
          } else {
            // naver 객체가 없으면 스크립트가 제대로 로드되지 않은 것
            console.error('네이버 지도 API 객체를 찾을 수 없습니다.', {
              hasWindowNaver: !!(window as any).naver,
              hasGlobalNaver: typeof (window as any).naver !== 'undefined',
              scriptSrc: script.src
            });
            scriptLoading = false;
            if (mapRef.current) {
              mapRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:14px;padding:20px;text-align:center;">지도를 불러올 수 없습니다<br/><small style="font-size:12px;">네이버 지도 API 설정을 확인하세요</small></div>';
            }
          }
        }, 100);
      };

      script.onerror = (error) => {
        console.error('네이버 지도 API 스크립트를 로드하는데 실패했습니다.', error);
        scriptLoading = false;
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:14px;">지도 로드 실패</div>';
        }
      };

      document.head.appendChild(script);
    };

    // 지도 초기화 함수
    function initializeMap() {
      if (!mapRef.current || !isNaverMapsReady()) {
        console.warn('지도 초기화 실패: mapRef 또는 naver.maps가 준비되지 않음');
        return;
      }

      // 기존 지도 인스턴스가 있으면 제거
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }

      const naverObj = (window as any).naver || window.naver;

      try {
        const mapOptions = {
          center: new naverObj.maps.LatLng(lat, lng),
          zoom: 16,
          zoomControl: true,
          zoomControlOptions: {
            position: naverObj.maps.Position.TOP_LEFT,
            style: naverObj.maps.ZoomControlStyle.SMALL,
          },
        };

        const map = new naverObj.maps.Map(mapRef.current, mapOptions);

        // 마커 추가
        const marker = new naverObj.maps.Marker({
          position: new naverObj.maps.LatLng(lat, lng),
          map: map,
          title: address,
        });

        // 정보창 - 커스텀 스타일 적용
        const infoWindow = new naverObj.maps.InfoWindow({
          content: `
            <div style="
              display: flex;
              width: 106px;
              height: 28px;
              padding: 15px 5px;
              justify-content: center;
              align-items: center;
              gap: 10px;
              color: #000;
              text-align: center;
              font-family: Pretendard;
              font-size: 13px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            ">블랑쉬치과의원</div>
          `,
          backgroundColor: '#51E3D5',
          anchorColor: '#51E3D5', // 말풍선 꼬리 fill 색상
          borderColor: '#000', // 테두리 색상 (꼬리 stroke 포함)
          borderWidth: 1, // 테두리 두께 (stroke-width)
          maxWidth: 150, // 최대 너비 설정 (padding 포함 고려)
        });

        // 정보창 항상 열려있도록 설정
        infoWindow.open(map, marker);

        mapInstanceRef.current = map;
      } catch (error) {
        console.error('지도 초기화 중 오류 발생:', error);
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:14px;">지도 초기화 실패</div>';
        }
      }
    }

    // 스크립트 로드 및 지도 초기화
    if (isNaverMapsReady()) {
      initializeMap();
    } else {
      loadScript(initializeMap);
    }

    return () => {
      // cleanup
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, address]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .naver-map-root h4, 
        .naver-map-root h5 { 
          display: none !important; 
          height: 0 !important; 
          width: 0 !important; 
          overflow: hidden !important; 
          visibility: hidden !important; 
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}} />
      <div
        ref={mapRef}
        className={`w-full h-full naver-map-root ${className}`}
        style={{ minHeight: '100%' }}
      />
    </>
  );
}
