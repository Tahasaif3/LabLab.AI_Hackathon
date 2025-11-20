'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AnalyticsChartProps {
  data: any[]
  dataKey: string
  color: string
  name: string
  type?: 'line' | 'bar'
}

export default function AnalyticsChart({
  data,
  dataKey,
  color,
  name,
  type = 'line',
}: AnalyticsChartProps) {
  const ChartComponent = type === 'line' ? LineChart : BarChart

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ChartComponent data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis dataKey="date" stroke="var(--color-text-tertiary)" />
        <YAxis stroke="var(--color-text-tertiary)" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }}
          labelStyle={{ color: 'var(--color-text-primary)' }}
        />
        {type === 'line' ? (
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={{ fill: color, r: 5 }}
            activeDot={{ r: 7 }}
          />
        ) : (
          <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
        )}
      </ChartComponent>
    </ResponsiveContainer>
  )
}
