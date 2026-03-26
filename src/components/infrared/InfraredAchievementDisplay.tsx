'use client'

import { useState, useMemo } from 'react'
import {
  MapPin,
  Camera,
  CheckCircle,
  Target,
  Leaf,
  Star,
  Layers,
  Maximize2,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  BarChart3,
  FileText
} from 'lucide-react'
import {
  achievementStatsData,
  speciesListForFilter,
  infraredCameraMapPoints,
  heatmapPointsData,
  speciesStatisticsData,
  speciesRichnessData,
  monthlyActivityData,
  dailyActivityData,
  mapLayerConfig
} from '@/data/infraredAchievementData'

// 统计卡片组件
function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  color
}: {
  icon: React.ElementType
  label: string
  value: string | number
  unit?: string
  color: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 flex items-center gap-3">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-gray-800">{typeof value === 'number' ? value.toLocaleString() : value}</span>
          {unit && <span className="text-xs text-gray-500">{unit}</span>}
        </div>
      </div>
    </div>
  )
}

// 物种统计环形图组件
function SpeciesStatisticsChart() {
  const [statType, setStatType] = useState<'order' | 'family' | 'species'>('species')
  const data = speciesStatisticsData.byCategory[statType]

  const total = data.birds + data.mammals + data.poultry + data.livestock
  const chartData = [
    { name: '鸟类', value: data.birds, color: '#3b82f6', percentage: ((data.birds / total) * 100).toFixed(1) },
    { name: '兽类', value: data.mammals, color: '#f59e0b', percentage: ((data.mammals / total) * 100).toFixed(1) },
    { name: '家禽', value: data.poultry, color: '#8b5cf6', percentage: ((data.poultry / total) * 100).toFixed(1) },
    { name: '家畜', value: data.livestock, color: '#ef4444', percentage: ((data.livestock / total) * 100).toFixed(1) }
  ]

  const radius = 60
  let currentAngle = -90

  const segments = chartData.map((item) => {
    const angle = (parseFloat(item.percentage) / 100) * 360
    const startAngle = currentAngle
    currentAngle += angle
    return { ...item, startAngle, endAngle: currentAngle }
  })

  const createArcPath = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const x1 = 80 + radius * Math.cos(startRad)
    const y1 = 80 + radius * Math.sin(startRad)
    const x2 = 80 + radius * Math.cos(endRad)
    const y2 = 80 + radius * Math.sin(endRad)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">物种统计</h4>
        <select
          value={statType}
          onChange={(e) => setStatType(e.target.value as typeof statType)}
          className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white"
        >
          <option value="order">目</option>
          <option value="family">科</option>
          <option value="species">种</option>
        </select>
      </div>
      <div className="flex items-center gap-3 flex-1">
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {segments.map((segment, index) => (
              <path key={index} d={createArcPath(segment.startAngle, segment.endAngle)} fill="none" stroke={segment.color} strokeWidth="20" className="transition-all duration-300" />
            ))}
            <text x="80" y="75" textAnchor="middle" className="text-lg font-bold fill-gray-800">{total}</text>
            <text x="80" y="92" textAnchor="middle" className="text-xs fill-gray-500">{statType === 'order' ? '目' : statType === 'family' ? '科' : '种'}</text>
          </svg>
        </div>
        <div className="flex-1 space-y-1.5">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-600">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">{item.value}</span>
                <span className="text-gray-400">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 物种丰富度横向柱状图组件
function SpeciesRichnessChart() {
  const maxRai = Math.max(...speciesRichnessData.map(d => d.rai))

  const getBarColor = (level: string) => {
    switch (level) {
      case 'level1': return 'bg-red-500'
      case 'level2': return 'bg-amber-500'
      default: return 'bg-green-500'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">物种丰富度(RAI)</h4>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-gray-500">一级</span></div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-gray-500">二级</span></div>
        </div>
      </div>
      <div className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar">
        {speciesRichnessData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-3">{index + 1}</span>
            <span className="text-xs text-gray-700 w-16 truncate" title={item.name}>{item.name}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden relative">
              <div className={`h-full rounded-full transition-all duration-500 ${getBarColor(item.protectionLevel)}`} style={{ width: `${(item.rai / maxRai) * 100}%` }}></div>
            </div>
            <span className="text-xs font-medium text-gray-700 w-8 text-right">{item.rai}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 月活动节律柱状图组件
function MonthlyActivityChart() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all')
  const data = useMemo(() => monthlyActivityData[selectedSpecies as keyof typeof monthlyActivityData] || monthlyActivityData.all, [selectedSpecies])
  const maxMrai = Math.max(...data.map(d => d.mrai))

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">月活动节律</h4>
        <select value={selectedSpecies} onChange={(e) => setSelectedSpecies(e.target.value)} className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white">
          <option value="all">全部物种</option>
          {speciesListForFilter.filter(s => s.id !== 'all').slice(0, 5).map(s => (<option key={s.id} value={s.name}>{s.name}</option>))}
        </select>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-end gap-0.5 pb-4">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div className="w-full bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600 relative" style={{ height: `${(item.mrai / maxMrai) * 100}%`, minHeight: '4px' }}>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.mrai}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-0.5 border-t border-gray-200 pt-1">
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center"><span className="text-xs text-gray-500">{item.month.replace('月', '')}</span></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 日活动节律折线图组件
function DailyActivityChart() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all')
  const data = useMemo(() => dailyActivityData[selectedSpecies as keyof typeof dailyActivityData] || dailyActivityData.all, [selectedSpecies])
  const maxTrai = Math.max(...data.map(d => d.trai))
  const minTrai = Math.min(...data.map(d => d.trai))

  const generatePath = () => {
    const width = 280, height = 80, padding = 10
    const points = data.map((item, index) => ({
      x: padding + (index / (data.length - 1)) * (width - 2 * padding),
      y: height - padding - ((item.trai - minTrai) / (maxTrai - minTrai)) * (height - 2 * padding)
    }))
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">日活动节律</h4>
        <select value={selectedSpecies} onChange={(e) => setSelectedSpecies(e.target.value)} className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 bg-white">
          <option value="all">全部物种</option>
          {speciesListForFilter.filter(s => s.id !== 'all').slice(0, 5).map(s => (<option key={s.id} value={s.name}>{s.name}</option>))}
        </select>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 relative">
          <svg width="100%" height="100%" viewBox="0 0 280 100" preserveAspectRatio="none">
            <line x1="10" y1="10" x2="270" y2="10" stroke="#e5e7eb" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="270" y2="50" stroke="#e5e7eb" strokeWidth="0.5" />
            <line x1="10" y1="90" x2="270" y2="90" stroke="#e5e7eb" strokeWidth="0.5" />
            <path d={generatePath()} fill="none" stroke="#22c55e" strokeWidth="2" className="transition-all duration-300" />
            <path d={`${generatePath()} L 270 90 L 10 90 Z`} fill="url(#areaGradient)" opacity="0.3" />
            <defs><linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#22c55e" stopOpacity="0" /></linearGradient></defs>
          </svg>
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-400 -ml-1">
            <span>{maxTrai.toFixed(0)}</span><span>{((maxTrai + minTrai) / 2).toFixed(0)}</span><span>{minTrai.toFixed(0)}</span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
          <span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>24h</span>
        </div>
      </div>
    </div>
  )
}

// 点位详情弹窗组件
function PointDetailModal({
  point,
  onClose
}: {
  point: typeof infraredCameraMapPoints[0]
  onClose: () => void
}) {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const images = point.identifiedImages || []

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      {/* 16:9 宽高比的弹窗 */}
      <div 
        className="bg-white rounded-lg shadow-2xl overflow-hidden"
        style={{ width: '80vw', maxWidth: '1280px', aspectRatio: '16/9' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 弹窗头部 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-green-600" />
            <span className="text-base font-medium text-gray-700">{point.pointCode}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${point.status === '监测中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{point.status}</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 弹窗内容 - 左右布局 */}
        <div className="flex h-[calc(100%-52px)]">
          {/* 左侧信息区域 */}
          <div className="w-72 border-r border-gray-200 p-4 flex flex-col bg-gray-50">
            {/* 基本信息 - 左上角 */}
            <div className="flex-shrink-0">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-600" />
                基本信息
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">点位编号</span><span className="text-gray-700">{point.pointCode}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">经度</span><span className="text-gray-700">{point.lng}°E</span></div>
                <div className="flex justify-between"><span className="text-gray-500">纬度</span><span className="text-gray-700">{point.lat}°N</span></div>
                <div className="flex justify-between"><span className="text-gray-500">海拔</span><span className="text-gray-700">{point.altitude}m</span></div>
                <div className="flex justify-between"><span className="text-gray-500">布设时间</span><span className="text-gray-700">{point.deployTime}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">布设人</span><span className="text-gray-700">{point.deployer}</span></div>
              </div>
            </div>

            {/* 统计信息 - 左下角 */}
            <div className="mt-4 flex-shrink-0">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-green-600" />
                统计信息
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-600">{point.totalPhotos.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">拍摄照片数</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-600">{point.validPhotos.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">有效照片数</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-orange-600">{point.speciesCount}</div>
                  <div className="text-xs text-gray-500">物种数</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-purple-600 truncate">{point.dominantSpecies}</div>
                  <div className="text-xs text-gray-500">优势物种</div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧图像展示区域 */}
          <div className="flex-1 p-4 bg-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">已鉴定图像</h4>
              {images.length > 0 && (
                <div className="flex items-center gap-2">
                  <button onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30" disabled={carouselIndex === 0}>
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-sm text-gray-500">{carouselIndex + 1} / {images.length}</span>
                  <button onClick={() => setCarouselIndex(Math.min(images.length - 1, carouselIndex + 1))} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30" disabled={carouselIndex >= images.length - 1}>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              )}
            </div>

            {images.length > 0 ? (
              <div className="flex-1 relative bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {/* 图像占位 */}
                <div className="text-center">
                  <ImageOff className="w-20 h-20 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500">图像预览</p>
                </div>
                {/* 物种名称标签 - 左上角 */}
                <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1.5 rounded-lg">
                  <div className="text-sm font-medium">{images[carouselIndex].species}</div>
                  <div className="text-xs text-gray-300 italic">{images[carouselIndex].latinName}</div>
                </div>
                {/* 时间标签 - 右下角 */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  {images[carouselIndex].time}
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <ImageOff className="w-12 h-12 mx-auto mb-2" />
                  <p>暂无已鉴定图像</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 地图组件
function AchievementMap({ onFullscreen }: { onFullscreen: () => void }) {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('all')
  const [speciesSearchTerm, setSpeciesSearchTerm] = useState('')
  const [showSpeciesDropdown, setShowSpeciesDropdown] = useState(false)
  const [layers, setLayers] = useState(mapLayerConfig)
  const [showLayerControl, setShowLayerControl] = useState(true) // 默认展开
  const [showLegend, setShowLegend] = useState(true) // 图例默认展开
  const [selectedPoint, setSelectedPoint] = useState<typeof infraredCameraMapPoints[0] | null>(null)

  const filteredSpecies = speciesListForFilter.filter(s => s.name.toLowerCase().includes(speciesSearchTerm.toLowerCase()))

  const filteredHeatmapPoints = useMemo(() => {
    if (selectedSpecies === 'all') return heatmapPointsData
    return heatmapPointsData.filter(p => p.species === selectedSpecies)
  }, [selectedSpecies])

  const selectedSpeciesName = speciesListForFilter.find(s => s.id === selectedSpecies)?.name || '全部物种'

  return (
    <div className="bg-white rounded-lg shadow-sm border border-green-100 h-full flex flex-col overflow-hidden">
      {/* 地图头部 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white flex-shrink-0">
        <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-600" />
          监测成果地图
        </h3>
        <div className="flex items-center gap-3">
          {/* 物种筛选 - 标签和下拉框在同一行 */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">物种筛选</span>
            <div className="relative">
              <button onClick={() => setShowSpeciesDropdown(!showSpeciesDropdown)} className="flex items-center justify-between gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs hover:bg-gray-100 transition-colors min-w-[100px]">
                <span className="truncate">{selectedSpeciesName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showSpeciesDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showSpeciesDropdown && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-48 max-h-60 overflow-hidden">
                  <div className="p-2 border-b border-gray-100">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                      <input type="text" placeholder="搜索物种..." value={speciesSearchTerm} onChange={(e) => setSpeciesSearchTerm(e.target.value)} className="w-full pl-6 pr-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-green-500" />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredSpecies.map((species) => (
                      <button key={species.id} onClick={() => { setSelectedSpecies(species.id); setShowSpeciesDropdown(false); setSpeciesSearchTerm('') }} className={`w-full px-3 py-1.5 text-left text-xs hover:bg-green-50 transition-colors ${selectedSpecies === species.id ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}>
                        <div className="font-medium">{species.name}</div>
                        {species.latinName && <div className="text-gray-400 italic text-xs">{species.latinName}</div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button onClick={onFullscreen} className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-green-50 rounded transition-colors">
            <Maximize2 className="w-3.5 h-3.5" />
            全屏
          </button>
        </div>
      </div>

      {/* 地图主体 */}
      <div className="flex-1 relative bg-gradient-to-br from-green-50 to-blue-50">
        {/* 地图背景图片 */}
        <img src="/生多综合展示用地图.png" alt="监测地图" className="absolute inset-0 w-full h-full object-cover opacity-60" />

        {/* 热力图层 */}
        <div className="absolute inset-0 pointer-events-none">
          {filteredHeatmapPoints.map((point) => {
            const left = ((point.lng - 115.90) / 0.10) * 100
            const top = ((39.81 - point.lat) / 0.06) * 100
            return (
              <div
                key={point.id}
                className="absolute rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${20 + point.intensity * 30}px`,
                  height: `${20 + point.intensity * 30}px`,
                  background: `radial-gradient(circle, rgba(239, 68, 68, ${point.intensity * 0.6}) 0%, rgba(239, 68, 68, 0) 70%)`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )
          })}
        </div>

        {/* 相机点位层 - 使用综合展示界面的图标样式 */}
        {layers.cameraPoints.visible && (
          <div className="absolute inset-0">
            {infraredCameraMapPoints.map((point) => (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: point.left, top: point.top }}
                onClick={() => setSelectedPoint(point)}
              >
                {/* 橙色方块图标 - 与综合展示界面一致 */}
                <div className={`w-6 h-6 rounded-md border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform ${
                  point.status === '监测中' ? 'bg-orange-500' : 'bg-gray-400'
                }`}>
                  <Camera className="w-3 h-3 text-white" />
                </div>
                {/* 悬浮提示 */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {point.pointCode} - {point.status}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 图层控制 - 左下角，可展开收起 */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <button onClick={() => setShowLayerControl(!showLayerControl)} className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-green-600" />
                图层控制
              </div>
              {showLayerControl ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
            </button>
            {showLayerControl && (
              <div className="p-2 space-y-1.5">
                {Object.entries(layers).map(([key, layer]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={layer.visible} onChange={(e) => setLayers({ ...layers, [key]: { ...layer, visible: e.target.checked } })} className="w-3.5 h-3.5 rounded border-gray-300 text-green-500 focus:ring-green-500" />
                    <span className="text-xs text-gray-600">{layer.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 图例 - 右下角，显示热力图颜色与数值对应关系 */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <button onClick={() => setShowLegend(!showLegend)} className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-green-600" />
                图例
              </div>
              {showLegend ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
            </button>
            {showLegend && (
              <div className="p-3">
                {/* 热力图图例 */}
                <div className="mb-3">
                  <div className="text-xs text-gray-500 mb-2">物种分布热力图</div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-400">低</span>
                    <div className="flex-1 h-3 rounded" style={{ background: 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.7), rgba(239, 68, 68, 1))' }}></div>
                    <span className="text-xs text-gray-400">高</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>0.5</span>
                    <span>1.0</span>
                  </div>
                </div>
                {/* 红外相机图标 */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-orange-500 rounded border-2 border-white shadow flex items-center justify-center">
                    <Camera className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">红外相机点位</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 点位详情弹窗 */}
      {selectedPoint && <PointDetailModal point={selectedPoint} onClose={() => setSelectedPoint(null)} />}
    </div>
  )
}

// 全屏地图弹窗
function FullscreenMapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[95vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
          <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            红外相机监测成果地图 - 全屏
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <AchievementMap onFullscreen={() => {}} />
        </div>
      </div>
    </div>
  )
}

// 主组件
export function InfraredAchievementDisplay() {
  const [showFullscreenMap, setShowFullscreenMap] = useState(false)

  return (
    <div className="h-full flex flex-col gap-3 p-4 overflow-hidden bg-gray-50">
      {/* 顶部统计卡片 */}
      <div className="grid grid-cols-6 gap-3 flex-shrink-0">
        <StatCard icon={MapPin} label="监测点位数" value={achievementStatsData.monitoringPoints} unit="个" color="bg-gradient-to-br from-blue-400 to-blue-600" />
        <StatCard icon={Camera} label="拍摄照片数" value={achievementStatsData.totalPhotos} unit="张" color="bg-gradient-to-br from-purple-400 to-purple-600" />
        <StatCard icon={CheckCircle} label="有效照片数" value={achievementStatsData.validPhotos} unit="张" color="bg-gradient-to-br from-green-400 to-green-600" />
        <StatCard icon={Target} label="独立有效探测" value={achievementStatsData.independentDetections} unit="次" color="bg-gradient-to-br from-cyan-400 to-cyan-600" />
        <StatCard icon={Leaf} label="物种数" value={achievementStatsData.speciesCount} unit="种" color="bg-gradient-to-br from-emerald-400 to-emerald-600" />
        <StatCard icon={Star} label="明星物种" value={achievementStatsData.starSpecies} color="bg-gradient-to-br from-amber-400 to-amber-600" />
      </div>

      {/* 下部分：地图 + 图表 */}
      <div className="flex-1 flex gap-3 overflow-hidden min-h-0">
        <div className="w-1/2 flex flex-col min-h-0">
          <AchievementMap onFullscreen={() => setShowFullscreenMap(true)} />
        </div>
        <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-3 min-h-0">
          <SpeciesStatisticsChart />
          <SpeciesRichnessChart />
          <MonthlyActivityChart />
          <DailyActivityChart />
        </div>
      </div>

      <FullscreenMapModal isOpen={showFullscreenMap} onClose={() => setShowFullscreenMap(false)} />
    </div>
  )
}
