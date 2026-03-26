'use client'

import { useState, useMemo } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Wind, 
  CloudRain,
  Gauge,
  Droplets,
  Layers,
  Mountain,
  Plus,
  Maximize2,
  Share2,
  Settings,
  FileText,
  Calendar,
  BarChart2,
  PieChart,
  Activity,
  ClipboardList,
  X,
  Check,
  ChevronDown
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

// 时间范围选项
const timeRangeOptions = [
  { id: '24h', name: '近24小时' },
  { id: 'week', name: '近一周' },
  { id: 'month', name: '近一月' },
  { id: 'year', name: '近一年' },
]

// 设备选项
const deviceOptions = {
  weather: ['默认气象站', '气象站A', '气象站B', '气象站C'],
  air: ['默认空气站', '空气站A', '空气站B'],
  water: ['默认水文站', '水文站A', '水文站B'],
  soil: ['默认土壤站', '土壤站A', '土壤站B'],
  cave: ['默认溶洞站', '溶洞站A', '溶洞站B'],
}

// 分析工具列表
const analysisTools = [
  { id: 'env-stats', name: '环境现状统计', icon: BarChart3 },
  { id: 'env-change', name: '环境变化分析', icon: TrendingUp },
  { id: 'weekly-report', name: '环境监测周报', icon: Calendar },
  { id: 'monthly-report', name: '环境监测月报', icon: FileText },
  { id: 'annual-report', name: '环境监测年报', icon: BarChart2 },
  { id: 'quality-assess', name: '环境质量综合评估报告', icon: ClipboardList },
]

// 生成模拟数据的函数
const generateTemperatureData = (timeRange: string) => {
  const counts: Record<string, number> = { '24h': 24, week: 7, month: 30, year: 12 }
  const count = counts[timeRange] || 24
  const labels = timeRange === '24h' 
    ? Array.from({ length: count }, (_, i) => `${i}:00`)
    : timeRange === 'week'
    ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    : timeRange === 'month'
    ? Array.from({ length: count }, (_, i) => `${i + 1}日`)
    : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  
  return labels.map((label, i) => ({
    name: label,
    温度: Math.round((15 + Math.sin(i * 0.5) * 10 + Math.random() * 5) * 10) / 10,
  }))
}

const generateRainfallData = (timeRange: string) => {
  const counts: Record<string, number> = { '24h': 24, week: 7, month: 30, year: 12 }
  const count = counts[timeRange] || 24
  const labels = timeRange === '24h' 
    ? Array.from({ length: count }, (_, i) => `${i}:00`)
    : timeRange === 'week'
    ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    : timeRange === 'month'
    ? Array.from({ length: count }, (_, i) => `${i + 1}日`)
    : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  
  return labels.map((label) => ({
    name: label,
    降水量: Math.round(Math.random() * 50),
  }))
}

const generateWindRoseData = () => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions.map((dir) => ({
    direction: dir,
    风速: Math.round(2 + Math.random() * 8),
  }))
}

const generateAQIData = (timeRange: string) => {
  const counts: Record<string, number> = { '24h': 24, week: 7, month: 30, year: 12 }
  const count = counts[timeRange] || 24
  return Array.from({ length: Math.min(count, 12) }, (_, i) => ({
    name: `数据${i + 1}`,
    AQI: Math.round(50 + Math.random() * 100),
  }))
}

const generateHydrologyData = (timeRange: string) => {
  const counts: Record<string, number> = { '24h': 24, week: 7, month: 30, year: 12 }
  const count = counts[timeRange] || 24
  const labels = timeRange === '24h' 
    ? Array.from({ length: count }, (_, i) => `${i}:00`)
    : timeRange === 'week'
    ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    : timeRange === 'month'
    ? Array.from({ length: Math.min(count, 15) }, (_, i) => `${i + 1}日`)
    : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  
  return labels.map((label) => ({
    name: label,
    水位: Math.round(100 + Math.random() * 50),
    流量: Math.round(50 + Math.random() * 30),
  }))
}

const generateSoilData = () => {
  return [
    { factor: '温度', value: 75 },
    { factor: '湿度', value: 65 },
    { factor: 'pH值', value: 82 },
    { factor: '有机质', value: 58 },
  ]
}

const generateCO2Data = (timeRange: string) => {
  const counts: Record<string, number> = { '24h': 24, week: 7, month: 30, year: 12 }
  const count = counts[timeRange] || 24
  const labels = timeRange === '24h' 
    ? Array.from({ length: count }, (_, i) => `${i}:00`)
    : timeRange === 'week'
    ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    : timeRange === 'month'
    ? Array.from({ length: count }, (_, i) => `${i + 1}日`)
    : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  
  return labels.map((label) => ({
    name: label,
    CO2: Math.round(400 + Math.random() * 200),
  }))
}

// AQI仪表盘组件
function AQIGauge({ value }: { value: number }) {
  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { level: '优', color: '#22c55e', bgColor: 'bg-green-500' }
    if (aqi <= 100) return { level: '良', color: '#84cc16', bgColor: 'bg-lime-500' }
    if (aqi <= 150) return { level: '轻度污染', color: '#eab308', bgColor: 'bg-yellow-500' }
    if (aqi <= 200) return { level: '中度污染', color: '#f97316', bgColor: 'bg-orange-500' }
    if (aqi <= 300) return { level: '重度污染', color: '#ef4444', bgColor: 'bg-red-500' }
    return { level: '严重污染', color: '#7c2d12', bgColor: 'bg-red-900' }
  }

  const { level, color } = getAQILevel(value)
  const angle = (value / 500) * 180 - 90

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute inset-0 rounded-t-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500" 
             style={{ borderRadius: '100px 100px 0 0' }} />
        <div className="absolute bottom-0 left-1/2 w-1 h-14 origin-bottom"
             style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}>
          <div className="w-1 h-8 bg-gray-900 rounded-full" />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full" />
      </div>
      <div className="text-3xl font-bold mt-2" style={{ color }}>{value}</div>
      <div className="text-sm text-gray-600">{level}</div>
    </div>
  )
}

// 报告弹窗组件
function ReportModal({ 
  isOpen, 
  onClose, 
  tool 
}: { 
  isOpen: boolean
  onClose: () => void
  tool: { id: string; name: string; icon: any } | null
}) {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 1500)
  }

  const handleClose = () => {
    setIsGenerating(false)
    setIsGenerated(false)
    setSelectedMonth(null)
    setSelectedWeek(null)
    onClose()
  }

  if (!isOpen || !tool) return null

  const isWeeklyReport = tool.id === 'weekly-report'
  const isMonthlyReport = tool.id === 'monthly-report'
  const isAnnualReport = tool.id === 'annual-report'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-[480px] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">{tool.name}</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {!isGenerated ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择年份</label>
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="2025">2025年</option>
                    <option value="2024">2024年</option>
                    <option value="2023">2023年</option>
                  </select>
                </div>

                {isWeeklyReport && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择周</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['第1周', '第2周', '第3周', '第4周'].map((week, idx) => (
                        <button
                          key={week}
                          onClick={() => setSelectedWeek(String(idx + 1))}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedWeek === String(idx + 1)
                              ? 'bg-teal-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {week}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isMonthlyReport && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择月份</label>
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 12 }, (_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedMonth(String(idx + 1))}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedMonth === String(idx + 1)
                              ? 'bg-teal-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {idx + 1}月
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || (isWeeklyReport && !selectedWeek) || (isMonthlyReport && !selectedMonth)}
                className="w-full mt-6 px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    生成中...
                  </>
                ) : (
                  '生成报告'
                )}
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl font-medium text-gray-900 mb-2">报告生成成功</h4>
              <p className="text-gray-500 mb-6">
                {selectedYear}年
                {isWeeklyReport && selectedWeek && `第${selectedWeek}周`}
                {isMonthlyReport && selectedMonth && `${selectedMonth}月`}
                {tool.name}已生成
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  关闭
                </button>
                <button
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <FileText className="w-4 h-4" />
                  下载报告
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 分享设置弹窗
function ShareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [shareTime, setShareTime] = useState('24h')
  const [shareTarget, setShareTarget] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-[400px] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">分享设置</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">分享有效期</label>
            <select 
              value={shareTime}
              onChange={(e) => setShareTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="1h">1小时</option>
              <option value="24h">24小时</option>
              <option value="7d">7天</option>
              <option value="30d">30天</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">分享目标（可选）</label>
            <input
              type="text"
              value={shareTarget}
              onChange={(e) => setShareTarget(e.target.value)}
              placeholder="输入网址或微信公众号名称"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              取消
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              确认分享
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 图表卡片组件
function ChartCard({
  title,
  icon: Icon,
  children,
  deviceOptions: devices,
  selectedDevice,
  onDeviceChange,
  timeRange,
  onTimeRangeChange,
}: {
  title: string
  icon: any
  children: React.ReactNode
  deviceOptions: string[]
  selectedDevice: string
  onDeviceChange: (device: string) => void
  timeRange: string
  onTimeRangeChange: (range: string) => void
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-teal-500" />
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          </div>
          <select
            value={selectedDevice}
            onChange={(e) => onDeviceChange(e.target.value)}
            className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            {devices.map((device) => (
              <option key={device} value={device}>{device}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-1">
          {timeRangeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onTimeRangeChange(option.id)}
              className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                timeRange === option.id
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4 min-h-[200px]">
        {children}
      </div>
    </div>
  )
}

// 主组件
export function EcologicalStatsAnalysis() {
  // 各图表的时间范围和设备选择状态
  const [tempTimeRange, setTempTimeRange] = useState('24h')
  const [tempDevice, setTempDevice] = useState('默认气象站')
  
  const [rainTimeRange, setRainTimeRange] = useState('24h')
  const [rainDevice, setRainDevice] = useState('默认气象站')
  
  const [windTimeRange, setWindTimeRange] = useState('24h')
  const [windDevice, setWindDevice] = useState('默认气象站')
  
  const [airTimeRange, setAirTimeRange] = useState('24h')
  const [airDevice, setAirDevice] = useState('默认空气站')
  
  const [waterTimeRange, setWaterTimeRange] = useState('24h')
  const [waterDevice, setWaterDevice] = useState('默认水文站')
  
  const [soilTimeRange, setSoilTimeRange] = useState('24h')
  const [soilDevice, setSoilDevice] = useState('默认土壤站')
  
  const [co2TimeRange, setCO2TimeRange] = useState('24h')
  const [co2Device, setCO2Device] = useState('默认溶洞站')

  // 弹窗状态
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState<{ id: string; name: string; icon: any } | null>(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  // AQI值（模拟）
  const aqiValue = useMemo(() => Math.round(50 + Math.random() * 100), [airTimeRange, airDevice])

  // 打开报告弹窗
  const openReportModal = (tool: typeof analysisTools[0]) => {
    setSelectedTool(tool)
    setReportModalOpen(true)
  }

  return (
    <div className="h-full flex bg-gray-50 overflow-hidden">
      {/* 左侧统计看板 - 大面积占比 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部标题和工具栏 */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-900 text-lg font-semibold">统计看板</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg text-teal-600 text-sm transition-colors">
                <Plus className="w-4 h-4" />
                添加图表
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 text-sm transition-colors">
                <Maximize2 className="w-4 h-4" />
                全屏演示
              </button>
              <button 
                onClick={() => setShareModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 text-sm transition-colors"
              >
                <Share2 className="w-4 h-4" />
                分享
              </button>
              <button 
                onClick={() => setShareModalOpen(true)}
                className="p-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 统计图表区域 - 一行3个 */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {/* 气温变化统计 - 折线图 */}
            <ChartCard
              title="气温变化统计"
              icon={TrendingUp}
              deviceOptions={deviceOptions.weather}
              selectedDevice={tempDevice}
              onDeviceChange={setTempDevice}
              timeRange={tempTimeRange}
              onTimeRangeChange={setTempTimeRange}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateTemperatureData(tempTimeRange)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                  <YAxis stroke="#9ca3af" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="温度" stroke="#f97316" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 降水统计图 - 柱形图 */}
            <ChartCard
              title="降水统计图"
              icon={CloudRain}
              deviceOptions={deviceOptions.weather}
              selectedDevice={rainDevice}
              onDeviceChange={setRainDevice}
              timeRange={rainTimeRange}
              onTimeRangeChange={setRainTimeRange}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={generateRainfallData(rainTimeRange)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                  <YAxis stroke="#9ca3af" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="降水量" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 风速风向玫瑰图 */}
            <ChartCard
              title="风速风向玫瑰图"
              icon={Wind}
              deviceOptions={deviceOptions.weather}
              selectedDevice={windDevice}
              onDeviceChange={setWindDevice}
              timeRange={windTimeRange}
              onTimeRangeChange={setWindTimeRange}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={generateWindRoseData()}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="direction" stroke="#9ca3af" fontSize={11} />
                  <PolarRadiusAxis stroke="#9ca3af" fontSize={9} />
                  <Radar name="风速" dataKey="风速" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 空气质量图 - AQI仪表盘 */}
            <ChartCard
              title="空气质量图"
              icon={Gauge}
              deviceOptions={deviceOptions.air}
              selectedDevice={airDevice}
              onDeviceChange={setAirDevice}
              timeRange={airTimeRange}
              onTimeRangeChange={setAirTimeRange}
            >
              <AQIGauge value={aqiValue} />
            </ChartCard>

            {/* 水文状况 - 面积图 */}
            <ChartCard
              title="水文状况"
              icon={Droplets}
              deviceOptions={deviceOptions.water}
              selectedDevice={waterDevice}
              onDeviceChange={setWaterDevice}
              timeRange={waterTimeRange}
              onTimeRangeChange={setWaterTimeRange}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generateHydrologyData(waterTimeRange)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                  <YAxis stroke="#9ca3af" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="水位" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="流量" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 土壤状况图 - 雷达图 */}
            <ChartCard
              title="土壤状况图"
              icon={Layers}
              deviceOptions={deviceOptions.soil}
              selectedDevice={soilDevice}
              onDeviceChange={setSoilDevice}
              timeRange={soilTimeRange}
              onTimeRangeChange={setSoilTimeRange}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={generateSoilData()}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="factor" stroke="#9ca3af" fontSize={11} />
                  <PolarRadiusAxis stroke="#9ca3af" fontSize={9} />
                  <Radar name="监测值" dataKey="value" stroke="#22c55e" fill="#22c55e" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* 溶洞CO2变化图 - 折线图 */}
            <ChartCard
              title="溶洞CO2变化图"
              icon={Mountain}
              deviceOptions={deviceOptions.cave}
              selectedDevice={co2Device}
              onDeviceChange={setCO2Device}
              timeRange={co2TimeRange}
              onTimeRangeChange={setCO2TimeRange}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateCO2Data(co2TimeRange)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                  <YAxis stroke="#9ca3af" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="CO2" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      </div>

      {/* 右侧智能分析工具区 */}
      <div className="w-[240px] border-l border-gray-200 bg-white flex flex-col">
        <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
          <h2 className="text-gray-900 text-base font-semibold">智能分析工具</h2>
        </div>
        
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-2">
            {analysisTools.map((tool) => {
              const Icon = tool.icon
              return (
                <button
                  key={tool.id}
                  onClick={() => openReportModal(tool)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:text-gray-900 transition-colors text-left"
                >
                  <div className="text-teal-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{tool.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 报告弹窗 */}
      <ReportModal 
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        tool={selectedTool}
      />

      {/* 分享设置弹窗 */}
      <ShareModal 
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  )
}

export default EcologicalStatsAnalysis
