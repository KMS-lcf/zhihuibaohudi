'use client'

import { useState, useMemo } from 'react'
import { Download, Eye, ArrowUpDown, Calendar, ChevronDown } from 'lucide-react'
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
  
  // 显示/排序设置
  const [showColumns, setShowColumns] = useState<Record<string, boolean>>({})
  const [sortField, setSortField] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  // 下拉菜单状态
  const [showDeviceDropdown, setShowDeviceDropdown] = useState(false)
  const [showPointDropdown, setShowPointDropdown] = useState(false)

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
    
    // 排序
    if (sortField) {
      data.sort((a, b) => {
        const aVal = a[sortField as keyof typeof a]
        const bVal = b[sortField as keyof typeof b]
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
        }
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortOrder === 'asc' 
            ? aVal.localeCompare(bVal) 
            : bVal.localeCompare(aVal)
        }
        return 0
      })
    }
    
    return data
  }, [rawData, selectedDevice, selectedPoint, startDate, endDate, sortField, sortOrder])

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
    setSortField('')
    setShowColumns({})
  }

  // 导出功能
  const handleExport = () => {
    const headers = columns.map(col => col.label).join(',')
    const rows = filteredData.map(item => 
      columns.map(col => item[col.key as keyof typeof item]).join(',')
    )
    const csv = [headers, ...rows].join('\n')
    
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${ecologyDataTabs.find(t => t.id === activeTab)?.name}_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // 显示/隐藏列
  const toggleColumn = (key: string) => {
    setShowColumns(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // 切换排序
  const toggleSort = (key: string) => {
    if (sortField === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(key)
      setSortOrder('desc')
    }
  }

  // 可见的列
  const visibleColumns = columns.filter(col => 
    col.key === 'id' || col.key === 'time' || col.key === 'device' || col.key === 'point' || showColumns[col.key] !== false
  )

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 页签切换 */}
      <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-emerald-100 flex-shrink-0">
        {ecologyDataTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as TabId)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 内容区域 */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="bg-white rounded-xl shadow-sm border border-emerald-100 h-full flex flex-col overflow-hidden">
          {/* 工具栏 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
            {/* 左侧按钮 */}
            <div className="flex items-center gap-2">
              {/* 导出按钮 */}
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                导出
              </button>
              
              {/* 显示按钮 */}
              <div className="relative">
                <button
                  onClick={() => setShowDeviceDropdown(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  显示
                </button>
              </div>
              
              {/* 排序按钮 */}
              <button
                onClick={() => sortField && toggleSort(sortField)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
              >
                <ArrowUpDown className="w-4 h-4" />
                排序
                {sortField && (
                  <span className="text-xs text-emerald-600">
                    ({sortOrder === 'asc' ? '升序' : '降序'})
                  </span>
                )}
              </button>
            </div>
            
            {/* 右侧筛选 */}
            <div className="flex items-center gap-3">
              {/* 监测设备筛选 */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowDeviceDropdown(!showDeviceDropdown)
                    setShowPointDropdown(false)
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-white hover:bg-gray-50 rounded-md border border-gray-200 min-w-[130px] justify-between transition-colors"
                >
                  <span className="truncate">{selectedDevice || '监测设备'}</span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                {showDeviceDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[160px] max-h-60 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedDevice('')
                        setShowDeviceDropdown(false)
                      }}
                      className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 text-gray-500"
                    >
                      全部设备
                    </button>
                    {devices.map(device => (
                      <button
                        key={device.id}
                        onClick={() => {
                          setSelectedDevice(device.name)
                          setShowDeviceDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                          selectedDevice === device.name ? 'bg-emerald-50 text-emerald-600' : ''
                        }`}
                      >
                        {device.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* 监测点位筛选 */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowPointDropdown(!showPointDropdown)
                    setShowDeviceDropdown(false)
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 bg-white hover:bg-gray-50 rounded-md border border-gray-200 min-w-[130px] justify-between transition-colors"
                >
                  <span className="truncate">{selectedPoint || '监测点位'}</span>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </button>
                {showPointDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 min-w-[160px] max-h-60 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedPoint('')
                        setShowPointDropdown(false)
                      }}
                      className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 text-gray-500"
                    >
                      全部点位
                    </button>
                    {points.map(point => (
                      <button
                        key={point.id}
                        onClick={() => {
                          setSelectedPoint(point.name)
                          setShowPointDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 ${
                          selectedPoint === point.name ? 'bg-emerald-50 text-emerald-600' : ''
                        }`}
                      >
                        {point.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* 时间范围筛选 */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-emerald-300"
                  />
                  <span>至</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-emerald-300"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* 数据表格 */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr>
                  {visibleColumns.map(col => (
                    <th
                      key={col.key}
                      className="px-3 py-2.5 text-left font-medium text-gray-600 border-b border-gray-100 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                      style={{ minWidth: col.width }}
                      onClick={() => !['id', 'time', 'device', 'point'].includes(col.key) && toggleSort(col.key)}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sortField === col.key && (
                          <ArrowUpDown className={`w-3 h-3 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={visibleColumns.length} className="px-4 py-12 text-center text-gray-400">
                      暂无数据
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-emerald-50/50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      {visibleColumns.map(col => (
                        <td
                          key={col.key}
                          className="px-3 py-2.5 text-gray-700 border-b border-gray-50 whitespace-nowrap"
                        >
                          {item[col.key as keyof typeof item]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* 底部统计 */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50/50 flex-shrink-0 text-sm text-gray-500">
            <span>共 {filteredData.length} 条数据</span>
            <span>
              {selectedDevice && `设备: ${selectedDevice} | `}
              {selectedPoint && `点位: ${selectedPoint} | `}
              {startDate && `起始: ${startDate} | `}
              {endDate && `结束: ${endDate}`}
              {!selectedDevice && !selectedPoint && !startDate && !endDate && '未设置筛选条件'}
            </span>
          </div>
        </div>
      </div>
      
      {/* 点击其他区域关闭下拉菜单 */}
      {(showDeviceDropdown || showPointDropdown) && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => {
            setShowDeviceDropdown(false)
            setShowPointDropdown(false)
          }} 
        />
      )}
    </div>
  )
}

export default EcologyDataManagement
