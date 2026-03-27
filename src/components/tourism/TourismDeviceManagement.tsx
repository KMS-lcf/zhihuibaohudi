'use client'

import { useState } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Download,
  MapPin,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Eye
} from 'lucide-react'

// 设备列表数据
const deviceList = [
  { id: 'TM001', name: '售票机-北入口', location: '北入口售票处', lat: '39.7856', lng: '115.8921', status: 'online', lastUpdate: '2025-03-25 15:32:18', battery: 95, signal: 92, installDate: '2024-03-15' },
  { id: 'TM002', name: '售票机-游客中心', location: '游客中心大厅', lat: '39.7834', lng: '115.8878', status: 'online', lastUpdate: '2025-03-25 15:31:45', battery: 88, signal: 88, installDate: '2024-03-18' },
  { id: 'TM003', name: '信息屏-东区', location: '东区休息处', lat: '39.7889', lng: '115.8901', status: 'offline', lastUpdate: '2025-03-24 18:22:33', battery: 12, signal: 0, installDate: '2024-02-20' },
  { id: 'TM004', name: '停车诱导屏-西停车场', location: '西停车场入口', lat: '39.7912', lng: '115.8856', status: 'online', lastUpdate: '2025-03-25 15:32:01', battery: 100, signal: 95, installDate: '2024-01-10' },
  { id: 'TM005', name: '人流统计器-检票口', location: '主检票口', lat: '39.7867', lng: '115.8934', status: 'online', lastUpdate: '2025-03-25 15:31:58', battery: 78, signal: 82, installDate: '2024-04-05' },
  { id: 'TM006', name: '导览屏-核心区', location: '核心区入口', lat: '39.7756', lng: '115.8789', status: 'online', lastUpdate: '2025-03-25 15:32:22', battery: 85, signal: 90, installDate: '2024-02-28' },
  { id: 'TM007', name: '信息屏-观景台', location: '观景台平台', lat: '39.7890', lng: '115.8900', status: 'online', lastUpdate: '2025-03-25 15:31:33', battery: 72, signal: 65, installDate: '2024-03-08' },
  { id: 'TM008', name: '停车诱导屏-南停车场', location: '南停车场', lat: '39.7923', lng: '115.8834', status: 'online', lastUpdate: '2025-03-25 15:32:10', battery: 92, signal: 88, installDate: '2024-03-22' },
  { id: 'TM009', name: '导览屏-步道中段', location: '主步道中段', lat: '39.7878', lng: '115.8967', status: 'offline', lastUpdate: '2025-03-23 09:15:22', battery: 8, signal: 0, installDate: '2023-12-15' },
  { id: 'TM010', name: '售票机-南入口', location: '南入口售票处', lat: '39.7956', lng: '115.8812', status: 'online', lastUpdate: '2025-03-25 15:31:55', battery: 68, signal: 75, installDate: '2024-04-12' },
]

// 设备状态统计
const deviceStats = {
  total: deviceList.length,
  online: deviceList.filter(d => d.status === 'online').length,
  offline: deviceList.filter(d => d.status === 'offline').length,
  lowBattery: deviceList.filter(d => d.battery < 20).length,
}

export function TourismDeviceManagement() {
  const [searchTerm, setSearchTerm] = useState('')
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
    if (filterStatus !== 'all' && device.status !== filterStatus) return false
    return true
  })

  // 分页数据
  const totalPages = Math.ceil(filteredDevices.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentPageData = filteredDevices.slice(startIndex, endIndex)

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedDevices.length === currentPageData.length) {
      setSelectedDevices([])
    } else {
      setSelectedDevices(currentPageData.map(d => d.id))
    }
  }

  // 切换单个选中
  const toggleSelect = (id: string) => {
    setSelectedDevices(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 顶部统计栏 */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">总数: {deviceStats.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">在线: {deviceStats.online}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-sm text-gray-600">离线: {deviceStats.offline}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-600">低电量: {deviceStats.lowBattery}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-green-700 bg-white border border-green-300 rounded hover:bg-green-50 transition-colors flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            新建
          </button>
          <button className="px-3 py-1.5 text-sm text-red-600 bg-white border border-red-300 rounded hover:bg-red-50 transition-colors flex items-center gap-1.5">
            <Trash2 className="w-4 h-4" />
            删除
          </button>
          <button className="px-3 py-1.5 text-sm text-green-700 bg-white border border-green-300 rounded hover:bg-green-50 transition-colors flex items-center gap-1.5">
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">全部状态</option>
            <option value="online">在线</option>
            <option value="offline">离线</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索设备名称或位置..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
            />
          </div>
        </div>
      </div>

      {/* 表格区域 - 支持横向滚动 */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse" style={{ minWidth: '1400px' }}>
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <th className="px-4 py-3 sticky left-0 z-20 bg-gray-50 border-r border-gray-200" style={{ width: '48px' }}>
                <input
                  type="checkbox"
                  checked={selectedDevices.length === currentPageData.length && currentPageData.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap sticky left-[48px] z-20 bg-gray-50 border-r border-gray-200" style={{ width: '110px' }}>
                设备编号
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap sticky left-[158px] z-20 bg-gray-50 border-r border-gray-200" style={{ width: '180px' }}>
                设备名称
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap" style={{ width: '180px' }}>
                位置
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap" style={{ width: '100px' }}>
                状态
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap" style={{ width: '100px' }}>
                电量
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap" style={{ width: '100px' }}>
                信号
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap" style={{ width: '110px' }}>
                经度
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap" style={{ width: '110px' }}>
                纬度
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap" style={{ width: '120px' }}>
                安装时间
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap" style={{ width: '160px' }}>
                最后更新时间
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap sticky right-0 z-20 bg-gray-50 border-l border-gray-200" style={{ width: '140px' }}>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((device, rowIndex) => (
              <tr key={device.id} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="px-4 py-3 sticky left-0 z-10 bg-white border-r border-gray-200" style={{ width: '48px' }}>
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(device.id)}
                    onChange={() => toggleSelect(device.id)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 whitespace-nowrap sticky left-[48px] z-10 bg-white border-r border-gray-200" style={{ width: '110px' }}>
                  {device.id}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 whitespace-nowrap sticky left-[158px] z-10 bg-white border-r border-gray-200" style={{ width: '180px' }}>
                  {device.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 whitespace-nowrap" style={{ width: '180px' }}>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    {device.location}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm border-b border-gray-100 whitespace-nowrap" style={{ width: '100px' }}>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className={device.status === 'online' ? 'text-green-600' : 'text-gray-500'}>
                      {device.status === 'online' ? '在线' : '离线'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm border-b border-gray-100 whitespace-nowrap" style={{ width: '100px' }}>
                  <div className="flex items-center gap-1">
                    <Battery className={`w-3 h-3 ${device.battery < 20 ? 'text-red-500' : device.battery < 50 ? 'text-orange-500' : 'text-green-500'}`} />
                    <span className={device.battery < 20 ? 'text-red-600 font-medium' : 'text-gray-900'}>
                      {device.battery}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm border-b border-gray-100 whitespace-nowrap" style={{ width: '100px' }}>
                  <div className="flex items-center gap-1">
                    {device.signal > 0 ? (
                      <>
                        <Signal className="w-3 h-3 text-green-500" />
                        <span className="text-gray-900">{device.signal}%</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400">无信号</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 whitespace-nowrap" style={{ width: '110px' }}>
                  {device.lng}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 whitespace-nowrap" style={{ width: '110px' }}>
                  {device.lat}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 whitespace-nowrap" style={{ width: '120px' }}>
                  {device.installDate}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100 whitespace-nowrap" style={{ width: '160px' }}>
                  {device.lastUpdate}
                </td>
                <td className="px-4 py-3 text-sm border-b border-gray-100 whitespace-nowrap sticky right-0 z-10 bg-white border-l border-gray-200" style={{ width: '140px' }}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewingDevice(device)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="查看"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingDevice(device)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                      title="编辑"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
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

        {currentPageData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Search className="w-12 h-12 mb-2" />
            <span>暂无匹配的设备</span>
          </div>
        )}
      </div>

      {/* 底部信息栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>共 {filteredDevices.length} 条记录</span>
          <span>已选 {selectedDevices.length} 条</span>
          <div className="flex items-center gap-2">
            <span>每页显示:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
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
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = i + 1
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
                    ? 'bg-green-500 text-white'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            )
          })}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      {/* 查看设备详情弹窗 */}
      {viewingDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">设备详情</h3>
              <button onClick={() => setViewingDevice(null)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">设备编号</span>
                <span className="text-sm text-gray-900 font-medium">{viewingDevice.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">设备名称</span>
                <span className="text-sm text-gray-900 font-medium">{viewingDevice.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">位置</span>
                <span className="text-sm text-gray-900 font-medium">{viewingDevice.location}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">状态</span>
                <span className={`text-sm font-medium ${viewingDevice.status === 'online' ? 'text-green-600' : 'text-gray-500'}`}>
                  {viewingDevice.status === 'online' ? '在线' : '离线'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">电量</span>
                <span className={`text-sm font-medium ${viewingDevice.battery < 20 ? 'text-red-600' : 'text-gray-900'}`}>
                  {viewingDevice.battery}%
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">信号</span>
                <span className="text-sm text-gray-900 font-medium">{viewingDevice.signal}%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">经度</span>
                <span className="text-sm text-gray-900 font-medium">{viewingDevice.lng}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">纬度</span>
                <span className="text-sm text-gray-900 font-medium">{viewingDevice.lat}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">安装时间</span>
                <span className="text-sm text-gray-900 font-medium">{viewingDevice.installDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">最后更新时间</span>
                <span className="text-sm text-gray-900 font-medium">{viewingDevice.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 编辑设备弹窗 */}
      {editingDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">编辑设备</h3>
              <button onClick={() => setEditingDevice(null)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">设备名称</label>
                <input
                  type="text"
                  defaultValue={editingDevice.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">位置</label>
                <input
                  type="text"
                  defaultValue={editingDevice.location}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">经度</label>
                  <input
                    type="text"
                    defaultValue={editingDevice.lng}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">纬度</label>
                  <input
                    type="text"
                    defaultValue={editingDevice.lat}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setEditingDevice(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={() => setEditingDevice(null)}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
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
