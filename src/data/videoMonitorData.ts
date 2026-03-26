// 视频监测数据

// 监测设备数据
export const imageMonitorDevices = [
  { id: 1, name: '设备A', pointName: 'A1', status: '在线', lat: '39.7234', lng: '115.8921', installDate: '2023-06-15', location: '核心区东侧', resolution: '1080P', angle: '45°', speciesCount: 45, detectionCount: 1256 },
  { id: 2, name: '设备B', pointName: 'B2', status: '在线', lat: '39.7256', lng: '115.8856', installDate: '2023-06-20', location: '缓冲区北段', resolution: '1080P', angle: '60°', speciesCount: 38, detectionCount: 987 },
  { id: 3, name: '设备C', pointName: 'C3', status: '离线', lat: '39.7189', lng: '115.8978', installDate: '2023-07-05', location: '实验区南部', resolution: '720P', angle: '30°', speciesCount: 22, detectionCount: 543 },
  { id: 4, name: '设备D', pointName: 'D4', status: '在线', lat: '39.7278', lng: '115.8745', installDate: '2023-07-15', location: '核心区西侧', resolution: '4K', angle: '90°', speciesCount: 67, detectionCount: 1832 },
  { id: 5, name: '设备E', pointName: 'E5', status: '在线', lat: '39.7212', lng: '115.8812', installDate: '2023-08-01', location: '缓冲区南段', resolution: '1080P', angle: '45°', speciesCount: 31, detectionCount: 765 }
]

// 监测设备点位（用于地图显示）
export const imageMonitorPoints = [
  { id: 1, top: '25%', left: '35%', device: imageMonitorDevices[0] },
  { id: 2, top: '40%', left: '55%', device: imageMonitorDevices[1] },
  { id: 3, top: '55%', left: '30%', device: imageMonitorDevices[2] },
  { id: 4, top: '30%', left: '65%', device: imageMonitorDevices[3] },
  { id: 5, top: '50%', left: '45%', device: imageMonitorDevices[4] }
]

// 视频监测点位（用于综合展示地图显示）
export const videoMonitorPoints = [
  { id: 1, top: '25%', left: '55%', device: imageMonitorDevices[0] },
  { id: 2, top: '50%', left: '30%', device: imageMonitorDevices[3] }
]

// 最新监测数据（用于实时动态展示）
export const latestDetections = [
  { time: '2024-03-15 15:32', point: 'A1', device: '设备A', species: '黑鹳', count: 2 },
  { time: '2024-03-15 15:28', point: 'D4', device: '设备D', species: '褐马鸡', count: 1 },
  { time: '2024-03-15 15:15', point: 'B2', device: '设备B', species: '红腹锦鸡', count: 3 },
  { time: '2024-03-15 14:58', point: 'E5', device: '设备E', species: '勺鸡', count: 2 },
  { time: '2024-03-15 14:45', point: 'A1', device: '设备A', species: '黑鹳', count: 1 },
  { time: '2024-03-15 14:30', point: 'D4', device: '设备D', species: '苍鹭', count: 4 },
  { time: '2024-03-15 14:12', point: 'B2', device: '设备B', species: '野鸡', count: 2 },
  { time: '2024-03-15 14:05', point: 'C3', device: '设备C', species: '白鹭', count: 3 },
  { time: '2024-03-15 13:52', point: 'A1', device: '设备A', species: '池鹭', count: 1 },
  { time: '2024-03-15 13:38', point: 'E5', device: '设备E', species: '夜鹭', count: 2 }
]

// 用于随机生成新检测数据的物种列表
export const speciesPool = ['黑鹳', '褐马鸡', '红腹锦鸡', '勺鸡', '苍鹭', '野鸡', '白鹭', '池鹭', '夜鹭', '黄鹂', '画眉', '大山雀']

// 视频监测界面页签
export const imageMonitorTabs = [
  { id: 'realtime', name: '实时监测' },
  { id: 'data', name: '监测数据' },
  { id: 'points', name: '监测点位' },
  { id: 'devices', name: '监测设备' }
]

// 视频中识别的鸟类
export const detectedBirdsInVideo = [
  { id: 1, name: '黑鹳', confidence: 96.8, x: 35, y: 40, width: 15, height: 20 },
  { id: 2, name: '黑鹳', confidence: 94.2, x: 55, y: 45, width: 12, height: 18 }
]

// 近24小时监测动态数据生成函数
export const generateMonitorTrendData = () => {
  const data = []
  const now = new Date()
  for (let i = 47; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 30 * 60 * 1000)
    const hours = time.getHours()
    const minutes = time.getMinutes().toString().padStart(2, '0')
    
    let baseCount = 35
    if (hours >= 6 && hours < 9) {
      baseCount = 45 + Math.floor(Math.random() * 15)
    } else if (hours >= 9 && hours < 12) {
      baseCount = 55 + Math.floor(Math.random() * 20)
    } else if (hours >= 12 && hours < 15) {
      baseCount = 50 + Math.floor(Math.random() * 15)
    } else if (hours >= 15 && hours < 19) {
      baseCount = 60 + Math.floor(Math.random() * 20)
    } else if (hours >= 19 && hours < 22) {
      baseCount = 45 + Math.floor(Math.random() * 15)
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

// 监测数据趋势（按月）
export const monitorTrendDataByMonth = [
  { label: '1月', count: 1250 },
  { label: '2月', count: 1580 },
  { label: '3月', count: 2100 },
  { label: '4月', count: 2890 },
  { label: '5月', count: 3450 },
  { label: '6月', count: 3200 },
  { label: '7月', count: 2850 },
  { label: '8月', count: 2560 },
  { label: '9月', count: 3100 },
  { label: '10月', count: 3680 },
  { label: '11月', count: 2950 },
  { label: '12月', count: 2450 }
]

// 监测数据趋势（按日 - 近30天）
export const monitorTrendDataByDay = [
  { label: '3/1', count: 85 },
  { label: '3/2', count: 92 },
  { label: '3/3', count: 78 },
  { label: '3/4', count: 105 },
  { label: '3/5', count: 118 },
  { label: '3/6', count: 95 },
  { label: '3/7', count: 88 },
  { label: '3/8', count: 112 },
  { label: '3/9', count: 125 },
  { label: '3/10', count: 98 },
  { label: '3/11', count: 135 },
  { label: '3/12', count: 142 },
  { label: '3/13', count: 108 },
  { label: '3/14', count: 156 },
  { label: '3/15', count: 168 },
  { label: '3/16', count: 145 },
  { label: '3/17', count: 132 },
  { label: '3/18', count: 175 },
  { label: '3/19', count: 162 },
  { label: '3/20', count: 188 },
  { label: '3/21', count: 195 },
  { label: '3/22', count: 172 },
  { label: '3/23', count: 158 },
  { label: '3/24', count: 182 },
  { label: '3/25', count: 205 },
  { label: '3/26', count: 198 },
  { label: '3/27', count: 215 },
  { label: '3/28', count: 225 },
  { label: '3/29', count: 210 },
  { label: '3/30', count: 235 }
]
