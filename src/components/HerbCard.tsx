
import React from 'react';
import { cn } from '@/lib/utils';

interface HerbCardProps {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

const HerbCard: React.FC<HerbCardProps> = ({ id, name, color, isActive, onClick }) => {
  return (
    <div
      className={cn(
        "herb-card relative flex flex-col items-center justify-center p-5 rounded-xl cursor-pointer min-w-[120px]",
        "bg-white herb-card-shadow transition-all duration-300",
        isActive ? "active ring-2 ring-accent/50 scale-105" : "hover:bg-gray-50/80 hover:scale-102"
      )}
      style={{ 
        borderTop: `4px solid ${color}`
      }}
      onClick={onClick}
    >
      <div 
        className="herb-color-dot w-12 h-12 rounded-full mb-3 animate-pulse-soft" 
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-medium text-gray-800 mt-1">{name}</span>
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-accent/5 animate-fade-in" />
      )}
    </div>
  );
};

export default HerbCard;
