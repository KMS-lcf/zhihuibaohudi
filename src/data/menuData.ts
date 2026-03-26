import {
  Map,
  Leaf,
  Shield,
  Mountain,
  CloudSun,
  Users,
  Camera,
  Settings
} from 'lucide-react'

export const menuData = [
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
          { id: 'survey-image', name: '视频监测' },
          { id: 'survey-quick', name: '物种速记' },
          { id: 'survey-photo', name: '拍照调查' },
          { id: 'survey-voice', name: '语音速记' }
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
    id: 'ecology',
    name: '生态环境',
    icon: CloudSun,
    children: [
      { id: 'ecology-realtime', name: '实时监测' },
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
