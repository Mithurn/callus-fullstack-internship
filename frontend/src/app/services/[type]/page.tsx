'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const serviceForms = {
  demolition: {
    title: '철거 요청',
    fields: [
      {
        name: 'type',
        label: '철거 종류',
        required: true,
        options: [
          { value: 'internal', label: '내부 철거 (인테리어 철거)' },
          { value: 'building', label: '건물/야외 구조물 철거' },
          { value: 'restoration', label: '원상복구' }
        ]
      },
      {
        name: 'area',
        label: '면적',
        required: true,
        options: [
          { value: 'under10', label: '10평 미만' },
          { value: '10-20', label: '10평대' },
          { value: '20-30', label: '20평대' },
          { value: '30-40', label: '30평대' },
          { value: '40-50', label: '40평대' },
          { value: 'over50', label: '50평대 이상' }
        ]
      },
      {
        name: 'floor',
        label: '층수',
        required: true,
        options: [
          { value: 'basement', label: '지층' },
          { value: 'first', label: '1층' },
          { value: 'second-plus', label: '2층 이상' }
        ]
      },
      {
        name: 'duplex',
        label: '복층 여부',
        required: true,
        options: [
          { value: 'yes', label: '있음' },
          { value: 'no', label: '없음' }
        ]
      },
      {
        name: 'elevator',
        label: '엘리베이터',
        required: true,
        options: [
          { value: 'yes', label: '있음' },
          { value: 'no', label: '없음' }
        ]
      }
    ]
  },
  waste: {
    title: '폐기물 처리 요청',
    fields: [
      {
        name: 'type',
        label: '폐기물 종류',
        required: true,
        options: [
          { value: 'household', label: '생활폐기물 (폐가전, 폐가구류)' },
          { value: 'business', label: '사업장폐기물(폐수지, 폐목재류)' },
          { value: 'construction', label: '건축폐기물 (인테리어, 공사폐기물)' }
        ]
      },
      {
        name: 'amount',
        label: '폐기물의 양',
        required: true,
        options: [
          { value: 'small', label: '소량' },
          { value: '2.5ton', label: '2.5톤' },
          { value: '1ton', label: '1톤' },
          { value: '5ton', label: '5톤' }
        ]
      },
      {
        name: 'floor',
        label: '층수',
        required: true,
        options: [
          { value: 'basement', label: '지층' },
          { value: 'second-plus', label: '2층 이상' },
          { value: 'first', label: '1층' }
        ]
      },
      {
        name: 'elevator',
        label: '엘리베이터',
        required: true,
        options: [
          { value: 'yes', label: '있음' },
          { value: 'no', label: '없음' }
        ]
      },
      {
        name: 'parking',
        label: '주차',
        required: true,
        options: [
          { value: 'possible', label: '가능' },
          { value: 'impossible', label: '불가능' }
        ]
      }
    ]
  },
  wallpaper: {
    title: '도배·장판 요청',
    fields: [
      {
        name: 'type',
        label: '서비스 종류',
        required: true,
        options: [
          { value: 'wallpaper', label: '도배' },
          { value: 'flooring', label: '장판' },
          { value: 'both', label: '도배 + 장판' }
        ]
      },
      {
        name: 'area',
        label: '면적',
        required: true,
        options: [
          { value: 'under10', label: '10평 미만' },
          { value: '10-20', label: '10평대' },
          { value: '20-30', label: '20평대' },
          { value: '30-40', label: '30평대' },
          { value: '40-50', label: '40평대' },
          { value: 'over50', label: '50평대 이상' }
        ]
      },
      {
        name: 'floor',
        label: '층수',
        required: true,
        options: [
          { value: 'basement', label: '지층' },
          { value: 'first', label: '1층' },
          { value: 'second-plus', label: '2층 이상' }
        ]
      }
    ]
  },
  moving: {
    title: '이사·입주청소 요청',
    fields: [
      {
        name: 'type',
        label: '서비스 종류',
        required: true,
        options: [
          { value: 'moving', label: '이사' },
          { value: 'cleaning', label: '입주청소' },
          { value: 'both', label: '이사 + 입주청소' }
        ]
      },
      {
        name: 'area',
        label: '면적',
        required: true,
        options: [
          { value: 'under10', label: '10평 미만' },
          { value: '10-20', label: '10평대' },
          { value: '20-30', label: '20평대' },
          { value: '30-40', label: '30평대' },
          { value: '40-50', label: '40평대' },
          { value: 'over50', label: '50평대 이상' }
        ]
      },
      {
        name: 'floor',
        label: '층수',
        required: true,
        options: [
          { value: 'basement', label: '지층' },
          { value: 'first', label: '1층' },
          { value: 'second-plus', label: '2층 이상' }
        ]
      }
    ]
  },
  pest: {
    title: '해충방역 요청',
    fields: [
      {
        name: 'type',
        label: '해충 종류',
        required: true,
        options: [
          { value: 'cockroach', label: '바퀴벌레' },
          { value: 'termite', label: '흰개미' },
          { value: 'bedbug', label: '빈대' },
          { value: 'other', label: '기타' }
        ]
      },
      {
        name: 'area',
        label: '면적',
        required: true,
        options: [
          { value: 'under10', label: '10평 미만' },
          { value: '10-20', label: '10평대' },
          { value: '20-30', label: '20평대' },
          { value: '30-40', label: '30평대' },
          { value: '40-50', label: '40평대' },
          { value: 'over50', label: '50평대 이상' }
        ]
      }
    ]
  },
  ac: {
    title: '에어컨 설치·청소 요청',
    fields: [
      {
        name: 'type',
        label: '서비스 종류',
        required: true,
        options: [
          { value: 'installation', label: '설치' },
          { value: 'cleaning', label: '청소' },
          { value: 'both', label: '설치 + 청소' }
        ]
      },
      {
        name: 'count',
        label: '에어컨 대수',
        required: true,
        options: [
          { value: '1', label: '1대' },
          { value: '2', label: '2대' },
          { value: '3', label: '3대' },
          { value: '4+', label: '4대 이상' }
        ]
      }
    ]
  }
};

const formSchema = z.object({
  type: z.string().min(1, '필수 항목입니다'),
  area: z.string().optional(),
  floor: z.string().optional(),
  duplex: z.string().optional(),
  elevator: z.string().optional(),
  parking: z.string().optional(),
  amount: z.string().optional(),
  count: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ServiceRequestPage() {
  const params = useParams();
  const router = useRouter();
  const serviceType = params.type as string;
  const serviceConfig = serviceForms[serviceType as keyof typeof serviceForms];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Service request data:', data);
    // Here you would typically send the data to your backend
    alert('서비스 요청이 제출되었습니다.');
    router.push('/');
  };

  if (!serviceConfig) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">서비스를 찾을 수 없습니다</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </button>
          <h1 className="text-blue-600">{serviceConfig.title}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {serviceConfig.fields.map((field) => (
            <div key={field.name} className="space-y-4">
              <label className="block text-gray-900 font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                {field.options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedOptions(prev => ({
                      ...prev,
                      [field.name]: option.value
                    }))}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      selectedOptions[field.name] === option.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {errors[field.name as keyof FormData] && (
                <p className="text-sm text-red-600">
                  {errors[field.name as keyof FormData]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              요청 제출
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 