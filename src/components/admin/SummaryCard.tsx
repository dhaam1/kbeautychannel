'use client';

interface SummaryCardProps {
  title: string;
  value: number;
  color: 'gray' | 'orange' | 'green' | 'blue';
  onClick?: () => void;
}

const colorClasses = {
  gray: 'bg-gray-100 border-gray-300 text-gray-900',
  orange: 'bg-orange-100 border-orange-300 text-orange-900',
  green: 'bg-green-100 border-green-300 text-green-900',
  blue: 'bg-blue-100 border-blue-300 text-blue-900',
};

export function SummaryCard({ title, value, color, onClick }: SummaryCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg shadow-md p-6 border-2 transition-all
        ${colorClasses[color]}
        ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
      </div>
    </div>
  );
}
