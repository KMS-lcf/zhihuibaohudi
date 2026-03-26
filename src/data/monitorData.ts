// 视频监测和红外相机相关数据

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

// 生成24小时监测趋势数据
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

export const monitorTrendData24Hours = generateMonitorTrendData()

// 红外相机布设相关数据
export const surveyProjects = [
  { id: 1, name: '2024年度野生动物监测项目', startDate: '2024-01-01', endDate: '2024-12-31' },
  { id: 2, name: '褐马鸡专项调查项目', startDate: '2024-03-01', endDate: '2024-06-30' },
  { id: 3, name: '金钱豹监测项目', startDate: '2024-04-01', endDate: '2024-10-31' }
]

export const cameraModels = [
  { id: 1, name: 'RECONYX HP2X', manufacturer: 'RECONYX' },
  { id: 2, name: 'BUSHNELL TROPHY CAM', manufacturer: 'BUSHNELL' },
  { id: 3, name: 'Browning Strike Force', manufacturer: 'Browning' },
  { id: 4, name: 'SPYPOINT SOLAR', manufacturer: 'SPYPOINT' }
]

// 红外相机布设数据
export const infraredCameraDeploymentData = [
  { id: 1, cameraId: 'IR-001', model: 'RECONYX HP2X', location: '核心区北侧', lat: 39.7956, lng: 115.9324, installDate: '2024-01-15', status: '正常', battery: 85, sdCard: 32, lastActive: '2024-03-15 14:32:15' },
  { id: 2, cameraId: 'IR-002', model: 'BUSHNELL TROPHY CAM', location: '缓冲区东侧', lat: 39.7892, lng: 115.9456, installDate: '2024-01-16', status: '正常', battery: 72, sdCard: 28, lastActive: '2024-03-15 14:28:22' },
  { id: 3, cameraId: 'IR-003', model: 'Browning Strike Force', location: '实验区南段', lat: 39.7823, lng: 115.9287, installDate: '2024-01-18', status: '电量低', battery: 15, sdCard: 45, lastActive: '2024-03-15 12:15:45' },
  { id: 4, cameraId: 'IR-004', model: 'SPYPOINT SOLAR', location: '洞口附近', lat: 39.7978, lng: 115.9412, installDate: '2024-01-20', status: '正常', battery: 98, sdCard: 18, lastActive: '2024-03-15 14:35:18' },
  { id: 5, cameraId: 'IR-005', model: 'RECONYX HP2X', location: '溪谷地带', lat: 39.7912, lng: 115.9389, installDate: '2024-02-01', status: '离线', battery: 0, sdCard: 52, lastActive: '2024-03-12 08:22:35' }
]

// 红外相机标签页
export const infraredCameraTabs = [
  { id: 'overview', name: '布设总览' },
  { id: 'cameras', name: '相机管理' },
  { id: 'data', name: '监测数据' },
  { id: 'analysis', name: '统计分析' }
]

// 视频监测标签页
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
