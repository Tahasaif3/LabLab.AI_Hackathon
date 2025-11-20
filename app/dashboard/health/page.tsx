'use client'

import { motion } from 'framer-motion'
import { Calendar, Download, Settings } from 'lucide-react'
import { useState } from 'react'
import HealthChart from '@/components/HealthChart'

export default function HealthMonitoringPage() {
  const [timeRange, setTimeRange] = useState('week')

  const chartData = {
    week: [
      { day: 'Mon', hr: 68, bp: 120, temp: 37.1 },
      { day: 'Tue', hr: 70, bp: 118, temp: 37.0 },
      { day: 'Wed', hr: 65, bp: 119, temp: 37.2 },
      { day: 'Thu', hr: 72, bp: 121, temp: 37.1 },
      { day: 'Fri', hr: 75, bp: 122, temp: 37.3 },
      { day: 'Sat', hr: 71, bp: 120, temp: 37.0 },
      { day: 'Sun', hr: 72, bp: 119, temp: 37.2 },
    ],
    month: [
      { day: 'Week 1', hr: 70, bp: 120, temp: 37.1 },
      { day: 'Week 2', hr: 72, bp: 119, temp: 37.0 },
      { day: 'Week 3', hr: 68, bp: 121, temp: 37.2 },
      { day: 'Week 4', hr: 71, bp: 120, temp: 37.1 },
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
          <h1 className="text-3xl font-bold mb-2">Health Monitoring</h1>
          <p className="text-text-secondary">Detailed tracking of your vital signs</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary">
            <Download className="w-5 h-5" />
            Export
          </button>
          <button className="btn-secondary">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        {['day', 'week', 'month'].map((range) => (
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
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        <div className="card">
          <h2 className="text-lg font-bold mb-6">Heart Rate Monitoring</h2>
          <HealthChart
            data={chartData[timeRange as keyof typeof chartData].map(d => ({ 
              day: d.day, 
              value: d.hr 
            }))}
            color="#4F46E5"
          />
          <div className="mt-4 pt-4 border-t border-border text-sm text-text-secondary">
            <p>Average: <span className="font-semibold text-text-primary">71 BPM</span></p>
            <p>Range: <span className="font-semibold text-text-primary">65-75 BPM</span></p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold mb-6">Blood Pressure Monitoring</h2>
          <HealthChart
            data={chartData[timeRange as keyof typeof chartData].map(d => ({ 
              day: d.day, 
              value: d.bp 
            }))}
            color="#10B981"
          />
          <div className="mt-4 pt-4 border-t border-border text-sm text-text-secondary">
            <p>Average: <span className="font-semibold text-text-primary">120/80 mmHg</span></p>
            <p>Status: <span className="font-semibold text-secondary">Healthy</span></p>
          </div>
        </div>
      </motion.div>

      {/* Detailed Vitals Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-lg font-bold mb-6">Detailed Vitals Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">Heart Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">Blood Pressure</th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">Temperature</th>
                <th className="text-left py-3 px-4 font-semibold text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { date: 'Today', hr: '72 BPM', bp: '120/80 mmHg', temp: '37.2°C', status: 'Normal' },
                { date: 'Yesterday', hr: '70 BPM', bp: '118/79 mmHg', temp: '37.0°C', status: 'Normal' },
                { date: 'Dec 18', hr: '65 BPM', bp: '119/81 mmHg', temp: '37.2°C', status: 'Normal' },
                { date: 'Dec 17', hr: '75 BPM', bp: '121/80 mmHg', temp: '37.1°C', status: 'Normal' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-alt transition">
                  <td className="py-3 px-4 text-text-primary font-semibold">{row.date}</td>
                  <td className="py-3 px-4 text-text-secondary">{row.hr}</td>
                  <td className="py-3 px-4 text-text-secondary">{row.bp}</td>
                  <td className="py-3 px-4 text-text-secondary">{row.temp}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
