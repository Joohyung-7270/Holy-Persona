'use client';

import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DefaultResultPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-4">결과를 찾을 수 없습니다</h1>
        <p className="text-white/70 mb-8">
          퀴즈를 먼저 완료한 후 결과 페이지를 방문해주세요.
          성경 인물 유형을 알아보기 위해 퀴즈에 참여해보세요!
        </p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>메인으로 돌아가기</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 