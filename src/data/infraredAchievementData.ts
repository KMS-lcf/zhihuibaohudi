// 红外相机成果展示数据

// ========== 顶部统计卡片数据 ==========
export const achievementStatsData = {
  monitoringPoints: 156,       // 监测点位数
  totalPhotos: 125680,          // 拍摄照片数
  validPhotos: 89543,           // 有效照片数
  independentDetections: 12456, // 独立有效探测
  speciesCount: 127,            // 物种数
  starSpecies: '野猪',          // 明星物种
  starSpeciesCount: 3256        // 明星物种出现次数
}

// ========== 物种列表数据（用于地图筛选下拉） ==========
export const speciesListForFilter = [
  { id: 'all', name: '全部物种' },
  { id: 'sus-scrofa', name: '野猪', latinName: 'Sus scrofa', count: 3256 },
  { id: 'meles-meles', name: '狗獾', latinName: 'Meles meles', count: 1845 },
  { id: 'prionailurus-bengalensis', name: '豹猫', latinName: 'Prionailurus bengalensis', count: 1234 },
  { id: 'paguma-larvata', name: '果子狸', latinName: 'Paguma larvata', count: 987 },
  { id: 'hystrix-hodgsoni', name: '豪猪', latinName: 'Hystrix hodgsoni', count: 876 },
  { id: 'nyctereutes-procyonoides', name: '貉', latinName: 'Nyctereutes procyonoides', count: 654 },
  { id: 'vulpes-vulpes', name: '赤狐', latinName: 'Vulpes vulpes', count: 543 },
  { id: 'urocissa-erythroryncha', name: '红嘴蓝鹊', latinName: 'Urocissa erythroryncha', count: 432 },
  { id: 'garrulus-glandarius', name: '松鸦', latinName: 'Garrulus glandarius', count: 321 },
  { id: 'elaphurus-davidianus', name: '梅花鹿', latinName: 'Cervus nippon', count: 234 },
  { id: 'lutra-lutra', name: '水獭', latinName: 'Lutra lutra', count: 189 },
  { id: 'martes-flavigula', name: '青鼬', latinName: 'Martes flavigula', count: 156 }
]

// ========== 地图热力图点位数据 ==========
export const heatmapPointsData = [
  { id: 1, lng: 115.9423, lat: 39.7856, intensity: 0.85, species: '野猪', pointCode: 'STD-001' },
  { id: 2, lng: 115.9487, lat: 39.7823, intensity: 0.72, species: '豹猫', pointCode: 'STD-002' },
  { id: 3, lng: 115.9356, lat: 39.7912, intensity: 0.65, species: '狗獾', pointCode: 'STD-003' },
  { id: 4, lng: 115.9512, lat: 39.7789, intensity: 0.91, species: '野猪', pointCode: 'STD-004' },
  { id: 5, lng: 115.9234, lat: 39.7956, intensity: 0.58, species: '果子狸', pointCode: 'STD-005' },
  { id: 6, lng: 115.9678, lat: 39.7734, intensity: 0.76, species: '豪猪', pointCode: 'STD-006' },
  { id: 7, lng: 115.9156, lat: 39.8023, intensity: 0.43, species: '貉', pointCode: 'STD-007' },
  { id: 8, lng: 115.9789, lat: 39.7678, intensity: 0.68, species: '赤狐', pointCode: 'STD-008' },
  { id: 9, lng: 115.9312, lat: 39.7889, intensity: 0.55, species: '豹猫', pointCode: 'STD-009' },
  { id: 10, lng: 115.9567, lat: 39.7812, intensity: 0.82, species: '野猪', pointCode: 'STD-010' },
  { id: 11, lng: 115.9178, lat: 39.7978, intensity: 0.47, species: '狗獾', pointCode: 'STD-011' },
  { id: 12, lng: 115.9623, lat: 39.7756, intensity: 0.63, species: '果子狸', pointCode: 'STD-012' },
  { id: 13, lng: 115.9289, lat: 39.7934, intensity: 0.71, species: '野猪', pointCode: 'STD-013' },
  { id: 14, lng: 115.9456, lat: 39.7878, intensity: 0.59, species: '豪猪', pointCode: 'STD-014' },
  { id: 15, lng: 115.9734, lat: 39.7712, intensity: 0.78, species: '豹猫', pointCode: 'STD-015' },
  // 更多点位...
  { id: 16, lng: 115.9189, lat: 39.8001, intensity: 0.52, species: '红嘴蓝鹊', pointCode: 'STD-016' },
  { id: 17, lng: 115.9578, lat: 39.7767, intensity: 0.88, species: '野猪', pointCode: 'STD-017' },
  { id: 18, lng: 115.9345, lat: 39.7923, intensity: 0.66, species: '狗獾', pointCode: 'STD-018' },
  { id: 19, lng: 115.9412, lat: 39.7845, intensity: 0.74, species: '豹猫', pointCode: 'STD-019' },
  { id: 20, lng: 115.9689, lat: 39.7745, intensity: 0.61, species: '赤狐', pointCode: 'STD-020' }
]

// ========== 地图红外相机布设点位 ==========
export const infraredCameraMapPoints = [
  { 
    id: 'IR001', 
    pointCode: 'STD-001', 
    lng: 115.9423, 
    lat: 39.7856, 
    altitude: 456,
    status: '监测中', 
    deployTime: '2024-03-15',
    deployer: '李华',
    totalPhotos: 1256,
    validPhotos: 892,
    speciesCount: 28,
    dominantSpecies: '野猪',
    top: '35%', 
    left: '42%',
    identifiedImages: [
      { id: 1, species: '野猪', latinName: 'Sus scrofa', time: '2024-03-20 22:15:32' },
      { id: 2, species: '狗獾', latinName: 'Meles meles', time: '2024-03-21 01:23:45' },
      { id: 3, species: '豹猫', latinName: 'Prionailurus bengalensis', time: '2024-03-22 03:45:18' }
    ]
  },
  { 
    id: 'IR002', 
    pointCode: 'STD-002', 
    lng: 115.9487, 
    lat: 39.7823, 
    altitude: 523,
    status: '监测中', 
    deployTime: '2024-03-18',
    deployer: '张伟',
    totalPhotos: 2134,
    validPhotos: 1567,
    speciesCount: 35,
    dominantSpecies: '果子狸',
    top: '35%', 
    left: '55%',
    identifiedImages: [
      { id: 1, species: '果子狸', latinName: 'Paguma larvata', time: '2024-03-23 21:30:15' },
      { id: 2, species: '豪猪', latinName: 'Hystrix hodgsoni', time: '2024-03-24 02:15:40' }
    ]
  },
  { 
    id: 'IR003', 
    pointCode: 'STD-003', 
    lng: 115.9356, 
    lat: 39.7912, 
    altitude: 398,
    status: '监测中', 
    deployTime: '2024-04-10',
    deployer: '陈静',
    totalPhotos: 856,
    validPhotos: 623,
    speciesCount: 42,
    dominantSpecies: '红嘴蓝鹊',
    top: '38%', 
    left: '38%',
    identifiedImages: [
      { id: 1, species: '红嘴蓝鹊', latinName: 'Urocissa erythroryncha', time: '2024-04-15 08:20:30' },
      { id: 2, species: '松鸦', latinName: 'Garrulus glandarius', time: '2024-04-16 09:45:12' }
    ]
  },
  { 
    id: 'IR004', 
    pointCode: 'STD-004', 
    lng: 115.9512, 
    lat: 39.7789, 
    altitude: 487,
    status: '已完成', 
    deployTime: '2024-02-20',
    deployer: '李华',
    totalPhotos: 3456,
    validPhotos: 2890,
    speciesCount: 38,
    dominantSpecies: '野猪',
    top: '42%', 
    left: '58%',
    identifiedImages: [
      { id: 1, species: '野猪', latinName: 'Sus scrofa', time: '2024-03-01 20:15:22' },
      { id: 2, species: '狗獾', latinName: 'Meles meles', time: '2024-03-02 23:30:45' },
      { id: 3, species: '貉', latinName: 'Nyctereutes procyonoides', time: '2024-03-05 01:20:18' }
    ]
  },
  { 
    id: 'IR005', 
    pointCode: 'STD-005', 
    lng: 115.9234, 
    lat: 39.7956, 
    altitude: 412,
    status: '监测中', 
    deployTime: '2024-04-05',
    deployer: '王强',
    totalPhotos: 1523,
    validPhotos: 1089,
    speciesCount: 31,
    dominantSpecies: '豹猫',
    top: '30%', 
    left: '30%',
    identifiedImages: [
      { id: 1, species: '豹猫', latinName: 'Prionailurus bengalensis', time: '2024-04-10 02:35:18' },
      { id: 2, species: '赤狐', latinName: 'Vulpes vulpes', time: '2024-04-12 23:15:42' }
    ]
  },
  { 
    id: 'IR006', 
    pointCode: 'STD-006', 
    lng: 115.9678, 
    lat: 39.7734, 
    altitude: 534,
    status: '监测中', 
    deployTime: '2024-03-25',
    deployer: '赵敏',
    totalPhotos: 1876,
    validPhotos: 1345,
    speciesCount: 29,
    dominantSpecies: '豪猪',
    top: '45%', 
    left: '65%',
    identifiedImages: [
      { id: 1, species: '豪猪', latinName: 'Hystrix hodgsoni', time: '2024-04-01 00:45:22' },
      { id: 2, species: '野猪', latinName: 'Sus scrofa', time: '2024-04-03 03:20:15' }
    ]
  },
  { 
    id: 'IR007', 
    pointCode: 'STD-007', 
    lng: 115.9156, 
    lat: 39.8023, 
    altitude: 378,
    status: '监测中', 
    deployTime: '2024-04-12',
    deployer: '刘芳',
    totalPhotos: 678,
    validPhotos: 512,
    speciesCount: 25,
    dominantSpecies: '貉',
    top: '25%', 
    left: '25%',
    identifiedImages: [
      { id: 1, species: '貉', latinName: 'Nyctereutes procyonoides', time: '2024-04-18 22:10:35' }
    ]
  },
  { 
    id: 'IR008', 
    pointCode: 'STD-008', 
    lng: 115.9789, 
    lat: 39.7678, 
    altitude: 498,
    status: '已完成', 
    deployTime: '2024-02-15',
    deployer: '张伟',
    totalPhotos: 2890,
    validPhotos: 2156,
    speciesCount: 33,
    dominantSpecies: '果子狸',
    top: '48%', 
    left: '72%',
    identifiedImages: [
      { id: 1, species: '果子狸', latinName: 'Paguma larvata', time: '2024-02-28 21:45:12' },
      { id: 2, species: '豹猫', latinName: 'Prionailurus bengalensis', time: '2024-03-02 01:30:28' }
    ]
  }
]

// ========== 物种统计数据（饼图/环形图） ==========
export const speciesStatisticsData = {
  // 按种类分类
  byCategory: {
    order: { birds: 12, mammals: 8, poultry: 2, livestock: 1 },  // 目
    family: { birds: 28, mammals: 15, poultry: 3, livestock: 2 }, // 科
    species: { birds: 68, mammals: 42, poultry: 8, livestock: 9 } // 种
  }
}

// ========== 物种丰富度数据（横向柱状图） ==========
export const speciesRichnessData = [
  { name: '野猪', rai: 28.5, protectionLevel: 'none' },
  { name: '豹猫', rai: 22.3, protectionLevel: 'level2' },
  { name: '狗獾', rai: 18.7, protectionLevel: 'none' },
  { name: '果子狸', rai: 15.2, protectionLevel: 'none' },
  { name: '豪猪', rai: 12.8, protectionLevel: 'none' },
  { name: '红嘴蓝鹊', rai: 10.5, protectionLevel: 'none' },
  { name: '赤狐', rai: 8.9, protectionLevel: 'none' },
  { name: '貉', rai: 7.6, protectionLevel: 'level2' },
  { name: '松鸦', rai: 6.3, protectionLevel: 'none' },
  { name: '梅花鹿', rai: 5.1, protectionLevel: 'level1' }
]

// ========== 月活动节律数据（柱状图） ==========
export const monthlyActivityData = {
  all: [
    { month: '1月', mrai: 8.2 },
    { month: '2月', mrai: 9.5 },
    { month: '3月', mrai: 12.3 },
    { month: '4月', mrai: 15.8 },
    { month: '5月', mrai: 18.2 },
    { month: '6月', mrai: 16.5 },
    { month: '7月', mrai: 14.2 },
    { month: '8月', mrai: 13.8 },
    { month: '9月', mrai: 15.6 },
    { month: '10月', mrai: 17.3 },
    { month: '11月', mrai: 14.8 },
    { month: '12月', mrai: 10.2 }
  ],
  '野猪': [
    { month: '1月', mrai: 12.5 },
    { month: '2月', mrai: 14.2 },
    { month: '3月', mrai: 18.6 },
    { month: '4月', mrai: 22.3 },
    { month: '5月', mrai: 25.8 },
    { month: '6月', mrai: 23.2 },
    { month: '7月', mrai: 20.1 },
    { month: '8月', mrai: 19.5 },
    { month: '9月', mrai: 22.8 },
    { month: '10月', mrai: 26.5 },
    { month: '11月', mrai: 21.3 },
    { month: '12月', mrai: 15.6 }
  ],
  '豹猫': [
    { month: '1月', mrai: 6.2 },
    { month: '2月', mrai: 7.8 },
    { month: '3月', mrai: 10.5 },
    { month: '4月', mrai: 14.2 },
    { month: '5月', mrai: 16.8 },
    { month: '6月', mrai: 15.3 },
    { month: '7月', mrai: 12.8 },
    { month: '8月', mrai: 11.5 },
    { month: '9月', mrai: 13.6 },
    { month: '10月', mrai: 15.2 },
    { month: '11月', mrai: 12.8 },
    { month: '12月', mrai: 8.5 }
  ],
  '狗獾': [
    { month: '1月', mrai: 2.1 },
    { month: '2月', mrai: 3.5 },
    { month: '3月', mrai: 8.2 },
    { month: '4月', mrai: 12.5 },
    { month: '5月', mrai: 15.8 },
    { month: '6月', mrai: 14.2 },
    { month: '7月', mrai: 11.5 },
    { month: '8月', mrai: 10.2 },
    { month: '9月', mrai: 12.8 },
    { month: '10月', mrai: 14.5 },
    { month: '11月', mrai: 8.3 },
    { month: '12月', mrai: 3.2 }
  ]
}

// ========== 日活动节律数据（折线图） ==========
export const dailyActivityData = {
  all: [
    { hour: '0时', trai: 12.5 },
    { hour: '1时', trai: 15.2 },
    { hour: '2时', trai: 18.6 },
    { hour: '3时', trai: 22.3 },
    { hour: '4时', trai: 25.8 },
    { hour: '5时', trai: 20.2 },
    { hour: '6时', trai: 12.5 },
    { hour: '7时', trai: 8.3 },
    { hour: '8时', trai: 5.6 },
    { hour: '9时', trai: 4.2 },
    { hour: '10时', trai: 3.5 },
    { hour: '11时', trai: 3.2 },
    { hour: '12时', trai: 2.8 },
    { hour: '13时', trai: 3.1 },
    { hour: '14时', trai: 3.8 },
    { hour: '15时', trai: 4.5 },
    { hour: '16时', trai: 5.8 },
    { hour: '17时', trai: 8.5 },
    { hour: '18时', trai: 12.2 },
    { hour: '19时', trai: 15.8 },
    { hour: '20时', trai: 18.5 },
    { hour: '21时', trai: 20.2 },
    { hour: '22时', trai: 18.8 },
    { hour: '23时', trai: 15.5 }
  ],
  '野猪': [
    { hour: '0时', trai: 15.2 },
    { hour: '1时', trai: 18.5 },
    { hour: '2时', trai: 22.8 },
    { hour: '3时', trai: 28.5 },
    { hour: '4时', trai: 32.1 },
    { hour: '5时', trai: 25.3 },
    { hour: '6时', trai: 15.2 },
    { hour: '7时', trai: 8.5 },
    { hour: '8时', trai: 5.2 },
    { hour: '9时', trai: 3.8 },
    { hour: '10时', trai: 2.5 },
    { hour: '11时', trai: 2.2 },
    { hour: '12时', trai: 1.8 },
    { hour: '13时', trai: 2.1 },
    { hour: '14时', trai: 2.8 },
    { hour: '15时', trai: 3.5 },
    { hour: '16时', trai: 5.2 },
    { hour: '17时', trai: 8.5 },
    { hour: '18时', trai: 14.2 },
    { hour: '19时', trai: 18.5 },
    { hour: '20时', trai: 22.8 },
    { hour: '21时', trai: 25.5 },
    { hour: '22时', trai: 23.2 },
    { hour: '23时', trai: 18.5 }
  ],
  '豹猫': [
    { hour: '0时', trai: 18.5 },
    { hour: '1时', trai: 22.3 },
    { hour: '2时', trai: 26.8 },
    { hour: '3时', trai: 30.2 },
    { hour: '4时', trai: 28.5 },
    { hour: '5时', trai: 20.2 },
    { hour: '6时', trai: 12.5 },
    { hour: '7时', trai: 6.2 },
    { hour: '8时', trai: 3.5 },
    { hour: '9时', trai: 2.2 },
    { hour: '10时', trai: 1.5 },
    { hour: '11时', trai: 1.2 },
    { hour: '12时', trai: 1.0 },
    { hour: '13时', trai: 1.2 },
    { hour: '14时', trai: 1.8 },
    { hour: '15时', trai: 2.5 },
    { hour: '16时', trai: 4.2 },
    { hour: '17时', trai: 7.5 },
    { hour: '18时', trai: 12.2 },
    { hour: '19时', trai: 16.5 },
    { hour: '20时', trai: 21.2 },
    { hour: '21时', trai: 25.8 },
    { hour: '22时', trai: 24.5 },
    { hour: '23时', trai: 20.2 }
  ],
  '狗獾': [
    { hour: '0时', trai: 20.2 },
    { hour: '1时', trai: 25.5 },
    { hour: '2时', trai: 28.8 },
    { hour: '3时', trai: 25.2 },
    { hour: '4时', trai: 18.5 },
    { hour: '5时', trai: 10.2 },
    { hour: '6时', trai: 5.5 },
    { hour: '7时', trai: 2.8 },
    { hour: '8时', trai: 1.5 },
    { hour: '9时', trai: 0.8 },
    { hour: '10时', trai: 0.5 },
    { hour: '11时', trai: 0.3 },
    { hour: '12时', trai: 0.2 },
    { hour: '13时', trai: 0.3 },
    { hour: '14时', trai: 0.5 },
    { hour: '15时', trai: 1.2 },
    { hour: '16时', trai: 2.5 },
    { hour: '17时', trai: 5.8 },
    { hour: '18时', trai: 10.5 },
    { hour: '19时', trai: 15.8 },
    { hour: '20时', trai: 22.5 },
    { hour: '21时', trai: 26.8 },
    { hour: '22时', trai: 25.2 },
    { hour: '23时', trai: 22.5 }
  ]
}

// ========== 图层配置 ==========
export const mapLayerConfig = {
  cameraPoints: { name: '红外相机点位', visible: true },
  boundary: { name: '保护地边界', visible: true },
  vegetation: { name: '植被类型', visible: false },
  grid: { name: '监测网格', visible: false }
}
