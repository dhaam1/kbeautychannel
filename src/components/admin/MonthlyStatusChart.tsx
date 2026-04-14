'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts';
import type { ConsultationStatus } from '@/lib/firebase/types';

interface MonthlyStat {
  year: number;
  month: number;
  label: string;
  total: number;
  statusCounts: Record<ConsultationStatus, number>;
}

interface MonthlyStatusChartProps {
  data: MonthlyStat[];
}

const STATUS_COLORS: Record<ConsultationStatus, string> = {
  상담대기: '#fb923c', // orange-400
  상담완료: '#22c55e', // green-500
  예약완료: '#3b82f6', // blue-500
  부재: '#9ca3af', // gray-400
  결번: '#ef4444', // red-500
  취소: '#64748b', // slate-500
  미내원: '#eab308', // yellow-500
  내원완료: '#10b981', // emerald-500
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold mb-2">{data.label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}건`}
          </p>
        ))}
        <p className="text-sm font-semibold mt-2 border-t pt-2">
          총합: {data.total}건
        </p>
      </div>
    );
  }
  return null;
};

export function MonthlyStatusChart({ data }: MonthlyStatusChartProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        <p>월별 상태 데이터가 없습니다.</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    label: item.label,
    상담대기: item.statusCounts.상담대기,
    상담완료: item.statusCounts.상담완료,
    예약완료: item.statusCounts.예약완료,
    부재: item.statusCounts.부재,
    결번: item.statusCounts.결번,
    취소: item.statusCounts.취소,
    미내원: item.statusCounts.미내원,
    내원완료: item.statusCounts.내원완료,
    total: item.total,
  }));

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">월별 상태값 분포</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="label"
            stroke="#6b7280"
            fontSize={12}
            tick={{ fill: '#6b7280' }}
          />
          <YAxis
            stroke="#6b7280"
            fontSize={12}
            tick={{ fill: '#6b7280' }}
            label={{ value: '리드 수', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="square"
          />
          <Bar
            dataKey="상담대기"
            stackId="a"
            fill={STATUS_COLORS.상담대기}
            name="상담대기"
          />
          <Bar
            dataKey="상담완료"
            stackId="a"
            fill={STATUS_COLORS.상담완료}
            name="상담완료"
          />
          <Bar
            dataKey="예약완료"
            stackId="a"
            fill={STATUS_COLORS.예약완료}
            name="예약완료"
          />
          <Bar
            dataKey="부재"
            stackId="a"
            fill={STATUS_COLORS.부재}
            name="부재"
          />
          <Bar
            dataKey="결번"
            stackId="a"
            fill={STATUS_COLORS.결번}
            name="결번"
          />
          <Bar
            dataKey="취소"
            stackId="a"
            fill={STATUS_COLORS.취소}
            name="취소"
          />
          <Bar
            dataKey="미내원"
            stackId="a"
            fill={STATUS_COLORS.미내원}
            name="미내원"
          />
          <Bar
            dataKey="내원완료"
            stackId="a"
            fill={STATUS_COLORS.내원완료}
            name="내원완료"
          >
            <LabelList
              dataKey="total"
              position="top"
              content={({ x, y, width, value }: any) => {
                if (!value || value === 0) return null;
                return (
                  <text
                    x={x + width / 2}
                    y={y - 5}
                    fill="#374151"
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                  >
                    {value}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
