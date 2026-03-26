'use client'

import { useState } from 'react'
import { Video, Download, Trash2, Play, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { humanActivityRecords, historicalVideos } from '@/data/humanActivityData'

// 视频播放弹窗组件
function VideoPlayModal({
  video,
  onClose,
  isRecord = false
}: {
  video: typeof humanActivityRecords[0] | typeof historicalVideos[0] | null
  onClose: () => void
  isRecord?: boolean
}) {
  const now = new Date()
  const timeStr = now.toLocaleString('zh-CN', { 
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  const getVideoInfo = () => {
    if (isRecord && 'description' in video!) {
      return {
        title: `${video.device} - ${video.area}`,
        subtitle: `${video.time}`,
        description: video.description
      }
    } else if ('date' in video!) {
      return {
        title: `${video.deviceName}`,
        subtitle: `${video.date}`,
        description: `时长: ${Math.floor(video.duration / 60)}小时${video.duration % 60}分钟`
      }
    }
    return { title: '视频播放', subtitle: '', description: '' }
  }

  const info = video ? getVideoInfo() : { title: '', subtitle: '', description: '' }

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-900/80 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-cyan-400" />
            {info.title}
          </h3>
          <span className="text-sm text-gray-400">{info.subtitle}</span>
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

      {/* 视频区域 */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="w-full max-w-5xl aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg relative overflow-hidden">
          {/* 模拟视频内容 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <span className="text-gray-500 text-lg">视频播放区域</span>
              {info.description && (
                <p className="text-gray-600 text-sm mt-2">{info.description}</p>
              )}
            </div>
          </div>
          
          {/* 播放控制条 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-cyan-400 transition-colors">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-cyan-500"></div>
              </div>
              <span className="text-sm text-gray-300">00:05:32 / 00:15:00</span>
              <button className="text-white hover:text-cyan-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 人类活动历史数据主界面
export function HumanActivityHistoryInterface() {
  const [activeTab, setActiveTab] = useState<'records' | 'videos'>('records')
  const [selectedRecordIds, setSelectedRecordIds] = useState<number[]>([])
  const [selectedVideoIds, setSelectedVideoIds] = useState<number[]>([])
  const [playingVideo, setPlayingVideo] = useState<typeof humanActivityRecords[0] | typeof historicalVideos[0] | null>(null)
  const [isRecordVideo, setIsRecordVideo] = useState(false)
  
  // 筛选状态
  const [recordTypeFilter, setRecordTypeFilter] = useState<string>('all')
  const [recordDeviceFilter, setRecordDeviceFilter] = useState<string>('all')
  const [recordStartDate, setRecordStartDate] = useState<string>('')
  const [recordEndDate, setRecordEndDate] = useState<string>('')
  
  const [videoDeviceFilter, setVideoDeviceFilter] = useState<string>('all')
  const [videoStartDate, setVideoStartDate] = useState<string>('')
  const [videoEndDate, setVideoEndDate] = useState<string>('')
  
  // 排序状态
  const [sortField, setSortField] = useState<string>('time')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  
  // 获取唯一的设备列表
  const recordDevices = [...new Set(humanActivityRecords.map(r => r.device))]
  const videoDevices = [...new Set(historicalVideos.map(v => v.device))]
  
  // 筛选和排序记录
  const filteredRecords = humanActivityRecords
    .filter(record => {
      if (recordTypeFilter !== 'all' && record.type !== recordTypeFilter) return false
      if (recordDeviceFilter !== 'all' && record.device !== recordDeviceFilter) return false
      if (recordStartDate && record.time < recordStartDate) return false
      if (recordEndDate && record.time > recordEndDate + ' 23:59:59') return false
      return true
    })
    .sort((a, b) => {
      let comparison = 0
      if (sortField === 'time') comparison = a.time.localeCompare(b.time)
      else if (sortField === 'duration') comparison = a.duration - b.duration
      else if (sortField === 'type') comparison = a.type.localeCompare(b.type)
      return sortDirection === 'asc' ? comparison : -comparison
    })
  
  // 筛选视频
  const filteredVideos = historicalVideos.filter(video => {
    if (videoDeviceFilter !== 'all' && video.device !== videoDeviceFilter) return false
    if (videoStartDate && video.date < videoStartDate) return false
    if (videoEndDate && video.date > videoEndDate) return false
    return true
  })
  
  // 记录全选/取消全选
  const toggleSelectAllRecords = () => {
    if (selectedRecordIds.length === filteredRecords.length) {
      setSelectedRecordIds([])
    } else {
      setSelectedRecordIds(filteredRecords.map(r => r.id))
    }
  }
  
  // 单条记录选择
  const toggleRecordSelection = (id: number) => {
    setSelectedRecordIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }
  
  // 视频全选/取消全选
  const toggleSelectAllVideos = () => {
    if (selectedVideoIds.length === filteredVideos.length) {
      setSelectedVideoIds([])
    } else {
      setSelectedVideoIds(filteredVideos.map(v => v.id))
    }
  }
  
  // 单个视频选择
  const toggleVideoSelection = (id: number) => {
    setSelectedVideoIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }
  
  // 处理排序
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }
  
  // 渲染排序图标
  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-green-600" />
      : <ChevronDown className="w-4 h-4 text-green-600" />
  }
  
  // 播放记录视频
  const handlePlayRecord = (record: typeof humanActivityRecords[0]) => {
    setPlayingVideo(record)
    setIsRecordVideo(true)
  }
  
  // 播放历史视频
  const handlePlayVideo = (video: typeof historicalVideos[0]) => {
    setPlayingVideo(video)
    setIsRecordVideo(false)
  }

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* 页签切换 */}
      <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-green-100 flex-shrink-0">
        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-1.5 text-sm rounded-md transition-all ${
            activeTab === 'records'
              ? 'bg-green-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
          }`}
        >
          人类活动监测记录
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-1.5 text-sm rounded-md transition-all ${
            activeTab === 'videos'
              ? 'bg-green-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
          }`}
        >
          历史监控回放
        </button>
      </div>

      {/* 人类活动监测记录页签 */}
      {activeTab === 'records' && (
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 flex-1 flex flex-col overflow-hidden">
            {/* 工具栏 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-100 flex-shrink-0 gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  下载
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm">
                  <Trash2 className="w-4 h-4" />
                  删除
                </button>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">记录类型：</label>
                  <select
                    value={recordTypeFilter}
                    onChange={(e) => setRecordTypeFilter(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-green-500"
                  >
                    <option value="all">全部</option>
                    <option value="非法闯入">非法闯入</option>
                    <option value="外来车辆">外来车辆</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">监控设备：</label>
                  <select
                    value={recordDeviceFilter}
                    onChange={(e) => setRecordDeviceFilter(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-green-500"
                  >
                    <option value="all">全部</option>
                    {recordDevices.map(device => (
                      <option key={device} value={device}>{device}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">时间范围：</label>
                  <input
                    type="date"
                    value={recordStartDate}
                    onChange={(e) => setRecordStartDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-green-500"
                  />
                  <span className="text-gray-400">至</span>
                  <input
                    type="date"
                    value={recordEndDate}
                    onChange={(e) => setRecordEndDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
            </div>
            
            {/* 表格区域 */}
            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead className="bg-green-50 sticky top-0">
                  <tr>
                    <th className="w-10 px-3 py-2 text-left">
                      <input
                        type="checkbox"
                        checked={selectedRecordIds.length === filteredRecords.length && filteredRecords.length > 0}
                        onChange={toggleSelectAllRecords}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                    </th>
                    <th 
                      className="px-3 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-green-600"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center gap-1">
                        记录类型
                        {renderSortIcon('type')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-green-600"
                      onClick={() => handleSort('time')}
                    >
                      <div className="flex items-center gap-1">
                        记录时间
                        {renderSortIcon('time')}
                      </div>
                    </th>
                    <th 
                      className="px-3 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-green-600"
                      onClick={() => handleSort('duration')}
                    >
                      <div className="flex items-center gap-1">
                        视频时长
                        {renderSortIcon('duration')}
                      </div>
                    </th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">监控设备</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">监控区域</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">记录描述</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr 
                      key={record.id} 
                      className={`border-b border-gray-100 hover:bg-green-50/50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-3 py-2.5">
                        <input
                          type="checkbox"
                          checked={selectedRecordIds.includes(record.id)}
                          onChange={() => toggleRecordSelection(record.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          record.type === '非法闯入' ? 'bg-red-100 text-red-700' :
                          record.type === '外来车辆' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-sm text-gray-700">{record.time}</td>
                      <td className="px-3 py-2.5 text-sm text-gray-700">{record.duration}分钟</td>
                      <td className="px-3 py-2.5 text-sm text-gray-700">{record.device}</td>
                      <td className="px-3 py-2.5 text-sm text-gray-700">{record.area}</td>
                      <td className="px-3 py-2.5 text-sm text-gray-500 max-w-[200px] truncate">{record.description}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handlePlayRecord(record)}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="查看视频"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 分页 */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-green-100 flex-shrink-0">
              <div className="text-sm text-gray-500">
                共 {filteredRecords.length} 条记录，已选择 {selectedRecordIds.length} 条
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50" disabled>
                  上一页
                </button>
                <span className="text-sm text-gray-600">1 / 1</span>
                <button className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50" disabled>
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 历史监控回放页签 */}
      {activeTab === 'videos' && (
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 flex-1 flex flex-col overflow-hidden">
            {/* 工具栏 */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-green-100 flex-shrink-0 gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  下载
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm">
                  <Trash2 className="w-4 h-4" />
                  删除
                </button>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">监控设备：</label>
                  <select
                    value={videoDeviceFilter}
                    onChange={(e) => setVideoDeviceFilter(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-green-500"
                  >
                    <option value="all">全部</option>
                    {videoDevices.map(device => (
                      <option key={device} value={device}>{device}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">时间范围：</label>
                  <input
                    type="date"
                    value={videoStartDate}
                    onChange={(e) => setVideoStartDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-green-500"
                  />
                  <span className="text-gray-400">至</span>
                  <input
                    type="date"
                    value={videoEndDate}
                    onChange={(e) => setVideoEndDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
            </div>
            
            {/* 视频卡片网格 */}
            <div className="flex-1 p-4 overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedVideoIds.length === filteredVideos.length && filteredVideos.length > 0}
                    onChange={toggleSelectAllVideos}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">全选</span>
                </div>
                <span className="text-sm text-gray-500">共 {filteredVideos.length} 个视频</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredVideos.map((video) => (
                  <div 
                    key={`${video.date}-${video.device}`}
                    className={`bg-white rounded-lg border overflow-hidden transition-all hover:shadow-md ${
                      selectedVideoIds.includes(video.id) ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                    }`}
                  >
                    {/* 视频封面 */}
                    <div className="relative aspect-video bg-gray-100">
                      {/* 模拟视频第一帧 */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <Video className="w-8 h-8 text-gray-400" />
                      </div>
                      
                      {/* 勾选框 */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedVideoIds.includes(video.id)}
                          onChange={() => toggleVideoSelection(video.id)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                      </div>
                      
                      {/* 时长标签 */}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {Math.floor(video.duration / 60)}h {video.duration % 60}m
                      </div>
                      
                      {/* 状态标签 */}
                      {video.status !== '完整' && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded">
                          {video.status}
                        </div>
                      )}
                    </div>
                    
                    {/* 视频信息 */}
                    <div className="p-2.5 bg-white">
                      <div className="text-sm text-gray-700 truncate mb-1 font-medium">{video.deviceName}</div>
                      <div className="text-xs text-gray-500 mb-2">{video.date}</div>
                      
                      {/* 操作按钮 */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handlePlayVideo(video)}
                          className="flex-1 flex items-center justify-center gap-1 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                        >
                          <Play className="w-3 h-3" />
                          播放
                        </button>
                        <button
                          className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="下载"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 视频播放弹窗 */}
      {playingVideo && (
        <VideoPlayModal
          video={playingVideo}
          onClose={() => setPlayingVideo(null)}
          isRecord={isRecordVideo}
        />
      )}
    </div>
  )
}
