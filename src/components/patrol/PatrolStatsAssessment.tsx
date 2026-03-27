'use client'

import { useState, useMemo } from 'react'
import { 
  BarChart3, 
  Trophy, 
  FileText, 
  Calendar, 
  FileCheck,
  X,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'
import {
  yearOptions,
  getPatrolDataByYearMonth,
  getEventStatsByYearMonth,
  getPatrolTypeStatsByYearMonth,
  getSpeciesStatsByYearMonth,
  getSpeciesTop5ByYearMonth,
  analysisTools
} from '@/data/patrolStatsData'

// 报告生成弹窗组件
function ReportModal({ 
  isOpen, 
  onClose, 
  reportType 
}: { 
  isOpen: boolean
  onClose: () => void
  reportType: { id: string; name: string; icon: string } | null
}) {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 1500)
  }

  const handleClose = () => {
    setIsGenerating(false)
    setIsGenerated(false)
    setSelectedMonth(null)
    setSelectedQuarter(null)
    onClose()
  }

  if (!isOpen || !reportType) return null

  const isMonthlyReport = reportType.id === 'monthly-report'
  const isQuarterlyReport = reportType.id === 'quarterly-report'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
      <div 
        className="bg-white rounded-xl shadow-2xl w-[480px] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* 标题 */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">{reportType.name}</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容区 */}
        <div className="p-5">
          {!isGenerated ? (
            <>
              {/* 参数设置 */}
              <div className="space-y-4">
                {/* 年份选择 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">选择年份</label>
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}年</option>
                    ))}
                  </select>
                </div>

                {/* 月报 - 月份选择 */}
                {isMonthlyReport && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择月份</label>
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 12 }, (_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedMonth(String(idx + 1))}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedMonth === String(idx + 1)
                              ? 'bg-teal-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {idx + 1}月
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 季报 - 季度选择 */}
                {isQuarterlyReport && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择季度</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['第一季度', '第二季度', '第三季度', '第四季度'].map((quarter, idx) => (
                        <button
                          key={quarter}
                          onClick={() => setSelectedQuarter(String(idx + 1))}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedQuarter === String(idx + 1)
                              ? 'bg-teal-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                          }`}
                        >
                          {quarter}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 人员选择（巡护工作统计和巡护考核排名） */}
                {(reportType.id === 'patrol-stats' || reportType.id === 'patrol-ranking') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择人员</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="all">全部人员</option>
                      <option value="team1">巡护一队</option>
                      <option value="team2">巡护二队</option>
                      <option value="team3">巡护三队</option>
                    </select>
                  </div>
                )}
              </div>

              {/* 生成按钮 */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (isMonthlyReport && !selectedMonth) || (isQuarterlyReport && !selectedQuarter)}
                className="w-full mt-6 px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    生成中...
                  </>
                ) : (
                  '生成报告'
                )}
              </button>
            </>
          ) : (
            /* 生成成功 */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl font-medium text-gray-900 mb-2">报告生成成功</h4>
              <p className="text-gray-500 mb-6">
                {selectedYear}年
                {isMonthlyReport && selectedMonth && `${selectedMonth}月`}
                {isQuarterlyReport && selectedQuarter && `第${selectedQuarter}季度`}
                {reportType.name}已生成
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  关闭
                </button>
                <button
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center gap-2 font-medium"
                >
                  <FileText className="w-4 h-4" />
                  下载报告
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 统计考核主组件
export function PatrolStatsAssessment() {
  // 时间轴状态
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  
  // 人员选择状态
  const [selectedPersonnel, setSelectedPersonnel] = useState<Set<string>>(new Set())
  
  // 物种统计类型切换
  const [speciesStatType, setSpeciesStatType] = useState<'species' | 'count'>('species')
  const [speciesTop5Type, setSpeciesTop5Type] = useState<'plant' | 'animal'>('plant')
  
  // 弹窗状态
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState<{ id: string; name: string; icon: string } | null>(null)

  // 年份导航
  const currentYearIndex = yearOptions.indexOf(selectedYear)
  const goToPrevYear = () => {
    if (currentYearIndex < yearOptions.length - 1) {
      setSelectedYear(yearOptions[currentYearIndex + 1])
      setSelectedMonth(null)
    }
  }
  const goToNextYear = () => {
    if (currentYearIndex > 0) {
      setSelectedYear(yearOptions[currentYearIndex - 1])
      setSelectedMonth(null)
    }
  }

  // 使用useMemo计算派生数据
  const personnelData = useMemo(() => 
    getPatrolDataByYearMonth(selectedYear, selectedMonth).personnel,
    [selectedYear, selectedMonth]
  )
  
  const eventStats = useMemo(() => 
    getEventStatsByYearMonth(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  )
  
  const patrolTypeData = useMemo(() => 
    getPatrolTypeStatsByYearMonth(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  )
  
  const speciesStats = useMemo(() => 
    getSpeciesStatsByYearMonth(selectedYear, selectedMonth, speciesStatType),
    [selectedYear, selectedMonth, speciesStatType]
  )
  
  const speciesTop5 = useMemo(() => 
    getSpeciesTop5ByYearMonth(selectedYear, selectedMonth, speciesTop5Type),
    [selectedYear, selectedMonth, speciesTop5Type]
  )

  // 切换人员选择
  const togglePersonnel = (id: string) => {
    const newSet = new Set(selectedPersonnel)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedPersonnel(newSet)
  }

  // 打开报告弹窗
  const openReportModal = (tool: typeof analysisTools[0]) => {
    setSelectedReportType(tool)
    setReportModalOpen(true)
  }

  // 获取图标组件
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />
      case 'Trophy': return <Trophy className="w-5 h-5" />
      case 'FileText': return <FileText className="w-5 h-5" />
      case 'Calendar': return <Calendar className="w-5 h-5" />
      case 'FileCheck': return <FileCheck className="w-5 h-5" />
      default: return <FileText className="w-5 h-5" />
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 主内容区 - 使用flex布局 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：时间轴 + 人员列表 - 占1/4 */}
        <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
          {/* 时间轴区域 - 放在顶部 */}
          <div className="border-b border-gray-200 bg-gray-50/50">
            <div className="p-3">
              {/* 年份切换 */}
              <div className="flex items-center justify-between mb-2">
                <button 
                  onClick={goToPrevYear}
                  disabled={currentYearIndex >= yearOptions.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-base font-semibold text-gray-900">{selectedYear}</span>
                <button 
                  onClick={goToNextYear}
                  disabled={currentYearIndex <= 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {/* 月份选择 */}
              <div className="grid grid-cols-4 gap-1">
                <button
                  onClick={() => setSelectedMonth(null)}
                  className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                    selectedMonth === null
                      ? 'bg-teal-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  全年
                </button>
                {Array.from({ length: 12 }, (_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMonth(String(idx + 1))}
                    className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      selectedMonth === String(idx + 1)
                        ? 'bg-teal-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {idx + 1}月
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 人员列表 */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* 表头 */}
            <div className="px-4 py-2.5 border-b border-gray-200 grid grid-cols-[36px_1fr_70px_60px_70px] gap-2 text-xs font-medium text-gray-500 bg-gray-50/50">
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 rounded border border-gray-300"></div>
              </div>
              <div>巡护员</div>
              <div className="text-right">里程/km</div>
              <div className="text-right">次数</div>
              <div className="text-right">上报数据</div>
            </div>

            {/* 人员列表 - 按里程倒序排列 */}
            <div className="flex-1 overflow-y-auto">
              {personnelData.map((person, idx) => (
                <div
                  key={person.id}
                  onClick={() => togglePersonnel(person.id)}
                  className={`px-4 py-2.5 border-b border-gray-100 grid grid-cols-[36px_1fr_70px_60px_70px] gap-2 items-center cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedPersonnel.has(person.id) ? 'bg-teal-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedPersonnel.has(person.id)
                        ? 'bg-teal-500 border-teal-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedPersonnel.has(person.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-4">{idx + 1}</span>
                    <span className="text-gray-900 text-sm font-medium">{person.name}</span>
                  </div>
                  <div className="text-right text-teal-600 text-sm font-medium">{person.distance}</div>
                  <div className="text-right text-gray-600 text-sm">{person.patrolCount}</div>
                  <div className="text-right text-blue-600 text-sm font-medium">{person.reportData}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 中间：统计图区 - 占1/2 */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 h-full" style={{ minHeight: '600px' }}>
            {/* 上报事件统计 - 环形图 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col aspect-square">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-medium text-gray-700">上报事件统计</h3>
              </div>
              <div className="flex-1 p-4 flex">
                <div className="flex-1 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={eventStats}
                        cx="50%"
                        cy="50%"
                        innerRadius="45%"
                        outerRadius="70%"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {eventStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-[100px] flex flex-col justify-center gap-1 text-xs">
                  {eventStats.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-600 truncate text-[11px]">{item.name}</span>
                      <span className="text-gray-900 ml-auto font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 巡护类型统计 - 饼图 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col aspect-square">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-sm font-medium text-gray-700">巡护类型统计</h3>
              </div>
              <div className="flex-1 p-4 flex">
                <div className="flex-1 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={patrolTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius="70%"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {patrolTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-[80px] flex flex-col justify-center gap-4 text-sm">
                  {patrolTypeData.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600 text-xs">{item.name}</span>
                      </div>
                      <span className="text-gray-900 font-medium pl-5">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 发现物种统计 - 柱状图 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col aspect-square">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">发现物种统计</h3>
                <select
                  value={speciesStatType}
                  onChange={(e) => setSpeciesStatType(e.target.value as 'species' | 'count')}
                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="species">种数</option>
                  <option value="count">发现次数</option>
                </select>
              </div>
              <div className="flex-1 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speciesStats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#9ca3af" fontSize={11} />
                    <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={11} width={50} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" fill="#14b8a6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 发现物种Top5 - 纵向柱形图 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col aspect-square">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">发现物种Top5</h3>
                <select
                  value={speciesTop5Type}
                  onChange={(e) => setSpeciesTop5Type(e.target.value as 'plant' | 'animal')}
                  className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="plant">植物</option>
                  <option value="animal">动物</option>
                </select>
              </div>
              <div className="flex-1 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={speciesTop5}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} />
                    <YAxis stroke="#9ca3af" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：智能分析工具区 - 占1/4 */}
        <div className="w-1/4 bg-white border-l border-gray-200 flex flex-col">
          {/* 标题 */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/50">
            <h3 className="text-sm font-medium text-gray-700">智能分析工具</h3>
          </div>
          <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
            {analysisTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => openReportModal(tool)}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:text-gray-900 transition-colors text-left"
              >
                <div className="text-teal-500">
                  {getIcon(tool.icon)}
                </div>
                <span className="text-sm font-medium">{tool.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 报告弹窗 */}
      <ReportModal 
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportType={selectedReportType}
      />
    </div>
  )
}
