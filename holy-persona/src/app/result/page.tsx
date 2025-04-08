'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

interface Answer {
  questionId: string;
  optionId: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    // Get answers from localStorage
    const savedAnswers = localStorage.getItem('quiz_answers');
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }

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
      
      userAnswers.forEach((answer) => {
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
        .then(response => response.json())
        .then(data => {
          setResult(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching result:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [userAnswers]);

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

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="text-white text-xl">결과를 찾을 수 없습니다.</div>
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