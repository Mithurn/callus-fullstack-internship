import React from 'react';
import { Card } from './Card';
import { Button } from '../atoms/Button';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: (id: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  icon,
  color,
  onClick,
}) => {
  return (
    <Card className="cursor-pointer transition-transform hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onClick(id)}
          className="w-full"
        >
          선택하기
        </Button>
      </div>
    </Card>
  );
}; 