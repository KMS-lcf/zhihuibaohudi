'use client'

import { useState, useEffect, useMemo } from 'react'
import { Video, BarChart3, Activity, Database, Map } from 'lucide-react'
import {
  imageMonitorDevices,
  imageMonitorPoints,
  latestDetections,
  speciesPool,
  detectedBirdsInVideo,
  generateMonitorTrendData,
  imageMonitorTabs
} from '@/data/videoMonitorData'

// 视频监测主界面组件
export function ImageMonitorInterface() {
  const [activeTab, setActiveTab] = useState('realtime')
  const [selectedDevice, setSelectedDevice] = useState<typeof imageMonitorDevices[0] | null>(null)
  const [showDeviceModal, setShowDeviceModal] = useState(false)
  
  // 实时监测动态列表状态
  const [detectionList, setDetectionList] = useState(latestDetections)
  const [newItemFlash, setNewItemFlash] = useState<number | null>(null) // 用于闪烁效果

  // 生成24小时趋势数据（使用useMemo避免重复生成）
  const monitorTrendData24Hours = useMemo(() => generateMonitorTrendData(), [])

  // 定时更新检测列表
  useEffect(() => {
    const interval = setInterval(() => {
      // 生成新的检测数据
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const randomDevice = imageMonitorDevices[Math.floor(Math.random() * imageMonitorDevices.length)]
      const randomSpecies = speciesPool[Math.floor(Math.random() * speciesPool.length)]
      const randomCount = Math.floor(Math.random() * 5) + 1
      
      const newItem = {
        time: `2024-03-15 ${hours}:${minutes}`,
        point: randomDevice.pointName,
        device: randomDevice.name,
        species: randomSpecies,
        count: randomCount
      }
      
      // 新数据插入顶部，移除底部数据
      setDetectionList(prev => [newItem, ...prev.slice(0, -1)])
      setNewItemFlash(Date.now())
      
      // 清除闪烁效果
      setTimeout(() => setNewItemFlash(null), 1000)
    }, 5000) // 每5秒更新一次

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 页签切换 */}
      <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-green-100 flex-shrink-0">
        {imageMonitorTabs.map((tab) => (
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
                alt="视频监测分布图"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 监测设备点位 */}
              {imageMonitorPoints.map((point) => (
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
                    <Video className="w-4 h-4 text-white" />
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
                  <div className="text-lg font-bold text-gray-800">{imageMonitorDevices.length}<span className="text-sm font-normal text-gray-500 ml-1">台</span></div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <div className="text-xs text-gray-500 mb-1">监测物种</div>
                  <div className="text-lg font-bold text-green-600">{imageMonitorDevices.reduce((s, d) => s + d.speciesCount, 0)}<span className="text-sm font-normal text-gray-500 ml-1">种</span></div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <div className="text-xs text-gray-500 mb-1">监测数据</div>
                  <div className="text-lg font-bold text-blue-600">{imageMonitorDevices.reduce((s, d) => s + d.detectionCount, 0).toLocaleString()}<span className="text-sm font-normal text-gray-500 ml-1">条</span></div>
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
                  {/* 背景网格线 */}
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
                    d={`M0,${120 - (monitorTrendData24Hours[0]?.count || 0) * 1.2} ${monitorTrendData24Hours.map((item, index) => {
                      const x = (index / (monitorTrendData24Hours.length - 1)) * 960
                      const y = 120 - item.count * 1.2
                      return `L${x},${y}`
                    }).join(' ')} L960,120 L0,120 Z`}
                    fill="url(#areaGradient)"
                  />
                  
                  {/* 折线 */}
                  <path
                    d={`M0,${120 - (monitorTrendData24Hours[0]?.count || 0) * 1.2} ${monitorTrendData24Hours.map((item, index) => {
                      const x = (index / (monitorTrendData24Hours.length - 1)) * 960
                      const y = 120 - item.count * 1.2
                      return `L${x},${y}`
                    }).join(' ')}`}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* 数据点 - 只显示部分关键点 */}
                  {monitorTrendData24Hours.filter((_, i) => i % 6 === 0).map((item, index, arr) => {
                    const actualIndex = index * 6
                    const x = (actualIndex / (monitorTrendData24Hours.length - 1)) * 960
                    const y = 120 - item.count * 1.2
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
                  {monitorTrendData24Hours.filter((_, i) => i % 6 === 0).map((item, index) => (
                    <span key={index}>{item.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧实时监测动态窗口 */}
          <div className="w-80 bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex flex-col flex-shrink-0">
            <div className="px-4 py-2 bg-green-50 border-b border-green-100 flex items-center gap-2 flex-shrink-0">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">实时监测动态</span>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {detectionList.map((item, index) => (
                <div 
                  key={`${item.time}-${index}`} 
                  className={`px-4 py-2 border-b border-gray-50 text-sm text-gray-600 hover:bg-gray-50 transition-all duration-300 ${
                    index === 0 && newItemFlash ? 'bg-green-100 animate-pulse' : ''
                  }`}
                >
                  <span className="text-gray-400">{item.time}</span>
                  <span className="mx-1">{item.point}（{item.device}）发现</span>
                  <span className="text-green-600 font-medium">{item.species}</span>
                  <span className="ml-1">{item.count}只</span>
                </div>
              ))}
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
              <Video className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>监测设备页面内容</p>
            </div>
          </div>
        </div>
      )}

      {/* 设备详情弹窗 */}
      {showDeviceModal && selectedDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeviceModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-green-50">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-green-600" />
                <span className="text-base font-medium text-gray-700">实时监测 - {selectedDevice.pointName}</span>
              </div>
              <button onClick={() => setShowDeviceModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex">
              {/* 左侧视频区域 */}
              <div className="flex-1 p-4">
                <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                      <span className="text-gray-400 text-sm">实时视频流</span>
                    </div>
                  </div>
                  
                  {/* AI识别标记框 */}
                  {detectedBirdsInVideo.map((bird) => (
                    <div
                      key={bird.id}
                      className="absolute border-2 border-green-400 rounded cursor-pointer"
                      style={{
                        left: `${bird.x}%`,
                        top: `${bird.y}%`,
                        width: `${bird.width}%`,
                        height: `${bird.height}%`
                      }}
                    >
                      <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                        {bird.name} {bird.confidence}%
                      </div>
                    </div>
                  ))}
                  
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
                  <div className="text-sm font-medium text-gray-700 mb-2">AI识别结果</div>
                  <div className="flex gap-2 flex-wrap">
                    {detectedBirdsInVideo.map((bird) => (
                      <div key={bird.id} className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                        <span className="text-green-700 font-medium">{bird.name}</span>
                        <span className="text-gray-500 text-sm ml-2">置信度: {bird.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 右侧设备信息 */}
              <div className="w-72 border-l border-gray-200 p-4 bg-gray-50">
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
                    <span className="text-sm text-gray-500">申报状态</span>
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
                    <div className="text-sm font-medium text-gray-700 mb-2">设备参数</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">分辨率</span>
                        <span className="text-sm text-gray-700">{selectedDevice.resolution}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">拍摄角度</span>
                        <span className="text-sm text-gray-700">{selectedDevice.angle}</span>
                      </div>
                    </div>
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
