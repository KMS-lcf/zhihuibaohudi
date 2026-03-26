// 声纹监测数据

// 声纹监测设备数据
export const acousticMonitorDevices = [
  { id: 1, name: '声纹设备A', pointName: '核心区东侧', status: '在线', lat: '39.7234', lng: '115.8921', installDate: '2023-06-15', location: '核心区东侧森林', speciesCount: 45, detectionCount: 2156 },
  { id: 2, name: '声纹设备B', pointName: '缓冲区北段', status: '在线', lat: '39.7256', lng: '115.8856', installDate: '2023-06-20', location: '缓冲区北段湿地', speciesCount: 38, detectionCount: 1787 },
  { id: 3, name: '声纹设备C', pointName: '实验区南部', status: '离线', lat: '39.7189', lng: '115.8978', installDate: '2023-07-05', location: '实验区南部草甸', speciesCount: 22, detectionCount: 943 },
  { id: 4, name: '声纹设备D', pointName: '核心区西侧', status: '在线', lat: '39.7278', lng: '115.8745', installDate: '2023-07-15', location: '核心区西侧密林', speciesCount: 67, detectionCount: 2832 },
  { id: 5, name: '声纹设备E', pointName: '缓冲区南段', status: '在线', lat: '39.7212', lng: '115.8812', installDate: '2023-08-01', location: '缓冲区南段灌木丛', speciesCount: 31, detectionCount: 1265 }
]

// 声纹监测设备点位（用于地图显示）
export const acousticMonitorPoints = [
  { id: 1, top: '25%', left: '35%', device: acousticMonitorDevices[0] },
  { id: 2, top: '40%', left: '55%', device: acousticMonitorDevices[1] },
  { id: 3, top: '55%', left: '30%', device: acousticMonitorDevices[2] },
  { id: 4, top: '30%', left: '65%', device: acousticMonitorDevices[3] },
  { id: 5, top: '50%', left: '45%', device: acousticMonitorDevices[4] }
]

// 声纹监测页签
export const acousticMonitorTabs = [
  { id: 'realtime', name: '实时监测' },
  { id: 'data', name: '监测数据' },
  { id: 'points', name: '监测点位' },
  { id: 'devices', name: '监测设备' }
]

// 鸟类目数据（按目统计的物种数量）
export const birdOrderBySpecies = [
  { name: '雀形目', count: 45, color: '#22c55e' },
  { name: '鹰形目', count: 12, color: '#3b82f6' },
  { name: '鸻形目', count: 18, color: '#f59e0b' },
  { name: '雁形目', count: 15, color: '#ef4444' },
  { name: '鹤形目', count: 8, color: '#8b5cf6' },
  { name: '鹃形目', count: 6, color: '#ec4899' },
  { name: '佛法僧目', count: 5, color: '#14b8a6' },
  { name: '其他', count: 10, color: '#6b7280' }
]

// 鸟类科数据（按科统计的物种数量）
export const birdFamilyBySpecies = [
  { name: '鹟科', count: 12, color: '#22c55e' },
  { name: '莺科', count: 15, color: '#3b82f6' },
  { name: '雀科', count: 10, color: '#f59e0b' },
  { name: '鹰科', count: 8, color: '#ef4444' },
  { name: '鸭科', count: 12, color: '#8b5cf6' },
  { name: '鸻科', count: 9, color: '#ec4899' },
  { name: '鹭科', count: 6, color: '#14b8a6' },
  { name: '杜鹃科', count: 5, color: '#f97316' },
  { name: '啄木鸟科', count: 4, color: '#06b6d4' },
  { name: '其他', count: 18, color: '#6b7280' }
]

// 发现物种TOP10数据（按发现次数排名的鸟类）
export const discoveredSpeciesTop10 = [
  { name: '大山雀', count: 256 },
  { name: '麻雀', count: 234 },
  { name: '白头鹎', count: 198 },
  { name: '红头山雀', count: 187 },
  { name: '黄眉柳莺', count: 165 },
  { name: '灰喜鹊', count: 156 },
  { name: '珠颈斑鸠', count: 143 },
  { name: '黑尾蜡嘴雀', count: 132 },
  { name: '树鹨', count: 121 },
  { name: '白鹡鸰', count: 115 }
]

// 按设备分组的发现物种数据
export const discoveredSpeciesByDevice: Record<string, { name: string; count: number }[]> = {
  '全部': discoveredSpeciesTop10,
  '声纹设备A': [
    { name: '大山雀', count: 89 },
    { name: '麻雀', count: 76 },
    { name: '白头鹎', count: 65 },
    { name: '红头山雀', count: 58 },
    { name: '黄眉柳莺', count: 52 },
    { name: '灰喜鹊', count: 48 },
    { name: '珠颈斑鸠', count: 42 },
    { name: '黑尾蜡嘴雀', count: 38 },
    { name: '树鹨', count: 35 },
    { name: '白鹡鸰', count: 32 }
  ],
  '声纹设备B': [
    { name: '大山雀', count: 67 },
    { name: '麻雀', count: 58 },
    { name: '白头鹎', count: 52 },
    { name: '红头山雀', count: 45 },
    { name: '黄眉柳莺', count: 42 },
    { name: '灰喜鹊', count: 38 },
    { name: '珠颈斑鸠', count: 35 },
    { name: '黑尾蜡嘴雀', count: 32 },
    { name: '树鹨', count: 28 },
    { name: '白鹡鸰', count: 25 }
  ],
  '声纹设备C': [
    { name: '大山雀', count: 45 },
    { name: '麻雀', count: 42 },
    { name: '白头鹎', count: 38 },
    { name: '红头山雀', count: 32 },
    { name: '黄眉柳莺', count: 28 },
    { name: '灰喜鹊', count: 25 },
    { name: '珠颈斑鸠', count: 22 },
    { name: '黑尾蜡嘴雀', count: 20 },
    { name: '树鹨', count: 18 },
    { name: '白鹡鸰', count: 15 }
  ],
  '声纹设备D': [
    { name: '大山雀', count: 98 },
    { name: '麻雀', count: 87 },
    { name: '白头鹎', count: 78 },
    { name: '红头山雀', count: 72 },
    { name: '黄眉柳莺', count: 65 },
    { name: '灰喜鹊', count: 58 },
    { name: '珠颈斑鸠', count: 52 },
    { name: '黑尾蜡嘴雀', count: 48 },
    { name: '树鹨', count: 42 },
    { name: '白鹡鸰', count: 38 }
  ],
  '声纹设备E': [
    { name: '大山雀', count: 55 },
    { name: '麻雀', count: 48 },
    { name: '白头鹎', count: 42 },
    { name: '红头山雀', count: 38 },
    { name: '黄眉柳莺', count: 35 },
    { name: '灰喜鹊', count: 32 },
    { name: '珠颈斑鸠', count: 28 },
    { name: '黑尾蜡嘴雀', count: 25 },
    { name: '树鹨', count: 22 },
    { name: '白鹡鸰', count: 18 }
  ]
}

// 生成24小时声纹监测趋势数据
export const generateAcousticTrendData = () => {
  const data = []
  const now = new Date()
  for (let i = 47; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 30 * 60 * 1000)
    const hours = time.getHours()
    const minutes = time.getMinutes().toString().padStart(2, '0')
    
    let baseCount = 35
    // 声纹监测在清晨和傍晚鸟类活动高峰期更活跃
    if (hours >= 5 && hours < 8) {
      baseCount = 65 + Math.floor(Math.random() * 25)
    } else if (hours >= 8 && hours < 11) {
      baseCount = 55 + Math.floor(Math.random() * 20)
    } else if (hours >= 11 && hours < 14) {
      baseCount = 40 + Math.floor(Math.random() * 15)
    } else if (hours >= 14 && hours < 17) {
      baseCount = 50 + Math.floor(Math.random() * 15)
    } else if (hours >= 17 && hours < 20) {
      baseCount = 70 + Math.floor(Math.random() * 25)
    } else {
      baseCount = 25 + Math.floor(Math.random() * 15)
    }
    
    data.push({
      label: `${hours.toString().padStart(2, '0')}:${minutes}`,
      count: baseCount
    })
  }
  return data
}
