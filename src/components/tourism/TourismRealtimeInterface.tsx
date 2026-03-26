'use client'

import { useState } from 'react'
import {
  MapPin,
  Camera,
  Users,
  Building2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Video,
  Eye,
  X,
  Layers,
  ChevronDown
} from 'lucide-react'

// 景点数据
const scenicSpots = [
  { id: 1, name: '石花洞主洞', capacity: 500, current: 320, top: '30%', left: '45%', type: 'cave' },
  { id: 2, name: '银狐洞', capacity: 300, current: 180, top: '25%', left: '60%', type: 'cave' },
  { id: 3, name: '孔水洞', capacity: 200, current: 85, top: '45%', left: '35%', type: 'cave' },
  { id: 4, name: '游客服务中心', capacity: 200, current: 156, top: '60%', left: '50%', type: 'facility' },
  { id: 5, name: '生态步道', capacity: 150, current: 68, top: '50%', left: '70%', type: 'trail' },
  { id: 6, name: '观景平台', capacity: 100, current: 42, top: '35%', left: '55%', type: 'viewpoint' },
]

// 监控设备数据
const monitorDevices = [
  { id: 1, name: '入口监控A', location: '景区主入口', status: '在线', top: '65%', left: '30%', type: 'entrance' },
  { id: 2, name: '入口监控B', location: '景区主入口', status: '在线', top: '68%', left: '32%', type: 'entrance' },
  { id: 3, name: '石花洞口监控', location: '石花洞入口', status: '在线', top: '32%', left: '47%', type: 'spot' },
  { id: 4, name: '银狐洞口监控', location: '银狐洞入口', status: '在线', top: '27%', left: '62%', type: 'spot' },
  { id: 5, name: '停车场监控', location: '游客停车场', status: '在线', top: '55%', left: '42%', type: 'facility' },
  { id: 6, name: '步道监控A', location: '生态步道起点', status: '离线', top: '52%', left: '68%', type: 'trail' },
  { id: 7, name: '步道监控B', location: '生态步道中段', status: '在线', top: '48%', left: '72%', type: 'trail' },
  { id: 8, name: '出口监控', location: '景区出口', status: '在线', top: '70%', left: '55%', type: 'entrance' },
]

// 设施数据
const facilities = [
  { id: 1, name: '游客服务中心', top: '60%', left: '50%', type: 'service' },
  { id: 2, name: '停车场', top: '55%', left: '42%', type: 'parking' },
  { id: 3, name: '急救站', top: '58%', left: '48%', type: 'medical' },
  { id: 4, name: '餐饮区', top: '62%', left: '52%', type: 'dining' },
]

// 24小时游客数据（按景点分组）
const hourlyDataBySpot: Record<string, { time: string; count: number }[]> = {
  '全部': Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    count: Math.floor(Math.random() * 300) + 100 + (i >= 8 && i <= 18 ? 200 : 0)
  })),
  '石花洞主洞': Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    count: Math.floor(Math.random() * 150) + 50 + (i >= 9 && i <= 17 ? 100 : 0)
  })),
  '银狐洞': Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    count: Math.floor(Math.random() * 80) + 30 + (i >= 10 && i <= 16 ? 50 : 0)
  })),
  '孔水洞': Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    count: Math.floor(Math.random() * 50) + 20 + (i >= 9 && i <= 17 ? 30 : 0)
  })),
  '游客服务中心': Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    count: Math.floor(Math.random() * 100) + 50 + (i >= 8 && i <= 18 ? 80 : 0)
  })),
  '生态步道': Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    count: Math.floor(Math.random() * 60) + 20 + (i >= 10 && i <= 16 ? 40 : 0)
  })),
  '观景平台': Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    count: Math.floor(Math.random() * 40) + 10 + (i >= 9 && i <= 17 ? 30 : 0)
  })),
}

// 获取承载率对应的颜色
function getCapacityColor(rate: number): string {
  if (rate < 60) return 'text-green-400'
  if (rate < 80) return 'text-yellow-400'
  if (rate < 95) return 'text-orange-400'
  return 'text-red-400'
}

// 获取承载率对应的背景颜色
function getCapacityBgColor(rate: number): string {
  if (rate < 60) return 'bg-green-500'
  if (rate < 80) return 'bg-yellow-500'
  if (rate < 95) return 'bg-orange-500'
  return 'bg-red-500'
}

// 实时数据卡片组件
function RealtimeDataCard({
  title,
  value,
  unit,
  icon: Icon,
  color,
  subValue,
  trend
}: {
  title: string
  value: number | string
  unit: string
  icon: React.ElementType
  color: string
  subValue?: string
  trend?: 'up' | 'down' | 'stable'
}) {
  return (
    <div className="bg-slate-800/60 rounded-lg p-4 border border-cyan-900/30 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm text-gray-400">{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-sm text-gray-400">{unit}</span>
        {trend && (
          <TrendingUp className={`w-4 h-4 ml-2 ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400 rotate-180' : 'text-gray-400'}`} />
        )}
      </div>
      {subValue && (
        <div className="text-xs text-gray-500 mt-1">{subValue}</div>
      )}
    </div>
  )
}

// 承载率进度条组件
function CapacityBar({ name, current, capacity }: { name: string; current: number; capacity: number }) {
  const rate = Math.round((current / capacity) * 100)
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400 w-20 truncate">{name}</span>
      <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getCapacityBgColor(rate)}`}
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
      <span className={`text-sm font-medium w-12 text-right ${getCapacityColor(rate)}`}>{rate}%</span>
    </div>
  )
}

// 折线图组件
function LineChart({ data }: { data: { time: string; count: number }[] }) {
  const maxValue = Math.max(...data.map(d => d.count))
  const minValue = Math.min(...data.map(d => d.count))
  const range = maxValue - minValue || 1

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((d.count - minValue) / range) * 80 - 10
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `0,100 ${points} 100,100`

  return (
    <div className="h-full w-full relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={areaPoints}
          fill="url(#lineGradient)"
        />
        <polyline
          points={points}
          fill="none"
          stroke="rgb(34, 211, 238)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* X轴标签 */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
        {data.filter((_, i) => i % 4 === 0).map((d, i) => (
          <span key={i} className="text-xs text-gray-500">{d.time}</span>
        ))}
      </div>
    </div>
  )
}

// 监控视频卡片组件
function MonitorCard({
  device,
  onFullscreen
}: {
  device: typeof monitorDevices[0]
  onFullscreen: () => void
}) {
  const now = new Date()
  const timeStr = now.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  return (
    <div className="bg-slate-800/80 rounded-lg overflow-hidden border border-slate-600/50 hover:border-cyan-500/50 transition-colors group shadow-lg">
      {/* 视频区域 */}
      <div className="relative aspect-video bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-800 flex items-center justify-center">
          <Video className="w-8 h-8 text-slate-500" />
        </div>

        {/* 状态指示 */}
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${device.status === '在线' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">{device.status}</span>
        </div>

        {/* 时间戳 */}
        <div className="absolute top-2 right-2 text-xs text-white/70 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
          {timeStr}
        </div>

        {/* 全屏按钮 */}
        <button
          onClick={onFullscreen}
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500/80 hover:bg-cyan-500 text-white p-1.5 rounded"
          title="全屏播放"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* 设备名称 */}
        <div className="absolute bottom-2 left-2 text-xs text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
          {device.name}
        </div>
      </div>
    </div>
  )
}

export function TourismRealtimeInterface() {
  // 地图图层控制
  const [layers, setLayers] = useState({
    spots: true,
    monitors: true,
    facilities: false
  })

  // 24小时数据景点选择
  const [selectedSpot, setSelectedSpot] = useState('全部')

  // 监控布局
  const [gridCols, setGridCols] = useState(1)

  // 视频弹窗
  const [videoModal, setVideoModal] = useState<typeof monitorDevices[0] | null>(null)

  // 图层下拉菜单
  const [showLayerMenu, setShowLayerMenu] = useState(false)

  // 计算实时统计数据
  const totalVisitors = scenicSpots.reduce((sum, s) => sum + s.current, 0)
  const totalCapacity = scenicSpots.reduce((sum, s) => sum + s.capacity, 0)
  const overallRate = Math.round((totalVisitors / totalCapacity) * 100)

  // 在线监控数量
  const onlineMonitors = monitorDevices.filter(d => d.status === '在线').length

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-800/80 border-b border-cyan-900/30 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">旅游管理实时监控</h1>
            <p className="text-xs text-gray-400">石花洞风景名胜区 · 实时数据大屏</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-400">当前时间</div>
            <div className="text-base font-medium text-cyan-400">
              {new Date().toLocaleString('zh-CN', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="flex-1 flex gap-3 p-3 min-h-0 overflow-hidden">
        {/* 左侧：实时数据 + 承载率 */}
        <div className="w-64 flex flex-col gap-3 flex-shrink-0">
          {/* 实时数据统计 - 固定高度，不超过界面中心线 */}
          <div className="bg-slate-800/60 rounded-lg border border-cyan-900/30 overflow-hidden flex-shrink-0">
            <div className="px-4 py-2 border-b border-cyan-900/30 bg-slate-700/30">
              <h3 className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                实时数据
              </h3>
            </div>
            <div className="p-2 grid grid-cols-2 gap-2">
              <RealtimeDataCard
                title="景区景点"
                value={scenicSpots.length}
                unit="个"
                icon={MapPin}
                color="bg-blue-500"
              />
              <RealtimeDataCard
                title="监控设施"
                value={monitorDevices.length}
                unit="套"
                icon={Camera}
                color="bg-purple-500"
              />
              <RealtimeDataCard
                title="服务设施"
                value={facilities.length}
                unit="处"
                icon={Building2}
                color="bg-orange-500"
              />
              <RealtimeDataCard
                title="景区设备"
                value={12}
                unit="台"
                icon={Building2}
                color="bg-green-500"
              />
            </div>
          </div>

          {/* 景区游客实时数据 */}
          <div className="flex-1 bg-slate-800/60 rounded-lg border border-cyan-900/30 overflow-hidden flex flex-col">
            <div className="px-4 py-2 border-b border-cyan-900/30 bg-slate-700/30 flex-shrink-0">
              <h3 className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                景区游客实时数据
              </h3>
            </div>
            
            {/* 滚动区域 */}
            <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
              {/* 景区总体数据 */}
              <div className="p-4 flex-shrink-0">
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-white">{totalVisitors.toLocaleString()}</div>
                  <div className="text-sm text-gray-400 mt-1">
                    承载率 <span className={getCapacityColor(overallRate)}>{overallRate}%</span>
                  </div>
                </div>
                {/* 总承载率进度条 */}
                <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getCapacityBgColor(overallRate)}`}
                    style={{ width: `${Math.min(overallRate, 100)}%` }}
                  />
                </div>
              </div>

              {/* 各景点游客数据 */}
              <div className="px-4 pb-4">
                <div className="text-xs text-gray-500 mb-2">各景点游客数据</div>
                <div className="space-y-2">
                  {scenicSpots.map(spot => {
                    const rate = Math.round((spot.current / spot.capacity) * 100)
                    return (
                      <div key={spot.id} className="bg-slate-700/30 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white font-medium">{spot.name}</span>
                          <span className={`text-sm font-medium ${getCapacityColor(rate)}`}>{rate}%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                          <span>当前游客: <span className="text-white">{spot.current}人</span></span>
                          <span>容量: <span className="text-white">{spot.capacity}人</span></span>
                        </div>
                        <div className="h-2 bg-slate-600/50 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getCapacityBgColor(rate)}`}
                            style={{ width: `${Math.min(rate, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中间：地图 */}
        <div className="flex-1 bg-slate-800/60 rounded-lg border border-cyan-900/30 overflow-hidden flex flex-col min-w-0">
          {/* 地图头部 */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-900/30 bg-slate-700/30 flex-shrink-0">
            <h3 className="text-sm font-medium text-cyan-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              景区地图
            </h3>
            {/* 图层控制 */}
            <div className="relative">
              <button
                onClick={() => setShowLayerMenu(!showLayerMenu)}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded text-sm text-gray-300 transition-colors"
              >
                <Layers className="w-4 h-4" />
                图层
                <ChevronDown className={`w-4 h-4 transition-transform ${showLayerMenu ? 'rotate-180' : ''}`} />
              </button>
              {showLayerMenu && (
                <div className="absolute top-full right-0 mt-1 bg-slate-800 border border-cyan-900/30 rounded-lg shadow-xl z-20 min-w-40">
                  <div className="p-2 space-y-1">
                    <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-700/50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={layers.spots}
                        onChange={(e) => setLayers(prev => ({ ...prev, spots: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-500 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-sm text-gray-300">景点位置</span>
                    </label>
                    <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-700/50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={layers.monitors}
                        onChange={(e) => setLayers(prev => ({ ...prev, monitors: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-500 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-sm text-gray-300">监控点位</span>
                    </label>
                    <label className="flex items-center gap-2 px-2 py-1.5 hover:bg-slate-700/50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={layers.facilities}
                        onChange={(e) => setLayers(prev => ({ ...prev, facilities: e.target.checked }))}
                        className="w-4 h-4 rounded border-gray-500 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-sm text-gray-300">设施点位</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 地图主体 */}
          <div className="flex-1 relative overflow-hidden">
            {/* 地图背景 */}
            <img
              src="/旅游管理用.png"
              alt="景区地图"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 景点点位 */}
            {layers.spots && scenicSpots.map(spot => {
              const rate = Math.round((spot.current / spot.capacity) * 100)
              return (
                <div
                  key={spot.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ top: spot.top, left: spot.left }}
                >
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 ${getCapacityBgColor(rate)}`}>
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  {/* 悬浮提示 */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800/95 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
                    <div className="font-medium">{spot.name}</div>
                    <div className="text-gray-400">当前: {spot.current}人 / 容量: {spot.capacity}人</div>
                  </div>
                </div>
              )
            })}

            {/* 监控点位 */}
            {layers.monitors && monitorDevices.map(device => (
              <div
                key={device.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: device.top, left: device.left }}
                onClick={() => setVideoModal(device)}
              >
                <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 ${
                  device.status === '在线' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <Video className="w-3 h-3 text-white" />
                </div>
                {/* 悬浮提示 */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800/95 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
                  <div className="font-medium">{device.name}</div>
                  <div className="text-gray-400">{device.location} · {device.status}</div>
                </div>
              </div>
            ))}

            {/* 设施点位 */}
            {layers.facilities && facilities.map(facility => (
              <div
                key={facility.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: facility.top, left: facility.left }}
              >
                <div className="w-6 h-6 rounded-md bg-orange-500 border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125">
                  <Building2 className="w-3 h-3 text-white" />
                </div>
                {/* 悬浮提示 */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800/95 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
                  {facility.name}
                </div>
              </div>
            ))}

            {/* 图例 */}
            <div className="absolute bottom-3 left-3 bg-slate-800/90 rounded-lg px-3 py-2 shadow-lg">
              <div className="text-xs font-medium text-gray-400 mb-2">图例</div>
              <div className="space-y-1.5">
                {layers.spots && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    <span className="text-xs text-gray-300">景点 (&lt;60%)</span>
                  </div>
                )}
                {layers.spots && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white"></div>
                    <span className="text-xs text-gray-300">景点 (60-80%)</span>
                  </div>
                )}
                {layers.spots && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full border border-white"></div>
                    <span className="text-xs text-gray-300">景点 (80-95%)</span>
                  </div>
                )}
                {layers.spots && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                    <span className="text-xs text-gray-300">景点 (&gt;95%)</span>
                  </div>
                )}
                {layers.monitors && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-white flex items-center justify-center">
                      <Video className="w-1.5 h-1.5 text-white" />
                    </div>
                    <span className="text-xs text-gray-300">监控 (在线)</span>
                  </div>
                )}
                {layers.monitors && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full border border-white flex items-center justify-center">
                      <Video className="w-1.5 h-1.5 text-white" />
                    </div>
                    <span className="text-xs text-gray-300">监控 (离线)</span>
                  </div>
                )}
                {layers.facilities && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded border border-white"></div>
                    <span className="text-xs text-gray-300">设施</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：24小时监测动态 + 实时监控 */}
        <div className="w-80 flex flex-col gap-3 flex-shrink-0">
          {/* 24小时监测动态 */}
          <div className="h-56 bg-slate-800/60 rounded-lg border border-cyan-900/30 overflow-hidden flex flex-col flex-shrink-0">
            <div className="px-4 py-2 border-b border-cyan-900/30 bg-slate-700/30 flex items-center justify-between flex-shrink-0">
              <h3 className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                24小时监测动态
              </h3>
              <select
                value={selectedSpot}
                onChange={(e) => setSelectedSpot(e.target.value)}
                className="text-xs bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-gray-300"
              >
                <option value="全部">全部景点</option>
                {scenicSpots.map(spot => (
                  <option key={spot.id} value={spot.name}>{spot.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 p-4 min-h-0">
              <LineChart data={hourlyDataBySpot[selectedSpot] || hourlyDataBySpot['全部']} />
            </div>
          </div>

          {/* 实时监控 */}
          <div className="flex-1 bg-slate-800/60 rounded-lg border border-cyan-900/30 overflow-hidden flex flex-col min-h-0">
            <div className="px-4 py-2 border-b border-cyan-900/30 bg-slate-700/30 flex items-center justify-between flex-shrink-0">
              <h3 className="text-sm font-medium text-cyan-400 flex items-center gap-2">
                <Video className="w-4 h-4" />
                实时监控
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  在线: <span className="text-green-400">{onlineMonitors}</span>/{monitorDevices.length}
                </span>
                {/* 布局切换 */}
                <div className="flex gap-1 bg-slate-700/50 p-0.5 rounded">
                  <button
                    onClick={() => setGridCols(1)}
                    className={`p-1 rounded transition-colors ${
                      gridCols === 1 ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="一行一视频"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="3" width="12" height="10" rx="1" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setGridCols(2)}
                    className={`p-1 rounded transition-colors ${
                      gridCols === 2 ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title="一行两视频"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="1" y="3" width="6" height="10" rx="1" />
                      <rect x="9" y="3" width="6" height="10" rx="1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 p-2 overflow-y-auto min-h-0 custom-scrollbar">
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
              >
                {monitorDevices.map(device => (
                  <MonitorCard
                    key={device.id}
                    device={device}
                    onFullscreen={() => setVideoModal(device)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 视频全屏弹窗 */}
      {videoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8" onClick={() => setVideoModal(null)}>
          <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-5xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${videoModal.status === '在线' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <h3 className="text-lg font-medium text-white">{videoModal.name}</h3>
                <span className="text-sm text-gray-400">{videoModal.location}</span>
              </div>
              <button
                onClick={() => setVideoModal(null)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* 视频区域 */}
            <div className="relative aspect-video bg-slate-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">实时视频流</p>
                  <p className="text-gray-500 text-sm mt-2">设备状态: {videoModal.status}</p>
                </div>
              </div>
              {/* 时间戳 */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded text-sm">
                {new Date().toLocaleString('zh-CN')}
              </div>
              {/* 实时标签 */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                实时
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
// BUILD: 20260318041638
