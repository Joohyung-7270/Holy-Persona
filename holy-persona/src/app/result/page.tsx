'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Database } from '@/types/supabase';

// 카카오 SDK 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

interface ResultData {
  type: string;
  name: string;
  title: string;
  description: string;
  image: string;
  characteristics: string[];
  blessing: string;
}

interface Answer {
  questionId: string;
  optionId: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // localStorage에서 답변 데이터 가져오기
        const answers = localStorage.getItem('answers');
        if (!answers) {
          setError('답변 데이터가 없습니다. Holy Question을 먼저 완료해주세요.');
          setLoading(false);
          return;
        }

        const parsedAnswers = JSON.parse(answers);
        
        // 백엔드 API 호출
        const response = await fetch('http://localhost:3002/api/result/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: parsedAnswers.type
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '결과를 가져오는데 실패했습니다.');
        }

        const data = await response.json();
        setResult(data);
        
        // 메타 태그 업데이트
        updateMetaTags(data);
      } catch (err) {
        console.error('Error fetching result:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  // 메타 태그 업데이트 함수
  const updateMetaTags = (resultData: ResultData) => {
    // 기본 메타 태그
    document.title = `${resultData.name} - Holy Persona`;
    
    // 메타 설명
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', `${resultData.name}(${resultData.title}) - ${resultData.description.substring(0, 100)}...`);
    
    // Open Graph 태그
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${resultData.name} - Holy Persona`);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', `${resultData.name}(${resultData.title}) - ${resultData.description.substring(0, 100)}...`);
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute('content', `https://holy-persona.vercel.app${resultData.image}`);
    }
  };

  const handleShare = async () => {
    if (!result || isSharing) return;

    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${result.name} - Holy Persona`,
          text: `${result.name}(${result.title}) - ${result.description.substring(0, 100)}...`,
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          // User cancelled the share, no need to show error
          console.log('공유가 취소되었습니다.');
        } else if (error.name === 'InvalidStateError') {
          // Another share is in progress, try again after a delay
          setTimeout(() => {
            handleShare();
          }, 1000);
        } else {
          console.error('공유하기 실패:', error);
          alert('공유하기에 실패했습니다. 다시 시도해주세요.');
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white text-xl">결과를 분석하는 중입니다...</p>
          <p className="text-gray-400 mt-2">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center max-w-md mx-4">
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center max-w-md mx-4">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">결과를 찾을 수 없습니다</h2>
          <p className="text-gray-300 mb-6">Holy Question을 먼저 완료해주세요</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            돌아가기
          </Link>
          <button
            onClick={handleShare}
            disabled={isSharing}
            className={`flex items-center text-gray-400 hover:text-white transition-colors ${isSharing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ShareIcon className="w-5 h-5 mr-2" />
            {isSharing ? '공유 중...' : '공유하기'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-48 h-48 md:w-64 md:h-64">
              {imageError ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-lg">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              ) : (
                <Image
                  src={result.image}
                  alt={result.name}
                  fill
                  className="object-cover rounded-lg"
                  onError={() => setImageError(true)}
                  priority
                />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{result.name}</h1>
              <h2 className="text-xl text-yellow-400 mb-4">{result.title}</h2>
              <p className="text-gray-300">{result.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">특징</h3>
            <ul className="list-disc list-inside space-y-1">
              {result.characteristics.map((char, index) => (
                <li key={index} className="text-gray-300">{char}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">축복</h3>
            <p className="text-gray-300">{result.blessing}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 