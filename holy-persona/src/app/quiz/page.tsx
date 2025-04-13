'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const questions = [
  // 축 1: Leadership (L) vs. Support (S)
  {
    id: 1,
    text: "팀이 중요한 결정을 못 내리고 혼란스러울 때, 당신의 태도는?",
    options: [
      { id: 1, text: "'이렇게 하자'며 주도적으로 방향을 제시한다.", type: "L" },
      { id: 2, text: "리더를 도와서 중간에서 사람들의 의견을 조율한다.", type: "S" },
      { id: 3, text: "전체를 다 끌고 가기보단, 필요한 부분을 책임지고 해결한다.", type: "S" },
      { id: 4, text: "팀원들을 독려하고 최종 결정권자로서 책임지겠다 선언한다.", type: "L" }
    ]
  },
  {
    id: 2,
    text: "프로젝트가 시작될 때, 당신이 가장 하고 싶은 역할은?",
    options: [
      { id: 1, text: "팀 전체 리더가 되어 사람을 이끌며 목표를 정한다.", type: "L" },
      { id: 2, text: "내가 맡은 파트를 확실히 끝내서 팀에 기여한다.", type: "S" },
      { id: 3, text: "부족한 부분을 옆에서 보완하며 팀워크를 강화한다.", type: "S" },
      { id: 4, text: "조장이나 책임자를 맡아 최종 성과를 책임진다.", type: "L" }
    ]
  },
  // 축 2: Action (A) vs. Reflection (R)
  {
    id: 3,
    text: "기회가 찾아오면 당신의 반응은?",
    options: [
      { id: 1, text: "고민하기보다 바로 도전하며 경험을 쌓는다.", type: "A" },
      { id: 2, text: "실행하면서 배우는 과정 자체를 즐긴다.", type: "A" },
      { id: 3, text: "위험요소와 대안을 충분히 검토한 후에 움직인다.", type: "R" },
      { id: 4, text: "여러 사람 조언을 듣고 정교한 계획을 세운 뒤 시작한다.", type: "R" }
    ]
  },
  {
    id: 4,
    text: "새로운 일이나 사역 제안을 받았을 때, 가장 가까운 태도는?",
    options: [
      { id: 1, text: "일단 해보면서 부족한 건 채워가자는 마음으로 시작.", type: "A" },
      { id: 2, text: "의욕 넘쳐서 바로 행동으로 옮기고 싶다.", type: "A" },
      { id: 3, text: "충돌이나 리스크를 줄이기 위해 사전 준비가 필수다.", type: "R" },
      { id: 4, text: "성공 확률을 높이기 위해 정보와 자료를 많이 찾는다.", type: "R" }
    ]
  },
  // 축 3: Feeling (F) vs. Thinking (T)
  {
    id: 5,
    text: "갈등 상황이 생겼을 때, 가장 먼저 드는 생각은?",
    options: [
      { id: 1, text: "상대방 마음을 먼저 이해하고 감정을 공감해준다.", type: "F" },
      { id: 2, text: "대화를 통해 서로 감정적으로 풀어가는 과정이 중요하다.", type: "F" },
      { id: 3, text: "문제의 원인을 논리적으로 분석해서 해결책을 찾는다.", type: "T" },
      { id: 4, text: "서로 주장이 달라도 사실관계를 확실히 파악하는 게 우선이다.", type: "T" }
    ]
  },
  {
    id: 6,
    text: "친구가 힘든 일을 털어놓았을 때, 당신은?",
    options: [
      { id: 1, text: "먼저 함께 감정적으로 공감하며 위로해준다.", type: "F" },
      { id: 2, text: "친구와 함께 울고 웃으며 감정을 나누는 것이 중요하다.", type: "F" },
      { id: 3, text: "해결 방안을 논리적으로 제시해 주려 한다.", type: "T" },
      { id: 4, text: "대안을 차근차근 단계별로 정리해 조언한다.", type: "T" }
    ]
  },
  // 축 4: Outward Faith (O) vs. Inward Faith (I)
  {
    id: 7,
    text: "예배 중, 가장 마음이 뜨거워지는 순간은?",
    options: [
      { id: 1, text: "찬양하며 기쁨을 크게 표현할 때", type: "O" },
      { id: 2, text: "함께 기도하고 서로 소리 내어 은혜를 나눌 때", type: "O" },
      { id: 3, text: "설교나 말씀을 듣고 조용히 묵상에 잠길 때", type: "I" },
      { id: 4, text: "개인적으로 기도노트에 적으며 내면에 집중할 때", type: "I" }
    ]
  },
  {
    id: 8,
    text: "당신의 신앙생활 스타일은?",
    options: [
      { id: 1, text: "예배나 기도모임 등, 함께 뜨겁게 은혜 나누는 걸 좋아한다.", type: "O" },
      { id: 2, text: "간증을 하거나 선포하며 믿음을 표현할 때 기쁨이 크다.", type: "O" },
      { id: 3, text: "말씀을 개인적으로 필사하고 깊이 묵상하는 시간을 중시한다.", type: "I" },
      { id: 4, text: "조용히 내면에 집중하며 하나님의 음성을 구하는 편이다.", type: "I" }
    ]
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [personalityType, setPersonalityType] = useState("");
  const [answers, setAnswers] = useState<{questionId: number, optionId: number, type: string}[]>([]);
  const router = useRouter();

  const currentQuestionData = questions[currentQuestion];

  // Set the selected option when navigating to a question
  useEffect(() => {
    if (currentQuestionData) {
      const existingAnswer = answers.find(a => a.questionId === currentQuestionData.id);
      if (existingAnswer) {
        setSelectedOption(existingAnswer.optionId);
      } else {
        setSelectedOption(null);
      }
    }
  }, [currentQuestion, answers, currentQuestionData?.id]);

  const handleOptionSelect = (index: number, type: string) => {
    // Set the selected option for the current question
    setSelectedOption(index);
    
    setTimeout(() => {
      // Check if we already have an answer for this question
      const existingAnswerIndex = answers.findIndex(answer => answer.questionId === currentQuestionData.id);
      
      if (existingAnswerIndex !== -1) {
        // Update existing answer
        const updatedAnswers = [...answers];
        updatedAnswers[existingAnswerIndex] = {
          questionId: currentQuestionData.id,
          optionId: currentQuestionData.options[index].id,
          type: type
        };
        setAnswers(updatedAnswers);
      } else {
        // Add new answer
        setAnswers(prev => [...prev, {
          questionId: currentQuestionData.id,
          optionId: currentQuestionData.options[index].id,
          type: type
        }]);
      }
      
      if (currentQuestion < questions.length - 1) {
        // Move to the next question
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Quiz completed, save results and navigate to result page
        saveResults();
        router.push('/result');
      }
    }, 500);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      // Go to previous question
      setCurrentQuestion(prev => prev - 1);
      // The useEffect will handle setting the correct selected option for the previous question
    }
  };

  const saveResults = () => {
    // Count the frequency of each type
    const typeCounts: Record<string, number> = {};
    answers.forEach(answer => {
      typeCounts[answer.type] = (typeCounts[answer.type] || 0) + 1;
    });
    
    // Determine the dominant type for each axis
    const result = {
      leadership: typeCounts['L'] > typeCounts['S'] ? 'L' : 'S',
      action: typeCounts['A'] > typeCounts['R'] ? 'A' : 'R',
      feeling: typeCounts['F'] > typeCounts['T'] ? 'F' : 'T',
      faith: typeCounts['O'] > typeCounts['I'] ? 'O' : 'I'
    };
    
    // Create the final personality type string
    const finalType = `${result.leadership}${result.action}${result.feeling}${result.faith}`;
    
    // Save to localStorage
    localStorage.setItem('answers', JSON.stringify({
      type: finalType,
      answers: answers
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 text-gray-800 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 mx-1 rounded ${
                  index <= currentQuestion ? 'bg-purple-400' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            질문 {currentQuestion + 1} / {questions.length}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg p-6 shadow-lg border border-purple-100"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            transform: 'rotateX(0deg)',
          }}
          whileHover={{
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transform: 'translateY(-5px)',
          }}
        >
          <h3 className="text-xl mb-6 text-gray-800">{currentQuestionData.text}</h3>
          <div className="space-y-4">
            {currentQuestionData.options.map((option, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedOption === index
                    ? 'bg-purple-400 text-white'
                    : 'bg-purple-50 hover:bg-purple-100 text-gray-800'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect(index, option.type)}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(0)',
                }}
              >
                {option.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          {currentQuestion === 0 ? (
            <Link href="/">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <HomeIcon className="w-5 h-5" />
                <span>홈으로</span>
              </motion.button>
            </Link>
          ) : (
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousQuestion}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>이전 질문</span>
            </motion.button>
          )}
          
          <div className="flex-1"></div>
          
          {currentQuestion === 0 ? (
            <div></div>
          ) : (
            <Link href="/">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>처음으로</span>
                <HomeIcon className="w-5 h-5" />
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 