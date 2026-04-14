'use client';

import { useState } from 'react';
import { Container } from '@/components/layouts/Container';

/**
 * 치아교정이란 섹션 컴포넌트 (일본어)
 */
export function OrthodonticsWhatSection_JP() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const orthodonticConditions = [
        {
            label: '過蓋咬合',
            description: '上の歯が下の歯を過度に覆い、\n咬み合わせが深くなった状態',
            video: '/assets/asset-129.mp4',
        },
        {
            label: '反対咬合',
            description: '下の歯が上の歯より前に出て、\n上下の歯が逆に噛み合う状態',
            video: '/assets/asset-130.mp4',
        },
        {
            label: '交叉咬合',
            description: '一部の歯が正常な咬合位置から外れ、\n上下の歯が交差して噛み合う状態',
            video: '/assets/asset-131.mp4',
        },
        {
            label: '前歯の隙間',
            description: '前歯の間に隙間が空き、\n歯の間に空間が生じた状態',
            video: '/assets/asset-134.mp4',
        },
        {
            label: '開咬',
            description: '上の歯と下の歯が互いに触れず、\n浮いた状態で咬み合う状態',
            video: '/assets/asset-132.mp4',
        },
        {
            label: '出っ歯・乱歯',
            description: '顎の骨のスペースが不足し、\n歯が斜めや不規則に生えている状態',
            video: '/assets/asset-133.mp4',
        },
    ];

    return (
        <section className="relative w-full py-[60px] md:pt-[70px] md:pb-[100px]" style={{ backgroundColor: '#F7F8F8' }}>
            <Container>
                {/* 첫 번째 요소: 기존 텍스트 부분 */}
                <div className="flex flex-col items-start" style={{ backgroundColor: '#F7F8F8' }}>
                    <h2 className="text-[18px] font-normal leading-[30px] tracking-[-0.18px] text-black">
                        おすすめ対象
                    </h2>
                    <p className="mt-[10px] text-[28px] md:text-[28px] font-medium leading-normal tracking-[-0.35px] text-black whitespace-pre-line">
                        歯列矯正、{'\n'}
                        どのような場合に必要でしょうか？
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
                                        <span
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
                                        </span>
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
                                ボタンをクリックして事例を確認してください
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
                            不正咬合は、見た目の問題だけではありません。{'\n'}放置すると、咀嚼機能の低下や歯の摩耗、<br className="block md:hidden" /> さらには顎関節症の原因になることがあります。
                        </p>
                        <p
                            className="relative z-10 whitespace-pre-line mt-[60px] text-[27px] md:text-[28px]"
                            style={{ color: '#000', textAlign: 'center', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '-0.28px' }}
                        >
                            矯正は、{'\n'}歯の健康を守る道です。
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
