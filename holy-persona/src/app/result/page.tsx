'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ResultData {
  type: string;
  name: string;
  title: string;
  description: string;
  image: string;
  characteristics: string[];
  mbti: {
    type: string;
    description: string;
  };
  blessing: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<any>(null);

  useEffect(() => {
    // Get the personality result from localStorage
    try {
      const storedResult = localStorage.getItem('personalityResult');
      
      if (storedResult) {
        const parsedResult = JSON.parse(storedResult);
        setUserAnswers(parsedResult);
      }
    } catch (error) {
      console.error('Error parsing stored result:', error);
    }
    
    // Always use the hardcoded David result for now
    const davidResult: ResultData = {
      type: "LAFO",
      name: "다윗",
      title: "하나님의 마음에 합한 자",
      description: "하나님의 마음에 합한 사람이자 이스라엘의 위대한 왕이었던 다윗은 용기와 지혜, 예술적 감각을 겸비한 인물입니다. 시편의 저자이자 뛰어난 음악가였으며, 골리앗과 싸워 승리한 영웅적인 지도자였습니다.",
      image: "/images/david.svg",
      characteristics: [
        "창의적이고 예술적인 감각이 뛰어남",
        "용기있는 리더십",
        "깊은 영성과 하나님과의 친밀한 관계",
        "감정이 풍부하고 표현력이 뛰어남"
      ],
      mbti: {
        type: "ENFP",
        description: "열정적이고 창의적인 자유로운 영혼"
      },
      blessing: "여호와는 나의 목자시니 내게 부족함이 없으리로다. 그가 나를 푸른 초장에 누이시며 쉴 만한 물가로 인도하시는도다. <br /> - 시편 23:1-2"
    };
    
    setResult(davidResult);
    setIsLoading(false);
  }, []);

  const handleShare = async () => {
    if (!result) return;
    
    try {
      await navigator.share({
        title: 'Holy Persona - 나의 성경 인물 매칭 결과',
        text: `나는 ${result.name}과(와) 닮았대요! 당신의 성경 인물 유형은 누구인가요?`,
        url: window.location.href
      });
    } catch (error) {
      console.error('공유하기 실패:', error);
    }
  };

  if (isLoading || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* 메인으로 돌아가기 버튼 */}
        <Link href="/">
          <motion.div 
            className="flex items-center gap-2 text-white/80 mb-8 hover:text-yellow-300 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>홈으로 돌아가기</span>
          </motion.div>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-lg"
        >
          {/* 헤더 섹션 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">당신과 닮은 성경 인물은</h1>
            <h2 className="text-4xl font-bold text-yellow-400 mb-4">{result.name}</h2>
            <p className="text-xl text-blue-200">{result.title}</p>
          </div>

          {/* 이미지와 설명 섹션 */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={result.image}
                  alt={result.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* 사용자 답변 표시 - Bible 성격 유형 */}
              {userAnswers && (
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">당신의 Bible 성격 유형</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-yellow-400">{userAnswers.type}</span>
                      <p className="text-blue-100 mt-2">당신의 성격 유형에 따른 성경 인물</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">인물 설명</h3>
                <p className="text-blue-100">{result.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">주요 특성</h3>
                <ul className="list-disc list-inside text-blue-100 space-y-2">
                  {result.characteristics.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 축복의 말씀 섹션 */}
          <div className="text-center mb-8 bg-gradient-to-r from-blue-800/50 to-blue-900/50 rounded-lg p-8 border border-blue-400/20">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">축복의 말씀</h3>
            <blockquote className="text-xl italic text-blue-100 max-w-3xl mx-auto">
              "{result.blessing}"
            </blockquote>
          </div>

          {/* MBTI 섹션 */}
          <div className="bg-white/5 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">MBTI 성격 유형</h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-yellow-400">{result.mbti.type}</span>
                <p className="text-blue-100 mt-2">{result.mbti.description}</p>
              </div>
            </div>
          </div>

          {/* 공유하기 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              <ShareIcon className="w-5 h-5" />
              결과 공유하기
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 