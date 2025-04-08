'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { SparklesIcon, BookOpenIcon, HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Cross Background */}
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
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
        
        {/* Animated light rays */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-b from-yellow-200/50 to-transparent"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
          <motion.div 
            className="absolute top-0 left-1/4 w-1 h-1/3 bg-gradient-to-b from-yellow-200/30 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          ></motion.div>
          <motion.div 
            className="absolute top-0 right-1/4 w-1 h-1/3 bg-gradient-to-b from-yellow-200/30 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          ></motion.div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8 perspective-1000"
          >
            <div className="inline-block p-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 hover:scale-110 transition-transform duration-300">
              <SparklesIcon className="w-8 h-8 text-yellow-300" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 text-white perspective-1000"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-200 inline-block hover:scale-105 transition-transform duration-300">Holy</span>{" "}
            <span className="inline-block hover:scale-105 transition-transform duration-300">Persona</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 text-blue-100"
          >
            AI로 찾는 나의 성경 속 인물
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quiz">
              <motion.div 
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                시작하기
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div 
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                더 알아보기
              </motion.div>
            </Link>
          </div>
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

      {/* Features Section with Stained Glass Effect */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
        <div className="absolute inset-0 bg-[url('/stained-glass-pattern.svg')] opacity-5"></div>
        
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-title text-4xl font-bold text-center mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">서비스 특징</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            성경 속 인물들과의 연결을 통해 당신의 영적 여정을 시작하세요
          </motion.p>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="card group hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <SparklesIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI 기반 분석</h3>
              <p className="text-gray-600 dark:text-gray-300">
                최신 AI 기술을 활용하여 당신의 성격과 가장 잘 맞는 성경 속 인물을 찾아드립니다.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="card group hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpenIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">상세한 AI 리포트</h3>
              <p className="text-gray-600 dark:text-gray-300">
                매칭된 성경속 인물의 성격, 그리고 당신과의 유사점을 상세히 분석해드립니다.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="card group hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <HeartIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">영적 성장</h3>
              <p className="text-gray-600 dark:text-gray-300">
                성경 속 인물의 이야기를 통해 영적 통찰과 성장의 기회를 제공합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">사용자 후기</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">임</span>
                </div>
                <div>
                  <h4 className="font-semibold">임주형</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">TECH PM</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                &ldquo;Holy Persona를 통해 제가 &apos;다윗&apos;과 유사하다는 것을 알게 되었습니다. 그의 믿음과 회개, 그리고 하나님에 대한 신뢰가 저에게 큰 영감이 되었습니다.&rdquo;
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">송</span>
                </div>
                <div>
                  <h4 className="font-semibold">송윤재</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Developer</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                &ldquo;AI를 활용하여 제 자신을 분석한 결과, 제가 &apos;요셉&apos;과 유사하다는 것을 알게 되었습니다. 그의 인내와 믿음이 저에게 큰 위로가 되었고, 현재의 어려움을 극복할 수 있는 힘을 얻었습니다.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section with Cross Background */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-[url('/cross-pattern.svg')] opacity-10"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 text-white"
          >
            지금 바로 시작하세요
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-blue-100 mb-8"
          >
            AI가 분석하는 당신만의 성경 속 인물을 찾아보세요
          </motion.p>
          <Link href="/quiz">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              AI 분석 시작하기
            </motion.button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Holy Persona</h3>
            <p className="text-gray-400">AI로 찾는 나의 성경 속 인물</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">이용약관</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">개인정보처리방침</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">문의하기</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
