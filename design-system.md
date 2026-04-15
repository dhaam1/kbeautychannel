# KBEAUTYCHANNEL 디자인 시스템 & 컨셉 라우팅 가이드
**Concept Keyword:** 은은한 빛과 여백의 미 (Luminous & Minimal)
**Vibe:** 프리미엄 갤러리, 하이엔드 코스메틱/클리닉, 극강의 정제됨

---

## 1. Core Principles (핵심 원칙)

### 1-1. 여백이 곧 디자인 (Whitespace is Design)
- 빽빽하게 정보를 구겨 넣지 않습니다. 요소와 요소 사이의 간격을 넓고 시원하게 유지합니다.
- 패딩과 마진은 넉넉하게 설정하여 사용자의 시선이 편안하게 머물도록 유도합니다.

### 1-2. 미세한 디테일과 부드러운 전환 (Subtle & Soft)
- 극명한 그림자(Drop-shadow)보다는 옅고 부드러운 그림자를 사용하거나, 빛을 활용한 글래스모피즘(반투명)을 적극적으로 사용합니다.
- 색상이나 크기가 변할 때는 즉각적인 전환보다는 `transition-all duration-300`, `ease-in-out` 등을 통해 우아하게 페이드(Fade) 되도록 설계합니다.

### 1-3. 활자 중심의 위계 (Typography First)
- 장식적인 그래픽 보다는 '강렬하고 대비가 높은 타이포그래피'가 시각적인 무게를 잡습니다.
- 가장 중요한 메시지는 두껍고 자간을 좁혀 압도적인 느낌(`font-bold tracking-tight`)을 주고, 보조 텍스트는 얇고 고급스럽게(`tracking-widest font-light`) 뺍니다.

---

## 2. Color Palette (색상 시스템)

- **Background (Primary):** 빛을 머금은 듯한 오프 화이트 또는 아주 밝은 웜 그레이. 너무 차가운 순백색(`#FFFFFF`) 대신 눈이 편안한 밝은 톤을 유지.
- **Text (Primary):** `text-gray-900` (순수한 블랙 대신 먹색 느낌의 진한 그레이로 깊이감을 연출).
- **Text (Accent / Muted):** `text-gray-500` 또는 `text-gray-400` (부드러운 하위 메뉴나 부가 설명용).
- **Glass / Surface:** `bg-white/50`, `bg-white/70` 등 투명도를 섞은 화이트 값에 `backdrop-blur-sm` 혹은 `md` 결합.

---

## 3. Typography (서체)

현재 `index.css`에 지정된 v4 테마 연동
- **Primary (Sans-serif):** `Inter` (가독성과 현대적인 느낌)
  - 헤딩: `font-bold text-[40px] leading-tight tracking-tight`
  - 네비게이션/버튼: `text-sm font-semibold tracking-widest uppercase`
- **Accent (Serif - Optional):** `Playfair Display`
  - 클래식하고 우아한 감성이 한 방울 필요할 때 (예: 후기 인용구, 칼럼 제목 등) 선별적으로 적용합니다.

---

## 4. UI Components (핵심 컴포넌트 스타일 가이드)

### 4-1. Buttons
- **기본 스타일 (Outline):** 둥근 모서리(`rounded-full`), 얇은 테두리(`border border-gray-900`), 호버 시 반전(`hover:bg-gray-900 hover:text-white transition-colors`).
- 무겁고 둔탁한 면(Solid) 형태의 버튼보다는 라인(Line) 형태를 기본으로 하여 시원함을 줍니다.

### 4-2. Cards & Containers (전후사진, 칼럼, 후기 박스)
- **Glassmorphism:** `bg-white/50 backdrop-blur-sm px-6 py-4 rounded-3xl border border-gray-200/50 shadow-sm`
- 카드의 경계를 강하게 긋지 않고, 빛이 스며들듯 부드럽게 분리하는 것이 핵심입니다.

### 4-3. Animations
- **등장 (Entrance):** 화면 스크롤 시 아래에서 위로 부드럽게 올라와야 합니다. (Fade-up)
- **호버 (Hover):** 버튼이나 링크 위로 마우스가 올라갈 때는 투명도가 살짝 조절되거나(`hover:opacity-70`), 선의 색이 반전되는 정제된 리액션을 사용합니다. 과도한 크기 변화(Scale)는 지양합니다.

---

## 5. Section Specific Guides (향후 제작될 섹션 가이드)

1. **전문 시술 분야 (Procedures):** 텍스트를 크게 배치하고, 시술 카테고리별로 반투명한 카드가 겹치는 듯 레이어를 쌓습니다.
2. **미디어 (Media):** 텍스트보다 시각적 영상을 우위에 둡니다. 플레이어 주변으로 여백을 크게 가져가, 갤러리의 스크린처럼 고요한 분위기를 만듭니다.
3. **후기 (Reviews):** 명상적이거나 감성적인 에세이를 읽는 것처럼, 얇은 선과 `Playfair Display` 서체를 활용한 인용구(Quote) 형태로 디자인합니다.
4. **DR.KIM 칼럼:** 칼럼의 텍스트가 좌측이나 중앙에 떠 있고, 백그라운드는 옅은 노이즈(Grain) 질감이 있어 신뢰성과 아카데믹한 고급스러움을 주도록 배치합니다.
