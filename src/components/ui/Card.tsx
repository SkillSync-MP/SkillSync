// Reusable card component with glassmorphism effect
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  gradient = false 
}) => {
  return (
    <div
      className={cn(
        'backdrop-blur-lg border border-white/20 rounded-xl shadow-xl',
        gradient 
          ? 'bg-gradient-to-br from-white/30 to-white/10' 
          : 'bg-white/20',
        hover && 'transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-white/30',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;