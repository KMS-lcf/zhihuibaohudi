// 保护地概况相关数据

export const themeTabs = ['生态本底', '地质资源', '资源价值', '保护管理', '规划公示', '动态资讯']

export const quickLinks = [
  { id: 1, name: '生物多样性', color: 'bg-green-500' },
  { id: 2, name: '巡护监管', color: 'bg-blue-500' },
  { id: 3, name: '地质监测', color: 'bg-amber-500' },
  { id: 4, name: '旅游管理', color: 'bg-purple-500' },
  { id: 5, name: '系统设置', color: 'bg-gray-500' }
]

export const ecologyData = {
  vegetation: { value: 92.3, unit: '%', label: '植被覆盖率', color: 'bg-green-500' },
  plants: { value: 1580, unit: '种', label: '植物物种', color: 'bg-sky-500' },
  animals: { value: 326, unit: '种', label: '动物物种', color: 'bg-orange-500' },
  protected: { value: 47, unit: '种', label: '保护物种', color: 'bg-red-500' }
}

export const ecologyContent = {
  title: '生态本底',
  description: '石花洞风景名胜区位于北京市房山区河北镇南车营村，是一个以岩溶洞穴景观为主的省级风景名胜区。保护区内生态环境优良，生物多样性丰富。',
  highlights: [
    { label: '森林覆盖率', value: '68.5%' },
    { label: '植物种类', value: '1580种' },
    { label: '动物种类', value: '326种' },
    { label: '保护物种', value: '47种' }
  ]
}
