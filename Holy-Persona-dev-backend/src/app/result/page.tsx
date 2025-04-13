'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

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

interface Answer {
  questionId: string;
  optionId: string;
}

// Default David result
const defaultDavidResult: ResultData = {
  type: "LAFO",
  name: "다윗",
  title: "하나님의 마음에 합한 자",
  description: "다윗은 용기 있고 지혜로운 지도자로서, 하나님의 마음에 합한 자로 불렸습니다. 그는 시인, 음악가, 전사, 그리고 왕으로서 다양한 재능을 가졌으며, 하나님과의 깊은 관계를 통해 영적 통찰력을 갖추었습니다. 그의 삶은 승리와 실패, 기쁨과 슬픔, 그리고 하나님에 대한 신앙의 여정을 보여줍니다.",
  image: "/david.svg",
  characteristics: [
    "창의적이고 예술적인 감각",
    "강한 리더십과 결단력",
    "감정 표현이 풍부하고 정직함",
    "영적 깊이와 하나님과의 친밀함",
    "도전을 두려워하지 않는 용기",
    "실수에서 배우고 회개하는 겸손"
  ],
  mbti: {
    type: "ENFP",
    description: "열정적인 중재자, 창의적이고 에너지 넘치는 성격으로 새로운 가능성을 탐구하는 것을 좋아합니다."
  },
  blessing: "여호와는 나의 목자시니 내가 부족함이 없으리로다. 그가 나를 푸른 초장에 누이시며 쉴 만한 물가로 인도하시는도다."
};

export default function ResultPage() {
  const [result, setResult] = useState<ResultData>(defaultDavidResult);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [isDirectAccess, setIsDirectAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Get answers from localStorage
      const savedAnswers = localStorage.getItem('quiz_answers');
      
      if (!savedAnswers) {
        // If no answers found, this is a direct access
        setIsDirectAccess(true);
        setIsLoading(false);
        return;
      }
      
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setUserAnswers(parsedAnswers);
        
        const getPersonalityType = () => {
          const types = {
            L: 0, // Leadership
            S: 0, // Support
            A: 0, // Action
            R: 0, // Reflection
            F: 0, // Feeling
            T: 0, // Thinking
            O: 0, // Outward Faith
            I: 0, // Inward Faith
          };
          
          parsedAnswers.forEach((answer: Answer) => {
            const [optionType] = answer.optionId.split('_');
            if (optionType && (optionType === 'L' || optionType === 'S' || 
                optionType === 'A' || optionType === 'R' || 
                optionType === 'F' || optionType === 'T' || 
                optionType === 'O' || optionType === 'I')) {
              types[optionType as keyof typeof types]++;
            }
          });

          // Determine the personality type based on the highest count in each pair
          const leadership = types.L > types.S ? 'L' : 'S';
          const action = types.A > types.R ? 'A' : 'R';
          const feeling = types.F > types.T ? 'F' : 'T';
          const faith = types.O > types.I ? 'O' : 'I';

          return `${leadership}${action}${feeling}${faith}`;
        };

        const type = getPersonalityType();
        if (type) {
          // Fetch the result data for this personality type
          fetch(`/result/${type}.json`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Result not found');
              }
              return response.json();
            })
            .then(data => {
              setResult(data);
              setIsLoading(false);
            })
            .catch(error => {
              console.error('Error fetching result:', error);
              setIsLoading(false);
              setIsDirectAccess(true);
            });
        } else {
          setIsLoading(false);
          setIsDirectAccess(true);
        }
      } catch (error) {
        console.error('Error parsing answers:', error);
        setIsLoading(false);
        setIsDirectAccess(true);
      }
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-white text-xl">결과를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 sm:p-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/"
          className="inline-flex items-center text-white/80 hover:text-yellow-400 transition-colors mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span>메인으로 돌아가기</span>
        </Link>

        {isDirectAccess && (
          <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-lg p-4 mb-6 text-yellow-200">
            <p className="text-sm">
              이 페이지는 퀴즈 결과를 보여주는 페이지입니다. 퀴즈를 완료하면 당신의 성경 인물 유형을 확인할 수 있습니다.
              아래는 예시로 다윗의 결과입니다.
            </p>
          </div>
        )}

        <motion.div 
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-4xl font-bold mb-2">{result.name}</h1>
              <p className="text-xl text-yellow-400 mb-4">{result.title}</p>
              <div className="relative w-full max-w-sm mx-auto aspect-square">
                <Image
                  src={result.image}
                  alt={result.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">유형: {result.type}</h2>
                    <div className="grid grid-cols-2 gap-4 text-white/80">
                      <div>
                        <span className="font-semibold text-yellow-400">L</span>
                        <span className="text-white/80"> - Leadership</span>
                        <p className="text-sm">주도적인 리더십</p>
                      </div>
                      <div>
                        <span className="font-semibold text-yellow-400">A</span>
                        <span className="text-white/80"> - Action</span>
                        <p className="text-sm">실천하는 행동력</p>
                      </div>
                      <div>
                        <span className="font-semibold text-yellow-400">F</span>
                        <span className="text-white/80"> - Feeling</span>
                        <p className="text-sm">감정적 통찰력</p>
                      </div>
                      <div>
                        <span className="font-semibold text-yellow-400">O</span>
                        <span className="text-white/80"> - Outward Faith</span>
                        <p className="text-sm">외향적 신앙 표현</p>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3">성경 인물 유형</h2>
                  <p className="text-white/80 leading-relaxed">
                    {result.description}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-semibold mb-3">특징</h2>
                  <ul className="list-disc list-inside space-y-2 text-white/80">
                    {result.characteristics.map((characteristic, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      >
                        {characteristic}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <h2 className="text-2xl font-semibold mb-3">MBTI 유형: {result.mbti.type}</h2>
              <p className="text-white/80 leading-relaxed">
                {result.mbti.description}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              <h2 className="text-2xl font-semibold mb-3">축복의 말씀</h2>
              <p className="text-white/80 leading-relaxed italic">
                {result.blessing}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <motion.button
            onClick={handleShare}
            className="flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShareIcon className="w-5 h-5" />
            결과 공유하기
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
} 