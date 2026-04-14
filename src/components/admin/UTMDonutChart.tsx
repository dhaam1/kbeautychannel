'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface UTMStat {
  utm: string;
  count: number;
  percentage: number;
  [key: string]: string | number;
}

interface UTMDonutChartProps {
  data: UTMStat[];
}

// 차트에 사용할 색상 팔레트
const CHART_COLORS = [
  '#22c55e', // green-500
  '#3b82f6', // blue-500
  '#fbbf24', // yellow-500
  '#06b6d4', // cyan-500
  '#ec4899', // pink-500
  '#a855f7', // purple-500
  '#f97316', // orange-500
  '#84cc16', // lime-500
  '#14b8a6', // teal-500
  '#6366f1', // indigo-500
];

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  utm,
  count,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // 작은 조각은 라벨을 표시하지 않음
  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold mb-2">{data.utm}</p>
        <p className="text-sm text-gray-700">
          {data.count}건 ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};


export function UTMDonutChart({ data }: UTMDonutChartProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        <p>UTM 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">UTM 소스/매체별 분포</h3>
      <div className="flex items-center justify-center gap-10">
        <div className="w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="count"
                nameKey="utm"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-3">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              <span className="text-sm text-gray-700 whitespace-nowrap">
                {entry.utm} ({entry.count}건, {entry.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
