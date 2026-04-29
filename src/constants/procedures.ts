export interface Feature {
  number: string;
  title: string;
  description: string;
  icon: string;
  targets?: string[];
  effects?: string[];
  image?: string;
  qna?: { q: string; a: string }[];
  // 시술 상세 정보
  recommendedArea?: string; // 추천부위
  duration?: string;        // 시술시간
  downtime?: string;        // 다운타임
  anesthesia?: string;      // 마취
  maintenance?: string;     // 유지기간
  enTitle?: string;         // 영문 이름
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
    featuresTitle: 'World-class Lifting Collection',
    featuresSubtitle: 'Premium Equipment',
    featuresDescription: 'UHCELL은 전 세계적으로 검증된 최상위 리프팅 장비만을 엄선하여,\n당신에게 가장 완벽한 타이트닝 솔루션을 제안합니다.',
    featuresBg: '/images/lifting_features_bg.png',
    features: [
      {
        number: '01',
        title: '써마지FLX',
        enTitle: 'Thermage FLX',
        description: '단극성 고주파(RF)로 진피 깊은 층을 가열해 새 콜라겐이 형성되며 쳐짐과 잔주름을 개선시키는 리프팅입니다. AccuREP 기술로 매 샷마다 피부 저항을 읽고 커스터마이징해 조사합니다.',
        icon: '/images/thermage_flx_premium.png',
        image: '/images/lifting_texture.png',
        recommendedArea: '얼굴 전체, 눈가, 목',
        duration: '50분',
        downtime: '시술 직후 일상생활 가능',
        anesthesia: '꼼꼼한 연고 마취',
        maintenance: '10~12개월',
        targets: [
          '피부 탄력 저하로 고민이신 분', 
          '잔주름 및 피부 결 개선을 원하시는 분', 
          '통증이 적고 효과적인 리프팅을 원하시는 분',
          '수술 없이 자연스러운 리프팅을 원하시는 분'
        ],
        effects: ['진피층 콜라겐 재생 촉진', '피부 타이트닝 및 잔주름 개선', '자연스러운 페이스 라인 리프팅'],
        qna: [
          { q: '써마지FLX의 시술 원리는 무엇인가요?', a: '고주파(RF) 전류를 진피층에 전달하여 콜라겐 섬유의 수축과 재생을 유도합니다. 피부 표면은 쿨링 시스템으로 보호하면서 깊은 층에 강력한 열을 전달해 피부 밀도를 높여줍니다.' },
          { q: '시술 시 통증이 어느 정도인가요?', a: '뜨거운 열감이 느껴지며 따가울 수 있습니다. 하지만 최신 FLX 장비는 진동 기능과 정교한 쿨링 시스템이 탑재되어 이전보다 통증이 현저히 줄어들었으며, 대개 연고 마취만으로도 충분히 시술 가능합니다.' },
          { q: '일상생활로 바로 복귀가 가능한가요?', a: '시술 직후 세안과 화장이 가능할 정도로 다운타임이 거의 없습니다. 일시적으로 붉은 기나 미세한 부기가 있을 수 있으나 몇 시간 내에 자연스럽게 사라집니다.' },
          { q: '시술 후 주의사항이 궁금합니다.', a: '일주일 동안 음주, 사우나, 격한 운동은 피하는 것이 좋습니다. 또한 콜라겐 재생을 돕기 위해 보습 관리를 철저히 하고 외출 시 자외선 차단제를 꼼꼼히 바르는 것을 권장합니다.' }
        ],
      },
      {
        number: '02',
        title: '올리지오X',
        enTitle: 'Oligio X',
        description: '한국인 피부 타입에 최적화된 고주파 에너지로 완성하는 정교한 타이트닝.',
        icon: '/images/thermage_icon_2.png',
        image: '/images/lifting_texture.png',
        recommendedArea: '얼굴 전체, 볼, 눈가',
        duration: '30분 - 40분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '연고 마취',
        maintenance: '6개월 - 1년',
        targets: [
          '민감한 피부에도 자극 없는 시술을 원하시는 분', 
          '자연스러운 리프팅 효과를 원하시는 분', 
          '시술 직후 일상 복귀가 필요하신 분',
          '이중턱 및 처진 볼살이 고민이신 분'
        ],
        effects: ['피부 표면 타이트닝', '콜라겐 및 엘라스틴 재생 활성화', '피부 결 및 톤 개선'],
        qna: [
          { q: '올리지오X의 시술 원리는 무엇인가요?', a: '강력한 고주파 에너지를 진피층에 전달하여 노화된 콜라겐을 수축시키고 새로운 콜라겐 생성을 자극합니다. 올리지오X는 더 정교한 쿨링과 진동 모드로 안전하고 빠른 시술이 가능합니다.' },
          { q: '통증은 어떤가요?', a: '써마지에 비해 통증이 적은 편이며, 지능형 쿨링 시스템이 피부 표면 온도를 실시간으로 체크하여 열감을 조절해줍니다. 따끔한 느낌이 들 수 있지만 대개 마취 없이도 편안하게 시술받으실 수 있습니다.' },
          { q: '일상 복귀까지 얼마나 걸리나요?', a: '시술 직후 즉시 일상생활이 가능합니다. 흉터나 딱지가 생기지 않아 점심시간을 이용해 시술받는 분들이 많을 정도로 부담이 적습니다.' },
          { q: '주의사항은 무엇인가요?', a: '시술 부위에 강한 자극을 주지 않도록 주의하고, 일주일간 음주 및 열감이 발생하는 장소(사우나 등)는 피해주세요. 자외선 차단제와 보습제를 충분히 사용해 피부 재생을 도와주는 것이 좋습니다.' }
        ],
      },
      {
        number: '03',
        title: '소프웨이브',
        enTitle: 'Sofwave',
        description: '차세대 초음파 기술로 피부 표면 손상 없이 깊은 층까지 탄력을 전달.',
        icon: '/images/thermage_icon_3.png',
        image: '/images/lifting_texture.png',
        recommendedArea: '눈가, 입가, 목 주름',
        duration: '30분 - 45분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '연고 마취',
        maintenance: '1년 - 1년 6개월',
        targets: [
          '눈가/입가 잔주름이 고민이신 분', 
          '자연스러운 리프팅을 원하시는 분', 
          '빠른 시술을 원하시는 분',
          '볼 패임 걱정 없이 탄력을 높이고 싶으신 분'
        ],
        effects: ['상부 진피층 탄력 개선', '잔주름 완화', '피부 타이트닝'],
        qna: [
          { q: '소프웨이브의 시술 원리는 무엇인가요?', a: '입체적인 원통형 초음파 에너지를 상부 진피층에 전달하여 콜라겐 수축과 생성을 유도합니다. 피부 표면은 강력하게 보호하면서 정확한 깊이에만 에너지를 전달하는 것이 특징입니다.' },
          { q: '통증은 어느 정도인가요?', a: '연고 마취 후 시술 시 약간의 따끔함이나 열감이 느껴질 수 있으나, 최신 쿨링 기술 덕분에 통증 부담이 적은 편입니다.' },
          { q: '일상 복귀가 바로 가능한가요?', a: '피부 표면에 상처를 내지 않으므로 시술 직후 즉시 일상생활이 가능합니다. 붓기나 붉은 기가 매우 적습니다.' },
          { q: '주의사항이 있나요?', a: '시술 후 일주일간 음주, 사우나를 피하고 충분한 수분 섭취와 보습 관리를 해주시면 재생 효과를 더욱 높일 수 있습니다.' }
        ],
      },
      {
        number: '04',
        title: '울쎄라피 프라임',
        enTitle: 'Ultherapy Prime',
        description: '초음파 영상으로 피부 층을 직접 보며 시술하는 프리미엄 커스텀 리프팅.',
        icon: '/images/thermage_icon_4.png',
        image: '/images/lifting_texture.png',
        recommendedArea: '얼굴 하안부, 턱선, 이중턱, 목',
        duration: '60분 내외',
        downtime: '즉시 일상생활 가능 (미세 붓기 가능)',
        anesthesia: '연고 마취 / 국소 마취 / 수면 마취',
        maintenance: '1년 - 2년',
        targets: [
          '볼 처짐 및 이중턱 개선을 원하시는 분', 
          '정교한 맞춤형 시술을 원하시는 분', 
          '확실한 리프팅 효과를 원하시는 분',
          '안면 윤곽의 뚜렷한 리모델링을 원하시는 분'
        ],
        effects: ['근막층(SMAS) 수축 및 리프팅', '턱선 및 얼굴 윤곽 개선', '피부 탄력 및 재생 유도'],
        qna: [
          { q: '울쎄라의 시술 원리는 무엇인가요?', a: '고강도 집속 초음파(HIFU)를 피부 깊숙한 근막층(SMAS)에 전달하여 열 응고점을 생성합니다. 이를 통해 느슨해진 조직을 수축시키고 근본적인 리프팅 효과를 유도합니다.' },
          { q: '통증이 어느 정도인가요?', a: '깊은 층까지 에너지가 전달되므로 뼈 근처 부위에서 뻐근하거나 묵직한 통증이 느껴질 수 있습니다. 통증 민감도에 따라 마취 방법(수면 마취 등)을 선택하여 편안하게 진행 가능합니다.' },
          { q: '일상 복귀 시 고려할 점은?', a: '시술 직후 붉은 기나 약간의 부기가 있을 수 있으나 며칠 내에 가라앉습니다. 겉으로 드러나는 흉터가 없으므로 바로 출근이나 외출이 가능합니다.' },
          { q: '특별한 주의사항이 있나요?', a: '시술 후 일시적으로 얼얼한 느낌이 들 수 있으나 이는 정상적인 과정입니다. 1주일간 사우나, 음주, 격한 운동을 피하고 자외선 차단에 유의하십시오.' }
        ],
      },
      {
        number: '05',
        title: '슈링크유니버스',
        enTitle: 'Shurink Universe',
        description: '더욱 빨라진 속도와 정교해진 모드로 완성하는 V라인 실루엣.',
        icon: '/images/thermage_icon_5.png',
        image: '/images/lifting_texture.png',
        recommendedArea: 'V라인, 팔자주름, 눈가',
        duration: '15분 - 20분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '연고 마취',
        maintenance: '3개월 - 6개월',
        targets: [
          '얼굴 라인 정리를 원하시는 분', 
          '이중턱 개선이 필요하신 분', 
          '가성비 좋은 리프팅을 원하시는 분',
          '시술 시간이 짧은 관리를 찾으시는 분'
        ],
        effects: ['V라인 윤곽 개선', '피부 탄력 증진', '콜라겐 생성 유도'],
        qna: [
          { q: '슈링크유니버스의 원리는 무엇인가요?', a: '고강도 집속 초음파를 이용해 근막층에 열 응고점을 만들어 리프팅을 유도합니다. 유니버스는 선 타입과 점 타입을 병행하여 더욱 촘촘한 시술이 가능합니다.' },
          { q: '통증은 어떤가요?', a: '시술 속도가 매우 빨라 통증을 느끼는 시간이 짧고, 연고 마취만으로도 충분히 시술 가능할 정도로 통증이 조절되었습니다.' },
          { q: '일상 복귀는 언제쯤인가요?', a: '시술 직후 즉시 일상생활이 가능합니다. 멍이나 부기가 거의 없어 바로 메이크업이 가능합니다.' },
          { q: '주의사항이 궁금합니다.', a: '시술 후 일주일간은 피부가 건조할 수 있으니 보습에 신경 쓰고, 음주 및 사우나는 자제해주시는 것이 좋습니다.' }
        ],
      },
      {
        number: '06',
        title: '리니어지',
        enTitle: 'Linear Z',
        description: '선 타입 초음파 에너지를 통해 빈틈없이 촘촘하게 채워주는 탄력 케어.',
        icon: '/images/thermage_icon_2.png',
        image: '/images/lifting_texture.png',
        recommendedArea: '볼, 턱선, 광대',
        duration: '10분 - 15분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '마취 크림 (선택)',
        maintenance: '3개월 - 6개월',
        targets: [
          '빈틈없는 촘촘한 리프팅을 원하시는 분', 
          '볼륨 개선과 리프팅을 동시에 원하시는 분', 
          '시술 통증에 민감하신 분',
          '맞춤형 깊이 조절 리프팅을 원하시는 분'
        ],
        effects: ['맞춤형 깊이 조절 리프팅', '지방 감소 및 탄력 개선', '정교한 윤곽 교정'],
        qna: [
          { q: '리니어지의 시술 원리는 무엇인가요?', a: '선(Line) 형태의 초음파 에너지를 조사하여 빈틈없이 촘촘하게 열 응고점을 형성합니다. 지방 감소와 탄력 개선을 동시에 선택적으로 조절할 수 있습니다.' },
          { q: '통증은 어느 정도인가요?', a: '기존 도트 방식보다 통증이 현저히 적으며, 시술 속도가 빨라 환자분들의 부담이 매우 적은 시술입니다.' },
          { q: '일상 복귀 시 주의할 점은?', a: '즉시 일상생활이 가능하며 특별한 회복 기간이 필요하지 않습니다.' },
          { q: '주의사항은 무엇인가요?', a: '일주일간 사우나, 음주를 피하고 충분한 수분 섭취를 권장합니다.' }
        ],
      },
      {
        number: '07',
        title: '브이로',
        enTitle: 'V-RO',
        description: '고주파와 초음파의 결합으로 복합적인 피부 고민을 한 번에 해결하는 듀얼 시술.',
        icon: '/images/thermage_icon_3.png',
        image: '/images/lifting_texture.png',
        recommendedArea: '얼굴 전체, 목',
        duration: '30분 내외',
        downtime: '즉시 일상생활 가능',
        anesthesia: '연고 마취',
        maintenance: '6개월 - 1년',
        targets: [
          '복합적인 탄력 고민이 있으신 분', 
          '시너지가 큰 리프팅을 원하시는 분', 
          '처진 살 개선이 필요하신 분',
          '콜라겐 생성과 근막 수축을 동시에 원하는 분'
        ],
        effects: ['고주파와 초음파의 시너지 리프팅', '피부 층별 맞춤 탄력 케어', '피부 결 개선'],
        qna: [
          { q: '브이로의 시술 원리는 무엇인가요?', a: '고주파(RF)와 초음파(HIFU) 에너지를 결합하여 피부 층별로 입체적인 탄력 케어를 제공합니다. 두 가지 시너지를 통해 리프팅 효과를 극대화합니다.' },
          { q: '통증은 어떤가요?', a: '비침습적 방식으로 통증이 적으며, 센서가 장착되어 화상 등 부작용을 방지하고 편안한 시술을 돕습니다.' },
          { q: '일상 복귀는 바로 가능한가요?', a: '네, 시술 직후 일상생활에 지장이 없으며 붉은 기는 금방 소실됩니다.' },
          { q: '주의사항이 있나요?', a: '보습 관리와 자외선 차단에 신경 쓰고 일주일간 자극적인 환경은 피해주세요.' }
        ],
      },
      {
        number: '08',
        title: '티타늄',
        enTitle: 'Titanium',
        description: '세 가지 파장을 동시에 조사하여 리프팅, 타이트닝, 브라이트닝을 동시에.',
        icon: '/images/thermage_icon_4.png',
        image: '/images/lifting_texture.png',
        recommendedArea: '얼굴 전체, 턱선',
        duration: '20분 - 30분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '마취 없음 (쿨링 시스템)',
        maintenance: '3개월 - 6개월',
        targets: [
          '즉각적인 효과를 원하시는 분', 
          '화이트닝과 리프팅을 동시에 잡고 싶으신 분', 
          '중요한 일정을 앞두신 분',
          '통증 없이 편안한 시술을 선호하시는 분'
        ],
        effects: ['즉각적인 리프팅 및 타이트닝', '피부 톤 브라이트닝', '통증 없는 편안한 시술'],
        qna: [
          { q: '티타늄 리프팅의 원리는 무엇인가요?', a: '세 가지 파장의 레이저를 동시에 조사하여 진피층부터 근막층까지 강력한 에너지를 전달합니다. 리프팅뿐만 아니라 브라이트닝 효과까지 동시에 기대할 수 있습니다.' },
          { q: '통증이 있나요?', a: '강력한 사파이어 쿨링 시스템 덕분에 통증이 거의 없어 마취 없이도 편안하게 받을 수 있는 저통증 시술입니다.' },
          { q: '일상 복귀는 어떤가요?', a: '시술 직후 즉각적으로 얼굴이 환해지고 리프팅된 효과를 볼 수 있으며, 다운타임이 전혀 없습니다.' },
          { q: '주의사항이 궁금합니다.', a: '외출 시 자외선 차단제를 꼼꼼히 바르고 일주일간 음주와 사우나는 피해주시기 바랍니다.' }
        ],
      },
      {
        number: '09',
        title: '온다',
        enTitle: 'Onda',
        description: '극초음파(Microwave) 에너지를 이용해 통증은 줄이고 효과는 극대화한 신개념 리프팅.',
        icon: '/images/thermage_icon_1.png',
        image: '/images/lifting_texture.png',
        recommendedArea: '이중턱, 심부볼, 하안면',
        duration: '15분 - 20분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '마취 없음 (접촉식 쿨링)',
        maintenance: '6개월 - 1년',
        targets: [
          '이중턱이나 볼살 지방이 고민이신 분', 
          '통증 없는 리프팅을 선호하시는 분', 
          '슬림한 라인을 원하시는 분',
          '수술 없이 얼굴의 불필요한 지방을 정리하고 싶은 분'
        ],
        effects: ['지방 세포 분해 및 배출', '피부 타이트닝', '콜라겐 재생 촉진'],
        qna: [
          { q: '온다 리프팅의 원리는 무엇인가요?', a: '특수 마이크로파(Microwave)를 사용하여 피부 표면 손상 없이 깊은 층에 에너지를 전달, 지방 분해와 탄력 개선을 유도하는 신개념 시술입니다.' },
          { q: '통증은 어떤가요?', a: '피부 표면은 차갑게 유지하면서 속으로만 열을 전달하므로 통증이 거의 없는 것이 큰 장점입니다.' },
          { q: '일상 복귀 시간은?', a: '즉시 일상생활이 가능하며 부기나 멍이 거의 없습니다.' },
        ],
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
        title: '쥬베룩',
        enTitle: 'Juvelook',
        description: '자가 콜라겐 생성을 유도하여 자연스러운 볼륨과 결 개선을 동시에.',
        icon: '/images/thermage_icon_1.png',
        image: '/images/booster_texture.png',
        recommendedArea: '얼굴 전체, 흉터 부위',
        duration: '20분 - 30분',
        downtime: '1-2일 (엠보 현상 가능)',
        anesthesia: '연고 마취',
        maintenance: '3회 시술 시 1년 이상',
        targets: [
          '패인 흉터나 넓은 모공이 고민이신 분', 
          '자연스러운 탄력 개선을 원하시는 분', 
          '피부 결 개선을 원하시는 분',
          '속건조를 근본적으로 해결하고 싶으신 분'
        ],
        effects: ['자가 콜라겐 재생 촉진', '모공 및 흉터 개선', '피부 탄력 및 결 개선'],
        qna: [
          { q: '쥬베룩의 시술 원리는 무엇인가요?', a: '고분자 PLA와 히알루론산(HA) 성분이 결합된 복합 스킨부스터로, 피부 속에 주입되어 자가 콜라겐 생성을 지속적으로 유도합니다. 이를 통해 볼륨감과 피부 탄력을 자연스럽게 개선합니다.' },
          { q: '통증은 어떤가요?', a: '주사 방식에 따라 따끔한 느낌이 있지만 마취 연고 도포 후 진행하므로 통증 부담이 적습니다. 최근에는 하이쿡스 등 전용 인젝터를 사용해 통증과 엠보싱을 더욱 줄일 수 있습니다.' },
          { q: '일상 복귀 시간은 어떻게 되나요?', a: '시술 후 1-2일 정도 미세한 멍이나 엠보싱(올록볼록한 현상)이 있을 수 있으나 금방 가라앉습니다. 다음 날부터 화장이 가능하여 일상생활에 큰 지장이 없습니다.' },
          { q: '주의사항은 무엇인가요?', a: '시술 부위를 과도하게 문지르지 말고 일주일간 사우나, 음주, 격한 운동은 삼가야 합니다. 충분한 수분 섭취와 재생 관리가 효과 유지에 도움을 줍니다.' }
        ]
      },
      {
        number: '02',
        title: '리쥬란 힐러',
        enTitle: 'Rejuran Healer',
        description: '연어 주사로 알려진 PN 성분으로 피부 속 환경을 근본적으로 개선.',
        icon: '/images/thermage_icon_2.png',
        image: '/images/booster_texture.png',
        recommendedArea: '얼굴 전체, 눈가',
        duration: '15분 - 20분',
        downtime: '2-3일 (엠보 현상)',
        anesthesia: '연고 마취',
        maintenance: '3-6개월',
        targets: [
          '유수분 밸런스가 깨진 분', 
          '피부 노화가 고민이신 분', 
          '민감한 피부를 건강하게 만들고 싶은 분',
          '피부 장벽이 무너져 트러블이 잦은 분'
        ],
        effects: ['피부 재생 능력 활성화', '유수분 밸런스 조절', '잔주름 개선 및 탄력 증진'],
        qna: [
          { q: '리쥬란의 시술 원리는 무엇인가요?', a: '연어에서 추출한 생체 적합 물질인 PN(Polynucleotide)을 진피층에 직접 주입하여 손상된 피부의 재생 능력을 활성화하고 장벽을 복구합니다.' },
          { q: '통증이 심하다고 들었는데 어떤가요?', a: '점성이 있는 성분을 주입하기 때문에 따끔한 통증이 있는 편입니다. 통증이 걱정되시는 경우 리쥬란HB 플러스(마취 성분 포함)나 무통 마취 장비를 활용해 통증을 줄여드릴 수 있습니다.' },
          { q: '일상 복귀 시 주의할 점은?', a: '시술 직후 엠보싱 현상이 나타나며 보통 1-3일 내에 사라집니다. 세안은 시술 당일부터 가능하며 자극적인 메이크업은 하루 정도 피하시는 것이 좋습니다.' },
          { q: '주의사항이 궁금합니다.', a: '시술 후 일주일간 고온다습한 환경(사우나, 찜질방)과 격한 운동을 피하고, 재생 크림을 수시로 덧발라 피부 진정과 재생을 도와주는 것이 좋습니다.' }
        ]
      },
      {
        number: '03',
        title: '엑소좀',
        enTitle: 'Exosome',
        description: '줄기세포 유래 성분으로 강력한 피부 재생과 염증 완화 효과.',
        icon: '/images/thermage_icon_3.png',
        image: '/images/booster_texture.png',
        recommendedArea: '얼굴 전체, 여드름 부위',
        duration: '15분 - 20분',
        downtime: '당일 수시간 내 진정',
        anesthesia: '연고 마취 (MTS 진행 시)',
        maintenance: '1-3개월',
        targets: [
          '여드름 등 염증성 트러블이 고민인 분',
          '항노화 안티에이징 관리가 필요하신 분',
          '생기 잃은 피부톤을 환하게 밝히고 싶은 분',
          '피부 진정과 보습 관리를 동시에 원하는 분'
        ],
        effects: ['손상된 세포 회복', '강력한 항염 작용', '피부결 및 톤 개선'],
        qna: [
          { q: '엑소좀의 시술 원리는 무엇인가요?', a: '줄기세포 배양액에서 추출한 고순도 엑소좀을 피부에 전달하여 세포 간 신호 전달을 활성화하고, 손상된 피부 재생 및 염증 완화를 유도합니다.' },
          { q: '통증과 일상 복귀는 어떤가요?', a: 'MTS나 레이저와 병행하여 침투시키거나 인젝터로 주입합니다. 약간의 따끔함이 있으나 회복이 빠르고 당일 일상생활이 가능합니다.' },
          { q: '다른 스킨부스터와 차별점은 무엇인가요?', a: '항염 효과가 뛰어나 난치성 여드름이나 민감성 피부의 염증을 완화하는 데 특히 탁월한 효과를 보입니다.' }
        ]
      }
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
        title: '디자인 필러',
        enTitle: 'Design Filler',
        description: '부족한 볼륨을 채워 입체감 있고 생기 넘치는 얼굴 라인을 완성합니다.',
        icon: '/images/thermage_icon_3.png',
        image: '/images/petit_texture.png',
        recommendedArea: '이마, 코, 볼, 턱끝, 입술',
        duration: '15분 - 30분',
        downtime: '즉시 일상생활 가능 (멍/부기 가능)',
        anesthesia: '연고 마취 및 국소 마취',
        maintenance: '6개월 - 1년 이상',
        targets: [
          '꺼진 볼이나 이마가 고민이신 분', 
          '뚜렷한 이목구비를 원하시는 분', 
          '자연스러운 입체감을 원하시는 분',
          '수술 없이 빠르고 간편하게 인상을 개선하고 싶은 분'
        ],
        effects: ['즉각적인 볼륨 증대', '얼굴 윤곽 교정', '생기 있는 인상 개선'],
        qna: [
          { q: '필러의 시술 원리는 무엇인가요?', a: '히알루론산 등 인체 구성 성분과 유사한 물질을 꺼진 부위에 주입하여 즉각적인 볼륨감을 형성하고 입체적인 윤곽을 만듭니다.' },
          { q: '통증이 어느 정도인가요?', a: '주사 시 따끔한 느낌이 있지만 마취 성분이 포함된 필러 제품을 사용하거나 국소 마취를 병행하여 통증을 최소화합니다.' },
          { q: '일상 복귀는 바로 가능한가요?', a: '시술 직후 바로 일상생활이 가능합니다. 다만 시술 부위에 따라 미세한 부기나 멍이 있을 수 있으나 며칠 내로 사라집니다.' },
          { q: '주의사항은 무엇인가요?', a: '약 2주간 시술 부위에 강한 압력을 주거나 마사지하는 것을 금하며, 일주일간 음주와 흡연, 고온 사우나는 피해야 합니다. 모양 변형을 방지하기 위해 과도한 표정 근육 사용도 주의해주세요.' }
        ]
      },
      {
        number: '02',
        title: 'V라인 보톡스',
        enTitle: 'V-line Botox',
        description: '불필요한 근육의 움직임을 조절하여 매끄러운 페이스 라인을 만듭니다.',
        icon: '/images/thermage_icon_4.png',
        image: '/images/petit_texture.png',
        recommendedArea: '사각턱',
        duration: '5분 내외',
        downtime: '즉시 일상생활 가능',
        anesthesia: '마취 연고 (선택) / 아이스팩',
        maintenance: '3-6개월',
        targets: [
          '사각턱 근육이 발달하신 분', 
          '매끄러운 턱선을 원하시는 분', 
          '주름 개선을 원하시는 분',
          '이를 악무는 습관으로 턱 근육이 비대해진 분'
        ],
        effects: ['사각턱 근육 축소', '주름 완화', '매끄러운 페이스 라인'],
        qna: [
          { q: '보톡스의 시술 원리는 무엇인가요?', a: '신경전달물질의 분비를 차단하여 근육의 수축을 일시적으로 억제합니다. 이를 통해 표정 주름을 완화하거나 발달된 근육의 부피를 줄여줍니다.' },
          { q: '통증은 어떤가요?', a: '주사 시 따끔한 정도이며 시술 시간이 매우 짧아 통증 부담이 거의 없습니다.' },
          { q: '일상 복귀는 언제인가요?', a: '즉시 가능하며 흉터가 남지 않아 바로 일상생활로 돌아갈 수 있습니다.' },
          { q: '주의사항이 있나요?', a: '시술 후 3-4시간 동안은 눕지 않는 것이 좋으며, 시술 부위를 문지르지 마세요. 일주일간 사우나, 음주, 격한 운동은 피해야 합니다.' }
        ]
      },
      {
        number: '03',
        title: '윤곽주사',
        enTitle: 'Contouring Injection',
        description: '불필요한 지방을 분해하여 더욱 슬림한 얼굴 라인을 완성.',
        icon: '/images/thermage_icon_5.png',
        image: '/images/petit_texture.png',
        recommendedArea: '이중턱, 심부볼, 광대살',
        duration: '10분 내외',
        downtime: '수 시간 내 붓기 감소',
        anesthesia: '아이스팩 쿨링',
        maintenance: '반영구 (체중 유지 시)',
        targets: [
          '얼굴에 군살이 많아 턱선이 둔탁해 보이는 분',
          '수술 없이 갸름한 V라인을 만들고 싶은 분',
          '다이어트를 해도 얼굴 살이 잘 안 빠지는 분',
          '뼈 수술 없이 비대칭 얼굴 윤곽을 개선하고 싶은 분'
        ],
        effects: ['지방 세포 분해 촉진', '림프 순환 및 노폐물 배출', '슬림한 얼굴 윤곽 완성'],
        qna: [
          { q: '윤곽주사의 원리는 무엇인가요?', a: '지방 세포를 분해하고 림프 순환을 촉진하는 약물을 주입하여 얼굴의 불필요한 지방을 제거하고 라인을 정리합니다.' },
          { q: '일상 복귀와 주의사항은?', a: '즉시 가능하며 약물로 인한 약간의 붓기가 있을 수 있으나 수 시간 내에 가라앉습니다. 수분 섭취를 늘리고 일주일간 자극적인 환경은 피해주세요.' },
          { q: '효과는 언제부터 나타나나요?', a: '개인차가 있으나 보통 시술 1~2주 후부터 서서히 라인이 슬림해지는 효과를 느낄 수 있습니다.' }
        ]
      }
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
        title: '피코 토닝',
        enTitle: 'Pico Toning',
        description: 'Pico초 단위 레이저로 색소 입자를 정교하게 파괴하는 화이트닝 솔루션.',
        icon: '/images/thermage_icon_1.png',
        image: '/images/laser_texture.png',
        recommendedArea: '얼굴 전체',
        duration: '10분 - 15분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '없음',
        maintenance: '장기 유지',
        targets: [
          '기미와 잡티 등 색소 고민이 있으신 분', 
          '피부 톤 개선을 원하시는 분', 
          '일상에 지장 없는 레이저를 원하시는 분',
          '과거 레이저 시술로 효과를 보지 못하신 분'
        ],
        effects: ['기미 및 색소 질환 개선', '피부 톤 화이트닝', '피부 결 개선'],
        qna: [
          { q: '피코 토닝의 원리는 무엇인가요?', a: '1조분의 1초(Pico) 단위로 레이저를 조사하여 주변 조직 손상을 최소화하면서 색소 입자만을 정밀하게 잘게 부수어 배출을 유도합니다.' },
          { q: '통증이 어느 정도인가요?', a: '따끔거리는 고무줄 튕기는 느낌 정도이며 통증이 적어 대개 마취 없이 진행하지만, 민감한 분들은 연고 마취 후 시술 가능합니다.' },
          { q: '일상 복귀는 언제 가능한가요?', a: '딱지가 생기지 않는 시술로 시술 직후 바로 세안과 화장이 가능합니다. 외출에 전혀 지장이 없습니다.' },
          { q: '주의사항은 무엇인가요?', a: '시술 기간 동안 자외선 차단제 사용이 가장 중요합니다. 피부가 건조해질 수 있으니 보습 관리에 신경 쓰고, 각질 제거제 사용은 1주일 정도 피해주세요.' }
        ]
      },
      {
        number: '02',
        title: '엑셀V',
        enTitle: 'Excel V',
        description: '세 가지 모드의 파장을 활용해 혈관, 색소, 탄력을 동시에 관리하는 복합 레이저.',
        icon: '/images/thermage_icon_2.png',
        image: '/images/laser_texture.png',
        recommendedArea: '홍조 부위, 기미/잡티',
        duration: '15분 - 20분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '마취 크림 (선택)',
        maintenance: '장기 유지',
        targets: [
          '안면홍조 및 혈관 질환이 고민이신 분', 
          '복합적인 색소와 탄력 개선을 원하시는 분', 
          '맑고 깨끗한 피부 톤을 원하시는 분',
          '늘어난 혈관과 여드름 붉은 자국을 개선하고 싶은 분'
        ],
        effects: ['혈관 및 홍조 개선', '색소 침착 완화', '피부 탄력 및 모공 개선'],
        qna: [
          { q: '엑셀V의 시술 원리는 무엇인가요?', a: '세 가지 모드의 파장을 활용해 혈관 병변(홍조), 색소 침착, 모공 및 탄력을 동시에 관리합니다. 지능형 냉각 시스템으로 피부 표면을 보호하며 안전하게 시술합니다.' },
          { q: '통증과 일상 복귀는 어떤가요?', a: '따끔한 느낌이 들 수 있으나 냉각 기능 덕분에 통증이 적은 편입니다. 시술 직후 약간의 붉은 기가 생길 수 있으나 즉시 일상생활이 가능합니다.' },
          { q: '주의사항이 있나요?', a: '딱지가 생길 경우 자연스럽게 떨어질 때까지 건드리지 말고, 자외선 차단제와 보습제를 꼼꼼히 사용해주세요.' }
        ]
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
        title: '트리플 바디',
        enTitle: 'Triple Body',
        description: '저준위 레이저, 고주파, 중저주파의 복합 작용으로 체지방 분해와 탄력을 동시에.',
        icon: '/images/thermage_icon_3.png',
        recommendedArea: '복부, 허벅지, 팔뚝, 러브핸들',
        duration: '40분 - 60분',
        downtime: '즉시 일상생활 가능',
        anesthesia: '없음',
        maintenance: '운동/식이 병행 시 반영구',
        targets: [
          '잘 빠지지 않는 군살이 고민이신 분', 
          '탄력 있는 바디 라인을 원하시는 분', 
          '통증 없는 체형 관리를 원하시는 분',
          '셀룰라이트를 효과적으로 정리하고 싶은 분'
        ],
        effects: ['체지방 분해 및 배출 촉진', '셀룰라이트 개선', '바디 탄력 향상'],
        qna: [
          { q: '트리플 바디의 원리는 무엇인가요?', a: '저준위 레이저, 고주파, 중저주파 세 가지 에너지를 결합하여 체지방 세포를 파괴하고 림프 순환을 촉진, 지방 배출과 탄력 개선을 동시에 유도합니다.' },
          { q: '통증은 어떤가요?', a: '따뜻한 열감과 근육이 수축되는 느낌이 들며, 아프지 않아 편안하게 누워서 관리받으실 수 있습니다.' },
          { q: '일상 복귀와 주의사항은?', a: '즉시 가능하며 수분 섭취를 늘리고 가벼운 유산소 운동을 병행하면 더욱 효과적입니다. 일주일간 과음은 피해주세요.' }
        ]
      }
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
        title: 'LDM 수분 관리',
        enTitle: 'LDM Water Care',
        description: '고밀도 초음파로 피부 속 수분 균형을 잡고 재생력을 높이는 프리미엄 관리.',
        icon: '/images/thermage_icon_1.png',
        recommendedArea: '얼굴 전체',
        duration: '20분 - 30분',
        downtime: '없음',
        anesthesia: '없음',
        maintenance: '주기적 관리 권장',
        targets: [
          '피부가 건조하고 예민하신 분', 
          '중요한 일정을 앞두고 피부 컨디션 조절이 필요하신 분', 
          '시술 후 빠른 진정과 재생을 원하시는 분',
          '피부 장벽이 무너져 트러블이 자주 발생하는 분'
        ],
        effects: ['피부 보습 및 수분 충전', '피부 재생 촉진 및 진정', '장기적인 피부 건강 증진'],
        qna: [
          { q: 'LDM 관리의 원리는 무엇인가요?', a: '고밀도 초음파가 세포의 진동을 유도하여 피부 장벽을 강화하고 수분 균형을 맞추며 재생 단백질을 활성화하여 피부 건강을 회복시킵니다.' },
          { q: '통증과 일상 복귀는 어떤가요?', a: '통증이 전혀 없으며 즉시 일상생활이 가능합니다. 중요한 약속 전날이나 당일 관리로도 매우 적합합니다.' },
          { q: '어떤 피부 타입에 효과적인가요?', a: '아토피나 홍조가 있는 극민감성 피부를 포함하여 모든 피부 타입에 안전하게 적용 가능합니다.' }
        ]
      }
    ],
    ctaLink: '/contact',
    reservationLink: '/contact',
  },
};
