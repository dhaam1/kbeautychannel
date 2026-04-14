'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useBanners } from '@/hooks/useBanners';
import { uploadBannerWithCleanup } from '@/lib/firebase/banners';
import { BannerMetadata } from '@/lib/firebase/types';
import toast from 'react-hot-toast';

/**
 * 배너 관리 컴포넌트
 * 
 * @description
 * 어드민 페이지에서 배너 이미지를 업로드하고 관리하는 컴포넌트입니다
 * 각 배너별로 현재 이미지 미리보기, 파일 선택, 업로드 기능을 제공합니다
 */
export function BannerManagement() {
  const { banners, isLoading, error: fetchError } = useBanners([
    'hero_banner_01', 'hero_banner_02',
    'hero_banner_01_en', 'hero_banner_02_en',
    'hero_banner_01_jp', 'hero_banner_02_jp'
  ]);
  const [selectedLang, setSelectedLang] = useState<'kr' | 'en' | 'jp'>('kr');
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({});
  const [linkUrls, setLinkUrls] = useState<{ [key: string]: string }>({});

  // 배너 데이터 로드 시 링크 URL 초기화
  useEffect(() => {
    if (banners && banners.length > 0) {
      const newLinkUrls: { [key: string]: string } = {};
      banners.forEach(banner => {
        newLinkUrls[banner.id] = banner.linkUrl || '';
      });
      setLinkUrls(prev => ({ ...prev, ...newLinkUrls }));
    }
  }, [banners]);

  // 배너 목록
  const bannerConfigs = [
    { 
      id: selectedLang === 'kr' ? 'hero_banner_01' : `hero_banner_01_${selectedLang}`, 
      label: `Top Banner (${selectedLang.toUpperCase()})`, 
      description: 'Primary hero image (Top)' 
    },
    { 
      id: selectedLang === 'kr' ? 'hero_banner_02' : `hero_banner_02_${selectedLang}`, 
      label: `Bottom Banner (${selectedLang.toUpperCase()})`, 
      description: 'Secondary hero image (Bottom)' 
    },
  ];

  // 배너 ID로 배너 찾기
  const getBannerById = useCallback((bannerId: string): BannerMetadata | null => {
    return banners.find(b => b.id === bannerId) || null;
  }, [banners]);

  // 파일 선택 핸들러
  const handleFileSelect = (bannerId: string, file: File | null) => {
    if (!file) {
      setSelectedFiles(prev => ({ ...prev, [bannerId]: null }));
      return;
    }

    // 파일 검증
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

    if (file.size > MAX_FILE_SIZE) {
      toast.error('파일 크기는 5MB를 초과할 수 없습니다');
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('지원하는 이미지 형식: PNG, JPG, WebP');
      return;
    }

    setSelectedFiles(prev => ({ ...prev, [bannerId]: file }));
  };

  // 업로드 핸들러
  const handleUpload = async (bannerId: string) => {
    const file = selectedFiles[bannerId];
    if (!file) {
      toast.error('파일을 선택해주세요');
      return;
    }

    try {
      setUploading(prev => ({ ...prev, [bannerId]: true }));
      console.log(`[BannerManagement] Starting upload for ${bannerId} with link: ${linkUrls[bannerId] || ''}...`);

      await uploadBannerWithCleanup(bannerId, file, linkUrls[bannerId]);

      toast.success(`${bannerConfigs.find(b => b.id === bannerId)?.label} 업로드 완료`);
      setSelectedFiles(prev => ({ ...prev, [bannerId]: null }));

      // 성공 상태 업데이트 (페이지 새로고침 제거)
      toast.success('Successfully uploaded!');
    } catch (error: any) {
      console.error('[BannerManagement] 배너 업로드 치명적 오류:', error);

      let errorMessage = error.message || '업로드에 실패했습니다';

      // 구체적인 에러 메시지 처리
      if (error.code === 'storage/unauthorized') {
        errorMessage = '스토리지 권한이 없습니다 관리자에게 문의하세요';
      } else if (error.code === 'permission-denied') {
        errorMessage = '데이터베이스 쓰기 권한이 없습니다';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'CORS 설정 오류가 감지되었습니다 개발자에게 문의하세요';
      }

      toast.error(errorMessage);
    } finally {
      setUploading(prev => ({ ...prev, [bannerId]: false }));
    }
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (fetchError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">배너 데이터를 불러오는 중 오류가 발생했습니다: {fetchError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Banner Management</h2>
            <p className="text-gray-500 mt-2">Manage homepage hero banners.</p>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            {(['kr', 'en', 'jp'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-4 py-2 rounded-md font-bold text-sm transition-all shadow-sm ${
                  selectedLang === lang 
                    ? 'bg-white text-mint-dark ring-1 ring-gray-200' 
                    : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50 shadow-none'
                }`}
              >
                {lang === 'kr' ? '한국어' : lang === 'en' ? 'English' : '日本語'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {bannerConfigs.map((config) => {
          const banner = getBannerById(config.id);
          const isUploading = uploading[config.id];
          const selectedFile = selectedFiles[config.id];
          const hasFile = selectedFile !== null && selectedFile !== undefined;

          return (
            <div
              key={config.id}
              className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-5 border-b border-gray-100 pb-4">
                <h3 className="text-lg font-bold text-gray-900">{config.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{config.description}</p>
              </div>

              {/* 이미지 미리보기 구역 */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                  {selectedFile ? 'New Preview' : 'Current Image'}
                </label>
                <div className="relative w-full aspect-[260/214] bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shadow-inner flex items-center justify-center group">
                  {/* 로딩 상태 */}
                  {isLoading && !selectedFile ? (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint-dark"></div>
                      <span className="text-sm">Loading...</span>
                    </div>
                  ) : selectedFile ? (
                    /* 새 파일 미리보기 */
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="New Preview"
                      className="object-cover w-full h-full"
                      onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                    />
                  ) : banner ? (
                    /* 기존 파일 미리보기 */
                    <Image
                      src={banner.downloadUrl}
                      alt={config.label}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-700"
                      unoptimized
                    />
                  ) : (
                    /* 이미지 없음 */
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <svg className="w-8 h-8 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                </div>

                {/* 메타데이터 표시 */}
                {!selectedFile && banner && (
                  <div className="mt-3 text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-400">File:</span>
                      <span className="font-medium truncate max-w-[200px]">{banner.fileName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Size:</span>
                      <span className="font-medium">{formatFileSize(banner.fileSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="font-medium">{new Date(banner.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
                {selectedFile && (
                  <div className="mt-3 text-xs text-mint-dark font-medium bg-mint-dark/5 p-3 rounded-lg border border-mint-dark/10">
                    <p>Ready to upload: {selectedFile.name} ({formatFileSize(selectedFile.size)})</p>
                  </div>
                )}
              </div>

              {/* 파일 선택 */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Select New Image
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleFileSelect(config.id, file);
                  }}
                  disabled={isUploading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-mint-dark/10 file:text-mint-dark hover:file:bg-mint-dark/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>

              {/* 링크 URL 입력 */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  Link URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/event"
                  value={linkUrls[config.id] || ''}
                  onChange={(e) => setLinkUrls(prev => ({ ...prev, [config.id]: e.target.value }))}
                  disabled={isUploading}
                  className="block w-full px-4 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:ring-mint-dark focus:border-mint-dark outline-none transition-all"
                />
                <p className="mt-1 text-[10px] text-gray-400">배너 클릭 시 이동할 페이지 주소를 입력하세요.</p>
              </div>

              {/* 업로드 버튼 */}
              <button
                onClick={() => handleUpload(config.id)}
                disabled={!hasFile || isUploading}
                className="w-full px-4 py-3 bg-mint-dark text-white rounded-lg hover:bg-[#036b63] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all font-medium shadow-sm active:transform active:scale-[0.98]"
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </div>
          );
        })}
      </div>

      {/* 안내 메시지 */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Guidelines
        </h4>
        <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside ml-1">
          <li>Supported formats: PNG, JPG, WebP</li>
          <li>Max file size: 5MB</li>
          <li>Recommended size: 260 x 214px</li>
          <li>Uploading a new image will automatically replace the existing one.</li>
        </ul>
      </div>
    </div>
  );
}
