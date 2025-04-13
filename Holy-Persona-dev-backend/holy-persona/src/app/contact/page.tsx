'use client';

import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // EmailJS configuration with provided keys
      const result = await emailjs.sendForm(
        'service_moc236o', // Service ID
        'template_6xz4ul8', // Template ID
        formRef.current as HTMLFormElement,
        'EWeoXe3P1NdzEt2hR' // Public Key
      );

      if (result.text === 'OK') {
        setSubmitStatus({
          type: 'success',
          message: '메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus({
        type: 'error',
        message: '메시지 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-white/80 hover:text-yellow-400 transition-colors mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span>메인으로 돌아가기</span>
        </Link>

        {/* Contact Form Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
          <h1 className="text-3xl font-bold mb-2 text-yellow-400">문의하기</h1>
          <p className="text-white/60 mb-8">
            궁금하신 점이나 제안사항이 있으시다면 언제든 문의해 주세요.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                제목
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
                placeholder="문의 제목을 입력해주세요"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                메시지
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white resize-none"
                placeholder="문의 내용을 입력해주세요"
              />
            </div>

            {submitStatus.type && (
              <div className={`p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                isSubmitting
                  ? 'bg-yellow-400/50 cursor-not-allowed'
                  : 'bg-yellow-400 hover:bg-yellow-500 transform hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? '전송 중...' : '메시지 보내기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 