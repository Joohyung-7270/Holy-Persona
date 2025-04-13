'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

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
  const [isDirectAccess, setIsDirectAccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 항상 다윗의 결과를 보여주도록 설정
    setResult(defaultDavidResult);
    setIsLoading(false);
    
    // 동적으로 메타 태그 업데이트
    updateMetaTags();
  }, []);
  
  // 메타 태그 업데이트 함수
  const updateMetaTags = () => {
    // 기본 메타 태그
    document.title = "Holy Persona - AI로 찾는 나의 성경 속 인물";
    
    // 메타 설명
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Holy Persona는 AI를 활용하여 당신의 성격과 가장 닮은 성경 속 인물을 찾아주는 서비스입니다. 성경 속 인물들의 특성을 분석하여 당신의 성격 유형을 파악하고, 그에 맞는 영적 통찰을 제공합니다.');
    
    // 키워드
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Holy Persona, 성경 인물, 성격 유형, AI 분석, 영적 성장, 성경, 신앙, MBTI, 성경 인물 매칭');
    
    // Open Graph / Facebook
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', 'https://holy-persona.vercel.app/result');
    updateMetaTag('og:title', 'Holy Persona - AI로 찾는 나의 성경 속 인물');
    updateMetaTag('og:description', 'Holy Persona는 AI를 활용하여 당신의 성격과 가장 닮은 성경 속 인물을 찾아주는 서비스입니다. 성경 속 인물들의 특성을 분석하여 당신의 성격 유형을 파악하고, 그에 맞는 영적 통찰을 제공합니다.');
    updateMetaTag('og:image', 'https://holy-persona.vercel.app/og-image.png');
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', 'https://holy-persona.vercel.app/result');
    updateMetaTag('twitter:title', 'Holy Persona - AI로 찾는 나의 성경 속 인물');
    updateMetaTag('twitter:description', 'Holy Persona는 AI를 활용하여 당신의 성격과 가장 닮은 성경 속 인물을 찾아주는 서비스입니다. 성경 속 인물들의 특성을 분석하여 당신의 성격 유형을 파악하고, 그에 맞는 영적 통찰을 제공합니다.');
    updateMetaTag('twitter:image', 'https://holy-persona.vercel.app/og-image.png');
    
    // 카카오톡 OG 태그
    updateMetaTag('og:site_name', 'Holy Persona');
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
  };
  
  // 메타 태그 업데이트 헬퍼 함수
  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`);
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('property', property);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  };

  const handleShare = async () => {
    if (!result) return;
    
    try {
      // 카카오톡 공유 기능 추가
      if (window.Kakao) {
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: 'Holy Persona - AI로 찾는 나의 성경 속 인물',
            description: 'AI가 분석한 나의 성경 속 인물은 누구일까요? 당신의 성격과 가장 닮은 성경 인물을 찾아보세요!',
            imageUrl: 'https://holy-persona.vercel.app/og-image.png',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          buttons: [
            {
              title: '테스트하기',
              link: {
                mobileWebUrl: 'https://holy-persona.vercel.app',
                webUrl: 'https://holy-persona.vercel.app',
              },
            },
          ],
        });
        return;
      }
      
      // 카카오톡 공유가 실패하면 기본 공유 기능 사용
      await navigator.share({
        title: 'Holy Persona - AI로 찾는 나의 성경 속 인물',
        text: 'AI가 분석한 나의 성경 속 인물은 누구일까요? 당신의 성격과 가장 닮은 성경 인물을 찾아보세요!',
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
    <>
      {/* 카카오톡 공유 스크립트 */}
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
      <Script id="kakao-share" strategy="afterInteractive">
        {`
          window.onload = function() {
            if (window.Kakao) {
              window.Kakao.init('YOUR_KAKAO_APP_KEY');
            }
          }
        `}
      </Script>
      
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
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Holy Question 결과</h1>
                <p className="text-lg text-gray-300">
                  당신의 Holy Question 응답을 Ai가 분석한 결과입니다. 성경 속 인물 중 당신과 가장 닮은 인물을 찾아드립니다.
                </p>
              </div>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                  <p className="text-gray-300">결과를 불러오는 중...</p>
                </div>
              ) : isDirectAccess ? (
                <div className="text-center py-12">
                  <p className="text-red-400 mb-4">{isDirectAccess}</p>
                  <Link href="/" className="text-yellow-400 hover:text-yellow-300">
                    메인으로 돌아가기
                  </Link>
                </div>
              ) : result ? (
                <div className="space-y-12">
                  {/* Character Name and Title */}
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-white mb-2">{result.name}</h2>
                    <p className="text-2xl text-yellow-400">{result.title}</p>
                    <p className="text-lg text-yellow-400/80 mt-4">유형: {result.type}</p>
                  </div>

                  {/* Image and Description Grid */}
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-black/30 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src={result.image}
                          alt="david"
                          fill
                          className="object-contain p-4"
                          priority
                          onError={(e) => {
                            // 이미지 로딩 실패 시 대체 텍스트 표시
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement('div');
                              fallback.className = 'text-center p-4';
                              fallback.innerHTML = `
                                <div class="text-4xl mb-2">👑</div>
                                <div class="text-xl font-bold">${result.name}</div>
                                <div class="text-yellow-400">${result.title}</div>
                              `;
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">인물 설명</h3>
                        <p className="text-gray-300 leading-relaxed">{result.description}</p>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-3">특징</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                          {result.characteristics.map((char, index) => (
                            <li key={index}>{char}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Personality Type Section */}
                  <div className="bg-black/30 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">성경 인물 유형 분석</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-yellow-400 mb-2">유형: {result.type}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-black/40 p-3 rounded-lg">
                            <p className="text-yellow-400 font-medium">{result.type.charAt(0)}</p>
                            <p className="text-gray-300 text-sm">
                              {result.type.charAt(0) === 'L' ? 'Leadership (리더십)' : 'Support (지원)'}
                            </p>
                          </div>
                          <div className="bg-black/40 p-3 rounded-lg">
                            <p className="text-yellow-400 font-medium">{result.type.charAt(1)}</p>
                            <p className="text-gray-300 text-sm">
                              {result.type.charAt(1) === 'A' ? 'Action (행동)' : 'Reflection (성찰)'}
                            </p>
                          </div>
                          <div className="bg-black/40 p-3 rounded-lg">
                            <p className="text-yellow-400 font-medium">{result.type.charAt(2)}</p>
                            <p className="text-gray-300 text-sm">
                              {result.type.charAt(2) === 'F' ? 'Feeling (감정)' : 'Thinking (사고)'}
                            </p>
                          </div>
                          <div className="bg-black/40 p-3 rounded-lg">
                            <p className="text-yellow-400 font-medium">{result.type.charAt(3)}</p>
                            <p className="text-gray-300 text-sm">
                              {result.type.charAt(3) === 'O' ? 'Outward Faith (외향적 신앙)' : 'Inward Faith (내향적 신앙)'}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                          {result.type === "LAFO" && "당신은 다윗과 같은 리더십, 행동력, 감성, 외향적 신앙을 가진 성격입니다. 하나님의 마음에 합한 자로서, 창의적이고 열정적인 리더십을 발휘하며, 감정을 자유롭게 표현하고 신앙을 적극적으로 나누는 특성이 있습니다."}
                          {result.type === "SRTI" && "당신은 모세와 같은 지원, 성찰, 사고, 내향적 신앙을 가진 성격입니다. 겸손한 지도자로서, 신중하고 체계적인 접근 방식을 가지고 있으며, 깊은 영적 성찰을 통해 하나님의 지혜를 구하는 특성이 있습니다."}
                          {result.type === "ARFO" && "당신은 바울과 같은 행동력, 성찰, 감성, 외향적 신앙을 가진 성격입니다. 열정적인 전도자로서, 깊은 신학적 통찰과 함께 적극적인 신앙 표현을 하며, 감정과 이성을 균형 있게 사용하는 특성이 있습니다."}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-yellow-400 mb-2">MBTI: {result.mbti.type}</h4>
                        <p className="text-gray-300">{result.mbti.description}</p>
                      </div>
                      {result.type === "LAFO" && (
                        <div className="bg-black/40 p-4 rounded-lg">
                          <h4 className="text-lg font-medium text-yellow-400 mb-2">LAFO 유형 상세 설명</h4>
                          <p className="text-gray-300 mb-3">
                            LAFO는 다음 네 가지 성격 축의 조합을 나타냅니다:
                          </p>
                          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-3">
                            <li><span className="text-yellow-400">L (Leadership)</span>: 리더십 성향 - 타인을 이끄는 것을 선호</li>
                            <li><span className="text-yellow-400">A (Action)</span>: 행동 지향 - 신중한 계획보다 즉각적인 행동을 선호</li>
                            <li><span className="text-yellow-400">F (Feeling)</span>: 감정 중심 - 논리보다 감정과 관계를 중요시</li>
                            <li><span className="text-yellow-400">O (Outward Faith)</span>: 외향적 신앙 - 신앙을 외부적으로 표현하는 것을 선호</li>
                          </ul>
                          <p className="text-gray-300">
                            LAFO 유형의 사람들은 다윗처럼 창의적이고 열정적인 리더십, 감정의 자유로운 표현, 그리고 외향적인 신앙 표현을 통해 하나님의 마음에 합한 자로서의 특성을 보여줍니다.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Blessing Section */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-semibold text-white">당신을 위한 축복</h3>
                    <p className="text-xl text-yellow-400 italic">{result.blessing}</p>
                  </div>

                  {/* Share Button */}
                  <div className="text-center">
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 rounded-lg transition-colors"
                    >
                      <ShareIcon className="w-5 h-5" />
                      결과 공유하기
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 