'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layouts/Container';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';

/**
 * 네이버 지도 컴포넌트 (복제본 - 의존성 제거)
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

let scriptLoading = false;
let scriptLoaded = false;
const scriptLoadCallbacks: Array<() => void> = [];

function OrthodonticsNaverMap({ 
  lat = 37.509425461631, 
  lng = 127.02177777742, 
  address = '블랑쉬치과 의원',
  className = '' 
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    
    if (!clientId) {
      if (mapRef.current) {
        mapRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:14px;">지도를 불러올 수 없습니다</div>';
      }
      return;
    }

    const isNaverMapsReady = () => {
      const naverObj = (window as any).naver || window.naver;
      return naverObj && naverObj.maps && typeof naverObj.maps.LatLng === 'function';
    };

    const loadScript = (callback: () => void) => {
      if (scriptLoaded && isNaverMapsReady()) {
        callback();
        return;
      }

      if (scriptLoading) {
        scriptLoadCallbacks.push(callback);
        return;
      }

      const existingScript = document.querySelector(`script[src*="oapi.map.naver.com"]`);
      if (existingScript) {
        if (isNaverMapsReady()) {
          scriptLoaded = true;
          scriptLoading = false;
          callback();
          return;
        }
        scriptLoadCallbacks.push(callback);
        return;
      }

      scriptLoading = true;
      const script = document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
      script.async = true;
      script.type = 'text/javascript';
      script.id = 'naver-maps-script';
      
      script.onload = () => {
        setTimeout(() => {
          const naverObj = (window as any).naver || window.naver;
          
          if (naverObj && naverObj.maps && naverObj.maps.LatLng) {
            scriptLoaded = true;
            scriptLoading = false;
            callback();
            scriptLoadCallbacks.forEach(cb => cb());
            scriptLoadCallbacks.length = 0;
          } else {
            scriptLoading = false;
            if (mapRef.current) {
              mapRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:14px;padding:20px;text-align:center;">지도를 불러올 수 없습니다<br/><small style="font-size:12px;">네이버 지도 API 설정을 확인하세요</small></div>';
            }
          }
        }, 100);
      };

      script.onerror = () => {
        scriptLoading = false;
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:14px;">지도 로드 실패</div>';
        }
      };

      document.head.appendChild(script);
    };

    function initializeMap() {
      if (!mapRef.current || !isNaverMapsReady()) {
        return;
      }

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

        const marker = new naverObj.maps.Marker({
          position: new naverObj.maps.LatLng(lat, lng),
          map: map,
          title: address,
        });

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
          anchorColor: '#51E3D5',
          borderColor: '#000',
          borderWidth: 1,
          maxWidth: 150,
        });

        infoWindow.open(map, marker);

        mapInstanceRef.current = map;
      } catch (error) {
        if (mapRef.current) {
          mapRef.current.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:14px;">지도 초기화 실패</div>';
        }
      }
    }

    if (isNaverMapsReady()) {
      initializeMap();
    } else {
      loadScript(initializeMap);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, address]);

  return (
    <div 
      ref={mapRef} 
      className={cn("w-full h-full", className)}
      style={{ minHeight: '100%' }}
    />
  );
}

/**
 * Table 컴포넌트들 (복제본 - 의존성 제거)
 */
const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-auto">
    <table
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);

const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
);

const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
);

const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
);

const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
);

const getOrthodonticConditions = (isEn: boolean) => [
    {
      label: isEn ? 'Deep Bite' : '과개교합',
      description: isEn ? 'Upper teeth excessively overlap\nlower teeth, causing a deep bite' : '윗니가 아랫니를 과도하게 덮어\n교합이 깊어진 상태',
      video: '/assets/asset-129.mp4',
    },
    {
      label: isEn ? 'Underbite' : '반대교합',
      description: isEn ? 'Lower teeth protrude past upper teeth\nresulting in an inverted bite' : '아랫니가 윗니보다 앞으로 나와\n위아래 치아가 거꾸로 맞물리는 교합',
      video: '/assets/asset-130.mp4',
    },
    {
      label: isEn ? 'Crossbite' : '교차교합',
      description: isEn ? 'Some teeth sit inside or outside\ntheir normal arch alignment' : '일부 치아가 정상 교합 위치에서 벗어나\n위아래가 엇갈려 맞물린 상태',
      video: '/assets/asset-131.mp4',
    },
    {
      label: isEn ? 'Gaps' : '앞니 벌어짐',
      description: isEn ? 'Excess space between teeth\ncausing visible gaps' : '앞니 사이 간격이 벌어져\n치아 사이에 공간이 생긴 상태',
      video: '/assets/asset-134.mp4',
    },
    {
      label: isEn ? 'Open Bite' : '개방교합',
      description: isEn ? 'Upper and lower teeth do not\ntouch even when jaw is closed' : '윗니와 아랫니가 서로 맞닿지 않고\n떠있는 교합',
      video: '/assets/asset-132.mp4',
    },
    {
      label: isEn ? 'Crowding' : '뻐드렁니·덧니',
      description: isEn ? 'Insufficient jaw space causes\nteeth to overlap or twist' : '턱뼈의 공간이 부족해\n치아가 삐뚫어진 상태',
      video: '/assets/asset-133.mp4',
    },
  ];

  export function OrthodonticsWhatSection() {
    const locale = useLocale();
    const isEn = locale === 'en';
    const [selectedIndex, setSelectedIndex] = useState(0);
    const orthodonticConditions = getOrthodonticConditions(isEn);

  return (
    <section className="relative w-full py-[60px] md:pt-[70px] md:pb-[100px]" style={{ backgroundColor: '#F7F8F8' }}>
      <Container>
        {/* 첫 번째 요소: 기존 텍스트 부분 */}
        <div className="flex flex-col items-start" style={{ backgroundColor: '#F7F8F8' }}>
          <h2 className="text-[18px] font-normal leading-[30px] tracking-[-0.18px] text-black">
            {isEn ? 'Recommended For' : '추천 대상'}
          </h2>
          <p className="mt-[10px] text-[28px] md:text-[28px] font-medium leading-normal tracking-[-0.35px] text-black whitespace-pre-line">
            {isEn ? <>Orthodontics,{'\n'}when is it necessary?</> : <>치아교정,{'\n'}어떤 경우에 필요할까요?</>}
          </p>
        </div>

        {/* 두 번째 요소: AboutMapSection의 메인 그리드 */}
        <div className="w-full pt-[70px] pb-[60px] mx-auto overflow-visible" style={{ maxWidth: '1472px' }}>
          {/* 모바일 레이아웃 */}
          <div className="lg:hidden flex flex-col gap-0 w-full">
            {/* 버튼 row를 col로 감싸기 */}
            <div className="flex flex-col items-center gap-[10px] w-full bg-white py-[10px] px-0 border border-white border-b-0">
              <div className="grid grid-cols-2 gap-[10px] w-full px-[10px]">
                {orthodonticConditions.map((condition, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className="flex items-center justify-center cursor-pointer transition-all"
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '40px',
                      padding: '9px 14px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '10px',
                      border: '1px solid #fff',
                      background: selectedIndex === index ? '#000' : '#FFF',
                    }}
                  >
                    <h3
                      style={{
                        color: selectedIndex === index ? '#FFF' : '#000',
                        textAlign: 'center',
                        fontSize: '16px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        letterSpacing: '-0.16px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {condition.label}
                    </h3>
                  </button>
                ))}
              </div>
            </div>

            {/* 설명 박스 및 동영상 */}
            <div className="relative overflow-hidden w-full bg-[#241F1D] flex items-center justify-center border border-white" style={{ minHeight: '300px' }}>
              {/* 동영상 영역 */}
              <video
                key={selectedIndex}
                src={orthodonticConditions[selectedIndex].video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 w-full px-[10px] flex flex-col items-center gap-[10px] z-10">
                <div
                  className="flex items-center justify-center"
                  style={{
                    display: 'flex',
                    maxWidth: '449px',
                    width: '100%',
                    height: 'auto',
                    minHeight: '40px',
                    padding: '9px 14px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid #FFF',
                    background: '#000',
                  }}
                >
                  <span
                    style={{
                      color: '#FFF',
                      textAlign: 'center',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                      letterSpacing: '-0.16px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {orthodonticConditions[selectedIndex].description}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 데스크톱 레이아웃 */}
          <div 
            className="hidden lg:grid relative grid-cols-2 w-full mx-auto overflow-visible h-[449px]"
            style={{ 
              maxWidth: '1472px', 
              borderTop: '1px solid #fff',
              borderLeft: '1px solid #fff',
              background: '#FEFEFE',
            }}
          >
            <div 
              className="flex items-center justify-center w-full bg-white relative h-[449px]"
              style={{
                borderRight: '1px solid #fff',
                borderBottom: '1px solid #fff',
              }}
            >
              <p
                className="absolute bottom-[15px] left-1/2 -translate-x-1/2"
                style={{
                  color: '#000',
                  textAlign: 'center',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: 'normal',
                  letterSpacing: '-0.16px',
                }}
              >
                {isEn ? 'Click the buttons to view cases' : '버튼을 클릭해서 사례를 확인하세요'}
              </p>
<div 
    className="flex flex-col items-center gap-0"
    style={{ 
      width: '100%',     // 부모 영역 내에서 꽉 차게 설정
      maxWidth: '449px'  // 여기서 원하는 최대 너비를 설정 (예: 449px, 500px 등)
    }}
  >                {orthodonticConditions.map((condition, index) => {
                  const isFirst = index === 0;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className="flex items-center justify-center cursor-pointer transition-all"
                      style={{
                        display: 'flex',
                        maxWidth: '449px',
                        width: '100%',
                        height: '40px',
                        padding: '9px 14px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        borderTop: isFirst ? '1px solid #fff' : 'none',
                        borderLeft: '1px solid #fff',
                        borderRight: '1px solid #fff',
                        borderBottom: '1px solid #fff',
                        background: selectedIndex === index ? '#000' : '#FFF',
                      }}
                    >
                      <span
                        style={{
                          color: selectedIndex === index ? '#FFF' : '#000',
                          textAlign: 'center',
                          fontSize: '16px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: 'normal',
                          letterSpacing: '-0.16px',
                        }}
                      >
                        {condition.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div 
              className="relative overflow-hidden w-full bg-[#241F1D] h-[449px] flex items-center justify-center"
              style={{
                borderRight: '1px solid #fff',
                borderBottom: '1px solid #fff',
              }}
            >
              {/* 동영상 영역 */}
              <video
                key={selectedIndex}
                src={orthodonticConditions[selectedIndex].video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              <div className="absolute bottom-[15px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px] w-full px-[60px]">
                <div
                  className="flex items-center justify-center"
                  style={{
                    display: 'flex',
                    maxWidth: '449px',
                    width: '100%',
                    height: 'auto',
                    minHeight: '40px',
                    padding: '9px 14px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid #FFF',
                    background: '#000',
                  }}
                >
                  <span
                    style={{
                      color: '#FFF',
                      textAlign: 'center',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal',
                      letterSpacing: '-0.16px',
                    }}
                  >
                    {orthodonticConditions[selectedIndex].description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 세 번째 요소: LaminateRecommendationSection의 1행 */}
        <div className="relative w-full overflow-hidden flex-shrink-0" style={{ backgroundColor: '#F7F8F8' }}>
          <div className="flex flex-col items-center text-center w-full" style={{ backgroundColor: '#F7F8F8' }}>
            <p 
              className="relative z-10 whitespace-pre-line" 
              style={{ color: '#000', textAlign: 'center', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.18px' }}
            >
              {isEn ? <>Malocclusion is not merely an aesthetic issue.{'\n'}Left untreated, it leads to decreased chewing ability, tooth wear,<br className="block md:hidden" /> and TMJ disorders.</> : <>부정교합은 단순히 외모의 문제가 아닙니다.{'\n'}방치하면 씹는 기능 저하, 치아 마모,<br className="block md:hidden" /> 턱관절 장애로 이어집니다.</>}
            </p>
            <p 
              className="relative z-10 whitespace-pre-line mt-[60px] text-[27px] md:text-[28px]" 
              style={{ color: '#000', textAlign: 'center', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '-0.28px' }}
            >
              {isEn ? <>Orthodontics is the act of{'\n'}safeguarding your dental health</> : <>교정은,{'\n'}치아건강을 지키는 일입니다</>}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
