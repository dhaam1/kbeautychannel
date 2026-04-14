'use client';

import { useLocale } from 'next-intl';
import { FAQSection, type FAQItem } from '@/components/sections/common/FAQSection';

/**
 * FAQ 데이터 - 교정 관련
 */
const getFAQData = (isEn: boolean): FAQItem[] => [
  {
    question: isEn ? 'Does orthodontic treatment hurt?' : '교정 치료, 많이 아픈가요?',
    questionMobile: isEn ? 'Does orthodontic\ntreatment hurt?' : '교정 치료, 많이\n아픈가요?',
    answer: isEn ? 'Do not worry about the pain of poking wires. You may feel a tight sensation for about 2-3 days immediately after replacing the aligners, but this is a positive sign that your teeth are moving well to their planned positions. Blanche uses self-ligating brackets with reduced friction to carefully manage the discomfort patients may feel.' : '철사에 찔리는 통증은 걱정하지 마세요. 장치를 새로 교체한 직후 2~3일 정도 치아를 꽉 잡아주는 느낌이 들 수 있는데, 이는 치아가 계획된 위치로 잘 이동하고 있다는 긍정적인 신호입니다. 블랑쉬는 마찰력을 줄인 자가결찰 장치를 사용하여 환자분이 느끼는 불편함을 세심하게 관리합니다.',
  },
  {
    question: isEn ? 'Which is right for me, laminates or orthodontics?' : '라미네이트와 교정 중 저에게 맞는 건 무엇인가요?',
    questionMobile: isEn ? 'Which is right for me,\nlaminates or orthodontics?' : '라미네이트와 교정 중\n저에게 맞는 건 무엇인가요?',
    answer: isEn ? 'If the tooth itself is chipped or discolored and you want to change its shape, "Blanche (Laminate)" is effective. If you want to correct crooked or uneven positioning, "Invisalign (Orthodontics)" is the answer. As we provide both solutions, we objectively propose the best answer that provides the greatest benefit to the patient.' : '치아 자체가 깨지거나 변색되어 형태를 바꾸고 싶다면 \'블랑쉬(라미네이트)\'가 효과적이고, 삐뚤빼뚤한 위치를 바로잡고 싶으면 \'인비절라인(교정)\'이 정답입니다. 저희는 두 가지 솔루션을 모두 보유하고 있기에, 한쪽으로 치우치지 않고 환자분께 가장 이득이 되는 최선의 답을 제안해 드립니다.',
  },
  {
    question: isEn ? 'How long should I wear the aligners each day?' : '장치는 하루에 얼마나 끼고 있어야 하나요?',
    questionMobile: isEn ? 'How long should I wear\nthe aligners each day?' : '장치는 하루에\n얼마나 끼고 있어야 하나요?',
    answer: isEn ? 'Teeth continuously try to return to their original places. You must wear them at all times including while sleeping, except during meals and brushing, for cell-level movement to proceed seamlessly according to plan. The longer you leave the aligners out, the longer the retention period may become.' : '치아는 끊임없이 원래 자리로 되돌아가려 합니다. 식사와 양치 시간을 제외한 잠잘 때를 포함해 항상 착용하셔야 세포 단위의 이동이 멈추지 않고 계획대로 진행됩니다. 장치를 빼놓는 시간이 길어질수록 고정 기간도 그만큼 늘어날 수 있습니다.',
  },
  {
    question: isEn ? 'Will it affect my speech or daily life?' : '발음이 새서 일상생활이 불편하진 않을까요?',
    questionMobile: isEn ? 'Will it affect my\nspeech or daily life?' : '발음이 새서 일상생활이\n불편하진 않을까요?',
    answer: isEn ? 'When first wearing them, "s" sounds might feel slightly awkward, but after a 2-3 day adaptation period, your tongue gets used to the device and pronunciation becomes natural. In fact, announcers and flight attendants, whose clear delivery is vital, wear the devices while working without any disruption to their daily lives.' : '처음 착용 시 \'ㅅ\', \'ㅆ\' 발음이 약간 어색할 수 있지만, 2~3일의 적응기만 지나면 혀가 장치에 익숙해져 자연스러워집니다. 실제로 정확한 전달력이 생명인 아나운서나 승무원분들도 장치를 착용한 채 근무할 만큼 일상생활에 지장이 없습니다.',
  },
  {
    question: isEn ? 'How long will the treatment take?' : '교정 기간은 얼마나 걸릴까요?',
    questionMobile: isEn ? 'How long will the\ntreatment take?' : '교정 기간은\n얼마나 걸릴까요?',
    answer: isEn ? 'While it depends on your dental condition, partial orthodontics correcting only front teeth takes about 3-6 months. Full orthodontics takes on average 1.5 to 2 years, but Blanche Dental Clinic uses "2nd Gen Clippy-C" devices with reduced friction, shortening the duration by 2-6 months compared to conventional treatment.' : '치아 상태에 따라 다르지만, 앞니만 바로잡는 부분 교정은 3~6개월이면 충분합니다. 전체 교정은 평균 1년 6개월에서 2년 정도 소요되는데, 블랑쉬치과는 치아 이동을 방해하는 마찰력을 줄인 \'2세대 클리피씨\' 장치를 사용하여 일반 교정보다 기간을 2~6개월 더 단축해 드립니다.',
  },
  {
    question: isEn ? 'Why is there a cost difference between clinics?' : '병원마다 비용 차이가 나는 이유가 궁금해요.',
    questionMobile: isEn ? 'Why is there a cost\ndifference between clinics?' : '병원마다 비용 차이가 나는\n이유가 궁금해요.',
    answer: isEn ? 'Orthodontics isn\'t simply straightening teeth; it\'s a highly advanced treatment balancing the TMJ and the entire face. At Blanche, a specialist with 20 years of experience and over 10,000 clinical cases personally oversees your treatment, using iTero 3D scanners and 100% genuine appliances. Getting it done perfectly the first time is the most economical approach.' : '교정은 단순히 치아를 펴는 것이 아니라 턱관절과 얼굴 전체의 균형을 맞추는 고난도 치료입니다. 블랑쉬치과는 10,000명 이상의 임상 케이스를 경험한 20년 경력의 전문의가 직접 진료하며, 아이테로(iTero) 3D 스캐너와 100% 정품 장치만을 사용합니다. 단 한 번에 제대로 끝내는 것이 가장 경제적인 교정입니다.',
  },
];

/**
 * 교정 FAQ 섹션 컴포넌트
 */
export function OrthodonticsFAQSection() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const faqData = getFAQData(isEn);

  return (
    <FAQSection
      items={faqData}
      smallTitle={isEn ? 'FAQ' : '자주 묻는 질문'}
      mainTitle={isEn ? "Everything you wonder\nbefore your consultation,\nanswered by Blanche" : `치아교정상담 전\n궁금해하는 것들,\n블랑쉬치과가 알려드립니다`}
      backgroundColor="#FEFEFE"
      showQuestionNumber={true}
      answerTextOpacity="muted"
    />
  );
}
