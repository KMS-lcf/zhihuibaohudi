'use client'

import { Map, Video } from 'lucide-react'
import { surveillanceCameras } from '@/data/humanActivityData'

// 全屏地图弹窗组件
export function FullscreenMapModal({
  cameras,
  onCameraClick,
  onClose
}: {
  cameras: typeof surveillanceCameras
  onCameraClick: (camera: typeof surveillanceCameras[0]) => void
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-slate-900 z-[100] flex flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900/80 border-b border-slate-700 flex-shrink-0">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <Map className="w-5 h-5 text-cyan-400" />
          监控分布总览
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-400">在线: {cameras.filter(c => c.status === '在线').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-400">离线: {cameras.filter(c => c.status === '离线').length}</span>
          </div>
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
      
      {/* 地图区域 */}
      <div className="flex-1 relative bg-gradient-to-br from-green-900/30 via-slate-900 to-cyan-900/30">
        {/* 保护区范围 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 rounded-full border-2 border-green-500/30 border-dashed flex items-center justify-center bg-green-500/5">
            <div className="w-72 h-72 rounded-full border-2 border-orange-500/30 border-dashed flex items-center justify-center bg-orange-500/5">
              <div className="w-48 h-48 rounded-full border-2 border-red-400/50 bg-red-400/10 flex items-center justify-center">
                <span className="text-lg text-red-300">核心区</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 监控点位 */}
        {cameras.map(camera => (
          <div
            key={camera.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: camera.top, left: camera.left }}
            onClick={() => onCameraClick(camera)}
          >
            <div className={`w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 ${
              camera.status === '在线' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <Video className="w-5 h-5 text-white" />
            </div>
            {/* 悬浮提示 */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800/95 px-3 py-2 rounded text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              <div className="font-medium">{camera.name}</div>
              <div className="text-xs text-gray-400">{camera.location}</div>
              <div className="text-xs text-cyan-400 mt-1">点击查看实时画面</div>
            </div>
          </div>
        ))}
        
        {/* 图例 */}
        <div className="absolute bottom-6 left-6 bg-slate-800/90 rounded-lg px-4 py-3">
          <div className="text-sm text-gray-300 mb-2">图例</div>
          <div className="flex items-center gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">在线设备</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-300">离线设备</span>
            </div>
          </div>
        </div>
        
        {/* 区域图例 */}
        <div className="absolute bottom-6 right-6 bg-slate-800/90 rounded-lg px-4 py-3">
          <div className="text-sm text-gray-300 mb-2">区域划分</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400/50 rounded-full border border-red-400"></div>
              <span className="text-sm text-gray-300">核心区</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400/50 rounded-full border border-orange-400"></div>
              <span className="text-sm text-gray-300">缓冲区</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400/50 rounded-full border border-green-400"></div>
              <span className="text-sm text-gray-300">实验区</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
