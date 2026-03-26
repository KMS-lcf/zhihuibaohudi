// 巡护统计考核数据

// 年份选项
export const yearOptions = ['2025', '2024', '2023', '2022', '2021', '2020']

// 月份选项
export const monthOptions = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

// 巡护人员统计数据
export const patrolPersonnelStats = [
  { id: 'P001', name: '张明', distance: 156.8, patrolCount: 28 },
  { id: 'P002', name: '李华', distance: 142.5, patrolCount: 25 },
  { id: 'P003', name: '王强', distance: 138.2, patrolCount: 30 },
  { id: 'P004', name: '刘伟', distance: 125.6, patrolCount: 22 },
  { id: 'P005', name: '赵军', distance: 118.3, patrolCount: 24 },
  { id: 'P006', name: '陈静', distance: 105.8, patrolCount: 20 },
  { id: 'P007', name: '周伟', distance: 98.5, patrolCount: 18 },
  { id: 'P008', name: '吴敏', distance: 92.1, patrolCount: 16 },
  { id: 'P009', name: '孙磊', distance: 85.6, patrolCount: 15 },
  { id: 'P010', name: '郑华', distance: 78.2, patrolCount: 14 },
]

// 上报事件统计数据
export const reportEventStats = [
  { name: '人为干扰', value: 156, color: '#ef4444' },
  { name: '自然灾害', value: 42, color: '#f97316' },
  { name: '有害生物', value: 78, color: '#a855f7' },
  { name: '火灾隐患', value: 35, color: '#dc2626' },
  { name: '设备巡检', value: 245, color: '#3b82f6' },
  { name: '社区走访', value: 89, color: '#06b6d4' },
  { name: '林政案件', value: 23, color: '#eab308' },
  { name: '林草征占', value: 15, color: '#84cc16' },
  { name: '其它事件', value: 67, color: '#6b7280' },
]

// 巡护类型统计数据
export const patrolTypeStats = [
  { name: '自由巡护', value: 1256, color: '#22c55e' },
  { name: '任务巡护', value: 845, color: '#3b82f6' },
]

// 发现物种统计数据 - 按种数
export const speciesDiscoveryStats = [
  { name: '植物', value: 245 },
  { name: '鸟类', value: 128 },
  { name: '兽类', value: 56 },
  { name: '两爬', value: 42 },
  { name: '昆虫', value: 312 },
  { name: '大型真菌', value: 78 },
]

// 发现物种统计数据 - 按发现次数
export const speciesDiscoveryByCount = [
  { name: '植物', value: 1256 },
  { name: '鸟类', value: 892 },
  { name: '兽类', value: 234 },
  { name: '两爬', value: 156 },
  { name: '昆虫', value: 2045 },
  { name: '大型真菌', value: 312 },
]

// 发现物种Top5 - 植物
export const speciesTop5Plant = [
  { name: '栓皮栎', count: 89 },
  { name: '杜鹃花', count: 76 },
  { name: '山杨', count: 65 },
  { name: '野八角', count: 52 },
  { name: '华山松', count: 45 },
]

// 发现物种Top5 - 动物
export const speciesTop5Animal = [
  { name: '野猪', count: 156 },
  { name: '豹猫', count: 98 },
  { name: '果子狸', count: 78 },
  { name: '褐马鸡', count: 65 },
  { name: '红腹锦鸡', count: 52 },
]

// 分析工具列表
export const analysisTools = [
  { id: 'patrol-stats', name: '巡护工作统计', icon: 'BarChart3' },
  { id: 'patrol-ranking', name: '巡护考核排名', icon: 'Trophy' },
  { id: 'monthly-report', name: '巡护月报', icon: 'FileText' },
  { id: 'quarterly-report', name: '巡护季报', icon: 'Calendar' },
  { id: 'annual-report', name: '巡护年报', icon: 'FileCheck' },
]

// 模拟不同年月的数据
export function getPatrolDataByYearMonth(year: string, month: string | null) {
  // 基于年月生成不同的数据
  const yearFactor = parseInt(year) - 2020
  const monthFactor = month ? parseInt(month) / 12 : 1
  
  const personnel = patrolPersonnelStats.map((p, idx) => ({
    ...p,
    distance: Math.round((p.distance * (1 + yearFactor * 0.1) * monthFactor + Math.random() * 20) * 10) / 10,
    patrolCount: Math.round(p.patrolCount * (1 + yearFactor * 0.05) * monthFactor + Math.random() * 5)
  })).sort((a, b) => b.distance - a.distance)
  
  return { personnel }
}

export function getEventStatsByYearMonth(year: string, month: string | null) {
  const yearFactor = parseInt(year) - 2020
  const monthFactor = month ? parseInt(month) / 12 : 1
  
  return reportEventStats.map(e => ({
    ...e,
    value: Math.round(e.value * (1 + yearFactor * 0.08) * monthFactor + Math.random() * 10)
  }))
}

export function getPatrolTypeStatsByYearMonth(year: string, month: string | null) {
  const yearFactor = parseInt(year) - 2020
  const monthFactor = month ? parseInt(month) / 12 : 1
  
  return patrolTypeStats.map(t => ({
    ...t,
    value: Math.round(t.value * (1 + yearFactor * 0.1) * monthFactor + Math.random() * 50)
  }))
}

export function getSpeciesStatsByYearMonth(year: string, month: string | null, type: 'count' | 'species') {
  const yearFactor = parseInt(year) - 2020
  const monthFactor = month ? parseInt(month) / 12 : 1
  
  const baseData = type === 'species' ? speciesDiscoveryStats : speciesDiscoveryByCount
  
  return baseData.map(s => ({
    ...s,
    value: Math.round(s.value * (1 + yearFactor * 0.12) * monthFactor + Math.random() * 20)
  }))
}

export function getSpeciesTop5ByYearMonth(year: string, month: string | null, type: 'plant' | 'animal') {
  const yearFactor = parseInt(year) - 2020
  const monthFactor = month ? parseInt(month) / 12 : 1
  
  const baseData = type === 'plant' ? speciesTop5Plant : speciesTop5Animal
  
  return baseData.map(s => ({
    ...s,
    count: Math.round(s.count * (1 + yearFactor * 0.08) * monthFactor + Math.random() * 10)
  }))
}
