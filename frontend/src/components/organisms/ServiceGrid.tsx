import React from 'react';
import { ServiceCard } from '../molecules/ServiceCard';
import { ServiceIcons } from '../ServiceIcons';

interface ServiceGridProps {
  onServiceSelect: (serviceId: string) => void;
}

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

export const ServiceGrid: React.FC<ServiceGridProps> = ({ onServiceSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          name={service.name}
          description={service.description}
          icon={service.icon}
          color={service.color}
          onClick={onServiceSelect}
        />
      ))}
    </div>
  );
}; 