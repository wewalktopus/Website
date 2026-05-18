'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color?: 'orange' | 'blue' | 'green' | 'purple' | 'red';
  trend?: { value: number; label: string };
  subtitle?: string;
}

const colorMap = {
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function StatsCard({ title, value, icon: Icon, color = 'orange', trend, subtitle }: StatsCardProps) {
  const colorClass = colorMap[color];

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <div className={`p-2 rounded-lg border ${colorClass}`}>
          <Icon size={18} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend.value >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend.value >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{Math.abs(trend.value)}% {trend.label}</span>
        </div>
      )}
    </div>
  );
}
