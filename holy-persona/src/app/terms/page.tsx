'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back to Home Button */}
        <Link href="/" className="inline-flex items-center text-blue-100 hover:text-yellow-400 transition-colors duration-200 mb-8">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>메인으로 돌아가기</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-blue-400/20"
        >
          <h1 className="text-3xl font-bold mb-8 text-center text-yellow-300">이용약관</h1>
          
          <div className="space-y-6 text-blue-100">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. 서비스 소개</h2>
              <p>
                Holy Persona는 사용자의 성격 유형을 분석하여 성경 속 인물과 매칭해주는 서비스입니다. 
                본 서비스는 사용자의 응답을 기반으로 AI 알고리즘을 통해 분석 결과를 제공합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. 서비스 이용</h2>
              <p>
                본 서비스는 무료로 제공되며, 사용자는 서비스 이용 시 제공되는 정보를 개인적인 용도로만 사용할 수 있습니다.
                서비스 이용 시 발생하는 모든 책임은 사용자에게 있으며, 서비스 제공자는 사용자의 서비스 이용으로 인해 발생한 
                어떠한 손해에 대해서도 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. 지적재산권</h2>
              <p>
                본 서비스에서 제공하는 모든 콘텐츠, 디자인, 로고, 이미지, 텍스트 등은 Holy Persona의 지적재산권으로 보호됩니다.
                사용자는 서비스 제공자의 명시적인 허가 없이 이러한 콘텐츠를 복제, 배포, 전송, 전시, 공연, 방송, 
                판매, 라이선스, 제작, 이용, 판매, 임대할 수 없습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. 서비스 변경 및 중단</h2>
              <p>
                서비스 제공자는 사전 통지 없이 서비스의 내용을 변경하거나 중단할 수 있으며, 이로 인해 발생하는 
                불이익에 대해 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. 면책 조항</h2>
              <p>
                서비스 제공자는 천재지변, 전쟁, 기간통신사업자의 서비스 중단, 해킹, 컴퓨터 바이러스 등 
                불가항력적인 사유로 인한 서비스 중단이나 서비스 이용의 장애에 대해 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. 준거법 및 관할</h2>
              <p>
                본 약관은 대한민국 법을 준거법으로 하며, 서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 
                대한민국 서울중앙지방법원을 전속관할로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. 약관의 변경</h2>
              <p>
                서비스 제공자는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 
                공시함으로써 효력이 발생합니다.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center text-blue-200">
            <p>최종 수정일: 2025년 4월 8일</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 