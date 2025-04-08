'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { CodeBracketIcon, CpuChipIcon, ShieldCheckIcon, BeakerIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function About() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen">
      {/* Back Button */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/">
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>메인으로</span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with cross and stained glass effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-blue-900 to-indigo-900 opacity-90"
          style={{ y, opacity }}
        >
          <motion.div 
            className="absolute inset-0 bg-[url('/cross-pattern.svg')] opacity-10"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-200">
              기술로 이어가는 영적 여정
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Holy Persona는 최신 AI 기술과 성경적 지혜를 결합하여 
            당신의 영적 성장을 돕는 혁신적인 플랫폼입니다.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70"
        >
          <span className="text-sm mb-2">스크롤하여 더 알아보기</span>
          <motion.div 
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-1 h-1 bg-white/70 rounded-full mt-2"
            ></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Technical Features */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
        <div className="absolute inset-0 bg-[url('/stained-glass-pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div 
                className="card group hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <CpuChipIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">고급 AI 모델</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      자체 튜닝된 AI 모델을 활용하여 성격 분석과 성경 인물 매칭을 수행합니다.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="card group hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <CodeBracketIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">최신 웹 기술</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Next.js 15와 React를 기반으로 구축되었으며, 
                      서버 사이드 렌더링으로 빠른 응답 속도를 제공합니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div 
                className="card group hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30">
                    <ShieldCheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">데이터 보안</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      모든 사용자 데이터는 암호화되어 저장되며, 
                      자체 보안 인프라를 통해 안전하게 보호됩니다.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="card group hover:shadow-xl"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                    <BeakerIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">성격 분석 알고리즘</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      MBTI와 30년 경력의 목사님과 함께 개발한 
                      독자적인 알고리즘으로 정확한 매칭을 제공합니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with 3D Cards */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.9%", label: "서비스 가용성", color: "blue" },
              { value: "16", label: "성경 인물 데이터", color: "purple" },
              { value: "95%", label: "매칭 정확도", color: "green" },
              { value: "기도", label: "기도하며 만든 서비스", color: "amber" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="perspective-1000"
              >
                <motion.div
                  whileHover={{ 
                    rotateX: 10,
                    rotateY: 15,
                    scale: 1.05
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform-gpu"
                >
                  <div className={`text-4xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 