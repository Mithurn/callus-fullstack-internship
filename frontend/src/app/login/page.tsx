'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/auth.store';
import { authAPI } from '@/lib/api';

const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.login(data.email, data.password);
      const { user, access_token } = response.data;
      
      login(user, access_token);
      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestLogin = async (role: 'customer' | 'provider') => {
    setIsLoading(true);
    setError('');

    try {
      const testEmail = role === 'customer' ? 'customer@test.com' : 'provider@test.com';
      const response = await authAPI.login(testEmail, 'password123');
      const { user, access_token } = response.data;
      
      login(user, access_token);
      router.push('/');
    } catch {
      setError('테스트 로그인에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
          <h1 className="text-blue-600">← 로그인</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-blue-600 text-2xl font-bold mb-2">모두의 관리</h2>
          <p className="text-gray-600">계정에 로그인하세요</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3">
            <label className="block text-gray-900 font-medium">이메일</label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              {...register('email')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-gray-900 font-medium">비밀번호</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                {...register('password')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">로그인 상태 유지</span>
            </label>
            <button type="button" className="text-sm text-blue-600 hover:underline">비밀번호 찾기</button>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* Test Login Section */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600 text-center mb-4">테스트 로그인</p>
          <div className="space-y-3">
            <button
              onClick={() => handleTestLogin('customer')}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-medium"
            >
              고객으로 로그인
            </button>
            <button
              onClick={() => handleTestLogin('provider')}
              disabled={isLoading}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 font-medium"
            >
              사업자로 로그인
            </button>
          </div>
        </div>

        {/* Social Login Section */}
        <div className="space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">또는</span>
            </div>
          </div>
          <button type="button" className="w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
            카카오로 로그인
          </button>
          <button type="button" className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium">
            네이버로 로그인
          </button>
        </div>

        <div className="text-center">
          <span className="text-gray-600">계정이 없으신가요? </span>
          <button type="button" className="text-blue-600 hover:underline">회원가입</button>
        </div>
      </main>
    </div>
  );
} 