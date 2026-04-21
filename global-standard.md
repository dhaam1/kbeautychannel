# architecture_rules
- **Framework Constraint**: 반드시 Next.js App Router (`src/app`) 뼈대를 준수하십시오.
- **Feature-Sliced Design (FSD)**: 폴더 구조는 무작위 컴포넌트 생성이 아닌 기능(Feature)/도메인(Domain) 단위로 격리하십시오.
- **Strict Logic Abstraction (View vs Logic)**: UI 컴포넌트는 오직 '렌더링(View)'만 관장해야 합니다. API 호출, 비즈니스 로직, 복잡한 다국어 데이터 주입은 **반드시 커스텀 훅(Custom Hooks)이나 Container/Presenter 아키텍처를 도입해** View로부터 추상화하십시오.
- **Built-in Globalization (i18n)**: 화면에 텍스트를 직접 하드코딩하지 마십시오. 처음부터 `next-intl` 등 글로벌 스탠다드 로컬라이제이션 라이브러리를 바탕으로 JSON 파일(`/messages/`) 단위의 다국어 전환 능력을 갖춘 구조로 코딩하십시오.


# frontend_performance_rules
- **Zero CLS & Maximum LCP**: (특히 메인 히어로 섹션과 같이) 사용자가 처음 진입할 때 뷰포트 상단에 뜨는 고해상도 에셋은 누적 레이아웃 이동(CLS)이 나지 않도록 고정된 여백을 잡고, 무조건 `next/image`를 사용해 `priority`, `sizes`를 섬세하게 부여하여 로딩 속도를 극대화하십시오.
- **Code-Splitting for Dynamic Content**: 뷰포트(스크롤) 한참 아래에 위치한 무거운 애니메이션 섹션이나 써드파티 컴포넌트(`framer-motion`을 거대하게 쓴 블록 등)는 `next/dynamic` 또는 `React.lazy`를 통한 동적 임포트(Dynamic Import)를 강제하여 초기 쓰레드 블록을 없애십시오.
- **GPU Accelerated Rendering**: 애니메이션이나 트랜지션을 조작할 때 브라우저 렌더링에 큰 비용인 Reflow(레이아웃 재계산: `width`, `height`, `margin` 등)를 발생시키는 속성은 금지합니다. 오직 **하드웨어 가속**이 가능한 `transform`과 `opacity`만을 움직이고, 성능이 중대한 엘리먼트엔 `will-change` 속성을 부여하십시오.


# backend_infrastructure_rules
- **Adapter/Repository Pattern (No Vendor Lock-in)**: Firebase App Hosting 등 특정 Serverless/BaaS 플랫폼만을 위해 만들더라도, 프론트 코드 베이스에 Firebase SDK 같은 벤더 전용 코드를 무분별하게 흩뿌리지 마십시오. **반드시 어댑터(Adapter) 패턴이나 API 레포지토리 계층을 추상화하여 분리**하십시오. 이를 통해 훗날 AWS, GCP Native 또는 독자적인 Node.js 백엔드로 인프라를 전체 마이그레이션하더라도 React 컴포넌트 코드(View)는 단 한 줄도 수정되지 않게 만들어야 합니다.
- **Edge Computing & Caching**: 글로벌 사용자의 Time To First Byte (TTFB)를 최소화하기 위해 CDN, 브라우저 캐싱, Edge Middleware를 아키텍처 레벨에 도입하여 어느 국가에서 접속하든 응답 속도 지연이 없는 구조를 구축하십시오.


# 