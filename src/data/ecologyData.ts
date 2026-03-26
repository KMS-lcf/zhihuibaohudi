// 生态环境监测相关数据

// 各类监测设备（含位置和在线状态）
export const ecologyRealtimeDevices = {
  weather: [
    { id: 'weather-1', name: '气象站A', type: 'weather', point: '核心区监测点', status: 'online', top: '25%', left: '35%' },
    { id: 'weather-2', name: '气象站B', type: 'weather', point: '缓冲区监测点', status: 'online', top: '45%', left: '55%' },
    { id: 'weather-3', name: '气象站C', type: 'weather', point: '实验区监测点', status: 'offline', top: '60%', left: '30%' }
  ],
  air: [
    { id: 'air-1', name: '空气站A', type: 'air', point: '核心区监测点', status: 'online', top: '30%', left: '40%' },
    { id: 'air-2', name: '空气站B', type: 'air', point: '缓冲区监测点', status: 'online', top: '50%', left: '60%' }
  ],
  hydrology: [
    { id: 'hydro-1', name: '水文站A', type: 'hydrology', point: '核心区监测点', status: 'online', top: '35%', left: '45%' },
    { id: 'hydro-2', name: '水文站B', type: 'hydrology', point: '洞口监测点', status: 'online', top: '55%', left: '25%' }
  ],
  soil: [
    { id: 'soil-1', name: '土壤站A', type: 'soil', point: '核心区监测点', status: 'online', top: '28%', left: '50%' },
    { id: 'soil-2', name: '土壤站B', type: 'soil', point: '缓冲区监测点', status: 'offline', top: '48%', left: '35%' },
    { id: 'soil-3', name: '土壤站C', type: 'soil', point: '实验区监测点', status: 'online', top: '65%', left: '55%' }
  ],
  cave: [
    { id: 'cave-1', name: '溶洞监测站A', type: 'cave', point: '洞口监测点', status: 'online', top: '40%', left: '45%' },
    { id: 'cave-2', name: '溶洞监测站B', type: 'cave', point: '洞内监测点', status: 'online', top: '50%', left: '50%' }
  ]
}

// 获取所有设备的统一列表
export const getAllEcologyDevices = () => {
  return [
    ...ecologyRealtimeDevices.weather,
    ...ecologyRealtimeDevices.air,
    ...ecologyRealtimeDevices.hydrology,
    ...ecologyRealtimeDevices.soil,
    ...ecologyRealtimeDevices.cave
  ]
}

// 气象监测24小时数据
export const weather24HourData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  temperature: 15 + Math.random() * 8,
  humidity: 55 + Math.random() * 25,
  pressure: 1010 + Math.random() * 8,
  windSpeed: 0.5 + Math.random() * 3,
  windDirection: ['北风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风'][Math.floor(Math.random() * 8)],
  rainfall: Math.random() * 2,
  evaporation: 0.2 + Math.random() * 1.5
}))

// 空气监测24小时数据
export const air24HourData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  negativeIon: 3200 + Math.random() * 1500,
  pm25: 15 + Math.random() * 20,
  pm10: 25 + Math.random() * 30,
  so2: 3 + Math.random() * 8,
  no2: 10 + Math.random() * 15,
  co: 0.2 + Math.random() * 0.5,
  o3: 60 + Math.random() * 80
}))

// 水文监测24小时数据
export const hydrology24HourData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  waterLevel: 2.0 + Math.random() * 0.5,
  flowRate: 0.6 + Math.random() * 0.4,
  flowVolume: 100 + Math.random() * 40,
  waterTemp: 13 + Math.random() * 4,
  ph: 7.2 + Math.random() * 1,
  dissolvedOxygen: 7 + Math.random() * 2
}))

// 土壤监测24小时数据
export const soil24HourData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  soilTemp: 14 + Math.random() * 6,
  soilMoisture: 25 + Math.random() * 15,
  soilConductivity: 150 + Math.random() * 60,
  soilPh: 6.2 + Math.random() * 1.2
}))

// 溶洞环境监测24小时数据
export const cave24HourData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, '0')}:00`,
  caveTemp: 12 + Math.random() * 1.5,
  caveHumidity: 93 + Math.random() * 4,
  co2: 450 + Math.random() * 100,
  caveWindSpeed: 0.1 + Math.random() * 0.2,
  wallTemp: 13 + Math.random() * 1.5,
  negativeIon: 2700 + Math.random() * 500
}))

// 气象监测数据（用于数据管理表格）
export const weatherMonitorData = [
  { id: 1, time: '2024-03-15 14:00', device: '气象站A', point: '核心区监测点', temperature: 18.5, humidity: 65.2, pressure: 1013.2, windSpeed: 2.3, windDirection: '东北风', rainfall: 0, evaporation: 1.2 },
  { id: 2, time: '2024-03-15 13:00', device: '气象站A', point: '核心区监测点', temperature: 19.2, humidity: 62.8, pressure: 1012.8, windSpeed: 2.5, windDirection: '东风', rainfall: 0, evaporation: 1.5 },
  { id: 3, time: '2024-03-15 12:00', device: '气象站B', point: '缓冲区监测点', temperature: 20.1, humidity: 58.5, pressure: 1014.1, windSpeed: 1.8, windDirection: '东南风', rainfall: 0, evaporation: 1.8 },
  { id: 4, time: '2024-03-15 11:00', device: '气象站B', point: '缓冲区监测点', temperature: 21.3, humidity: 55.2, pressure: 1013.5, windSpeed: 2.1, windDirection: '东风', rainfall: 0, evaporation: 2.1 },
  { id: 5, time: '2024-03-15 10:00', device: '气象站C', point: '实验区监测点', temperature: 22.5, humidity: 52.1, pressure: 1012.9, windSpeed: 1.5, windDirection: '南风', rainfall: 0, evaporation: 2.3 },
  { id: 6, time: '2024-03-15 09:00', device: '气象站C', point: '实验区监测点', temperature: 20.8, humidity: 58.3, pressure: 1013.6, windSpeed: 1.2, windDirection: '西南风', rainfall: 0, evaporation: 1.6 },
  { id: 7, time: '2024-03-15 08:00', device: '气象站A', point: '核心区监测点', temperature: 16.5, humidity: 72.5, pressure: 1014.2, windSpeed: 0.8, windDirection: '北风', rainfall: 0.5, evaporation: 0.8 },
  { id: 8, time: '2024-03-15 07:00', device: '气象站A', point: '核心区监测点', temperature: 15.2, humidity: 78.2, pressure: 1014.8, windSpeed: 0.5, windDirection: '西北风', rainfall: 1.2, evaporation: 0.3 }
]

// 空气监测数据
export const airMonitorData = [
  { id: 1, time: '2024-03-15 14:00', device: '空气站A', point: '核心区监测点', negativeIon: 3520, pm25: 18.5, pm10: 28.2, so2: 5.2, no2: 12.5, co: 0.35, o3: 78.2 },
  { id: 2, time: '2024-03-15 13:00', device: '空气站A', point: '核心区监测点', negativeIon: 3485, pm25: 19.2, pm10: 29.5, so2: 5.8, no2: 13.2, co: 0.38, o3: 82.5 },
  { id: 3, time: '2024-03-15 12:00', device: '空气站B', point: '缓冲区监测点', negativeIon: 3650, pm25: 15.8, pm10: 25.1, so2: 4.5, no2: 11.2, co: 0.32, o3: 85.3 },
  { id: 4, time: '2024-03-15 11:00', device: '空气站B', point: '缓冲区监测点', negativeIon: 3720, pm25: 14.5, pm10: 23.8, so2: 4.2, no2: 10.8, co: 0.28, o3: 88.1 },
  { id: 5, time: '2024-03-15 10:00', device: '空气站A', point: '核心区监测点', negativeIon: 3850, pm25: 12.8, pm10: 21.5, so2: 3.8, no2: 9.5, co: 0.25, o3: 92.5 },
  { id: 6, time: '2024-03-15 09:00', device: '空气站A', point: '核心区监测点', negativeIon: 3920, pm25: 11.5, pm10: 19.2, so2: 3.2, no2: 8.8, co: 0.22, o3: 78.8 },
  { id: 7, time: '2024-03-15 08:00', device: '空气站B', point: '缓冲区监测点', negativeIon: 4050, pm25: 10.2, pm10: 17.5, so2: 2.8, no2: 8.2, co: 0.18, o3: 65.2 },
  { id: 8, time: '2024-03-15 07:00', device: '空气站B', point: '缓冲区监测点', negativeIon: 4180, pm25: 9.5, pm10: 15.8, so2: 2.5, no2: 7.5, co: 0.15, o3: 52.8 }
]

// 水文监测数据
export const hydrologyMonitorData = [
  { id: 1, time: '2024-03-15 14:00', device: '水文站A', point: '核心区监测点', waterLevel: 2.35, flowRate: 0.82, flowVolume: 125.5, waterTemp: 15.2, ph: 7.8, dissolvedOxygen: 8.2 },
  { id: 2, time: '2024-03-15 13:00', device: '水文站A', point: '核心区监测点', waterLevel: 2.32, flowRate: 0.78, flowVolume: 118.2, waterTemp: 15.5, ph: 7.7, dissolvedOxygen: 8.5 },
  { id: 3, time: '2024-03-15 12:00', device: '水文站B', point: '洞口监测点', waterLevel: 1.85, flowRate: 0.65, flowVolume: 95.8, waterTemp: 14.8, ph: 7.9, dissolvedOxygen: 8.8 },
  { id: 4, time: '2024-03-15 11:00', device: '水文站B', point: '洞口监测点', waterLevel: 1.82, flowRate: 0.62, flowVolume: 92.5, waterTemp: 15.1, ph: 7.8, dissolvedOxygen: 9.1 },
  { id: 5, time: '2024-03-15 10:00', device: '水文站A', point: '核心区监测点', waterLevel: 2.28, flowRate: 0.72, flowVolume: 108.5, waterTemp: 15.8, ph: 7.6, dissolvedOxygen: 9.5 },
  { id: 6, time: '2024-03-15 09:00', device: '水文站A', point: '核心区监测点', waterLevel: 2.25, flowRate: 0.68, flowVolume: 102.2, waterTemp: 16.2, ph: 7.5, dissolvedOxygen: 9.8 },
  { id: 7, time: '2024-03-15 08:00', device: '水文站B', point: '洞口监测点', waterLevel: 1.78, flowRate: 0.58, flowVolume: 85.5, waterTemp: 16.5, ph: 7.4, dissolvedOxygen: 10.2 },
  { id: 8, time: '2024-03-15 07:00', device: '水文站B', point: '洞口监测点', waterLevel: 1.75, flowRate: 0.55, flowVolume: 82.8, waterTemp: 16.8, ph: 7.3, dissolvedOxygen: 10.5 }
]

// 土壤监测数据
export const soilMonitorData = [
  { id: 1, time: '2024-03-15 14:00', device: '土壤站A', point: '核心区监测点', soilTemp: 18.5, soilMoisture: 32.5, soilConductivity: 185, soilPh: 6.8 },
  { id: 2, time: '2024-03-15 13:00', device: '土壤站A', point: '核心区监测点', soilTemp: 19.2, soilMoisture: 31.8, soilConductivity: 182, soilPh: 6.9 },
  { id: 3, time: '2024-03-15 12:00', device: '土壤站B', point: '缓冲区监测点', soilTemp: 18.5, soilMoisture: 28.5, soilConductivity: 175, soilPh: 7.0 },
  { id: 4, time: '2024-03-15 11:00', device: '土壤站B', point: '缓冲区监测点', soilTemp: 19.3, soilMoisture: 27.2, soilConductivity: 172, soilPh: 7.1 },
  { id: 5, time: '2024-03-15 10:00', device: '土壤站C', point: '实验区监测点', soilTemp: 18.8, soilMoisture: 30.5, soilConductivity: 168, soilPh: 6.7 },
  { id: 6, time: '2024-03-15 09:00', device: '土壤站C', point: '实验区监测点', soilTemp: 17.5, soilMoisture: 32.8, soilConductivity: 165, soilPh: 6.8 },
  { id: 7, time: '2024-03-15 08:00', device: '土壤站A', point: '核心区监测点', soilTemp: 15.2, soilMoisture: 35.2, soilConductivity: 192, soilPh: 6.5 },
  { id: 8, time: '2024-03-15 07:00', device: '土壤站A', point: '核心区监测点', soilTemp: 14.5, soilMoisture: 36.5, soilConductivity: 195, soilPh: 6.4 }
]

// 溶洞环境监测数据
export const caveMonitorData = [
  { id: 1, time: '2024-03-15 14:00', device: '溶洞监测站A', point: '洞口监测点', caveTemp: 12.5, caveHumidity: 95.2, co2: 520, caveWindSpeed: 0.15, wallTemp: 13.8, negativeIon: 2850 },
  { id: 2, time: '2024-03-15 13:00', device: '溶洞监测站A', point: '洞口监测点', caveTemp: 12.6, caveHumidity: 95.0, co2: 535, caveWindSpeed: 0.12, wallTemp: 13.9, negativeIon: 2820 },
  { id: 3, time: '2024-03-15 12:00', device: '溶洞监测站B', point: '洞内监测点', caveTemp: 12.8, caveHumidity: 94.8, co2: 480, caveWindSpeed: 0.18, wallTemp: 14.0, negativeIon: 2950 },
  { id: 4, time: '2024-03-15 11:00', device: '溶洞监测站B', point: '洞内监测点', caveTemp: 12.9, caveHumidity: 94.5, co2: 465, caveWindSpeed: 0.20, wallTemp: 14.1, negativeIon: 2980 },
  { id: 5, time: '2024-03-15 10:00', device: '溶洞监测站A', point: '洞口监测点', caveTemp: 13.0, caveHumidity: 94.2, co2: 450, caveWindSpeed: 0.22, wallTemp: 14.2, negativeIon: 3020 },
  { id: 6, time: '2024-03-15 09:00', device: '溶洞监测站A', point: '洞口监测点', caveTemp: 12.8, caveHumidity: 94.6, co2: 475, caveWindSpeed: 0.19, wallTemp: 14.0, negativeIon: 2960 },
  { id: 7, time: '2024-03-15 08:00', device: '溶洞监测站B', point: '洞内监测点', caveTemp: 12.5, caveHumidity: 95.5, co2: 505, caveWindSpeed: 0.25, wallTemp: 13.7, negativeIon: 2880 },
  { id: 8, time: '2024-03-15 07:00', device: '溶洞监测站B', point: '洞内监测点', caveTemp: 12.3, caveHumidity: 95.8, co2: 510, caveWindSpeed: 0.28, wallTemp: 13.5, negativeIon: 2855 }
]

// 设备列表数据
export const ecologyDevices = [
  { id: 1, name: '气象站A', type: 'weather', point: '核心区监测点', status: '在线', installDate: '2023-06-15' },
  { id: 2, name: '气象站B', type: 'weather', point: '缓冲区监测点', status: '在线', installDate: '2023-06-20' },
  { id: 3, name: '空气站A', type: 'air', point: '核心区监测点', status: '在线', installDate: '2023-07-01' },
  { id: 4, name: '水文站A', type: 'hydrology', point: '核心区监测点', status: '在线', installDate: '2023-07-15' }
]

// 监测点位数据
export const ecologyPoints = [
  { id: 1, name: '核心区监测点', lat: 39.7856, lng: 115.9324 },
  { id: 2, name: '缓冲区监测点', lat: 39.7912, lng: 115.9401 },
  { id: 3, name: '实验区监测点', lat: 39.7889, lng: 115.9456 },
  { id: 4, name: '洞口监测点', lat: 39.7934, lng: 115.9389 }
]
