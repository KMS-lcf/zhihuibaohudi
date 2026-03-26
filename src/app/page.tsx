'use client'

import { useState, useEffect } from 'react'
import { 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronsUpDown,
  Globe,
  User,
  Search,
  Layers,
  Map,
  MapPin,
  Leaf,
  Shield,
  Mountain,
  Activity,
  Users,
  Camera,
  Settings,
  FileText,
  BarChart3,
  Target,
  Eye,
  History,
  AlertTriangle,
  Image,
  ClipboardCheck,
  Database,
  FolderTree,
  Microscope,
  Binoculars,
  Bug,
  Bird,
  TreePine,
  Waves,
  Compass,
  Plus,
  Upload,
  Download,
  Trash2,
  ArrowUpDown,
  CheckSquare,
  Edit2,
  Video,
  Clock,
  Star,
  CheckCircle,
  Play,
  Mic,
  X,
  CloudSun,
  List,
  LayoutGrid,
  Filter,
  Save,
  Calendar,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  ImageOff,
  Brain,
  Sparkles,
  LineChart,
  PieChart,
  TrendingUp,
  FileCheck,
  FilePlus,
  MessageCircle,
  PanelLeftClose,
  PanelLeft,
  Cat,
  Fish,
  Flame,
  Bell,
  Zap,
  Package,
  Minus,
  Droplet,
  CloudLightning,
  Plug,
  Home as HomeIcon,
  Scan
} from 'lucide-react'

// 从组件目录导入
import { InfraredCameraDeployment, InfraredAchievementDisplay } from '@/components/infrared'
import { GeologyResourceInterface } from '@/components/geology'
import { HumanActivityRealtimeInterface, HumanActivityRealtimeLight, HumanActivityHistoryInterface, FullscreenVideoModal, FullscreenMapModal } from '@/components/human'
import { PatrolRealtimeInterface, PatrolStatsAssessment } from '@/components/patrol'
import { ImageMonitorInterface } from '@/components/videoMonitor'
import { AcousticMonitorInterface } from '@/components/acoustic'
import { AIChatBot } from '@/components/ai-chat'
import { EcologyDataManagement, EcologyRealtimeMonitor, EcologyRealtimeMonitorLight, EcologicalStatsAnalysis, EcologicalDeviceManagement } from '@/components/ecology'
import { TourismRealtimeInterface, TourismRealtimeLight } from '@/components/tourism'

// 从数据文件导入
import { videoMonitorPoints } from '@/data/videoMonitorData'

// 菜单数据结构
const menuData = [
  {
    id: 'overview',
    name: '保护地概况',
    icon: Map,
    children: []
  },
  {
    id: 'biodiversity',
    name: '生物多样性',
    icon: Leaf,
    children: [
      { id: 'biodiversity-overview', name: '综合展示' },
      { id: 'biodiversity-species', name: '物种资源' },
      { 
        id: 'biodiversity-survey', 
        name: '调查监测',
        children: [
          { id: 'survey-special', name: '专项调查' },
          { id: 'survey-infrared', name: '红外相机' },
          { id: 'survey-acoustic', name: '声纹监测' },
          { id: 'survey-image', name: '视频监测' }
        ]
      },
      { id: 'biodiversity-images', name: '图片管理' },
      { id: 'biodiversity-identify', name: '物种鉴定' },
      { id: 'biodiversity-distribution', name: '物种分布' },
      { 
        id: 'biodiversity-stats', 
        name: '统计分析',
        children: [
          { id: 'stats-species', name: '物种统计' },
          { id: 'stats-analysis', name: '专业分析' },
          { id: 'stats-report', name: '报告撰写' }
        ]
      }
    ]
  },
  {
    id: 'patrol',
    name: '巡护监管',
    icon: Shield,
    children: [
      { id: 'patrol-realtime', name: '实时巡护' },
      { id: 'patrol-task', name: '巡护任务' },
      { id: 'patrol-history', name: '历史巡护' },
      { id: 'patrol-event', name: '上报事件' },
      { id: 'patrol-gallery', name: '巡护图库' },
      { id: 'patrol-assessment', name: '统计考核' }
    ]
  },
  {
    id: 'geology',
    name: '地质监测',
    icon: Mountain,
    children: [
      { id: 'geology-resource', name: '资源展示' },
      { id: 'geology-data', name: '数据管理' },
      { id: 'geology-stats', name: '统计分析' }
    ]
  },
  {
    id: 'forest-fire',
    name: '森林防火',
    icon: Flame,
    children: [
      { id: 'forest-overview', name: '综合展示' },
      { id: 'forest-overview-light', name: '综合展示1' },
      { id: 'forest-monitoring', name: '监测预警' },
      { id: 'forest-command', name: '指挥调度' },
      { id: 'forest-history', name: '历史数据' },
      { id: 'forest-resource', name: '防火资源' },
      { id: 'forest-stats', name: '统计分析' }
    ]
  },
  {
    id: 'ecology',
    name: '生态环境',
    icon: CloudSun,
    children: [
      { id: 'ecology-realtime', name: '实时监测' },
      { id: 'ecology-realtime-light', name: '实时监测(白天)' },
      { id: 'ecology-data', name: '数据管理' },
      { id: 'ecology-device', name: '设备管理' },
      { id: 'ecology-stats', name: '统计分析' }
    ]
  },
  {
    id: 'human',
    name: '人类活动',
    icon: Users,
    children: [
      { id: 'human-realtime', name: '实时监控' },
      { id: 'human-realtime-1', name: '实时监控1' },
      { id: 'human-history', name: '历史数据' },
      { id: 'human-device', name: '设备管理' },
      { id: 'human-stats', name: '统计分析' }
    ]
  },
  {
    id: 'tourism',
    name: '旅游管理',
    icon: Camera,
    children: [
      { id: 'tourism-realtime', name: '实时监控' },
      { id: 'tourism-realtime-1', name: '实时监控1' },
      { id: 'tourism-history', name: '历史数据' },
      { id: 'tourism-resource', name: '旅游资源' },
      { id: 'tourism-device', name: '设备管理' },
      { id: 'tourism-stats', name: '统计分析' }
    ]
  },
  {
    id: 'system',
    name: '系统管理',
    icon: Settings,
    children: [
      { id: 'system-user', name: '人员管理' },
      { id: 'system-dept', name: '部门管理' },
      { id: 'system-log', name: '日志管理' },
      { id: 'system-custom', name: '自定义字段' },
      { 
        id: 'system-database', 
        name: '底层数据库',
        children: [
          { id: 'db-species-list', name: '物种名录库' },
          { id: 'db-protected', name: '保护物种库' },
          { id: 'db-flora', name: '区系数据库' }
        ]
      }
    ]
  }
]

// 主题数据
const themeTabs = ['生态本底', '地质资源', '资源价值', '保护管理', '规划公示', '动态资讯']

// 快捷链接数据
const quickLinks = [
  { id: 1, name: '生物多样性', icon: Leaf, color: 'bg-green-500' },
  { id: 2, name: '巡护监管', icon: Shield, color: 'bg-blue-500' },
  { id: 3, name: '地质监测', icon: Mountain, color: 'bg-amber-500' },
  { id: 4, name: '旅游管理', icon: Camera, color: 'bg-purple-500' },
  { id: 5, name: '系统设置', icon: Settings, color: 'bg-gray-500' }
]

// 生态数据
const ecologyData = {
  vegetation: { value: 92.3, unit: '%', label: '植被覆盖率', color: 'bg-green-500' },
  plants: { value: 1580, unit: '种', label: '植物物种', color: 'bg-sky-500' },
  animals: { value: 326, unit: '种', label: '动物物种', color: 'bg-orange-500' },
  protected: { value: 47, unit: '种', label: '保护物种', color: 'bg-red-500' }
}

// ========== 综合展示数据 ==========
// 年份数据
const yearOptions = ['全部', '2024', '2023', '2022', '2021', '2020']

// 核心指标数据
const biodiversityCoreData = [
  { id: 1, label: '发现物种', value: 1586, unit: '种', icon: Leaf, color: 'from-green-400 to-green-600' },
  { id: 2, label: '采集数据', value: 286543, unit: '条', icon: Database, color: 'from-blue-400 to-blue-600' },
  { id: 3, label: '调查专项', value: 127, unit: '项', icon: ClipboardCheck, color: 'from-purple-400 to-purple-600' },
  { id: 4, label: '监测设备', value: 156, unit: '套', icon: Camera, color: 'from-orange-400 to-orange-600' },
  { id: 5, label: '调查里程', value: 2847.5, unit: 'km', icon: Target, color: 'from-cyan-400 to-cyan-600' },
  { id: 6, label: '采集图像', value: 45862, unit: '张', icon: Image, color: 'from-pink-400 to-pink-600' }
]

// 植物资源统计数据
const plantResourceData = [
  { name: '被子植物', value: 856, color: '#22c55e' },
  { name: '裸子植物', value: 45, color: '#16a34a' },
  { name: '蕨类植物', value: 128, color: '#15803d' },
  { name: '苔藓植物', value: 89, color: '#166534' },
  { name: '真菌', value: 67, color: '#14532d' }
]

// 动物资源统计数据
const animalResourceData = [
  { name: '鸟类', value: 256, color: '#3b82f6' },
  { name: '昆虫', value: 389, color: '#f59e0b' },
  { name: '兽类', value: 42, color: '#ef4444' },
  { name: '两栖类', value: 35, color: '#8b5cf6' },
  { name: '鱼类', value: 53, color: '#06b6d4' }
]

// 保护物种统计数据
const protectedSpeciesData2 = [
  { category: '国家一级', plants: 5, animals: 8 },
  { category: '国家二级', plants: 18, animals: 26 },
  { category: '北京保护', plants: 32, animals: 45 }
]

// 优势物种统计数据 - 植物
const dominantPlantData = [
  { name: '栓皮栎', count: 156 },
  { name: '山杨', count: 142 },
  { name: '辽东栎', count: 128 },
  { name: '红棕杜鹃', count: 115 },
  { name: '露珠杜鹃', count: 98 },
  { name: '银木荷', count: 87 },
  { name: '华山松', count: 76 },
  { name: '云南松', count: 68 },
  { name: '苍山冷杉', count: 55 },
  { name: '野八角', count: 42 }
]

// 优势物种统计数据 - 动物
const dominantAnimalData = [
  { name: '褐马鸡', count: 89 },
  { name: '红腹锦鸡', count: 76 },
  { name: '大鲵', count: 156 },
  { name: '黑鹳', count: 45 },
  { name: '勺鸡', count: 34 },
  { name: '金钱豹', count: 23 },
  { name: '苍鹭', count: 67 },
  { name: '野猪', count: 52 },
  { name: '豹猫', count: 38 },
  { name: '豪猪', count: 29 }
]

// 典型物种数量统计
const typicalSpeciesData = [
  { name: '褐马鸡', count: 89, trend: 'up' },
  { name: '金钱豹', count: 23, trend: 'stable' },
  { name: '黑鹳', count: 45, trend: 'up' },
  { name: '大鲵', count: 156, trend: 'up' },
  { name: '红腹锦鸡', count: 78, trend: 'down' },
  { name: '勺鸡', count: 34, trend: 'stable' }
]

// 物种分布点位
const speciesPoints = [
  { id: 1, name: '褐马鸡', top: '25%', left: '40%', type: 'bird' },
  { id: 2, name: '金钱豹', top: '45%', left: '55%', type: 'mammal' },
  { id: 3, name: '黑鹳', top: '35%', left: '30%', type: 'bird' },
  { id: 4, name: '大鲵', top: '55%', left: '45%', type: 'amphibian' },
  { id: 5, name: '红腹锦鸡', top: '40%', left: '60%', type: 'bird' },
  { id: 6, name: '勺鸡', top: '60%', left: '35%', type: 'bird' },
  { id: 7, name: '', top: '50%', left: '50%', type: 'other' },
  { id: 8, name: '', top: '30%', left: '45%', type: 'other' }
]

// 监测设备点位
const infraredCameraPoints = [
  { id: 1, top: '20%', left: '35%' },
  { id: 2, top: '45%', left: '25%' },
  { id: 3, top: '65%', left: '55%' },
  { id: 4, top: '35%', left: '65%' }
]

const acousticMonitorPoints = [
  { id: 1, top: '30%', left: '50%' },
  { id: 2, top: '55%', left: '40%' }
]

// ========== 物种资源界面数据 ==========
// 物种分类导航
const speciesCategories = [
  { id: 'plant', name: '植物', count: 486 },
  { id: 'bird', name: '鸟类', count: 256 },
  { id: 'mammal', name: '兽类', count: 107 },
  { id: 'reptile', name: '两爬', count: 73 },
  { id: 'insect', name: '昆虫', count: 389 },
  { id: 'fish', name: '鱼类', count: 53 },
  { id: 'fungi', name: '大型真菌', count: 67 }
]

// 物种列表数据
const speciesListData = [
  { id: 1, name: '北树鼩', latinName: 'Tupaia belangeri', distribution: 0, quantity: 1, images: 0, order: '攀鼩目', family: '树鼩科', genus: '树鼩属', protection: '' },
  { id: 2, name: '石貂', latinName: 'Martes foina', distribution: 0, quantity: 1, images: 0, order: '食肉目', family: '鼬科', genus: '貂属', protection: '国家II级' },
  { id: 3, name: '亚洲狗獾', latinName: 'Meles leucurus', distribution: 16, quantity: 17, images: 11, order: '食肉目', family: '鼬科', genus: '狗獾属', protection: '' },
  { id: 4, name: '中华小熊猫', latinName: 'Ailurus styani', distribution: 1, quantity: 1, images: 0, order: '食肉目', family: '小熊猫科', genus: '小熊猫属', protection: '国家II级' },
  { id: 5, name: '亚洲黑熊', latinName: 'Ursus thibetanus', distribution: 1, quantity: 1, images: 0, order: '食肉目', family: '熊科', genus: '熊属', protection: '国家II级' },
  { id: 6, name: '棕熊', latinName: 'Ursus arctos', distribution: 1, quantity: 1, images: 0, order: '食肉目', family: '熊科', genus: '熊属', protection: '国家II级' },
  { id: 7, name: '豺', latinName: 'Cuon alpinus', distribution: 0, quantity: 1, images: 0, order: '食肉目', family: '犬科', genus: '豺属', protection: '国家I级' },
  { id: 8, name: '狼', latinName: 'Canis lupus', distribution: 1, quantity: 1, images: 0, order: '食肉目', family: '犬科', genus: '犬属', protection: '国家II级' },
  { id: 9, name: '小灵猫', latinName: 'Viverricula indica', distribution: 1, quantity: 1, images: 0, order: '食肉目', family: '灵猫科', genus: '小灵猫属', protection: '国家I级' },
  { id: 10, name: '斑林狸', latinName: 'Prionodon pardicolor', distribution: 1, quantity: 1, images: 0, order: '食肉目', family: '林狸科', genus: '林狸属', protection: '国家II级' },
  { id: 11, name: '雪豹', latinName: 'Panthera uncia', distribution: 0, quantity: 1, images: 0, order: '食肉目', family: '猫科', genus: '豹属', protection: '国家I级' },
  { id: 12, name: '豹', latinName: 'Panthera pardus', distribution: 1, quantity: 1, images: 0, order: '食肉目', family: '猫科', genus: '豹属', protection: '国家I级' },
  { id: 13, name: '云豹', latinName: 'Neofelis nebulosa', distribution: 0, quantity: 1, images: 0, order: '食肉目', family: '猫科', genus: '云豹属', protection: '国家I级' },
  { id: 14, name: '豹猫', latinName: 'Prionailurus bengalensis', distribution: 0, quantity: 1, images: 0, order: '食肉目', family: '猫科', genus: '豹猫属', protection: '国家II级' },
  { id: 15, name: '赤狐', latinName: 'Vulpes vulpes', distribution: 3, quantity: 5, images: 2, order: '食肉目', family: '犬科', genus: '狐属', protection: '' }
]

// 生态系统构成数据
const ecosystemData = [
  { name: '森林', value: 68.5, color: '#4caf50' },
  { name: '湿地', value: 15.2, color: '#2196f3' },
  { name: '洞穴', value: 8.3, color: '#9c27b0' },
  { name: '其他', value: 8.0, color: '#9e9e9e' }
]

// 动物资源数据
const animalData = [
  { name: '鸟类', value: 256, color: '#4caf50' },
  { name: '兽类', value: 26, color: '#ff9800' },
  { name: '两栖', value: 69, color: '#2196f3' },
  { name: '鱼类', value: 78, color: '#00bcd4' },
  { name: '昆虫', value: 567, color: '#9c27b0' }
]

// 保护物种数据
const protectedSpeciesData = {
  animals: { level1: 5, level2: 18 },
  plants: { level1: 5, level2: 15 }
}

// 植物资源数据
const plantData = [
  { name: '被子', value: 1200, color: '#4caf50' },
  { name: '裸子', value: 50, color: '#8bc34a' },
  { name: '蕨类', value: 180, color: '#cddc39' },
  { name: '苔藓', value: 100, color: '#ffeb3b' },
  { name: '真菌', value: 50, color: '#ffc107' }
]

// 生态本底内容数据
const ecologyContent = {
  title: '生态本底',
  description: '石花洞风景名胜区位于北京市房山区河北镇南车营村，是一个以岩溶洞穴景观为主的省级风景名胜区。保护区内生态环境优良，生物多样性丰富。',
  highlights: [
    { label: '森林覆盖率', value: '68.5%' },
    { label: '植物种类', value: '1580种' },
    { label: '动物种类', value: '326种' },
    { label: '保护物种', value: '47种' }
  ]
}

// ========== 调查专项界面数据 ==========
// 调查项目列表数据
const surveyProjectData = [
  { id: 1, name: '石花洞洞穴生物多样性调查', type: '洞穴生物', startDate: '2024-03-01', endDate: '2024-06-30', leader: '张明', status: '进行中', species: 45, records: 256 },
  { id: 2, name: '保护区鸟类资源专项调查', type: '鸟类', startDate: '2024-04-15', endDate: '2024-08-15', leader: '李华', status: '进行中', species: 78, records: 512 },
  { id: 3, name: '大型真菌多样性调查', type: '真菌', startDate: '2023-06-01', endDate: '2023-10-30', leader: '王芳', status: '已完成', species: 67, records: 189 },
  { id: 4, name: '红外相机野生动物监测调查', type: '兽类', startDate: '2024-01-01', endDate: '2024-12-31', leader: '赵强', status: '进行中', species: 32, records: 1245 },
  { id: 5, name: '两栖爬行动物资源调查', type: '两爬', startDate: '2023-05-15', endDate: '2023-09-30', leader: '刘洋', status: '已完成', species: 28, records: 176 },
  { id: 6, name: '珍稀植物分布专项调查', type: '植物', startDate: '2024-05-01', endDate: '2024-10-31', leader: '陈静', status: '未开始', species: 0, records: 0 },
  { id: 7, name: '昆虫多样性本底调查', type: '昆虫', startDate: '2023-07-01', endDate: '2023-11-30', leader: '周伟', status: '已完成', species: 156, records: 823 },
  { id: 8, name: '水生生物资源调查', type: '水生', startDate: '2024-06-01', endDate: '2024-09-30', leader: '吴敏', status: '未开始', species: 0, records: 0 }
]

// 调查状态选项
const surveyStatusOptions = ['全部', '未开始', '进行中', '已完成', '已暂停']

// ========== 巡护监管数据 ==========
// 巡护人员数据
const patrolPersonnel = [
  { id: 'P001', name: '张明', department: '巡护一队', isOnline: true, position: { top: '35%', left: '30%' }, todayDistance: 5.2, todayDuration: 3.5, todayReports: 8 },
  { id: 'P002', name: '李华', department: '巡护一队', isOnline: true, position: { top: '45%', left: '55%' }, todayDistance: 4.8, todayDuration: 4.0, todayReports: 6 },
  { id: 'P003', name: '王强', department: '巡护二队', isOnline: true, position: { top: '60%', left: '40%' }, todayDistance: 6.1, todayDuration: 5.2, todayReports: 10 },
  { id: 'P004', name: '刘伟', department: '巡护二队', isOnline: false, position: { top: '50%', left: '65%' }, todayDistance: 3.2, todayDuration: 2.5, todayReports: 4 },
  { id: 'P005', name: '赵军', department: '巡护三队', isOnline: true, position: { top: '40%', left: '45%' }, todayDistance: 5.5, todayDuration: 4.8, todayReports: 7 },
]

// 轨迹颜色
const trajectoryColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

// 巡护轨迹数据
const patrolTrajectories = [
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
const patrolEventTypes = [
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
const patrolEvents = [
  { id: 'E001', type: 'species', position: { top: '28%', left: '35%' }, reporter: '张明', time: '09:15:32', hourMinute: '09:15', title: '发现国家二级保护植物', speciesName: '八角莲', lat: '39.7856', lng: '115.9324', photos: 3 },
  { id: 'E002', type: 'human', position: { top: '45%', left: '42%' }, reporter: '李华', time: '10:22:18', hourMinute: '10:22', title: '发现游客违规进入核心区', interferenceType: '游客违规', lat: '39.7912', lng: '115.9401', photos: 2 },
  { id: 'E003', type: 'fire', position: { top: '55%', left: '48%' }, reporter: '王强', time: '11:05:45', hourMinute: '11:05', title: '发现枯枝堆积火灾隐患', hazardType: '枯枝堆积', lat: '39.7889', lng: '115.9456', photos: 4 },
  { id: 'E004', type: 'device', position: { top: '38%', left: '58%' }, reporter: '李华', time: '11:32:10', hourMinute: '11:32', title: '红外相机例行巡检', inspectionContent: '红外相机正常运行', lat: '39.7934', lng: '115.9389', photos: 1 },
  { id: 'E005', type: 'pest', position: { top: '62%', left: '35%' }, reporter: '张明', time: '12:18:55', hourMinute: '12:18', title: '发现松材线虫病害', pestName: '松材线虫', lat: '39.7823', lng: '115.9287', photos: 5 },
  { id: 'E006', type: 'community', position: { top: '50%', left: '68%' }, reporter: '王强', time: '13:45:22', hourMinute: '13:45', title: '走访周边社区居民', communityName: '石花洞村', lat: '39.7967', lng: '115.9512', photos: 2 },
  { id: 'E007', type: 'other', position: { top: '42%', left: '52%' }, reporter: '赵军', time: '14:08:33', hourMinute: '14:08', title: '发现不明动物粪便', lat: '39.7901', lng: '115.9378', photos: 3 },
]

// 地理图层配置
const geoLayers = [
  { id: 'boundary', name: '保护区边界', visible: true },
  { id: 'core', name: '核心区', visible: true },
  { id: 'buffer', name: '缓冲区', visible: true },
  { id: 'experiment', name: '实验区', visible: false },
  { id: 'trails', name: '巡护道路', visible: false },
  { id: 'facilities', name: '设施分布', visible: false },
]

// 事件筛选选项
const eventFilterOptions = ['全部事件', ...patrolEventTypes.map(t => t.name)]

// 近24小时监测动态数据（每半小时一个数据点，共48个点）
const generateMonitorTrendData = () => {
  const data = []
  const now = new Date()
  // 模拟一天中不同时段的监测数据变化
  // 凌晨数据较少，白天和傍晚数据较多
  for (let i = 47; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 30 * 60 * 1000)
    const hours = time.getHours()
    const minutes = time.getMinutes().toString().padStart(2, '0')
    
    // 根据时间段生成不同的基础数据
    let baseCount = 35
    if (hours >= 6 && hours < 9) {
      // 早晨：活动增加
      baseCount = 45 + Math.floor(Math.random() * 15)
    } else if (hours >= 9 && hours < 12) {
      // 上午：活动较多
      baseCount = 55 + Math.floor(Math.random() * 20)
    } else if (hours >= 12 && hours < 15) {
      // 中午：活动稍减
      baseCount = 50 + Math.floor(Math.random() * 15)
    } else if (hours >= 15 && hours < 19) {
      // 下午至傍晚：活动高峰
      baseCount = 60 + Math.floor(Math.random() * 20)
    } else if (hours >= 19 && hours < 22) {
      // 晚间：活动逐渐减少
      baseCount = 45 + Math.floor(Math.random() * 15)
    } else {
      // 夜间：活动较少
      baseCount = 25 + Math.floor(Math.random() * 15)
    }
    
    data.push({
      label: `${hours.toString().padStart(2, '0')}:${minutes}`,
      count: baseCount
    })
  }
  return data
}

const monitorTrendData24Hours = generateMonitorTrendData()

// 监测数据趋势（按月）
const monitorTrendDataByMonth = [
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
const monitorTrendDataByDay = [
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

// 视频中识别的鸟类
const detectedBirdsInVideo = [
  { id: 1, name: '黑鹳', confidence: 96.8, x: 35, y: 40, width: 15, height: 20 },
  { id: 2, name: '黑鹳', confidence: 94.2, x: 55, y: 45, width: 12, height: 18 }
]

// ========== 地质资源展示数据 ==========
// 地质资源大类选项
const geologyCategories = {
  mainCategory: ['地貌景观', '地质构造', '古生物', '矿物岩石', '水体景观', '环境地质'],
  category: {
    '地貌景观': ['岩石地貌', '冰川地貌', '火山地貌', '风成地貌', '海岸地貌'],
    '地质构造': ['构造形迹', '典型沉积', '岩浆活动'],
    '古生物': ['古动物', '古植物', '遗迹化石'],
    '矿物岩石': ['矿物', '岩石', '宝玉石'],
    '水体景观': ['泉水', '瀑布', '湖泊', '河流'],
    '环境地质': ['地质灾害', '地质环境']
  },
  subCategory: {
    '岩石地貌': ['可溶岩地貌', '花岗岩地貌', '丹霞地貌', '砂岩地貌'],
    '冰川地貌': ['山岳冰川', '冰川遗迹'],
    '火山地貌': ['火山锥', '熔岩流', '火山口'],
    '风成地貌': ['雅丹地貌', '沙漠景观'],
    '海岸地貌': ['海蚀地貌', '海积地貌'],
    '构造形迹': ['断裂构造', '褶皱构造', '构造组合'],
    '典型沉积': ['沉积剖面', '沉积构造'],
    '岩浆活动': ['侵入岩', '喷出岩'],
    '古动物': ['古无脊椎动物', '古脊椎动物'],
    '古植物': ['古植物化石', '硅化木'],
    '遗迹化石': ['恐龙足迹', '其他遗迹'],
    '矿物': ['金属矿物', '非金属矿物'],
    '岩石': ['岩浆岩', '沉积岩', '变质岩'],
    '宝玉石': ['宝石', '玉石'],
    '泉水': ['温矿泉', '冷泉'],
    '瀑布': ['瀑布群', '单体瀑布'],
    '湖泊': ['构造湖', '火山湖', '堰塞湖'],
    '河流': ['峡谷', '河曲', '阶地'],
    '地质灾害': ['滑坡', '泥石流', '崩塌'],
    '地质环境': ['洞穴', '地下河']
  },
  level: ['世界级', '国家级', '省级', '市级']
}

// 地质资源数据
const geologyResources = [
  {
    id: 1,
    name: '石花洞',
    level: '国家级',
    mainCategory: '地貌景观',
    category: '岩石地貌',
    subCategory: '可溶岩地貌',
    code: 'BJSHT-001',
    fieldCodes: ['BJSHT-001-01', 'BJSHT-001-02', 'BJSHT-001-03'],
    areaCode: 'FS-01',
    lng: 115.943366,
    lat: 39.797508,
    altitude: 250,
    location: '北京市房山区河北镇南车营村',
    parkName: '石花洞国家级风景名胜区',
    exposureRange: '洞体分为上下七层，已探明总长度超5000米，已开放一至四层，开放长度约1900米，洞内面积约18000平方米',
    type: '岩石地貌景观',
    geoEra: '洞体围岩形成于中奥陶世马家沟期（约4.9-4.5亿年前），洞穴形成于第四纪中更新世（约70-20万年前），洞内钟乳石等沉积物形成于晚更新世至今',
    lithology: '洞体发育于中奥陶统马家沟组石灰岩，主要成分为方解石（CaCO₃），岩层厚度大、质地纯净，为岩溶作用提供了良好条件',
    structure: '位于西山褶皱带与华北平原过渡地带，受燕山运动晚期构造作用影响，岩层呈缓倾单斜构造，节理裂隙发育，为地下水运移和溶蚀提供了通道。洞体多层结构是地壳间歇性抬升与地下水位周期性下降共同作用的结果',
    features: '石花洞是中国北方乃至全球温带半干旱、半湿润地区大型岩溶洞穴的典型代表，被誉为"地下地质奇观，溶洞博物馆"。',
    formation: '石花洞的形成是长期地质作用的结果，经历了三个关键阶段：基础形成阶段、洞穴发育阶段、景观塑造阶段。',
    protectionStatus: '已建立"国家地质公园+国家级风景名胜区+市级自然保护区"三位一体的保护管理体系',
    scientificValue: '科学性极高，是研究华北地区岩溶作用、地壳运动、古气候环境变化的理想场所',
    rarity: '稀有性极高，多层溶洞结构在北方岩溶区罕见，石花数量和种类居国内洞穴前列',
    integrity: '洞体结构完整，从形成、发育到景观塑造的各个阶段特征清晰保留',
    ornamentalValue: '观赏性极高，洞内景观玲珑剔透、千姿百态',
    preservationStatus: '核心区（五至七层）保存原始状态，开放区域（一至四层）在严格保护下适度开发',
    protectability: '地理位置相对独立，周边生态环境良好，保护管理机构健全',
    suggestedLevel: '建议纳入国家地质遗迹名录，加强保护力度，提升保护级别',
    images: [
      '/geology-detail.png',
      '/geology-detail.png',
      '/geology-detail.png'
    ]
  },
  {
    id: 2,
    name: '银狐洞',
    level: '国家级',
    mainCategory: '地貌景观',
    category: '岩石地貌',
    subCategory: '可溶岩地貌',
    code: 'BJYHD-001',
    fieldCodes: ['BJYHD-001-01'],
    areaCode: 'FS-02',
    lng: 115.856234,
    lat: 39.812456,
    altitude: 280,
    location: '北京市房山区佛子庄乡',
    parkName: '石花洞国家级风景名胜区',
    exposureRange: '洞体长约5000米，已开发约2000米，洞内面积约8000平方米',
    type: '岩石地貌景观',
    geoEra: '形成于第四纪中更新世',
    lithology: '发育于中奥陶统马家沟组石灰岩',
    structure: '单斜构造，节理裂隙发育',
    features: '以石花、石葡萄、石珍珠等精美沉积物著称，特别是"银狐"造型独特',
    formation: '长期岩溶作用形成',
    protectionStatus: '已纳入石花洞风景名胜区保护体系',
    scientificValue: '具有较高的科学研究价值',
    rarity: '沉积物造型独特，国内罕见',
    integrity: '保存完好',
    ornamentalValue: '观赏价值高',
    preservationStatus: '良好',
    protectability: '具备有效保护条件',
    suggestedLevel: '保持国家级保护级别',
    images: [
      '/geology-detail.png',
      '/geology-detail.png'
    ]
  },
  {
    id: 3,
    name: '孔水洞',
    level: '省级',
    mainCategory: '地貌景观',
    category: '岩石地貌',
    subCategory: '可溶岩地貌',
    code: 'BJKSD-001',
    fieldCodes: ['BJKSD-001-01'],
    areaCode: 'FS-03',
    lng: 115.923456,
    lat: 39.789123,
    altitude: 220,
    location: '北京市房山区河北镇',
    parkName: '石花洞国家级风景名胜区',
    exposureRange: '洞长约3000米',
    type: '岩石地貌景观',
    geoEra: '形成于第四纪',
    lithology: '石灰岩',
    structure: '单斜构造',
    features: '洞内有地下河，水质清澈',
    formation: '岩溶作用形成',
    protectionStatus: '纳入风景名胜区保护',
    scientificValue: '具有一定科研价值',
    rarity: '地下河景观独特',
    integrity: '保存较好',
    ornamentalValue: '观赏价值较高',
    preservationStatus: '良好',
    protectability: '具备保护条件',
    suggestedLevel: '建议提升保护级别',
    images: [
      '/geology-detail.png'
    ]
  },
  {
    id: 4,
    name: '鸡毛洞',
    level: '市级',
    mainCategory: '地貌景观',
    category: '岩石地貌',
    subCategory: '可溶岩地貌',
    code: 'BJJMD-001',
    fieldCodes: ['BJJMD-001-01'],
    areaCode: 'FS-04',
    lng: 115.912345,
    lat: 39.801234,
    altitude: 300,
    location: '北京市房山区河北镇',
    parkName: '石花洞国家级风景名胜区',
    exposureRange: '洞长约1500米',
    type: '岩石地貌景观',
    geoEra: '形成于第四纪',
    lithology: '石灰岩',
    structure: '单斜构造',
    features: '洞内石幔发育',
    formation: '岩溶作用形成',
    protectionStatus: '纳入风景名胜区保护',
    scientificValue: '具有一般科研价值',
    rarity: '一般',
    integrity: '保存一般',
    ornamentalValue: '观赏价值一般',
    preservationStatus: '一般',
    protectability: '具备基本保护条件',
    suggestedLevel: '加强保护',
    images: [
      '/geology-detail.png'
    ]
  },
  {
    id: 5,
    name: '清风洞',
    level: '市级',
    mainCategory: '地貌景观',
    category: '岩石地貌',
    subCategory: '可溶岩地貌',
    code: 'BJQFD-001',
    fieldCodes: ['BJQFD-001-01'],
    areaCode: 'FS-05',
    lng: 115.934567,
    lat: 39.778901,
    altitude: 260,
    location: '北京市房山区河北镇',
    parkName: '石花洞国家级风景名胜区',
    exposureRange: '洞长约800米',
    type: '岩石地貌景观',
    geoEra: '形成于第四纪',
    lithology: '石灰岩',
    structure: '单斜构造',
    features: '洞内有石笋、石柱',
    formation: '岩溶作用形成',
    protectionStatus: '纳入风景名胜区保护',
    scientificValue: '具有一般科研价值',
    rarity: '一般',
    integrity: '保存一般',
    ornamentalValue: '观赏价值一般',
    preservationStatus: '一般',
    protectability: '具备基本保护条件',
    suggestedLevel: '加强保护',
    images: [
      '/geology-detail.png'
    ]
  }
]

// ========== 红外相机布设数据 ==========
// 专项调查项目数据（用于所属项目下拉）
const surveyProjects = [
  { id: 1, name: '红外相机野生动物监测调查' },
  { id: 2, name: '保护区鸟类资源专项调查' },
  { id: 3, name: '珍稀植物分布专项调查' },
  { id: 4, name: '水生生物资源调查' },
  { id: 5, name: '昆虫多样性调查' }
]

// 相机型号数据
const cameraModels = [
  { id: 'CAM001', model: 'BUSHNELL TROPHY CAM HD', storageCard: 'SD-001', iotCard: 'IoT-001' },
  { id: 'CAM002', model: 'RECONYX HP2X', storageCard: 'SD-002', iotCard: 'IoT-002' },
  { id: 'CAM003', model: 'SPYPOINT LINK-MICRO', storageCard: 'SD-003', iotCard: 'IoT-003' },
  { id: 'CAM004', model: 'Browning Strike Force', storageCard: 'SD-004', iotCard: 'IoT-004' }
]

// 红外相机布设点位详细数据
const infraredCameraDeploymentData = [
  {
    id: 'IR001',
    pointCode: 'STD-001',
    cameraId: 'CAM001',
    cameraModel: 'BUSHNELL TROPHY CAM HD',
    storageCard: 'SD-001',
    iotCard: 'IoT-001',
    lng: 115.9423,
    lat: 39.7856,
    altitude: 456,
    projectId: 1,
    projectName: '红外相机野生动物监测调查',
    deployTime: '2024-03-15',
    deployer: '李华',
    surveyArea: '北京市房山区河北镇南车营村',
    smallPlace: '一号洞口东侧',
    sampleArea: '核心区A1样区',
    reserveName: '石花洞风景名胜区',
    // 地形信息
    terrain: '山地',
    slopePosition: '中部',
    slopeAspect: '东北',
    slopeDegree: '陡坡(15-26°)',
    waterType: '溪流',
    waterDistance: '≥100m',
    // 植被信息
    vegetationType: '阔叶林',
    habitatFeature: '林下灌丛茂密，光照适中',
    treeHeight: 15,
    treeDbh: 25,
    forestOrigin: '次生',
    dominantTreeSpecies: '栓皮栎、蒙古栎',
    shrubHeight: '1-3m',
    shrubType: '落叶',
    shrubCoverage: '50-74%',
    dominantShrubSpecies: '胡枝子、绣线菊',
    herbCoverage: '25-49%',
    herbType: '禾本为主',
    dominantHerbSpecies: '苔草、野古草',
    // 其他信息
    assistant: '王强、赵敏',
    remark: '该点位兽类活动频繁',
    photos: [],
    status: '监测中',
    // 统计信息
    totalPhotos: 1256,
    validPhotos: 892,
    speciesCount: 28,
    dominantSpecies: '野猪',
    // 地图位置
    mapTop: '35%',
    mapLeft: '42%',
    // 已鉴定图片
    identifiedImages: [
      { id: 1, species: '野猪', latinName: 'Sus scrofa', time: '2024-03-20 22:15:32', url: '' },
      { id: 2, species: '狗獾', latinName: 'Meles meles', time: '2024-03-21 01:23:45', url: '' },
      { id: 3, species: '豹猫', latinName: 'Prionailurus bengalensis', time: '2024-03-22 03:45:18', url: '' }
    ]
  },
  {
    id: 'IR002',
    pointCode: 'STD-002',
    cameraId: 'CAM002',
    cameraModel: 'RECONYX HP2X',
    storageCard: 'SD-002',
    iotCard: 'IoT-002',
    lng: 115.9487,
    lat: 39.7823,
    altitude: 523,
    projectId: 1,
    projectName: '红外相机野生动物监测调查',
    deployTime: '2024-03-18',
    deployer: '张伟',
    surveyArea: '北京市房山区河北镇南车营村',
    smallPlace: '二号洞口西侧',
    sampleArea: '核心区A2样区',
    reserveName: '石花洞风景名胜区',
    terrain: '山地',
    slopePosition: '上部',
    slopeAspect: '南',
    slopeDegree: '中坡(6-14°)',
    waterType: '泉眼',
    waterDistance: '＜100m',
    vegetationType: '混交林',
    habitatFeature: '针阔混交林，林下植被丰富',
    treeHeight: 18,
    treeDbh: 30,
    forestOrigin: '次生',
    dominantTreeSpecies: '油松、栓皮栎',
    shrubHeight: '0-1m',
    shrubType: '混合',
    shrubCoverage: '25-49%',
    dominantShrubSpecies: '杜鹃、胡枝子',
    herbCoverage: '50-74%',
    herbType: '非禾本为主',
    dominantHerbSpecies: '蕨类、羊胡子草',
    assistant: '刘芳',
    remark: '靠近水源，动物活动频繁',
    photos: [],
    status: '监测中',
    totalPhotos: 2134,
    validPhotos: 1567,
    speciesCount: 35,
    dominantSpecies: '果子狸',
    mapTop: '28%',
    mapLeft: '55%',
    identifiedImages: [
      { id: 1, species: '果子狸', latinName: 'Paguma larvata', time: '2024-03-23 21:30:15', url: '' },
      { id: 2, species: '豪猪', latinName: 'Hystrix hodgsoni', time: '2024-03-24 02:15:40', url: '' }
    ]
  },
  {
    id: 'IR003',
    pointCode: 'STD-003',
    cameraId: 'CAM003',
    cameraModel: 'SPYPOINT LINK-MICRO',
    storageCard: 'SD-003',
    iotCard: 'IoT-003',
    lng: 115.9356,
    lat: 39.7912,
    altitude: 398,
    projectId: 2,
    projectName: '保护区鸟类资源专项调查',
    deployTime: '2024-04-10',
    deployer: '陈静',
    surveyArea: '北京市房山区河北镇南车营村',
    smallPlace: '洞口北侧山脊',
    sampleArea: '缓冲区B1样区',
    reserveName: '石花洞风景名胜区',
    terrain: '山地',
    slopePosition: '脊',
    slopeAspect: '东',
    slopeDegree: '缓坡(0-5°)',
    waterType: '',
    waterDistance: '≥100m',
    vegetationType: '针叶林',
    habitatFeature: '人工油松林，视野开阔',
    treeHeight: 12,
    treeDbh: 18,
    forestOrigin: '人工',
    dominantTreeSpecies: '油松',
    shrubHeight: '3-5m',
    shrubType: '常绿',
    shrubCoverage: '75-100%',
    dominantShrubSpecies: '油松幼树',
    herbCoverage: '0-24%',
    herbType: '禾本为主',
    dominantHerbSpecies: '白羊草',
    assistant: '',
    remark: '鸟类活动较多，适合观鸟',
    photos: [],
    status: '监测中',
    totalPhotos: 856,
    validPhotos: 623,
    speciesCount: 42,
    dominantSpecies: '红嘴蓝鹊',
    mapTop: '45%',
    mapLeft: '38%',
    identifiedImages: [
      { id: 1, species: '红嘴蓝鹊', latinName: 'Urocissa erythroryncha', time: '2024-04-15 08:20:30', url: '' },
      { id: 2, species: '松鸦', latinName: 'Garrulus glandarius', time: '2024-04-16 09:45:12', url: '' }
    ]
  },
  {
    id: 'IR004',
    pointCode: 'STD-004',
    cameraId: 'CAM004',
    cameraModel: 'Browning Strike Force',
    storageCard: 'SD-004',
    iotCard: 'IoT-004',
    lng: 115.9512,
    lat: 39.7789,
    altitude: 487,
    projectId: 1,
    projectName: '红外相机野生动物监测调查',
    deployTime: '2024-02-20',
    deployer: '李华',
    surveyArea: '北京市房山区河北镇南车营村',
    smallPlace: '南侧山谷',
    sampleArea: '核心区A3样区',
    reserveName: '石花洞风景名胜区',
    terrain: '洼地',
    slopePosition: '谷地',
    slopeAspect: '无坡向',
    slopeDegree: '平地(0°)',
    waterType: '溪流',
    waterDistance: '＜100m',
    vegetationType: '灌丛',
    habitatFeature: '山谷溪流边，灌丛茂密',
    treeHeight: 0,
    treeDbh: 0,
    forestOrigin: '次生',
    dominantTreeSpecies: '',
    shrubHeight: '>5m',
    shrubType: '落叶',
    shrubCoverage: '75-100%',
    dominantShrubSpecies: '荆条、酸枣',
    herbCoverage: '75-100%',
    herbType: '非禾本为主',
    dominantHerbSpecies: '蒿草、野豆',
    assistant: '王强',
    remark: '水域附近，多种动物饮水路径',
    photos: [],
    status: '已完成',
    totalPhotos: 3456,
    validPhotos: 2890,
    speciesCount: 38,
    dominantSpecies: '野猪',
    mapTop: '52%',
    mapLeft: '60%',
    identifiedImages: [
      { id: 1, species: '野猪', latinName: 'Sus scrofa', time: '2024-03-01 20:15:22', url: '' },
      { id: 2, species: '狗獾', latinName: 'Meles meles', time: '2024-03-02 23:30:45', url: '' },
      { id: 3, species: '貉', latinName: 'Nyctereutes procyonoides', time: '2024-03-05 01:20:18', url: '' }
    ]
  }
]

// 红外相机监测界面组件
const infraredCameraTabs = [
  { id: 'achievement', name: '成果展示' },
  { id: 'deployment', name: '相机布设' },
  { id: 'identification', name: '物种鉴定' },
  { id: 'data', name: '监测数据' },
  { id: 'images', name: '物种图像' }
]

// 相机布设界面组件

function InfraredCameraInterface() {
  const [activeTab, setActiveTab] = useState('achievement')

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* 页签切换 */}
      <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-green-100 flex-shrink-0">
        {infraredCameraTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 成果展示页签 */}
      {activeTab === 'achievement' && (
        <div className="flex-1 overflow-hidden">
          <InfraredAchievementDisplay />
        </div>
      )}

      {/* 相机布设页签 */}
      {activeTab === 'deployment' && (
        <div className="flex-1 px-4 pt-4 pb-1 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 h-full overflow-hidden">
            <InfraredCameraDeployment />
          </div>
        </div>
      )}

      {/* 物种鉴定页签 */}
      {activeTab === 'identification' && (
        <div className="flex-1 px-4 pt-4 pb-1 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 h-full">
            <div className="text-center text-gray-500 py-20">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>物种鉴定页面内容</p>
            </div>
          </div>
        </div>
      )}

      {/* 监测数据页签 */}
      {activeTab === 'data' && (
        <div className="flex-1 px-4 pt-4 pb-1 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 h-full">
            <div className="text-center text-gray-500 py-20">
              <Database className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>监测数据页面内容</p>
            </div>
          </div>
        </div>
      )}

      {/* 物种图像页签 */}
      {activeTab === 'images' && (
        <div className="flex-1 px-4 pt-4 pb-1 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4 h-full">
            <div className="text-center text-gray-500 py-20">
              <Image className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>物种图像页面内容</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 地质资源展示界面组件

// ========== 地质监测数据管理界面 ==========
// 地质资源详细数据（用于数据管理）
const geologyResourceData = [
  {
    id: 1,
    code: 'GEO-001',
    name: '石花洞',
    level: '世界级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8923',
    latitude: '39.7234',
    altitude: '256',
    location: '北京市房山区河北镇',
    scenicArea: '石花洞景区',
    exposureRange: '洞内全长约2500米，分为上下七层',
    geoEra: '寒武纪-奥陶纪',
    lithology: '石灰岩、白云岩',
    structure: '单斜构造，岩层倾向东北',
    features: '石花洞是华北地区罕见的岩溶洞穴，洞内有大量石花、石钟乳、石笋等岩溶景观。洞穴空间变化丰富，有大厅、廊道、竖井等多种形态。',
    mainCause: '地下水溶蚀作用形成',
    protectionSystem: '已建立完善的保护体系，包括洞口防护、洞内监测等',
    scientificValue: '具有极高的科学研究价值，是研究华北地区岩溶发育的重要场所',
    rarity: '世界罕见的石花景观',
    integrity: '保存完好，原真性强',
    ornamentalValue: '景观奇特，观赏价值高',
    currentStatus: '保护状况良好',
    protectability: '可保护性强',
    evaluationLevel: '一级',
    suggestedProtectionLevel: '世界地质公园级别保护',
    coverImage: '/geology-detail.png',
    mediaFiles: [
      { id: 1, name: '石花洞全景.jpg', type: 'image', size: '2.5MB' },
      { id: 2, name: '石花特写.jpg', type: 'image', size: '1.8MB' },
      { id: 3, name: '洞内导览.mp4', type: 'video', size: '125MB' }
    ],
    documents: [
      { id: 1, name: '石花洞地质研究报告.pdf', size: '5.2MB', uploadTime: '2024-01-15' },
      { id: 2, name: '石花洞保护规划.pdf', size: '3.8MB', uploadTime: '2024-02-20' }
    ]
  },
  {
    id: 2,
    code: 'GEO-002',
    name: '银狐洞',
    level: '国家级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8756',
    latitude: '39.7156',
    altitude: '312',
    location: '北京市房山区佛子庄乡',
    scenicArea: '银狐洞景区',
    exposureRange: '洞内全长约1500米',
    geoEra: '寒武纪',
    lithology: '石灰岩',
    structure: '单斜构造',
    features: '银狐洞以其独特的"银狐"景观著称，洞顶有大量白色晶体，形似银狐皮毛，极为罕见。',
    mainCause: '地下水溶蚀作用及后期矿物沉积',
    protectionSystem: '已建立保护设施',
    scientificValue: '矿物沉积研究的重要场所',
    rarity: '国内独有的银狐景观',
    integrity: '保存良好',
    ornamentalValue: '景观独特',
    currentStatus: '保护状况良好',
    protectability: '可保护性强',
    evaluationLevel: '一级',
    suggestedProtectionLevel: '国家级保护',
    coverImage: '/geology-detail.png',
    mediaFiles: [
      { id: 1, name: '银狐洞入口.jpg', type: 'image', size: '1.5MB' }
    ],
    documents: [
      { id: 1, name: '银狐洞调查报告.pdf', size: '2.1MB', uploadTime: '2024-01-20' }
    ]
  },
  {
    id: 3,
    code: 'GEO-003',
    name: '孔水洞',
    level: '省级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8834',
    latitude: '39.7312',
    altitude: '198',
    location: '北京市房山区河北镇',
    scenicArea: '孔水洞景区',
    exposureRange: '洞内长约800米',
    geoEra: '奥陶纪',
    lithology: '石灰岩、白云岩',
    structure: '褶皱构造',
    features: '孔水洞是典型的岩溶洞穴，洞内有地下河，水系发达。',
    mainCause: '地下水溶蚀作用',
    protectionSystem: '已建立基础保护设施',
    scientificValue: '岩溶水文地质研究价值',
    rarity: '具有一定特色',
    integrity: '基本完好',
    ornamentalValue: '有一定观赏价值',
    currentStatus: '保护状况一般',
    protectability: '可保护性中等',
    evaluationLevel: '二级',
    suggestedProtectionLevel: '省级保护',
    coverImage: '/geology-detail.png',
    mediaFiles: [],
    documents: []
  },
  {
    id: 4,
    code: 'GEO-004',
    name: '鸡毛洞',
    level: '市级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8901',
    latitude: '39.7189',
    altitude: '245',
    location: '北京市房山区河北镇',
    scenicArea: '石花洞景区',
    exposureRange: '洞内长约500米',
    geoEra: '寒武纪',
    lithology: '石灰岩',
    structure: '单斜构造',
    features: '鸡毛洞规模较小，但洞内石笋形态独特，具有较高的科研价值。',
    mainCause: '地下水溶蚀作用',
    protectionSystem: '基础保护',
    scientificValue: '岩溶形态研究价值',
    rarity: '一般',
    integrity: '基本完好',
    ornamentalValue: '有一定观赏价值',
    currentStatus: '保护状况一般',
    protectability: '可保护性中等',
    evaluationLevel: '三级',
    suggestedProtectionLevel: '市级保护',
    coverImage: '/geology-detail.png',
    mediaFiles: [],
    documents: []
  },
  {
    id: 5,
    code: 'GEO-005',
    name: '清风洞',
    level: '省级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8978',
    latitude: '39.7267',
    altitude: '278',
    location: '北京市房山区河北镇',
    scenicArea: '清风洞景区',
    exposureRange: '洞内长约1200米',
    geoEra: '奥陶纪',
    lithology: '石灰岩',
    structure: '断裂构造',
    features: '清风洞因洞内常年有清风流动而得名，洞内温度适宜，是避暑胜地。',
    mainCause: '地下水溶蚀及构造作用',
    protectionSystem: '已建立保护设施',
    scientificValue: '洞穴气候研究价值',
    rarity: '具有特色',
    integrity: '保存良好',
    ornamentalValue: '观赏价值较高',
    currentStatus: '保护状况良好',
    protectability: '可保护性强',
    evaluationLevel: '二级',
    suggestedProtectionLevel: '省级保护',
    coverImage: '/geology-detail.png',
    mediaFiles: [],
    documents: []
  }
]

// 地质数据管理界面子页面配置
const geologyDataTabs = [
  { id: 'resource-list', name: '地质资源列表' },
  { id: 'survey-data', name: '地质调查数据' },
  { id: 'cave-data', name: '溶洞环境监测数据' }
]

// 地质数据管理主界面组件
function GeologyDataManagement() {
  const [activeTab, setActiveTab] = useState('resource-list')
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      {/* 页签切换 */}
      <div className="flex items-center gap-1 px-4 py-2 bg-white border-b border-gray-200 flex-shrink-0">
        {geologyDataTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      
      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'resource-list' && <GeologyResourceList />}
        {activeTab === 'survey-data' && <GeologySurveyData />}
        {activeTab === 'cave-data' && <GeologyCaveData />}
      </div>
    </div>
  )
}

// 地质资源列表组件
function GeologyResourceList() {
  // 筛选和搜索状态
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [filterMainCategory, setFilterMainCategory] = useState('')
  
  // 选中状态
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  
  // 弹窗状态
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailPage, setShowDetailPage] = useState(false)
  const [selectedResource, setSelectedResource] = useState<typeof geologyResourceData[0] | null>(null)
  const [editingResource, setEditingResource] = useState<typeof geologyResourceData[0] | null>(null)
  
  // 本地数据状态（用于增删改）
  const [resourceList, setResourceList] = useState(geologyResourceData)
  
  // 筛选后的列表
  const filteredList = resourceList.filter(item => {
    if (searchTerm && !item.name.includes(searchTerm)) return false
    if (filterLevel && item.level !== filterLevel) return false
    if (filterMainCategory && item.mainCategory !== filterMainCategory) return false
    return true
  })
  
  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredList.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredList.map(item => item.id))
    }
  }
  
  // 切换单个选中
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }
  
  // 批量删除
  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return
    if (confirm(`确定要删除选中的 ${selectedIds.length} 个地质资源吗？`)) {
      setResourceList(prev => prev.filter(item => !selectedIds.includes(item.id)))
      setSelectedIds([])
    }
  }
  
  // 删除单个
  const handleDelete = (id: number, name: string) => {
    if (confirm(`确定要删除"${name}"吗？`)) {
      setResourceList(prev => prev.filter(item => item.id !== id))
    }
  }
  
  // 查看详情
  const handleViewDetail = (resource: typeof geologyResourceData[0]) => {
    setSelectedResource(resource)
    setShowDetailPage(true)
  }
  
  // 编辑
  const handleEdit = (resource: typeof geologyResourceData[0]) => {
    setEditingResource(resource)
    setShowAddModal(true)
  }
  
  // 导出
  const handleExport = () => {
    alert('导出功能开发中...')
  }
  
  // 如果显示详情页
  if (showDetailPage && selectedResource) {
    return (
      <GeologyResourceDetail 
        resource={selectedResource}
        onBack={() => {
          setShowDetailPage(false)
          setSelectedResource(null)
        }}
      />
    )
  }
  
  return (
    <div className="h-full flex flex-col p-4 overflow-hidden">
      {/* 操作栏 */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => { setEditingResource(null); setShowAddModal(true); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            导出
          </button>
          <button 
            onClick={handleBatchDelete}
            disabled={selectedIds.length === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedIds.length > 0 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            删除 {selectedIds.length > 0 && `(${selectedIds.length})`}
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 级别筛选 */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option value="">全部级别</option>
            <option value="世界级">世界级</option>
            <option value="国家级">国家级</option>
            <option value="省级">省级</option>
            <option value="市级">市级</option>
          </select>
          
          {/* 大类筛选 */}
          <select
            value={filterMainCategory}
            onChange={(e) => setFilterMainCategory(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option value="">全部大类</option>
            <option value="地貌景观">地貌景观</option>
            <option value="地质构造">地质构造</option>
            <option value="古生物">古生物</option>
          </select>
          
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索资源名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm w-48"
            />
          </div>
        </div>
      </div>
      
      {/* 卡片列表 */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredList.map((resource) => (
            <div 
              key={resource.id}
              className={`bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${
                selectedIds.includes(resource.id) ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
              }`}
            >
              {/* 封面图 */}
              <div className="relative h-36 bg-gray-100">
                <img 
                  src={resource.coverImage} 
                  alt={resource.name}
                  className="w-full h-full object-cover"
                />
                {/* 选择框 */}
                <div 
                  onClick={() => toggleSelect(resource.id)}
                  className="absolute top-2 left-2 w-5 h-5 rounded border-2 border-white bg-white/80 flex items-center justify-center cursor-pointer hover:bg-green-50"
                >
                  {selectedIds.includes(resource.id) && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                {/* 级别标签 */}
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-xs text-white ${
                  resource.level === '世界级' ? 'bg-yellow-500' :
                  resource.level === '国家级' ? 'bg-red-500' :
                  resource.level === '省级' ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {resource.level}
                </div>
              </div>
              
              {/* 信息区域 */}
              <div className="p-3">
                <h4 className="font-medium text-gray-800 truncate mb-1">{resource.name}</h4>
                <div className="text-xs text-gray-500 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">编号:</span>
                    <span>{resource.code}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">大类:</span>
                    <span>{resource.mainCategory}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">类:</span>
                    <span>{resource.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">亚类:</span>
                    <span>{resource.subCategory}</span>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex items-center justify-end gap-1 mt-3 pt-2 border-t border-gray-100">
                  <button 
                    onClick={() => handleEdit(resource)}
                    className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                    title="编辑"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleViewDetail(resource)}
                    className="p-1.5 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded transition-colors"
                    title="查看详情"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(resource.id, resource.name)}
                    className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="删除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Database className="w-12 h-12 mb-2" />
            <span>暂无地质资源数据</span>
          </div>
        )}
      </div>
      
      {/* 新建/编辑弹窗 */}
      {showAddModal && (
        <GeologyResourceFormModal 
          editingResource={editingResource}
          existingCodes={resourceList.map(r => r.code)}
          existingNames={resourceList.map(r => r.name)}
          onSave={(data) => {
            if (editingResource) {
              // 编辑模式
              setResourceList(prev => prev.map(item => 
                item.id === editingResource.id ? { ...item, ...data } : item
              ))
            } else {
              // 新建模式
              const newResource = {
                ...data,
                id: Math.max(...resourceList.map(r => r.id)) + 1,
                mediaFiles: [],
                documents: []
              }
              setResourceList(prev => [...prev, newResource])
            }
            setShowAddModal(false)
            setEditingResource(null)
          }}
          onClose={() => { setShowAddModal(false); setEditingResource(null); }}
        />
      )}
    </div>
  )
}

// 野外调查数据
const fieldSurveyData = [
  {
    id: 1,
    fieldNo: 'YW-2024-001',
    resourceName: '石花洞',
    siteNo: 'GEO-001',
    indoorNo: 'SN-001',
    level: '世界级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8923',
    latitude: '39.7234',
    altitude: '256',
    investigator: '张明',
    surveyArea: '石花洞景区',
    mapSheet: '良乡幅 J50E016017',
    traffic: '距北京市区50公里，有公交直达',
    exposureRange: '洞内全长约2500米，分为上下七层，主要出露于河北镇南侧山坡',
    landformDesc: '洞口位于山腰处，洞内发育有多层水平洞穴系统，钟乳石、石笋、石花等次生化学沉积物丰富',
    geoFeatures: '洞穴空间形态复杂，有大厅、廊道、竖井等多种形态。洞内温度常年保持在13-15℃，相对湿度85%以上',
    significance: '华北地区罕见的岩溶洞穴，具有极高的科研价值和旅游开发价值',
    evaluationLevel: '一级',
    protectionStatus: '已建立完善的保护体系，开放旅游参观',
    images: '/geology-detail.png',
    remarks: '需持续监测洞内CO₂浓度'
  },
  {
    id: 2,
    fieldNo: 'YW-2024-002',
    resourceName: '银狐洞',
    siteNo: 'GEO-002',
    indoorNo: 'SN-002',
    level: '国家级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8756',
    latitude: '39.7156',
    altitude: '312',
    investigator: '李华',
    surveyArea: '银狐洞景区',
    mapSheet: '良乡幅 J50E016016',
    traffic: '距北京市区55公里，有县道通行',
    exposureRange: '洞内全长约1500米',
    landformDesc: '洞顶有大量白色晶体，形似银狐皮毛，极为罕见',
    geoFeatures: '矿物沉积类型独特，洞内温度稳定',
    significance: '国内独有的银狐景观，矿物沉积研究的重要场所',
    evaluationLevel: '一级',
    protectionStatus: '已建立保护设施，开放旅游',
    images: '/geology-detail.png',
    remarks: '需加强矿物保护'
  },
  {
    id: 3,
    fieldNo: 'YW-2024-003',
    resourceName: '孔水洞',
    siteNo: 'GEO-003',
    indoorNo: 'SN-003',
    level: '省级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8834',
    latitude: '39.7312',
    altitude: '198',
    investigator: '王强',
    surveyArea: '孔水洞景区',
    mapSheet: '良乡幅 J50E016017',
    traffic: '距石花洞5公里，乡村道路可达',
    exposureRange: '洞内长约800米',
    landformDesc: '典型的岩溶洞穴，洞内有地下河',
    geoFeatures: '水系发达，地下水流量较大',
    significance: '岩溶水文地质研究价值较高',
    evaluationLevel: '二级',
    protectionStatus: '基础保护设施已建立',
    images: '',
    remarks: ''
  },
  {
    id: 4,
    fieldNo: 'YW-2024-004',
    resourceName: '鸡毛洞',
    siteNo: 'GEO-004',
    indoorNo: 'SN-004',
    level: '市级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8901',
    latitude: '39.7189',
    altitude: '245',
    investigator: '赵林',
    surveyArea: '石花洞景区',
    mapSheet: '良乡幅 J50E016017',
    traffic: '距石花洞2公里，步行可达',
    exposureRange: '洞内长约500米',
    landformDesc: '规模较小，石笋形态独特',
    geoFeatures: '洞内温度稳定，石笋发育良好',
    significance: '具有较高的科研价值',
    evaluationLevel: '三级',
    protectionStatus: '基础保护',
    images: '',
    remarks: ''
  },
  {
    id: 5,
    fieldNo: 'YW-2024-005',
    resourceName: '清风洞',
    siteNo: 'GEO-005',
    indoorNo: 'SN-005',
    level: '省级',
    mainCategory: '地貌景观',
    category: '岩溶地貌',
    subCategory: '溶洞',
    longitude: '115.8978',
    latitude: '39.7267',
    altitude: '278',
    investigator: '张明',
    surveyArea: '清风洞景区',
    mapSheet: '良乡幅 J50E016017',
    traffic: '距石花洞3公里，有乡村道路',
    exposureRange: '洞内长约1200米',
    landformDesc: '因洞内常年有清风流动而得名',
    geoFeatures: '洞内温度适宜，是避暑胜地',
    significance: '洞穴气候研究价值较高',
    evaluationLevel: '二级',
    protectionStatus: '已建立保护设施',
    images: '',
    remarks: '夏季游客较多'
  }
]

// 地质调查数据组件
function GeologySurveyData() {
  // 筛选和排序状态
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  
  // 选中的数据
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  
  // 数据列表
  const [dataList, setDataList] = useState(fieldSurveyData)
  
  // 抽屉弹窗状态
  const [showDrawer, setShowDrawer] = useState(false)
  const [editingItem, setEditingItem] = useState<typeof fieldSurveyData[0] | null>(null)
  
  // 地图弹窗状态
  const [showMapModal, setShowMapModal] = useState(false)
  
  // 筛选后的列表
  const filteredList = dataList.filter(item => {
    if (searchTerm && !item.resourceName.includes(searchTerm)) return false
    if (filterLevel && item.level !== filterLevel) return false
    return true
  })
  
  // 排序后的列表
  const sortedList = [...filteredList].sort((a, b) => {
    if (!sortField) return 0
    const aVal = a[sortField as keyof typeof a] || ''
    const bVal = b[sortField as keyof typeof b] || ''
    if (sortOrder === 'asc') {
      return aVal.localeCompare(String(bVal))
    } else {
      return String(bVal).localeCompare(aVal)
    }
  })
  
  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedIds.length === sortedList.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(sortedList.map(item => item.id))
    }
  }
  
  // 切换单个选中
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }
  
  // 批量删除
  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return
    if (confirm(`确定要删除选中的 ${selectedIds.length} 条数据吗？`)) {
      setDataList(prev => prev.filter(item => !selectedIds.includes(item.id)))
      setSelectedIds([])
    }
  }
  
  // 删除单个
  const handleDelete = (id: number, name: string) => {
    if (confirm(`确定要删除"${name}"吗？`)) {
      setDataList(prev => prev.filter(item => item.id !== id))
    }
  }
  
  // 打开新建抽屉
  const handleAdd = () => {
    setEditingItem(null)
    setShowDrawer(true)
  }
  
  // 打开编辑抽屉
  const handleEdit = (item: typeof fieldSurveyData[0]) => {
    setEditingItem(item)
    setShowDrawer(true)
  }
  
  // 导出数据
  const handleExport = () => {
    alert('导出功能开发中...')
  }
  
  // 切换排序
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      {/* 操作栏 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleAdd}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            导出
          </button>
          <button 
            onClick={handleBatchDelete}
            disabled={selectedIds.length === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedIds.length > 0 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            删除 {selectedIds.length > 0 && `(${selectedIds.length})`}
          </button>
          <button 
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              showFilterPanel ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            筛选
          </button>
          <button 
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            排序
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 地图查看按钮 */}
          <button 
            onClick={() => setShowMapModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600 transition-colors"
          >
            <Map className="w-4 h-4" />
            地图查看
          </button>
          
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索资源名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm w-48"
            />
          </div>
        </div>
      </div>
      
      {/* 筛选面板 */}
      {showFilterPanel && (
        <div className="flex items-center gap-4 px-4 py-2 bg-green-50 border-b border-green-200 flex-shrink-0">
          <span className="text-sm text-gray-600">筛选条件:</span>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option value="">全部级别</option>
            <option value="世界级">世界级</option>
            <option value="国家级">国家级</option>
            <option value="省级">省级</option>
            <option value="市级">市级</option>
          </select>
          <button 
            onClick={() => setFilterLevel('')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            清除筛选
          </button>
        </div>
      )}
      
      {/* 数据表格 */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left w-10 border-b border-gray-200">
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === sortedList.length && sortedList.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => toggleSort('fieldNo')}>
                野外调查编号 {sortField === 'fieldNo' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => toggleSort('resourceName')}>
                资源名称 {sortField === 'resourceName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">遗迹点编号</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">室内编号</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">级别</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">大类</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">类</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">亚类</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">经度</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">纬度</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">海拔</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">调查人</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">调查区域</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap min-w-[150px]">1/5万地形图幅名称及编号</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap min-w-[120px]">交通状况</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 min-w-[200px]">遗迹出露范围</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 min-w-[200px]">露头地貌形态描述和性质</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 min-w-[200px]">地质遗迹的地质特征与参数描述</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 min-w-[150px]">重要价值/意义</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">综合价值评价等级</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 min-w-[150px]">保护与利用状况</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">图像</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 min-w-[120px]">备注</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap w-20">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {sortedList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b border-gray-100">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.fieldNo}</td>
                <td className="px-3 py-2 text-xs text-gray-800 font-medium border-b border-gray-100 whitespace-nowrap">{item.resourceName}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.siteNo}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.indoorNo}</td>
                <td className="px-3 py-2 text-xs border-b border-gray-100 whitespace-nowrap">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    item.level === '世界级' ? 'bg-yellow-100 text-yellow-700' :
                    item.level === '国家级' ? 'bg-red-100 text-red-700' :
                    item.level === '省级' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.level}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.mainCategory}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.category}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.subCategory}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.longitude}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.latitude}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.altitude}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.investigator}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.surveyArea}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">{item.mapSheet}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">{item.traffic}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">
                  <div className="max-w-[200px] truncate" title={item.exposureRange}>{item.exposureRange}</div>
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">
                  <div className="max-w-[200px] truncate" title={item.landformDesc}>{item.landformDesc}</div>
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">
                  <div className="max-w-[200px] truncate" title={item.geoFeatures}>{item.geoFeatures}</div>
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">
                  <div className="max-w-[150px] truncate" title={item.significance}>{item.significance}</div>
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.evaluationLevel}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">
                  <div className="max-w-[150px] truncate" title={item.protectionStatus}>{item.protectionStatus}</div>
                </td>
                <td className="px-3 py-2 text-xs border-b border-gray-100">
                  {item.images && (
                    <img src={item.images} alt="" className="w-10 h-10 rounded object-cover" />
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">
                  <div className="max-w-[120px] truncate" title={item.remarks}>{item.remarks}</div>
                </td>
                <td className="px-3 py-2 text-xs border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-1 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                      title="编辑"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, item.resourceName)}
                      className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Database className="w-12 h-12 mb-2" />
            <span>暂无符合条件的数据</span>
          </div>
        )}
      </div>
      
      {/* 底部分页 */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-t border-gray-200 flex-shrink-0">
        <div className="text-sm text-gray-500">
          共 {sortedList.length} 条数据，已选 {selectedIds.length} 条
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            上一页
          </button>
          <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">1</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            下一页
          </button>
        </div>
      </div>
      
      {/* 右侧抽屉弹窗 */}
      {showDrawer && (
        <FieldSurveyDrawer
          editingItem={editingItem}
          existingFieldNos={dataList.map(d => d.fieldNo)}
          onSave={(data) => {
            if (editingItem) {
              setDataList(prev => prev.map(item => 
                item.id === editingItem.id ? { ...item, ...data } : item
              ))
            } else {
              const newItem = {
                ...data,
                id: Math.max(...dataList.map(d => d.id)) + 1,
                images: data.images || ''
              }
              setDataList(prev => [...prev, newItem])
            }
            setShowDrawer(false)
            setEditingItem(null)
          }}
          onClose={() => { setShowDrawer(false); setEditingItem(null); }}
        />
      )}
      
      {/* 地图弹窗 */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[80vw] h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">调查点位分布地图</h3>
              <button onClick={() => setShowMapModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 relative bg-gradient-to-br from-green-50 to-blue-50">
              <img 
                src="/geology-resource-bg.png" 
                alt="地图" 
                className="w-full h-full object-cover"
              />
              {/* 显示调查点位 */}
              {sortedList.map((item, index) => {
                const positions = [
                  { top: '35%', left: '40%' },
                  { top: '45%', left: '25%' },
                  { top: '50%', left: '55%' },
                  { top: '55%', left: '35%' },
                  { top: '60%', left: '60%' }
                ]
                const pos = positions[index % positions.length]
                return (
                  <div
                    key={item.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                      item.level === '世界级' ? 'bg-yellow-500' :
                      item.level === '国家级' ? 'bg-red-500' :
                      item.level === '省级' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      <MapPin className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-white px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {item.resourceName}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 野外调查数据抽屉弹窗
function FieldSurveyDrawer({
  editingItem,
  existingFieldNos,
  onSave,
  onClose
}: {
  editingItem: typeof fieldSurveyData[0] | null
  existingFieldNos: string[]
  onSave: (data: Partial<typeof fieldSurveyData[0]>) => void
  onClose: () => void
}) {
  // 表单状态
  const [formData, setFormData] = useState({
    fieldNo: editingItem?.fieldNo || '',
    resourceName: editingItem?.resourceName || '',
    siteNo: editingItem?.siteNo || '',
    indoorNo: editingItem?.indoorNo || '',
    level: editingItem?.level || '',
    mainCategory: editingItem?.mainCategory || '',
    category: editingItem?.category || '',
    subCategory: editingItem?.subCategory || '',
    longitude: editingItem?.longitude || '',
    latitude: editingItem?.latitude || '',
    altitude: editingItem?.altitude || '',
    investigator: editingItem?.investigator || '',
    surveyArea: editingItem?.surveyArea || '',
    mapSheet: editingItem?.mapSheet || '',
    traffic: editingItem?.traffic || '',
    exposureRange: editingItem?.exposureRange || '',
    landformDesc: editingItem?.landformDesc || '',
    geoFeatures: editingItem?.geoFeatures || '',
    significance: editingItem?.significance || '',
    evaluationLevel: editingItem?.evaluationLevel || '',
    protectionStatus: editingItem?.protectionStatus || '',
    images: editingItem?.images || '',
    remarks: editingItem?.remarks || ''
  })
  
  // 错误状态
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // 类选项
  const categoryOptions: Record<string, string[]> = {
    '地貌景观': ['岩溶地貌', '冰川地貌', '流水地貌', '风成地貌'],
    '地质构造': ['褶皱构造', '断裂构造', '节理构造'],
    '古生物': ['古动物', '古植物', '遗迹化石']
  }
  
  const subCategoryOptions: Record<string, string[]> = {
    '岩溶地貌': ['溶洞', '天坑', '峰林', '石林'],
    '冰川地貌': ['冰斗', '角峰', '冰碛'],
    '流水地貌': ['峡谷', '瀑布', '河曲'],
    '风成地貌': ['沙丘', '雅丹'],
    '褶皱构造': ['背斜', '向斜', '单斜'],
    '断裂构造': ['正断层', '逆断层', '走滑断层'],
    '节理构造': ['柱状节理', '板状节理'],
    '古动物': ['恐龙化石', '哺乳动物化石'],
    '古植物': ['硅化木', '叶片化石'],
    '遗迹化石': ['足迹', '潜穴']
  }
  
  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fieldNo) newErrors.fieldNo = '请输入野外调查编号'
    else if (!editingItem && existingFieldNos.includes(formData.fieldNo)) newErrors.fieldNo = '野外调查编号已存在'
    if (!formData.resourceName) newErrors.resourceName = '请输入资源名称'
    if (!formData.longitude) newErrors.longitude = '请输入经度'
    if (!formData.latitude) newErrors.latitude = '请输入纬度'
    if (!formData.investigator) newErrors.investigator = '请输入调查人'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // 提交表单
  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData)
    }
  }
  
  // 更新表单字段
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    if (field === 'mainCategory') {
      setFormData(prev => ({ ...prev, category: '', subCategory: '' }))
    }
    if (field === 'category') {
      setFormData(prev => ({ ...prev, subCategory: '' }))
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-white w-[500px] h-full overflow-hidden flex flex-col shadow-xl">
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-medium text-gray-800">
            {editingItem ? '编辑调查数据' : '新建调查数据'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* 表单内容 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* 野外调查编号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                野外调查编号 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fieldNo}
                onChange={(e) => updateField('fieldNo', e.target.value)}
                placeholder="如：YW-2024-001"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.fieldNo ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.fieldNo && <span className="text-xs text-red-500">{errors.fieldNo}</span>}
            </div>
            
            {/* 资源名称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                资源名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.resourceName}
                onChange={(e) => updateField('resourceName', e.target.value)}
                placeholder="请输入资源名称"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.resourceName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.resourceName && <span className="text-xs text-red-500">{errors.resourceName}</span>}
            </div>
            
            {/* 遗迹点编号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">遗迹点编号</label>
              <input
                type="text"
                value={formData.siteNo}
                onChange={(e) => updateField('siteNo', e.target.value)}
                placeholder="如：GEO-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 室内编号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">室内编号</label>
              <input
                type="text"
                value={formData.indoorNo}
                onChange={(e) => updateField('indoorNo', e.target.value)}
                placeholder="如：SN-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 级别 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">级别</label>
              <select
                value={formData.level}
                onChange={(e) => updateField('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">请选择级别</option>
                <option value="世界级">世界级</option>
                <option value="国家级">国家级</option>
                <option value="省级">省级</option>
                <option value="市级">市级</option>
              </select>
            </div>
            
            {/* 大类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">大类</label>
              <select
                value={formData.mainCategory}
                onChange={(e) => updateField('mainCategory', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">请选择大类</option>
                <option value="地貌景观">地貌景观</option>
                <option value="地质构造">地质构造</option>
                <option value="古生物">古生物</option>
              </select>
            </div>
            
            {/* 类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">类</label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                disabled={!formData.mainCategory}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-100"
              >
                <option value="">请选择类</option>
                {formData.mainCategory && categoryOptions[formData.mainCategory]?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            {/* 亚类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">亚类</label>
              <select
                value={formData.subCategory}
                onChange={(e) => updateField('subCategory', e.target.value)}
                disabled={!formData.category}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm disabled:bg-gray-100"
              >
                <option value="">请选择亚类</option>
                {formData.category && subCategoryOptions[formData.category]?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            {/* 经度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                经度 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.longitude}
                onChange={(e) => updateField('longitude', e.target.value)}
                placeholder="如：115.8923"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.longitude ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.longitude && <span className="text-xs text-red-500">{errors.longitude}</span>}
            </div>
            
            {/* 纬度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                纬度 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.latitude}
                onChange={(e) => updateField('latitude', e.target.value)}
                placeholder="如：39.7234"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.latitude ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.latitude && <span className="text-xs text-red-500">{errors.latitude}</span>}
            </div>
            
            {/* 海拔 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">海拔</label>
              <input
                type="text"
                value={formData.altitude}
                onChange={(e) => updateField('altitude', e.target.value)}
                placeholder="请输入海拔（米）"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 调查人 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                调查人 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.investigator}
                onChange={(e) => updateField('investigator', e.target.value)}
                placeholder="请输入调查人姓名"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.investigator ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.investigator && <span className="text-xs text-red-500">{errors.investigator}</span>}
            </div>
            
            {/* 调查区域 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">调查区域</label>
              <input
                type="text"
                value={formData.surveyArea}
                onChange={(e) => updateField('surveyArea', e.target.value)}
                placeholder="请输入调查区域"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 1/5万地形图幅名称及编号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">1/5万地形图幅名称及编号</label>
              <input
                type="text"
                value={formData.mapSheet}
                onChange={(e) => updateField('mapSheet', e.target.value)}
                placeholder="如：良乡幅 J50E016017"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 交通状况 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">交通状况</label>
              <input
                type="text"
                value={formData.traffic}
                onChange={(e) => updateField('traffic', e.target.value)}
                placeholder="请输入交通状况"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 遗迹出露范围 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">遗迹出露范围</label>
              <textarea
                value={formData.exposureRange}
                onChange={(e) => updateField('exposureRange', e.target.value)}
                placeholder="请输入遗迹出露范围描述"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 露头地貌形态描述和性质 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">露头地貌形态描述和性质</label>
              <textarea
                value={formData.landformDesc}
                onChange={(e) => updateField('landformDesc', e.target.value)}
                placeholder="请输入露头地貌形态描述和性质"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 地质遗迹的地质特征与参数描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">地质遗迹的地质特征与参数描述</label>
              <textarea
                value={formData.geoFeatures}
                onChange={(e) => updateField('geoFeatures', e.target.value)}
                placeholder="请输入地质遗迹的地质特征与参数描述"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 重要价值/意义 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">重要价值/意义</label>
              <textarea
                value={formData.significance}
                onChange={(e) => updateField('significance', e.target.value)}
                placeholder="请输入重要价值/意义"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 综合价值评价等级 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">综合价值评价等级</label>
              <select
                value={formData.evaluationLevel}
                onChange={(e) => updateField('evaluationLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">请选择评价等级</option>
                <option value="一级">一级</option>
                <option value="二级">二级</option>
                <option value="三级">三级</option>
              </select>
            </div>
            
            {/* 保护与利用状况 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">保护与利用状况</label>
              <textarea
                value={formData.protectionStatus}
                onChange={(e) => updateField('protectionStatus', e.target.value)}
                placeholder="请输入保护与利用状况"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 图像 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">图像</label>
              <div className="flex items-center gap-3">
                {formData.images && (
                  <img src={formData.images} alt="" className="w-20 h-20 rounded object-cover border border-gray-200" />
                )}
                <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Upload className="w-4 h-4 inline mr-1" />
                  上传图片
                </button>
              </div>
            </div>
            
            {/* 备注 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
              <textarea
                value={formData.remarks}
                onChange={(e) => updateField('remarks', e.target.value)}
                placeholder="请输入备注"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* 底部按钮 */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
          >
            {editingItem ? '保存修改' : '确认新建'}
          </button>
        </div>
      </div>
    </div>
  )
}

// 溶洞环境监测数据组件
function GeologyCaveData() {
  // 筛选和排序状态
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPoint, setFilterPoint] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  
  // 选中的数据
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  
  // 抽屉弹窗状态
  const [showDrawer, setShowDrawer] = useState(false)
  const [editingItem, setEditingItem] = useState<typeof caveMonitoringRecords[0] | null>(null)
  
  // 数据列表
  const [dataList, setDataList] = useState(caveMonitoringRecords)
  
  // 获取唯一的监测点
  const uniquePoints = [...new Set(caveMonitoringRecords.map(d => d.point))]
  
  // 筛选后的列表
  const filteredList = dataList.filter(item => {
    if (searchTerm && !item.point.includes(searchTerm)) return false
    if (filterPoint && item.point !== filterPoint) return false
    return true
  })
  
  // 排序后的列表
  const sortedList = [...filteredList].sort((a, b) => {
    if (!sortField) return 0
    const aVal = a[sortField as keyof typeof a] || ''
    const bVal = b[sortField as keyof typeof b] || ''
    if (sortOrder === 'asc') {
      return String(aVal).localeCompare(String(bVal))
    } else {
      return String(bVal).localeCompare(String(aVal))
    }
  })
  
  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedIds.length === sortedList.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(sortedList.map(item => item.id))
    }
  }
  
  // 切换单个选中
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }
  
  // 批量删除
  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return
    if (confirm(`确定要删除选中的 ${selectedIds.length} 条数据吗？`)) {
      setDataList(prev => prev.filter(item => !selectedIds.includes(item.id)))
      setSelectedIds([])
    }
  }
  
  // 删除单个
  const handleDelete = (id: number, name: string) => {
    if (confirm(`确定要删除"${name}"的监测数据吗？`)) {
      setDataList(prev => prev.filter(item => item.id !== id))
    }
  }
  
  // 打开新建抽屉
  const handleAdd = () => {
    setEditingItem(null)
    setShowDrawer(true)
  }
  
  // 打开编辑抽屉
  const handleEdit = (item: typeof caveMonitoringRecords[0]) => {
    setEditingItem(item)
    setShowDrawer(true)
  }
  
  // 导出数据
  const handleExport = () => {
    alert('导出功能开发中...')
  }
  
  // 切换排序
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      {/* 操作栏 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleAdd}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新建
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            导出
          </button>
          <button 
            onClick={handleBatchDelete}
            disabled={selectedIds.length === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedIds.length > 0 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            删除 {selectedIds.length > 0 && `(${selectedIds.length})`}
          </button>
          <button 
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              showFilterPanel ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            筛选
          </button>
          <button 
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            排序
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索监测点..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm w-48"
            />
          </div>
        </div>
      </div>
      
      {/* 筛选面板 */}
      {showFilterPanel && (
        <div className="flex items-center gap-4 px-4 py-2 bg-green-50 border-b border-green-200 flex-shrink-0">
          <span className="text-sm text-gray-600">筛选条件:</span>
          <select
            value={filterPoint}
            onChange={(e) => setFilterPoint(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option value="">全部监测点</option>
            {uniquePoints.map(point => (
              <option key={point} value={point}>{point}</option>
            ))}
          </select>
          <button 
            onClick={() => setFilterPoint('')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            清除筛选
          </button>
        </div>
      )}
      
      {/* 数据表格 */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-3 py-2 text-left w-10 border-b border-gray-200">
                <input 
                  type="checkbox" 
                  checked={selectedIds.length === sortedList.length && sortedList.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300"
                />
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => toggleSort('recordNo')}>
                记录编号 {sortField === 'recordNo' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => toggleSort('point')}>
                监测点 {sortField === 'point' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap cursor-pointer hover:bg-gray-200" onClick={() => toggleSort('recordTime')}>
                记录时间 {sortField === 'recordTime' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">温度(℃)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">湿度(%)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">CO₂(ppm)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">风速(m/s)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">岩壁温度(℃)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">负氧离子(个/cm³)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">监测人员</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">设备编号</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap">数据状态</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 min-w-[120px]">备注</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 border-b border-gray-200 whitespace-nowrap w-20">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {sortedList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b border-gray-100">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.recordNo}</td>
                <td className="px-3 py-2 text-xs text-gray-800 font-medium border-b border-gray-100 whitespace-nowrap">{item.point}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.recordTime}</td>
                <td className="px-3 py-2 text-xs text-gray-800 border-b border-gray-100 whitespace-nowrap">{item.temperature}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.humidity}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.co2}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.windSpeed}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.rockTemp}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.negativeIon}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.operator}</td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100 whitespace-nowrap">{item.deviceNo}</td>
                <td className="px-3 py-2 text-xs border-b border-gray-100 whitespace-nowrap">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    item.status === '正常' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs text-gray-600 border-b border-gray-100">
                  <div className="max-w-[120px] truncate" title={item.remarks}>{item.remarks}</div>
                </td>
                <td className="px-3 py-2 text-xs border-b border-gray-100">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-1 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                      title="编辑"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id, item.point)}
                      className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {sortedList.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Database className="w-12 h-12 mb-2" />
            <span>暂无符合条件的数据</span>
          </div>
        )}
      </div>
      
      {/* 底部分页 */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-t border-gray-200 flex-shrink-0">
        <div className="text-sm text-gray-500">
          共 {sortedList.length} 条数据，已选 {selectedIds.length} 条
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            上一页
          </button>
          <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">1</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            下一页
          </button>
        </div>
      </div>
      
      {/* 右侧抽屉弹窗 */}
      {showDrawer && (
        <CaveDataDrawer
          editingItem={editingItem}
          existingRecordNos={dataList.map(d => d.recordNo)}
          onSave={(data) => {
            if (editingItem) {
              setDataList(prev => prev.map(item => 
                item.id === editingItem.id ? { ...item, ...data } : item
              ))
            } else {
              const newItem = {
                ...data,
                id: Math.max(...dataList.map(d => d.id)) + 1
              }
              setDataList(prev => [...prev, newItem])
            }
            setShowDrawer(false)
            setEditingItem(null)
          }}
          onClose={() => { setShowDrawer(false); setEditingItem(null); }}
        />
      )}
    </div>
  )
}

// 溶洞监测数据
const caveMonitoringRecords = [
  {
    id: 1,
    recordNo: 'CD-2024-001',
    point: '石花洞入口',
    recordTime: '2024-03-15 10:30',
    temperature: 14.2,
    humidity: 85.5,
    co2: 520,
    windSpeed: 0.12,
    rockTemp: 13.8,
    negativeIon: 4500,
    operator: '张明',
    deviceNo: 'D-001',
    status: '正常',
    remarks: '洞口风速较大'
  },
  {
    id: 2,
    recordNo: 'CD-2024-002',
    point: '石花洞大厅',
    recordTime: '2024-03-15 10:45',
    temperature: 13.8,
    humidity: 92.3,
    co2: 680,
    windSpeed: 0.05,
    rockTemp: 13.2,
    negativeIon: 5800,
    operator: '张明',
    deviceNo: 'D-002',
    status: '正常',
    remarks: ''
  },
  {
    id: 3,
    recordNo: 'CD-2024-003',
    point: '银狐洞入口',
    recordTime: '2024-03-15 11:30',
    temperature: 13.5,
    humidity: 90.5,
    co2: 620,
    windSpeed: 0.08,
    rockTemp: 13.5,
    negativeIon: 5200,
    operator: '李华',
    deviceNo: 'D-003',
    status: '正常',
    remarks: ''
  },
  {
    id: 4,
    recordNo: 'CD-2024-004',
    point: '孔水洞',
    recordTime: '2024-03-15 14:00',
    temperature: 14.0,
    humidity: 88.0,
    co2: 480,
    windSpeed: 0.10,
    rockTemp: 14.0,
    negativeIon: 3800,
    operator: '王强',
    deviceNo: 'D-004',
    status: '正常',
    remarks: '有地下河'
  },
  {
    id: 5,
    recordNo: 'CD-2024-005',
    point: '清风洞',
    recordTime: '2024-03-15 15:30',
    temperature: 15.1,
    humidity: 82.0,
    co2: 550,
    windSpeed: 0.15,
    rockTemp: 14.5,
    negativeIon: 4200,
    operator: '赵林',
    deviceNo: 'D-005',
    status: '异常',
    remarks: '温度偏高，需关注'
  }
]

// 溶洞数据抽屉弹窗
function CaveDataDrawer({
  editingItem,
  existingRecordNos,
  onSave,
  onClose
}: {
  editingItem: typeof caveMonitoringRecords[0] | null
  existingRecordNos: string[]
  onSave: (data: Partial<typeof caveMonitoringRecords[0]>) => void
  onClose: () => void
}) {
  // 表单状态
  const [formData, setFormData] = useState({
    recordNo: editingItem?.recordNo || '',
    point: editingItem?.point || '',
    recordTime: editingItem?.recordTime || '',
    temperature: editingItem?.temperature?.toString() || '',
    humidity: editingItem?.humidity?.toString() || '',
    co2: editingItem?.co2?.toString() || '',
    windSpeed: editingItem?.windSpeed?.toString() || '',
    rockTemp: editingItem?.rockTemp?.toString() || '',
    negativeIon: editingItem?.negativeIon?.toString() || '',
    operator: editingItem?.operator || '',
    deviceNo: editingItem?.deviceNo || '',
    status: editingItem?.status || '正常',
    remarks: editingItem?.remarks || ''
  })
  
  // 错误状态
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.recordNo) newErrors.recordNo = '请输入记录编号'
    else if (!editingItem && existingRecordNos.includes(formData.recordNo)) newErrors.recordNo = '记录编号已存在'
    if (!formData.point) newErrors.point = '请选择监测点'
    if (!formData.recordTime) newErrors.recordTime = '请输入记录时间'
    if (!formData.operator) newErrors.operator = '请输入监测人员'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // 提交表单
  const handleSubmit = () => {
    if (validateForm()) {
      onSave({
        ...formData,
        temperature: parseFloat(formData.temperature) || 0,
        humidity: parseFloat(formData.humidity) || 0,
        co2: parseInt(formData.co2) || 0,
        windSpeed: parseFloat(formData.windSpeed) || 0,
        rockTemp: parseFloat(formData.rockTemp) || 0,
        negativeIon: parseInt(formData.negativeIon) || 0
      })
    }
  }
  
  // 更新表单字段
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-white w-[500px] h-full overflow-hidden flex flex-col shadow-xl">
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-medium text-gray-800">
            {editingItem ? '编辑监测数据' : '新建监测数据'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* 表单内容 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* 记录编号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                记录编号 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.recordNo}
                onChange={(e) => updateField('recordNo', e.target.value)}
                placeholder="如：CD-2024-001"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.recordNo ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.recordNo && <span className="text-xs text-red-500">{errors.recordNo}</span>}
            </div>
            
            {/* 监测点 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                监测点 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.point}
                onChange={(e) => updateField('point', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.point ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">请选择监测点</option>
                <option value="石花洞入口">石花洞入口</option>
                <option value="石花洞大厅">石花洞大厅</option>
                <option value="银狐洞入口">银狐洞入口</option>
                <option value="孔水洞">孔水洞</option>
                <option value="清风洞">清风洞</option>
              </select>
              {errors.point && <span className="text-xs text-red-500">{errors.point}</span>}
            </div>
            
            {/* 记录时间 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                记录时间 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.recordTime}
                onChange={(e) => updateField('recordTime', e.target.value)}
                placeholder="如：2024-03-15 10:30"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.recordTime ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.recordTime && <span className="text-xs text-red-500">{errors.recordTime}</span>}
            </div>
            
            {/* 温度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">温度(℃)</label>
              <input
                type="number"
                step="0.1"
                value={formData.temperature}
                onChange={(e) => updateField('temperature', e.target.value)}
                placeholder="请输入温度"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 湿度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">湿度(%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.humidity}
                onChange={(e) => updateField('humidity', e.target.value)}
                placeholder="请输入湿度"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* CO₂浓度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CO₂浓度(ppm)</label>
              <input
                type="number"
                value={formData.co2}
                onChange={(e) => updateField('co2', e.target.value)}
                placeholder="请输入CO₂浓度"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 风速 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">风速(m/s)</label>
              <input
                type="number"
                step="0.01"
                value={formData.windSpeed}
                onChange={(e) => updateField('windSpeed', e.target.value)}
                placeholder="请输入风速"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 岩壁温度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">岩壁温度(℃)</label>
              <input
                type="number"
                step="0.1"
                value={formData.rockTemp}
                onChange={(e) => updateField('rockTemp', e.target.value)}
                placeholder="请输入岩壁温度"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 负氧离子 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">负氧离子(个/cm³)</label>
              <input
                type="number"
                value={formData.negativeIon}
                onChange={(e) => updateField('negativeIon', e.target.value)}
                placeholder="请输入负氧离子浓度"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 监测人员 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                监测人员 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.operator}
                onChange={(e) => updateField('operator', e.target.value)}
                placeholder="请输入监测人员姓名"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.operator ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.operator && <span className="text-xs text-red-500">{errors.operator}</span>}
            </div>
            
            {/* 设备编号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">设备编号</label>
              <input
                type="text"
                value={formData.deviceNo}
                onChange={(e) => updateField('deviceNo', e.target.value)}
                placeholder="如：D-001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 数据状态 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">数据状态</label>
              <select
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="正常">正常</option>
                <option value="异常">异常</option>
              </select>
            </div>
            
            {/* 备注 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
              <textarea
                value={formData.remarks}
                onChange={(e) => updateField('remarks', e.target.value)}
                placeholder="请输入备注"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* 底部按钮 */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
          >
            {editingItem ? '保存修改' : '确认新建'}
          </button>
        </div>
      </div>
    </div>
  )
}

// 地质资源表单弹窗
function GeologyResourceFormModal({
  editingResource,
  existingCodes,
  existingNames,
  onSave,
  onClose
}: {
  editingResource: typeof geologyResourceData[0] | null
  existingCodes: string[]
  existingNames: string[]
  onSave: (data: Partial<typeof geologyResourceData[0]>) => void
  onClose: () => void
}) {
  // 表单状态
  const [formData, setFormData] = useState({
    coverImage: editingResource?.coverImage || '/geology-detail.png',
    code: editingResource?.code || '',
    name: editingResource?.name || '',
    level: editingResource?.level || '',
    mainCategory: editingResource?.mainCategory || '',
    category: editingResource?.category || '',
    subCategory: editingResource?.subCategory || '',
    longitude: editingResource?.longitude || '',
    latitude: editingResource?.latitude || '',
    altitude: editingResource?.altitude || '',
    location: editingResource?.location || '',
    scenicArea: editingResource?.scenicArea || '',
    exposureRange: editingResource?.exposureRange || '',
    geoEra: editingResource?.geoEra || '',
    lithology: editingResource?.lithology || '',
    structure: editingResource?.structure || '',
    features: editingResource?.features || '',
    mainCause: editingResource?.mainCause || '',
    protectionSystem: editingResource?.protectionSystem || '',
    scientificValue: editingResource?.scientificValue || '',
    rarity: editingResource?.rarity || '',
    integrity: editingResource?.integrity || '',
    ornamentalValue: editingResource?.ornamentalValue || '',
    currentStatus: editingResource?.currentStatus || '',
    protectability: editingResource?.protectability || '',
    evaluationLevel: editingResource?.evaluationLevel || '',
    suggestedProtectionLevel: editingResource?.suggestedProtectionLevel || ''
  })
  
  // 错误状态
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // 类选项
  const categoryOptions: Record<string, string[]> = {
    '地貌景观': ['岩溶地貌', '冰川地貌', '流水地貌', '风成地貌'],
    '地质构造': ['褶皱构造', '断裂构造', '节理构造'],
    '古生物': ['古动物', '古植物', '遗迹化石']
  }
  
  const subCategoryOptions: Record<string, string[]> = {
    '岩溶地貌': ['溶洞', '天坑', '峰林', '石林'],
    '冰川地貌': ['冰斗', '角峰', '冰碛'],
    '流水地貌': ['峡谷', '瀑布', '河曲'],
    '风成地貌': ['沙丘', '雅丹'],
    '褶皱构造': ['背斜', '向斜', '单斜'],
    '断裂构造': ['正断层', '逆断层', '走滑断层'],
    '节理构造': ['柱状节理', '板状节理'],
    '古动物': ['恐龙化石', '哺乳动物化石'],
    '古植物': ['硅化木', '叶片化石'],
    '遗迹化石': ['足迹', '潜穴']
  }
  
  // 验证表单
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.coverImage) newErrors.coverImage = '请上传封面图'
    if (!formData.code) newErrors.code = '请输入遗迹点编号'
    else if (!editingResource && existingCodes.includes(formData.code)) newErrors.code = '遗迹点编号已存在'
    if (!formData.name) newErrors.name = '请输入资源名称'
    else if (!editingResource && existingNames.includes(formData.name)) newErrors.name = '资源名称已存在'
    if (!formData.level) newErrors.level = '请选择级别'
    if (!formData.mainCategory) newErrors.mainCategory = '请选择大类'
    if (!formData.category) newErrors.category = '请选择类'
    if (!formData.subCategory) newErrors.subCategory = '请选择亚类'
    if (!formData.longitude) newErrors.longitude = '请输入经度'
    if (!formData.latitude) newErrors.latitude = '请输入纬度'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // 提交表单
  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData)
    }
  }
  
  // 更新表单字段
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    // 联动更新：大类改变时清空类和亚类
    if (field === 'mainCategory') {
      setFormData(prev => ({ ...prev, category: '', subCategory: '' }))
    }
    // 联动更新：类改变时清空亚类
    if (field === 'category') {
      setFormData(prev => ({ ...prev, subCategory: '' }))
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg font-medium text-gray-800">
            {editingResource ? '编辑地质资源' : '新建地质资源'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* 表单内容 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* 封面图 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                封面图 <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  <img src={formData.coverImage} alt="封面" className="w-full h-full object-cover" />
                </div>
                <button className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Upload className="w-4 h-4 inline mr-1" />
                  上传图片
                </button>
              </div>
              {errors.coverImage && <span className="text-xs text-red-500">{errors.coverImage}</span>}
            </div>
            
            {/* 遗迹点编号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                遗迹点编号 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => updateField('code', e.target.value)}
                placeholder="如：GEO-001"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.code && <span className="text-xs text-red-500">{errors.code}</span>}
            </div>
            
            {/* 资源名称 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                资源名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="请输入资源名称"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
            </div>
            
            {/* 级别 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                级别 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.level}
                onChange={(e) => updateField('level', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.level ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">请选择级别</option>
                <option value="世界级">世界级</option>
                <option value="国家级">国家级</option>
                <option value="省级">省级</option>
                <option value="市级">市级</option>
              </select>
              {errors.level && <span className="text-xs text-red-500">{errors.level}</span>}
            </div>
            
            {/* 大类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                大类 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.mainCategory}
                onChange={(e) => updateField('mainCategory', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.mainCategory ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">请选择大类</option>
                <option value="地貌景观">地貌景观</option>
                <option value="地质构造">地质构造</option>
                <option value="古生物">古生物</option>
              </select>
              {errors.mainCategory && <span className="text-xs text-red-500">{errors.mainCategory}</span>}
            </div>
            
            {/* 类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                类 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                disabled={!formData.mainCategory}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.category ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-100`}
              >
                <option value="">请选择类</option>
                {formData.mainCategory && categoryOptions[formData.mainCategory]?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.category && <span className="text-xs text-red-500">{errors.category}</span>}
            </div>
            
            {/* 亚类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                亚类 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.subCategory}
                onChange={(e) => updateField('subCategory', e.target.value)}
                disabled={!formData.category}
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.subCategory ? 'border-red-500' : 'border-gray-300'} disabled:bg-gray-100`}
              >
                <option value="">请选择亚类</option>
                {formData.category && subCategoryOptions[formData.category]?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.subCategory && <span className="text-xs text-red-500">{errors.subCategory}</span>}
            </div>
            
            {/* 经度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                经度 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.longitude}
                onChange={(e) => updateField('longitude', e.target.value)}
                placeholder="如：115.8923"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.longitude ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.longitude && <span className="text-xs text-red-500">{errors.longitude}</span>}
            </div>
            
            {/* 纬度 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                纬度 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.latitude}
                onChange={(e) => updateField('latitude', e.target.value)}
                placeholder="如：39.7234"
                className={`w-full px-3 py-2 border rounded-md text-sm ${errors.latitude ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.latitude && <span className="text-xs text-red-500">{errors.latitude}</span>}
            </div>
            
            {/* 海拔 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">海拔</label>
              <input
                type="text"
                value={formData.altitude}
                onChange={(e) => updateField('altitude', e.target.value)}
                placeholder="请输入海拔（米）"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 地理位置 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">地理位置</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="请输入详细地理位置"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 所处景区 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">所处景区</label>
              <input
                type="text"
                value={formData.scenicArea}
                onChange={(e) => updateField('scenicArea', e.target.value)}
                placeholder="请输入所处景区"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 评价等级 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">评价等级</label>
              <select
                value={formData.evaluationLevel}
                onChange={(e) => updateField('evaluationLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="">请选择评价等级</option>
                <option value="一级">一级</option>
                <option value="二级">二级</option>
                <option value="三级">三级</option>
              </select>
            </div>
            
            {/* 出露范围 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">出露范围</label>
              <textarea
                value={formData.exposureRange}
                onChange={(e) => updateField('exposureRange', e.target.value)}
                placeholder="请输入出露范围描述"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 地质时代 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">地质时代</label>
              <textarea
                value={formData.geoEra}
                onChange={(e) => updateField('geoEra', e.target.value)}
                placeholder="请输入地质时代"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 地质体岩性 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">地质体岩性</label>
              <textarea
                value={formData.lithology}
                onChange={(e) => updateField('lithology', e.target.value)}
                placeholder="请输入地质体岩性描述"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 地质构造 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">地质构造</label>
              <textarea
                value={formData.structure}
                onChange={(e) => updateField('structure', e.target.value)}
                placeholder="请输入地质构造描述"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 地质遗迹特征描述 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">地质遗迹特征描述</label>
              <textarea
                value={formData.features}
                onChange={(e) => updateField('features', e.target.value)}
                placeholder="请输入地质遗迹特征描述"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 主要成因 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">主要成因</label>
              <textarea
                value={formData.mainCause}
                onChange={(e) => updateField('mainCause', e.target.value)}
                placeholder="请输入主要成因"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 保护体系 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">保护体系</label>
              <textarea
                value={formData.protectionSystem}
                onChange={(e) => updateField('protectionSystem', e.target.value)}
                placeholder="请输入保护体系描述"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 科学性 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">科学性</label>
              <textarea
                value={formData.scientificValue}
                onChange={(e) => updateField('scientificValue', e.target.value)}
                placeholder="请输入科学性评价"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 稀有性 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">稀有性</label>
              <textarea
                value={formData.rarity}
                onChange={(e) => updateField('rarity', e.target.value)}
                placeholder="请输入稀有性评价"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 完整性 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">完整性</label>
              <textarea
                value={formData.integrity}
                onChange={(e) => updateField('integrity', e.target.value)}
                placeholder="请输入完整性评价"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 观赏性 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">观赏性</label>
              <textarea
                value={formData.ornamentalValue}
                onChange={(e) => updateField('ornamentalValue', e.target.value)}
                placeholder="请输入观赏性评价"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 保持现状 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">保持现状</label>
              <textarea
                value={formData.currentStatus}
                onChange={(e) => updateField('currentStatus', e.target.value)}
                placeholder="请输入保持现状描述"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 可保护性 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">可保护性</label>
              <textarea
                value={formData.protectability}
                onChange={(e) => updateField('protectability', e.target.value)}
                placeholder="请输入可保护性评价"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            
            {/* 建议保护等级 */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">建议保护等级</label>
              <textarea
                value={formData.suggestedProtectionLevel}
                onChange={(e) => updateField('suggestedProtectionLevel', e.target.value)}
                placeholder="请输入建议保护等级"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* 底部按钮 */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-200 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            取消
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
          >
            {editingResource ? '保存修改' : '确认新建'}
          </button>
        </div>
      </div>
    </div>
  )
}

// 地质资源详情界面
function GeologyResourceDetail({
  resource,
  onBack
}: {
  resource: typeof geologyResourceData[0]
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState<'basic' | 'media' | 'document'>('basic')
  
  // 多媒体资料状态
  const [mediaFiles, setMediaFiles] = useState(resource.mediaFiles)
  const [mediaSearchTerm, setMediaSearchTerm] = useState('')
  
  // 文档资料状态
  const [documents, setDocuments] = useState(resource.documents)
  const [docSearchTerm, setDocSearchTerm] = useState('')
  
  // 筛选后的多媒体
  const filteredMedia = mediaFiles.filter(f => 
    f.name.toLowerCase().includes(mediaSearchTerm.toLowerCase())
  )
  
  // 筛选后的文档
  const filteredDocs = documents.filter(d =>
    d.name.toLowerCase().includes(docSearchTerm.toLowerCase())
  )
  
  // 删除多媒体
  const handleDeleteMedia = (id: number) => {
    if (confirm('确定要删除该媒体文件吗？')) {
      setMediaFiles(prev => prev.filter(f => f.id !== id))
    }
  }
  
  // 删除文档
  const handleDeleteDoc = (id: number) => {
    if (confirm('确定要删除该文档吗？')) {
      setDocuments(prev => prev.filter(d => d.id !== id))
    }
  }
  
  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      {/* 顶部标题栏 */}
      <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="w-5 h-5" />
          返回列表
        </button>
        <h2 className="text-lg font-medium text-gray-800">{resource.name}</h2>
      </div>
      
      {/* 子页面切换 */}
      <div className="flex items-center gap-1 px-6 py-2 bg-white border-b border-gray-200 flex-shrink-0">
        {[
          { id: 'basic', name: '资源详情' },
          { id: 'media', name: '多媒体资料' },
          { id: 'document', name: '文档资料' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      
      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* 资源详情子页面 */}
        {activeTab === 'basic' && (
          <div className="max-w-4xl mx-auto">
            {/* 封面图 */}
            <div className="mb-6">
              <img 
                src={resource.coverImage} 
                alt={resource.name}
                className="w-full h-64 object-cover rounded-lg shadow-sm"
              />
            </div>
            
            {/* 基本信息卡片 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">基本信息</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">遗迹点编号</span>
                  <p className="text-gray-800">{resource.code}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">资源名称</span>
                  <p className="text-gray-800">{resource.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">级别</span>
                  <p className="text-gray-800">{resource.level}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">大类</span>
                  <p className="text-gray-800">{resource.mainCategory}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">类</span>
                  <p className="text-gray-800">{resource.category}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">亚类</span>
                  <p className="text-gray-800">{resource.subCategory}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">经度</span>
                  <p className="text-gray-800">{resource.longitude}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">纬度</span>
                  <p className="text-gray-800">{resource.latitude}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">海拔</span>
                  <p className="text-gray-800">{resource.altitude} 米</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">所处景区</span>
                  <p className="text-gray-800">{resource.scenicArea}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-gray-500">地理位置</span>
                  <p className="text-gray-800">{resource.location}</p>
                </div>
              </div>
            </div>
            
            {/* 地质特征卡片 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">地质特征</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">出露范围</span>
                  <p className="text-gray-800 mt-1">{resource.exposureRange}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">地质时代</span>
                  <p className="text-gray-800 mt-1">{resource.geoEra}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">地质体岩性</span>
                  <p className="text-gray-800 mt-1">{resource.lithology}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">地质构造</span>
                  <p className="text-gray-800 mt-1">{resource.structure}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">地质遗迹特征描述</span>
                  <p className="text-gray-800 mt-1 leading-relaxed">{resource.features}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">主要成因</span>
                  <p className="text-gray-800 mt-1">{resource.mainCause}</p>
                </div>
              </div>
            </div>
            
            {/* 评价信息卡片 */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-4 pb-2 border-b border-gray-100">保护与评价</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">保护体系</span>
                  <p className="text-gray-800 mt-1">{resource.protectionSystem}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">科学性</span>
                    <p className="text-gray-800 mt-1">{resource.scientificValue}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">稀有性</span>
                    <p className="text-gray-800 mt-1">{resource.rarity}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">完整性</span>
                    <p className="text-gray-800 mt-1">{resource.integrity}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">观赏性</span>
                    <p className="text-gray-800 mt-1">{resource.ornamentalValue}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">保持现状</span>
                    <p className="text-gray-800 mt-1">{resource.currentStatus}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">可保护性</span>
                    <p className="text-gray-800 mt-1">{resource.protectability}</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">评价等级</span>
                  <p className="text-gray-800 mt-1">{resource.evaluationLevel}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">建议保护等级</span>
                  <p className="text-gray-800 mt-1">{resource.suggestedProtectionLevel}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 多媒体资料子页面 */}
        {activeTab === 'media' && (
          <div className="max-w-5xl mx-auto">
            {/* 操作栏 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                  <Plus className="w-4 h-4" />
                  新增
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  下载
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索文件名..."
                  value={mediaSearchTerm}
                  onChange={(e) => setMediaSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm w-48"
                />
              </div>
            </div>
            
            {/* 文件列表 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">文件名</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-24">类型</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-24">大小</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 w-32">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredMedia.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <div className="flex items-center gap-2">
                          {file.type === 'image' ? (
                            <Image className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Video className="w-4 h-4 text-purple-500" />
                          )}
                          {file.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          file.type === 'image' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                          {file.type === 'image' ? '图片' : '视频'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{file.size}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1 text-gray-500 hover:text-blue-500" title="下载">
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteMedia(file.id)}
                            className="p-1 text-gray-500 hover:text-red-500" 
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredMedia.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  暂无多媒体资料
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* 文档资料子页面 */}
        {activeTab === 'document' && (
          <div className="max-w-5xl mx-auto">
            {/* 操作栏 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                  <Plus className="w-4 h-4" />
                  新增
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  下载
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索文件名..."
                  value={docSearchTerm}
                  onChange={(e) => setDocSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm w-48"
                />
              </div>
            </div>
            
            {/* 文件列表 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">文件名</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-24">大小</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-32">上传时间</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 w-32">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.open(`/doc-preview-${doc.id}.pdf`, '_blank')}>
                      <td className="px-4 py-3 text-sm text-gray-800">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-red-500" />
                          {doc.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{doc.size}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{doc.uploadTime}</td>
                      <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button 
                            className="p-1 text-gray-500 hover:text-blue-500" 
                            title="下载"
                            onClick={() => alert('下载功能开发中...')}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteDoc(doc.id)}
                            className="p-1 text-gray-500 hover:text-red-500" 
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredDocs.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  暂无文档资料
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ========== 森林防火综合展示界面 ==========

// 森林防火综合展示数据
const forestFireOverviewData = {
  // 防火队伍
  fireTeams: {
    professional: 3,      // 区级专业队
    semiProfessional: 30  // 半专业队（应急队伍）
  },

  // 防灭火资源
  fireResources: [
    { name: '防火检查站', value: 23, icon: 'Building', color: 'text-blue-400' },
    { name: '瞭望塔', value: 4, icon: 'Eye', color: 'text-cyan-400' },
    { name: '消防水源点', value: 540, icon: 'Droplets', color: 'text-blue-400' },
    { name: '阻隔系统', value: 15, icon: 'Shield', color: 'text-green-400' },
    { name: '防火物资库', value: 3, icon: 'Package', color: 'text-orange-400' },
    { name: '防火隔离带', value: 5, icon: 'Minus', color: 'text-yellow-400' },
    { name: '管网设施', value: 2, icon: 'Waves', color: 'text-blue-400' },
    { name: '电力线设施', value: 10, icon: 'Zap', color: 'text-yellow-400' },
    { name: '供水设施', value: 1, icon: 'Droplet', color: 'text-cyan-400' },
    { name: '消防栓', value: 55, icon: 'MapPin', color: 'text-red-400' },
    { name: '消防水源面', value: 235, icon: 'Water', color: 'text-blue-400' }
  ],

  // 防火工作成果（2025年）
  achievements: {
    firesExtinguished: 25,     // 扑灭火灾
    alarmsVerified: 589        // 核查警报
  },

  // 防火隐患
  fireHazards: [
    { name: '坟场', value: 568, icon: 'Cross', color: 'text-red-400' },
    { name: '避雷塔', value: 5, icon: 'CloudLightning', color: 'text-yellow-400' },
    { name: '充电桩', value: 3, icon: 'Plug', color: 'text-green-400' },
    { name: '高压铁塔', value: 22, icon: 'Tower', color: 'text-gray-400' },
    { name: '燃气桩', value: 66, icon: 'Flame', color: 'text-orange-400' },
    { name: '高压线', value: 21, icon: 'Zap', color: 'text-yellow-400' },
    { name: '居民点', value: 309, icon: 'Home', color: 'text-blue-400' }
  ],

  // 监控设备
  monitoringEquipment: [
    { name: '双光谱云台', total: 48, online: 48, icon: 'Camera', color: 'text-purple-400' },
    { name: '高清视频', total: 27, online: 22, icon: 'Video', color: 'text-blue-400' },
    { name: '智能卡口', total: 37, online: 36, icon: 'Scan', color: 'text-cyan-400' },
    { name: '三方视频', total: 254, online: 253, icon: 'Monitor', color: 'text-green-400' }
  ]
}

// 图标组件映射
const ResourceIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Building: Shield,
    Eye: Eye,
    Droplets: Droplet,
    Shield: Shield,
    Package: Package,
    Minus: Minus,
    Waves: Waves,
    Zap: Zap,
    Droplet: Droplet,
    MapPin: MapPin,
    Water: Droplet,
    Cross: X,
    CloudLightning: CloudLightning,
    Plug: Plug,
    Tower: Activity,
    Flame: Flame,
    Home: HomeIcon,
    Camera: Camera,
    Video: Video,
    Scan: Scan,
    Monitor: Video
  }

  const Icon = icons[iconName] || Shield
  return <Icon className={className} />
}

function ForestFireOverview() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [showYearDropdown, setShowYearDropdown] = useState(false)

  const yearOptions = ['2025', '2024', '2023']

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="flex-shrink-0 px-6 py-3 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">森林防火综合展示</h1>
              <div className="text-xs text-gray-400">Forest Fire Comprehensive Overview</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">系统运行正常</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex gap-3 p-3 overflow-hidden">
        {/* 左侧面板 */}
        <div className="w-[340px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto">
          {/* 防火队伍 */}
          <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-semibold text-gray-300">防火队伍</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">区级专业队</span>
                </div>
                <span className="text-2xl font-bold text-blue-400">{forestFireOverviewData.fireTeams.professional}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">半专业队</span>
                </div>
                <span className="text-2xl font-bold text-cyan-400">{forestFireOverviewData.fireTeams.semiProfessional}</span>
              </div>
            </div>
          </div>

          {/* 防灭火资源 */}
          <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-4 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-green-400" />
              <h3 className="text-sm font-semibold text-gray-300">防灭火资源</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {forestFireOverviewData.fireResources.map((resource, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <ResourceIcon iconName={resource.icon} className={`w-5 h-5 ${resource.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 truncate">{resource.name}</div>
                    <div className={`text-lg font-bold ${resource.color}`}>{resource.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 中央地图区域 */}
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {/* 地图容器 */}
          <div className="flex-1 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/30 overflow-hidden relative">
            {/* 地图背景 */}
            <img
              src="/地图背景-保护地基本概况用.png"
              alt="森林防火分布图"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-transparent to-orange-900/40" />

            {/* 模拟设施点位分布 */}
            <div className="absolute top-[20%] left-[30%]">
              <div className="flex flex-col gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            <div className="absolute top-[40%] left-[60%]">
              <div className="flex flex-col gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" style={{animationDelay: '0.3s'}}></div>
              </div>
            </div>

            <div className="absolute top-[60%] left-[40%]">
              <div className="flex flex-col gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" style={{animationDelay: '0.7s'}}></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" style={{animationDelay: '1.2s'}}></div>
              </div>
            </div>

            <div className="absolute top-[30%] left-[50%]">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>
            </div>

            {/* 地图标题 */}
            <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-700/50">
              <div className="text-sm font-semibold text-gray-200">石花洞风景名胜区森林防火分布图</div>
            </div>

            {/* 图例 */}
            <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50">
              <div className="text-xs font-semibold text-gray-300 mb-2">图例</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">防灭火资源</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">防火隐患</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">监控设备</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">防火队伍</span>
                </div>
              </div>
            </div>
          </div>

          {/* 监控设备 - 地图下方 */}
          <div className="h-auto bg-gray-800/60 rounded-xl border border-gray-700/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-semibold text-gray-300">监控设备</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {forestFireOverviewData.monitoringEquipment.map((equipment, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <ResourceIcon iconName={equipment.icon} className={`w-5 h-5 ${equipment.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 truncate">{equipment.name}</div>
                    <div className={`text-base font-bold ${equipment.color}`}>
                      {equipment.online}
                      <span className="text-xs text-gray-500">/{equipment.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="w-[340px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto">
          {/* 防火工作成果 */}
          <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <h3 className="text-sm font-semibold text-gray-300">防火工作成果</h3>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-700 rounded-lg border border-gray-600/50 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-300">{selectedYear}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showYearDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600/50 rounded-lg shadow-xl z-30 overflow-hidden">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year)
                          setShowYearDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-xs hover:bg-gray-700/50 transition-colors ${
                          selectedYear === year ? 'bg-gray-700/50 text-orange-400' : 'text-gray-300'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2.5 bg-red-500/10 rounded-lg border border-red-500/30">
                <Flame className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 mb-0.5">扑灭火灾</div>
                  <div className="text-xl font-bold text-red-400 flex items-baseline gap-0.5 leading-tight">
                    {forestFireOverviewData.achievements.firesExtinguished}
                    <span className="text-xs font-normal text-gray-500">起</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <AlertTriangle className="w-8 h-8 text-blue-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 mb-0.5">核查警报</div>
                  <div className="text-xl font-bold text-blue-400 flex items-baseline gap-0.5 leading-tight">
                    {forestFireOverviewData.achievements.alarmsVerified}
                    <span className="text-xs font-normal text-gray-500">次</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 防火隐患 */}
          <div className="bg-gray-800/60 rounded-xl border border-gray-700/50 p-4 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-sm font-semibold text-gray-300">防火隐患</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {forestFireOverviewData.fireHazards.map((hazard, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <ResourceIcon iconName={hazard.icon} className={`w-5 h-5 ${hazard.color} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 truncate">{hazard.name}</div>
                    <div className={`text-lg font-bold ${hazard.color}`}>{hazard.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== 森林防火综合展示界面（白天模式） ==========
function ForestFireOverviewLight() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [showYearDropdown, setShowYearDropdown] = useState(false)

  const yearOptions = ['2025', '2024', '2023']

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-100 overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">森林防火综合展示</h1>
              <div className="text-xs text-gray-500">Forest Fire Comprehensive Overview</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-600">系统运行正常</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 flex gap-3 p-3 overflow-hidden">
        {/* 左侧面板 */}
        <div className="w-[340px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto">
          {/* 防火队伍 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-700">防火队伍</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-700">区级专业队</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">{forestFireOverviewData.fireTeams.professional}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-cyan-600" />
                  <span className="text-sm text-gray-700">半专业队</span>
                </div>
                <span className="text-2xl font-bold text-cyan-600">{forestFireOverviewData.fireTeams.semiProfessional}</span>
              </div>
            </div>
          </div>

          {/* 防灭火资源 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="text-sm font-semibold text-gray-700">防灭火资源</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {forestFireOverviewData.fireResources.map((resource, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <ResourceIcon iconName={resource.icon} className={`w-5 h-5 ${resource.color.replace('400', '600')} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 truncate">{resource.name}</div>
                    <div className={`text-lg font-bold ${resource.color.replace('400', '600')}`}>{resource.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 中央地图区域 */}
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {/* 地图容器 */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative">
            {/* 地图背景 */}
            <img
              src="/地图背景-保护地基本概况用.png"
              alt="森林防火分布图"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-100/30 via-transparent to-orange-100/50" />

            {/* 模拟设施点位分布 */}
            <div className="absolute top-[20%] left-[30%]">
              <div className="flex flex-col gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            <div className="absolute top-[40%] left-[60%]">
              <div className="flex flex-col gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.3s'}}></div>
              </div>
            </div>

            <div className="absolute top-[60%] left-[40%]">
              <div className="flex flex-col gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.7s'}}></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1.2s'}}></div>
              </div>
            </div>

            <div className="absolute top-[30%] left-[50%]">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
            </div>

            {/* 地图标题 */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm border border-gray-200">
              <div className="text-sm font-semibold text-gray-700">石花洞风景名胜区森林防火分布图</div>
            </div>

            {/* 图例 */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-200">
              <div className="text-xs font-semibold text-gray-700 mb-2">图例</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">防灭火资源</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">防火隐患</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">监控设备</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">防火队伍</span>
                </div>
              </div>
            </div>
          </div>

          {/* 监控设备 - 地图下方 */}
          <div className="h-auto bg-white rounded-xl border border-gray-200 shadow-sm p-3">
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-semibold text-gray-700">监控设备</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {forestFireOverviewData.monitoringEquipment.map((equipment, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <ResourceIcon iconName={equipment.icon} className={`w-5 h-5 ${equipment.color.replace('400', '600')} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 truncate">{equipment.name}</div>
                    <div className={`text-base font-bold ${equipment.color.replace('400', '600')}`}>
                      {equipment.online}
                      <span className="text-xs text-gray-500">/{equipment.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧面板 */}
        <div className="w-[340px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto">
          {/* 防火工作成果 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <h3 className="text-sm font-semibold text-gray-700">防火工作成果</h3>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowYearDropdown(!showYearDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-700">{selectedYear}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showYearDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-30 overflow-hidden">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year)
                          setShowYearDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-xs hover:bg-gray-100 transition-colors ${
                          selectedYear === year ? 'bg-gray-100 text-orange-600' : 'text-gray-700'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2.5 bg-red-50 rounded-lg border border-red-200">
                <Flame className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 mb-0.5">扑灭火灾</div>
                  <div className="text-xl font-bold text-red-600 flex items-baseline gap-0.5 leading-tight">
                    {forestFireOverviewData.achievements.firesExtinguished}
                    <span className="text-xs font-normal text-gray-500">起</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                <AlertTriangle className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 mb-0.5">核查警报</div>
                  <div className="text-xl font-bold text-blue-600 flex items-baseline gap-0.5 leading-tight">
                    {forestFireOverviewData.achievements.alarmsVerified}
                    <span className="text-xs font-normal text-gray-500">次</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 防火隐患 */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex-1">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-sm font-semibold text-gray-700">防火隐患</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {forestFireOverviewData.fireHazards.map((hazard, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <ResourceIcon iconName={hazard.icon} className={`w-5 h-5 ${hazard.color.replace('400', '600')} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 truncate">{hazard.name}</div>
                    <div className={`text-lg font-bold ${hazard.color.replace('400', '600')}`}>{hazard.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ========== 森林防火监测预警界面 ==========

// 森林防火监测预警数据
const forestFireMonitoringData = {
  // 报警记录
  alarmRecords: [
    { id: 1, title: '石花洞景区北侧烟雾报警', time: '2025-03-26 09:23:15', type: '涉林火情', status: '未处理', isTimeout: false, isViewed: false, isVerified: false, device: '双光谱云台-05', latitude: '39.7245', longitude: '115.8923', grid: 'A区网格01', alarmImage: '/alarm-sample.jpg', alarmVideo: '/alarm-clip.mp4' },
    { id: 2, title: '停车场西侧热源报警', time: '2025-03-26 08:45:32', type: '非涉林火情', status: '已核实', isTimeout: false, isViewed: true, isVerified: true, device: '高清视频-12', latitude: '39.7201', longitude: '115.8901', grid: 'B区网格03', alarmImage: '/alarm-sample.jpg', alarmVideo: '/alarm-clip.mp4' },
    { id: 3, title: '核心区东侧温度异常', time: '2025-03-26 07:12:08', type: '误报', status: '已查看', isTimeout: false, isViewed: true, isVerified: false, device: '双光谱云台-03', latitude: '39.7256', longitude: '115.8856', grid: 'A区网格02', alarmImage: '/alarm-sample.jpg', alarmVideo: '/alarm-clip.mp4' },
    { id: 4, title: '步道北段烟雾检测', time: '2025-03-25 18:30:45', type: '涉林火情', status: '未处理', isTimeout: true, isViewed: false, isVerified: false, device: '智能卡口-08', latitude: '39.7212', longitude: '115.8812', grid: 'C区网格05', alarmImage: '/alarm-sample.jpg', alarmVideo: '/alarm-clip.mp4' },
    { id: 5, title: '缓冲区西段红外报警', time: '2025-03-25 15:20:18', type: '涉林火情', status: '已核实', isTimeout: false, isViewed: true, isVerified: true, device: '双光谱云台-07', latitude: '39.7245', longitude: '115.8834', grid: 'B区网格04', alarmImage: '/alarm-sample.jpg', alarmVideo: '/alarm-clip.mp4' }
  ],

  // 网格人员
  gridPersonnel: [
    { id: 1, name: '张伟', phone: '13800138001', position: '网格长', unit: '石花洞管理处', avatar: '/avatar-sample.jpg' },
    { id: 2, name: '李明', phone: '13800138002', position: '护林员', unit: '石花洞管理处', avatar: '/avatar-sample.jpg' },
    { id: 3, name: '王强', phone: '13800138003', position: '网格长', unit: '房山区园林绿化局', avatar: '/avatar-sample.jpg' },
    { id: 4, name: '刘洋', phone: '13800138004', position: '护林员', unit: '房山区园林绿化局', avatar: '/avatar-sample.jpg' }
  ]
}

function ForestFireMonitoring() {
  // 状态管理
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null) // 涉林火情、非涉林火情、误报
  const [selectedTab, setSelectedTab] = useState('全部') // 全部、已查看、已核实、未处理
  const [timeoutFilter, setTimeoutFilter] = useState<string | null>(null) // 已超时、未超时
  const [selectedAlarm, setSelectedAlarm] = useState<typeof forestFireMonitoringData.alarmRecords[0] | null>(null)
  const [showDrawer, setShowDrawer] = useState(false)
  const [selectedMapPoint, setSelectedMapPoint] = useState<string | null>(null)

  // 统计数据
  const stats = {
    forestFire: forestFireMonitoringData.alarmRecords.filter(a => a.type === '涉林火情').length,
    nonForestFire: forestFireMonitoringData.alarmRecords.filter(a => a.type === '非涉林火情').length,
    falseAlarm: forestFireMonitoringData.alarmRecords.filter(a => a.type === '误报').length,
    all: forestFireMonitoringData.alarmRecords.length,
    viewed: forestFireMonitoringData.alarmRecords.filter(a => a.isViewed).length,
    verified: forestFireMonitoringData.alarmRecords.filter(a => a.isVerified).length,
    unprocessed: forestFireMonitoringData.alarmRecords.filter(a => a.status === '未处理').length
  }

  // 筛选后的报警列表
  const filteredAlarms = forestFireMonitoringData.alarmRecords.filter(alarm => {
    if (selectedType && alarm.type !== selectedType) return false
    if (selectedTab === '已查看' && !alarm.isViewed) return false
    if (selectedTab === '已核实' && !alarm.isVerified) return false
    if (selectedTab === '未处理' && alarm.status !== '未处理') return false
    if (timeoutFilter === '已超时' && !alarm.isTimeout) return false
    if (timeoutFilter === '未超时' && alarm.isTimeout) return false
    return true
  })

  // 处理报警卡片点击
  const handleAlarmClick = (alarm: typeof forestFireMonitoringData.alarmRecords[0]) => {
    setSelectedAlarm(alarm)
    setShowDrawer(true)
    setSelectedMapPoint(alarm.id.toString())
  }

  // 处理地图点位点击
  const handleMapPointClick = (alarmId: string) => {
    const alarm = forestFireMonitoringData.alarmRecords.find(a => a.id.toString() === alarmId)
    if (alarm) {
      setSelectedAlarm(alarm)
      setShowDrawer(true)
      setSelectedMapPoint(alarmId)
    }
  }

  // 格式化日期
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  return (
    <div className="h-full relative overflow-hidden bg-gray-50">
      {/* 地图底图 - 使用巡护监管的底图 */}
      <div className="absolute inset-0">
        <img
          src="/map-bg.png"
          alt="地图底图"
          className="w-full h-full object-cover"
          style={{ objectFit: 'fill' }}
        />
      </div>

      {/* 地图点位 */}
      <div className="absolute inset-0 pointer-events-none">
        {forestFireMonitoringData.alarmRecords.map((alarm) => {
          const isSelected = selectedMapPoint === alarm.id.toString()
          return (
            <div
              key={alarm.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
              style={{
                top: `${30 + alarm.id * 8}%`,
                left: `${20 + alarm.id * 12}%`,
                zIndex: isSelected ? 20 : 10
              }}
              onClick={() => handleMapPointClick(alarm.id.toString())}
            >
              {/* 脉冲动画 - 选中时显示 */}
              {isSelected && (
                <div className="absolute inset-0 rounded-full animate-ping bg-orange-500 opacity-30" style={{ transform: 'scale(1.5)' }} />
              )}

              {/* 点位图标 */}
              <div className={`w-4 h-4 rounded-full border-2 ${
                alarm.type === '涉林火情' ? 'bg-red-500 border-red-300' :
                alarm.type === '非涉林火情' ? 'bg-yellow-500 border-yellow-300' :
                'bg-gray-500 border-gray-300'
              } ${isSelected ? 'ring-4 ring-orange-400 shadow-lg' : ''}`} />

              {/* 序号 */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full text-white text-xs flex items-center justify-center font-bold">
                {alarm.id}
              </div>
            </div>
          )
        })}
      </div>

      {/* 左侧浮动卡片 - 本日报警记录 */}
      <div className="absolute top-4 left-4 w-80 max-h-[calc(100vh-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* 标题栏 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-800">本日报警记录</h3>
          </div>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-700">{formatDate(selectedDate)}</span>
          </button>
        </div>

        {showDatePicker && (
          <div className="absolute top-14 left-4 right-4 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-3">
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => {
                setSelectedDate(new Date(e.target.value))
                setShowDatePicker(false)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        )}

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-2 p-3 border-b border-gray-200">
          <button
            onClick={() => setSelectedType(selectedType === '涉林火情' ? null : '涉林火情')}
            className={`p-2 rounded-lg border transition-all text-center ${
              selectedType === '涉林火情'
                ? 'bg-red-500 border-red-600 text-white shadow-md'
                : 'bg-red-50 border-red-200 hover:bg-red-100'
            }`}
          >
            <div className="text-lg font-bold">{stats.forestFire}</div>
            <div className="text-xs">涉林火情</div>
          </button>
          <button
            onClick={() => setSelectedType(selectedType === '非涉林火情' ? null : '非涉林火情')}
            className={`p-2 rounded-lg border transition-all text-center ${
              selectedType === '非涉林火情'
                ? 'bg-yellow-500 border-yellow-600 text-white shadow-md'
                : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
            }`}
          >
            <div className="text-lg font-bold">{stats.nonForestFire}</div>
            <div className="text-xs">非涉林</div>
          </button>
          <button
            onClick={() => setSelectedType(selectedType === '误报' ? null : '误报')}
            className={`p-2 rounded-lg border transition-all text-center ${
              selectedType === '误报'
                ? 'bg-gray-500 border-gray-600 text-white shadow-md'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="text-lg font-bold">{stats.falseAlarm}</div>
            <div className="text-xs">误报</div>
          </button>
        </div>

        {/* 页签和筛选 */}
        <div className="px-3 py-2 border-b border-gray-200">
          {/* 页签 */}
          <div className="flex gap-1 mb-2">
            {['全部', '已查看', '已核实', '未处理'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 px-2 py-1.5 text-xs rounded-lg transition-all ${
                  selectedTab === tab
                    ? 'bg-orange-500 text-white font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
                <span className="ml-1 opacity-75">
                  {tab === '全部' ? stats.all :
                   tab === '已查看' ? stats.viewed :
                   tab === '已核实' ? stats.verified : stats.unprocessed}
                </span>
              </button>
            ))}
          </div>

          {/* 超时筛选 */}
          <div className="flex gap-1">
            <button
              onClick={() => setTimeoutFilter(timeoutFilter === '已超时' ? null : '已超时')}
              className={`flex-1 px-2 py-1 text-xs rounded transition-all ${
                timeoutFilter === '已超时'
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              已超时
            </button>
            <button
              onClick={() => setTimeoutFilter(timeoutFilter === '未超时' ? null : '未超时')}
              className={`flex-1 px-2 py-1 text-xs rounded transition-all ${
                timeoutFilter === '未超时'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              未超时
            </button>
          </div>
        </div>

        {/* 报警列表 */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredAlarms.map((alarm) => (
            <div
              key={alarm.id}
              onClick={() => handleAlarmClick(alarm)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedMapPoint === alarm.id.toString()
                  ? 'border-orange-500 bg-orange-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-800 flex-1 line-clamp-2">{alarm.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full ml-2 flex-shrink-0 ${
                  alarm.status === '已核实' ? 'bg-green-100 text-green-700' :
                  alarm.status === '已查看' ? 'bg-blue-100 text-blue-700' :
                  alarm.isTimeout ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {alarm.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{alarm.time.split(' ')[1]}</span>
                <span className={alarm.type === '涉林火情' ? 'text-red-600' : 'text-gray-600'}>
                  {alarm.type}
                </span>
              </div>
            </div>
          ))}
          {filteredAlarms.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              暂无报警记录
            </div>
          )}
        </div>
      </div>

      {/* 右侧浮动卡片 */}
      <div className="absolute top-4 right-4 w-72 space-y-3">
        {/* 森林火灾等级 */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
            <h3 className="font-semibold text-gray-800 text-sm">森林火灾等级</h3>
          </div>
          <div className="p-3">
            <img
              src="/火灾风险.jpg"
              alt="森林火灾等级"
              className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {/* 可以添加放大查看功能 */}}
            />
          </div>
        </div>

        {/* 监控设备 */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white">
            <h3 className="font-semibold text-gray-800 text-sm">监控设备</h3>
          </div>
          <div className="p-3 space-y-2">
            {forestFireOverviewData.monitoringEquipment.map((equipment, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <ResourceIcon iconName={equipment.icon} className={`w-4 h-4 ${equipment.color}`} />
                  <span className="text-xs text-gray-700">{equipment.name}</span>
                </div>
                <span className={`text-sm font-bold ${equipment.color}`}>
                  {equipment.online}
                  <span className="text-xs text-gray-500">/{equipment.total}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 无人机画面 */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <h3 className="font-semibold text-gray-800 text-sm">无人机画面</h3>
          </div>
          <div className="p-3">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/drone-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-white text-xs">
                实时画面
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 抽屉弹窗 - 详情 */}
      {showDrawer && selectedAlarm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex"
          onClick={() => {
            setShowDrawer(false)
            setSelectedAlarm(null)
            setSelectedMapPoint(null)
          }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-[500px] bg-white shadow-2xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* 标题栏 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-800">报警详情</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedAlarm.title}</p>
              </div>
              <button
                onClick={() => {
                  setShowDrawer(false)
                  setSelectedAlarm(null)
                  setSelectedMapPoint(null)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* 相关信息 - 视频/图片 */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">相关信息</h3>
              <div className="grid grid-cols-2 gap-3">
                {/* 实时监控画面 */}
                <div className="col-span-2 aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/monitoring-video.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-white text-xs">
                    实时监控画面
                  </div>
                </div>

                {/* 报警图片 */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90">
                  <img
                    src={selectedAlarm.alarmImage}
                    alt="报警图片"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-white text-xs">
                    报警图片
                  </div>
                </div>

                {/* 报警视频片段 */}
                <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:opacity-90">
                  <video
                    className="w-full h-full object-cover"
                    controls
                  >
                    <source src={selectedAlarm.alarmVideo} type="video/mp4" />
                  </video>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-white text-xs">
                    报警视频
                  </div>
                </div>
              </div>
            </div>

            {/* 基本信息 */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-500">报警时间</span>
                  <p className="text-sm text-gray-800 mt-1">{selectedAlarm.time}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">报警设备</span>
                  <p className="text-sm text-gray-800 mt-1">{selectedAlarm.device}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">经纬度</span>
                  <p className="text-sm text-gray-800 mt-1">{selectedAlarm.latitude}, {selectedAlarm.longitude}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">所属网格</span>
                  <p className="text-sm text-gray-800 mt-1">{selectedAlarm.grid}</p>
                </div>
              </div>

              {/* 网格人员 */}
              <div>
                <span className="text-xs text-gray-500">网格人员</span>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {forestFireMonitoringData.gridPersonnel.slice(0, 2).map((person) => (
                    <div key={person.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 处置进度 */}
              <div>
                <span className="text-xs text-gray-500">处置进度</span>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">
                      {selectedAlarm.isViewed ? '已查看' : '未查看'} - 系统管理员
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {selectedAlarm.isVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="text-gray-700">
                      {selectedAlarm.isVerified ? '已核实' : '待核实'} - {selectedAlarm.isVerified ? '张伟' : '等待确认'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ========== 森林防火指挥调度界面 ==========
function ForestFireCommand() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">森林防火指挥调度</h2>
        <p className="text-gray-500">界面内容待添加</p>
      </div>
    </div>
  )
}

// ========== 森林防火历史数据界面 ==========
function ForestFireHistory() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">森林防火历史数据</h2>
        <p className="text-gray-500">界面内容待添加</p>
      </div>
    </div>
  )
}

// ========== 森林防火防火资源界面 ==========
function ForestFireResource() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">森林防火资源</h2>
        <p className="text-gray-500">界面内容待添加</p>
      </div>
    </div>
  )
}

// ========== 森林防火统计分析界面 ==========
function ForestFireStats() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">森林防火统计分析</h2>
        <p className="text-gray-500">界面内容待添加</p>
      </div>
    </div>
  )
}

// ========== 人类活动实时监控界面 ==========
// 监控设备数据
const surveillanceCameras = [
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
const humanActivityStatsData = {
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

// 视频监控小窗口组件
function VideoMonitorCard({
  camera,
  onFullscreen
}: {
  camera: typeof surveillanceCameras[0]
  onFullscreen: () => void
}) {
  const now = new Date()
  const timeStr = now.toLocaleString('zh-CN', { 
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })

  return (
    <div className="bg-slate-800/80 rounded-lg overflow-hidden border border-slate-600/50 hover:border-cyan-500/50 transition-colors group shadow-lg">
      {/* 视频区域 */}
      <div className="relative aspect-video bg-slate-900">
        {/* 模拟视频画面 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-800 flex items-center justify-center">
          <Video className="w-8 h-8 text-slate-500" />
        </div>
        
        {/* 状态指示 */}
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${camera.status === '在线' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-xs text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">{camera.status}</span>
        </div>
        
        {/* 时间戳 */}
        <div className="absolute top-2 right-2 text-xs text-white/70 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
          {timeStr}
        </div>
        
        {/* 全屏按钮 */}
        <button
          onClick={onFullscreen}
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500/80 hover:bg-cyan-500 text-white p-1.5 rounded"
          title="全屏播放"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
        
        {/* 设备名称 */}
        <div className="absolute bottom-2 left-2 text-xs text-white/80 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
          {camera.name}
        </div>
      </div>
    </div>
  )
}

// 视频监控网格组件
function VideoMonitorGrid({
  cameras,
  gridCols,
  setGridCols,
  onFullscreen
}: {
  cameras: typeof surveillanceCameras
  gridCols: number
  setGridCols: (cols: number) => void
  onFullscreen: (camera: typeof surveillanceCameras[0]) => void
}) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* 头部 - 标题和切换按钮在同一行 */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-cyan-900/30 flex-shrink-0">
        <h3 className="text-base font-medium text-cyan-400 flex items-center gap-2">
          <Video className="w-5 h-5" />
          视频监控
        </h3>
        <div className="flex items-center gap-4">
          {/* 在线设备显示 */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">在线设备:</span>
            <span className="text-cyan-400 font-medium">{cameras.filter(c => c.status === '在线').length}/{cameras.length}</span>
          </div>
          
          {/* 布局切换按钮 */}
          <div className="flex gap-1 bg-slate-700/50 p-1 rounded">
            {/* 一行一视频 */}
            <button
              onClick={() => setGridCols(1)}
              className={`p-1.5 rounded transition-colors relative ${
                gridCols === 1 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-600'
              }`}
              title="一行一视频"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="12" height="10" rx="1" />
              </svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                一行一视频
              </div>
            </button>
            {/* 一行两视频 */}
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded transition-colors relative ${
                gridCols === 2 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-600'
              }`}
              title="一行两视频"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="6" height="10" rx="1" />
                <rect x="9" y="3" width="6" height="10" rx="1" />
              </svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                一行两视频
              </div>
            </button>
            {/* 一行三视频 */}
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded transition-colors relative ${
                gridCols === 3 
                  ? 'bg-cyan-500 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-slate-600'
              }`}
              title="一行三视频"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="0.5" y="3" width="4.5" height="10" rx="1" />
                <rect x="5.75" y="3" width="4.5" height="10" rx="1" />
                <rect x="11" y="3" width="4.5" height="10" rx="1" />
              </svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                一行三视频
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* 视频网格 - 自定义滚动条样式 */}
      <div className="flex-1 p-3 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-thumb]:bg-cyan-500/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-cyan-500/60">
        <div 
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        >
          {cameras.map(camera => (
            <VideoMonitorCard
              key={camera.id}
              camera={camera}
              onFullscreen={() => onFullscreen(camera)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 监控分布地图组件
function MonitorDistributionMap({
  cameras,
  onCameraClick,
  onFullscreen
}: {
  cameras: typeof surveillanceCameras
  onCameraClick: (camera: typeof surveillanceCameras[0]) => void
  onFullscreen: () => void
}) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-cyan-900/30 shadow-lg">
      {/* 头部 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-cyan-900/30 flex-shrink-0">
        <h4 className="text-sm font-medium text-cyan-400">监控分布</h4>
        <button
          onClick={onFullscreen}
          className="text-gray-400 hover:text-cyan-400 transition-colors"
          title="全屏查看"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
      
      {/* 地图区域 */}
      <div className="flex-1 relative overflow-hidden">
        {/* 地图背景图片 */}
        <img
          src="/human-activity-map-bg.png"
          alt="监控分布地图"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* 监控点位 */}
        {cameras.map(camera => (
          <div
            key={camera.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: camera.top, left: camera.left }}
            onClick={() => onCameraClick(camera)}
          >
            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 ${
              camera.status === '在线' ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <Video className="w-3 h-3 text-white" />
            </div>
            {/* 悬浮提示 */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-800/95 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-lg">
              {camera.name} - {camera.location}
            </div>
          </div>
        ))}
        
        {/* 图例 */}
        <div className="absolute bottom-2 left-2 bg-slate-800/90 rounded px-2 py-1.5 text-xs shadow-lg">
          <div className="text-gray-400 mb-1">图例</div>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">在线</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">离线</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 人类活动统计图表组件
function HumanActivityChart({
  data,
  period
}: {
  data: typeof humanActivityStatsData.daily
  period: 'daily' | 'weekly' | 'monthly'
}) {
  const maxValue = Math.max(...data.map(d => d.intrusion + d.vehicle + d.other))
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-cyan-900/30 shadow-lg">
      {/* 图例 */}
      <div className="flex items-center justify-center gap-4 py-2 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-xs text-gray-400">非法闯入</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-xs text-gray-400">车辆进入</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-amber-500 rounded"></div>
          <span className="text-xs text-gray-400">其他</span>
        </div>
      </div>
      
      {/* 统计汇总 */}
      <div className="grid grid-cols-3 gap-2 p-2 border-b border-cyan-900/30 flex-shrink-0">
        <div className="bg-slate-700/30 rounded p-1.5 text-center border border-slate-600/30">
          <div className="text-base font-bold text-red-400">
            {data.reduce((sum, d) => sum + d.intrusion, 0)}
          </div>
          <div className="text-xs text-gray-500">非法闯入</div>
        </div>
        <div className="bg-slate-700/30 rounded p-1.5 text-center border border-slate-600/30">
          <div className="text-base font-bold text-blue-400">
            {data.reduce((sum, d) => sum + d.vehicle, 0)}
          </div>
          <div className="text-xs text-gray-500">车辆进入</div>
        </div>
        <div className="bg-slate-700/30 rounded p-1.5 text-center border border-slate-600/30">
          <div className="text-base font-bold text-amber-400">
            {data.reduce((sum, d) => sum + d.other, 0)}
          </div>
          <div className="text-xs text-gray-500">其他</div>
        </div>
      </div>
      
      {/* 图表区域 - 自定义滚动条样式 */}
      <div className="flex-1 p-2 overflow-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-slate-700/30 [&::-webkit-scrollbar-thumb]:bg-cyan-500/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-cyan-500/60">
        <div className="space-y-2">
          {data.map((item, index) => {
            const total = item.intrusion + item.vehicle + item.other
            const intrusionWidth = (item.intrusion / maxValue) * 100
            const vehicleWidth = (item.vehicle / maxValue) * 100
            const otherWidth = (item.other / maxValue) * 100
            
            return (
              <div key={index}>
                <div className="text-xs text-gray-400 mb-1 truncate">{item.camera}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-5 bg-slate-700/30 rounded overflow-hidden flex">
                    {/* 非法闯入 */}
                    {intrusionWidth > 0 && (
                      <div 
                        className="h-full bg-red-500 transition-all duration-300 cursor-pointer hover:brightness-110 group relative"
                        style={{ width: `${intrusionWidth}%` }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded whitespace-nowrap z-20 shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          非法闯入：{item.intrusion}
                        </div>
                      </div>
                    )}
                    {/* 车辆进入 */}
                    {vehicleWidth > 0 && (
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300 cursor-pointer hover:brightness-110 group relative"
                        style={{ width: `${vehicleWidth}%` }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded whitespace-nowrap z-20 shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          车辆进入：{item.vehicle}
                        </div>
                      </div>
                    )}
                    {/* 其他 */}
                    {otherWidth > 0 && (
                      <div 
                        className="h-full bg-amber-500 transition-all duration-300 cursor-pointer hover:brightness-110 group relative"
                        style={{ width: `${otherWidth}%` }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded whitespace-nowrap z-20 shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          其他：{item.other}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-300 w-8 text-right font-medium">{total}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}



// 侧边栏菜单项组件
interface MenuItemProps {
  item: typeof menuData[0];
  level: number;
  expandedItems: string[];
  toggleExpand: (id: string, level: number) => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
  sidebarCollapsed?: boolean;
}

function MenuItem({ item, level, expandedItems, toggleExpand, selectedId, setSelectedId, sidebarCollapsed = false }: MenuItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedItems.includes(item.id)
  const isSelected = selectedId === item.id
  const Icon = item.icon

  const handleClick = () => {
    if (sidebarCollapsed) {
      // 折叠状态下点击一级菜单，展开侧边栏
      return
    }
    if (level === 0 && hasChildren) {
      // 一级模块有子模块时
      if (!isExpanded) {
        // 如果当前折叠，则展开并选中第一个子模块
        toggleExpand(item.id, 0) // 传入level=0表示一级模块
        const firstChild = item.children![0]
        setSelectedId(firstChild.id)
        // 如果第一个子模块也有子模块，展开它
        if (firstChild.children && firstChild.children.length > 0) {
          if (!expandedItems.includes(firstChild.id)) {
            toggleExpand(firstChild.id, 1) // 传入level=1表示二级模块
          }
        }
      } else {
        // 如果当前展开，则折叠
        toggleExpand(item.id, 0)
      }
    } else if (level === 1 && hasChildren) {
      // 二级模块有子模块（三级模块）时
      if (!isExpanded) {
        // 如果当前折叠，则展开并选中第一个三级模块
        toggleExpand(item.id, 1) // 传入level=1表示二级模块
        const firstChild = item.children![0]
        setSelectedId(firstChild.id)
      } else {
        // 如果当前展开，则折叠
        toggleExpand(item.id, 1)
      }
    } else {
      // 其他情况，直接选中当前项
      setSelectedId(item.id)
      if (hasChildren) {
        toggleExpand(item.id, level)
      }
    }
  }

  // 折叠状态且是一级菜单
  if (sidebarCollapsed && level === 0) {
    return (
      <div
        className={`flex items-center justify-center py-2.5 cursor-pointer transition-all duration-200 mx-1.5 rounded-lg group relative
          ${isSelected 
            ? 'bg-green-100 text-green-700' 
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}
        onClick={handleClick}
        title={item.name}
      >
        {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
      </div>
    )
  }

  // 折叠状态下不显示二级及以下菜单
  if (sidebarCollapsed && level > 0) {
    return null
  }

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-all duration-200 rounded-md mx-2
          ${level === 0 ? 'mt-1' : ''}
          ${isSelected 
            ? 'bg-green-100 text-green-700 font-medium' 
            : 'text-gray-700 hover:bg-gray-100'
          }
        `}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        onClick={handleClick}
      >
        {level === 0 && Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
        <span className="flex-1 text-sm truncate">{item.name}</span>
        {hasChildren && (
          <span className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="transition-all duration-200">
          {item.children!.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              sidebarCollapsed={sidebarCollapsed}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTheme, setActiveTheme] = useState('生态本底')
  // 综合展示设备控制状态
  const [deviceVisibility, setDeviceVisibility] = useState({
    infrared: true,
    acoustic: true,
    video: true
  })
  // 综合展示年份选择
  const [selectedYear, setSelectedYear] = useState('全部')
  // 优势物种类型选择
  const [dominantType, setDominantType] = useState<'plant' | 'animal'>('plant')
  // 物种资源界面状态
  const [speciesCategory, setSpeciesCategory] = useState('mammal')
  const [speciesSearchTerm, setSpeciesSearchTerm] = useState('')
  const [speciesPage, setSpeciesPage] = useState(1)
  const [selectedSpeciesIds, setSelectedSpeciesIds] = useState<number[]>([])
  // 调查专项界面状态
  const [surveyStatus, setSurveyStatus] = useState('全部')
  const [surveySearchTerm, setSurveySearchTerm] = useState('')
  const [selectedSurveyIds, setSelectedSurveyIds] = useState<number[]>([])
  // 视频监测界面状态
  const [selectedDevice, setSelectedDevice] = useState<typeof imageMonitorDevices[0] | null>(null)
  const [showDeviceModal, setShowDeviceModal] = useState(false)

  // 获取所有一级模块ID
  const level0Ids = menuData.map(item => item.id)
  
  // 获取所有二级模块ID（有三级子模块的）
  const level1IdsWithChildren = menuData.flatMap(item => 
    (item.children || [])
      .filter(child => child.children && child.children.length > 0)
      .map(child => child.id)
  )

  const toggleExpand = (id: string, level: number) => {
    setExpandedItems(prev => {
      const isCurrentlyExpanded = prev.includes(id)

      if (isCurrentlyExpanded) {
        // 折叠当前项
        return prev.filter(item => item !== id)
      } else {
        // 展开当前项
        let newExpanded = [...prev, id]

        if (level === 0) {
          // 展开一级模块时，折叠其他所有一级模块
          newExpanded = newExpanded.filter(item => !level0Ids.includes(item) || item === id)
        } else if (level === 1) {
          // 展开二级模块时，折叠同一父级下的其他二级模块
          // 找到当前二级模块的父级
          const parent = menuData.find(p => p.children?.some(c => c.id === id))
          if (parent && parent.children) {
            const siblingIds = parent.children
              .filter(child => child.children && child.children.length > 0)
              .map(child => child.id)
            newExpanded = newExpanded.filter(item => !siblingIds.includes(item) || item === id)
          }
        }

        return newExpanded
      }
    })
  }

  return (
    <div className="h-screen bg-[#f0f7f1] flex flex-col overflow-hidden">
      {/* 顶部头部 - 固定不动 */}
      <header className="h-14 bg-green-50 border-b border-green-200 flex items-center justify-between px-4 shadow-sm flex-shrink-0 relative z-50">
        {/* 左侧：Logo和系统名称 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
            <TreePine className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-800">
            房山区石花洞风景名胜区智慧监管系统
          </h1>
        </div>

        {/* 右侧：大屏系统和用户 */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-sm">大屏系统</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
            <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-700 font-medium">管理员</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </header>

      {/* 主体区域 - 高度自适应 */}
      <div className="flex-1 flex min-h-0">
        {/* 左侧菜单 - 高度自适应，独立滚动 */}
        <aside className={`bg-white border-r border-green-200 flex flex-col flex-shrink-0 h-full transition-all duration-300 ${
          sidebarCollapsed ? 'w-14' : 'w-44'
        }`}>
          <div className="flex-1 overflow-y-auto sidebar-scrollbar py-2 min-h-0">
            {menuData.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                level={0}
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                sidebarCollapsed={sidebarCollapsed}
              />
            ))}
          </div>
          {/* 底部：折叠按钮和版本信息 */}
          <div className="flex-shrink-0">
            {/* 折叠切换按钮 */}
            <div className="px-2 py-1.5 border-t border-green-100">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-green-50 text-gray-500 hover:text-green-600 transition-colors"
                title={sidebarCollapsed ? '展开菜单' : '折叠菜单'}
              >
                {sidebarCollapsed ? (
                  <PanelLeft className="w-5 h-5" />
                ) : (
                  <PanelLeftClose className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* 版本信息 */}
            <div className={`p-3 border-t border-green-100 text-center ${
              sidebarCollapsed ? 'hidden' : ''
            }`}>
              <span className="text-xs text-gray-400">版本 v1.0.0</span>
            </div>
          </div>
        </aside>

        {/* 主内容区 - 高度自适应，独立滚动 */}
        <main className="flex-1 p-4 overflow-y-auto custom-scrollbar min-h-0 h-full">
          {/* 综合展示界面 */}
          {selectedId === 'biodiversity-overview' && (
            <div className="h-full flex flex-col gap-4">
              {/* 设备详情弹窗 */}
              {showDeviceModal && selectedDevice && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeviceModal(false)}>
                  <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    {/* 弹窗头部 */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-green-600" />
                        <span className="text-base font-semibold text-gray-800">{selectedDevice.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          selectedDevice.status === '在线' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {selectedDevice.status}
                        </span>
                      </div>
                      <button onClick={() => setShowDeviceModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex">
                      {/* 左侧视频区域 */}
                      <div className="flex-1 p-4">
                        <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <div className="text-center">
                              <Video className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                              <span className="text-gray-400 text-sm">实时视频流</span>
                            </div>
                          </div>

                          {/* AI识别标记框 */}
                          {detectedBirdsInVideo.map((bird) => (
                            <div
                              key={bird.id}
                              className="absolute border-2 border-green-400 rounded cursor-pointer"
                              style={{
                                left: `${bird.x}%`,
                                top: `${bird.y}%`,
                                width: `${bird.width}%`,
                                height: `${bird.height}%`
                              }}
                            >
                              <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                                {bird.name} {bird.confidence}%
                              </div>
                            </div>
                          ))}

                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            实时
                          </div>

                          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                            {new Date().toLocaleString('zh-CN')}
                          </div>
                        </div>

                        {/* AI识别结果 */}
                        <div className="mt-3">
                          <div className="text-sm font-medium text-gray-700 mb-2">AI识别结果</div>
                          <div className="flex gap-2 flex-wrap">
                            {detectedBirdsInVideo.map((bird) => (
                              <div key={bird.id} className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                                <span className="text-green-700 font-medium">{bird.name}</span>
                                <span className="text-gray-500 text-sm ml-2">置信度: {bird.confidence}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 右侧设备信息 */}
                      <div className="w-72 border-l border-gray-200 p-4 bg-gray-50">
                        <div className="text-sm font-medium text-gray-700 mb-3">设备信息</div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">监测点名称</span>
                            <span className="text-sm text-gray-700 font-medium">{selectedDevice.pointName}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">设备名称</span>
                            <span className="text-sm text-gray-700">{selectedDevice.name}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">申报状态</span>
                            <span className={`text-sm px-2 py-0.5 rounded ${
                              selectedDevice.status === '在线' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                            }`}>{selectedDevice.status}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">经度</span>
                            <span className="text-sm text-gray-700">{selectedDevice.lng}°E</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">纬度</span>
                            <span className="text-sm text-gray-700">{selectedDevice.lat}°N</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">安装时间</span>
                            <span className="text-sm text-gray-700">{selectedDevice.installDate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">安装地点</span>
                            <span className="text-sm text-gray-700">{selectedDevice.location}</span>
                          </div>

                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">设备参数</div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">分辨率</span>
                                <span className="text-sm text-gray-700">{selectedDevice.resolution}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">拍摄角度</span>
                                <span className="text-sm text-gray-700">{selectedDevice.angle}</span>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">监测统计</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                                <div className="text-lg font-bold text-green-600">{selectedDevice.speciesCount}</div>
                                <div className="text-xs text-gray-500">鸟类种数</div>
                              </div>
                              <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                                <div className="text-lg font-bold text-blue-600">{selectedDevice.detectionCount}</div>
                                <div className="text-xs text-gray-500">数据条数</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* 顶部：时间控制器 + 统计卡片 */}
              <div className="flex items-center justify-between">
                {/* 时间控制器 */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">统计年份：</span>
                  <div className="flex gap-1">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                          selectedYear === year
                            ? 'bg-green-500 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  数据更新时间：2024-03-15 14:30:00
                </div>
              </div>

              {/* 核心指标卡片 */}
              <div className="grid grid-cols-6 gap-3">
                {biodiversityCoreData.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm border border-green-100 p-3 relative overflow-hidden group hover:shadow-md transition-shadow">
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.color}`}></div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-500">{item.label}</span>
                      </div>
                      <div className="text-lg font-bold text-gray-800">
                        {typeof item.value === 'number' && item.value >= 1000 
                          ? item.value.toLocaleString() 
                          : item.value}
                        <span className="text-sm font-normal text-gray-400 ml-1">{item.unit}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 主体区域 - 一屏展示 */}
              <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
                {/* 左侧地图区域 */}
                <div className="col-span-7 bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex flex-col">
                  {/* 地图头部 */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white flex-shrink-0">
                    <h3 className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <Map className="w-4 h-4 text-green-600" />
                      生物多样性监测成果分布图
                    </h3>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-600 hover:bg-green-50 rounded-md transition-colors border border-gray-200 bg-white">
                        <Search className="w-3 h-3" />
                        搜索添加物种
                      </button>
                    </div>
                  </div>

                  {/* 地图主体 */}
                  <div className="flex-1 relative overflow-hidden">
                    {/* 地图背景图片 */}
                    <img
                      src="/biodiversity-map-bg.png"
                      alt="生物多样性监测成果分布图"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* 物种分布点位 */}
                    {speciesPoints.map((point) => (
                      <div
                        key={point.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ top: point.top, left: point.left }}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125 ${
                          point.type === 'bird' ? 'bg-blue-500' :
                          point.type === 'mammal' ? 'bg-red-500' :
                          point.type === 'amphibian' ? 'bg-purple-500' :
                          'bg-green-500'
                        }`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        {point.name && (
                          <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-white/95 px-1.5 py-0.5 rounded shadow-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {point.name}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* 红外相机点位 */}
                    {deviceVisibility.infrared && infraredCameraPoints.map((point) => (
                      <div
                        key={`infrared-${point.id}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ top: point.top, left: point.left }}
                      >
                        <div className="w-6 h-6 bg-orange-500 rounded-md border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Camera className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    ))}

                    {/* 声纹监测点位 */}
                    {deviceVisibility.acoustic && acousticMonitorPoints.map((point) => (
                      <div
                        key={`acoustic-${point.id}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ top: point.top, left: point.left }}
                      >
                        <div className="w-6 h-6 bg-cyan-500 rounded-md border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Activity className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    ))}

                    {/* 视频监测点位 */}
                    {deviceVisibility.video && videoMonitorPoints.map((point) => (
                      <div
                        key={`video-${point.id}`}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ top: point.top, left: point.left }}
                        onClick={() => {
                          setSelectedDevice(point.device)
                          setShowDeviceModal(true)
                        }}
                      >
                        <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                          point.device.status === '在线' ? 'bg-green-500' : 'bg-gray-400'
                        }`}>
                          <Video className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-white/95 px-2 py-0.5 rounded shadow-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          {point.device.pointName} - {point.device.name}
                        </div>
                      </div>
                    ))}

                    {/* 图例 */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                      <div className="text-sm font-medium text-gray-700 mb-2">图例</div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
                          <span className="text-sm text-gray-600">鸟类</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                          <span className="text-sm text-gray-600">兽类</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full border border-white"></div>
                          <span className="text-sm text-gray-600">两栖类</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                          <span className="text-sm text-gray-600">其他物种</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 mt-2 pt-2 grid grid-cols-3 gap-2">
                        {deviceVisibility.infrared && (
                          <div className="flex items-center gap-1">
                            <Camera className="w-3 h-3 text-orange-500" />
                            <span className="text-sm text-gray-600">红外</span>
                          </div>
                        )}
                        {deviceVisibility.acoustic && (
                          <div className="flex items-center gap-1">
                            <Activity className="w-3 h-3 text-cyan-500" />
                            <span className="text-sm text-gray-600">声纹</span>
                          </div>
                        )}
                        {deviceVisibility.video && (
                          <div className="flex items-center gap-1">
                            <Video className="w-3 h-3 text-green-500" />
                            <span className="text-sm text-gray-600">视频</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 设备控制器 */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                      <div className="text-sm font-medium text-gray-700 mb-2">监测设备显示</div>
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={deviceVisibility.infrared}
                            onChange={(e) => setDeviceVisibility(prev => ({ ...prev, infrared: e.target.checked }))}
                            className="w-3.5 h-3.5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                          />
                          <span className="text-sm text-gray-600">红外相机 (4台)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={deviceVisibility.acoustic}
                            onChange={(e) => setDeviceVisibility(prev => ({ ...prev, acoustic: e.target.checked }))}
                            className="w-3.5 h-3.5 text-cyan-500 rounded border-gray-300 focus:ring-cyan-500"
                          />
                          <span className="text-sm text-gray-600">声纹监测 (2套)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={deviceVisibility.video}
                            onChange={(e) => setDeviceVisibility(prev => ({ ...prev, video: e.target.checked }))}
                            className="w-3.5 h-3.5 text-violet-500 rounded border-gray-300 focus:ring-violet-500"
                          />
                          <span className="text-sm text-gray-600">视频监测 (2套)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右侧监测成果统计大板块 */}
                <div className="col-span-5 bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex flex-col">
                  {/* 大板块头部 */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white flex-shrink-0">
                    <h3 className="text-base font-medium text-gray-700 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-green-600" />
                      监测成果统计
                    </h3>
                  </div>

                  {/* 统计图表内容区域 - 可滚动 */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                    {/* 前4个统计图表 2×2排列 */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* 植物资源统计 */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <TreePine className="w-4 h-4 text-green-600" />
                          植物资源统计
                        </h4>
                        <div className="space-y-1.5">
                          {plantResourceData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                              <span className="text-xs text-gray-600 w-12 truncate">{item.name}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${(item.value / Math.max(...plantResourceData.map(d => d.value))) * 100}%`,
                                    backgroundColor: item.color
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700 w-6 text-right">{item.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-gray-200 text-center">
                          <span className="text-xs text-gray-500">共计 </span>
                          <span className="text-sm font-bold text-green-600">{plantResourceData.reduce((s, i) => s + i.value, 0)}</span>
                          <span className="text-xs text-gray-500"> 种</span>
                        </div>
                      </div>

                      {/* 动物资源统计 */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Bird className="w-4 h-4 text-blue-600" />
                          动物资源统计
                        </h4>
                        <div className="space-y-1.5">
                          {animalResourceData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                              <span className="text-xs text-gray-600 w-10 truncate">{item.name}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${(item.value / Math.max(...animalResourceData.map(d => d.value))) * 100}%`,
                                    backgroundColor: item.color
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700 w-6 text-right">{item.value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-gray-200 text-center">
                          <span className="text-xs text-gray-500">共计 </span>
                          <span className="text-sm font-bold text-blue-600">{animalResourceData.reduce((s, i) => s + i.value, 0)}</span>
                          <span className="text-xs text-gray-500"> 种</span>
                        </div>
                      </div>

                      {/* 保护物种统计 */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-red-600" />
                          保护物种统计
                        </h4>
                        <div className="space-y-1.5">
                          {protectedSpeciesData2.map((item) => (
                            <div key={item.category} className="bg-white rounded p-1.5">
                              <div className="text-xs font-medium text-gray-700 mb-0.5">{item.category}</div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">植物：<span className="text-green-600 font-medium">{item.plants}</span>种</span>
                                <span className="text-gray-500">动物：<span className="text-blue-600 font-medium">{item.animals}</span>种</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-1.5 pt-1.5 border-t border-gray-200 text-center">
                          <span className="text-xs text-gray-500">共计 </span>
                          <span className="text-sm font-bold text-red-600">{protectedSpeciesData2.reduce((s, i) => s + i.plants + i.animals, 0)}</span>
                          <span className="text-xs text-gray-500"> 种</span>
                        </div>
                      </div>

                      {/* 优势物种统计 */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Star className="w-4 h-4 text-purple-600" />
                            优势物种统计
                          </h4>
                          <select
                            value={dominantType}
                            onChange={(e) => setDominantType(e.target.value as 'plant' | 'animal')}
                            className="text-xs border border-gray-200 rounded px-1.5 py-0.5 text-gray-600 bg-white"
                          >
                            <option value="plant">植物</option>
                            <option value="animal">动物</option>
                          </select>
                        </div>
                        <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar pr-1">
                          {(dominantType === 'plant' ? dominantPlantData : dominantAnimalData).slice(0, 5).map((item, index) => (
                            <div key={item.name} className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-gray-400 w-3">{index + 1}</span>
                              <span className={`text-xs w-12 truncate ${dominantType === 'plant' ? 'text-green-700' : 'text-blue-700'}`}>
                                {item.name}
                              </span>
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${dominantType === 'plant' ? 'bg-green-400' : 'bg-blue-400'}`}
                                  style={{ width: `${(item.count / Math.max(...(dominantType === 'plant' ? dominantPlantData : dominantAnimalData).map(d => d.count))) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700 w-5 text-right">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 典型物种数量统计 - 底部全宽 */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-orange-600" />
                        典型物种数量统计
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {typicalSpeciesData.map((item) => (
                          <div key={item.name} className="bg-white rounded-lg p-2 border border-gray-100">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-xs font-medium text-gray-700">{item.name}</span>
                              {item.trend === 'up' && <span className="text-xs text-green-500">↑</span>}
                              {item.trend === 'down' && <span className="text-xs text-red-500">↓</span>}
                              {item.trend === 'stable' && <span className="text-xs text-gray-400">→</span>}
                            </div>
                            <div className="text-base font-bold text-gray-800">{item.count}</div>
                            <div className="text-xs text-gray-500">个体数量</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 设备详情弹窗 */}
              {showDeviceModal && selectedDevice && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeviceModal(false)}>
                  <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    {/* 弹窗头部 */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-green-600" />
                        <span className="text-base font-semibold text-gray-800">{selectedDevice.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          selectedDevice.status === '在线' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {selectedDevice.status}
                        </span>
                      </div>
                      <button onClick={() => setShowDeviceModal(false)} className="text-gray-400 hover:text-gray-600 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex">
                      {/* 左侧视频区域 */}
                      <div className="flex-1 p-4">
                        <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <div className="text-center">
                              <Video className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                              <span className="text-gray-400 text-sm">实时视频流</span>
                            </div>
                          </div>

                          {/* AI识别标记框 */}
                          {detectedBirdsInVideo.map((bird) => (
                            <div
                              key={bird.id}
                              className="absolute border-2 border-green-400 rounded cursor-pointer"
                              style={{
                                left: `${bird.x}%`,
                                top: `${bird.y}%`,
                                width: `${bird.width}%`,
                                height: `${bird.height}%`
                              }}
                            >
                              <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                                {bird.name} {bird.confidence}%
                              </div>
                            </div>
                          ))}

                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            实时
                          </div>

                          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                            {new Date().toLocaleString('zh-CN')}
                          </div>
                        </div>

                        {/* AI识别结果 */}
                        <div className="mt-3">
                          <div className="text-sm font-medium text-gray-700 mb-2">AI识别结果</div>
                          <div className="flex gap-2 flex-wrap">
                            {detectedBirdsInVideo.map((bird) => (
                              <div key={bird.id} className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                                <span className="text-green-700 font-medium">{bird.name}</span>
                                <span className="text-gray-500 text-sm ml-2">置信度: {bird.confidence}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 右侧设备信息 */}
                      <div className="w-72 border-l border-gray-200 p-4 bg-gray-50">
                        <div className="text-sm font-medium text-gray-700 mb-3">设备信息</div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">监测点名称</span>
                            <span className="text-sm text-gray-700 font-medium">{selectedDevice.pointName}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">设备名称</span>
                            <span className="text-sm text-gray-700">{selectedDevice.name}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">申报状态</span>
                            <span className={`text-sm px-2 py-0.5 rounded ${
                              selectedDevice.status === '在线' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                            }`}>{selectedDevice.status}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">经度</span>
                            <span className="text-sm text-gray-700">{selectedDevice.lng}°E</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">纬度</span>
                            <span className="text-sm text-gray-700">{selectedDevice.lat}°N</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">安装时间</span>
                            <span className="text-sm text-gray-700">{selectedDevice.installDate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">安装地点</span>
                            <span className="text-sm text-gray-700">{selectedDevice.location}</span>
                          </div>

                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">设备参数</div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">分辨率</span>
                                <span className="text-sm text-gray-700">{selectedDevice.resolution}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">拍摄角度</span>
                                <span className="text-sm text-gray-700">{selectedDevice.angle}</span>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="text-sm font-medium text-gray-700 mb-2">监测统计</div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                                <div className="text-lg font-bold text-green-600">{selectedDevice.speciesCount}</div>
                                <div className="text-xs text-gray-500">鸟类种数</div>
                              </div>
                              <div className="bg-white rounded-lg p-2 text-center border border-gray-100">
                                <div className="text-lg font-bold text-blue-600">{selectedDevice.detectionCount}</div>
                                <div className="text-xs text-gray-500">数据条数</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 物种资源界面 */}
          {selectedId === 'biodiversity-species' && (
            <div className="h-full flex flex-col bg-gray-50">
              {/* 顶部筛选区域 */}
              <div className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex flex-wrap items-center gap-3">
                  {/* 搜索框 */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="请输入物种名称"
                      value={speciesSearchTerm}
                      onChange={(e) => setSpeciesSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  {/* 分类下拉框 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">目</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28">
                      <option>请选择</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">科</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28">
                      <option>请选择</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">属</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28">
                      <option>请选择</option>
                    </select>
                  </div>
                  
                  {/* 保护等级 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">国家保护</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28">
                      <option>请选择</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">省级保护</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28">
                      <option>请选择</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">中国红色名录</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28">
                      <option>请选择</option>
                    </select>
                  </div>
                  
                  {/* 中国特有种开关 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">中国特有种</span>
                    <button className="w-10 h-5 bg-gray-200 rounded-full relative">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
                    </button>
                  </div>
                  
                  {/* 国际组织 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">IUCN</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28">
                      <option>请选择</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">CITES</span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28">
                      <option>请选择</option>
                    </select>
                  </div>
                  
                  {/* 按钮 */}
                  <div className="flex items-center gap-2 ml-4">
                    <button className="px-4 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      搜索
                    </button>
                    <button className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                      重置
                    </button>
                    <button className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
                      收起
                      <ChevronUp className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* 主体区域 */}
              <div className="flex-1 flex overflow-hidden">
                {/* 左侧分类导航 */}
                <div className="w-32 bg-white border-r border-gray-200 py-2 flex-shrink-0">
                  {speciesCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSpeciesCategory(cat.id)}
                      className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between transition-colors ${
                        speciesCategory === cat.id
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-gray-400">{cat.count}</span>
                    </button>
                  ))}
                </div>
                
                {/* 右侧内容区 */}
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* 操作栏 */}
                  <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      <Plus className="w-4 h-4" />
                      新增
                    </button>
                    <div className="relative">
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                        <Upload className="w-4 h-4" />
                        导入
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      <Download className="w-4 h-4" />
                      导出
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                      删除
                    </button>
                    <div className="relative">
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                        <ArrowUpDown className="w-4 h-4" />
                        排序
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="relative">
                      <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                        <Eye className="w-4 h-4" />
                        显示
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      <CheckSquare className="w-4 h-4" />
                      全选
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      <Map className="w-4 h-4" />
                      地图查看
                    </button>
                  </div>
                  
                  {/* 数据表格 */}
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 sticky top-0">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium text-gray-700 w-8">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                          </th>
                          <th className="px-3 py-2 text-left font-medium text-gray-700">物种名</th>
                          <th className="px-3 py-2 text-left font-medium text-gray-700">拉丁名</th>
                          <th className="px-3 py-2 text-center font-medium text-gray-700 w-20">分布状况</th>
                          <th className="px-3 py-2 text-center font-medium text-gray-700 w-20">数量统计</th>
                          <th className="px-3 py-2 text-center font-medium text-gray-700 w-20">物种图片</th>
                          <th className="px-3 py-2 text-center font-medium text-gray-700 w-20">生境信息</th>
                          <th className="px-3 py-2 text-center font-medium text-gray-700 w-20">干扰因素</th>
                          <th className="px-3 py-2 text-left font-medium text-gray-700 w-24">目</th>
                          <th className="px-3 py-2 text-left font-medium text-gray-700 w-24">科</th>
                          <th className="px-3 py-2 text-left font-medium text-gray-700 w-24">属</th>
                          <th className="px-3 py-2 text-left font-medium text-gray-700 w-28">国家保护等级</th>
                          <th className="px-3 py-2 text-center font-medium text-gray-700 w-20">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {speciesListData.map((species, index) => (
                          <tr key={species.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-3 py-2">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                            </td>
                            <td className="px-3 py-2">
                              <span className="text-green-600 font-medium">{species.name}</span>
                            </td>
                            <td className="px-3 py-2 text-gray-500 italic">{species.latinName}</td>
                            <td className="px-3 py-2 text-center text-green-600">{species.distribution}</td>
                            <td className="px-3 py-2 text-center text-green-600">{species.quantity}</td>
                            <td className="px-3 py-2 text-center text-green-600">{species.images}</td>
                            <td className="px-3 py-2 text-center">
                              <button className="text-green-600 hover:underline">查看</button>
                            </td>
                            <td className="px-3 py-2 text-center">
                              <button className="text-green-600 hover:underline">查看</button>
                            </td>
                            <td className="px-3 py-2 text-gray-600">{species.order}</td>
                            <td className="px-3 py-2 text-gray-600">{species.family}</td>
                            <td className="px-3 py-2 text-gray-600">{species.genus}</td>
                            <td className="px-3 py-2">
                              {species.protection && (
                                <span className={`px-2 py-0.5 rounded text-xs ${
                                  species.protection === '国家I级' 
                                    ? 'bg-red-100 text-red-700' 
                                    : 'bg-orange-100 text-orange-700'
                                }`}>
                                  {species.protection}
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex items-center justify-center gap-2">
                                <button className="text-green-600 hover:text-green-700">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-blue-600 hover:text-blue-700">
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button className="text-red-500 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* 分页 */}
                  <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      共 <span className="font-medium text-gray-800">107</span> 条
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">每页</span>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                          <option>50</option>
                          <option>100</option>
                          <option>200</option>
                        </select>
                        <span className="text-sm text-gray-600">条</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                          &lt;
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded">
                          1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                          2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                          3
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50">
                          &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 调查专项界面 */}
          {selectedId === 'survey-special' && (
            <div className="h-full flex flex-col gap-3">
              {/* 顶部统计卡片 - 3个板块 */}
              <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-3">
                {/* 调查项目板块 */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-sm">
                        <ClipboardCheck className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">调查项目</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedSurveyIds.length === 0 
                        ? surveyProjectData.length 
                        : selectedSurveyIds.length}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1.5 bg-white/60 rounded px-2 py-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">待开始</span>
                      <span className="text-sm font-semibold text-gray-600 ml-auto">
                        {selectedSurveyIds.length === 0 
                          ? surveyProjectData.filter(p => p.status === '未开始').length
                          : surveyProjectData.filter(p => selectedSurveyIds.includes(p.id) && p.status === '未开始').length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/60 rounded px-2 py-1.5">
                      <Play className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">进行中</span>
                      <span className="text-sm font-semibold text-green-600 ml-auto">
                        {selectedSurveyIds.length === 0 
                          ? surveyProjectData.filter(p => p.status === '进行中').length
                          : surveyProjectData.filter(p => selectedSurveyIds.includes(p.id) && p.status === '进行中').length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/60 rounded px-2 py-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-purple-500" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">已完成</span>
                      <span className="text-sm font-semibold text-purple-600 ml-auto">
                        {selectedSurveyIds.length === 0 
                          ? surveyProjectData.filter(p => p.status === '已完成').length
                          : surveyProjectData.filter(p => selectedSurveyIds.includes(p.id) && p.status === '已完成').length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 发现物种板块 - 宽度缩减 */}
                <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg border border-orange-100 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-md flex items-center justify-center shadow-sm">
                        <Leaf className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">发现物种</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-orange-600">
                        {selectedSurveyIds.length === 0 
                          ? surveyProjectData.reduce((s, p) => s + p.species, 0)
                          : surveyProjectData.filter(p => selectedSurveyIds.includes(p.id)).reduce((s, p) => s + p.species, 0)}
                      </span>
                      <span className="text-xs text-gray-500">种</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    <div className="flex items-center gap-1 bg-white/60 rounded px-1.5 py-1">
                      <TreePine className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">植物</span>
                      <span className="text-xs font-semibold text-gray-700 ml-auto">
                        {selectedSurveyIds.length === 0 ? 245 : Math.round(245 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/60 rounded px-1.5 py-1">
                      <Bird className="w-3 h-3 text-sky-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">鸟类</span>
                      <span className="text-xs font-semibold text-gray-700 ml-auto">
                        {selectedSurveyIds.length === 0 ? 128 : Math.round(128 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/60 rounded px-1.5 py-1">
                      <Cat className="w-3 h-3 text-amber-600 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">兽类</span>
                      <span className="text-xs font-semibold text-gray-700 ml-auto">
                        {selectedSurveyIds.length === 0 ? 56 : Math.round(56 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/60 rounded px-1.5 py-1">
                      <Waves className="w-3 h-3 text-purple-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">两爬</span>
                      <span className="text-xs font-semibold text-gray-700 ml-auto">
                        {selectedSurveyIds.length === 0 ? 42 : Math.round(42 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/60 rounded px-1.5 py-1">
                      <Bug className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">昆虫</span>
                      <span className="text-xs font-semibold text-gray-700 ml-auto">
                        {selectedSurveyIds.length === 0 ? 312 : Math.round(312 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/60 rounded px-1.5 py-1">
                      <Fish className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">鱼类</span>
                      <span className="text-xs font-semibold text-gray-700 ml-auto">
                        {selectedSurveyIds.length === 0 ? 38 : Math.round(38 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/60 rounded px-1.5 py-1">
                      <Sparkles className="w-3 h-3 text-pink-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">真菌</span>
                      <span className="text-xs font-semibold text-gray-700 ml-auto">
                        {selectedSurveyIds.length === 0 ? 78 : Math.round(78 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>

                {/* 采集数据板块 - 宽度增加 */}
                <div className="bg-gradient-to-br from-cyan-50 to-white rounded-lg border border-cyan-100 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-md flex items-center justify-center shadow-sm">
                        <Database className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">采集数据</span>
                    </div>
                    <div className="text-2xl font-bold text-cyan-600">
                      {selectedSurveyIds.length === 0 
                        ? surveyProjectData.reduce((s, p) => s + p.records, 0).toLocaleString()
                        : surveyProjectData.filter(p => selectedSurveyIds.includes(p.id)).reduce((s, p) => s + p.records, 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-1.5 bg-white/60 rounded px-2 py-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">调查表</span>
                      <span className="text-sm font-semibold text-blue-600 ml-auto">
                        {selectedSurveyIds.length === 0 
                          ? 1256 
                          : Math.round(1256 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/60 rounded px-2 py-1.5">
                      <Image className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">图片</span>
                      <span className="text-sm font-semibold text-green-600 ml-auto">
                        {selectedSurveyIds.length === 0 
                          ? 8542 
                          : Math.round(8542 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/60 rounded px-2 py-1.5">
                      <Mic className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500 whitespace-nowrap">音频</span>
                      <span className="text-sm font-semibold text-purple-600 ml-auto">
                        {selectedSurveyIds.length === 0 
                          ? 326 
                          : Math.round(326 * selectedSurveyIds.length / surveyProjectData.length)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 筛选和操作区域 */}
              <div className="bg-white rounded-lg shadow-sm border border-green-100 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* 左侧操作按钮 */}
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      <Plus className="w-4 h-4" />
                      新增项目
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      <Download className="w-4 h-4" />
                      导出
                    </button>
                  </div>
                  
                  {/* 右侧筛选 */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* 搜索框 */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="搜索项目名称"
                        value={surveySearchTerm}
                        onChange={(e) => setSurveySearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    {/* 状态 */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">状态</span>
                      <select 
                        value={surveyStatus}
                        onChange={(e) => setSurveyStatus(e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-600 bg-white min-w-28"
                      >
                        {surveyStatusOptions.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* 按钮 */}
                    <button className="px-4 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors">
                      搜索
                    </button>
                    <button className="px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
                      重置
                    </button>
                  </div>
                </div>
              </div>

              {/* 项目列表 */}
              <div className="flex-1 bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
                <div className="overflow-auto h-full">
                  <table className="w-full text-sm">
                    <thead className="bg-green-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-700 w-8">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-gray-300"
                            checked={selectedSurveyIds.length === surveyProjectData.length && surveyProjectData.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSurveyIds(surveyProjectData.map(p => p.id))
                              } else {
                                setSelectedSurveyIds([])
                              }
                            }}
                          />
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-gray-700">项目名称</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700 w-28">开始日期</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700 w-28">结束日期</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700 w-20">负责人</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700 w-20">发现物种</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700 w-24">采集数据</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700 w-20">状态</th>
                        <th className="px-4 py-3 text-center font-medium text-gray-700 w-36">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surveyProjectData
                        .filter((project) => {
                          const matchesStatus = surveyStatus === '全部' || project.status === surveyStatus
                          const matchesSearch = project.name.includes(surveySearchTerm)
                          return matchesStatus && matchesSearch
                        })
                        .map((project, index) => (
                        <tr key={project.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 rounded border-gray-300"
                              checked={selectedSurveyIds.includes(project.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedSurveyIds(prev => [...prev, project.id])
                                } else {
                                  setSelectedSurveyIds(prev => prev.filter(id => id !== project.id))
                                }
                              }}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-green-600 font-medium hover:underline cursor-pointer">{project.name}</span>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-600">{project.startDate}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{project.endDate}</td>
                          <td className="px-4 py-3 text-center text-gray-600">{project.leader}</td>
                          <td className="px-4 py-3 text-center text-green-600 font-medium">{project.species}</td>
                          <td className="px-4 py-3 text-center text-cyan-600 font-medium">{project.records}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                              project.status === '进行中' ? 'bg-green-100 text-green-700' :
                              project.status === '已完成' ? 'bg-purple-100 text-purple-700' :
                              project.status === '未开始' ? 'bg-gray-100 text-gray-600' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button className="text-blue-600 hover:text-blue-700" title="编辑">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-700" title="设置">
                                <Settings className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-700" title="完成">
                                <CheckSquare className="w-4 h-4" />
                              </button>
                              <button className="text-red-500 hover:text-red-600" title="删除">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* 分页 */}
                <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50">
                  <div className="text-sm text-gray-600">
                    共 <span className="font-medium text-gray-800">{surveyProjectData.length}</span> 条记录
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">每页</span>
                      <select className="border border-gray-300 rounded px-2 py-1 text-sm bg-white">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                      </select>
                      <span className="text-sm text-gray-600">条</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:bg-gray-50 bg-white">
                        &lt;
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded">
                        1
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-50 bg-white">
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 红外相机界面 */}
          {selectedId === 'survey-infrared' && (
            <div className="h-full -m-4"><InfraredCameraInterface /></div>
          )}

          {/* 声纹监测界面 */}
          {selectedId === 'survey-acoustic' && (
            <div className="h-full -m-4"><AcousticMonitorInterface /></div>
          )}

          {/* 视频监测界面 */}
          {selectedId === 'survey-image' && (
            <div className="h-full -m-4"><ImageMonitorInterface /></div>
          )}

          {/* 巡护监管实时巡护界面 */}
          {selectedId === 'patrol-realtime' && (
            <div className="h-full -m-4"><PatrolRealtimeInterface /></div>
          )}

          {/* 巡护监管统计考核界面 */}
          {selectedId === 'patrol-assessment' && (
            <div className="h-full -m-4"><PatrolStatsAssessment /></div>
          )}

          {/* 地质资源展示界面 */}
          {selectedId === 'geology-resource' && (
            <div className="h-full -m-4"><GeologyResourceInterface /></div>
          )}

          {/* 地质数据管理界面 */}
          {selectedId === 'geology-data' && (
            <div className="h-full -m-4"><GeologyDataManagement /></div>
          )}

          {/* 森林防火综合展示界面 */}
          {selectedId === 'forest-overview' && (
            <div className="h-full -m-4"><ForestFireOverview /></div>
          )}

          {/* 森林防火综合展示界面（白天模式） */}
          {selectedId === 'forest-overview-light' && (
            <div className="h-full -m-4"><ForestFireOverviewLight /></div>
          )}

          {/* 森林防火监测预警界面 */}
          {selectedId === 'forest-monitoring' && (
            <div className="h-full -m-4"><ForestFireMonitoring /></div>
          )}

          {/* 森林防火指挥调度界面 */}
          {selectedId === 'forest-command' && (
            <div className="h-full -m-4"><ForestFireCommand /></div>
          )}

          {/* 森林防火历史数据界面 */}
          {selectedId === 'forest-history' && (
            <div className="h-full -m-4"><ForestFireHistory /></div>
          )}

          {/* 森林防火防火资源界面 */}
          {selectedId === 'forest-resource' && (
            <div className="h-full -m-4"><ForestFireResource /></div>
          )}

          {/* 森林防火统计分析界面 */}
          {selectedId === 'forest-stats' && (
            <div className="h-full -m-4"><ForestFireStats /></div>
          )}

          {/* 人类活动实时监控界面 */}
          {selectedId === 'human-realtime' && (
            <div className="h-full -m-4"><HumanActivityRealtimeInterface /></div>
          )}

          {/* 人类活动实时监控1界面 - 白天模式 */}
          {selectedId === 'human-realtime-1' && (
            <div className="h-full -m-4"><HumanActivityRealtimeLight /></div>
          )}

          {/* 人类活动历史数据界面 */}
          {selectedId === 'human-history' && (
            <div className="h-full -m-4"><HumanActivityHistoryInterface /></div>
          )}

          {/* 生态环境数据管理界面 */}
          {selectedId === 'ecology-data' && (
            <div className="h-full -m-4"><EcologyDataManagement /></div>
          )}

          {/* 生态环境实时监测界面 */}
          {selectedId === 'ecology-realtime' && (
            <div className="h-full -m-4"><EcologyRealtimeMonitor /></div>
          )}

          {/* 生态环境实时监测(白天)界面 */}
          {selectedId === 'ecology-realtime-light' && (
            <div className="h-full -m-4"><EcologyRealtimeMonitorLight /></div>
          )}

          {/* 生态环境设备管理界面 */}
          {selectedId === 'ecology-device' && (
            <div className="h-full -m-4"><EcologicalDeviceManagement /></div>
          )}

          {/* 生态环境统计分析界面 */}
          {selectedId === 'ecology-stats' && (
            <div className="h-full -m-4"><EcologicalStatsAnalysis /></div>
          )}

          {/* 旅游管理实时监控界面 */}
          {selectedId === 'tourism-realtime' && (
            <div className="h-full -m-4"><TourismRealtimeInterface /></div>
          )}

          {/* 旅游管理实时监控1界面 - 白天模式 */}
          {selectedId === 'tourism-realtime-1' && (
            <div className="h-full -m-4"><TourismRealtimeLight /></div>
          )}

          {/* 保护地概况界面 */}
          {selectedId === 'overview' && (
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* 左侧区域 */}
            <div className="col-span-8 flex flex-col gap-4">
              {/* 地图区域 */}
              <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
                  <h3 className="text-base font-medium text-gray-700 flex items-center gap-2">
                    <Map className="w-4 h-4 text-green-600" />
                    地理位置
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-green-50 rounded transition-colors">
                      <Search className="w-3 h-3" />
                      搜索物种
                    </button>
                    <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-green-50 rounded transition-colors">
                      <Layers className="w-3 h-3" />
                      图层控制
                    </button>
                  </div>
                </div>
                <div className="h-96 relative overflow-hidden">
                  {/* 地图背景图片 */}
                  <img 
                    src="/overview-map-bg.png" 
                    alt="地理位置地图" 
                    className="w-full h-full object-cover"
                  />
                  {/* 位置标注 */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">北京市房山区河北镇南车营村</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 详细信息区域 */}
              <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex-1">
                {/* 标签页 */}
                <div className="flex border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
                  {themeTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTheme(tab)}
                      className={`px-4 py-2 text-sm transition-colors relative
                        ${activeTheme === tab 
                          ? 'text-green-600 font-medium' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-green-50/50'
                        }
                      `}
                    >
                      {tab}
                      {activeTheme === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"></div>
                      )}
                    </button>
                  ))}
                </div>
                {/* 内容区域 */}
                <div className="p-4">
                  {activeTheme === '生态本底' && (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {ecologyContent.description}
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {ecologyContent.highlights.map((item, index) => (
                          <div key={index} className="bg-gradient-to-br from-green-50 to-white rounded-lg p-3 border border-green-100">
                            <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                            <div className="text-base font-semibold text-green-600">{item.value}</div>
                          </div>
                        ))}
                      </div>
                      {/* 数据统计卡片 */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {/* 生态系统构成 */}
                        <div className="bg-white border border-green-100 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">生态系统构成</h4>
                          <div className="flex items-center gap-4">
                            <div className="relative w-24 h-24">
                              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                {ecosystemData.reduce((acc, item, index) => {
                                  const startOffset = acc.offset
                                  const circumference = 2 * Math.PI * 40
                                  const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`
                                  acc.elements.push(
                                    <circle
                                      key={item.name}
                                      cx="50"
                                      cy="50"
                                      r="40"
                                      fill="none"
                                      stroke={item.color}
                                      strokeWidth="12"
                                      strokeDasharray={strokeDasharray}
                                      strokeDashoffset={-startOffset}
                                    />
                                  )
                                  acc.offset += (item.value / 100) * circumference
                                  return acc
                                }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                              </svg>
                            </div>
                            <div className="flex-1 space-y-1">
                              {ecosystemData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-gray-600">{item.name}</span>
                                  </div>
                                  <span className="font-medium text-gray-700">{item.value}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {/* 动物资源统计 */}
                        <div className="bg-white border border-green-100 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">动物资源统计</h4>
                          <div className="space-y-2">
                            {animalData.map((item) => (
                              <div key={item.name} className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 w-10">{item.name}</span>
                                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ 
                                      width: `${(item.value / Math.max(...animalData.map(d => d.value))) * 100}%`,
                                      backgroundColor: item.color 
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 w-8 text-right">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* 重点保护物种 */}
                        <div className="bg-white border border-green-100 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">重点保护物种</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-orange-50 rounded-lg p-3">
                              <div className="text-sm text-gray-500 mb-1">一级动物</div>
                              <div className="text-lg font-bold text-orange-600">{protectedSpeciesData.animals.level1}</div>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-3">
                              <div className="text-sm text-gray-500 mb-1">二级动物</div>
                              <div className="text-lg font-bold text-amber-600">{protectedSpeciesData.animals.level2}</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3">
                              <div className="text-sm text-gray-500 mb-1">一级植物</div>
                              <div className="text-lg font-bold text-green-600">{protectedSpeciesData.plants.level1}</div>
                            </div>
                            <div className="bg-emerald-50 rounded-lg p-3">
                              <div className="text-sm text-gray-500 mb-1">二级植物</div>
                              <div className="text-lg font-bold text-emerald-600">{protectedSpeciesData.plants.level2}</div>
                            </div>
                          </div>
                        </div>
                        {/* 植物资源统计 */}
                        <div className="bg-white border border-green-100 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">植物资源统计</h4>
                          <div className="space-y-2">
                            {plantData.map((item) => (
                              <div key={item.name} className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 w-10">{item.name}</span>
                                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ 
                                      width: `${(item.value / Math.max(...plantData.map(d => d.value))) * 100}%`,
                                      backgroundColor: item.color 
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 w-10 text-right">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTheme === '地质资源' && (
                    <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                      {/* 文本介绍 */}
                      <div className="text-gray-600 leading-relaxed">
                        <p className="mb-3">
                          石花洞风景名胜区构造发育，地层丰富。区内有北岭向斜、谷积山背斜、南大寨断裂等，地层主要包括元古代、古生代和新生代地层等；其中最重要的地质遗迹是岩溶洞穴群，发育于古生代寒武系和奥陶系地层中，包括石花洞和银狐洞等，区内其它地质遗迹景观还包括地表岩溶地貌、地层剖面、不整合面和部分褶皱构造景观等。
                        </p>
                        <p>
                          区内共计2大类3类20处地质遗迹，主要包括岩溶洞穴及其洞内次生化学沉积物，是以岩溶洞穴为主要保护对象的自然保护区。除各具特色的岩溶洞穴之外，还有形态独特的地貌遗迹景观，结构清晰的地层剖面及地质构造形迹。这些形态各异、成因迥然，丰富多彩的地质遗迹资源造就了石花洞地区独特的自然景观。
                        </p>
                      </div>
                      
                      {/* 地质资源表格 */}
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-green-50">
                            <tr>
                              <th className="border-b border-gray-200 px-3 py-2 text-left font-medium text-gray-700 w-24">大类</th>
                              <th className="border-b border-gray-200 px-3 py-2 text-left font-medium text-gray-700 w-28">类</th>
                              <th className="border-b border-gray-200 px-3 py-2 text-left font-medium text-gray-700">具体地质遗迹</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* 地貌景观大类 - 岩溶洞穴景观类 */}
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2 align-top" rowSpan={12}>地貌景观大类</td>
                              <td className="border-b border-gray-100 px-3 py-2 align-top" rowSpan={11}>岩溶洞穴景观类</td>
                              <td className="border-b border-gray-100 px-3 py-2">石花洞</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">银狐洞</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2">清风洞</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">孔水洞</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2">鸡毛洞</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">双鹿洞</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2">西园洞</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">他窖洞</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2">金花洞</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">鸿门洞</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2">大灰窑洞</td>
                            </tr>
                            {/* 地貌景观大类 - 砂岩地貌景观类 */}
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2 align-top">砂岩地貌景观类</td>
                              <td className="border-b border-gray-100 px-3 py-2">凤凰山砂岩地貌</td>
                            </tr>
                            {/* 地质剖面大类 - 地质剖面类 */}
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2 align-top" rowSpan={8}>地质剖面大类</td>
                              <td className="border-b border-gray-100 px-3 py-2 align-top" rowSpan={8}>地质剖面类</td>
                              <td className="border-b border-gray-100 px-3 py-2">佛子庄东青白口系龙山组波痕构造</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">佛子庄东青白口系景儿峪组与龙山组地层接触面</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2">北窖二叠系-三叠系双泉组与二叠系石盒子组平行接触面</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">中英水二叠系-三叠系双泉组地层剖面</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2">查儿村侏罗系南大岭组地层剖面</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">北窖侏罗系窑坡组地层剖面</td>
                            </tr>
                            <tr className="bg-white">
                              <td className="border-b border-gray-100 px-3 py-2">北窖侏罗系龙门组地层剖面</td>
                            </tr>
                            <tr className="bg-gray-50/50">
                              <td className="border-b border-gray-100 px-3 py-2">北窖侏罗系九龙山组地层剖面</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      {/* 地质资源图片 */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">地质资源展示</h4>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg flex items-center justify-center border border-amber-200">
                            <div className="text-center">
                              <Mountain className="w-8 h-8 text-amber-500 mx-auto mb-1" />
                              <span className="text-sm text-amber-700">石花洞</span>
                            </div>
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                            <div className="text-center">
                              <Mountain className="w-8 h-8 text-gray-500 mx-auto mb-1" />
                              <span className="text-sm text-gray-700">银狐洞</span>
                            </div>
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center border border-green-200">
                            <div className="text-center">
                              <Mountain className="w-8 h-8 text-green-500 mx-auto mb-1" />
                              <span className="text-sm text-green-700">清风洞</span>
                            </div>
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border border-blue-200">
                            <div className="text-center">
                              <Mountain className="w-8 h-8 text-blue-500 mx-auto mb-1" />
                              <span className="text-sm text-blue-700">孔水洞</span>
                            </div>
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center border border-purple-200">
                            <div className="text-center">
                              <Layers className="w-8 h-8 text-purple-500 mx-auto mb-1" />
                              <span className="text-sm text-purple-700">地层剖面</span>
                            </div>
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center border border-orange-200">
                            <div className="text-center">
                              <Mountain className="w-8 h-8 text-orange-500 mx-auto mb-1" />
                              <span className="text-sm text-orange-700">褶皱构造</span>
                            </div>
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-lg flex items-center justify-center border border-cyan-200">
                            <div className="text-center">
                              <Waves className="w-8 h-8 text-cyan-500 mx-auto mb-1" />
                              <span className="text-sm text-cyan-700">岩溶地貌</span>
                            </div>
                          </div>
                          <div className="aspect-square bg-gradient-to-br from-teal-100 to-teal-50 rounded-lg flex items-center justify-center border border-teal-200">
                            <div className="text-center">
                              <Mountain className="w-8 h-8 text-teal-500 mx-auto mb-1" />
                              <span className="text-sm text-teal-700">凤凰山</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTheme === '资源价值' && (
                    <div className="text-sm text-gray-700 leading-relaxed">
                      <p>石花洞风景名胜区具有重要的科学价值、美学价值和保护价值，是研究华北地区岩溶地质演化的重要场所。</p>
                      <div className="space-y-3 mt-4">
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Microscope className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">科学价值</div>
                            <div className="text-sm text-gray-600 mt-1">岩溶地质演化的天然实验室，具有重要的科学研究价值</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">美学价值</div>
                            <div className="text-sm text-gray-600 mt-1">洞穴景观独特，钟乳石形态各异，具有较高的观赏价值</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">保护价值</div>
                            <div className="text-sm text-gray-600 mt-1">珍稀地质遗迹资源，需要加强保护与管理</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTheme === '保护管理' && (
                    <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                      {/* 管理机构信息 */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                            <Settings className="w-3 h-3 text-white" />
                          </div>
                          管理机构信息
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex justify-between py-1 border-b border-green-100">
                            <span className="text-sm text-gray-500">机构名称</span>
                            <span className="text-sm text-gray-700 font-medium">北京石花洞风景名胜区管理处</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-green-100">
                            <span className="text-sm text-gray-500">机构性质</span>
                            <span className="text-sm text-gray-700">正处级事业单位</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-green-100">
                            <span className="text-sm text-gray-500">机构负责人</span>
                            <span className="text-sm text-gray-700">李文华</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-green-100">
                            <span className="text-sm text-gray-500">人员编制</span>
                            <span className="text-sm text-gray-700">15人</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-green-100">
                            <span className="text-sm text-gray-500">联系电话</span>
                            <span className="text-sm text-gray-700">010-12456785</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-green-100">
                            <span className="text-sm text-gray-500">机构地址</span>
                            <span className="text-sm text-gray-700">北京市房山区河北镇南车营村5号</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 管护体系 */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                            <Shield className="w-3 h-3 text-white" />
                          </div>
                          管护体系
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">建立了"局-站-点"三级管护体系，下设5个管护站，12个管护点</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">专业巡护人员45人</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">建立了12条固定巡护路线</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">每月开展2次全面巡护</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 规章制度 */}
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                            <FileText className="w-3 h-3 text-white" />
                          </div>
                          规章制度
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 bg-white rounded px-3 py-2">
                            <FileText className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">《北京石花洞风景名胜区管理办法》</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded px-3 py-2">
                            <FileText className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">《北京石花洞风景名胜区巡护管理细则》</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded px-3 py-2">
                            <FileText className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">《北京石花洞风景名胜区科研活动管理规定》</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white rounded px-3 py-2">
                            <FileText className="w-4 h-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">《北京石花洞风景名胜区防火应急预案》</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTheme === '规划公示' && (
                    <div className="text-sm text-gray-700 leading-relaxed">
                      <p>石花洞风景名胜区总体规划遵循"保护优先、科学利用"的原则，严格控制人类活动。</p>
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-700 mb-2">规划文件</h5>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="text-gray-600">石花洞风景名胜区总体规划（2020-2035年）</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="text-gray-600">石花洞地质遗迹保护规划</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTheme === '动态资讯' && (
                    <div className="text-sm text-gray-700 leading-relaxed">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:border-green-200 transition-colors cursor-pointer">
                          <div className="text-xs text-gray-400 whitespace-nowrap">2024-03-15</div>
                          <div className="text-sm text-gray-700">石花洞风景名胜区开展春季巡护专项行动</div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:border-green-200 transition-colors cursor-pointer">
                          <div className="text-xs text-gray-400 whitespace-nowrap">2024-03-10</div>
                          <div className="text-sm text-gray-700">新增红外相机监测点位5处</div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg hover:border-green-200 transition-colors cursor-pointer">
                          <div className="text-xs text-gray-400 whitespace-nowrap">2024-03-05</div>
                          <div className="text-sm text-gray-700">保护区生物多样性调查报告发布</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 右侧区域 */}
            <div className="col-span-4 flex flex-col gap-4">
              {/* 基本信息卡片 */}
              <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
                <div className="px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
                  <h3 className="text-base font-medium text-gray-700">保护地基本信息</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-sm text-gray-500">保护区名称</span>
                    <span className="text-sm text-gray-800 font-medium">石花洞风景名胜区</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-sm text-gray-500">保护区类型</span>
                    <span className="text-sm text-gray-700">省级风景名胜区</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-sm text-gray-500">总面积</span>
                    <span className="text-sm text-gray-700">36.5平方公里</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-sm text-gray-500">批准时间</span>
                    <span className="text-sm text-gray-700">2000年12月</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-50">
                    <span className="text-sm text-gray-500">主管部门</span>
                    <span className="text-sm text-gray-700">房山区园林绿化局</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-500">保护对象</span>
                    <span className="text-sm text-gray-700">岩溶洞穴地质遗迹</span>
                  </div>
                </div>
              </div>

              {/* 一张图展示平台卡片 */}
              <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
                <div className="px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
                  <h3 className="text-base font-medium text-gray-700">一张图展示平台</h3>
                </div>
                <div className="p-4">
                  <button className="w-full flex items-center justify-between text-green-600 hover:text-green-700 text-sm font-medium group py-2 px-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <span>查看完整展示平台</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* 快捷入口 */}
              <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden flex-1">
                <div className="px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
                  <h3 className="text-base font-medium text-gray-700">快捷入口</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                  {quickLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <button
                        key={link.id}
                        className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
                      >
                        <div className={`w-8 h-8 ${link.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-green-600 transition-colors">{link.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          )}
        </main>
      </div>
      
      {/* AI智能助手 - 全局悬浮 */}
      <AIChatBot />
    </div>
  )
}
