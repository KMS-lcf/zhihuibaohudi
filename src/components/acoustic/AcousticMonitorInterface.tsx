'use client'

import { useState, useMemo } from 'react'
import { Mic, Database, Map, Activity, BarChart3 } from 'lucide-react'
import {
  acousticMonitorDevices,
  acousticMonitorPoints,
  acousticMonitorTabs,
  birdOrderBySpecies,
  birdFamilyBySpecies,
  discoveredSpeciesByDevice,
  generateAcousticTrendData
} from '@/data/acousticMonitorData'

// 环形图组件
function DonutChart({ data, activeType }: { data: { name: string; count: number; color: string }[]; activeType: 'order' | 'family' }) {
  const total = data.reduce((sum, item) => sum + item.count, 0)
  
  // 预计算每个扇形的角度信息
  const segments = useMemo(() => {
    const result: { startAngle: number; endAngle: number; color: string; name: string; count: number }[] = []
    let currentAngle = 0
    
    data.forEach(item => {
      const percentage = item.count / total
      const angle = percentage * 360
      result.push({
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        color: item.color,
        name: item.name,
        count: item.count
      })
      currentAngle += angle
    })
    
    return result
  }, [data, total])
  
  return (
    <div className="flex items-center justify-center gap-4">
      <svg viewBox="0 0 120 120" className="w-36 h-36">
        {segments.map((segment, index) => {
          // 转换为弧度
          const startRad = (segment.startAngle - 90) * Math.PI / 180
          const endRad = (segment.endAngle - 90) * Math.PI / 180
          
          // 计算圆弧路径
          const x1 = 60 + 45 * Math.cos(startRad)
          const y1 = 60 + 45 * Math.sin(startRad)
          const x2 = 60 + 45 * Math.cos(endRad)
          const y2 = 60 + 45 * Math.sin(endRad)
          
          const angle = segment.endAngle - segment.startAngle
          const largeArc = angle > 180 ? 1 : 0
          
          return (
            <path
              key={index}
              d={`M 60 60 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={segment.color}
              stroke="white"
              strokeWidth="1"
            />
          )
        })}
        {/* 中心圆 */}
        <circle cx="60" cy="60" r="25" fill="white" />
        <text x="60" y="55" textAnchor="middle" className="text-xs fill-gray-500">
          {activeType === 'order' ? '目' : '科'}
        </text>
        <text x="60" y="72" textAnchor="middle" className="text-sm font-bold fill-gray-700">
          {data.length}
        </text>
      </svg>
      
      {/* 图例 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        {data.slice(0, 8).map((item, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
            <span className="text-gray-600 truncate">{item.name}</span>
            <span className="text-gray-400 ml-auto">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 横向柱形图组件
function HorizontalBarChart({ data }: { data: { name: string; count: number }[] }) {
  const maxCount = Math.max(...data.map(d => d.count))
  
  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-xs text-gray-600 w-20 truncate text-right">{item.name}</span>
          <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded transition-all duration-500"
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium">
              {item.count}次
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// 声纹监测主界面组件
export function AcousticMonitorInterface() {
  const [activeTab, setActiveTab] = useState('realtime')
  const [selectedDevice, setSelectedDevice] = useState<typeof acousticMonitorDevices[0] | null>(null)
  const [showDeviceModal, setShowDeviceModal] = useState(false)
  
  // 物种统计切换
  const [speciesStatsType, setSpeciesStatsType] = useState<'order' | 'family'>('order')
  
  // 发现物种设备筛选
  const [selectedDeviceFilter, setSelectedDeviceFilter] = useState('全部')
  
  // 生成24小时趋势数据
  const acousticTrendData = useMemo(() => generateAcousticTrendData(), [])
  
  // 获取当前设备的发现物种数据
  const currentDiscoveredSpecies = discoveredSpeciesByDevice[selectedDeviceFilter] || discoveredSpeciesByDevice['全部']
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 页签切换 */}
      <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-green-100 flex-shrink-0">
        {acousticMonitorTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 实时监测页签 */}
      {activeTab === 'realtime' && (
        <div className="flex-1 flex gap-4 px-4 pt-4 pb-1 overflow-hidden">
          {/* 左侧地图区域 */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden relative flex flex-col">
            {/* 地图主体 */}
            <div className="flex-1 relative overflow-hidden">
              {/* 地图背景图片 */}
              <img
                src="/video-monitor-map-bg.png"
                alt="声纹监测分布图"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 监测设备点位 */}
              {acousticMonitorPoints.map((point) => (
                <div
                  key={point.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ top: point.top, left: point.left }}
                  onClick={() => {
                    setSelectedDevice(point.device)
                    setShowDeviceModal(true)
                  }}
                >
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                    point.device.status === '在线' ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    <Mic className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-white/95 px-2 py-0.5 rounded shadow-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {point.device.pointName} - {point.device.name}
                  </div>
                </div>
              ))}

              {/* 图例 */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                <div className="text-sm font-medium text-gray-700 mb-2">图例</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                    <span className="text-sm text-gray-600">在线设备</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full border border-white"></div>
                    <span className="text-sm text-gray-600">离线设备</span>
                  </div>
                </div>
              </div>

              {/* 左上角核心指标 */}
              <div className="absolute top-3 left-3 flex gap-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <div className="text-xs text-gray-500 mb-1">监测设备</div>
                  <div className="text-lg font-bold text-gray-800">{acousticMonitorDevices.length}<span className="text-sm font-normal text-gray-500 ml-1">台</span></div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <div className="text-xs text-gray-500 mb-1">监测物种</div>
                  <div className="text-lg font-bold text-green-600">{acousticMonitorDevices.reduce((s, d) => s + d.speciesCount, 0)}<span className="text-sm font-normal text-gray-500 ml-1">种</span></div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <div className="text-xs text-gray-500 mb-1">监测数据</div>
                  <div className="text-lg font-bold text-blue-600">{acousticMonitorDevices.reduce((s, d) => s + d.detectionCount, 0).toLocaleString()}<span className="text-sm font-normal text-gray-500 ml-1">条</span></div>
                </div>
              </div>
            </div>

            {/* 底部近24小时监测动态 - 折线图 */}
            <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-cyan-50 border-t border-green-100 p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  近24小时监测动态
                </h4>
                <div className="text-xs text-gray-500">
                  每30分钟更新一次
                </div>
              </div>
              <div className="relative h-28">
                {/* 折线图 SVG */}
                <svg className="w-full h-full" viewBox="0 0 960 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="acousticLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="acousticAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                  
                  {/* 横向网格线 */}
                  <line x1="0" y1="24" x2="960" y2="24" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4"/>
                  <line x1="0" y1="48" x2="960" y2="48" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4"/>
                  <line x1="0" y1="72" x2="960" y2="72" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4"/>
                  <line x1="0" y1="96" x2="960" y2="96" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4"/>
                  
                  {/* 填充区域 */}
                  <path
                    d={`M0,${120 - (acousticTrendData[0]?.count || 0) * 1.0} ${acousticTrendData.map((item, index) => {
                      const x = (index / (acousticTrendData.length - 1)) * 960
                      const y = 120 - item.count * 1.0
                      return `L${x},${y}`
                    }).join(' ')} L960,120 L0,120 Z`}
                    fill="url(#acousticAreaGradient)"
                  />
                  
                  {/* 折线 */}
                  <path
                    d={`M0,${120 - (acousticTrendData[0]?.count || 0) * 1.0} ${acousticTrendData.map((item, index) => {
                      const x = (index / (acousticTrendData.length - 1)) * 960
                      const y = 120 - item.count * 1.0
                      return `L${x},${y}`
                    }).join(' ')}`}
                    fill="none"
                    stroke="url(#acousticLineGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* 数据点 - 只显示部分关键点 */}
                  {acousticTrendData.filter((_, i) => i % 6 === 0).map((item, index, arr) => {
                    const actualIndex = index * 6
                    const x = (actualIndex / (acousticTrendData.length - 1)) * 960
                    const y = 120 - item.count * 1.0
                    return (
                      <g key={index}>
                        <circle cx={x} cy={y} r="4" fill="#22c55e" stroke="white" strokeWidth="2"/>
                      </g>
                    )
                  })}
                </svg>
                
                {/* Y轴刻度 */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 py-1">
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                </div>
                
                {/* X轴时间标签 */}
                <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-400">
                  {acousticTrendData.filter((_, i) => i % 6 === 0).map((item, index) => (
                    <span key={index}>{item.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧统计图板块 */}
          <div className="w-80 flex flex-col gap-3 flex-shrink-0">
            {/* 物种统计板块 */}
            <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex-shrink-0">
              <div className="px-4 py-2 bg-green-50 border-b border-green-100 flex items-center justify-between flex-shrink-0">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-600" />
                  物种统计
                </span>
                <div className="flex bg-gray-100 rounded-md p-0.5">
                  <button
                    onClick={() => setSpeciesStatsType('order')}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      speciesStatsType === 'order' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    目
                  </button>
                  <button
                    onClick={() => setSpeciesStatsType('family')}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      speciesStatsType === 'family' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    科
                  </button>
                </div>
              </div>
              <div className="p-4 flex justify-center">
                <DonutChart 
                  data={speciesStatsType === 'order' ? birdOrderBySpecies : birdFamilyBySpecies} 
                  activeType={speciesStatsType}
                />
              </div>
            </div>

            {/* 发现物种板块 */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex flex-col min-h-0">
              <div className="px-4 py-2 bg-green-50 border-b border-green-100 flex items-center justify-between flex-shrink-0">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  发现物种
                </span>
                <select
                  value={selectedDeviceFilter}
                  onChange={(e) => setSelectedDeviceFilter(e.target.value)}
                  className="text-xs bg-white border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="全部">全部设备</option>
                  {acousticMonitorDevices.map(device => (
                    <option key={device.id} value={device.name}>{device.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
                <HorizontalBarChart data={currentDiscoveredSpecies} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 监测数据页签 */}
      {activeTab === 'data' && (
        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 h-full">
            <div className="text-center text-gray-500 py-20">
              <Database className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>监测数据页面内容</p>
            </div>
          </div>
        </div>
      )}

      {/* 监测点位页签 */}
      {activeTab === 'points' && (
        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 h-full">
            <div className="text-center text-gray-500 py-20">
              <Map className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>监测点位页面内容</p>
            </div>
          </div>
        </div>
      )}

      {/* 监测设备页签 */}
      {activeTab === 'devices' && (
        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 h-full">
            <div className="text-center text-gray-500 py-20">
              <Mic className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>监测设备页面内容</p>
            </div>
          </div>
        </div>
      )}

      {/* 设备详情弹窗 */}
      {showDeviceModal && selectedDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeviceModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-[800px] max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-green-50">
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-green-600" />
                <span className="text-base font-medium text-gray-700">声纹监测 - {selectedDevice.pointName}</span>
              </div>
              <button onClick={() => setShowDeviceModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex">
              {/* 左侧波形区域 */}
              <div className="flex-1 p-4">
                <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center w-full px-4">
                      <div className="flex items-center justify-center gap-1 h-24">
                        {/* 模拟声波波形 */}
                        {Array.from({ length: 50 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-green-400 rounded-full animate-pulse"
                            style={{
                              height: `${Math.random() * 60 + 20}%`,
                              animationDelay: `${i * 0.05}s`,
                              opacity: 0.7 + Math.random() * 0.3
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm mt-4 block">实时声纹波形</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    实时
                  </div>
                  
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                    {new Date().toLocaleString('zh-CN')}
                  </div>
                </div>
                
                {/* AI识别结果 */}
                <div className="mt-3">
                  <div className="text-sm font-medium text-gray-700 mb-2">实时识别结果</div>
                  <div className="flex gap-2 flex-wrap">
                    <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                      <span className="text-green-700 font-medium">大山雀</span>
                      <span className="text-gray-500 text-sm ml-2">置信度: 95.2%</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                      <span className="text-green-700 font-medium">麻雀</span>
                      <span className="text-gray-500 text-sm ml-2">置信度: 88.7%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右侧设备信息 */}
              <div className="w-64 border-l border-gray-200 p-4 bg-gray-50">
                <div className="text-sm font-medium text-gray-700 mb-3">设备信息</div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">监测点名称</span>
                    <span className="text-sm text-gray-700 font-medium">{selectedDevice.pointName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">设备名称</span>
                    <span className="text-sm text-gray-700">{selectedDevice.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">设备状态</span>
                    <span className={`text-sm px-2 py-0.5 rounded ${
                      selectedDevice.status === '在线' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>{selectedDevice.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">经度</span>
                    <span className="text-sm text-gray-700">{selectedDevice.lng}°E</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">纬度</span>
                    <span className="text-sm text-gray-700">{selectedDevice.lat}°N</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">安装时间</span>
                    <span className="text-sm text-gray-700">{selectedDevice.installDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">安装地点</span>
                    <span className="text-sm text-gray-700">{selectedDevice.location}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="text-sm font-medium text-gray-700 mb-2">监测统计</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                        <div className="text-lg font-bold text-green-600">{selectedDevice.speciesCount}</div>
                        <div className="text-xs text-gray-500">鸟类种数</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                        <div className="text-lg font-bold text-blue-600">{selectedDevice.detectionCount}</div>
                        <div className="text-xs text-gray-500">数据条数</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
