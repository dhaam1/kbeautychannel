/**
 * 자동 새로고침 훅
 * 
 * @description
 * 60초마다 자동으로 데이터를 새로고침하는 훅입니다.
 * 새로고침 시 2초간 회전 아이콘을 표시합니다.
 */

import { useState, useEffect, useRef } from 'react';

interface UseAutoRefreshOptions {
  /**
   * 새로고침 간격 (밀리초)
   * @default 60000 (60초)
   */
  interval?: number;
  /**
   * 회전 아이콘 표시 시간 (밀리초)
   * @default 2000 (2초)
   */
  rotationDuration?: number;
  /**
   * 새로고침 콜백 함수
   */
  onRefresh: () => void | Promise<void>;
  /**
   * 자동 새로고침 활성화 여부
   * @default true
   */
  enabled?: boolean;
}

interface UseAutoRefreshReturn {
  /**
   * 현재 새로고침 중인지 여부
   */
  isRefreshing: boolean;
  /**
   * 회전 아이콘 표시 여부
   */
  isRotating: boolean;
  /**
   * 마지막 새로고침 시간
   */
  lastRefreshTime: Date | null;
  /**
   * 수동 새로고침 트리거
   */
  triggerRefresh: () => void;
}

export function useAutoRefresh({
  interval = 60000,
  rotationDuration = 2000,
  onRefresh,
  enabled = true,
}: UseAutoRefreshOptions): UseAutoRefreshReturn {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    setIsRotating(true);
    
    try {
      await onRefresh();
      setLastRefreshTime(new Date());
    } catch (error) {
      console.error('자동 새로고침 오류:', error);
    } finally {
      setIsRefreshing(false);
      
      // 2초 후 회전 아이콘 숨김
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
      }
      rotationTimeoutRef.current = setTimeout(() => {
        setIsRotating(false);
      }, rotationDuration);
    }
  };

  const triggerRefresh = () => {
    performRefresh();
  };

  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // 초기 실행
    performRefresh();

    // 주기적 실행
    intervalRef.current = setInterval(() => {
      performRefresh();
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
      }
    };
  }, [enabled, interval, rotationDuration]);

  return {
    isRefreshing,
    isRotating,
    lastRefreshTime,
    triggerRefresh,
  };
}
