const fs = require('fs');

const basePath = 'c:/Users/김승연/OneDrive/Desktop/blanche-backend-main/blanche-backend-main/src/messages';
const krPath = `${basePath}/kr.json`;
const enPath = `${basePath}/en.json`;

const krData = JSON.parse(fs.readFileSync(krPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// solution 객체가 없다면 생성
if (!krData.solution) krData.solution = {};
if (!enData.solution) enData.solution = {};

const sleepKr = {
  hero: {
    label: "치과 수면 치료",
    title: "눈 감으면 끝나는,\n수면 치료 시스템",
    button: "상담 예약하기"
  },
  what: {
    title: "치과 수면치료",
    subtitle: "편안한 치과 수면치료.",
    description: "치과치료가 무서워 미뤄오셨다면,\n수면치료가 답이 될 수 있습니다.",
    items: {
      sedation: {
        title: "의식하진정법",
        description: "의식이 있는 상태에서\n수면을 유도하는 치료로\n몸에 무리가 가지 않습니다."
      },
      pain: {
        title: "통증 완화",
        description: "수면 중에 치료가 진행되어\n통증에 대한 기억이\n남지 않습니다."
      },
      various: {
        title: "다양한 치료 적용",
        description: "임플란트, 사랑니, 신경치료 등\n대부분의 진료에 적용 가능하고\n동시에 많은 치료도 가능합니다."
      }
    }
  },
  recommendation: {
    title: "추천 대상",
    subtitle: "치과 공포증이 있다면,\n블랑쉬 치과를 찾아주세요.",
    items: {
      injection: {
        title: "주사 공포",
        description: "마취 바늘만 봐도\n심장이 두근거린다면"
      },
      noise: {
        title: "소리, 냄새 공포",
        description: "치과 특유의 기계음과 냄새가\n견디기 힘들다면"
      },
      gag: {
        title: "구역 반사",
        description: "입 안에 기구가 닿을 때\n심한 구역질이 올라온다면"
      },
      time: {
        title: "장시간 치료 공포",
        description: "오래 입 벌리고 있는 게\n너무 힘들다면"
      }
    }
  },
  ctaLogo: {
    title: "블랑쉬치과의\n수면 치료 솔루션이\n정답입니다."
  },
  safety: {
    title: "수면 치료 안전성",
    subtitleMobile: "블랑쉬치과는\n안전성 높은\n수면 치료를 제공합니다.",
    subtitleDesktop: "블랑쉬치과는\n안전성 높은 수면 치료를 제공합니다.",
    description: "환자분의 편안함과 안전을 늘 최우선으로,\n잠드는 순간부터 회복까지\n모든 과정을 안전하게 설계합니다.",
    items: {
      checkup: {
        title: "사전 진단 시스템",
        description: "수면 진료 전,\n건강 상태를 꼼꼼히 확인해\n맞춤 수면 치료 계획을 세웁니다."
      },
      monitoring: {
        title: "실시간 모니터링",
        description: "산소포화도, 심박수, 혈압을\n실시간 정밀 체크해 안전하게\n치료를 이끌어갑니다."
      },
      medication: {
        title: "약물 조합의 차별화",
        description: "미다졸람+케타민 조합의\n최소 용량-최대 진정효과로\n호흡 기능은 유지하고\n중독성 문제를 차단합니다."
      },
      cpr: {
        title: "전직원 심폐소생술 자격증",
        description: "수면치료도 안심하도록,\n전직원이 응급 시 대처 가능한\n심폐소생술 자격증을 보유했습니다."
      }
    },
    footer: "*블랑쉬치과는 중독성과 호흡억제 위험이 있는\n프로포폴을 사용하지 않습니다."
  },
  collaboration: {
    title: "분야별 전문가 협업",
    subtitle: "한 명의 판단이 아닌,\n분야별 전문의 협업으로\n완성되는 수면치료.",
    descriptionDesktop: "수면치료는 진정과 치료를\n동시에 고려해야 하는 진료입니다.\n블랑쉬치과는 각 분야 의료진이 협진하여\n환자 상태에 맞는 안전한 치료 계획을 세웁니다.",
    descriptionMobile: "수면치료는 진정과 치료를\n동시에 고려해야 하는 진료입니다.\n블랑쉬치과는 각 분야 의료진이 협진하여\n환자 상태에 맞는 안전한\n치료 계획을 세웁니다."
  },
  treatments: {
    title: "수면치료가 가능한 진료",
    subtitle: "이런 진료 시,\n수면 치료를 추천드립니다.",
    items: {
      implant: {
        title: "수면 임플란트",
        description: "장시간 수술의 피로도 제로,\n다수 식립에 유리"
      },
      laminate: {
        title: "블랑쉬 라미네이트",
        description: "매복 치아 발치의 공포와\n통증 기억 차단"
      },
      wisdom: {
        title: "사랑니 발치",
        description: "예민한 신경 자극을\n느끼지 못하게 조절"
      },
      decay: {
        title: "충치·신경치료",
        description: "구역 반사 걱정 없이\n긴 시술 시간도 편안하게"
      }
    }
  },
  process: {
    title: "수면치료 진행 과정",
    subtitle: "시스템은 체계적으로\n환자분은 편안하게.",
    items: {
      step1: { title: "초진상담", description: "건강 상태와\n치료 계획을 확인하고\n수면치료가 적합한지\n검토합니다." },
      step2: { title: "방사능 촬영 및 진단", description: "필요한 검사를 시행하고,\n수면치료 진행 여부를\n판단합니다." },
      step3: { title: "심전도 검사", description: "기본 생체 상태를\n꼼꼼하게 확인합니다." },
      step4: { title: "수면 진정 요법", description: "얕은 의식은 유지하며\n긴장을 최소화 합니다." },
      step5: { title: "수면확인 및 국소 마취", description: "수면 상태를 확인하고\n필요한 부위에만\n국소 마취를 합니다." },
      step6: { title: "치과 시술", description: "계획된 치료를 진행,\n치료 중에도 생체 신호를 확인하며\n안전하게 진료를 이어나갑니다." },
      step7: { title: "회복실 휴식", description: "편안히 잠들고\n일어나시면,\n치료가 끝납니다." },
      step8: { title: "결과 상담 후 귀가", description: "시술 결과를 안내받고\n안전하게 귀가합니다." }
    }
  },
  faq: {
    smallTitle: "자주 묻는 질문",
    mainTitle: "치과수면치료 상담 전\n궁금해하는 것들,\n블랑쉬치과가 알려드립니다",
    items: {
      q1: {
        question: "수면치료 시 준비 사항이 따로 있나요?",
        questionMobile: "수면치료 시\n준비 사항이 따로 있나요?",
        answer: "개인별로 안내를 드리지만, 일반적으로 치료 전 6시간 금식이 필요합니다. 편안한 복장을 착용하시면 됩니다. 시술 후 졸음이 지속될 수 있어 혼자 운전하거나 혼자 귀가하는 것은 피하시고, 보호자 동행을 권장합니다."
      },
      q2: {
        question: "전신마취와 수면치료는 다른 건가요? 위험하지 않나요?",
        questionMobile: "전신마취와 수면치료는\n다른 건가요? 위험하지 않나요?",
        answer: "아니요, 다릅니다. 블랑쉬치과의 수면치료는 '의식하진정법'으로 반의식 상태에서 자가 호흡이 가능하고 외부 자극에 반응할 수 있습니다. 전신마취에 비해 신체 부담이 훨씬 적고 회복이 빠릅니다. 의료진이 지속적으로 환자 상태를 모니터링합니다."
      },
      q3: {
        question: "치료 도중에 깰 수도 있나요?",
        questionMobile: "치료 도중에\n깰 수도 있나요?",
        answer: "환자의 약물 반응에 따라 의식이 잠깐 돌아올 수 있습니다. 이 경우 의료진이 즉시 안전하게 약물 용량을 조절하여 편안한 상태로 복귀시켜드리므로 과도하게 걱정하실 필요는 없습니다."
      },
      q4: {
        question: "수면치료 중에는 통증을 전혀 느끼지 못하나요?",
        questionMobile: "수면치료 중에는\n통증을 전혀 느끼지 못하나요?",
        answer: "수면치료 중에는 거의 통증을 느끼지 못합니다. 의식하진정과 국소마취를 함께 시행하여 통증을 최소화합니다. 마취가 풀린 후 일부 통증이 있을 수 있으나, 처방된 약물과 충분한 휴식으로 관리 가능합니다."
      },
      q5: {
        question: "수면치료 후 부작용이나 후유증은 없나요?",
        questionMobile: "수면치료 후\n부작용이나 후유증은 없나요?",
        answer: "시술 직후 일시적인 어지러움, 졸음, 메스꺼움이 발생할 수 있으나 대부분 몇 시간 내 자연스럽게 사라집니다. 안전을 위해 시술 당일 운전, 기계 조작, 중요한 계약이나 판단이 필요한 일은 피하시고 충분한 휴식을 취하시기 바랍니다."
      },
      q6: {
        question: "수면치료에 사용되는 약물은 안전한가요?",
        questionMobile: "수면치료에 사용되는\n약물은 안전한가요?",
        answer: "사용하는 진정제인 미다졸람과 케타민은 검증된 안전성을 가지고 있습니다. 블랑쉬치과는 치료 전·중·후 모든 과정에서 생체 신호(산소포화도, 심박수, 혈압)를 실시간으로 모니터링하며 필요시 적절한 안전 조치를 취합니다."
      }
    }
  },
  cta: {
    title: "상담 예약 신청하기",
    subtitleDesktop: "더 이상 아픔을 참지 마세요.\n블랑쉬치과가 치과 공포증 극복,\n도와드립니다.",
    subtitleMobile: "더 이상 아픔을 참지 마세요.\n블랑쉬치과가 치과 공포증 극복,\n도와드립니다.",
    description: "상담만으로도 마음이 편해질 수 있습니다.\n치과가 두려워 치료를 미뤄왔다면\n언제든 블랑쉬치과를 찾아주세요.",
    designElements: {
      box: "미소가\n작품이\n되는곳",
      text: "블랑쉬에서,\n당신의 변화를\n시작하세요"
    }
  }
};

const sleepEn = {
  hero: {
    label: "Sleep Dentistry",
    title: "Pain-free treatments\nwhile you comfortably sleep",
    button: "Book Consultation"
  },
  what: {
    title: "Sleep Dentistry",
    subtitle: "Comfortable and stress-free care.",
    description: "If dental anxiety has kept you away,\nBlanche's sleep dentistry is your solution.",
    items: {
      sedation: {
        title: "Conscious Sedation",
        description: "A safe method that induces\na sleep-like state while\nkeeping you conscious."
      },
      pain: {
        title: "Pain Relief",
        description: "Treatments are done\nwhile you rest, leaving no\nmemory of discomfort."
      },
      various: {
        title: "Wide Applicability",
        description: "Ideal for implants, extractions,\nand complex procedures\nall in a single visit."
      }
    }
  },
  recommendation: {
    title: "Highly Recommended For",
    subtitle: "Overcome dental phobia\nwith Blanche's expertise.",
    items: {
      injection: {
        title: "Fear of Needles",
        description: "For those who feel anxious\njust seeing a syringe."
      },
      noise: {
        title: "Sensory Sensitivity",
        description: "For those overwhelmed by\ndental noises and odors."
      },
      gag: {
        title: "Severe Gag Reflex",
        description: "For those experiencing severe\ngagging during examinations."
      },
      time: {
        title: "Long Procedure Anxiety",
        description: "For those who find keeping\ntheir mouth open exhausting."
      }
    }
  },
  ctaLogo: {
    title: "Blanche's Sleep Dentistry\nis the ultimate answer\nfor a peaceful experience."
  },
  safety: {
    title: "Safety in Sleep Treatment",
    subtitleMobile: "Blanche Dental Clinic\nprovides the safest\nsleep dentistry.",
    subtitleDesktop: "Blanche Dental Clinic\nprovides the safest sleep dentistry.",
    description: "Your comfort and safety are our top priorities.\nWe have engineered every step, from falling asleep\nto waking up, with strict safety protocols.",
    items: {
      checkup: {
        title: "Pre-Assessment System",
        description: "We thoroughly evaluate\nyour health beforehand to\ncreate a customized plan."
      },
      monitoring: {
        title: "Real-time Monitoring",
        description: "We continuously track your\noxygen, heart rate, and blood\npressure for maximum safety."
      },
      medication: {
        title: "Optimized Medication",
        description: "We utilize anesthetics like\nMidazolam and Ketamine to\nensure safety without addiction."
      },
      cpr: {
        title: "CPR-Certified Staff",
        description: "All our medical staff hold\nCPR certifications to handle\nany unlikely emergencies."
      }
    },
    footer: "*Blanche Dental Clinic absolutely does not use Propofol\ndue to its addictive risks and respiratory suppression."
  },
  collaboration: {
    title: "Expert Collaboration",
    subtitle: "Sleep dentistry perfected\nby specialized experts,\nnot just a single perspective.",
    descriptionDesktop: "Sleep dentistry requires a delicate balance of\nsedation and precise treatment.\nAt Blanche, specialists across various fields collaborate\nto establish the safest customized plan for you.",
    descriptionMobile: "Sleep dentistry requires a delicate balance of\nsedation and precise treatment.\nAt Blanche, specialists across various fields collaborate\nto establish the safest\ncustomized plan for you."
  },
  treatments: {
    title: "Applicable Treatments",
    subtitle: "Sleep dentistry is highly\nrecommended for these procedures.",
    items: {
      implant: {
        title: "Sleep Implants",
        description: "Zero fatigue for lengthy or\nmultiple implant surgeries."
      },
      laminate: {
        title: "Blanche Laminates",
        description: "Erasing the fear and pain\nmemory of complex extractions."
      },
      wisdom: {
        title: "Wisdom Tooth Extraction",
        description: "Controlling sensitive nerve\nstimulation for comfort."
      },
      decay: {
        title: "Root Canal Therapy",
        description: "Comfortable long sessions\nwithout gag reflex worries."
      }
    }
  },
  process: {
    title: "Sleep Treatment Process",
    subtitle: "A systematic approach\nfor your greatest comfort.",
    items: {
      step1: { title: "Initial Consultation", description: "Evaluating your health\nand determining if sleep\ndentistry is right for you." },
      step2: { title: "X-Rays & Diagnosis", description: "Performing necessary tests\nto confirm the feasibility\nof the procedure." },
      step3: { title: "ECG Examination", description: "Carefully checking your\nfundamental vital signs\nbefore proceeding." },
      step4: { title: "Sedation Therapy", description: "Inducing a relaxed state\nwhile maintaining\nshallow consciousness." },
      step5: { title: "Anesthesia", description: "Confirming your sleep state\nbefore administering\nlocal anesthesia." },
      step6: { title: "Dental Procedure", description: "Executing the planned\ntreatment safely with\ncontinuous monitoring." },
      step7: { title: "Recovery Resting", description: "The treatment is complete\nonce you wake up\ncomfortably rested." },
      step8: { title: "Result Consultation", description: "Receiving the results and\nreturning home safely\nwith guided instructions." }
    }
  },
  faq: {
    smallTitle: "FAQ",
    mainTitle: "All your questions about\nSleep Dentistry,\nanswered by Blanche.",
    items: {
      q1: {
        question: "Is there any preparation required for sleep dentistry?",
        questionMobile: "Is there any preparation required\nfor sleep dentistry?",
        answer: "We provide individual instructions, but generally, a 6-hour fast is required before treatment. Please wear comfortable clothing. Since drowsiness may persist, we advise against driving alone and recommend bringing a guardian."
      },
      q2: {
        question: "Is sleep dentistry hazardous? Is it different from general anesthesia?",
        questionMobile: "Is sleep dentistry hazardous?\nIs it different from general anesthesia?",
        answer: "No, it is very safe and different. Blanche utilizes 'Conscious Sedation', allowing spontaneous breathing and responsiveness. It puts significantly less strain on the body than general anesthesia with much faster recovery. Our staff continuously monitors your vitals."
      },
      q3: {
        question: "Can I wake up during the treatment?",
        questionMobile: "Can I wake up\nduring the treatment?",
        answer: "Consciousness may briefly return depending on your reaction to the medication. If this happens, our medical staff will immediately and safely adjust the dosage to return you to a comfortable sedated state, so there is no need to worry."
      },
      q4: {
        question: "Will I feel zero pain during sleep dentistry?",
        questionMobile: "Will I feel zero pain\nduring sleep dentistry?",
        answer: "You will feel almost no pain during the procedure. We use a combination of conscious sedation and local anesthesia to minimize discomfort. Some pain may occur after the anesthesia wears off, which can be managed with prescribed medication and rest."
      },
      q5: {
        question: "Are there any side effects after sleep dentistry?",
        questionMobile: "Are there any side effects\nafter sleep dentistry?",
        answer: "Temporary dizziness, drowsiness, or nausea may occur immediately after the procedure but typically subside within a few hours. For your safety, please avoid driving, operating machinery, or making important decisions on the day of the procedure."
      },
      q6: {
        question: "Are the medications used safe?",
        questionMobile: "Are the medications\nused safe?",
        answer: "Yes, Midazolam and Ketamine are clinically proven and highly safe sedatives. Blanche Dental Clinic monitors vital signs (oxygen saturation, heart rate, and blood pressure) in real-time before, during, and after the treatment."
      }
    }
  },
  cta: {
    title: "Book a Consultation",
    subtitleDesktop: "Don't endure the pain anymore.\nBlanche will help you overcome\nyour dental fears.",
    subtitleMobile: "Don't endure the pain anymore.\nBlanche will help you overcome\nyour dental fears.",
    description: "Sometimes, a simple consultation can ease your mind.\nIf you've been delaying treatment out of fear,\nBlanche is always here for you.",
    designElements: {
      box: "We craft\nsmiles\nlike art",
      text: "At Blanche,\nstart your\ntransformation"
    }
  }
};

krData.solution.sleep = sleepKr;
enData.solution.sleep = sleepEn;

fs.writeFileSync(krPath, JSON.stringify(krData, null, 2) + '\n', 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2) + '\n', 'utf8');

console.log('Successfully updated kr.json and en.json with native English translations for the Sleep page.');
