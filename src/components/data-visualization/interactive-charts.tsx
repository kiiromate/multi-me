"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import { useTheme } from "../theme-provider"

// Sample data for demonstrations
const sampleBarData = [
  { name: 'Jan', value: 400, category: 'A' },
  { name: 'Feb', value: 300, category: 'B' },
  { name: 'Mar', value: 600, category: 'A' },
  { name: 'Apr', value: 800, category: 'B' },
  { name: 'May', value: 500, category: 'A' },
]

const sampleLineData = [
  { name: 'Week 1', users: 400, sessions: 240 },
  { name: 'Week 2', users: 300, sessions: 139 },
  { name: 'Week 3', users: 600, sessions: 980 },
  { name: 'Week 4', users: 800, sessions: 390 },
]

const samplePieData = [
  { name: 'Desktop', value: 45, color: '#EBA937' },
  { name: 'Mobile', value: 35, color: '#6B7280' },
  { name: 'Tablet', value: 20, color: '#111827' },
]

// Custom tooltip component
function CustomTooltip({ active, payload, label, theme }: any) {
  if (active && payload && payload.length) {
    return (
      <div className={`
        p-3 rounded-lg border shadow-lg backdrop-blur-md
        ${theme === 'dark' 
          ? 'bg-bg-primary/90 border-text-secondary/20 text-text-primary' 
          : 'bg-white/90 border-gray-200 text-gray-900'
        }
      `}>
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Interactive Bar Chart
export function InteractiveBarChart({ data = sampleBarData }: { data?: any[] }) {
  const { theme } = useTheme()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleMouseEnter = (index: number) => setActiveIndex(index)
  const handleMouseLeave = () => setActiveIndex(null)

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} 
          />
          <XAxis 
            dataKey="name" 
            stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            fontSize={12}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip theme={theme} />} />
          <Bar 
            dataKey="value"
            fill="#EBA937"
            onMouseEnter={(_, index) => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={activeIndex === index ? "#EBA937" : "#EBA937"}
                fillOpacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                style={{ transition: 'fill-opacity 0.3s ease' }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Interactive Line Chart
export function InteractiveLineChart({ data = sampleLineData }: { data?: any[] }) {
  const { theme } = useTheme()
  const [activeDataKey, setActiveDataKey] = useState<string | null>(null)

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} 
          />
          <XAxis 
            dataKey="name" 
            stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            fontSize={12}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip theme={theme} />} />
          <Legend 
            onMouseEnter={(e) => setActiveDataKey(e.dataKey)}
            onMouseLeave={() => setActiveDataKey(null)}
          />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#EBA937" 
            strokeWidth={2}
            strokeOpacity={activeDataKey === null || activeDataKey === 'users' ? 1 : 0.3}
            animationDuration={1200}
            animationEasing="ease-out"
            dot={{ fill: '#EBA937', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#EBA937', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="sessions" 
            stroke="#6B7280" 
            strokeWidth={2}
            strokeOpacity={activeDataKey === null || activeDataKey === 'sessions' ? 1 : 0.3}
            animationDuration={1200}
            animationEasing="ease-out"
            dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#6B7280', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Interactive Pie Chart
export function InteractivePieChart({ data = samplePieData }: { data?: any[] }) {
  const { theme } = useTheme()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleMouseEnter = (index: number) => setActiveIndex(index)
  const handleMouseLeave = () => setActiveIndex(null)

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={40}
            paddingAngle={2}
            dataKey="value"
            animationDuration={1200}
            animationEasing="ease-out"
            onMouseEnter={(_, index) => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                fillOpacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                style={{ 
                  transition: 'fill-opacity 0.3s ease',
                  filter: activeIndex === index ? 'brightness(1.1)' : 'none'
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip theme={theme} />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// Chart wrapper with export functionality
interface ChartWrapperProps {
  title: string
  children: React.ReactNode
  onExport?: () => void
}

export function ChartWrapper({ title, children, onExport }: ChartWrapperProps) {
  return (
    <div className="bg-bg-primary/60 backdrop-blur-md border border-text-secondary/10 rounded-xl p-6 my-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-inter font-semibold text-xl text-text-primary">{title}</h3>
        {onExport && (
          <button
            onClick={onExport}
            className="text-sm text-accent-honey hover:text-accent-honey/80 transition-colors duration-200"
          >
            Export
          </button>
        )}
      </div>
      {children}
    </div>
  )
}