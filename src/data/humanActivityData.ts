// 人类活动监控相关数据

// 监控摄像头数据（完整版，包含分辨率、方向、角度等属性）
export const surveillanceCameras = [
  { id: 1, name: '入口监控A', location: '景区主入口', status: '在线', lat: '39.7234', lng: '115.8921', top: '30%', left: '25%', direction: '东北', resolution: '1080P', angle: '45°' },
  { id: 2, name: '入口监控B', location: '景区主入口', status: '在线', lat: '39.7236', lng: '115.8925', top: '32%', left: '28%', direction: '西南', resolution: '1080P', angle: '60°' },
  { id: 3, name: '停车场监控', location: '游客停车场', status: '在线', lat: '39.7201', lng: '115.8901', top: '45%', left: '20%', direction: '东', resolution: '720P', angle: '90°' },
  { id: 4, name: '核心区监控A', location: '核心区入口', status: '在线', lat: '39.7256', lng: '115.8856', top: '35%', left: '55%', direction: '北', resolution: '1080P', angle: '30°' },
  { id: 5, name: '核心区监控B', location: '核心区内部', status: '离线', lat: '39.7260', lng: '115.8860', top: '38%', left: '60%', direction: '南', resolution: '1080P', angle: '45°' },
  { id: 6, name: '缓冲区监控', location: '缓冲区北段', status: '在线', lat: '39.7245', lng: '115.8834', top: '50%', left: '65%', direction: '西', resolution: '720P', angle: '60°' },
  { id: 7, name: '步道监控A', location: '游览步道', status: '在线', lat: '39.7212', lng: '115.8812', top: '55%', left: '40%', direction: '东北', resolution: '1080P', angle: '90°' },
  { id: 8, name: '步道监控B', location: '游览步道', status: '在线', lat: '39.7198', lng: '115.8856', top: '60%', left: '45%', direction: '西南', resolution: '720P', angle: '45°' },
  { id: 9, name: '溶洞监控', location: '洞口区域', status: '在线', lat: '39.7234', lng: '115.8900', top: '40%', left: '50%', direction: '东', resolution: '1080P', angle: '30°' },
]

// 人类活动统计数据
export const humanActivityStatsData = {
  daily: [
    { camera: '入口监控A', intrusion: 3, vehicle: 15, other: 8 },
    { camera: '入口监控B', intrusion: 2, vehicle: 12, other: 5 },
    { camera: '停车场监控', intrusion: 1, vehicle: 25, other: 10 },
    { camera: '核心区监控A', intrusion: 5, vehicle: 2, other: 3 },
    { camera: '缓冲区监控', intrusion: 4, vehicle: 1, other: 2 },
    { camera: '步道监控A', intrusion: 2, vehicle: 3, other: 6 },
  ],
  weekly: [
    { camera: '入口监控A', intrusion: 21, vehicle: 105, other: 56 },
    { camera: '入口监控B', intrusion: 14, vehicle: 84, other: 35 },
    { camera: '停车场监控', intrusion: 7, vehicle: 175, other: 70 },
    { camera: '核心区监控A', intrusion: 35, vehicle: 14, other: 21 },
    { camera: '缓冲区监控', intrusion: 28, vehicle: 7, other: 14 },
    { camera: '步道监控A', intrusion: 14, vehicle: 21, other: 42 },
  ],
  monthly: [
    { camera: '入口监控A', intrusion: 89, vehicle: 445, other: 238 },
    { camera: '入口监控B', intrusion: 58, vehicle: 356, other: 149 },
    { camera: '停车场监控', intrusion: 29, vehicle: 745, other: 298 },
    { camera: '核心区监控A', intrusion: 147, vehicle: 59, other: 89 },
    { camera: '缓冲区监控', intrusion: 118, vehicle: 29, other: 59 },
    { camera: '步道监控A', intrusion: 59, vehicle: 89, other: 178 },
  ],
}

// 人类活动监测记录数据（用于历史数据界面）
export const humanActivityRecords = [
  { id: 1, type: '非法闯入', time: '2024-03-15 14:32:15', duration: 5, device: '入口监控A', area: '景区主入口', description: '发现1人未经许可进入核心区域' },
  { id: 2, type: '外来车辆', time: '2024-03-15 13:45:22', duration: 8, device: '停车场监控', area: '游客停车场', description: '一辆白色SUV进入限制区域' },
  { id: 3, type: '其他', time: '2024-03-15 12:18:33', duration: 3, device: '步道监控A', area: '游览步道', description: '游客偏离指定游览路线' },
  { id: 4, type: '非法闯入', time: '2024-03-15 11:05:47', duration: 12, device: '核心区监控A', area: '核心区入口', description: '发现2人翻越围栏进入核心区' },
  { id: 5, type: '外来车辆', time: '2024-03-15 10:22:18', duration: 6, device: '入口监控B', area: '景区主入口', description: '工程车辆未经审批进入' },
  { id: 6, type: '其他', time: '2024-03-15 09:15:29', duration: 4, device: '缓冲区监控', area: '缓冲区北段', description: '发现无人机航拍活动' },
  { id: 7, type: '非法闯入', time: '2024-03-14 18:42:55', duration: 15, device: '溶洞监控', area: '洞口区域', description: '闭园后有人滞留未离开' },
  { id: 8, type: '外来车辆', time: '2024-03-14 16:30:12', duration: 7, device: '停车场监控', area: '游客停车场', description: '摩托车进入步行区域' },
  { id: 9, type: '非法闯入', time: '2024-03-14 14:18:36', duration: 9, device: '核心区监控B', area: '核心区内部', description: '发现人员违规采集标本' },
  { id: 10, type: '其他', time: '2024-03-14 11:55:44', duration: 5, device: '步道监控B', area: '游览步道', description: '游客在禁烟区吸烟' },
  { id: 11, type: '外来车辆', time: '2024-03-13 15:28:19', duration: 11, device: '入口监控A', area: '景区主入口', description: '货运车辆违规进入景区' },
  { id: 12, type: '非法闯入', time: '2024-03-13 13:12:08', duration: 6, device: '缓冲区监控', area: '缓冲区北段', description: '发现3人违规露营' },
  { id: 13, type: '其他', time: '2024-03-13 10:45:33', duration: 3, device: '步道监控A', area: '游览步道', description: '游客投喂野生动物' },
  { id: 14, type: '外来车辆', time: '2024-03-12 14:58:27', duration: 8, device: '停车场监控', area: '游客停车场', description: '出租车进入禁区接客' },
  { id: 15, type: '非法闯入', time: '2024-03-12 09:32:41', duration: 14, device: '核心区监控A', area: '核心区入口', description: '探险者试图进入未开放区域' },
]

// 历史监控视频数据（近一个月，用于历史数据界面）
export const historicalVideos = [
  { id: 1, date: '2024-03-15', device: '入口监控A', deviceName: '入口监控A', duration: 1440, size: 2.3, status: '完整' },
  { id: 2, date: '2024-03-15', device: '入口监控B', deviceName: '入口监控B', duration: 1440, size: 2.1, status: '完整' },
  { id: 3, date: '2024-03-15', device: '停车场监控', deviceName: '停车场监控', duration: 1440, size: 1.8, status: '完整' },
  { id: 4, date: '2024-03-15', device: '核心区监控A', deviceName: '核心区监控A', duration: 1440, size: 2.4, status: '完整' },
  { id: 5, date: '2024-03-14', device: '入口监控A', deviceName: '入口监控A', duration: 1440, size: 2.2, status: '完整' },
  { id: 6, date: '2024-03-14', device: '入口监控B', deviceName: '入口监控B', duration: 1440, size: 2.0, status: '完整' },
  { id: 7, date: '2024-03-14', device: '缓冲区监控', deviceName: '缓冲区监控', duration: 1440, size: 1.6, status: '完整' },
  { id: 8, date: '2024-03-14', device: '步道监控A', deviceName: '步道监控A', duration: 1440, size: 1.9, status: '完整' },
  { id: 9, date: '2024-03-13', device: '入口监控A', deviceName: '入口监控A', duration: 1440, size: 2.1, status: '完整' },
  { id: 10, date: '2024-03-13', device: '停车场监控', deviceName: '停车场监控', duration: 1440, size: 1.7, status: '完整' },
  { id: 11, date: '2024-03-13', device: '溶洞监控', deviceName: '溶洞监控', duration: 1440, size: 2.5, status: '完整' },
  { id: 12, date: '2024-03-12', device: '入口监控A', deviceName: '入口监控A', duration: 1440, size: 2.0, status: '完整' },
  { id: 13, date: '2024-03-12', device: '核心区监控B', deviceName: '核心区监控B', duration: 720, size: 1.1, status: '部分' },
  { id: 14, date: '2024-03-12', device: '步道监控B', deviceName: '步道监控B', duration: 1440, size: 1.8, status: '完整' },
  { id: 15, date: '2024-03-11', device: '入口监控A', deviceName: '入口监控A', duration: 1440, size: 2.2, status: '完整' },
  { id: 16, date: '2024-03-11', device: '入口监控B', deviceName: '入口监控B', duration: 1440, size: 2.1, status: '完整' },
  { id: 17, date: '2024-03-10', device: '停车场监控', deviceName: '停车场监控', duration: 1440, size: 1.9, status: '完整' },
  { id: 18, date: '2024-03-10', device: '缓冲区监控', deviceName: '缓冲区监控', duration: 1440, size: 1.7, status: '完整' },
]

// 监控设备统计
export const cameraStats = {
  total: 8,
  online: 7,
  offline: 1,
  recording: 7
}

// 时段客流统计
export const hourlyVisitorData = [
  { hour: '08:00', count: 45 },
  { hour: '09:00', count: 128 },
  { hour: '10:00', count: 256 },
  { hour: '11:00', count: 312 },
  { hour: '12:00', count: 285 },
  { hour: '13:00', count: 320 },
  { hour: '14:00', count: 358 },
  { hour: '15:00', count: 342 },
  { hour: '16:00', count: 285 },
  { hour: '17:00', count: 168 },
  { hour: '18:00', count: 52 }
]

// 月度客流统计
export const monthlyVisitorData = [
  { month: '1月', count: 28500 },
  { month: '2月', count: 32600 },
  { month: '3月', count: 35680 },
  { month: '4月', count: 42500 },
  { month: '5月', count: 48200 },
  { month: '6月', count: 45800 },
  { month: '7月', count: 52300 },
  { month: '8月', count: 58600 },
  { month: '9月', count: 45200 },
  { month: '10月', count: 52800 },
  { month: '11月', count: 35600 },
  { month: '12月', count: 28900 }
]

// 监控摄像头数据（简化版，用于其他模块）
export const surveillanceCamerasSimple = [
  { id: 1, name: '入口监控A', location: '景区入口', status: 'online', top: '15%', left: '30%' },
  { id: 2, name: '入口监控B', location: '景区入口', status: 'online', top: '18%', left: '35%' },
  { id: 3, name: '停车场监控', location: '停车场', status: 'online', top: '25%', left: '45%' },
  { id: 4, name: '游客中心监控', location: '游客中心', status: 'online', top: '35%', left: '55%' },
  { id: 5, name: '洞口监控A', location: '石花洞入口', status: 'online', top: '45%', left: '50%' },
  { id: 6, name: '洞口监控B', location: '石花洞入口', status: 'offline', top: '48%', left: '55%' },
  { id: 7, name: '核心区监控', location: '核心保护区', status: 'online', top: '55%', left: '40%' },
  { id: 8, name: '缓冲区监控', location: '缓冲区', status: 'online', top: '65%', left: '35%' }
]

// 人类活动统计数据（用于卡片展示）
export const humanActivityStatsDataCards = {
  todayVisitors: { value: 1256, unit: '人次', trend: 'up', trendValue: '+12.5%' },
  weekVisitors: { value: 8542, unit: '人次', trend: 'up', trendValue: '+8.3%' },
  monthVisitors: { value: 35680, unit: '人次', trend: 'stable', trendValue: '+2.1%' },
  yearVisitors: { value: 425680, unit: '人次', trend: 'up', trendValue: '+15.6%' },
  peakHour: { value: '14:00-15:00', unit: '', label: '高峰时段' },
  avgStayTime: { value: 2.5, unit: '小时', label: '平均停留' }
}
