'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface MonthlyStat {
  year: number;
  month: number;
  label: string;
  total: number;
}

interface MonthlyLeadChartProps {
  data: MonthlyStat[];
}

// 월별 총 리드수 차트 색상 (통일된 색상 사용)
const MONTHLY_COLOR = '#047e74'; // 메인 브랜드 컬러

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold mb-2">{data.label}</p>
        <p className="text-sm text-gray-700">
          총 리드수: <span className="font-semibold">{data.total}건</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLabelList = (props: any) => {
  const { x, y, value } = props;
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

export function MonthlyLeadChart({ data }: MonthlyLeadChartProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        <p>월별 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">월별 총 리드수</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
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
            content={() => (
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {data.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: MONTHLY_COLOR }}
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          />
          <Bar dataKey="total" name="총 리드수" fill={MONTHLY_COLOR}>
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
