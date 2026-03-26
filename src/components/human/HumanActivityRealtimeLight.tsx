'use client'

import { useState } from 'react'
import { Video, Map, TrendingUp } from 'lucide-react'
import { surveillanceCameras, humanActivityStatsData } from '@/data/humanActivityData'

// 视频监控小窗口组件 - 白天模式
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
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-green-400 transition-colors group shadow-sm hover:shadow-md">
      <div className="relative aspect-video bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <Video className="w-8 h-8 text-gray-400" />
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${camera.status === '在线' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-700 bg-white/90 px-1.5 py-0.5 rounded shadow-sm">{camera.status}</span>
        </div>
        <div className="absolute top-2 right-2 text-xs text-gray-600 bg-white/90 px-1.5 py-0.5 rounded shadow-sm">{timeStr}</div>
        <button
          onClick={onFullscreen}
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600 text-white p-1.5 rounded shadow-sm"
          title="全屏播放"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        <div className="absolute bottom-2 left-2 text-xs text-gray-700 bg-white/90 px-1.5 py-0.5 rounded shadow-sm">{camera.name}</div>
      </div>
    </div>
  )
}

// 视频监控网格组件 - 白天模式
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
    <div className="h-full flex flex-col bg-gray-50">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200 flex-shrink-0">
        <h3 className="text-base font-medium text-gray-800 flex items-center gap-2">
          <Video className="w-5 h-5 text-green-600" />
          视频监控
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">在线设备:</span>
            <span className="text-green-600 font-medium">{cameras.filter(c => c.status === '在线').length}/{cameras.length}</span>
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded">
            {[1, 2, 3].map(cols => (
              <button
                key={cols}
                onClick={() => setGridCols(cols)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === cols ? 'bg-green-500 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`}
                title={`一行${cols}视频`}
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {cols === 1 && <rect x="2" y="3" width="12" height="10" rx="1" />}
                  {cols === 2 && <><rect x="1" y="3" width="6" height="10" rx="1" /><rect x="9" y="3" width="6" height="10" rx="1" /></>}
                  {cols === 3 && <><rect x="0.5" y="3" width="4.5" height="10" rx="1" /><rect x="5.75" y="3" width="4.5" height="10" rx="1" /><rect x="11" y="3" width="4.5" height="10" rx="1" /></>}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 p-3 overflow-auto">
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
          {cameras.map(camera => <VideoMonitorCard key={camera.id} camera={camera} onFullscreen={() => onFullscreen(camera)} />)}
        </div>
      </div>
    </div>
  )
}

// 监控分布地图组件 - 白天模式
function MonitorDistributionMap({ cameras, onCameraClick }: { cameras: typeof surveillanceCameras; onCameraClick: (camera: typeof surveillanceCameras[0]) => void }) {
  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 flex-shrink-0">
        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2"><Map className="w-4 h-4 text-green-600" />监控分布</h4>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img src="/human-activity-map-bg.png" alt="监控分布地图" className="absolute inset-0 w-full h-full object-cover" />
        {cameras.map(camera => (
          <div key={camera.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group" style={{ top: camera.top, left: camera.left }} onClick={() => onCameraClick(camera)}>
            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 ${camera.status === '在线' ? 'bg-green-500' : 'bg-red-500'}`}>
              <Video className="w-3 h-3 text-white" />
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-lg text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none border border-gray-100">{camera.name} - {camera.location}</div>
          </div>
        ))}
        <div className="absolute bottom-2 left-2 bg-white/95 rounded px-2 py-1.5 text-xs shadow-sm border border-gray-100">
          <div className="text-gray-500 mb-1 font-medium">图例</div>
          <div className="flex items-center gap-2 mb-0.5"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-gray-600">在线</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span className="text-gray-600">离线</span></div>
        </div>
      </div>
    </div>
  )
}

// 人类活动统计图表组件 - 白天模式
function HumanActivityChart({ data }: { data: typeof humanActivityStatsData.daily }) {
  const maxValue = Math.max(...data.map(d => d.intrusion + d.vehicle + d.other))
  return (
    <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-center gap-4 py-2 flex-shrink-0 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-500 rounded"></div><span className="text-xs text-gray-600">非法闯入</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-blue-500 rounded"></div><span className="text-xs text-gray-600">车辆进入</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-amber-500 rounded"></div><span className="text-xs text-gray-600">其他</span></div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-2 border-b border-gray-100 flex-shrink-0">
        <div className="bg-red-50 rounded p-1.5 text-center border border-red-100"><div className="text-base font-bold text-red-600">{data.reduce((sum, d) => sum + d.intrusion, 0)}</div><div className="text-xs text-gray-500">非法闯入</div></div>
        <div className="bg-blue-50 rounded p-1.5 text-center border border-blue-100"><div className="text-base font-bold text-blue-600">{data.reduce((sum, d) => sum + d.vehicle, 0)}</div><div className="text-xs text-gray-500">车辆进入</div></div>
        <div className="bg-amber-50 rounded p-1.5 text-center border border-amber-100"><div className="text-base font-bold text-amber-600">{data.reduce((sum, d) => sum + d.other, 0)}</div><div className="text-xs text-gray-500">其他</div></div>
      </div>
      <div className="flex-1 p-2 overflow-auto">
        <div className="space-y-2">
          {data.map((item, index) => {
            const total = item.intrusion + item.vehicle + item.other
            return (
              <div key={index}>
                <div className="text-xs text-gray-500 mb-1 truncate">{item.camera}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden flex">
                    {item.intrusion > 0 && <div className="h-full bg-red-500 transition-all" style={{ width: `${(item.intrusion / maxValue) * 100}%` }} />}
                    {item.vehicle > 0 && <div className="h-full bg-blue-500 transition-all" style={{ width: `${(item.vehicle / maxValue) * 100}%` }} />}
                    {item.other > 0 && <div className="h-full bg-amber-500 transition-all" style={{ width: `${(item.other / maxValue) * 100}%` }} />}
                  </div>
                  <span className="text-xs text-gray-600 w-8 text-right font-medium">{total}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// 主界面组件 - 白天模式
export function HumanActivityRealtimeLight() {
  const [gridCols, setGridCols] = useState(2)
  const [selectedCamera, setSelectedCamera] = useState<typeof surveillanceCameras[0] | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  const currentStatsData = humanActivityStatsData[period]
  const handleOpenVideo = (camera: typeof surveillanceCameras[0]) => { setSelectedCamera(camera); setShowVideoModal(true) }

  return (
    <div className="h-full flex bg-gray-100 overflow-hidden">
      <div className="w-3/5 border-r border-gray-200">
        <VideoMonitorGrid cameras={surveillanceCameras} gridCols={gridCols} setGridCols={setGridCols} onFullscreen={handleOpenVideo} />
      </div>
      <div className="w-2/5 flex flex-col p-2 gap-2">
        <div className="h-1/2"><MonitorDistributionMap cameras={surveillanceCameras} onCameraClick={handleOpenVideo} /></div>
        <div className="h-1/2 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 flex-shrink-0">
            <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-600" />人类活动统计</h4>
            <div className="flex gap-1">
              {(['daily', 'weekly', 'monthly'] as const).map(p => (
                <button key={p} onClick={() => setPeriod(p)} className={`px-2 py-0.5 text-xs rounded transition-colors ${period === p ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p === 'daily' ? '日' : p === 'weekly' ? '周' : '月'}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-hidden"><HumanActivityChart data={currentStatsData} /></div>
        </div>
      </div>
      {showVideoModal && selectedCamera && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-8" onClick={() => setShowVideoModal(false)}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${selectedCamera.status === '在线' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <h3 className="text-lg font-medium text-gray-800">{selectedCamera.name}</h3>
                <span className="text-sm text-gray-500">{selectedCamera.location}</span>
              </div>
              <button onClick={() => setShowVideoModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">实时视频流</p>
              </div>
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded text-sm flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>实时</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
