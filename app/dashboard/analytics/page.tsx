'use client'

import { motion } from 'framer-motion'
import { Download, Filter, TrendingUp, Heart, Calendar } from 'lucide-react'
import { useState } from 'react'
import AnalyticsChart from '@/components/AnalyticsChart'
import RiskScore from '@/components/RiskScore'
import HealthInsights from '@/components/HealthInsights'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('month')

  const healthData = {
    week: [
      { date: 'Mon', hr: 68, steps: 8200, sleep: 7.2 },
      { date: 'Tue', hr: 70, steps: 9100, sleep: 7.5 },
      { date: 'Wed', hr: 65, steps: 7800, sleep: 6.8 },
      { date: 'Thu', hr: 72, steps: 10200, sleep: 7.8 },
      { date: 'Fri', hr: 75, steps: 12100, sleep: 8.1 },
      { date: 'Sat', hr: 71, steps: 14300, sleep: 8.2 },
      { date: 'Sun', hr: 72, steps: 11400, sleep: 7.9 },
    ],
    month: [
      { date: 'Week 1', hr: 70, steps: 65200, sleep: 7.3 },
      { date: 'Week 2', hr: 72, steps: 71400, sleep: 7.6 },
      { date: 'Week 3', hr: 68, steps: 68900, sleep: 7.1 },
      { date: 'Week 4', hr: 71, steps: 82100, sleep: 7.8 },
    ],
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Health Analytics</h1>
          <p className="text-text-secondary">Comprehensive insights into your health trends</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-surface-alt text-text-secondary hover:bg-border'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        <button className="btn-secondary flex items-center gap-2 ml-auto">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </motion.div>

      {/* Main Analytics Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        {/* Risk Assessment */}
        <RiskScore />

        {/* Key Metrics */}
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-bold mb-6">Health Metrics Overview</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Avg Heart Rate', value: '70 BPM', change: '-2 from last month', trend: 'down' },
              { label: 'Avg Sleep', value: '7.6 hrs', change: '+0.5 hrs improvement', trend: 'up' },
              { label: 'Steps/Day', value: '9,850', change: '+1,200 steps', trend: 'up' },
            ].map((metric, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-surface-alt border border-border">
                <p className="text-sm text-text-secondary mb-2">{metric.label}</p>
                <p className="text-2xl font-bold text-text-primary mb-2">{metric.value}</p>
                <p className={`text-xs ${metric.trend === 'up' ? 'text-secondary' : 'text-accent'}`}>
                  {metric.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        <div className="card">
          <h2 className="text-lg font-bold mb-6">Heart Rate Trends</h2>
          <AnalyticsChart
            data={healthData[timeRange as keyof typeof healthData]}
            dataKey="hr"
            color="#4F46E5"
            name="Heart Rate (BPM)"
          />
        </div>

        <div className="card">
          <h2 className="text-lg font-bold mb-6">Sleep Pattern</h2>
          <AnalyticsChart
            data={healthData[timeRange as keyof typeof healthData]}
            dataKey="sleep"
            color="#10B981"
            name="Sleep (hours)"
          />
        </div>
      </motion.div>

      {/* Detailed Insights */}
      <HealthInsights />

      {/* Activity Distribution */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <h2 className="text-lg font-bold mb-6">Daily Activity Distribution</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { label: 'Walking', value: '45%', color: 'bg-primary' },
            { label: 'Running', value: '20%', color: 'bg-secondary' },
            { label: 'Cycling', value: '25%', color: 'bg-accent' },
            { label: 'Rest', value: '10%', color: 'bg-text-tertiary' },
          ].map((activity, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-text-primary">{activity.label}</span>
                <span className="text-sm font-bold text-text-secondary">{activity.value}</span>
              </div>
              <div className="h-3 bg-border rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${activity.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: activity.value }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
