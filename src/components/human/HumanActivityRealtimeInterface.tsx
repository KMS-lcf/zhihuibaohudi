'use client'

import { useState } from 'react'
import { Video, Map } from 'lucide-react'
import { surveillanceCameras, humanActivityStatsData } from '@/data/humanActivityData'
import { FullscreenVideoModal } from './FullscreenVideoModal'
import { FullscreenMapModal } from './FullscreenMapModal'

// 视频监控小窗口组件
function VideoMonitorCard({
  camera,
  onFullscreen
}: {
  camera: typeof surveillanceCameras[0]
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
        {/* 模拟视频画面 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-800 flex items-center justify-center">
          <Video className="w-8 h-8 text-slate-500" />
        </div>
        
        {/* 状态指示 */}
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${camera.status === '在线' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">{camera.status}</span>
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        
        {/* 设备名称 */}
        <div className="absolute bottom-2 left-2 text-xs text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
          {camera.name}
        </div>
      </div>
    </div>
  )
}

// 视频监控网格组件
function VideoMonitorGrid({
  cameras,
  gridCols,
  setGridCols,
  onFullscreen
}: {
  cameras: typeof surveillanceCameras
  gridCols: number
  setGridCols: (cols: number) => void
  onFullscreen: (camera: typeof surveillanceCameras[0]) => void
}) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 头部 - 标题和切换按钮在同一行 */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-cyan-900/30 flex-shrink-0">
        <h3 className="text-base font-medium text-cyan-400 flex items-center gap-2">
          <Video className="w-5 h-5" />
          视频监控
        </h3>
        <div className="flex items-center gap-4">
          {/* 在线设备显示 */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">在线设备:</span>
            <span className="text-cyan-400 font-medium">{cameras.filter(c => c.status === '在线').length}/{cameras.length}</span>
          </div>
          
          {/* 布局切换按钮 */}
          <div className="flex gap-1 bg-slate-700/50 p-1 rounded">
            {/* 一行一视频 */}
            <button
              onClick={() => setGridCols(1)}
              className={`p-1.5 rounded transition-colors relative ${
                gridCols === 1 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-600'
              }`}
              title="一行一视频"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="12" height="10" rx="1" />
              </svg>
            </button>
            {/* 一行两视频 */}
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded transition-colors relative ${
                gridCols === 2 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-600'
              }`}
              title="一行两视频"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="6" height="10" rx="1" />
                <rect x="9" y="3" width="6" height="10" rx="1" />
              </svg>
            </button>
            {/* 一行三视频 */}
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded transition-colors relative ${
                gridCols === 3 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-600'
              }`}
              title="一行三视频"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="0.5" y="3" width="4.5" height="10" rx="1" />
                <rect x="5.75" y="3" width="4.5" height="10" rx="1" />
                <rect x="11" y="3" width="4.5" height="10" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 视频网格 - 自定义滚动条样式 */}
      <div className="flex-1 p-3 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-thumb]:bg-cyan-500/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-cyan-500/60">
        <div 
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        >
          {cameras.map(camera => (
            <VideoMonitorCard
              key={camera.id}
              camera={camera}
              onFullscreen={() => onFullscreen(camera)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 监控分布地图组件
function MonitorDistributionMap({
  cameras,
  onCameraClick,
  onFullscreen
}: {
  cameras: typeof surveillanceCameras
  onCameraClick: (camera: typeof surveillanceCameras[0]) => void
  onFullscreen: () => void
}) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-cyan-900/30 shadow-lg">
      {/* 头部 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-900/30 flex-shrink-0">
        <h4 className="text-sm font-medium text-cyan-400">监控分布</h4>
        <button
          onClick={onFullscreen}
          className="text-gray-400 hover:text-cyan-400 transition-colors"
          title="全屏查看"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
      
      {/* 地图区域 */}
      <div className="flex-1 relative overflow-hidden">
        {/* 地图背景图片 */}
        <img
          src="/human-activity-map-bg.png"
          alt="监控分布地图"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* 监控点位 */}
        {cameras.map(camera => (
          <div
            key={camera.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: camera.top, left: camera.left }}
            onClick={() => onCameraClick(camera)}
          >
            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 ${
              camera.status === '在线' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <Video className="w-3 h-3 text-white" />
            </div>
            {/* 悬浮提示 */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800/95 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
              {camera.name} - {camera.location}
            </div>
          </div>
        ))}
        
        {/* 图例 */}
        <div className="absolute bottom-2 left-2 bg-slate-800/90 rounded px-2 py-1.5 text-xs shadow-lg">
          <div className="text-gray-400 mb-1">图例</div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">在线</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">离线</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 人类活动统计图表组件
function HumanActivityChart({
  data,
  period
}: {
  data: typeof humanActivityStatsData.daily
  period: 'daily' | 'weekly' | 'monthly'
}) {
  const maxValue = Math.max(...data.map(d => d.intrusion + d.vehicle + d.other))
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-cyan-900/30 shadow-lg">
      {/* 图例 */}
      <div className="flex items-center justify-center gap-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-xs text-gray-400">非法闯入</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-xs text-gray-400">车辆进入</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-amber-500 rounded"></div>
          <span className="text-xs text-gray-400">其他</span>
        </div>
      </div>
      
      {/* 统计汇总 */}
      <div className="grid grid-cols-3 gap-2 p-2 border-b border-cyan-900/30 flex-shrink-0">
        <div className="bg-slate-700/30 rounded p-1.5 text-center border border-slate-600/30">
          <div className="text-base font-bold text-red-400">
            {data.reduce((sum, d) => sum + d.intrusion, 0)}
          </div>
          <div className="text-xs text-gray-500">非法闯入</div>
        </div>
        <div className="bg-slate-700/30 rounded p-1.5 text-center border border-slate-600/30">
          <div className="text-base font-bold text-blue-400">
            {data.reduce((sum, d) => sum + d.vehicle, 0)}
          </div>
          <div className="text-xs text-gray-500">车辆进入</div>
        </div>
        <div className="bg-slate-700/30 rounded p-1.5 text-center border border-slate-600/30">
          <div className="text-base font-bold text-amber-400">
            {data.reduce((sum, d) => sum + d.other, 0)}
          </div>
          <div className="text-xs text-gray-500">其他</div>
        </div>
      </div>
      
      {/* 图表区域 - 自定义滚动条样式 */}
      <div className="flex-1 p-2 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-thumb]:bg-cyan-500/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-cyan-500/60">
        <div className="space-y-2">
          {data.map((item, index) => {
            const total = item.intrusion + item.vehicle + item.other
            const intrusionWidth = (item.intrusion / maxValue) * 100
            const vehicleWidth = (item.vehicle / maxValue) * 100
            const otherWidth = (item.other / maxValue) * 100
            
            return (
              <div key={index}>
                <div className="text-xs text-gray-400 mb-1 truncate">{item.camera}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-5 bg-slate-700/30 rounded overflow-hidden flex">
                    {/* 非法闯入 */}
                    {intrusionWidth > 0 && (
                      <div 
                        className="h-full bg-red-500 transition-all duration-300 cursor-pointer hover:brightness-110 group relative"
                        style={{ width: `${intrusionWidth}%` }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded whitespace-nowrap z-20 shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          非法闯入：{item.intrusion}
                        </div>
                      </div>
                    )}
                    {/* 车辆进入 */}
                    {vehicleWidth > 0 && (
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300 cursor-pointer hover:brightness-110 group relative"
                        style={{ width: `${vehicleWidth}%` }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded whitespace-nowrap z-20 shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          车辆进入：{item.vehicle}
                        </div>
                      </div>
                    )}
                    {/* 其他 */}
                    {otherWidth > 0 && (
                      <div 
                        className="h-full bg-amber-500 transition-all duration-300 cursor-pointer hover:brightness-110 group relative"
                        style={{ width: `${otherWidth}%` }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded whitespace-nowrap z-20 shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          其他：{item.other}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-300 w-8 text-right font-medium">{total}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 人类活动实时监控主界面组件
export function HumanActivityRealtimeInterface() {
  const [gridCols, setGridCols] = useState(2) // 默认一行两个视频
  const [selectedCamera, setSelectedCamera] = useState<typeof surveillanceCameras[0] | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showMapModal, setShowMapModal] = useState(false)
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  
  // 获取统计数据
  const currentStatsData = humanActivityStatsData[period]
  
  // 打开视频全屏
  const handleOpenVideo = (camera: typeof surveillanceCameras[0]) => {
    setSelectedCamera(camera)
    setShowVideoModal(true)
    setShowMapModal(false)
  }
  
  // 打开地图全屏
  const handleOpenMapFullscreen = () => {
    setShowMapModal(true)
  }
  
  // 关闭所有弹窗
  const handleCloseModals = () => {
    setShowVideoModal(false)
    setShowMapModal(false)
    setSelectedCamera(null)
  }

  return (
    <div className="h-full flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* 左侧视频监控区域 3/5 */}
      <div className="w-3/5 border-r border-cyan-900/30">
        <VideoMonitorGrid
          cameras={surveillanceCameras}
          gridCols={gridCols}
          setGridCols={setGridCols}
          onFullscreen={handleOpenVideo}
        />
      </div>
      
      {/* 右侧区域 2/5 */}
      <div className="w-2/5 flex flex-col">
        {/* 上半部分：监控分布 */}
        <div className="h-1/2 p-2">
          <MonitorDistributionMap
            cameras={surveillanceCameras}
            onCameraClick={handleOpenVideo}
            onFullscreen={handleOpenMapFullscreen}
          />
        </div>
        
        {/* 下半部分：人类活动统计 */}
        <div className="h-1/2 p-2 pt-0">
          <div className="h-full flex flex-col bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-cyan-900/30 shadow-lg">
            {/* 标题和周期切换 */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-900/30 flex-shrink-0">
              <h4 className="text-sm font-medium text-cyan-400">人类活动统计</h4>
              <div className="flex gap-1">
                {(['daily', 'weekly', 'monthly'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-2 py-0.5 text-xs rounded transition-colors ${
                      period === p 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                    }`}
                  >
                    {p === 'daily' ? '日' : p === 'weekly' ? '周' : '月'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 图表 */}
            <div className="flex-1 overflow-hidden">
              <HumanActivityChart data={currentStatsData} period={period} />
            </div>
          </div>
        </div>
      </div>
      
      {/* 全屏视频弹窗 */}
      {showVideoModal && selectedCamera && (
        <FullscreenVideoModal
          camera={selectedCamera}
          onClose={handleCloseModals}
        />
      )}
      
      {/* 全屏地图弹窗 */}
      {showMapModal && (
        <FullscreenMapModal
          cameras={surveillanceCameras}
          onCameraClick={handleOpenVideo}
          onClose={handleCloseModals}
        />
      )}
    </div>
  )
}
