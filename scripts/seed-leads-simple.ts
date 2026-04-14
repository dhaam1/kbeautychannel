/**
 * 리드 데이터 시드 스크립트 (간단 버전 - 클라이언트 SDK 사용)
 * 
 * @description
 * 클라이언트 SDK를 사용하여 Firestore의 'consultations' 컬렉션에 
 * 임시 상담 데이터를 생성합니다.
 * 
 * 생성되는 데이터:
 * - 이름, 전화번호, 진료과목, 상태, 날짜
 * - UTM 파라미터, 상담 메모, 비고 등
 * 
 * 실행 방법:
 *   npm run seed:leads          # 기본 100개 생성
 *   npm run seed:leads 200      # 200개 생성
 *   npx tsx scripts/seed-leads-simple.ts [개수]
 * 
 * 필수 환경 변수:
 *   - NEXT_PUBLIC_FIREBASE_API_KEY
 *   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   - NEXT_PUBLIC_FIREBASE_APP_ID
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// 환경 변수 로드 (.env.local 우선, 없으면 .env)
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Firebase 설정 (환경 변수에서 가져오기)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 환경 변수 검증
const requiredEnvVars = [
  { key: 'NEXT_PUBLIC_FIREBASE_API_KEY', value: firebaseConfig.apiKey },
  { key: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', value: firebaseConfig.authDomain },
  { key: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', value: firebaseConfig.projectId },
  { key: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', value: firebaseConfig.storageBucket },
  { key: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', value: firebaseConfig.messagingSenderId },
  { key: 'NEXT_PUBLIC_FIREBASE_APP_ID', value: firebaseConfig.appId },
];

const missingEnvVars = requiredEnvVars
  .filter(({ value }) => !value)
  .map(({ key }) => key);

if (missingEnvVars.length > 0) {
  console.error('❌ Firebase 환경 변수가 설정되지 않았습니다.\n');
  console.error('누락된 환경 변수:');
  missingEnvVars.forEach(key => console.error(`  - ${key}`));
  console.error('\n.env.local 또는 .env 파일에 필수 환경 변수를 설정해주세요.');
  process.exit(1);
}

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const consultationsRef = collection(db, 'consultations');

// 샘플 데이터 생성 함수
function generateSampleLeads(count: number = 100) {
  const names = [
    '홍길동', '김민수', '이영희', '박철수', '최지연', '정우성', '한지민',
    '강동원', '손예진', '송혜교', '전지현', '이병헌', '장동건', '원빈',
    '송강호', '황정민', '조진웅', '이선균', '마동석', '조여정', '김혜수',
    '전도연', '하정우', '이정재', '배두나', '김태리', '박소담', '윤여정'
  ];

  const phones = Array.from({ length: 20 }, (_, i) => {
    const prefix = `010-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    const suffix = `${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    return `${prefix}-${suffix}`;
  });

  const departments = ['블랑쉬', '임플란트', '교정', '기타진료'];
  const statuses = ['상담대기', '상담완료', '부재', '결번', '예약완료', '예약취소'];
  
  const utmSources = ['naver', 'google', 'kakao', 'direct', 'instagram', 'blog'];
  const utmMediums = ['cpc', 'organic', 'plusfriend', 'none', 'paid', 'web'];
  
  // 블로그 포스트 제목 시뮬레이션 (utm_content용)
  const blogPostTitles = [
    '인비절라인_후기_30대',
    '교정_치료_전후',
    '임플란트_수술_후기',
    '라미네이트_치아_개선',
    '블랑쉬_치아미백_효과',
    '돌출입_교정_경험',
    '치아교정_비용_후기',
    '임플란트_가격_비교',
    '교정기_종류_선택',
    '치아미백_부작용',
    '인비절라인_가격',
    '교정_기간_후기',
    '임플란트_수명',
    '라미네이트_전후',
    '치아교정_나이',
  ];

  const consultNotes = [
    '통화완료, 가격문의',
    '부재중, 문자 발송 완료',
    '상담예약 완료',
    '예약확정',
    '라미네이트 문의',
    '충치치료 문의',
    '3회 통화시도',
    '예약취소 요청',
    '후속 연락 대기',
    '상담 완료, 예약 대기',
    '가격 협의 중',
    '치료 계획 수립',
    '예약 일정 조율',
    '추가 상담 필요'
  ];

  const leads: any[] = [];

  // 2025년 10월 ~ 2026년 1월 사이의 데이터 생성
  const startDate = new Date(2025, 9, 1); // 2025년 10월 1일
  const endDate = new Date(2026, 1, 17); // 2026년 1월 17일
  
  for (let i = 0; i < count; i++) {
    const date = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );
    
    const nameIndex = Math.floor(Math.random() * names.length);
    const phoneIndex = Math.floor(Math.random() * phones.length);
    const departmentIndex = Math.floor(Math.random() * departments.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    
    // 블로그 유입 비율을 높이기 위해 가중치 적용 (약 30% 확률)
    const isBlogTraffic = Math.random() < 0.3;
    let utmSource: string;
    let utmMedium: string;
    
    if (isBlogTraffic) {
      utmSource = 'blog';
      utmMedium = 'web';
    } else {
      const utmSourceIndex = Math.floor(Math.random() * utmSources.length);
      const utmMediumIndex = Math.floor(Math.random() * utmMediums.length);
      utmSource = utmSources[utmSourceIndex];
      utmMedium = utmMediums[utmMediumIndex];
    }
    
    // 블로그 유입인 경우 utm_content 추가
    const utmContent = isBlogTraffic
      ? blogPostTitles[Math.floor(Math.random() * blogPostTitles.length)]
      : undefined;

    const lead: any = {
      name: names[nameIndex],
      phone: phones[phoneIndex],
      department: departments[departmentIndex],
      status: statuses[statusIndex],
      timestamp: Timestamp.fromDate(date),
      createdAt: Timestamp.fromDate(date),
      privacyAgreed: Math.random() > 0.1, // 90% 동의
      date: `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      utmSource: utmSource,
      utmMedium: utmMedium,
      ...(utmContent && { utmContent: utmContent }),
    };

    // 일부 리드에 상담 메모 추가 (70% 확률)
    if (Math.random() > 0.3) {
      const consultMonth = date.getMonth() + 1;
      const consultDay = date.getDate();
      lead.consult1 = `[${String(consultMonth).padStart(2, '0')}.${String(consultDay).padStart(2, '0')}] ${consultNotes[Math.floor(Math.random() * consultNotes.length)]}`;
      
      // 2차 상담 추가 (50% 확률, 상태가 상담대기가 아닌 경우)
      if (Math.random() > 0.5 && lead.status !== '상담대기' && lead.status !== '부재') {
        const consult2Date = new Date(date);
        consult2Date.setDate(consult2Date.getDate() + Math.floor(Math.random() * 3) + 1);
        lead.consult2 = `[${String(consult2Date.getMonth() + 1).padStart(2, '0')}.${String(consult2Date.getDate()).padStart(2, '0')}] 후속 상담 완료`;
        
        // 3차 상담 추가 (30% 확률, 예약완료 또는 상담완료인 경우)
        if (Math.random() > 0.7 && (lead.status === '예약완료' || lead.status === '상담완료')) {
          const consult3Date = new Date(consult2Date);
          consult3Date.setDate(consult3Date.getDate() + Math.floor(Math.random() * 5) + 1);
          lead.consult3 = `[${String(consult3Date.getMonth() + 1).padStart(2, '0')}.${String(consult3Date.getDate()).padStart(2, '0')}] 예약 확정`;
          
          // 4차 상담 추가 (20% 확률)
          if (Math.random() > 0.8) {
            const consult4Date = new Date(consult3Date);
            consult4Date.setDate(consult4Date.getDate() + Math.floor(Math.random() * 7) + 1);
            lead.consult4 = `[${String(consult4Date.getMonth() + 1).padStart(2, '0')}.${String(consult4Date.getDate()).padStart(2, '0')}] 최종 확인 완료`;
          }
        }
      }
    }

    // 일부 리드에 비고 추가 (40% 확률)
    if (Math.random() > 0.6) {
      const memos = [
        '추가 문의 가능',
        '긴급 연락 요청',
        '특이사항 없음',
        '추가 상담 필요',
        '가격 협의 중',
        '치료 계획 수립 완료',
        '예약 변경 가능',
        'VIP 고객'
      ];
      lead.memo = memos[Math.floor(Math.random() * memos.length)];
    }

    leads.push(lead);
  }

  return leads;
}

// 메인 실행 함수
async function main() {
  try {
    console.log('🚀 Firebase Firestore 임시 데이터 생성 스크립트 시작\n');
    
    // 개수 파싱 및 검증
    const countArg = process.argv[2] || '100';
    const count = parseInt(countArg, 10);
    
    if (isNaN(count) || count <= 0) {
      console.error(`❌ 잘못된 개수입니다: "${countArg}"`);
      console.error('사용법: npm run seed:leads [개수]');
      console.error('예시: npm run seed:leads 100');
      process.exit(1);
    }
    
    console.log(`📊 생성할 데이터 개수: ${count}개`);
    console.log('📝 샘플 리드 데이터 생성 중...\n');
    
    const leads = generateSampleLeads(count);
    
    console.log(`✅ 총 ${leads.length}개의 리드 데이터 생성 완료`);
    console.log('🔥 Firestore에 데이터 추가 중...\n');
    
    // 데이터를 순차적으로 추가 (Firestore 규칙 제한 고려)
    let successCount = 0;
    let errorCount = 0;
    
    const startTime = Date.now();
    
    for (let i = 0; i < leads.length; i++) {
      try {
        await addDoc(consultationsRef, leads[i]);
        successCount++;
        
        // 진행 상황 표시 (10개마다 또는 마지막 항목)
        if ((i + 1) % 10 === 0 || i === leads.length - 1) {
          const progress = ((i + 1) / leads.length * 100).toFixed(1);
          console.log(`  진행률: ${i + 1}/${leads.length} (${progress}%)`);
        }
        
        // Firestore 제한을 피하기 위해 약간의 지연
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (error: any) {
        errorCount++;
        console.error(`  ⚠️  리드 ${i + 1} 추가 실패:`, error.message);
      }
    }
    
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 데이터 추가 결과');
    console.log('='.repeat(50));
    console.log(`✅ 성공: ${successCount}개`);
    if (errorCount > 0) {
      console.log(`❌ 실패: ${errorCount}개`);
    }
    console.log(`⏱️  소요 시간: ${elapsedTime}초`);
    console.log('='.repeat(50));
    console.log(`\n💡 리드 관리 페이지에서 확인하세요: /admin/leads\n`);
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ 오류 발생!\n');
    console.error('오류 메시지:', error.message);
    if (error.stack) {
      console.error('\n스택 트레이스:');
      console.error(error.stack);
    }
    console.error('\n문제 해결 방법:');
    console.error('1. Firebase 환경 변수가 올바르게 설정되었는지 확인');
    console.error('2. Firestore 규칙이 쓰기를 허용하는지 확인');
    console.error('3. 네트워크 연결 상태를 확인');
    process.exit(1);
  }
}

main();
