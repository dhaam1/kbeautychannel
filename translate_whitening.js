const fs = require('fs');

const krPath = 'src/messages/kr.json';
const enPath = 'src/messages/en.json';

const whiteningKr = {
  hero: {
    title: "치아미백",
    subtitle: "맑은 빛을 채우는\n블랑쉬치과 치아미백",
    button: "상담 예약하기"
  },
  processIntro: {
    title: "치아미백이란",
    subtitle: "착색의 원인을 지우고,\n투명함을 되찾는 시술입니다",
    description: "우리 치아는 커피, 차, 음식물의 색소가\n치아 표면의 미세한 구멍(상아세관)으로 스며들어\n누렇게 변색됩니다.\n노화로 인해 내부 상아질이 짙어지기도 합니다.\n\n블랑쉬치과의 미백은 미백제의 특수 성분이\n산소 작용을 일으켜 치아 구조는 손상시키지 않고\n착색된 유기물질만 선택적으로 분해합니다.\n빛의 투과율을 높여 치아 속부터\n맑고 깨끗한 색조를 되찾아줍니다."
  },
  process: {
    label: "치아미백 시술 과정",
    title: "블랑쉬치과는\n진단하고 시술합니다",
    steps: [
      {
        number: "01",
        title: "정밀 진단 및 색상 체크",
        description: "현재 치아 상태를 파악하고,\n시술 후 예측되는 밝기를 확인해\n목표를 설정합니다."
      },
      {
        number: "02",
        title: "치면 세마 및 스케일링",
        description: "미백제가 치아 표면에\n고르게 도포되고\n잘 흡수될 수 있도록,\n치석과 플라그를\n사전에 깨끗이 제거합니다."
      },
      {
        number: "03",
        title: "잇몸 보호제 도포",
        description: "고농도 미백제로부터\n잇몸이 자극받거나\n손상되지 않도록,\n꼼꼼하게 보호막을 형성하여\n안전을 확보합니다."
      },
      {
        number: "04",
        title: "미백제 도포 & 특수광 조사",
        description: "미백제를 바르고\n특수 광선을 조사하여\n착색 물질을 분해합니다.\n(환자 상태에 따라\n2~3회 반복 시행)"
      },
      {
        number: "05",
        title: "마무리 및 결과 확인",
        description: "시술 후 변화된\n치아 색상을 확인하고,\n일시적인 과민 반응 여부를\n체크한 후 마무리합니다."
      }
    ]
  },
  recommendation: {
    title: "추천 대상",
    subtitle: "이런 분들이라면,\n치아미백을 권합니다",
    items: [
      { title: "양치를 열심히 해도\n누렇게 보이는 분" },
      { title: "미백 치약으로\n효과를 못보신 분" },
      { title: "결혼·면접·중요 일정 앞두고\n색상 개선이 필요한 분" },
      { title: "자연스럽고 과하지 않은\n밝기를 원하는 분" }
    ]
  },
  design: {
    title: "치아미백도 블랑쉬치과에서",
    subtitle: "효과는 확실하게,\n자극은 최소화한\n블랑쉬치과의 치아미백",
    items: [
      {
        title: "1:1 퍼스널 컬러 매칭",
        description: "무조건 하얗기만 한\n부자연스러운 치아가 아닌,\n환자분의 피부 톤과 이미지를 고려해\n디자인합니다."
      },
      {
        title: "시림 최소화",
        description: "무조건 하얗기만 한\n부자연스러운 치아가 아닌,\n환자분의 피부 톤과 이미지를 고려해\n디자인합니다."
      },
      {
        title: "검증된 안정성",
        description: "식약처 승인된\n안전한 약품과 전문 장비,\n그리고 치아 미백을 연구한 전문가가\n최상의 결과를 만듭니다."
      }
    ]
  },
  director: {
    label: "대표원장 소개",
    title: "치아 미백으로\n서울대학교 석사 학위를 받은\n치아 미백 전문가가\n직접 시술합니다",
    description: "환자분들에게 꼭,\n효과있는 미백 치료를 해드립니다.",
    doctorInfo: "서울대 졸업,\n뉴욕 컬럼비아 대학,\nULCA치과병원 연수\n"
  },
  location: {
    label: "시술 장비",
    titleMobile: "식약처 승인, 전문가용\n정품 미백 시스템을\n사용합니다",
    titleDesktop: "식약처 승인, 전문가용\n정품 미백 시스템을 사용합니다",
    description: "블랑쉬치과는 식약처(KFDA) 승인을 받은\n정품 전문가용 고농도 미백제와\n최신 특수 광선 조사기만을 사용합니다.",
    items: [
      {
        title: "전문가용 정품 치아미백제",
        description: "치과 전용 고농도 미백제로\n자가 미백으로는 도달하기 힘든\n깊은 층의 착색까지\n효과적으로 제거합니다."
      },
      {
        title: "특수 광선 조사기",
        description: "미백제의 활성도를 높여\n시술 시간을 단축하고,\n약제가 치아 깊숙이 침투하도록\n돕습니다.\n(안전장치 내장된 최신 장비)"
      }
    ]
  },
  customer: {
    label: "홈케어 치아미백",
    title: "빛나는 미소,\n집에서도 변함없이\n지켜드립니다",
    intro: "블랑쉬 치과는 단 한번의 미백 치료에 그치지 않고,\n미백 효과를 오래, 건강하게 유지할 수 있도록\n치의학 전문가들이 설계한 홈케어 솔루션을 제안합니다.",
    list: [
      "치아 자극을 주는 성분은 배제하고,\n고성능 자연주의 성분으로 잇몸과 치아를 보호합니다.",
      "서울대 연구팀과 협업한 정밀 배합으로\n구강 내 환경을 개선합니다.",
      "자연유래 계면활성제로 입마름을 막고\n구취 원인까지 제거합니다."
    ]
  },
  cases: {
    label: "치아미백 시술 사례",
    title: "누런인상에서 환한 인상으로,\n블랑쉬치과 치아미백 사례",
    guide: "화면을 드래그하여 전/후를 비교해 보세요",
    items: [
      {
        title: "웃는게 망설여지던 30대 김혜빈님",
        description: "치아미백 후 인상 개선"
      },
      {
        title: "누런 치아로 고민하던 20대 이현정님",
        description: "치아미백으로 자연스러운 톤업"
      },
      {
        title: "커피 착색이 고민이던 30대 소지원님",
        description: "깔끔한 첫인상 완성"
      }
    ]
  },
  faq: {
    label: "자주 묻는 질문",
    title: "치아미백 상담 전\n궁금해하는 것들,\n블랑쉬치과가\n알려드립니다",
    items: [
      {
        question: "미백 효과는\n얼마나 지속되나요?",
        answer: "개인의 식습관과 관리에 따라 다르지만, 보통 6개월에서 1년 정도 유지됩니다. 착색 유발 음식 섭취를 줄이고 꼼꼼한 양치질을 병행하시면 지속 기간이 늘어납니다."
      },
      {
        question: "시술 후 다시 예전처럼\n누렇게 되나요?",
        answer: "치아는 살아있는 조직이므로 시간이 흐르며 서서히 색이 돌아올 수 있습니다. 하지만 시술 전만큼 완전히 어두워지지는 않으며, 정기적인 미백을 통해 밝기를 계속 유지할 수 있습니다."
      },
      {
        question: "시술은\n몇 번 받아야 하나요?",
        answer: "블랑쉬치과의 미백은 보통 하루 1회 방문(2~3회 연속 시술)으로도 눈에 띄는 효과를 볼 수 있습니다. 더 밝은 단계를 원하시거나 착색이 심한 경우에는 1주일 간격으로 추가 시술을 권해드립니다."
      },
      {
        question: "미백이 효과 없는\n경우도 있나요?",
        answer: "아래의 경우에는 일반 미백 대신 다른 치료가 필요할 수 있습니다.\n\n- 법랑질이 너무 얇은 경우\n- 신경치료를 받은 치아\n- 레진이나 보철물이 있는 치아\n\n블랑쉬치과에서는 시술 전 정밀 진단을 통해 미백이 적합한지 먼저 확인해드립니다."
      },
      {
        question: "시술 중\n많이 시리나요?",
        answer: "개인차가 있지만, 블랑쉬치과는 잇몸 보호제를 꼼꼼히 도포하고 환자분의 치아 민감도에 따라 약제 농도와 시간을 조절합니다. 시림을 최소화하면서 효과를 극대화하는 것이 블랑쉬 미백의 핵심입니다."
      }
    ]
  },
  cta: {
    label: "상담 예약 신청하기",
    title: "자신 있게 웃는 하루,\n블랑쉬치과에서 시작하세요",
    description: "블랑쉬치과는 현재 치아와 잇몸 상태에서\n최선의 방향을 알려드리고\n판단할 수 있도록 돕습니다.\n\n자세한 상담이 필요하시다면,\n언제든 블랑쉬치과를 찾아주세요.",
    designElements: {
      box: "미소가\n작품이\n되는곳",
      text: "블랑쉬에서,\n당신의 변화를\n시작하세요"
    }
  }
};

const whiteningEn = {
  hero: {
    title: "Teeth Whitening",
    subtitle: "Restoring Pure Radiance,\nBlanche Teeth Whitening",
    button: "Book a Consultation"
  },
  processIntro: {
    title: "What is Teeth Whitening?",
    subtitle: "A treatment that erases stains\nand restores true transparency.",
    description: "Our teeth naturally discolor over time as pigments from coffee, tea, and food seep into microscopic pores (dentinal tubules) on the enamel surface. Aging can also cause the inner dentin layer to darken.\n\nAt Blanche Dental Clinic, our customized whitening treatment utilizes specialized agents that trigger an oxygenating action. This selectively breaks down embedded organic stains without compromising the tooth's structural integrity. By enhancing light transmittance, we restore a pristine, luminous shade from within."
  },
  process: {
    label: "Whitening Procedure",
    title: "Blanche's meticulous approach\nto diagnosis and treatment",
    steps: [
      {
        number: "01",
        title: "Precision Diagnosis & Shade Check",
        description: "We evaluate your current tooth condition and establish a target shade, predicting the optimal brightness achievable post-treatment."
      },
      {
        number: "02",
        title: "Surface Polishing & Scaling",
        description: "To ensure the whitening agent is evenly applied and optimally absorbed, we meticulously remove plaque and tartar beforehand."
      },
      {
        number: "03",
        title: "Gum Protection Barrier",
        description: "We carefully apply a protective barrier to shield your gums from the high-concentration whitening agent, ensuring absolute comfort and safety."
      },
      {
        number: "04",
        title: "Whitening Application & Light Activation",
        description: "The whitening gel is applied and activated using a specialized light to break down stains. (This process is repeated 2–3 times, depending on your needs.)"
      },
      {
        number: "05",
        title: "Final Review & Completion",
        description: "We assess the beautiful change in your tooth shade and check for any temporary sensitivity to ensure a perfect, comfortable finish."
      }
    ]
  },
  recommendation: {
    title: "Recommended For",
    subtitle: "We highly recommend whitening\nif any of these apply to you",
    items: [
      { title: "Your teeth appear yellow\ndespite rigorous brushing" },
      { title: "You haven't seen results\nfrom whitening toothpastes" },
      { title: "You need a brighter smile\nfor weddings, interviews, or events" },
      { title: "You desire a natural,\nelegant level of brightness" }
    ]
  },
  design: {
    title: "Trust Blanche for Whitening",
    subtitle: "Definitive results,\nminimal sensitivity.\nBlanche's signature whitening.",
    items: [
      {
        title: "1:1 Personal Shade Matching",
        description: "We do not aim for unnaturally stark white teeth. We meticulously design a shade that harmonizes perfectly with your unique skin tone and image."
      },
      {
        title: "Minimized Sensitivity",
        description: "We do not aim for unnaturally stark white teeth. We meticulously design a shade that harmonizes perfectly with your unique skin tone and image."
      },
      {
        title: "Proven Safety",
        description: "With KFDA-approved safe materials, specialized equipment, and experts dedicated to whitening research, we deliver nothing short of the best results."
      }
    ]
  },
  director: {
    label: "Meet Our Chief Director",
    title: "Performed directly by\na whitening expert holding a Master's degree\nfrom Seoul National University",
    description: "I promise to deliver a whitening treatment\nthat brings you guaranteed results.",
    doctorInfo: "SNU Graduate,\nColumbia University (NY),\nUCLA Dental Hospital Fellowship\n"
  },
  location: {
    label: "Our Equipment",
    titleMobile: "We utilize KFDA-approved,\nauthentic professional\nwhitening systems",
    titleDesktop: "We utilize KFDA-approved, authentic professional whitening systems",
    description: "Blanche Dental Clinic exclusively utilizes KFDA-approved, authentic high-concentration whitening agents combined with the latest specialized light activation technology.",
    items: [
      {
        title: "Professional Authentic Whitening Agent",
        description: "A high-concentration formula exclusively for dental clinics that effectively removes deep-seated stains that at-home whitening simply cannot reach."
      },
      {
        title: "Specialized Light Activator",
        description: "Enhances the activity of the whitening agent, shortening treatment time and helping the solution penetrate deeply.\n(State-of-the-art equipment with built-in safety features)"
      }
    ]
  },
  customer: {
    label: "Home Care Whitening",
    title: "A radiant smile,\npreserved flawlessly\neven at home",
    intro: "Blanche Dental Clinic's care doesn't stop after one visit. To maintain your brilliant results beautifully and healthily, we offer a home care solution designed by dental professionals.",
    list: [
      "Formulated without irritating ingredients, protecting your teeth and gums with high-performance natural components.",
      "Improves the oral environment through precise blending developed in collaboration with an SNU research team.",
      "Prevents dry mouth and eliminates the root causes of bad breath using naturally derived surfactants."
    ]
  },
  cases: {
    label: "Whitening Case Studies",
    title: "From dull to dazzling.\nBlanche's transformative whitening cases.",
    guide: "Drag the slider to compare before and after",
    items: [
      {
        title: "Hye-bin (30s), who used to hesitate to smile",
        description: "A dramatic improvement in impression post-whitening"
      },
      {
        title: "Hyun-jung (20s), concerned about yellow teeth",
        description: "A natural tone-up with our whitening treatment"
      },
      {
        title: "Ji-won (30s), bothered by coffee stains",
        description: "A flawless, clean first impression achieved"
      }
    ]
  },
  faq: {
    label: "Frequently Asked Questions",
    title: "Everything you wonder\nbefore your whitening consultation,\nanswered by Blanche",
    items: [
      {
        question: "How long do the\nwhitening effects last?",
        answer: "While it varies depending on individual dietary habits and care, results typically last from 6 months to a year. Reducing the intake of stain-causing foods and maintaining meticulous oral hygiene will extend this duration."
      },
      {
        question: "Will my teeth turn\nyellow again after treatment?",
        answer: "Because teeth are living tissues, their color may gradually revert over time. However, they will not become as dark as they were prior to the treatment, and you can easily maintain their brightness with routine touch-ups."
      },
      {
        question: "How many sessions\nare required?",
        answer: "At Blanche Dental Clinic, you can achieve noticeable results in just one visit consisting of 2-3 consecutive applications. If you desire an even brighter shade or have severe staining, we may recommend additional sessions spaced a week apart."
      },
      {
        question: "Are there cases where\nwhitening is ineffective?",
        answer: "In the following cases, alternative treatments may be necessary instead of conventional whitening:\n\n- Extremely thin enamel\n- Teeth that have undergone root canal therapy\n- Teeth with resin restorations or prosthetics\n\nAt Blanche, we conduct a thorough precision diagnosis prior to any procedure to determine if whitening is the optimal solution for you."
      },
      {
        question: "Will my teeth be\nvery sensitive during the procedure?",
        answer: "While individual sensitivity varies, Blanche meticulously applies a gum barrier and adjusts the agent concentration and duration based on your specific sensitivity level. Maximizing your results while minimizing discomfort is the core philosophy behind a Blanche whitening treatment."
      }
    ]
  },
  cta: {
    label: "Book a Consultation",
    title: "A day filled with confident smiles,\nstart it today at Blanche",
    description: "Blanche Dental Clinic analyzes your current teeth and gum condition to guide you toward the best treatment path.\n\nFor a detailed consultation, please visit us anytime.",
    designElements: {
      box: "We craft\nsmiles\nlike art",
      text: "At Blanche,\nstart your\ntransformation"
    }
  }
};

const krData = JSON.parse(fs.readFileSync(krPath, 'utf8'));
krData.whitening = whiteningKr;
fs.writeFileSync(krPath, JSON.stringify(krData, null, 2) + '\n', 'utf8');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.whitening = whiteningEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');

console.log('Successfully updated kr.json and en.json for whitening.');
