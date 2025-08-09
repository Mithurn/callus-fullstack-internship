'use client';

import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { ServiceIcons } from '@/components/ServiceIcons';

const services = [
  {
    id: 'waste',
    name: '폐기물',
    icon: ServiceIcons.waste,
    color: 'bg-red-500',
    description: '폐기물 처리 서비스'
  },
  {
    id: 'demolition',
    name: '철거',
    icon: ServiceIcons.demolition,
    color: 'bg-yellow-500',
    description: '건물 철거 서비스'
  },
  {
    id: 'wallpaper',
    name: '도배·장판',
    icon: ServiceIcons.wallpaper,
    color: 'bg-teal-500',
    description: '도배 및 장판 서비스'
  },
  {
    id: 'moving',
    name: '이사·입주청소',
    icon: ServiceIcons.moving,
    color: 'bg-blue-500',
    description: '이사 및 입주청소 서비스'
  },
  {
    id: 'pest',
    name: '해충방역',
    icon: ServiceIcons.pest,
    color: 'bg-red-600',
    description: '해충 방역 서비스'
  },
  {
    id: 'ac',
    name: '에어컨 설치·청소',
    icon: ServiceIcons.ac,
    color: 'bg-cyan-500',
    description: '에어컨 설치 및 청소'
  },
  {
    id: 'storage',
    name: '수납정리',
    icon: ServiceIcons.storage,
    color: 'bg-amber-500',
    description: '수납 정리 서비스'
  },
  {
    id: 'drain',
    name: '하수구막힘',
    icon: ServiceIcons.drain,
    color: 'bg-purple-500',
    description: '하수구 막힘 해결'
  },
  {
    id: 'stroller',
    name: '유모차세탁',
    icon: ServiceIcons.stroller,
    color: 'bg-pink-500',
    description: '유모차 세탁 서비스'
  }
];

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleServiceClick = (serviceId: string) => {
    // Navigate to the service request form
    router.push(`/services/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-blue-600 text-xl font-semibold">모두의 관리</h1>
          <button className="text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {user?.name}님, 환영합니다!
          </h2>
          <p className="text-gray-600">
            견적을 희망하는 서비스를 선택해주세요
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white`}>
                {service.icon}
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{service.name}</h3>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </div>
            <span className="text-gray-900 font-medium">
              인터넷·TV·정수기 가입문의
            </span>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/quotations"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">받은 견적</h3>
                <p className="text-sm text-gray-600">최근 견적 확인</p>
              </div>
            </div>
          </Link>

          <Link
            href="/consultations"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">상담내역</h3>
                <p className="text-sm text-gray-600">상담 기록 확인</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
