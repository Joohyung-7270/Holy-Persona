'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import emailjs from '@emailjs/browser';
import Toast from '@/components/Toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    isVisible: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    isVisible: false,
    type: 'success',
    message: ''
  });
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({
      isVisible: true,
      type,
      message
    });
  };

  const closeToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration with provided keys
      const result = await emailjs.sendForm(
        'service_moc236o', // Service ID
        'template_6xz4ul8', // Template ID
        formRef.current as HTMLFormElement,
        'EWeoXe3P1NdzEt2hR' // Public Key
      );

      if (result.text === 'OK') {
        showToast('success', '메시지가 성공적으로 전송되었습니다. 24시간 이내에 답변 드리겠습니다.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      showToast('error', '메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white">
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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 text-yellow-300">문의하기</h1>
            <p className="text-blue-100">
              Holy Persona 팀에게 문의사항이나 피드백을 보내주세요. 24시간 이내에 답변 드리겠습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-blue-400/20"
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-400/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="이름을 입력해주세요"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-400/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="이메일을 입력해주세요"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-blue-100 mb-1">
                    제목
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-400/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="문의 제목을 입력해주세요"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-1">
                    메시지
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-blue-400/30 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="문의하실 내용을 자세히 적어주세요"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '전송 중...' : '보내기'}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-blue-400/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <EnvelopeIcon className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">이메일</h3>
                    <p className="text-blue-100">feelbetter.startup@gmail.com</p>
                    <p className="text-sm text-blue-200 mt-1">
                      24시간 이내 답변 드립니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-blue-400/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <PhoneIcon className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">전화</h3>
                    <p className="text-blue-100">010-5126-7270</p>
                    <p className="text-sm text-blue-200 mt-1">
                      평일 오후 19시 - 오후 22시
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-blue-400/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/20">
                    <MapPinIcon className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">주소</h3>
                    <p className="text-blue-100">
                      서울특별시 관악구 관악로37길 17<br />
                      한소망교회 1F
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </main>
  );
} 