import { Container } from '@/components/layouts/Container';

/**
 * 치과 공포증 섹션 컴포넌트
 * 주사 공포, 소리/냄새 공포, 구역 반사, 장시간 치료 공포를 표시
 */
export function OrthodonticsFearSection() {
  const fearItems = [
    {
      title: '주사 공포',
      description: '마취 바늘만 봐도 심장이 두근거린다면',
    },
    {
      title: '소리, 냄새 공포',
      description: '치과 특유의 기계음과 냄새가 견디기 힘들다면',
    },
    {
      title: '구역 반사',
      description: '입 안에 기구가 닿을 때 심한 구역질이 올라온다면',
    },
    {
      title: '장시간 치료 공포',
      description: '오래 입 벌리고 있는 게 너무 힘들다면',
    },
  ];

  return (
    <section className="w-full bg-white">
      <Container className="pb-[60px] md:pb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {fearItems.map((item, index) => (
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
