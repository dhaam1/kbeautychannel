export interface Feature {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcedureData {
  slug: string;
  category: string;
  title: string;
  titleItalic?: string;
  description: string;
  heroBg: string;
  featuresTitle: string;
  featuresSubtitle: string;
  featuresDescription: string;
  featuresBg: string;
  features: Feature[];
  ctaLink: string;
  reservationLink: string;
}

export const PROCEDURES: Record<string, ProcedureData> = {
  thermage: {
    slug: 'thermage',
    category: 'Premium Lifting',
    title: 'Thermage',
    titleItalic: 'FLX',
    description: `피부 본연의 아름다움을 깨우는 혁신적인 탄력 솔루션.\n깊은 곳부터 차오르는 정교한 리프팅의 미학을 경험하세요.`,
    heroBg: '/images/thermage_bg_silk_2.png',
    featuresTitle: 'Exceptional Lifting experience',
    featuresSubtitle: 'Thermage Technology',
    featuresDescription: '써마지 FLX는 강력한 고주파 에너지를 통해 피부 본연의 힘을 깨웁니다. 시간이 흘러도 변치 않는 아름다움, 그 차이를 경험해 보세요.',
    featuresBg: '/images/lifting_features_bg.png',
    features: [
      {
        number: '01',
        title: 'Precision Lifting',
        description: '정교한 팁으로 피부 깊숙이 고주파 에너지를 전달하여 탄력을 극대화합니다.',
        icon: '/images/thermage_icon_1.png',
      },
      {
        number: '02',
        title: 'Collagen Boost',
        description: '고주파 열에너지가 새로운 콜라겐 생성을 촉진하여 피부 결을 개선합니다.',
        icon: '/images/thermage_icon_2.png',
      },
    ],
    ctaLink: '/contact',
    reservationLink: '/contact',
  },
  'skin-booster': {
    slug: 'skin-booster',
    category: 'Cellular Care',
    title: 'Skin',
    titleItalic: 'Booster',
    description: `피부 속 깊은 곳까지 전달되는 수분과 영양.\n본연의 광채를 되찾아주는 스킨부스터 솔루션입니다.`,
    heroBg: '/images/thermage_bg_silk_1.png',
    featuresTitle: 'Advanced Skin Rejuvenation',
    featuresSubtitle: 'Booster Technology',
    featuresDescription: '다양한 유효 성분을 통해 피부 환경을 근본적으로 개선합니다.',
    featuresBg: '/images/lifting_features_bg.png',
    features: [
      {
        number: '01',
        title: 'Deep Hydration',
        description: '피부 속 건조를 해결하고 즉각적인 수분감을 부여합니다.',
        icon: '/images/thermage_icon_1.png',
      },
      {
        number: '02',
        title: 'Texture Refinement',
        description: '거친 피부 결을 매끄럽게 다듬고 모공을 개선합니다.',
        icon: '/images/thermage_icon_2.png',
      },
    ],
    ctaLink: '/contact',
    reservationLink: '/contact',
  },
  'petit': {
    slug: 'petit',
    category: 'Natural Contouring',
    title: 'Petit',
    titleItalic: 'Design',
    description: `과하지 않은 자연스러움, 당신만이 가진 고유한 선을 살립니다.\n섬세한 디자인으로 완성되는 우아한 입체감을 경험하세요.`,
    heroBg: '/images/thermage_bg_silk_2.png',
    featuresTitle: 'Sophisticated Face Design',
    featuresSubtitle: 'Petit Surgery',
    featuresDescription: '필러와 보톡스를 활용하여 얼굴의 조화와 균형을 섬세하게 조각합니다.',
    featuresBg: '/images/lifting_features_bg.png',
    features: [
      {
        number: '01',
        title: 'Volume Balance',
        description: '부족한 볼륨을 채워 입체감 있고 생기 넘치는 얼굴 라인을 완성합니다.',
        icon: '/images/thermage_icon_3.png',
      },
      {
        number: '02',
        title: 'Line Smoothing',
        description: '불필요한 근육의 움직임을 조절하여 매끄러운 페이스 라인을 만듭니다.',
        icon: '/images/thermage_icon_4.png',
      },
    ],
    ctaLink: '/contact',
    reservationLink: '/contact',
  },
  'laser': {
    slug: 'laser',
    category: 'Precision Light',
    title: 'Skin',
    titleItalic: 'Laser',
    description: `잡티 없이 투명한 피부, 빛의 과학으로 실현합니다.\n개개인의 피부 타입에 맞춘 정밀한 레이저 솔루션을 제공합니다.`,
    heroBg: '/images/thermage_bg_silk_1.png',
    featuresTitle: 'Total Skin Correction',
    featuresSubtitle: 'Laser Technology',
    featuresDescription: '최신 레이저 장비를 통해 색소, 혈관, 모공 등 복합적인 피부 고민을 해결합니다.',
    featuresBg: '/images/lifting_features_bg.png',
    features: [
      {
        number: '01',
        title: 'Clarity Boost',
        description: '색소 침착을 개선하여 한층 더 밝고 깨끗한 피부 톤을 선사합니다.',
        icon: '/images/thermage_icon_1.png',
      },
      {
        number: '02',
        title: 'Dermal Remodeling',
        description: '진피층의 재생을 유도하여 피부 탄력과 결을 동시에 개선합니다.',
        icon: '/images/thermage_icon_2.png',
      },
    ],
    ctaLink: '/contact',
    reservationLink: '/contact',
  },
  'body': {
    slug: 'body',
    category: 'Silhouette Design',
    title: 'Body',
    titleItalic: 'Sculpt',
    description: `당신의 당당한 아름다움을 위해, 건강한 바디 라인을 설계합니다.\n체계적인 바디 컨투어링으로 완성되는 슬림한 실루엣.`,
    heroBg: '/images/thermage_bg_silk_2.png',
    featuresTitle: 'Perfect Body Contouring',
    featuresSubtitle: 'Body Solution',
    featuresDescription: '바디 리프팅과 지방 분해 솔루션을 통해 이상적인 바디 라인을 찾아드립니다.',
    featuresBg: '/images/lifting_features_bg.png',
    features: [
      {
        number: '01',
        title: 'Tightening',
        description: '탄력을 잃은 바디 피부를 쫀쫀하게 잡아주어 매끄러운 라인을 만듭니다.',
        icon: '/images/thermage_icon_3.png',
      },
      {
        number: '02',
        title: 'Fat Reduction',
        description: '고민되는 부위의 지방을 효율적으로 관리하여 슬림한 체형을 돕습니다.',
        icon: '/images/thermage_icon_4.png',
      },
    ],
    ctaLink: '/contact',
    reservationLink: '/contact',
  },
  'care': {
    slug: 'care',
    category: 'Holistic Wellness',
    title: 'Medical',
    titleItalic: 'Care',
    description: `시술 그 이상의 가치, 피부의 진정한 휴식과 재생을 지향합니다.\n의학적 근거에 기반한 메디컬 스킨케어로 피부 본연의 힘을 기릅니다.`,
    heroBg: '/images/thermage_bg_silk_1.png',
    featuresTitle: 'Essential Skin Therapy',
    featuresSubtitle: 'Premium Care',
    featuresDescription: '자극받은 피부를 진정시키고 영양을 공급하여 건강한 상태를 유지해 드립니다.',
    featuresBg: '/images/lifting_features_bg.png',
    features: [
      {
        number: '01',
        title: 'Post-Procedure',
        description: '시술 후 빠른 회복을 돕고 효과를 극대화하는 맞춤형 케어를 제공합니다.',
        icon: '/images/thermage_icon_1.png',
      },
      {
        number: '02',
        title: 'Skin Immunity',
        description: '피부 장벽을 강화하여 외부 자극으로부터 피부를 보호하는 힘을 키워줍니다.',
        icon: '/images/thermage_icon_2.png',
      },
    ],
    ctaLink: '/contact',
    reservationLink: '/contact',
  },
};
