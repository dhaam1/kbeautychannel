import { Container } from '@/components/layouts/Container';

/**
 * 수면 치료 적용 분야 섹션 컴포넌트
 * 수면 임플란트, 블랑쉬 라미네이트, 사랑니 발치, 충치·신경치료를 표시
 */
export function SleepTreatmentSection() {
  const treatmentItems = [
    {
      title: '수면 임플란트',
      description: '장시간 수술의 피로도 제로,\n다수 식립에 유리',
    },
    {
      title: '블랑쉬 라미네이트',
      description: '매복 치아 발치의\n공포와 통증 기억 차단',
    },
    {
      title: '사랑니 발치',
      description: '예민한 신경 자극을\n느끼지 못하게 조절',
    },
    {
      title: '충치·신경치료',
      description: '구역 반사 걱정 없이\n긴 시술 시간도 편안하게',
    },
  ];

  return (
    <section className="w-full bg-white">
      <Container className="pb-[60px] md:pb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {treatmentItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col pt-[40px] pb-[40px] border-b md:border-b-0 lg:border-b-0 pl-0 md:pl-[30px] lg:pl-[30px]"
              style={{ opacity: 1, transform: 'none' }}
            >
              <div className="flex flex-col border-l-0 md:border-l lg:border-l border-black pl-0 md:pl-[30px] lg:pl-[30px]">
                <h3
                  className="mb-4"
                  style={{
                    color: '#000',
                    fontSize: '20px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: 'normal',
                    letterSpacing: '-0.2px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="whitespace-pre-line"
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.16px',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
