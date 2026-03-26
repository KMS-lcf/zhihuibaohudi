// 巡护监管相关数据

// 巡护人员数据
export const patrolPersonnel = [
  { id: 'P001', name: '张明', department: '巡护一队', isOnline: true, position: { top: '35%', left: '30%' }, todayDistance: 5.2, todayDuration: 3.5, todayReports: 8 },
  { id: 'P002', name: '李华', department: '巡护一队', isOnline: true, position: { top: '45%', left: '55%' }, todayDistance: 4.8, todayDuration: 4.0, todayReports: 6 },
  { id: 'P003', name: '王强', department: '巡护二队', isOnline: true, position: { top: '60%', left: '40%' }, todayDistance: 6.1, todayDuration: 5.2, todayReports: 10 },
  { id: 'P004', name: '刘伟', department: '巡护二队', isOnline: false, position: { top: '50%', left: '65%' }, todayDistance: 3.2, todayDuration: 2.5, todayReports: 4 },
  { id: 'P005', name: '赵军', department: '巡护三队', isOnline: true, position: { top: '40%', left: '45%' }, todayDistance: 5.5, todayDuration: 4.8, todayReports: 7 },
]

// 轨迹颜色
export const trajectoryColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

// 巡护轨迹数据
export const patrolTrajectories = [
  { 
    personnelId: 'P001', 
    color: trajectoryColors[0],
    points: [
      { top: '25%', left: '20%' },
      { top: '30%', left: '25%' },
      { top: '35%', left: '30%' },
      { top: '32%', left: '38%' },
    ],
    markers: [
      { top: '28%', left: '22%', type: 'photo', description: '发现珍稀植物', time: '08:32:15' },
      { top: '35%', left: '30%', type: 'audio', description: '鸟类鸣叫录音', time: '09:15:42', duration: '02:35' },
    ]
  },
  { 
    personnelId: 'P002', 
    color: trajectoryColors[1],
    points: [
      { top: '40%', left: '50%' },
      { top: '45%', left: '55%' },
      { top: '48%', left: '60%' },
    ],
    markers: [
      { top: '45%', left: '55%', type: 'text', description: '发现野生动物足迹', time: '10:22:18' },
    ]
  },
  { 
    personnelId: 'P003', 
    color: trajectoryColors[2],
    points: [
      { top: '55%', left: '35%' },
      { top: '58%', left: '40%' },
      { top: '60%', left: '40%' },
      { top: '62%', left: '45%' },
    ],
    markers: []
  },
  { 
    personnelId: 'P005', 
    color: trajectoryColors[4],
    points: [
      { top: '35%', left: '40%' },
      { top: '38%', left: '42%' },
      { top: '40%', left: '45%' },
    ],
    markers: [
      { top: '38%', left: '42%', type: 'photo', description: '岩壁渗水情况', time: '11:05:33' },
    ]
  },
]

// 巡护事件类型
export const patrolEventTypes = [
  { id: 'species', name: '物种速记', color: '#22c55e', icon: '🦋' },
  { id: 'human', name: '人为干扰', color: '#ef4444', icon: '🚶' },
  { id: 'disaster', name: '自然灾害', color: '#f97316', icon: '🌊' },
  { id: 'pest', name: '有害生物', color: '#a855f7', icon: '🐛' },
  { id: 'fire', name: '火灾隐患', color: '#dc2626', icon: '🔥' },
  { id: 'device', name: '设备巡检', color: '#3b82f6', icon: '📷' },
  { id: 'community', name: '社区走访', color: '#06b6d4', icon: '🏠' },
  { id: 'illegal', name: '林政案件', color: '#eab308', icon: '⚖️' },
  { id: 'occupation', name: '林草征占', color: '#84cc16', icon: '🏗️' },
  { id: 'other', name: '其它事件', color: '#6b7280', icon: '📝' },
]

// 巡护事件数据
export const patrolEvents = [
  { id: 'E001', type: 'species', position: { top: '28%', left: '35%' }, reporter: '张明', time: '09:15:32', hourMinute: '09:15', title: '发现国家二级保护植物', speciesName: '八角莲', lat: '39.7856', lng: '115.9324', photos: 3 },
  { id: 'E002', type: 'human', position: { top: '45%', left: '42%' }, reporter: '李华', time: '10:22:18', hourMinute: '10:22', title: '发现游客违规进入核心区', interferenceType: '游客违规', lat: '39.7912', lng: '115.9401', photos: 2 },
  { id: 'E003', type: 'fire', position: { top: '55%', left: '48%' }, reporter: '王强', time: '11:05:45', hourMinute: '11:05', title: '发现枯枝堆积火灾隐患', hazardType: '枯枝堆积', lat: '39.7889', lng: '115.9456', photos: 4 },
  { id: 'E004', type: 'device', position: { top: '38%', left: '58%' }, reporter: '李华', time: '11:32:10', hourMinute: '11:32', title: '红外相机例行巡检', inspectionContent: '红外相机正常运行', lat: '39.7934', lng: '115.9389', photos: 1 },
  { id: 'E005', type: 'pest', position: { top: '62%', left: '35%' }, reporter: '张明', time: '12:18:55', hourMinute: '12:18', title: '发现松材线虫病害', pestName: '松材线虫', lat: '39.7823', lng: '115.9287', photos: 5 },
  { id: 'E006', type: 'community', position: { top: '50%', left: '68%' }, reporter: '王强', time: '13:45:22', hourMinute: '13:45', title: '走访周边社区居民', communityName: '石花洞村', lat: '39.7967', lng: '115.9512', photos: 2 },
  { id: 'E007', type: 'other', position: { top: '42%', left: '52%' }, reporter: '赵军', time: '14:08:33', hourMinute: '14:08', title: '发现不明动物粪便', lat: '39.7901', lng: '115.9378', photos: 3 },
]

// 地理图层配置
export const geoLayers = [
  { id: 'boundary', name: '保护区边界', visible: true },
  { id: 'core', name: '核心区', visible: true },
  { id: 'buffer', name: '缓冲区', visible: true },
  { id: 'experiment', name: '实验区', visible: false },
  { id: 'trails', name: '巡护道路', visible: false },
  { id: 'facilities', name: '设施分布', visible: false },
]

// 事件筛选选项
export const eventFilterOptions = ['全部事件', ...patrolEventTypes.map(t => t.name)]
