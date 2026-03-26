'use client'

import { useState, useEffect } from 'react'
import { Map, Search, Layers, Camera, Activity, Video, BarChart3, ChevronDown, ChevronUp, Leaf, Database, ClipboardCheck, Target, Image, TreePine, Bird, Shield, Star } from 'lucide-react'
import { 
  yearOptions, 
  biodiversityCoreData, 
  plantResourceData, 
  animalResourceData, 
  protectedSpeciesData2,
  dominantPlantData,
  dominantAnimalData,
  typicalSpeciesData,
  speciesPoints,
  infraredCameraPoints,
  acousticMonitorPoints
} from '@/data/biodiversityData'
import { imageMonitorDevices } from '@/data/videoMonitorData'

export function BiodiversityOverviewInterface() {
  const [selectedYear, setSelectedYear] = useState('全部')
  const [dominantType, setDominantType] = useState<'plant' | 'animal'>('plant')
  const [deviceVisibility, setDeviceVisibility] = useState({
    infrared: true,
    acoustic: true,
    video: true
  })
  const [selectedDevice, setSelectedDevice] = useState<typeof imageMonitorDevices[0] | null>(null)
  const [showDeviceModal, setShowDeviceModal] = useState(false)

  // 视频监测点位（用于综合展示地图显示）
  const videoMonitorPoints = [
    { id: 1, top: '25%', left: '55%', device: imageMonitorDevices[0] },
    { id: 2, top: '50%', left: '30%', device: imageMonitorDevices[3] }
  ]

  return (
    <div className="h-full flex flex-col gap-4">
      {/* 顶部：时间控制器 + 统计卡片 */}
      <div className="flex items-center justify-between">
        {/* 时间控制器 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">统计年份：</span>
          <div className="flex gap-1">
            {yearOptions.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  selectedYear === year
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          数据更新时间：2024-03-15 14:30:00
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-6 gap-3">
        {biodiversityCoreData.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-green-100 p-3 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-gray-500">{item.label}</span>
              </div>
              <div className="text-lg font-bold text-gray-800">
                {typeof item.value === 'number' && item.value >= 1000 
                  ? item.value.toLocaleString() 
                  : item.value}
                <span className="text-sm font-normal text-gray-400 ml-1">{item.unit}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* 主体区域 - 一屏展示 */}
      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* 左侧地图区域 */}
        <div className="col-span-7 bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex flex-col">
          {/* 地图头部 */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white flex-shrink-0">
            <h3 className="text-base font-medium text-gray-700 flex items-center gap-2">
              <Map className="w-4 h-4 text-green-600" />
              生物多样性监测成果分布图
            </h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 hover:bg-green-50 rounded-md transition-colors border border-gray-200 bg-white">
                <Search className="w-3 h-3" />
                搜索添加物种
              </button>
            </div>
          </div>

          {/* 地图主体 */}
          <div className="flex-1 relative overflow-hidden">
            {/* 地图背景图片 */}
            <img
              src="/biodiversity-map-bg.png"
              alt="生物多样性监测成果分布图"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 物种分布点位 */}
            {speciesPoints.map((point) => (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: point.top, left: point.left }}
              >
                <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 ${
                  point.type === 'bird' ? 'bg-blue-500' :
                  point.type === 'mammal' ? 'bg-red-500' :
                  point.type === 'amphibian' ? 'bg-purple-500' :
                  'bg-green-500'
                }`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                {point.name && (
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-white/95 px-1.5 py-0.5 rounded shadow-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {point.name}
                  </div>
                )}
              </div>
            ))}

            {/* 红外相机点位 */}
            {deviceVisibility.infrared && infraredCameraPoints.map((point) => (
              <div
                key={`infrared-${point.id}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: point.top, left: point.left }}
              >
                <div className="w-6 h-6 bg-orange-500 rounded-md border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-3 h-3 text-white" />
                </div>
              </div>
            ))}

            {/* 声纹监测点位 */}
            {deviceVisibility.acoustic && acousticMonitorPoints.map((point) => (
              <div
                key={`acoustic-${point.id}`}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ top: point.top, left: point.left }}
              >
                <div className="w-6 h-6 bg-cyan-500 rounded-md border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-3 h-3 text-white" />
                </div>
              </div>
            ))}

            {/* 视频监测点位 */}
            {deviceVisibility.video && videoMonitorPoints.map((point) => (
              <div
                key={`video-${point.id}`}
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
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                  <span className="text-sm text-gray-600">鸟类</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                  <span className="text-sm text-gray-600">兽类</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full border border-white"></div>
                  <span className="text-sm text-gray-600">两栖类</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                  <span className="text-sm text-gray-600">其他物种</span>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-2 pt-2 grid grid-cols-3 gap-2">
                {deviceVisibility.infrared && (
                  <div className="flex items-center gap-1">
                    <Camera className="w-3 h-3 text-orange-500" />
                    <span className="text-sm text-gray-600">红外</span>
                  </div>
                )}
                {deviceVisibility.acoustic && (
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-cyan-500" />
                    <span className="text-sm text-gray-600">声纹</span>
                  </div>
                )}
                {deviceVisibility.video && (
                  <div className="flex items-center gap-1">
                    <Video className="w-3 h-3 text-green-500" />
                    <span className="text-sm text-gray-600">视频</span>
                  </div>
                )}
              </div>
            </div>

            {/* 设备控制器 */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
              <div className="text-sm font-medium text-gray-700 mb-2">监测设备显示</div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deviceVisibility.infrared}
                    onChange={(e) => setDeviceVisibility(prev => ({ ...prev, infrared: e.target.checked }))}
                    className="w-3.5 h-3.5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">红外相机 (4台)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deviceVisibility.acoustic}
                    onChange={(e) => setDeviceVisibility(prev => ({ ...prev, acoustic: e.target.checked }))}
                    className="w-3.5 h-3.5 text-cyan-500 rounded border-gray-300 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-600">声纹监测 (2套)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deviceVisibility.video}
                    onChange={(e) => setDeviceVisibility(prev => ({ ...prev, video: e.target.checked }))}
                    className="w-3.5 h-3.5 text-violet-500 rounded border-gray-300 focus:ring-violet-500"
                  />
                  <span className="text-sm text-gray-600">视频监测 (2套)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧监测成果统计大板块 */}
        <div className="col-span-5 bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex flex-col">
          {/* 大板块头部 */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white flex-shrink-0">
            <h3 className="text-base font-medium text-gray-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-green-600" />
              监测成果统计
            </h3>
          </div>

          {/* 统计图表内容区域 */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* 前4个统计图表 2×2排列 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* 植物资源统计 */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-green-600" />
                  植物资源统计
                </h4>
                <div className="space-y-1.5">
                  {plantResourceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-12 truncate">{item.name}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(item.value / Math.max(...plantResourceData.map(d => d.value))) * 100}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 w-6 text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-1.5 border-t border-gray-200 text-center">
                  <span className="text-xs text-gray-500">共计 </span>
                  <span className="text-sm font-bold text-green-600">{plantResourceData.reduce((s, i) => s + i.value, 0)}</span>
                  <span className="text-xs text-gray-500"> 种</span>
                </div>
              </div>

              {/* 动物资源统计 */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Bird className="w-4 h-4 text-blue-600" />
                  动物资源统计
                </h4>
                <div className="space-y-1.5">
                  {animalResourceData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="text-xs text-gray-600 w-10 truncate">{item.name}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(item.value / Math.max(...animalResourceData.map(d => d.value))) * 100}%`,
                            backgroundColor: item.color
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 w-6 text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-1.5 border-t border-gray-200 text-center">
                  <span className="text-xs text-gray-500">共计 </span>
                  <span className="text-sm font-bold text-blue-600">{animalResourceData.reduce((s, i) => s + i.value, 0)}</span>
                  <span className="text-xs text-gray-500"> 种</span>
                </div>
              </div>

              {/* 保护物种统计 */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-600" />
                  保护物种统计
                </h4>
                <div className="space-y-1.5">
                  {protectedSpeciesData2.map((item) => (
                    <div key={item.category} className="bg-white rounded p-1.5">
                      <div className="text-xs font-medium text-gray-700 mb-0.5">{item.category}</div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">植物：<span className="text-green-600 font-medium">{item.plants}</span>种</span>
                        <span className="text-gray-500">动物：<span className="text-blue-600 font-medium">{item.animals}</span>种</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-gray-200 text-center">
                  <span className="text-xs text-gray-500">共计 </span>
                  <span className="text-sm font-bold text-red-600">{protectedSpeciesData2.reduce((s, i) => s + i.plants + i.animals, 0)}</span>
                  <span className="text-xs text-gray-500"> 种</span>
                </div>
              </div>

              {/* 优势物种统计 */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-600" />
                    优势物种统计
                  </h4>
                  <select
                    value={dominantType}
                    onChange={(e) => setDominantType(e.target.value as 'plant' | 'animal')}
                    className="text-xs border border-gray-200 rounded px-1.5 py-0.5 text-gray-600 bg-white"
                  >
                    <option value="plant">植物</option>
                    <option value="animal">动物</option>
                  </select>
                </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {(dominantType === 'plant' ? dominantPlantData : dominantAnimalData).slice(0, 5).map((item, index) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-gray-400 w-3">{index + 1}</span>
                      <span className={`text-xs w-12 truncate ${dominantType === 'plant' ? 'text-green-700' : 'text-blue-700'}`}>
                        {item.name}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${dominantType === 'plant' ? 'bg-green-400' : 'bg-blue-400'}`}
                          style={{ width: `${(item.count / Math.max(...(dominantType === 'plant' ? dominantPlantData : dominantAnimalData).map(d => d.count))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 w-5 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 典型物种数量统计 */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-600" />
                典型物种数量统计
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {typicalSpeciesData.map((item) => (
                  <div key={item.name} className="bg-white rounded-lg p-2 border border-gray-100">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-gray-700">{item.name}</span>
                      {item.trend === 'up' && <span className="text-xs text-green-500">↑</span>}
                      {item.trend === 'down' && <span className="text-xs text-red-500">↓</span>}
                      {item.trend === 'stable' && <span className="text-xs text-gray-400">→</span>}
                    </div>
                    <div className="text-base font-bold text-gray-800">{item.count}</div>
                    <div className="text-xs text-gray-500">个体数量</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
