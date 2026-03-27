'use client'

import { useState } from 'react'
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Filter, 
  Download,
  MoreHorizontal,
  MapPin,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Settings,
  Eye
} from 'lucide-react'
import {
  monitorThemes,
  ecologyDevices,
} from '@/data/ecologyMonitorData'

// 设备列表数据
const deviceList = [
  // 气象设备
  { id: 'WD001', name: '气象站-A区', type: 'weather', typeName: '气象监测', location: '景区入口', lat: '39.7856', lng: '115.8921', status: 'online', lastUpdate: '2025-03-25 15:32:18', battery: 85, signal: 92, installDate: '2024-03-15' },
  { id: 'WD002', name: '气象站-B区', type: 'weather', typeName: '气象监测', location: '核心区', lat: '39.7912', lng: '115.8856', status: 'online', lastUpdate: '2025-03-25 15:31:45', battery: 92, signal: 88, installDate: '2024-03-18' },
  { id: 'WD003', name: '气象站-C区', type: 'weather', typeName: '气象监测', location: '石花洞口', lat: '39.7889', lng: '115.8901', status: 'offline', lastUpdate: '2025-03-24 18:22:33', battery: 15, signal: 0, installDate: '2024-02-20' },
  // 空气设备
  { id: 'AD001', name: '空气监测站-主站', type: 'air', typeName: '空气监测', location: '游客中心', lat: '39.7834', lng: '115.8878', status: 'online', lastUpdate: '2025-03-25 15:32:01', battery: 100, signal: 95, installDate: '2024-01-10' },
  { id: 'AD002', name: '空气监测站-分站', type: 'air', typeName: '空气监测', location: '洞口区域', lat: '39.7867', lng: '115.8934', status: 'online', lastUpdate: '2025-03-25 15:31:58', battery: 78, signal: 82, installDate: '2024-04-05' },
  // 水文设备
  { id: 'HD001', name: '水文监测点-大石河', type: 'water', typeName: '水文监测', location: '大石河断面', lat: '39.7756', lng: '115.8789', status: 'online', lastUpdate: '2025-03-25 15:32:22', battery: 88, signal: 90, installDate: '2024-02-28' },
  { id: 'HD002', name: '水文监测点-地下河', type: 'water', typeName: '水文监测', location: '洞内地下河', lat: '39.7890', lng: '115.8900', status: 'online', lastUpdate: '2025-03-25 15:31:33', battery: 72, signal: 65, installDate: '2024-03-08' },
  // 土壤设备
  { id: 'SD001', name: '土壤监测点-林地', type: 'soil', typeName: '土壤监测', location: '阔叶林区', lat: '39.7923', lng: '115.8834', status: 'online', lastUpdate: '2025-03-25 15:32:10', battery: 95, signal: 88, installDate: '2024-03-22' },
  { id: 'SD002', name: '土壤监测点-灌丛', type: 'soil', typeName: '土壤监测', location: '灌丛区', lat: '39.7878', lng: '115.8967', status: 'offline', lastUpdate: '2025-03-23 09:15:22', battery: 5, signal: 0, installDate: '2023-12-15' },
  { id: 'SD003', name: '土壤监测点-草甸', type: 'soil', typeName: '土壤监测', location: '山顶草甸', lat: '39.7956', lng: '115.8812', status: 'online', lastUpdate: '2025-03-25 15:31:55', battery: 68, signal: 75, installDate: '2024-04-12' },
  // 溶洞设备
  { id: 'CD001', name: '溶洞监测站-一层', type: 'cave', typeName: '溶洞环境', location: '第一层洞厅', lat: '39.7891', lng: '115.8903', status: 'online', lastUpdate: '2025-03-25 15:32:25', battery: 82, signal: 70, installDate: '2024-05-20' },
  { id: 'CD002', name: '溶洞监测站-二层', type: 'cave', typeName: '溶洞环境', location: '第二层洞厅', lat: '39.7893', lng: '115.8901', status: 'online', lastUpdate: '2025-03-25 15:32:20', battery: 79, signal: 68, installDate: '2024-05-25' },
  { id: 'CD003', name: '溶洞监测站-三层', type: 'cave', typeName: '溶洞环境', location: '第三层洞厅', lat: '39.7895', lng: '115.8899', status: 'online', lastUpdate: '2025-03-25 15:31:48', battery: 85, signal: 62, installDate: '2024-06-01' },
  { id: 'CD004', name: '溶洞监测站-深层', type: 'cave', typeName: '溶洞环境', location: '深层洞穴', lat: '39.7898', lng: '115.8895', status: 'offline', lastUpdate: '2025-03-22 14:08:11', battery: 0, signal: 0, installDate: '2023-11-30' },
]

// 设备状态统计
const deviceStats = {
  total: deviceList.length,
  online: deviceList.filter(d => d.status === 'online').length,
  offline: deviceList.filter(d => d.status === 'offline').length,
  lowBattery: deviceList.filter(d => d.battery < 20).length,
}

export function EcologicalDeviceManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDevices, setSelectedDevices] = useState<string[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingDevice, setEditingDevice] = useState<typeof deviceList[0] | null>(null)
  const [viewingDevice, setViewingDevice] = useState<typeof deviceList[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // 筛选后的设备列表
  const filteredDevices = deviceList.filter(device => {
    if (searchTerm && !device.name.includes(searchTerm) && !device.location.includes(searchTerm)) return false
    if (filterType !== 'all' && device.type !== filterType) return false
    if (filterStatus !== 'all' && device.status !== filterStatus) return false
    return true
  })

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([])
    } else {
      setSelectedDevices(filteredDevices.map(d => d.id))
    }
  }

  // 切换单个选中
  const toggleSelect = (id: string) => {
    setSelectedDevices(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  // 获取类型颜色
  const getTypeColor = (type: string) => {
    const theme = monitorThemes.find(t => t.id === type)
    return theme?.color || '#6b7280'
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden">
      {/* 顶部状态栏 */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">设备总数: <span className="font-medium text-gray-800">{deviceStats.total}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">在线: <span className="font-medium text-green-600">{deviceStats.online}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <span className="text-sm text-gray-600">离线: <span className="font-medium text-gray-500">{deviceStats.offline}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-600">低电量: <span className="font-medium text-red-500">{deviceStats.lowBattery}</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              新增设备
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4" />
              导出
            </button>
          </div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4">
          {/* 搜索框 */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索设备名称/位置..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
            />
          </div>

          {/* 类型筛选 */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          >
            <option value="all">全部类型</option>
            {monitorThemes.map(theme => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>

          {/* 状态筛选 */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400"
          >
            <option value="all">全部状态</option>
            <option value="online">在线</option>
            <option value="offline">离线</option>
          </select>

          {selectedDevices.length > 0 && (
            <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm hover:bg-red-100 transition-colors">
              <Trash2 className="w-4 h-4" />
              删除选中 ({selectedDevices.length})
            </button>
          )}
        </div>
      </div>

      {/* 设备列表 */}
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          {/* 表格区域 - 支持横向滚动 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-collapse" style={{ minWidth: '1600px' }}>
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200 sticky left-0 z-20 bg-gray-50" style={{ width: '48px', minWidth: '48px' }}>
                    <input
                      type="checkbox"
                      checked={selectedDevices.length === filteredDevices.length && filteredDevices.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200 sticky left-[48px] z-20 bg-gray-50" style={{ width: '110px', minWidth: '110px' }}>设备编号</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200 sticky left-[158px] z-20 bg-gray-50" style={{ width: '160px', minWidth: '160px' }}>设备名称</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '110px' }}>类型</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '140px' }}>位置</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '90px' }}>状态</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '90px' }}>电量</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '90px' }}>信号</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '110px' }}>经度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '110px' }}>纬度</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '130px' }}>安装时间</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b border-gray-200" style={{ minWidth: '170px' }}>最后更新</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase border-b border-gray-200 sticky right-0 z-20 bg-gray-50" style={{ width: '160px', minWidth: '160px' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices
                  .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                  .map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                    <td className="px-4 py-3 sticky left-0 z-10 bg-white border-r border-gray-200" style={{ width: '48px', minWidth: '48px' }}>
                      <input
                        type="checkbox"
                        checked={selectedDevices.includes(device.id)}
                        onChange={() => toggleSelect(device.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono sticky left-[48px] z-10 bg-white border-r border-gray-200" style={{ width: '110px', minWidth: '110px' }}>{device.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 font-medium sticky left-[158px] z-10 bg-white border-r border-gray-200" style={{ width: '160px', minWidth: '160px' }}>{device.name}</td>
                    <td className="px-4 py-3" style={{ minWidth: '110px' }}>
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                        style={{
                          backgroundColor: `${getTypeColor(device.type)}15`,
                          color: getTypeColor(device.type)
                        }}
                      >
                        {device.typeName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600" style={{ minWidth: '140px' }}>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{device.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '90px' }}>
                      {device.status === 'online' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
                          <Wifi className="w-3 h-3" />
                          在线
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 whitespace-nowrap">
                          <WifiOff className="w-3 h-3" />
                          离线
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '90px' }}>
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <Battery className={`w-4 h-4 flex-shrink-0 ${device.battery < 20 ? 'text-red-500' : device.battery < 50 ? 'text-yellow-500' : 'text-green-500'}`} />
                        <span className={`text-sm ${device.battery < 20 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>{device.battery}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3" style={{ minWidth: '90px' }}>
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        <Signal className={`w-4 h-4 flex-shrink-0 ${device.signal > 80 ? 'text-green-500' : device.signal > 50 ? 'text-yellow-500' : 'text-red-500'}`} />
                        <span className="text-sm text-gray-600">{device.signal}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono whitespace-nowrap" style={{ minWidth: '110px' }}>{device.lng}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 font-mono whitespace-nowrap" style={{ minWidth: '110px' }}>{device.lat}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap" style={{ minWidth: '130px' }}>{device.installDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap" style={{ minWidth: '170px' }}>{device.lastUpdate}</td>
                    <td className="px-4 py-3 sticky right-0 z-10 bg-white border-l border-gray-200" style={{ width: '160px', minWidth: '160px' }}>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setViewingDevice(device)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                          title="查看详情"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingDevice(device)}
                          className="p-1.5 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded transition-colors"
                          title="编辑"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                          title="删除"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="更多"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredDevices.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Settings className="w-12 h-12 mb-2" />
                <span>暂无匹配的设备</span>
              </div>
            )}
          </div>

          {/* 分页组件 */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>共 {filteredDevices.length} 条记录</span>
              <div className="flex items-center gap-2">
                <span>每页显示:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>条</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              {Array.from({ length: Math.min(5, Math.ceil(filteredDevices.length / rowsPerPage)) }, (_, i) => {
                let pageNum = i + 1
                const totalPages = Math.ceil(filteredDevices.length / rowsPerPage)
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredDevices.length / rowsPerPage), p + 1))}
                disabled={currentPage === Math.ceil(filteredDevices.length / rowsPerPage)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
              <button
                onClick={() => setCurrentPage(Math.ceil(filteredDevices.length / rowsPerPage))}
                disabled={currentPage === Math.ceil(filteredDevices.length / rowsPerPage)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 设备详情弹窗 */}
      {viewingDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setViewingDevice(null)}>
          <div className="bg-white rounded-xl w-[500px] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">设备详情</h3>
              <button onClick={() => setViewingDevice(null)} className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">设备编号</span>
                  <p className="text-gray-800 font-mono">{viewingDevice.id}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">设备名称</span>
                  <p className="text-gray-800">{viewingDevice.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">设备类型</span>
                  <p className="text-gray-800">{viewingDevice.typeName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">设备状态</span>
                  <p className={`font-medium ${viewingDevice.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                    {viewingDevice.status === 'online' ? '在线' : '离线'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">安装位置</span>
                  <p className="text-gray-800">{viewingDevice.location}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">经纬度</span>
                  <p className="text-gray-800 font-mono text-sm">{viewingDevice.lat}, {viewingDevice.lng}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">电池电量</span>
                  <p className={`font-medium ${viewingDevice.battery < 20 ? 'text-red-600' : 'text-gray-800'}`}>
                    {viewingDevice.battery}%
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">信号强度</span>
                  <p className="text-gray-800">{viewingDevice.signal}%</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-gray-500">最后更新时间</span>
                  <p className="text-gray-800">{viewingDevice.lastUpdate}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  onClick={() => setViewingDevice(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                >
                  关闭
                </button>
                <button 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                >
                  编辑设备
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 新增设备弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl w-[500px] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">新增设备</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5 rotate-45" />
              </button>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">设备名称</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" placeholder="请输入设备名称" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">设备类型</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400">
                    {monitorThemes.map(theme => (
                      <option key={theme.id} value={theme.id}>{theme.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">安装位置</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" placeholder="请输入安装位置" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">纬度</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" placeholder="39.7856" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">经度</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400" placeholder="115.8921" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EcologicalDeviceManagement
