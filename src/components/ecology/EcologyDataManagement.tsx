'use client'

import { useState, useMemo } from 'react'
import { Download, Eye, ArrowUpDown, Filter, Trash2, Search } from 'lucide-react'
import {
  ecologyDataTabs,
  ecologyDevices,
  ecologyPoints,
  generateWeatherData,
  generateAirData,
  generateWaterData,
  generateSoilData,
  generateCaveData,
  tableColumns,
} from '@/data/ecologyMonitorData'

// 数据类型定义
type WeatherData = ReturnType<typeof generateWeatherData>[0]
type AirData = ReturnType<typeof generateAirData>[0]
type WaterData = ReturnType<typeof generateWaterData>[0]
type SoilData = ReturnType<typeof generateSoilData>[0]
type CaveData = ReturnType<typeof generateCaveData>[0]

type TabId = 'weather' | 'air' | 'water' | 'soil' | 'cave'
type DataType = WeatherData | AirData | WaterData | SoilData | CaveData

export function EcologyDataManagement() {
  const [activeTab, setActiveTab] = useState<TabId>('weather')

  // 筛选状态
  const [selectedDevice, setSelectedDevice] = useState<string>('')
  const [selectedPoint, setSelectedPoint] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  // 勾选和分页状态
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  // 搜索和排序
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)

  // 模态框状态
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showSortModal, setShowSortModal] = useState(false)

  // 根据当前标签生成数据
  const rawData = useMemo(() => {
    switch (activeTab) {
      case 'weather': return generateWeatherData(100)
      case 'air': return generateAirData(100)
      case 'water': return generateWaterData(100)
      case 'soil': return generateSoilData(100)
      case 'cave': return generateCaveData(100)
      default: return []
    }
  }, [activeTab])

  // 筛选后的数据
  const filteredData = useMemo(() => {
    let data = [...rawData]

    // 搜索筛选
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      data = data.filter(item => {
        return Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchLower)
        )
      })
    }

    // 按设备筛选
    if (selectedDevice) {
      data = data.filter(item => item.device === selectedDevice)
    }

    // 按点位筛选
    if (selectedPoint) {
      data = data.filter(item => item.point === selectedPoint)
    }

    // 按时间筛选
    if (startDate) {
      data = data.filter(item => {
        const itemDate = new Date(item.time.replace(/\//g, '-'))
        return itemDate >= new Date(startDate)
      })
    }
    if (endDate) {
      data = data.filter(item => {
        const itemDate = new Date(item.time.replace(/\//g, '-'))
        return itemDate <= new Date(endDate + ' 23:59:59')
      })
    }

    return data
  }, [rawData, searchTerm, selectedDevice, selectedPoint, startDate, endDate])

  // 排序数据
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0
    const aValue = a[sortConfig.key as keyof typeof a]
    const bValue = b[sortConfig.key as keyof typeof b]
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  // 分页数据
  const totalPages = Math.ceil(sortedData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentPageData = sortedData.slice(startIndex, endIndex)

  // 当前标签的列配置
  const columns = tableColumns[activeTab]

  // 当前标签的设备和点位
  const devices = ecologyDevices[activeTab]
  const points = ecologyPoints[activeTab]

  // 切换标签时重置筛选
  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId)
    setSelectedDevice('')
    setSelectedPoint('')
    setSearchTerm('')
    setSelectedRows(new Set())
    setSelectAll(false)
    setSortConfig(null)
  }

  // 导出功能
  const handleExport = () => {
    const headers = columns.map(col => col.label).join(',')
    const rows = currentPageData.map(item =>
      columns.map(col => item[col.key as keyof typeof item]).join(',')
    )
    const csv = [headers, ...rows].join('\n')

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${ecologyDataTabs.find(t => t.id === activeTab)?.name}_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // 全选处理
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(currentPageData.map((item: any) => item.id)))
    }
    setSelectAll(!selectAll)
  }

  // 单选处理
  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }

  // 切换排序
  const toggleSort = (key: string) => {
    if (sortConfig?.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
      })
    } else {
      setSortConfig({ key, direction: 'desc' })
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 顶部类型切换栏 */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 bg-white overflow-x-auto">
        {ecologyDataTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as TabId)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-white bg-green-600'
                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 操作按钮栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-green-700 bg-white border border-green-300 rounded hover:bg-green-50 transition-colors flex items-center gap-1.5">
            <Download className="w-4 h-4" />
            导出
          </button>
          <button className="px-3 py-1.5 text-sm text-red-600 bg-white border border-red-300 rounded hover:bg-red-50 transition-colors flex items-center gap-1.5">
            <Trash2 className="w-4 h-4" />
            删除
          </button>
          <button
            onClick={() => setShowSortModal(true)}
            className="px-3 py-1.5 text-sm text-green-700 bg-white border border-green-300 rounded hover:bg-green-50 transition-colors flex items-center gap-1.5"
          >
            <ArrowUpDown className="w-4 h-4" />
            排序
          </button>
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-3 py-1.5 text-sm text-green-700 bg-white border border-green-300 rounded hover:bg-green-50 transition-colors flex items-center gap-1.5"
          >
            <Filter className="w-4 h-4" />
            筛选
          </button>
          <button className="px-3 py-1.5 text-sm text-green-700 bg-white border border-green-300 rounded hover:bg-green-50 transition-colors flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            显示
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      {/* 表格区域 - 支持横向滚动 */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 sticky left-0 z-20 bg-gray-50 border-r border-gray-200">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
              </th>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 whitespace-nowrap bg-gray-50"
                  style={{
                    left: index < 3 ? `${48 + index * 100}px` : undefined,
                    position: index < 3 ? 'sticky' : undefined,
                    zIndex: index < 3 ? 20 : 10,
                    minWidth: col.width || '120px'
                  }}
                  onClick={() => col.key !== 'id' && col.key !== 'time' && col.key !== 'device' && col.key !== 'point' && toggleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortConfig?.key === col.key && (
                      <span className="text-xs">({sortConfig.direction === 'asc' ? '↑' : '↓'})</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item: any, rowIndex: number) => (
              <tr key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="w-12 px-4 py-3 sticky left-0 z-10 bg-white border-r border-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                    className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                </td>
                {columns.map((col, cellIndex) => {
                  const cellKey = col.key as keyof typeof item
                  const cellValue = item[cellKey]

                  return (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100 whitespace-nowrap"
                      style={{
                        left: cellIndex < 3 ? `${48 + cellIndex * 100}px` : undefined,
                        position: cellIndex < 3 ? 'sticky' : undefined,
                        zIndex: cellIndex < 3 ? 10 : 1,
                        backgroundColor: cellIndex < 3 ? 'white' : undefined
                      }}
                    >
                      {cellValue}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {currentPageData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Filter className="w-12 h-12 mb-2" />
            <span>暂无匹配的数据</span>
          </div>
        )}
      </div>

      {/* 底部信息栏 */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>共 {filteredData.length} 条记录</span>
          <span>已选 {selectedRows.size} 条</span>
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
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
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
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      {/* 筛选弹窗 */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">筛选选项</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">监测设备</label>
                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">全部设备</option>
                  {devices.map((device: any) => (
                    <option key={device.id} value={device.name}>{device.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">监测点位</label>
                <select
                  value={selectedPoint}
                  onChange={(e) => setSelectedPoint(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">全部点位</option>
                  {points.map((point: any) => (
                    <option key={point.id} value={point.name}>{point.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <span className="self-center text-gray-500">-</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  应用
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 排序弹窗 */}
      {showSortModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">排序选项</h3>
              <button onClick={() => setShowSortModal(false)} className="text-gray-400 hover:text-gray-600">
                ×
              </button>
            </div>
            <div className="space-y-2">
              {columns.filter(col => col.key !== 'id' && col.key !== 'time' && col.key !== 'device' && col.key !== 'point').map((col) => (
                <button
                  key={col.key}
                  onClick={() => {
                    toggleSort(col.key)
                    setShowSortModal(false)
                  }}
                  className={`w-full text-left px-4 py-2 rounded hover:bg-gray-100 ${
                    sortConfig?.key === col.key ? 'bg-green-50 text-green-700' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{col.label}</span>
                    {sortConfig?.key === col.key && (
                      <span className="text-sm">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EcologyDataManagement
