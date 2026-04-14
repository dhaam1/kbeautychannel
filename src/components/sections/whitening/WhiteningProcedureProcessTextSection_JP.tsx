'use client';

import { AuroraBackground } from '@/components/ui/aurora-background';

/**
 * 치아미백이란 섹션 컴포넌트 (일본어)
 * 
 * @description
 * 치아미백에 대한 설명을 제공하는 섹션입니다.
 */
export function WhiteningProcedureProcessTextSection_JP() {
    return (
        <section
            className="relative w-full overflow-hidden h-auto md:h-[524px]"
        >
            <AuroraBackground
                className="h-auto md:h-[524px]"
                flipHorizontal={true}
                style={{ backgroundColor: '#F7F8F8' }}
            >
                <div
                    className="relative flex flex-col mx-auto w-full max-w-[1472px] pt-[60px] pb-[60px] md:pt-[70px] md:pb-[100px] px-[30px] md:px-[80px]"
                >
                    {/* 치아미백이란 */}
                    <h2
                        style={{
                            color: '#000',
                            fontSize: '18px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '30px',
                            letterSpacing: '-0.18px',
                            paddingBottom: '10px',
                        }}
                    >
                        ホワイトニングとは
                    </h2>

                    {/* 착색의 원인을 지우고, 투명함을 되찾는 시술입니다 */}
                    <div
                        className="whitespace-pre-line"
                        style={{
                            color: '#000',
                            fontSize: '28px',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: 'normal',
                            letterSpacing: '-0.28px',
                            paddingBottom: '40px',
                        }}
                    >
                        着色の原因を取り除き、{'\n'}
                        歯本来の透明感を取り戻す施術です。
                    </div>

                    {/* 설명 문단 */}
                    <p
                        className="whitespace-pre-line text-[16px] md:text-[18px]"
                        style={{
                            color: '#000',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.18px',
                        }}
                    >
                        私たちの歯は、コーヒーやお茶、食品の色素が{'\n'}
                        歯の表面の微細な穴（象牙細管）に染み込み、黄色く変色することがあります。{'\n'}
                        また、加齢により内部の象牙質が濃くなる場合もあります。{'\n\n'}
                        ブランシュ歯科のホワイトニングでは、特殊成分を含むホワイトニング剤が酸素作用を起こし、{'\n'}
                        歯の構造を損なうことなく、着色された有機物質だけを選択的に分解します。{'\n'}
                        これにより光の透過率が高まり、歯の内部から澄んだ美しい色調を取り戻すことができます。
                    </p>
                </div>
            </AuroraBackground>
        </section>
    );
}
