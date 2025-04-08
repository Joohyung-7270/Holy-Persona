'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold mb-8 text-center text-yellow-300">개인정보 처리방침</h1>
          
          <div className="space-y-6 text-blue-100">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">1. 개인정보의 처리 목적</h2>
              <p>
                Holy Persona는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 
                이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>성경 인물 매칭 서비스 제공</li>
                <li>사용자 성격 분석 및 결과 제공</li>
                <li>서비스 개선 및 사용자 경험 향상</li>
                <li>고객 문의 및 불만 처리</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">2. 개인정보의 처리 및 보유기간</h2>
              <p>
                Holy Persona는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 
                개인정보를 처리·보유합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>성경 인물 매칭 서비스: 서비스 이용 종료 시까지</li>
                <li>고객 문의 및 불만 처리: 문의 접수 후 3년</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">3. 처리하는 개인정보 항목</h2>
              <p>
                Holy Persona는 다음의 개인정보 항목을 처리하고 있습니다.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>필수항목: 성격 유형 분석을 위한 응답 데이터</li>
                <li>선택항목: 이메일 주소, 이름</li>
                <li>자동수집항목: IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">4. 개인정보의 파기절차 및 방법</h2>
              <p>
                Holy Persona는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. 
                정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 
                하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">5. 정보주체의 권리·의무 및 행사방법</h2>
              <p>
                정보주체는 Holy Persona에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리정지 요구</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">6. 개인정보의 안전성 확보조치</h2>
              <p>
                Holy Persona는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
              </p>
              <ul className="list-disc list-inside mt-2 ml-4">
                <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육</li>
                <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화</li>
                <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">7. 개인정보 보호책임자</h2>
              <p>
                Holy Persona는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 처리하기 위하여 
                아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="mt-2 ml-4">
                <p>▶ 개인정보 보호책임자</p>
                <p>- 성명: 임주형</p>
                <p>- 직책: 대표</p>
                <p>- 연락처: 010-5126-7270</p>
                <p>- 이메일: feelbetter.startup@gmail.com</p>
              </div>
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