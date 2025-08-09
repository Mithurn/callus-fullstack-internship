'use client';

import { useAuthStore } from '@/store/auth.store';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return <div>{children}</div>;
  }

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-around">
          <Link
            href="/"
            className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
              isActive('/') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs">HOME</span>
          </Link>

          <Link
            href="/quotations"
            className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
              isActive('/quotations') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs">받은견적</span>
          </Link>

          <Link
            href="/consultations"
            className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
              isActive('/consultations') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs">상담내역</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
              isActive('/profile') ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs">마이페이지</span>
          </Link>
        </div>
      </nav>

      {/* Spacer for bottom navigation */}
      <div className="h-16"></div>
    </div>
  );
} 