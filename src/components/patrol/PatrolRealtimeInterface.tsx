'use client'

import { useState } from 'react'
import { Image, Mic, FileText, X, Play } from 'lucide-react'
import { 
  patrolPersonnel, 
  patrolTrajectories, 
  patrolEventTypes, 
  patrolEvents, 
  geoLayers,
  eventFilterOptions 
} from '@/data/patrolData'

// ========== 巡护监管实时巡护界面 ==========
export function PatrolRealtimeInterface() {
  // 图层显示状态
  const [layerVisibility, setLayerVisibility] = useState<Record<string, boolean>>({
    boundary: true,
    core: true,
    buffer: true,
    experiment: true,
    trails: false,
    facilities: false,
  })
  
  // 弹窗状态
  const [selectedPersonnel, setSelectedPersonnel] = useState<typeof patrolPersonnel[0] | null>(null)
  const [selectedMarker, setSelectedMarker] = useState<{ type: string; description: string; time: string; duration?: string } | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<typeof patrolEvents[0] | null>(null)
  
  // 事件筛选
  const [eventFilter, setEventFilter] = useState('全部事件')
  
  // 实时事件列表
  const [eventList, setEventList] = useState(patrolEvents.slice().reverse())
  const [newEventFlash, setNewEventFlash] = useState<string | null>(null)
  
  // 切换图层显示
  const toggleLayer = (layerId: string) => {
    setLayerVisibility(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }))
  }
  
  // 获取巡护人员信息
  const getPersonnelById = (id: string) => patrolPersonnel.find(p => p.id === id)
  
  // 在线人数统计
  const onlineCount = patrolPersonnel.filter(p => p.isOnline).length
  
  // 总里程
  const totalDistance = patrolPersonnel.reduce((s, p) => s + p.todayDistance, 0)
  
  // 采集数据总数
  const totalReports = patrolPersonnel.reduce((s, p) => s + p.todayReports, 0)
  
  // 筛选后的事件
  const filteredEvents = eventFilter === '全部事件' 
    ? patrolEvents 
    : patrolEvents.filter(e => patrolEventTypes.find(t => t.id === e.type)?.name === eventFilter)
  
  // 点击事件列表项
  const handleEventClick = (event: typeof patrolEvents[0]) => {
    setSelectedEvent(event)
  }

  return (
    <div className="h-full relative overflow-hidden">
      {/* 地图底图 - 卫星遥感影像地图 */}
      <div className="absolute inset-0">
        <img 
          src="/map-bg.png" 
          alt="地图底图" 
          className="w-full h-full object-cover"
          style={{ objectFit: 'fill' }}
        />
      </div>
      
      {/* 地图主体内容层 */}
      <div className="absolute inset-0">
        {/* 保护区边界 */}
        {layerVisibility.boundary && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[500px] h-[380px] rounded-3xl border-2 border-green-500/40 border-dashed flex items-center justify-center bg-green-500/5">
              {/* 缓冲区 */}
              {layerVisibility.buffer && (
                <div className="w-[380px] h-[280px] rounded-2xl border-2 border-amber-500/40 border-dashed flex items-center justify-center bg-amber-500/5">
                  {/* 核心区 */}
                  {layerVisibility.core && (
                    <div className="w-[200px] h-[150px] rounded-xl bg-red-500/10 border-2 border-red-500/50 flex items-center justify-center">
                      <span className="text-sm text-red-400 font-medium">核心区</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* 巡护轨迹 */}
        {patrolTrajectories.map((trajectory) => {
          const personnel = getPersonnelById(trajectory.personnelId)
          return (
            <div key={trajectory.personnelId}>
              {/* 轨迹线 */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                <polyline
                  points={trajectory.points.map(p => {
                    const left = parseFloat(p.left) / 100 * 100
                    const top = parseFloat(p.top) / 100 * 100
                    return `${left}%,${top}%`
                  }).join(' ')}
                  fill="none"
                  stroke={trajectory.color}
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  opacity="0.8"
                />
              </svg>
              
              {/* 轨迹点 */}
              {trajectory.points.map((point, idx) => (
                <div
                  key={`${trajectory.personnelId}-point-${idx}`}
                  className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    top: point.top, 
                    left: point.left,
                    backgroundColor: trajectory.color,
                    zIndex: 6
                  }}
                />
              ))}
              
              {/* 轨迹上的标记点 */}
              {trajectory.markers.map((marker, idx) => (
                <div
                  key={`${trajectory.personnelId}-marker-${idx}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ top: marker.top, left: marker.left, zIndex: 10 }}
                  onClick={() => setSelectedMarker(marker)}
                >
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    style={{ backgroundColor: trajectory.color }}
                  >
                    {marker.type === 'photo' && <Image className="w-3 h-3 text-white" />}
                    {marker.type === 'audio' && <Mic className="w-3 h-3 text-white" />}
                    {marker.type === 'text' && <FileText className="w-3 h-3 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
        
        {/* 巡护人员位置 */}
        {patrolPersonnel.map((person) => (
          <div
            key={person.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: person.position.top, left: person.position.left, zIndex: 20 }}
            onClick={() => setSelectedPersonnel(person)}
          >
            {/* 头像 */}
            <div className={`relative w-10 h-10 rounded-full border-2 shadow-lg overflow-hidden ${person.isOnline ? 'border-green-400' : 'border-gray-400'}`}>
              <div className={`w-full h-full flex items-center justify-center text-white font-bold ${person.isOnline ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-gray-400 to-gray-600'}`}>
                {person.name.charAt(0)}
              </div>
              {/* 在线状态指示 */}
              {person.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
              )}
            </div>
            {/* 名字标签 */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-slate-900/80 rounded text-xs text-white whitespace-nowrap">
              {person.name}
            </div>
          </div>
        ))}
        
        {/* 巡护事件点位 */}
        {filteredEvents.map((event) => {
          const eventType = patrolEventTypes.find(t => t.id === event.type)!
          return (
            <div
              key={event.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: event.position.top, left: event.position.left, zIndex: 15 }}
              onClick={() => setSelectedEvent(event)}
            >
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center shadow-lg border-2 border-white text-sm"
                style={{ backgroundColor: eventType.color }}
              >
                {eventType.icon}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* 左侧悬浮面板 */}
      <div className="absolute top-4 left-4 bottom-4 w-64 flex flex-col gap-3 z-30">
        {/* 今日巡护板块 */}
        <div className="bg-slate-900/75 backdrop-blur-sm rounded-lg border border-green-500/30 overflow-hidden flex-shrink-0" style={{ height: '22%' }}>
          <div className="px-3 py-2 border-b border-green-500/20 bg-slate-800/50">
            <h3 className="text-sm font-medium text-green-300">今日巡护</h3>
          </div>
          <div className="p-3 grid grid-cols-3 gap-2 h-[calc(100%-40px)]">
            <div className="text-center flex flex-col justify-center">
              <div className="text-2xl font-bold text-green-300">{onlineCount}</div>
              <div className="text-xs text-green-400/80 mt-1">在线人数</div>
            </div>
            <div className="text-center flex flex-col justify-center">
              <div className="text-2xl font-bold text-emerald-300">{totalReports}</div>
              <div className="text-xs text-green-400/80 mt-1">采集数据</div>
            </div>
            <div className="text-center flex flex-col justify-center">
              <div className="text-2xl font-bold text-teal-300">{totalDistance.toFixed(1)}</div>
              <div className="text-xs text-green-400/80 mt-1">总里程/km</div>
            </div>
          </div>
        </div>
        
        {/* 上报事件板块 */}
        <div className="bg-slate-900/75 backdrop-blur-sm rounded-lg border border-green-500/30 overflow-hidden flex-1 flex flex-col">
          <div className="px-3 py-2 border-b border-green-500/20 bg-slate-800/50 flex items-center justify-between flex-shrink-0">
            <h3 className="text-sm font-medium text-green-300">上报事件</h3>
            <select 
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="text-xs bg-slate-700/80 border border-slate-600 rounded px-2 py-1 text-gray-200 focus:outline-none focus:border-green-400"
            >
              {eventFilterOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {eventList.map((event) => {
              const eventType = patrolEventTypes.find(t => t.id === event.type)!
              const isNew = newEventFlash === event.id
              return (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className={`p-2 rounded-lg cursor-pointer transition-all border ${
                    isNew 
                      ? 'bg-green-500/30 border-green-400/60 animate-pulse' 
                      : 'bg-slate-800/50 border-transparent hover:bg-slate-700/50 hover:border-green-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">{event.hourMinute}</span>
                    <span className="text-gray-100">{event.reporter}</span>
                    <span className="text-gray-500">上报了</span>
                    <span 
                      className="px-1.5 py-0.5 rounded text-xs"
                      style={{ backgroundColor: `${eventType.color}30`, color: eventType.color }}
                    >
                      {eventType.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* 右侧图层控制 */}
      <div className="absolute top-4 right-4 bg-slate-900/75 backdrop-blur-sm rounded-lg border border-green-500/30 p-3 z-30">
        <h3 className="text-sm font-medium text-green-300 mb-2">图层控制</h3>
        <div className="space-y-1.5">
          {geoLayers.map((layer) => (
            <label key={layer.id} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox"
                checked={layerVisibility[layer.id]}
                onChange={() => toggleLayer(layer.id)}
                className="w-4 h-4 rounded border-slate-500 text-green-500 focus:ring-green-400 focus:ring-offset-0 bg-slate-700/50"
              />
              <span className="text-sm text-gray-200">{layer.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* 图例 */}
      <div className="absolute bottom-4 right-4 bg-slate-900/75 backdrop-blur-sm rounded-lg border border-green-500/30 p-3 z-30">
        <h3 className="text-sm font-medium text-green-300 mb-2">图例</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">张</div>
            <span className="text-xs text-gray-200">在线人员</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold">赵</div>
            <span className="text-xs text-gray-200">离线人员</span>
          </div>
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-200">照片标记</span>
          </div>
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-gray-200">录音标记</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400" />
            <span className="text-xs text-gray-200">文字标记</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-green-500 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #22c55e 0, #22c55e 4px, transparent 4px, transparent 8px)' }}></div>
            <span className="text-xs text-gray-200">巡护轨迹</span>
          </div>
        </div>
      </div>
      
      {/* 巡护人员详情弹窗 */}
      {selectedPersonnel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedPersonnel(null)}>
          <div className="bg-slate-900/85 backdrop-blur-md rounded-xl border border-green-500/30 w-80 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20 bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold ${selectedPersonnel.isOnline ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-gray-400 to-gray-600'}`}>
                  {selectedPersonnel.name.charAt(0)}
                </div>
                <div>
                  <div className="text-gray-100 font-medium text-lg">{selectedPersonnel.name}</div>
                  <div className="text-sm text-gray-400">{selectedPersonnel.department}</div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${selectedPersonnel.isOnline ? 'bg-green-500/30 text-green-300' : 'bg-gray-500/30 text-gray-400'}`}>
                {selectedPersonnel.isOnline ? '在线' : '离线'}
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-green-500/20">
                  <div className="text-xl font-bold text-green-300">{selectedPersonnel.todayDistance}</div>
                  <div className="text-xs text-gray-400">今日巡护里程/km</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-emerald-500/20">
                  <div className="text-xl font-bold text-emerald-300">{selectedPersonnel.todayDuration}</div>
                  <div className="text-xs text-gray-400">今日巡护时长/h</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-teal-500/20">
                  <div className="text-xl font-bold text-teal-300">{selectedPersonnel.todayReports}</div>
                  <div className="text-xs text-gray-400">今日上报/条</div>
                </div>
              </div>
              <button 
                className="w-full mt-4 px-4 py-2 bg-green-600/30 text-green-300 rounded-lg hover:bg-green-600/40 transition-colors text-sm border border-green-500/30"
                onClick={() => setSelectedPersonnel(null)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 标记点详情弹窗 */}
      {selectedMarker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedMarker(null)}>
          <div className="bg-slate-900/85 backdrop-blur-md rounded-xl border border-green-500/30 w-96 overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20 bg-slate-800/50">
              <div className="flex items-center gap-2">
                {selectedMarker.type === 'photo' && <Image className="w-5 h-5 text-green-400" />}
                {selectedMarker.type === 'audio' && <Mic className="w-5 h-5 text-emerald-400" />}
                {selectedMarker.type === 'text' && <FileText className="w-5 h-5 text-teal-400" />}
                <span className="text-gray-100 font-medium">
                  {selectedMarker.type === 'photo' ? '照片记录' : selectedMarker.type === 'audio' ? '录音记录' : '文字记录'}
                </span>
              </div>
              <button onClick={() => setSelectedMarker(null)} className="text-gray-400 hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {selectedMarker.type === 'photo' && (
                <div className="bg-slate-800/50 rounded-lg aspect-video flex items-center justify-center mb-3 border border-green-500/20">
                  <Image className="w-12 h-12 text-gray-500" />
                </div>
              )}
              {selectedMarker.type === 'audio' && (
                <div className="bg-slate-800/50 rounded-lg p-4 mb-3 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </button>
                    <div className="flex-1">
                      <div className="h-1 bg-slate-700 rounded-full">
                        <div className="h-1 bg-green-500 rounded-full w-0"></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>00:00</span>
                        <span>{selectedMarker.duration || '00:00'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-sm text-gray-200 mb-2">{selectedMarker.description}</div>
              <div className="text-xs text-gray-400">记录时间: {selectedMarker.time}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* 事件详情弹窗 */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedEvent(null)}>
          <div className="bg-slate-900/85 backdrop-blur-md rounded-xl border border-green-500/30 w-[400px] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20 bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: patrolEventTypes.find(t => t.id === selectedEvent.type)?.color }}
                >
                  {patrolEventTypes.find(t => t.id === selectedEvent.type)?.icon}
                </div>
                <span className="text-gray-100 font-medium">{patrolEventTypes.find(t => t.id === selectedEvent.type)?.name}</span>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {/* 图片区域 */}
              <div className="bg-slate-800/50 rounded-lg aspect-video flex items-center justify-center mb-4 border border-green-500/20">
                <Image className="w-12 h-12 text-gray-500" />
              </div>
              
              {/* 根据事件类型显示不同内容 */}
              <div className="space-y-3">
                {selectedEvent.type === 'species' && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                    <span className="text-gray-400 text-sm">物种名称</span>
                    <span className="text-gray-100 text-sm">{selectedEvent.speciesName || '-'}</span>
                  </div>
                )}
                
                {(selectedEvent.type === 'human' || selectedEvent.type === 'disaster') && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                    <span className="text-gray-400 text-sm">干扰类型</span>
                    <span className="text-gray-100 text-sm">{selectedEvent.interferenceType || '-'}</span>
                  </div>
                )}
                
                {selectedEvent.type === 'pest' && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                    <span className="text-gray-400 text-sm">生物名称</span>
                    <span className="text-gray-100 text-sm">{selectedEvent.pestName || '-'}</span>
                  </div>
                )}
                
                {selectedEvent.type === 'fire' && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                    <span className="text-gray-400 text-sm">隐患类型</span>
                    <span className="text-gray-100 text-sm">{selectedEvent.hazardType || '-'}</span>
                  </div>
                )}
                
                {selectedEvent.type === 'device' && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                    <span className="text-gray-400 text-sm">巡检内容</span>
                    <span className="text-gray-100 text-sm">{selectedEvent.inspectionContent || '-'}</span>
                  </div>
                )}
                
                {selectedEvent.type === 'community' && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                    <span className="text-gray-400 text-sm">社区名称</span>
                    <span className="text-gray-100 text-sm">{selectedEvent.communityName || '-'}</span>
                  </div>
                )}
                
                {selectedEvent.type === 'other' && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                    <span className="text-gray-400 text-sm">标题</span>
                    <span className="text-gray-100 text-sm">{selectedEvent.title || '-'}</span>
                  </div>
                )}
                
                {/* 通用字段 */}
                <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                  <span className="text-gray-400 text-sm">经纬度</span>
                  <span className="text-gray-100 text-sm">{selectedEvent.lat}, {selectedEvent.lng}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-600/50">
                  <span className="text-gray-400 text-sm">记录时间</span>
                  <span className="text-gray-100 text-sm">{selectedEvent.time}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">记录人</span>
                  <span className="text-gray-100 text-sm">{selectedEvent.reporter}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
