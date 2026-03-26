'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Thermometer, Droplets, Gauge, Wind, Compass, CloudRain, Sun,
  Sparkles, Cloud, CloudFog, Flame, Zap, Cloudy,
  Waves, Activity, Droplet, FlaskConical, Bubbles,
  Mountain, Maximize2, Minimize2, ChevronDown, X,
  CloudSun, Radio, Battery, MapPin
} from 'lucide-react'
import {
  monitorThemes,
  monitorFactors,
  ecologyDevices,
  generateRealtimeData,
  generate24HourTrendData,
  getAllDevicePoints,
  getDeviceStats,
} from '@/data/ecologyMonitorData'

// 图标映射
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  thermometer: Thermometer,
  droplets: Droplets,
  gauge: Gauge,
  wind: Wind,
  compass: Compass,
  'cloud-rain': CloudRain,
  sun: Sun,
  sparkles: Sparkles,
  cloud: Cloud,
  'cloud-fog': CloudFog,
  flame: Flame,
  zap: Zap,
  cloudy: Cloudy,
  waves: Waves,
  activity: Activity,
  droplet: Droplet,
  'flask-conical': FlaskConical,
  bubbles: Bubbles,
  mountain: Mountain,
}

// 主题图标映射
const themeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  weather: CloudSun,
  air: Wind,
  water: Waves,
  soil: Mountain,
  cave: Flame,
}

type ThemeId = 'weather' | 'air' | 'water' | 'soil' | 'cave'

// 设备详情弹窗组件
function DeviceDetailModal({
  isOpen,
  onClose,
  device,
  theme,
  realtimeData,
  factors,
}: {
  isOpen: boolean
  onClose: () => void
  device: {
    id: string
    name: string
    location: string
    status: 'online' | 'offline'
    theme: string
    themeColor: string
  } | null
  theme: { id: string; name: string; color: string }
  realtimeData: Record<string, number | string>
  factors: Array<{ key: string; name: string; unit: string; icon: string; color: string }>
}) {
  if (!isOpen || !device) return null

  const IconComponent = themeIconMap[device.theme] || CloudSun

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-[600px] max-h-[80vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* 顶部栏：标题 + 状态标签 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${theme.color}15` }}
            >
              <IconComponent className="w-5 h-5" style={{ color: theme.color }} />
            </div>
            <span className="text-lg font-bold text-gray-800">{device.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              device.status === 'online' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              {device.status === 'online' ? '在线' : '离线'}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 上半区（1/3）：基础信息栏 */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {/* 左列 */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-16">设备编号</span>
                <span className="text-sm text-gray-700 font-medium">{device.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-16">监测类型</span>
                <span className="text-sm text-gray-700">{theme.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-16">安装位置</span>
                <span className="text-sm text-gray-700">{device.location}</span>
              </div>
            </div>
            {/* 右列 */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-16">更新时间</span>
                <span className="text-sm text-gray-700">
                  {new Date().toLocaleString('zh-CN', { 
                    month: '2-digit', day: '2-digit', 
                    hour: '2-digit', minute: '2-digit', second: '2-digit' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-16">供电状态</span>
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <Battery className="w-3.5 h-3.5" />
                  正常
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-16">经纬度</span>
                <span className="text-sm text-gray-700">115.94°E, 39.79°N</span>
              </div>
            </div>
          </div>
        </div>

        {/* 下半区（2/3）：实时监测数据 */}
        <div className="px-5 py-4">
          <div className="text-sm font-medium text-gray-700 mb-3">实时监测数据</div>
          <div className="grid grid-cols-3 gap-3">
            {factors.map((factor) => {
              const Icon = iconMap[factor.icon] || Thermometer
              const value = realtimeData[factor.key]
              const displayValue = factor.key === 'windDirection' 
                ? value 
                : (typeof value === 'number' ? value.toFixed(1) : value || '--')
              
              return (
                <div 
                  key={factor.key}
                  className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4" style={{ color: factor.color }} />
                    <span className="text-xs text-gray-500">{factor.name}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-gray-800">{displayValue}</span>
                    <span className="text-xs text-gray-400">{factor.unit}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// 趋势图组件 - 不显示数值
function TrendChart({ 
  data, 
  title, 
  color, 
  height = 100 
}: { 
  data: Array<{ time: string; value: number | string }>
  title: string
  color: string
  height?: number 
}) {
  const numericData = data.map(d => ({
    ...d,
    value: typeof d.value === 'string' ? parseFloat(d.value) || 0 : d.value
  }))
  
  const minVal = Math.min(...numericData.map(d => d.value))
  const maxVal = Math.max(...numericData.map(d => d.value))
  const range = maxVal - minVal || 1
  
  const svgHeight = height - 10
  const svgWidth = 100
  
  const points = numericData.map((d, i) => {
    const x = (i / (numericData.length - 1)) * svgWidth
    const y = svgHeight - ((d.value - minVal) / range) * (svgHeight - 10) - 5
    return `${x},${y}`
  }).join(' ')
  
  return (
    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-lg p-3 border border-gray-700/30">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-gray-300 text-xs font-medium">{title}</h4>
      </div>
      <div className="relative" style={{ height }}>
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
              <stop offset="100%" stopColor={color} stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          
          <polygon
            points={`0,${svgHeight} ${points} ${svgWidth},${svgHeight}`}
            fill={`url(#gradient-${title})`}
          />
          
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        
        {/* Y轴标签 */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-500">
          <span>{maxVal.toFixed(0)}</span>
          <span>{minVal.toFixed(0)}</span>
        </div>
      </div>
    </div>
  )
}

// 地图组件
function MapPanel({ 
  selectedDevice, 
  onSelectDevice,
  theme,
  isFullscreen,
  onToggleFullscreen
}: { 
  selectedDevice: string | null
  onSelectDevice: (id: string) => void
  theme: { id: string; name: string; color: string }
  isFullscreen: boolean
  onToggleFullscreen: () => void
}) {
  const allPoints = getAllDevicePoints()
  const stats = getDeviceStats()

  return (
    <div className={`relative rounded-xl overflow-hidden border border-cyan-500/30 ${
      isFullscreen ? 'fixed inset-4 z-50 bg-gray-900' : 'h-full'
    }`}>
      {/* 地图背景 */}
      <img
        src="/地图背景-保护地基本概况用.png"
        alt="监测设备分布图"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-transparent to-cyan-900/40" />
      
      {/* 标题和全屏按钮 */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
        <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-cyan-500/30">
          <span className="text-cyan-300 text-sm font-medium">监测设备分布</span>
        </div>
        <button
          onClick={onToggleFullscreen}
          className="bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm rounded-lg p-2 border border-gray-600/50 transition-colors"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-gray-300" />
          ) : (
            <Maximize2 className="w-4 h-4 text-gray-300" />
          )}
        </button>
      </div>
      
      {/* 设备点位 */}
      {allPoints.map((point) => {
        const ThemeIcon = themeIconMap[point.theme] || CloudSun
        const isSelected = selectedDevice === point.id
        const isCurrentTheme = point.theme === theme.id
        
        return (
          <div
            key={point.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all z-10 ${
              isSelected ? 'scale-125 z-20' : 'hover:scale-110'
            }`}
            style={{ 
              top: point.mapTop, 
              left: point.mapLeft,
            }}
            onClick={() => onSelectDevice(point.id)}
          >
            {/* 脉冲动画（仅选中的在线设备） */}
            {point.status === 'online' && isSelected && (
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{ 
                  backgroundColor: point.themeColor,
                  opacity: 0.4,
                  transform: 'scale(2)'
                }}
              />
            )}
            
            {/* 点位图标 */}
            <div 
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all shadow-lg ${
                isSelected 
                  ? 'ring-4 ring-white/40 border-white' 
                  : isCurrentTheme 
                    ? 'border-white/80' 
                    : 'border-white/50'
              }`}
              style={{ 
                backgroundColor: isSelected 
                  ? point.themeColor 
                  : point.status === 'online' 
                    ? `${point.themeColor}cc` 
                    : '#6b7280',
                boxShadow: isSelected 
                  ? `0 0 25px ${point.themeColor}` 
                  : `0 2px 8px rgba(0,0,0,0.3)`,
                opacity: isCurrentTheme ? 1 : 0.6
              }}
            >
              <ThemeIcon className="w-4 h-4 text-white" />
            </div>
            
            {/* 悬浮提示 */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-600/50">
              <div className="text-white text-sm font-medium">{point.name}</div>
              <div className="text-gray-400 text-xs">{point.location}</div>
              <div className="flex items-center gap-1 mt-1">
                <div className={`w-2 h-2 rounded-full ${point.status === 'online' ? 'bg-green-400' : 'bg-gray-400'}`} />
                <span className="text-xs text-gray-300">{point.status === 'online' ? '在线' : '离线'}</span>
              </div>
            </div>
          </div>
        )
      })}
      
      {/* 图例 */}
      <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 border border-gray-600/50 z-20">
        <div className="text-gray-300 text-xs font-medium mb-2">设备图例</div>
        <div className="space-y-1.5">
          {monitorThemes.map((t) => {
            const Icon = themeIconMap[t.id] || CloudSun
            return (
              <div key={t.id} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: t.color }}
                  >
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-400">{t.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-400">{stats[t.id as keyof typeof stats].online}</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-gray-300">{stats[t.id as keyof typeof stats].total}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 主组件
export function EcologyRealtimeMonitor() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>('weather')
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('')
  const [isMapFullscreen, setIsMapFullscreen] = useState(false)
  const [realtimeData, setRealtimeData] = useState<Record<string, number | string>>({})
  const [showDeviceDropdown, setShowDeviceDropdown] = useState(false)
  const [showDeviceModal, setShowDeviceModal] = useState(false)
  
  // 当前主题的设备和监测因子
  const currentDevices = ecologyDevices[activeTheme]
  const currentFactors = monitorFactors[activeTheme]
  const currentTheme = monitorThemes.find(t => t.id === activeTheme)!
  
  // 当前选中的设备
  const selectedDevice = useMemo(() => {
    const device = currentDevices.find(d => d.id === selectedDeviceId) || currentDevices[0]
    if (device) {
      return {
        ...device,
        theme: activeTheme,
        themeColor: currentTheme.color,
      }
    }
    return null
  }, [selectedDeviceId, currentDevices, activeTheme, currentTheme])
  
  // 更新实时数据
  useEffect(() => {
    const updateData = () => {
      const data = generateRealtimeData(activeTheme)
      setRealtimeData(data)
    }
    
    updateData()
    const interval = setInterval(updateData, 3000)
    
    return () => clearInterval(interval)
  }, [activeTheme])
  
  // 切换主题
  const handleThemeChange = (themeId: ThemeId) => {
    setActiveTheme(themeId)
    const devices = ecologyDevices[themeId]
    setSelectedDeviceId(devices[0]?.id || '')
    setShowDeviceDropdown(false)
  }
  
  // 生成图表数据
  const chartData = useMemo(() => {
    return currentFactors.map(factor => ({
      factor,
      data: generate24HourTrendData(activeTheme, factor.key),
    }))
  }, [activeTheme, currentFactors])

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 顶部主题切换 - 美化样式 */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {monitorThemes.map((theme) => {
              const Icon = themeIconMap[theme.id] || CloudSun
              const isActive = activeTheme === theme.id
              
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id as ThemeId)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/30'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.color : 'transparent',
                    boxShadow: isActive ? `0 4px 20px ${theme.color}50` : 'none',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{theme.name}</span>
                </button>
              )
            })}
          </div>
          
          {/* 实时状态 */}
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <span>实时监测数据</span>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-700/30 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">在线</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 主内容区 - 重新排版 */}
      <div className="flex-1 flex gap-3 p-3 overflow-hidden">
        {/* 左侧：监测指标卡片区 */}
        <div className="w-[300px] flex-shrink-0 flex flex-col gap-3">
          {/* 设备选择 */}
          <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-3">
            <div className="text-gray-400 text-xs mb-2">当前监测设备</div>
            <div className="relative">
              <button
                onClick={() => setShowDeviceDropdown(!showDeviceDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ 
                      backgroundColor: selectedDevice?.status === 'online' ? currentTheme.color : '#6b7280' 
                    }}
                  />
                  <span className="text-white text-sm">{selectedDevice?.name || '选择设备'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showDeviceDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showDeviceDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600/50 rounded-lg shadow-xl z-30 overflow-hidden">
                  {currentDevices.map((device) => (
                    <button
                      key={device.id}
                      onClick={() => {
                        setSelectedDeviceId(device.id)
                        setShowDeviceDropdown(false)
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-700/50 transition-colors ${
                        selectedDeviceId === device.id ? 'bg-gray-700/50' : ''
                      }`}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: device.status === 'online' ? currentTheme.color : '#6b7280' }}
                      />
                      <div className="flex-1">
                        <div className="text-white text-sm">{device.name}</div>
                        <div className="text-gray-500 text-xs">{device.location}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* 监测指标卡片 - 一行2个 */}
          <div className="flex-1 bg-gray-800/40 rounded-xl border border-gray-700/40 p-3 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {currentFactors.map((factor) => {
                const IconComponent = iconMap[factor.icon] || Thermometer
                const value = realtimeData[factor.key]
                const displayValue = factor.key === 'windDirection' 
                  ? value 
                  : (typeof value === 'number' ? value.toFixed(1) : value || '--')
                
                return (
                  <div 
                    key={factor.key}
                    className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-lg p-3 border border-gray-600/30 hover:border-gray-500/50 transition-all"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div 
                        className="w-6 h-6 rounded flex items-center justify-center"
                        style={{ backgroundColor: `${factor.color}20` }}
                      >
                        <IconComponent className="w-3.5 h-3.5" style={{ color: factor.color }} />
                      </div>
                      <span className="text-gray-400 text-xs truncate">{factor.name}</span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg font-bold text-white">{displayValue}</span>
                      <span className="text-gray-500 text-xs">{factor.unit}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* 中间：地图 */}
        <div className="flex-1 min-w-0">
          <MapPanel
            selectedDevice={selectedDeviceId}
            onSelectDevice={(id) => {
              setSelectedDeviceId(id)
              setShowDeviceModal(true)
            }}
            theme={currentTheme}
            isFullscreen={isMapFullscreen}
            onToggleFullscreen={() => setIsMapFullscreen(!isMapFullscreen)}
          />
        </div>
        
        {/* 右侧：统计图区域 */}
        <div className="w-[320px] flex-shrink-0 bg-gray-800/40 rounded-xl border border-gray-700/40 p-3 overflow-y-auto">
          <div className="text-gray-300 text-sm font-medium mb-3">趋势变化</div>
          <div className="space-y-2">
            {chartData.map(({ factor, data }) => (
              <TrendChart
                key={factor.key}
                data={data}
                title={factor.name}
                color={factor.color}
                height={80}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* 点击外部关闭下拉菜单 */}
      {showDeviceDropdown && (
        <div 
          className="fixed inset-0 z-20"
          onClick={() => setShowDeviceDropdown(false)}
        />
      )}
      
      {/* 设备详情弹窗 */}
      <DeviceDetailModal
        isOpen={showDeviceModal}
        onClose={() => setShowDeviceModal(false)}
        device={selectedDevice}
        theme={currentTheme}
        realtimeData={realtimeData}
        factors={currentFactors}
      />
    </div>
  )
}

export default EcologyRealtimeMonitor
