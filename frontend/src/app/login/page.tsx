'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

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

const registerSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  name: z.string().min(1, '이름을 입력해주세요'),
  role: z.enum(['customer', 'provider']).default('customer'),
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
  });

  const onSubmit = async (data: unknown) => {
    setIsLoading(true);
    setError('');

    try {
      if (isRegistering) {
        const registerData = data as RegisterForm;
        const response = await authAPI.register(registerData.email, registerData.password, registerData.name, registerData.role);
        const { user, access_token } = response.data;
        login(user, access_token);
        router.push('/');
      } else {
        const loginData = data as LoginForm;
        const response = await authAPI.login(loginData.email, loginData.password);
        const { user, access_token } = response.data;
        login(user, access_token);
        router.push('/');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : (isRegistering ? '회원가입에 실패했습니다' : '로그인에 실패했습니다');
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

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <main className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {isRegistering ? '회원가입' : '로그인'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {isRegistering ? '새 계정을 만들어보세요' : '계정에 로그인하세요'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isRegistering && (
              <div className="space-y-3">
                <label className="block text-gray-900 font-medium">이름</label>
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  {...register('name' as any)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {(errors as any).name && (
                  <p className="text-sm text-red-600">{(errors as any).name.message}</p>
                )}
              </div>
            )}

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

            {isRegistering && (
              <div className="space-y-3">
                <label className="block text-gray-900 font-medium">역할</label>
                <select
                  {...register('role' as any)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="customer">고객</option>
                  <option value="provider">사업자</option>
                </select>
              </div>
            )}

            {error && (
              <div className="text-sm text-red-600 text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
            >
              {isLoading ? (isRegistering ? '회원가입 중...' : '로그인 중...') : (isRegistering ? '회원가입' : '로그인')}
            </button>
          </form>

          {!isRegistering && (
            <>
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
            </>
          )}

          <div className="text-center">
            <span className="text-gray-600">
              {isRegistering ? '이미 계정이 있으신가요? ' : '계정이 없으신가요? '}
            </span>
            <button 
              type="button" 
              onClick={toggleMode}
              className="text-blue-600 hover:underline"
            >
              {isRegistering ? '로그인' : '회원가입'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 