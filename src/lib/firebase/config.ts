/**
 * Firebase 설정 및 초기화
 * 
 * @description
 * Firebase 앱과 Firestore 데이터베이스를 초기화합니다.
 * 
 * 클라이언트 사이드에서만 동작하도록 보호합니다.
 * 
 * 환경 변수:
 * - NEXT_PUBLIC_FIREBASE_API_KEY: Firebase API 키
 * - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: Firebase 인증 도메인
 * - NEXT_PUBLIC_FIREBASE_PROJECT_ID: Firebase 프로젝트 ID
 * - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: Firebase Storage 버킷
 * - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: Firebase 메시징 발신자 ID
 * - NEXT_PUBLIC_FIREBASE_APP_ID: Firebase 앱 ID
 * 
 * 데이터베이스:
 * - 데이터베이스 이름: blanche-db
 * - 리전: asia-east1
 * 
 * @see https://firebase.google.com/docs/web/setup
 */

import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, initializeFirestore, type Firestore } from 'firebase/firestore';

// 클라이언트 사이드에서만 Firebase를 초기화
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (typeof window !== 'undefined') {
  // 필수 env가 누락된 상태에서 초기화하면 SDK가 "조용히" 실패/지연(pending)처럼 보일 수 있어
  // 누락을 즉시 드러내고 Firestore 초기화를 건너뜁니다.
  const missingByDot = [
    !firebaseConfig.apiKey && 'NEXT_PUBLIC_FIREBASE_API_KEY',
    !firebaseConfig.authDomain && 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    !firebaseConfig.projectId && 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    !firebaseConfig.storageBucket && 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    !firebaseConfig.messagingSenderId && 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    !firebaseConfig.appId && 'NEXT_PUBLIC_FIREBASE_APP_ID',
  ].filter(Boolean) as string[];

  if (missingByDot.length) {
    console.error(`[firebase] Missing env: ${missingByDot.join(', ')}`);
  } else {
  // Firebase 앱 인스턴스 (싱글톤 패턴)
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0]!;
  }

  // Firestore 데이터베이스 인스턴스 (blanche-db, asia-east1)
  // NOTE: databaseId는 프로젝트 설정에 따라 '(default)' 또는 커스텀 이름일 수 있음.
  // 필요 시 NEXT_PUBLIC_FIREBASE_DATABASE_ID로 덮어쓸 수 있게 합니다.
  const databaseId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || 'blanche-db';
  // 일부 환경에서 XHR 기반 WebChannel이 무한 pending 되는 문제가 있어
  // fetch 기반 스트리밍을 우선 시도합니다.
  let firestoreInitMode: 'initializeFirestore' | 'getFirestore' = 'getFirestore';
  let firestoreInitErr: string | undefined;
  try {
    db = initializeFirestore(
      app,
      ({
        // Prefer fetch streams over XHR where available.
        // If the environment/proxy blocks WebChannel XHR, this often unblocks Firestore.
        // NOTE: `useFetchStreams` is not present in some Firestore SDK typings, but is safe at runtime.
        useFetchStreams: true,
        // Allow SDK to fall back if needed.
        experimentalAutoDetectLongPolling: true,
      } as any),
      databaseId
    );
    firestoreInitMode = 'initializeFirestore';
  } catch (e) {
    firestoreInitErr = (e as any)?.message;
    // initializeFirestore가 실패/중복 초기화인 경우 기본 초기화로 폴백
    db = getFirestore(app, databaseId);
  }
  }
}

export { db };
export default app;
