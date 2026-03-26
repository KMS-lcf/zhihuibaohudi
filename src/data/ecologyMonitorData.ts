// 生态环境数据管理相关数据

// 子页面标签配置
export const ecologyDataTabs = [
  { id: 'weather', name: '气象监测' },
  { id: 'air', name: '空气监测' },
  { id: 'water', name: '水文监测' },
  { id: 'soil', name: '土壤监测' },
  { id: 'cave', name: '溶洞环境监测' },
]

// 监测主题配置（带颜色）
export const monitorThemes = [
  { id: 'weather', name: '气象监测', color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.15)' },
  { id: 'air', name: '空气监测', color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.15)' },
  { id: 'water', name: '水文监测', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.15)' },
  { id: 'soil', name: '土壤监测', color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.15)' },
  { id: 'cave', name: '溶洞环境监测', color: '#f97316', bgColor: 'rgba(249, 115, 22, 0.15)' },
]

// 监测设备配置（添加地图位置和在线状态）
export const ecologyDevices = {
  weather: [
    { id: 'WD001', name: '气象站-A区', location: '景区入口', mapTop: '35%', mapLeft: '25%', status: 'online' as const },
    { id: 'WD002', name: '气象站-B区', location: '核心区', mapTop: '45%', mapLeft: '50%', status: 'online' as const },
    { id: 'WD003', name: '气象站-C区', location: '石花洞口', mapTop: '55%', mapLeft: '65%', status: 'offline' as const },
  ],
  air: [
    { id: 'AD001', name: '空气监测站-主站', location: '游客中心', mapTop: '30%', mapLeft: '40%', status: 'online' as const },
    { id: 'AD002', name: '空气监测站-分站', location: '洞口区域', mapTop: '60%', mapLeft: '55%', status: 'online' as const },
  ],
  water: [
    { id: 'HD001', name: '水文监测点-大石河', location: '大石河断面', mapTop: '70%', mapLeft: '35%', status: 'online' as const },
    { id: 'HD002', name: '水文监测点-地下河', location: '洞内地下河', mapTop: '40%', mapLeft: '60%', status: 'online' as const },
  ],
  soil: [
    { id: 'SD001', name: '土壤监测点-林地', location: '阔叶林区', mapTop: '25%', mapLeft: '45%', status: 'online' as const },
    { id: 'SD002', name: '土壤监测点-灌丛', location: '灌丛区', mapTop: '50%', mapLeft: '30%', status: 'offline' as const },
    { id: 'SD003', name: '土壤监测点-草甸', location: '山顶草甸', mapTop: '20%', mapLeft: '55%', status: 'online' as const },
  ],
  cave: [
    { id: 'CD001', name: '溶洞监测站-一层', location: '第一层洞厅', mapTop: '42%', mapLeft: '52%', status: 'online' as const },
    { id: 'CD002', name: '溶洞监测站-二层', location: '第二层洞厅', mapTop: '48%', mapLeft: '48%', status: 'online' as const },
    { id: 'CD003', name: '溶洞监测站-三层', location: '第三层洞厅', mapTop: '52%', mapLeft: '52%', status: 'online' as const },
    { id: 'CD004', name: '溶洞监测站-深层', location: '深层洞穴', mapTop: '58%', mapLeft: '45%', status: 'offline' as const },
  ],
}

// 监测因子配置（包含图标、单位、正常范围等）
export const monitorFactors = {
  weather: [
    { key: 'temperature', name: '温度', unit: '°C', icon: 'thermometer', min: 15, max: 28, color: '#ef4444' },
    { key: 'humidity', name: '相对湿度', unit: '%', icon: 'droplets', min: 40, max: 85, color: '#3b82f6' },
    { key: 'pressure', name: '大气压', unit: 'hPa', icon: 'gauge', min: 1005, max: 1025, color: '#8b5cf6' },
    { key: 'windSpeed', name: '风速', unit: 'm/s', icon: 'wind', min: 0.5, max: 8, color: '#06b6d4' },
    { key: 'windDirection', name: '风向', unit: '', icon: 'compass', min: 0, max: 7, color: '#22c55e' },
    { key: 'rainfall', name: '降雨量', unit: 'mm', icon: 'cloud-rain', min: 0, max: 15, color: '#0ea5e9' },
    { key: 'evaporation', name: '蒸发量', unit: 'mm', icon: 'sun', min: 0.5, max: 5, color: '#f59e0b' },
  ],
  air: [
    { key: 'negativeOxygen', name: '负氧离子', unit: '个/cm³', icon: 'sparkles', min: 800, max: 3500, color: '#22c55e' },
    { key: 'pm25', name: 'PM2.5', unit: 'μg/m³', icon: 'cloud', min: 10, max: 75, color: '#64748b' },
    { key: 'pm10', name: 'PM10', unit: 'μg/m³', icon: 'cloud-fog', min: 20, max: 120, color: '#94a3b8' },
    { key: 'so2', name: 'SO₂', unit: 'μg/m³', icon: 'flame', min: 5, max: 30, color: '#f97316' },
    { key: 'no2', name: 'NO₂', unit: 'μg/m³', icon: 'zap', min: 15, max: 60, color: '#eab308' },
    { key: 'co', name: 'CO', unit: 'mg/m³', icon: 'cloudy', min: 0.3, max: 1.2, color: '#6b7280' },
    { key: 'o3', name: 'O₃', unit: 'μg/m³', icon: 'sun', min: 40, max: 150, color: '#0ea5e9' },
  ],
  water: [
    { key: 'waterLevel', name: '水位', unit: 'm', icon: 'waves', min: 1.5, max: 4.5, color: '#3b82f6' },
    { key: 'flowVelocity', name: '流速', unit: 'm/s', icon: 'activity', min: 0.3, max: 2.5, color: '#06b6d4' },
    { key: 'flowRate', name: '流量', unit: 'm³/s', icon: 'droplet', min: 5, max: 50, color: '#0284c7' },
    { key: 'waterTemp', name: '水温', unit: '°C', icon: 'thermometer', min: 12, max: 22, color: '#f97316' },
    { key: 'ph', name: 'pH', unit: '', icon: 'flask-conical', min: 6.5, max: 8.5, color: '#a855f7' },
    { key: 'dissolvedOxygen', name: '溶解氧', unit: 'mg/L', icon: 'bubbles', min: 6, max: 12, color: '#22c55e' },
  ],
  soil: [
    { key: 'soilTemp', name: '土壤温度', unit: '°C', icon: 'thermometer', min: 10, max: 25, color: '#ef4444' },
    { key: 'soilMoisture', name: '土壤含水率', unit: '%', icon: 'droplets', min: 15, max: 45, color: '#3b82f6' },
    { key: 'soilConductivity', name: '土壤电导率', unit: 'μS/cm', icon: 'zap', min: 100, max: 500, color: '#f59e0b' },
    { key: 'soilPh', name: '土壤pH', unit: '', icon: 'flask-conical', min: 5.5, max: 7.5, color: '#a855f7' },
  ],
  cave: [
    { key: 'caveTemp', name: '洞内温度', unit: '°C', icon: 'thermometer', min: 12, max: 18, color: '#3b82f6' },
    { key: 'caveHumidity', name: '洞内相对湿度', unit: '%', icon: 'droplets', min: 85, max: 99, color: '#06b6d4' },
    { key: 'co2Concentration', name: 'CO₂浓度', unit: 'ppm', icon: 'cloud', min: 400, max: 1500, color: '#64748b' },
    { key: 'caveWindSpeed', name: '洞内风速', unit: 'm/s', icon: 'wind', min: 0, max: 0.5, color: '#22c55e' },
    { key: 'rockWallTemp', name: '岩壁温度', unit: '°C', icon: 'mountain', min: 12, max: 16, color: '#a855f7' },
    { key: 'caveNegativeOxygen', name: '负氧离子', unit: '个/cm³', icon: 'sparkles', min: 500, max: 2000, color: '#f97316' },
  ],
}

// 监测点位配置
export const ecologyPoints = {
  weather: [
    { id: 'WP001', name: '景区入口气象点' },
    { id: 'WP002', name: '核心区气象点' },
    { id: 'WP003', name: '洞口气象点' },
  ],
  air: [
    { id: 'AP001', name: '游客中心监测点' },
    { id: 'AP002', name: '洞口区域监测点' },
  ],
  water: [
    { id: 'HP001', name: '大石河断面' },
    { id: 'HP002', name: '地下河监测点' },
  ],
  soil: [
    { id: 'SP001', name: '阔叶林样地' },
    { id: 'SP002', name: '灌丛样地' },
    { id: 'SP003', name: '山顶草甸样地' },
  ],
  cave: [
    { id: 'CP001', name: '一层洞厅' },
    { id: 'CP002', name: '二层洞厅' },
    { id: 'CP003', name: '三层洞厅' },
    { id: 'CP004', name: '深层洞穴' },
  ],
}

// 生成随机数据
const randomValue = (min: number, max: number, decimal: number = 1): string => {
  const value = min + Math.random() * (max - min)
  return value.toFixed(decimal)
}

const windDirections = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']

// 生成气象监测数据
export const generateWeatherData = (count: number = 50) => {
  const data = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000) // 每小时一条
    data.push({
      id: `W${String(i + 1).padStart(3, '0')}`,
      time: time.toLocaleString('zh-CN', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      }),
      device: ecologyDevices.weather[Math.floor(Math.random() * ecologyDevices.weather.length)].name,
      point: ecologyPoints.weather[Math.floor(Math.random() * ecologyPoints.weather.length)].name,
      temperature: randomValue(15, 28, 1),          // 温度 (°C)
      humidity: randomValue(40, 85, 1),             // 相对湿度 (%)
      pressure: randomValue(1005, 1025, 1),         // 大气压 (hPa)
      windSpeed: randomValue(0.5, 8, 1),            // 风速 (m/s)
      windDirection: windDirections[Math.floor(Math.random() * windDirections.length)], // 风向
      rainfall: randomValue(0, 15, 1),              // 降雨量 (mm)
      evaporation: randomValue(0.5, 5, 2),          // 蒸发量 (mm)
    })
  }
  return data
}

// 生成空气监测数据
export const generateAirData = (count: number = 50) => {
  const data = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      id: `A${String(i + 1).padStart(3, '0')}`,
      time: time.toLocaleString('zh-CN', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      }),
      device: ecologyDevices.air[Math.floor(Math.random() * ecologyDevices.air.length)].name,
      point: ecologyPoints.air[Math.floor(Math.random() * ecologyPoints.air.length)].name,
      negativeOxygen: randomValue(800, 3500, 0),    // 负氧离子 (个/cm³)
      pm25: randomValue(10, 75, 0),                 // PM2.5 (μg/m³)
      pm10: randomValue(20, 120, 0),                // PM10 (μg/m³)
      so2: randomValue(5, 30, 1),                   // SO₂ (μg/m³)
      no2: randomValue(15, 60, 1),                  // NO₂ (μg/m³)
      co: randomValue(0.3, 1.2, 2),                 // CO (mg/m³)
      o3: randomValue(40, 150, 0),                  // O₃ (μg/m³)
    })
  }
  return data
}

// 生成水文监测数据
export const generateWaterData = (count: number = 50) => {
  const data = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      id: `H${String(i + 1).padStart(3, '0')}`,
      time: time.toLocaleString('zh-CN', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      }),
      device: ecologyDevices.water[Math.floor(Math.random() * ecologyDevices.water.length)].name,
      point: ecologyPoints.water[Math.floor(Math.random() * ecologyPoints.water.length)].name,
      waterLevel: randomValue(1.5, 4.5, 2),         // 水位 (m)
      flowVelocity: randomValue(0.3, 2.5, 2),       // 流速 (m/s)
      flowRate: randomValue(5, 50, 1),              // 流量 (m³/s)
      waterTemp: randomValue(12, 22, 1),            // 水温 (°C)
      ph: randomValue(6.5, 8.5, 1),                 // pH
      dissolvedOxygen: randomValue(6, 12, 1),       // 溶解氧 (mg/L)
    })
  }
  return data
}

// 生成土壤监测数据
export const generateSoilData = (count: number = 50) => {
  const data = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      id: `S${String(i + 1).padStart(3, '0')}`,
      time: time.toLocaleString('zh-CN', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      }),
      device: ecologyDevices.soil[Math.floor(Math.random() * ecologyDevices.soil.length)].name,
      point: ecologyPoints.soil[Math.floor(Math.random() * ecologyPoints.soil.length)].name,
      soilTemp: randomValue(10, 25, 1),             // 土壤温度 (°C)
      soilMoisture: randomValue(15, 45, 1),         // 土壤含水率 (%)
      soilConductivity: randomValue(100, 500, 0),   // 土壤电导率 (μS/cm)
      soilPh: randomValue(5.5, 7.5, 1),             // 土壤pH
    })
  }
  return data
}

// 生成溶洞环境监测数据
export const generateCaveData = (count: number = 50) => {
  const data = []
  const now = new Date()
  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      id: `C${String(i + 1).padStart(3, '0')}`,
      time: time.toLocaleString('zh-CN', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      }),
      device: ecologyDevices.cave[Math.floor(Math.random() * ecologyDevices.cave.length)].name,
      point: ecologyPoints.cave[Math.floor(Math.random() * ecologyPoints.cave.length)].name,
      caveTemp: randomValue(12, 18, 1),             // 洞内温度 (°C)
      caveHumidity: randomValue(85, 99, 1),         // 洞内相对湿度 (%)
      co2Concentration: randomValue(400, 1500, 0),  // CO₂浓度 (ppm)
      caveWindSpeed: randomValue(0, 0.5, 2),        // 洞内风速 (m/s)
      rockWallTemp: randomValue(12, 16, 1),         // 岩壁温度 (°C)
      caveNegativeOxygen: randomValue(500, 2000, 0), // 负氧离子 (个/cm³)
    })
  }
  return data
}

// 表格列配置
export const tableColumns = {
  weather: [
    { key: 'id', label: '序号', width: '60px' },
    { key: 'time', label: '监测时间', width: '140px' },
    { key: 'device', label: '监测设备', width: '120px' },
    { key: 'point', label: '监测点位', width: '120px' },
    { key: 'temperature', label: '温度(°C)', width: '90px' },
    { key: 'humidity', label: '相对湿度(%)', width: '100px' },
    { key: 'pressure', label: '大气压(hPa)', width: '100px' },
    { key: 'windSpeed', label: '风速(m/s)', width: '90px' },
    { key: 'windDirection', label: '风向', width: '70px' },
    { key: 'rainfall', label: '降雨量(mm)', width: '90px' },
    { key: 'evaporation', label: '蒸发量(mm)', width: '90px' },
  ],
  air: [
    { key: 'id', label: '序号', width: '60px' },
    { key: 'time', label: '监测时间', width: '140px' },
    { key: 'device', label: '监测设备', width: '140px' },
    { key: 'point', label: '监测点位', width: '120px' },
    { key: 'negativeOxygen', label: '负氧离子(个/cm³)', width: '120px' },
    { key: 'pm25', label: 'PM2.5(μg/m³)', width: '100px' },
    { key: 'pm10', label: 'PM10(μg/m³)', width: '100px' },
    { key: 'so2', label: 'SO₂(μg/m³)', width: '90px' },
    { key: 'no2', label: 'NO₂(μg/m³)', width: '90px' },
    { key: 'co', label: 'CO(mg/m³)', width: '90px' },
    { key: 'o3', label: 'O₃(μg/m³)', width: '90px' },
  ],
  water: [
    { key: 'id', label: '序号', width: '60px' },
    { key: 'time', label: '监测时间', width: '140px' },
    { key: 'device', label: '监测设备', width: '140px' },
    { key: 'point', label: '监测点位', width: '120px' },
    { key: 'waterLevel', label: '水位(m)', width: '80px' },
    { key: 'flowVelocity', label: '流速(m/s)', width: '90px' },
    { key: 'flowRate', label: '流量(m³/s)', width: '90px' },
    { key: 'waterTemp', label: '水温(°C)', width: '80px' },
    { key: 'ph', label: 'pH', width: '60px' },
    { key: 'dissolvedOxygen', label: '溶解氧(mg/L)', width: '100px' },
  ],
  soil: [
    { key: 'id', label: '序号', width: '60px' },
    { key: 'time', label: '监测时间', width: '140px' },
    { key: 'device', label: '监测设备', width: '120px' },
    { key: 'point', label: '监测点位', width: '120px' },
    { key: 'soilTemp', label: '土壤温度(°C)', width: '100px' },
    { key: 'soilMoisture', label: '土壤含水率(%)', width: '110px' },
    { key: 'soilConductivity', label: '土壤电导率(μS/cm)', width: '130px' },
    { key: 'soilPh', label: '土壤pH', width: '80px' },
  ],
  cave: [
    { key: 'id', label: '序号', width: '60px' },
    { key: 'time', label: '监测时间', width: '140px' },
    { key: 'device', label: '监测设备', width: '120px' },
    { key: 'point', label: '监测点位', width: '100px' },
    { key: 'caveTemp', label: '洞内温度(°C)', width: '100px' },
    { key: 'caveHumidity', label: '洞内相对湿度(%)', width: '120px' },
    { key: 'co2Concentration', label: 'CO₂浓度(ppm)', width: '110px' },
    { key: 'caveWindSpeed', label: '洞内风速(m/s)', width: '100px' },
    { key: 'rockWallTemp', label: '岩壁温度(°C)', width: '100px' },
    { key: 'caveNegativeOxygen', label: '负氧离子(个/cm³)', width: '120px' },
  ],
}

// 生成实时监测数据
export const generateRealtimeData = (theme: string, deviceId?: string) => {
  const randomValue = (min: number, max: number, decimal: number = 1): number => {
    const value = min + Math.random() * (max - min)
    return parseFloat(value.toFixed(decimal))
  }
  
  const windDirections = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
  
  switch (theme) {
    case 'weather':
      return {
        temperature: randomValue(15, 28, 1),
        humidity: randomValue(40, 85, 1),
        pressure: randomValue(1005, 1025, 1),
        windSpeed: randomValue(0.5, 8, 1),
        windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
        rainfall: randomValue(0, 15, 1),
        evaporation: randomValue(0.5, 5, 2),
      }
    case 'air':
      return {
        negativeOxygen: Math.floor(randomValue(800, 3500, 0)),
        pm25: Math.floor(randomValue(10, 75, 0)),
        pm10: Math.floor(randomValue(20, 120, 0)),
        so2: randomValue(5, 30, 1),
        no2: randomValue(15, 60, 1),
        co: randomValue(0.3, 1.2, 2),
        o3: Math.floor(randomValue(40, 150, 0)),
      }
    case 'water':
      return {
        waterLevel: randomValue(1.5, 4.5, 2),
        flowVelocity: randomValue(0.3, 2.5, 2),
        flowRate: randomValue(5, 50, 1),
        waterTemp: randomValue(12, 22, 1),
        ph: randomValue(6.5, 8.5, 1),
        dissolvedOxygen: randomValue(6, 12, 1),
      }
    case 'soil':
      return {
        soilTemp: randomValue(10, 25, 1),
        soilMoisture: randomValue(15, 45, 1),
        soilConductivity: Math.floor(randomValue(100, 500, 0)),
        soilPh: randomValue(5.5, 7.5, 1),
      }
    case 'cave':
      return {
        caveTemp: randomValue(12, 18, 1),
        caveHumidity: randomValue(85, 99, 1),
        co2Concentration: Math.floor(randomValue(400, 1500, 0)),
        caveWindSpeed: randomValue(0, 0.5, 2),
        rockWallTemp: randomValue(12, 16, 1),
        caveNegativeOxygen: Math.floor(randomValue(500, 2000, 0)),
      }
    default:
      return {}
  }
}

// 生成24小时趋势数据
export const generate24HourTrendData = (theme: string, factorKey: string) => {
  const data = []
  const now = new Date()
  const factor = monitorFactors[theme as keyof typeof monitorFactors]?.find(f => f.key === factorKey)
  
  if (!factor) return []
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const hours = time.getHours().toString().padStart(2, '0')
    const minutes = time.getMinutes().toString().padStart(2, '0')
    
    // 根据时间段调整基准值，模拟真实变化规律
    let baseMultiplier = 1
    if (factorKey === 'temperature' || factorKey === 'waterTemp' || factorKey === 'soilTemp') {
      // 温度类：白天高，夜晚低
      const hour = time.getHours()
      if (hour >= 6 && hour < 12) baseMultiplier = 0.85 + (hour - 6) * 0.03
      else if (hour >= 12 && hour < 18) baseMultiplier = 1.0 - (hour - 12) * 0.02
      else baseMultiplier = 0.8
    } else if (factorKey === 'humidity' || factorKey === 'caveHumidity') {
      // 湿度类：与温度相反
      const hour = time.getHours()
      if (hour >= 6 && hour < 18) baseMultiplier = 0.9
      else baseMultiplier = 1.05
    }
    
    const value = factor.min + (factor.max - factor.min) * (0.3 + Math.random() * 0.4) * baseMultiplier
    const finalValue = factor.key === 'windDirection' 
      ? Math.floor(Math.random() * 8)
      : (Number.isInteger(factor.min) ? Math.floor(value) : parseFloat(value.toFixed(1)))
    
    data.push({
      time: `${hours}:${minutes}`,
      value: finalValue,
    })
  }
  
  return data
}

// 获取所有设备的地图点位
export const getAllDevicePoints = () => {
  const points: Array<{
    id: string
    name: string
    location: string
    mapTop: string
    mapLeft: string
    status: 'online' | 'offline'
    theme: string
    themeColor: string
  }> = []
  
  const themes = ['weather', 'air', 'water', 'soil', 'cave'] as const
  const themeColors = {
    weather: '#3b82f6',
    air: '#22c55e',
    water: '#06b6d4',
    soil: '#a855f7',
    cave: '#f97316',
  }
  
  themes.forEach(theme => {
    const devices = ecologyDevices[theme]
    devices.forEach(device => {
      points.push({
        ...device,
        theme,
        themeColor: themeColors[theme],
      })
    })
  })
  
  return points
}

// 获取设备统计信息
export const getDeviceStats = () => {
  const stats = {
    weather: { total: 0, online: 0 },
    air: { total: 0, online: 0 },
    water: { total: 0, online: 0 },
    soil: { total: 0, online: 0 },
    cave: { total: 0, online: 0 },
  }
  
  const themes = ['weather', 'air', 'water', 'soil', 'cave'] as const
  themes.forEach(theme => {
    const devices = ecologyDevices[theme]
    stats[theme].total = devices.length
    stats[theme].online = devices.filter(d => d.status === 'online').length
  })
  
  return stats
}
