'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

interface DailyStats {
  day: number;
  상담대기: number;
  상담완료: number;
  예약완료: number;
  부재: number;
  결번: number;
  취소: number;
  미내원: number;
  내원완료: number;
  total: number;
}

interface DailyLeadChartProps {
  data: DailyStats[];
  year: number;
  month: number;
}

const COLORS = {
  상담대기: '#fb923c', // orange-400
  상담완료: '#22c55e', // green-500
  예약완료: '#3b82f6', // blue-500
  부재: '#9ca3af', // gray-400
  결번: '#ef4444', // red-500
  취소: '#64748b', // slate-500
  미내원: '#eab308', // yellow-500
  내원완료: '#10b981', // emerald-500
};

export function DailyLeadChart({ data, year, month }: DailyLeadChartProps) {
  const chartData = data.map((item) => ({
    day: `${item.day}일`,
    '상담대기': item.상담대기,
    '상담완료': item.상담완료,
    '예약완료': item.예약완료,
    '부재': item.부재,
    '결번': item.결번,
    '취소': item.취소,
    '미내원': item.미내원,
    '내원완료': item.내원완료,
    total: item.total,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{payload[0].payload.day}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}건`}
            </p>
          ))}
          <p className="text-sm font-semibold mt-2 border-t pt-2">
            총합: {payload[0].payload.total}건
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ x, y, value }: any) => {
    if (value === 0) return null;
    return (
      <text
        x={x}
        y={y - 5}
        fill="#374151"
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">일자별 상태 분포</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="day"
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
            formatter={(value) => {
              const colorMap: Record<string, string> = {
                '상담대기': '상담대기',
                '상담완료': '상담완료',
                '예약완료': '예약완료',
                '부재': '부재',
                '결번': '결번',
                '취소': '취소',
                '미내원': '미내원',
                '내원완료': '내원완료',
              };
              return colorMap[value] || value;
            }}
          />
          <Bar dataKey="상담대기" stackId="a" fill={COLORS.상담대기} name="상담대기" />
          <Bar dataKey="상담완료" stackId="a" fill={COLORS.상담완료} name="상담완료" />
          <Bar dataKey="예약완료" stackId="a" fill={COLORS.예약완료} name="예약완료" />
          <Bar dataKey="부재" stackId="a" fill={COLORS.부재} name="부재" />
          <Bar dataKey="결번" stackId="a" fill={COLORS.결번} name="결번" />
          <Bar dataKey="취소" stackId="a" fill={COLORS.취소} name="취소" />
          <Bar dataKey="미내원" stackId="a" fill={COLORS.미내원} name="미내원" />
          <Bar dataKey="내원완료" stackId="a" fill={COLORS.내원완료} name="내원완료">
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
