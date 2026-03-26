'use client'

import { useState } from 'react'
import { 
  Mountain, 
  Compass, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Layers, 
  Clock, 
  Star, 
  Shield, 
  CheckCircle 
} from 'lucide-react'
import { geologyCategories, geologyResources } from '@/data/geologyData'

// 地质资源展示界面组件
export function GeologyResourceInterface() {
  // 筛选状态
  const [filterMainCategory, setFilterMainCategory] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterSubCategory, setFilterSubCategory] = useState('')
  const [filterLevel, setFilterLevel] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
  // 选中的资源ID列表（用于控制地图显示）
  const [selectedResourceIds, setSelectedResourceIds] = useState<number[]>(geologyResources.map(r => r.id))
  
  // 详情弹窗
  const [selectedResource, setSelectedResource] = useState<typeof geologyResources[0] | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [detailTab, setDetailTab] = useState<'basic' | 'geology' | 'protection'>('basic')
  
  // 筛选后的资源列表
  const filteredResources = geologyResources.filter(resource => {
    if (filterMainCategory && resource.mainCategory !== filterMainCategory) return false
    if (filterCategory && resource.category !== filterCategory) return false
    if (filterSubCategory && resource.subCategory !== filterSubCategory) return false
    if (filterLevel && resource.level !== filterLevel) return false
    if (searchTerm && !resource.name.includes(searchTerm)) return false
    return true
  })
  
  // 获取当前筛选条件下的类选项
  const categoryOptions = filterMainCategory ? (geologyCategories.category as Record<string, string[]>)[filterMainCategory] || [] : []
  const subCategoryOptions = filterCategory ? (geologyCategories.subCategory as Record<string, string[]>)[filterCategory] || [] : []
  
  // 切换资源选中状态
  const toggleResourceSelection = (id: number) => {
    setSelectedResourceIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }
  
  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedResourceIds.length === filteredResources.length) {
      setSelectedResourceIds([])
    } else {
      setSelectedResourceIds(filteredResources.map(r => r.id))
    }
  }
  
  // 重置筛选条件
  const resetFilters = () => {
    setFilterMainCategory('')
    setFilterCategory('')
    setFilterSubCategory('')
    setFilterLevel('')
    setSearchTerm('')
  }
  
  // 打开详情弹窗
  const openDetailModal = (resource: typeof geologyResources[0]) => {
    setSelectedResource(resource)
    setCurrentImageIndex(0)
    setDetailTab('basic')
    setShowDetailModal(true)
  }
  
  // 地图点位坐标转换（简化处理）
  const mapPointPositions = [
    { top: '35%', left: '40%' },  // 石花洞
    { top: '30%', left: '25%' },  // 银狐洞
    { top: '45%', left: '50%' },  // 孔水洞
    { top: '50%', left: '35%' },  // 鸡毛洞
    { top: '55%', left: '55%' },  // 清风洞
  ]

  return (
    <div className="h-full relative">
      {/* 地图背景 */}
      <div className="absolute inset-0">
        {/* 使用上传的地图图片作为背景 */}
        <img
          src="/geology-resource-bg-new.png"
          alt="地质资源分布图"
          className="w-full h-full object-cover"
        />
        
        {/* 地质资源点位 */}
        {geologyResources.map((resource, index) => {
          const pos = mapPointPositions[index]
          const isVisible = selectedResourceIds.includes(resource.id)
          if (!isVisible) return null
          
          return (
            <div
              key={resource.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: pos.top, left: pos.left }}
              onClick={() => openDetailModal(resource)}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                  resource.level === '世界级' ? 'bg-yellow-500' :
                  resource.level === '国家级' ? 'bg-red-500' :
                  resource.level === '省级' ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  <Mountain className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-white/95 px-2 py-0.5 rounded shadow-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {resource.name}
                </div>
              </div>
            </div>
          )
        })}
        
        {/* 地图控件 */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center text-gray-600 hover:bg-gray-50">
            +
          </button>
          <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center text-gray-600 hover:bg-gray-50">
            -
          </button>
          <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center text-gray-600 hover:bg-gray-50">
            <Compass className="w-4 h-4" />
          </button>
        </div>
        
        {/* 比例尺 */}
        <div className="absolute left-4 bottom-4 flex items-center gap-2">
          <div className="w-16 h-1 bg-gray-400"></div>
          <span className="text-xs text-gray-500">1公里</span>
        </div>
        
        {/* 图例 */}
        <div className="absolute left-4 top-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <div className="text-sm font-medium text-gray-700 mb-2">图例</div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full border border-white"></div>
              <span className="text-xs text-gray-600">世界级</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full border border-white"></div>
              <span className="text-xs text-gray-600">国家级</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full border border-white"></div>
              <span className="text-xs text-gray-600">省级</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
              <span className="text-xs text-gray-600">市级</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 左侧资源清单卡片 */}
      <div className="absolute left-4 top-4 bottom-4 w-80 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg flex flex-col">
        {/* 筛选区域 */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Mountain className="w-5 h-5 text-green-600" />
            地质资源清单
          </h3>
          
          {/* 筛选器 */}
          <div className="space-y-2">
            <select 
              value={filterMainCategory}
              onChange={(e) => { setFilterMainCategory(e.target.value); setFilterCategory(''); setFilterSubCategory(''); }}
              className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 text-gray-600 bg-white"
            >
              <option value="">大类（全部）</option>
              {geologyCategories.mainCategory.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select 
              value={filterCategory}
              onChange={(e) => { setFilterCategory(e.target.value); setFilterSubCategory(''); }}
              className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 text-gray-600 bg-white"
              disabled={!filterMainCategory}
            >
              <option value="">类（全部）</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select 
              value={filterSubCategory}
              onChange={(e) => setFilterSubCategory(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 text-gray-600 bg-white"
              disabled={!filterCategory}
            >
              <option value="">亚类（全部）</option>
              {subCategoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded px-2 py-1.5 text-gray-600 bg-white"
            >
              <option value="">级别（全部）</option>
              {geologyCategories.level.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          
          {/* 搜索框 */}
          <div className="mt-2 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="请输入地质资源名称"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded pl-8 pr-3 py-1.5 text-gray-700 placeholder-gray-400"
            />
          </div>
          
          {/* 操作按钮 */}
          <div className="flex gap-2 mt-3">
            <button 
              onClick={resetFilters}
              className="flex-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            >
              重置
            </button>
            <button 
              onClick={toggleSelectAll}
              className="flex-1 px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              {selectedResourceIds.length === filteredResources.length ? '取消全选' : '全选'}
            </button>
          </div>
        </div>
        
        {/* 资源列表 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {filteredResources.map(resource => (
            <div 
              key={resource.id}
              className={`flex items-center gap-2 px-3 py-2 mb-1 rounded cursor-pointer transition-colors ${
                selectedResourceIds.includes(resource.id) ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
              }`}
              onClick={() => toggleResourceSelection(resource.id)}
            >
              <input 
                type="checkbox" 
                checked={selectedResourceIds.includes(resource.id)}
                onChange={() => {}}
                className="w-4 h-4 text-green-600 rounded border-gray-300"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 truncate">{resource.name}</span>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                resource.level === '世界级' ? 'bg-yellow-100 text-yellow-700' :
                resource.level === '国家级' ? 'bg-red-100 text-red-700' :
                resource.level === '省级' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {resource.level}
              </span>
            </div>
          ))}
          
          {filteredResources.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              暂无匹配的地质资源
            </div>
          )}
        </div>
        
        {/* 底部统计 */}
        <div className="p-3 border-t border-gray-100 text-center">
          <span className="text-sm text-gray-500">
            共 {geologyResources.length} 个地质资源，当前显示 {filteredResources.length} 个
          </span>
        </div>
      </div>
      
      {/* 详情弹窗 */}
      {showDetailModal && selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-lg shadow-xl w-[1100px] max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
              <span className="text-lg font-semibold text-gray-800">{selectedResource.name}</span>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-500 hover:text-gray-700 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex h-[calc(90vh-52px)]">
              {/* 左侧图片轮播区 */}
              <div className="w-[55%] p-4 bg-gray-900 flex items-center justify-center relative">
                <img 
                  src={selectedResource.images[currentImageIndex]} 
                  alt={selectedResource.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                
                {/* 图片切换按钮 */}
                {selectedResource.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedResource.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-500/60 rounded-full flex items-center justify-center text-white hover:bg-gray-500/80 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setCurrentImageIndex(prev => prev === selectedResource.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-500/60 rounded-full flex items-center justify-center text-white hover:bg-gray-500/80 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* 右侧详细信息区 */}
              <div className="w-[45%] flex flex-col bg-white border-l border-gray-200">
                {/* 标签页 */}
                <div className="flex border-b border-gray-200 px-4 pt-3">
                  {[
                    { id: 'basic', name: '基本信息' },
                    { id: 'geology', name: '地质特征' },
                    { id: 'protection', name: '保护现状' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setDetailTab(tab.id as 'basic' | 'geology' | 'protection')}
                      className={`px-4 py-2 text-sm font-medium relative ${
                        detailTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.name}
                      {detailTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                      )}
                    </button>
                  ))}
                </div>
                
                {/* 内容区域 */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                  {/* 基本信息标签页 */}
                  {detailTab === 'basic' && (
                    <div className="space-y-4">
                      {/* 两列布局的基本信息 */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                          <span className="text-gray-500">遗迹点编号</span>
                          <p className="text-gray-800 font-medium mt-0.5">{selectedResource.code}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">野外编号</span>
                          <p className="text-gray-800 font-medium mt-0.5">{selectedResource.fieldCodes.join('、')}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">集中区号</span>
                          <p className="text-gray-800 font-medium mt-0.5">{selectedResource.areaCode}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">遗迹名称</span>
                          <p className="text-gray-800 font-medium mt-0.5">{selectedResource.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">经度</span>
                          <p className="text-gray-800 font-medium mt-0.5">{selectedResource.lng}°</p>
                        </div>
                        <div>
                          <span className="text-gray-500">纬度</span>
                          <p className="text-gray-800 font-medium mt-0.5">{selectedResource.lat}°</p>
                        </div>
                        <div>
                          <span className="text-gray-500">海拔</span>
                          <p className="text-gray-800 font-medium mt-0.5">{selectedResource.altitude}m</p>
                        </div>
                        <div>
                          <span className="text-gray-500">所属景区</span>
                          <p className="text-gray-800 font-medium mt-0.5">{selectedResource.parkName}</p>
                        </div>
                      </div>
                      
                      {/* 地理位置 */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-500">地理位置</span>
                        </div>
                        <p className="text-gray-800 text-sm mt-1 ml-6">{selectedResource.location}</p>
                      </div>
                      
                      {/* 出露范围 */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Layers className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-500">出露范围</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1 ml-6 leading-relaxed">{selectedResource.exposureRange}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* 地质特征标签页 */}
                  {detailTab === 'geology' && (
                    <div className="space-y-4">
                      {/* 遗迹类型 */}
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mountain className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 font-medium">遗迹类型</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1 ml-6">{selectedResource.type} / {selectedResource.subCategory}</p>
                      </div>
                      
                      {/* 地质时代 */}
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 font-medium">地质时代</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1 ml-6 leading-relaxed">{selectedResource.geoEra}</p>
                      </div>
                      
                      {/* 地质体岩性 */}
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mountain className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 font-medium">地质体岩性</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1 ml-6 leading-relaxed">{selectedResource.lithology}</p>
                      </div>
                      
                      {/* 地质构造 */}
                      <div>
                        <div className="text-sm">
                          <span className="text-gray-700 font-medium">地质构造</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1 leading-relaxed">{selectedResource.structure}</p>
                      </div>
                      
                      {/* 地质遗迹特征描述 */}
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 font-medium">地质遗迹特征描述</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1 ml-6 leading-relaxed">{selectedResource.features}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* 保护现状标签页 */}
                  {detailTab === 'protection' && (
                    <div className="space-y-5">
                      {/* 保护与利用现状 */}
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 font-medium">保护与利用现状</span>
                        </div>
                        <div className="mt-2 ml-6 space-y-2 text-sm text-gray-700">
                          <div className="flex gap-2">
                            <span className="text-gray-400">•</span>
                            <span>保护体系完善：{selectedResource.protectionStatus}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-400">•</span>
                            <span>分区保护严格：核心区实行严格保护，禁止游客进入</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-400">•</span>
                            <span>监测系统先进：安装了洞穴环境监测设备，实时监测温度、湿度、CO₂浓度等指标</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="text-gray-400">•</span>
                            <span>法规保障健全：依据《地质遗迹保护管理规定》等法律法规进行保护管理</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 科学性/稀有性/完整性/观赏性 */}
                      <div>
                        <div className="text-sm text-gray-700 font-medium mb-3">四维评价</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-sm font-medium text-gray-700 mb-1">科学性</div>
                            <p className="text-xs text-gray-600 leading-relaxed">{selectedResource.scientificValue}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-sm font-medium text-gray-700 mb-1">稀有性</div>
                            <p className="text-xs text-gray-600 leading-relaxed">{selectedResource.rarity}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-sm font-medium text-gray-700 mb-1">完整性</div>
                            <p className="text-xs text-gray-600 leading-relaxed">{selectedResource.integrity}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-sm font-medium text-gray-700 mb-1">观赏性</div>
                            <p className="text-xs text-gray-600 leading-relaxed">{selectedResource.ornamentalValue}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* 保存现状 */}
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 font-medium">保存现状</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1 ml-6 leading-relaxed">{selectedResource.preservationStatus}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
