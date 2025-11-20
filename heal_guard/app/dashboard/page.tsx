'use client'

import { motion } from 'framer-motion'
import { Heart, Zap, AlertCircle, TrendingUp } from 'lucide-react'
import StatCard from '@/components/StatCard'
import VitalsCard from '@/components/VitalsCard'
import HealthChart from '@/components/HealthChart'
import PredictionCard from '@/components/PredictionCard'
import AlertsWidget from '@/components/AlertsWidget'

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Health Dashboard</h1>
        <p className="text-text-secondary">Monitor your vitals and get AI-powered health insights</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={Heart}
          label="Heart Rate"
          value="72"
          unit="BPM"
          status="normal"
          trend="+2 from yesterday"
        />
        <StatCard
          icon={Zap}
          label="Blood Pressure"
          value="120/80"
          unit="mmHg"
          status="normal"
          trend="Healthy range"
        />
        <StatCard
          icon={TrendingUp}
          label="Oxygen Level"
          value="98"
          unit="%"
          status="excellent"
          trend="Optimal"
        />
        <StatCard
          icon={AlertCircle}
          label="Sleep Quality"
          value="7.5"
          unit="hours"
          status="good"
          trend="Last night"
        />
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vitals Overview */}
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Today's Vitals</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <VitalsCard
                label="Heart Rate"
                value="72 BPM"
                icon={Heart}
                color="text-danger"
              />
              <VitalsCard
                label="Temperature"
                value="37.2°C"
                icon={Zap}
                color="text-accent"
              />
              <VitalsCard
                label="Steps"
                value="8,234"
                icon={TrendingUp}
                color="text-primary"
              />
            </div>
          </div>

          {/* Heart Rate Chart */}
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Heart Rate Trend (Last 7 Days)</h2>
            <HealthChart
              data={[
                { day: 'Mon', value: 68 },
                { day: 'Tue', value: 70 },
                { day: 'Wed', value: 65 },
                { day: 'Thu', value: 72 },
                { day: 'Fri', value: 75 },
                { day: 'Sat', value: 71 },
                { day: 'Sun', value: 72 },
              ]}
              color="#4F46E5"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Health Alerts */}
          <AlertsWidget />

          {/* Disease Prediction */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Health Prediction</h2>
            <div className="space-y-3">
              <PredictionCard
                condition="Hypertension Risk"
                probability="15%"
                status="low"
              />
              <PredictionCard
                condition="Diabetes Risk"
                probability="8%"
                status="low"
              />
              <PredictionCard
                condition="Sleep Disorder"
                probability="25%"
                status="medium"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Health Goals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-xl font-bold mb-6">Health Goals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { goal: 'Daily Steps', current: 8234, target: 10000, color: 'bg-primary' },
            { goal: 'Water Intake', current: 6, target: 8, color: 'bg-secondary' },
            { goal: 'Exercise', current: 30, target: 60, color: 'bg-accent' },
            { goal: 'Sleep Hours', current: 7.5, target: 8, color: 'bg-danger' },
          ].map((item) => (
            <div key={item.goal} className="p-4 rounded-lg bg-surface-alt border border-border">
              <p className="text-sm font-semibold text-text-secondary mb-3">{item.goal}</p>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-2xl font-bold text-text-primary">{item.current}</span>
                <span className="text-sm text-text-tertiary">/ {item.target}</span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.current / item.target) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
