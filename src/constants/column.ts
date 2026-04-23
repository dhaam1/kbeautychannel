export interface BlogPost {
  id: number;
  category: string;
  title: string;
  authorInfo: string;
  description: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "리프팅, 전문의 칼럼",
    title: "울쎄라 리프팅이란 무엇일까요? 울쎄라 개선 사례",
    authorInfo: "리프팅, 전문의 칼럼 / 김연진 원장",
    description: "울쎄라 리프팅은 고강도 집속 초음파를 이용해 피부 깊은 곳의 근막층까지 에너지를 전달합니다. 노화로 인해 처진 피부가 개선되는 원리와 실제 사례를 확인하세요.",
  },
  {
    id: 2,
    category: "스킨부스터, 전문의 칼럼",
    title: "리쥬란 힐러 단점, 통증은 괜찮을까?",
    authorInfo: "스킨부스터, 전문의 칼럼 / 김연진 원장",
    description: "리쥬란 힐러의 통증이 걱정되시나요? 피부 재생 효과와 통증 완화 노하우, 시술 후 주의사항과 체크리스트를 정리했습니다.",
  },
  {
    id: 3,
    category: "쁘띠 시술, 전문의 칼럼",
    title: "입술 필러 후기! 케이스별 디자인과 용량",
    authorInfo: "쁘띠 시술, 전문의 칼럼 / 김연진 원장",
    description: "원하는 입술 모양에 따라 들어가는 필러 용량과 디자인이 다릅니다. 얇은 입술, 비대칭 입술 등 실제 사례로 보는 입술 필러 결과를 확인하세요.",
  },
  {
    id: 4,
    category: "피부레이저, 원장님 칼럼",
    title: "기미, 잡티 제거 레이저 선택 가이드",
    authorInfo: "피부레이저, 원장님 칼럼 / 김연진 원장",
    description: "색소 질환은 종류에 따라 적합한 레이저가 다릅니다. 피코 토닝과 엑셀브이 레이저의 차이점과 나에게 맞는 시술을 알아보세요.",
  },
  {
    id: 5,
    category: "바디 시술, 전문의 칼럼",
    title: "바디 슈링크, 복부와 허벅지 탄력 개선 효과",
    authorInfo: "바디 시술, 전문의 칼럼 / 김연진 원장",
    description: "다이어트 후 처진 바디 탄력이 고민이신가요? 바디 전용 팁을 사용한 슈링크 리프팅의 원리와 부위별 시술 효과를 상세히 알려드립니다.",
  },
  {
    id: 6,
    category: "안티에이징, 전문의 칼럼",
    title: "보톡스와 내성, 안전하게 시술받는 방법",
    authorInfo: "안티에이징, 전문의 칼럼 / 김연진 원장",
    description: "주기적으로 맞는 보톡스, 내성이 걱정되신다면? 제오민과 같은 순수 톡신의 장점과 내성 없이 안전하게 시술받는 노하우를 공개합니다.",
  }
];
