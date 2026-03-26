'use client'

import { useState } from 'react'
import { Video } from 'lucide-react'
import { surveillanceCameras } from '@/data/humanActivityData'

// 全屏视频播放弹窗组件
export function FullscreenVideoModal({
  camera,
  onClose
}: {
  camera: typeof surveillanceCameras[0]
  onClose: () => void
}) {
  const [zoom, setZoom] = useState(1)
  const now = new Date()
  const timeStr = now.toLocaleString('zh-CN', { 
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900/80 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400" />
            {camera.name} - {camera.location}
          </h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${camera.status === '在线' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className={`text-sm ${camera.status === '在线' ? 'text-green-400' : 'text-red-400'}`}>{camera.status}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{timeStr}</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 主内容区域 */}
      <div className="flex-1 flex">
        {/* 视频区域 */}
        <div className="flex-1 relative bg-slate-950 flex items-center justify-center">
          {/* 模拟视频画面 */}
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
            <Video className="w-24 h-24 text-slate-600" />
            
            {/* 实时标识 */}
            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              实时
            </div>
            
            {/* 缩放比例显示 */}
            <div className="absolute bottom-4 left-4 text-white/60 text-sm">
              缩放: {Math.round(zoom * 100)}%
            </div>
          </div>
        </div>
        
        {/* 右侧控制面板 */}
        <div className="w-72 bg-slate-900 border-l border-slate-700 flex flex-col">
          {/* 设备信息 */}
          <div className="p-4 border-b border-slate-700">
            <h4 className="text-sm font-medium text-white mb-3">设备信息</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">设备名称</span>
                <span className="text-white">{camera.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">监测点位</span>
                <span className="text-white">{camera.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">分辨率</span>
                <span className="text-white">{camera.resolution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">拍摄方向</span>
                <span className="text-white">{camera.direction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">拍摄角度</span>
                <span className="text-white">{camera.angle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">经纬度</span>
                <span className="text-white text-xs">{camera.lat}°N, {camera.lng}°E</span>
              </div>
            </div>
          </div>
          
          {/* 云台控制 */}
          <div className="p-4 border-b border-slate-700">
            <h4 className="text-sm font-medium text-white mb-3">摄像头控制</h4>
            {/* 方向控制 */}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2">方向控制</div>
              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <button className="py-2 bg-slate-700 hover:bg-slate-600 rounded text-gray-200 transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <div></div>
                <button className="py-2 bg-slate-700 hover:bg-slate-600 rounded text-gray-200 transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="py-2 bg-cyan-600 hover:bg-cyan-500 rounded text-gray-200 transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button className="py-2 bg-slate-700 hover:bg-slate-600 rounded text-gray-200 transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div></div>
                <button className="py-2 bg-slate-700 hover:bg-slate-600 rounded text-gray-200 transition-colors">
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div></div>
              </div>
            </div>
            
            {/* 焦距调整 */}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2">焦距调整</div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setZoom(Math.max(1, zoom - 0.2))}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded text-gray-200 transition-colors text-sm"
                >
                  - 缩小
                </button>
                <div className="w-16 text-center text-white text-sm">{Math.round(zoom * 100)}%</div>
                <button 
                  onClick={() => setZoom(Math.min(4, zoom + 0.2))}
                  className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded text-gray-200 transition-colors text-sm"
                >
                  + 放大
                </button>
              </div>
            </div>
            
            {/* 快捷操作 */}
            <div>
              <div className="text-xs text-gray-400 mb-2">快捷操作</div>
              <div className="space-y-2">
                <button className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm text-white flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  截屏
                </button>
                <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-gray-200 flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  录像
                </button>
              </div>
            </div>
          </div>
          
          {/* 预置位 */}
          <div className="flex-1 p-4 overflow-auto">
            <h4 className="text-sm font-medium text-white mb-3">预置位</h4>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <button key={i} className="w-full py-2 bg-slate-700/50 hover:bg-slate-600 rounded text-sm text-gray-300 transition-colors text-left px-3">
                  预置位 {i}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
