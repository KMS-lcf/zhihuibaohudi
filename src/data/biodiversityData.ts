// 生物多样性相关数据
import { Leaf, Database, ClipboardCheck, Camera, Target, Image } from 'lucide-react'

// 年份数据
export const yearOptions = ['全部', '2024', '2023', '2022', '2021', '2020']

// 核心指标数据
export const biodiversityCoreData = [
  { id: 1, label: '发现物种', value: 1586, unit: '种', icon: Leaf, color: 'from-green-400 to-green-600' },
  { id: 2, label: '采集数据', value: 286543, unit: '条', icon: Database, color: 'from-blue-400 to-blue-600' },
  { id: 3, label: '调查专项', value: 127, unit: '项', icon: ClipboardCheck, color: 'from-purple-400 to-purple-600' },
  { id: 4, label: '监测设备', value: 156, unit: '套', icon: Camera, color: 'from-orange-400 to-orange-600' },
  { id: 5, label: '调查里程', value: 2847.5, unit: 'km', icon: Target, color: 'from-cyan-400 to-cyan-600' },
  { id: 6, label: '采集图像', value: 45862, unit: '张', icon: Image, color: 'from-pink-400 to-pink-600' }
]

// 植物资源统计数据
export const plantResourceData = [
  { name: '被子植物', value: 856, color: '#22c55e' },
  { name: '裸子植物', value: 45, color: '#16a34a' },
  { name: '蕨类植物', value: 128, color: '#15803d' },
  { name: '苔藓植物', value: 89, color: '#166534' },
  { name: '真菌', value: 67, color: '#14532d' }
]

// 动物资源统计数据
export const animalResourceData = [
  { name: '鸟类', value: 256, color: '#3b82f6' },
  { name: '昆虫', value: 389, color: '#f59e0b' },
  { name: '兽类', value: 42, color: '#ef4444' },
  { name: '两栖类', value: 35, color: '#8b5cf6' },
  { name: '鱼类', value: 53, color: '#06b6d4' }
]

// 保护物种统计数据
export const protectedSpeciesData2 = [
  { category: '国家一级', plants: 5, animals: 8 },
  { category: '国家二级', plants: 18, animals: 26 },
  { category: '北京保护', plants: 32, animals: 45 }
]

// 优势物种统计数据 - 植物
export const dominantPlantData = [
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
export const dominantAnimalData = [
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
export const typicalSpeciesData = [
  { name: '褐马鸡', count: 89, trend: 'up' },
  { name: '金钱豹', count: 23, trend: 'stable' },
  { name: '黑鹳', count: 45, trend: 'up' },
  { name: '大鲵', count: 156, trend: 'up' },
  { name: '红腹锦鸡', count: 78, trend: 'down' },
  { name: '勺鸡', count: 34, trend: 'stable' }
]

// 物种分布点位
export const speciesPoints = [
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
export const infraredCameraPoints = [
  { id: 1, top: '20%', left: '35%' },
  { id: 2, top: '45%', left: '25%' },
  { id: 3, top: '65%', left: '55%' },
  { id: 4, top: '35%', left: '65%' }
]

export const acousticMonitorPoints = [
  { id: 1, top: '30%', left: '50%' },
  { id: 2, top: '55%', left: '40%' }
]

// 物种分类导航
export const speciesCategories = [
  { id: 'plant', name: '植物', count: 486 },
  { id: 'bird', name: '鸟类', count: 256 },
  { id: 'mammal', name: '兽类', count: 107 },
  { id: 'reptile', name: '两爬', count: 73 },
  { id: 'insect', name: '昆虫', count: 389 },
  { id: 'fish', name: '鱼类', count: 53 },
  { id: 'fungi', name: '大型真菌', count: 67 }
]

// 物种列表数据
export const speciesListData = [
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
export const ecosystemData = [
  { name: '森林', value: 68.5, color: '#4caf50' },
  { name: '湿地', value: 15.2, color: '#2196f3' },
  { name: '洞穴', value: 8.3, color: '#9c27b0' },
  { name: '其他', value: 8.0, color: '#9e9e9e' }
]

// 动物资源数据
export const animalData = [
  { name: '鸟类', value: 256, color: '#4caf50' },
  { name: '兽类', value: 26, color: '#ff9800' },
  { name: '两栖', value: 69, color: '#2196f3' },
  { name: '鱼类', value: 78, color: '#00bcd4' },
  { name: '昆虫', value: 567, color: '#9c27b0' }
]

// 保护物种数据
export const protectedSpeciesData = {
  animals: { level1: 5, level2: 18 },
  plants: { level1: 5, level2: 15 }
}

// 植物资源数据
export const plantData = [
  { name: '被子', value: 1200, color: '#4caf50' },
  { name: '裸子', value: 50, color: '#8bc34a' },
  { name: '蕨类', value: 180, color: '#cddc39' },
  { name: '苔藓', value: 100, color: '#ffeb3b' },
  { name: '真菌', value: 50, color: '#ffc107' }
]

// 调查项目列表数据
export const surveyProjectData = [
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
export const surveyStatusOptions = ['全部', '未开始', '进行中', '已完成', '已暂停']
