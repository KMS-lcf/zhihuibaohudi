'use client'

import { useState } from 'react'
import { 
  Map, 
  List, 
  LayoutGrid, 
  ChevronUp, 
  ChevronDown, 
  CheckSquare, 
  Plus, 
  Upload, 
  Trash2, 
  ArrowUpDown, 
  Eye, 
  Camera, 
  X, 
  FileText, 
  BarChart3, 
  Edit2, 
  ArrowLeft, 
  ArrowRight, 
  ImageOff, 
  Search, 
  Layers, 
  Target, 
  Mountain, 
  TreePine, 
  Settings, 
  Save, 
  History
} from 'lucide-react'
import { surveyProjects, cameraModels, infraredCameraDeploymentData } from '@/data/infraredCameraData'

// 相机布设界面组件
export function InfraredCameraDeployment() {
  const [viewMode, setViewMode] = useState<'map' | 'table' | 'card'>('map')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState<typeof infraredCameraDeploymentData[0] | null>(null)
  const [showPointModal, setShowPointModal] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'add' | 'edit'>('add')
  const [isSelectingPoint, setIsSelectingPoint] = useState(false)
  const [searchType, setSearchType] = useState<'point' | 'camera' | 'time' | 'person'>('point')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  
  // 图层控制
  const [layers, setLayers] = useState({
    boundary: true,
    vegetation: false,
    grid: false
  })
  
  // 筛选条件
  const [filters, setFilters] = useState({
    pointCode: '',
    cameraId: '',
    status: '',
    project: '',
    deployTime: '',
    deployer: ''
  })
  
  // 勾选状态
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  
  // 表单数据
  const [formData, setFormData] = useState({
    pointCode: '',
    cameraId: '',
    cameraModel: '',
    storageCard: '',
    iotCard: '',
    lng: '',
    lat: '',
    altitude: '',
    projectId: '',
    deployTime: '',
    deployer: '当前用户',
    surveyArea: '',
    smallPlace: '',
    sampleArea: '',
    reserveName: '石花洞风景名胜区',
    terrain: '',
    slopePosition: '',
    slopeAspect: '',
    slopeDegree: '',
    waterType: '',
    waterDistance: '',
    vegetationType: '',
    habitatFeature: '',
    treeHeight: '',
    treeDbh: '',
    forestOrigin: '',
    dominantTreeSpecies: '',
    shrubHeight: '',
    shrubType: '',
    shrubCoverage: '',
    dominantShrubSpecies: '',
    herbCoverage: '',
    herbType: '',
    dominantHerbSpecies: '',
    assistant: '',
    remark: '',
    photos: [] as string[]
  })
  
  // 轮播索引
  const [carouselIndex, setCarouselIndex] = useState(0)
  
  // 相机编号模糊搜索
  const [cameraSearchResults, setCameraSearchResults] = useState<typeof cameraModels>([])
  const [showCameraDropdown, setShowCameraDropdown] = useState(false)
  
  // 处理相机编号搜索
  const handleCameraSearch = (value: string) => {
    setFormData({...formData, cameraId: value})
    if (value) {
      const results = cameraModels.filter(c => c.id.toLowerCase().includes(value.toLowerCase()) || c.model.toLowerCase().includes(value.toLowerCase()))
      setCameraSearchResults(results)
      setShowCameraDropdown(true)
    } else {
      setCameraSearchResults([])
      setShowCameraDropdown(false)
    }
  }
  
  // 选择相机
  const selectCamera = (camera: typeof cameraModels[0]) => {
    setFormData({
      ...formData,
      cameraId: camera.id,
      cameraModel: camera.model,
      storageCard: camera.storageCard,
      iotCard: camera.iotCard
    })
    setShowCameraDropdown(false)
  }
  
  // 处理勾选
  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id))
      setSelectAll(false)
    } else {
      setSelectedIds([...selectedIds, id])
      if (selectedIds.length + 1 === infraredCameraDeploymentData.length) {
        setSelectAll(true)
      }
    }
  }
  
  // 全选/取消全选
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([])
      setSelectAll(false)
    } else {
      setSelectedIds(infraredCameraDeploymentData.map(p => p.id))
      setSelectAll(true)
    }
  }
  
  // 打开新增抽屉
  const openAddDrawer = () => {
    setDrawerMode('add')
    setFormData({
      pointCode: '',
      cameraId: '',
      cameraModel: '',
      storageCard: '',
      iotCard: '',
      lng: '',
      lat: '',
      altitude: '',
      projectId: '',
      deployTime: '',
      deployer: '当前用户',
      surveyArea: '',
      smallPlace: '',
      sampleArea: '',
      reserveName: '石花洞风景名胜区',
      terrain: '',
      slopePosition: '',
      slopeAspect: '',
      slopeDegree: '',
      waterType: '',
      waterDistance: '',
      vegetationType: '',
      habitatFeature: '',
      treeHeight: '',
      treeDbh: '',
      forestOrigin: '',
      dominantTreeSpecies: '',
      shrubHeight: '',
      shrubType: '',
      shrubCoverage: '',
      dominantShrubSpecies: '',
      herbCoverage: '',
      herbType: '',
      dominantHerbSpecies: '',
      assistant: '',
      remark: '',
      photos: []
    })
    setShowDrawer(true)
  }
  
  // 打开编辑抽屉
  const openEditDrawer = (point: typeof infraredCameraDeploymentData[0]) => {
    setDrawerMode('edit')
    setFormData({
      pointCode: point.pointCode,
      cameraId: point.cameraId,
      cameraModel: point.cameraModel,
      storageCard: point.storageCard,
      iotCard: point.iotCard,
      lng: point.lng.toString(),
      lat: point.lat.toString(),
      altitude: point.altitude.toString(),
      projectId: point.projectId.toString(),
      deployTime: point.deployTime,
      deployer: point.deployer,
      surveyArea: point.surveyArea,
      smallPlace: point.smallPlace,
      sampleArea: point.sampleArea,
      reserveName: point.reserveName,
      terrain: point.terrain,
      slopePosition: point.slopePosition,
      slopeAspect: point.slopeAspect,
      slopeDegree: point.slopeDegree,
      waterType: point.waterType,
      waterDistance: point.waterDistance,
      vegetationType: point.vegetationType,
      habitatFeature: point.habitatFeature,
      treeHeight: point.treeHeight.toString(),
      treeDbh: point.treeDbh.toString(),
      forestOrigin: point.forestOrigin,
      dominantTreeSpecies: point.dominantTreeSpecies,
      shrubHeight: point.shrubHeight,
      shrubType: point.shrubType,
      shrubCoverage: point.shrubCoverage,
      dominantShrubSpecies: point.dominantShrubSpecies,
      herbCoverage: point.herbCoverage,
      herbType: point.herbType,
      dominantHerbSpecies: point.dominantHerbSpecies,
      assistant: point.assistant,
      remark: point.remark,
      photos: point.photos
    })
    setShowDrawer(true)
  }
  
  // 地图点击处理
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSelectingPoint) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const lng = (115.93 + (x / rect.width) * 0.05).toFixed(4)
      const lat = (39.77 + (1 - y / rect.height) * 0.04).toFixed(4)
      const altitude = Math.floor(350 + Math.random() * 200)
      setFormData({
        ...formData,
        lng: lng,
        lat: lat,
        altitude: altitude.toString(),
        surveyArea: '北京市房山区河北镇南车营村'
      })
      setIsSelectingPoint(false)
      openAddDrawer()
    }
  }
  
  // 模式切换按钮组件
  const ModeSwitchButtons = () => (
    <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
      <button
        onClick={() => setViewMode('map')}
        title="地图模式"
        className={`p-2 rounded-md transition-all ${
          viewMode === 'map' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <Map className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('table')}
        title="列表模式"
        className={`p-2 rounded-md transition-all ${
          viewMode === 'table' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        onClick={() => setViewMode('card')}
        title="卡片模式"
        className={`p-2 rounded-md transition-all ${
          viewMode === 'card' ? 'bg-green-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
    </div>
  )
  
  // 筛选条件组件
  const FilterBar = () => (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500">点位编号</label>
        <input
          type="text"
          value={filters.pointCode}
          onChange={(e) => setFilters({...filters, pointCode: e.target.value})}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md w-28 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="请输入"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500">相机编号</label>
        <input
          type="text"
          value={filters.cameraId}
          onChange={(e) => setFilters({...filters, cameraId: e.target.value})}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md w-28 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="请输入"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-500">监测状态</label>
        <select
          value={filters.status}
          onChange={(e) => setFilters({...filters, status: e.target.value})}
          className="px-2 py-1 text-sm border border-gray-200 rounded-md w-28 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="">全部</option>
          <option value="监测中">监测中</option>
          <option value="已完成">已完成</option>
        </select>
      </div>
      {showFilters && (
        <>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">所属项目</label>
            <select
              value={filters.project}
              onChange={(e) => setFilters({...filters, project: e.target.value})}
              className="px-2 py-1 text-sm border border-gray-200 rounded-md w-40 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="">全部</option>
              {surveyProjects.map(p => (
                <option key={p.id} value={p.id.toString()}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">布设时间</label>
            <input
              type="date"
              value={filters.deployTime}
              onChange={(e) => setFilters({...filters, deployTime: e.target.value})}
              className="px-2 py-1 text-sm border border-gray-200 rounded-md w-32 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">布设人</label>
            <input
              type="text"
              value={filters.deployer}
              onChange={(e) => setFilters({...filters, deployer: e.target.value})}
              className="px-2 py-1 text-sm border border-gray-200 rounded-md w-28 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="请输入"
            />
          </div>
        </>
      )}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-1 px-2 py-1 text-sm text-green-600 hover:bg-green-50 rounded-md"
      >
        {showFilters ? '收起' : '展开'}
        {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>
  )
  
  // 操作按钮组件
  const ActionBar = ({ showMapView = false }: { showMapView?: boolean }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={handleSelectAll}
          className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border transition-colors ${
            selectAll ? 'bg-green-50 border-green-300 text-green-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          全选
        </button>
        <button
          onClick={openAddDrawer}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          新增
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
          <Upload className="w-4 h-4" />
          导入
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
          <Trash2 className="w-4 h-4" />
          删除
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          排序
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
          <Eye className="w-4 h-4" />
          显示
        </button>
      </div>
      {showMapView && (
        <button
          onClick={() => setViewMode('map')}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Map className="w-4 h-4" />
          地图查看
        </button>
      )}
    </div>
  )
  
  // 点位详情弹窗
  const PointDetailModal = () => {
    if (!selectedPoint) return null
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowPointModal(false)}>
        {/* 16:9 宽高比的弹窗 */}
        <div 
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          style={{ width: '80vw', maxWidth: '1280px', aspectRatio: '16/9' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-green-50">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-green-600" />
              <span className="text-base font-medium text-gray-700">{selectedPoint.pointCode}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                selectedPoint.status === '监测中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}>{selectedPoint.status}</span>
            </div>
            <button onClick={() => setShowPointModal(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex h-[calc(100%-52px)]">
            {/* 左侧信息区域 */}
            <div className="w-72 border-r border-gray-200 p-4 flex flex-col">
              {/* 基本信息 */}
              <div className="flex-shrink-0">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  基本信息
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">点位编号</span>
                    <span className="text-gray-700">{selectedPoint.pointCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">经度</span>
                    <span className="text-gray-700">{selectedPoint.lng}°E</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">纬度</span>
                    <span className="text-gray-700">{selectedPoint.lat}°N</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">海拔</span>
                    <span className="text-gray-700">{selectedPoint.altitude}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">布设时间</span>
                    <span className="text-gray-700">{selectedPoint.deployTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">布设人</span>
                    <span className="text-gray-700">{selectedPoint.deployer}</span>
                  </div>
                </div>
              </div>
              
              {/* 统计信息 */}
              <div className="mt-4 flex-shrink-0">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  统计信息
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">{selectedPoint.totalPhotos.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">拍摄照片数</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{selectedPoint.validPhotos.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">有效照片数</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-600">{selectedPoint.speciesCount}</div>
                    <div className="text-xs text-gray-500">物种数</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-sm font-bold text-purple-600 truncate">{selectedPoint.dominantSpecies}</div>
                    <div className="text-xs text-gray-500">优势物种</div>
                  </div>
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowPointModal(false)
                    openEditDrawer(selectedPoint)
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  编辑点位信息
                </button>
              </div>
            </div>
            
            {/* 右侧图片展示区域 */}
            <div className="flex-1 p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">已鉴定图像</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={carouselIndex === 0}
                  >
                    <ArrowLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-sm text-gray-500">{carouselIndex + 1} / {selectedPoint.identifiedImages.length}</span>
                  <button
                    onClick={() => setCarouselIndex(Math.min(selectedPoint.identifiedImages.length - 1, carouselIndex + 1))}
                    className="p-1 hover:bg-gray-200 rounded"
                    disabled={carouselIndex >= selectedPoint.identifiedImages.length - 1}
                  >
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {selectedPoint.identifiedImages.length > 0 ? (
                <div className="relative bg-gray-200 rounded-lg h-[calc(100%-40px)] flex items-center justify-center">
                  <div className="text-center">
                    <ImageOff className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-500 text-sm mb-2">图像预览</p>
                    <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1.5 rounded-lg">
                      <div className="text-sm font-medium">{selectedPoint.identifiedImages[carouselIndex].species}</div>
                      <div className="text-xs text-gray-300 italic">{selectedPoint.identifiedImages[carouselIndex].latinName}</div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      {selectedPoint.identifiedImages[carouselIndex].time}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-200 rounded-lg h-[calc(100%-40px)] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <ImageOff className="w-12 h-12 mx-auto mb-2" />
                    <p>暂无已鉴定图像</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // 新增/编辑抽屉
  const PointDrawer = () => (
    <div className={`fixed inset-0 bg-black/30 z-50 transition-opacity ${showDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className={`absolute right-0 top-0 h-full w-[600px] bg-white shadow-xl transform transition-transform ${showDrawer ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 抽屉头部 */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-green-50">
          <span className="text-base font-medium text-gray-700">{drawerMode === 'add' ? '新增点位' : '编辑点位'}</span>
          <button onClick={() => setShowDrawer(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* 抽屉内容 */}
        <div className="p-4 h-[calc(100vh-120px)] overflow-y-auto">
          {/* 基本信息 */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-600" />
              基本信息
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">点位编号 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.pointCode}
                  onChange={(e) => setFormData({...formData, pointCode: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入"
                />
              </div>
              <div className="relative">
                <label className="text-xs text-gray-500 mb-1 block">相机编号 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.cameraId}
                  onChange={(e) => handleCameraSearch(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入或选择"
                />
                {showCameraDropdown && cameraSearchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-1 max-h-32 overflow-y-auto">
                    {cameraSearchResults.map(c => (
                      <div
                        key={c.id}
                        onClick={() => selectCamera(c)}
                        className="px-2 py-1.5 text-sm hover:bg-green-50 cursor-pointer"
                      >
                        {c.id} - {c.model}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">相机型号</label>
                <input
                  type="text"
                  value={formData.cameraModel}
                  onChange={(e) => setFormData({...formData, cameraModel: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
                  placeholder="自动填充"
                  readOnly
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">储存卡编号</label>
                <input
                  type="text"
                  value={formData.storageCard}
                  onChange={(e) => setFormData({...formData, storageCard: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">物联网卡卡号</label>
                <input
                  type="text"
                  value={formData.iotCard}
                  onChange={(e) => setFormData({...formData, iotCard: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">经度 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.lng}
                  onChange={(e) => setFormData({...formData, lng: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
                  placeholder="地图选点获取"
                  readOnly
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">纬度 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.lat}
                  onChange={(e) => setFormData({...formData, lat: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
                  placeholder="地图选点获取"
                  readOnly
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">海拔</label>
                <input
                  type="text"
                  value={formData.altitude}
                  onChange={(e) => setFormData({...formData, altitude: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
                  placeholder="自动获取"
                  readOnly
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">所属项目 <span className="text-red-500">*</span></label>
                <select
                  value={formData.projectId}
                  onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  {surveyProjects.map(p => (
                    <option key={p.id} value={p.id.toString()}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">布设时间 <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={formData.deployTime}
                  onChange={(e) => setFormData({...formData, deployTime: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">布设人 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.deployer}
                  onChange={(e) => setFormData({...formData, deployer: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">调查区域</label>
                <input
                  type="text"
                  value={formData.surveyArea}
                  onChange={(e) => setFormData({...formData, surveyArea: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
                  placeholder="根据经纬度自动生成"
                  readOnly
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">小地名</label>
                <input
                  type="text"
                  value={formData.smallPlace}
                  onChange={(e) => setFormData({...formData, smallPlace: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">监测样区名</label>
                <input
                  type="text"
                  value={formData.sampleArea}
                  onChange={(e) => setFormData({...formData, sampleArea: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">自然保护地名</label>
                <input
                  type="text"
                  value={formData.reserveName}
                  onChange={(e) => setFormData({...formData, reserveName: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
          
          {/* 地形信息 */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Mountain className="w-4 h-4 text-green-600" />
              地形信息
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">地形</label>
                <select
                  value={formData.terrain}
                  onChange={(e) => setFormData({...formData, terrain: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="山地">山地</option>
                  <option value="丘陵">丘陵</option>
                  <option value="洼地">洼地</option>
                  <option value="平原">平原</option>
                  <option value="高原">高原</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">坡位</label>
                <select
                  value={formData.slopePosition}
                  onChange={(e) => setFormData({...formData, slopePosition: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="脊">脊</option>
                  <option value="上部">上部</option>
                  <option value="中部">中部</option>
                  <option value="下部">下部</option>
                  <option value="谷地">谷地</option>
                  <option value="平地">平地</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">坡向</label>
                <select
                  value={formData.slopeAspect}
                  onChange={(e) => setFormData({...formData, slopeAspect: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="无坡向">无坡向</option>
                  <option value="北">北</option>
                  <option value="南">南</option>
                  <option value="东">东</option>
                  <option value="东北">东北</option>
                  <option value="西北">西北</option>
                  <option value="西南">西南</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">坡度</label>
                <select
                  value={formData.slopeDegree}
                  onChange={(e) => setFormData({...formData, slopeDegree: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="平地(0°)">平地(0°)</option>
                  <option value="缓坡(0-5°)">缓坡(0-5°)</option>
                  <option value="中坡(6-14°)">中坡(6-14°)</option>
                  <option value="陡坡(15-26°)">陡坡(15-26°)</option>
                  <option value="急坡(27-45°)">急坡(27-45°)</option>
                  <option value="急陡坡(>45°)">急陡坡(&gt;45°)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">水样类型</label>
                <select
                  value={formData.waterType}
                  onChange={(e) => setFormData({...formData, waterType: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="泉眼">泉眼</option>
                  <option value="溪流">溪流</option>
                  <option value="河流">河流</option>
                  <option value="池塘">池塘</option>
                  <option value="湖泊">湖泊</option>
                  <option value="水库">水库</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">水源距离</label>
                <select
                  value={formData.waterDistance}
                  onChange={(e) => setFormData({...formData, waterDistance: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="＜100m">＜100m</option>
                  <option value="≥100m">≥100m</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 植被信息 */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <TreePine className="w-4 h-4 text-green-600" />
              植被信息
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">植被类型</label>
                <select
                  value={formData.vegetationType}
                  onChange={(e) => setFormData({...formData, vegetationType: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="针叶林">针叶林</option>
                  <option value="阔叶林">阔叶林</option>
                  <option value="混交林">混交林</option>
                  <option value="灌丛">灌丛</option>
                  <option value="草原">草原</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">生境特点</label>
                <input
                  type="text"
                  value={formData.habitatFeature}
                  onChange={(e) => setFormData({...formData, habitatFeature: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">乔木层平均高度(m)</label>
                <input
                  type="number"
                  value={formData.treeHeight}
                  onChange={(e) => setFormData({...formData, treeHeight: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">乔木层平均胸径(cm)</label>
                <input
                  type="number"
                  value={formData.treeDbh}
                  onChange={(e) => setFormData({...formData, treeDbh: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">森林起源</label>
                <select
                  value={formData.forestOrigin}
                  onChange={(e) => setFormData({...formData, forestOrigin: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="原始">原始</option>
                  <option value="次生">次生</option>
                  <option value="人工">人工</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">灌木层平均高度</label>
                <select
                  value={formData.shrubHeight}
                  onChange={(e) => setFormData({...formData, shrubHeight: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="0-1m">0-1m</option>
                  <option value="1-3m">1-3m</option>
                  <option value="3-5m">3-5m</option>
                  <option value=">5m">&gt;5m</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">乔木层优势树种</label>
                <textarea
                  value={formData.dominantTreeSpecies}
                  onChange={(e) => setFormData({...formData, dominantTreeSpecies: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={2}
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">灌木类型</label>
                <select
                  value={formData.shrubType}
                  onChange={(e) => setFormData({...formData, shrubType: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="常绿">常绿</option>
                  <option value="落叶">落叶</option>
                  <option value="竹从">竹从</option>
                  <option value="混合">混合</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">灌木层盖度</label>
                <select
                  value={formData.shrubCoverage}
                  onChange={(e) => setFormData({...formData, shrubCoverage: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="0-24%">0-24%</option>
                  <option value="25-49%">25-49%</option>
                  <option value="50-74%">50-74%</option>
                  <option value="75-100%">75-100%</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">灌木层优势物种</label>
                <textarea
                  value={formData.dominantShrubSpecies}
                  onChange={(e) => setFormData({...formData, dominantShrubSpecies: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={2}
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">草本层盖度</label>
                <select
                  value={formData.herbCoverage}
                  onChange={(e) => setFormData({...formData, herbCoverage: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="0-24%">0-24%</option>
                  <option value="25-49%">25-49%</option>
                  <option value="50-74%">50-74%</option>
                  <option value="75-100%">75-100%</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">草本类型</label>
                <select
                  value={formData.herbType}
                  onChange={(e) => setFormData({...formData, herbType: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="">请选择</option>
                  <option value="禾本为主">禾本为主</option>
                  <option value="非禾本为主">非禾本为主</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-1 block">草本层优势物种</label>
                <textarea
                  value={formData.dominantHerbSpecies}
                  onChange={(e) => setFormData({...formData, dominantHerbSpecies: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={2}
                  placeholder="请输入"
                />
              </div>
            </div>
          </div>
          
          {/* 其他信息 */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-green-600" />
              其他信息
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">协查人员</label>
                <textarea
                  value={formData.assistant}
                  onChange={(e) => setFormData({...formData, assistant: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={2}
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">备注</label>
                <textarea
                  value={formData.remark}
                  onChange={(e) => setFormData({...formData, remark: e.target.value})}
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  rows={2}
                  placeholder="请输入"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">照片</label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                  <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">点击或拖拽上传图片</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 抽屉底部 */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
          <button
            onClick={() => setShowDrawer(false)}
            className="px-4 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
          >
            取消
          </button>
          <button
            className="px-4 py-1.5 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 flex items-center gap-1"
          >
            <Save className="w-4 h-4" />
            保存
          </button>
        </div>
      </div>
    </div>
  )

  // 地图模式渲染
  const renderMapView = () => (
    <div className="h-full relative p-3">
      {/* 选点模式提示 */}
      {isSelectingPoint && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <Target className="w-5 h-5 animate-pulse" />
          请在地图中点击布设位置
          <button
            onClick={() => setIsSelectingPoint(false)}
            className="ml-2 hover:bg-green-600 rounded p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* 模式切换按钮 */}
      <div className="absolute top-5 right-5 z-20">
        <ModeSwitchButtons />
      </div>
      
      {/* 地图主体 */}
      <div 
        className="h-full relative cursor-crosshair rounded-lg overflow-hidden border border-gray-200"
        onClick={handleMapClick}
      >
        {/* 地图背景 */}
        <img
          src="/biodiversity-map-bg.png"
          alt="红外相机布设地图"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* 红外相机点位 */}
        {infraredCameraDeploymentData.map((point) => (
          <div
            key={point.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ top: point.mapTop, left: point.mapLeft }}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPoint(point)
              setShowPointModal(true)
              setCarouselIndex(0)
            }}
          >
            <div className={`w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
              point.status === '监测中' ? 'bg-orange-500' : 'bg-gray-400'
            }`}>
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-white/95 px-2 py-0.5 rounded shadow-sm text-gray-700 font-medium opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {point.pointCode}
            </div>
          </div>
        ))}
        
        {/* 左上角工具栏 */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {/* 搜索和新增按钮 */}
          <div className="bg-white rounded-lg shadow-md p-2">
            <div className="flex items-center gap-2">
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as typeof searchType)}
                className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="point">布设点位</option>
                <option value="camera">相机编号</option>
                <option value="time">布设时间</option>
                <option value="person">布设人</option>
              </select>
              {searchType === 'time' ? (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-sm border border-gray-200 rounded px-2 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              ) : (
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="搜索..."
                  className="text-sm border border-gray-200 rounded px-2 py-1 w-32 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              )}
              <button className="p-1 hover:bg-gray-100 rounded">
                <Search className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSelectingPoint(true)
                }}
                className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                新增布设
              </button>
            </div>
          </div>
        </div>
        
        {/* 图层控制 */}
        <div className="absolute bottom-3 left-3 z-10 bg-white rounded-lg shadow-md p-3">
          <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Layers className="w-4 h-4 text-green-600" />
            图层控制
          </div>
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={layers.boundary}
                onChange={(e) => setLayers({...layers, boundary: e.target.checked})}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-sm text-gray-600">保护地边界</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={layers.vegetation}
                onChange={(e) => setLayers({...layers, vegetation: e.target.checked})}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-sm text-gray-600">植被类型</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={layers.grid}
                onChange={(e) => setLayers({...layers, grid: e.target.checked})}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-sm text-gray-600">监测网格</span>
            </label>
          </div>
        </div>
        
        {/* 图例 */}
        <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <div className="text-sm font-medium text-gray-700 mb-2">图例</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white"></div>
              <span className="text-sm text-gray-600">监测中</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
              <span className="text-sm text-gray-600">已完成</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // 表格模式渲染
  const renderTableView = () => (
    <div className="h-full flex flex-col p-4 overflow-hidden">
      {/* 模式切换和筛选 - 同一行 */}
      <div className="flex items-center justify-between mb-3">
        <FilterBar />
        <ModeSwitchButtons />
      </div>
      
      {/* 操作按钮 */}
      <div className="mb-3">
        <ActionBar showMapView />
      </div>
      
      {/* 数据表格 */}
      <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto h-full">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="w-10 px-3 py-2 text-left border-b">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-green-600 rounded"
                  />
                </th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">点位编号</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">相机编号</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">经度</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">纬度</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">海拔</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">所属项目</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">布设时间</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">布设人</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium">状态</th>
                <th className="px-3 py-2 text-left border-b text-gray-600 font-medium sticky right-0 bg-gray-50">操作</th>
              </tr>
            </thead>
            <tbody>
              {infraredCameraDeploymentData.map((point) => (
                <tr key={point.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(point.id)}
                      onChange={() => handleSelect(point.id)}
                      className="w-4 h-4 text-green-600 rounded"
                    />
                  </td>
                  <td className="px-3 py-2 border-b text-gray-700">{point.pointCode}</td>
                  <td className="px-3 py-2 border-b text-gray-700">{point.cameraId}</td>
                  <td className="px-3 py-2 border-b text-gray-700">{point.lng}°E</td>
                  <td className="px-3 py-2 border-b text-gray-700">{point.lat}°N</td>
                  <td className="px-3 py-2 border-b text-gray-700">{point.altitude}m</td>
                  <td className="px-3 py-2 border-b text-gray-700">{point.projectName}</td>
                  <td className="px-3 py-2 border-b text-gray-700">{point.deployTime}</td>
                  <td className="px-3 py-2 border-b text-gray-700">{point.deployer}</td>
                  <td className="px-3 py-2 border-b">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      point.status === '监测中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>{point.status}</span>
                  </td>
                  <td className="px-3 py-2 border-b sticky right-0 bg-white">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditDrawer(point)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-green-600"
                        title="编辑"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-red-600" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600" title="日志">
                        <History className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // 卡片模式渲染
  const renderCardView = () => (
    <div className="h-full flex flex-col p-4 overflow-hidden">
      {/* 模式切换和筛选 - 同一行 */}
      <div className="flex items-center justify-between mb-3">
        <FilterBar />
        <ModeSwitchButtons />
      </div>
      
      {/* 操作按钮 */}
      <div className="mb-3">
        <ActionBar showMapView />
      </div>
      
      {/* 卡片列表 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-4 gap-4">
          {infraredCameraDeploymentData.map((point) => (
            <div
              key={point.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* 卡片头部 */}
              <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-orange-500" />
                  <span className="font-medium text-gray-700">{point.pointCode}</span>
                </div>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(point.id)}
                  onChange={() => handleSelect(point.id)}
                  className="w-4 h-4 text-green-600 rounded"
                />
              </div>
              
              {/* 卡片内容 */}
              <div className="px-4 py-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">相机编号</span>
                    <span className="text-gray-700">{point.cameraId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">安装日期</span>
                    <span className="text-gray-700">{point.deployTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">安装人</span>
                    <span className="text-gray-700">{point.deployer}</span>
                  </div>
                </div>
              </div>
              
              {/* 卡片底部 */}
              <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditDrawer(point)}
                    className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-green-600"
                    title="编辑"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-600" title="删除">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600" title="日志">
                    <History className="w-4 h-4" />
                  </button>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  point.status === '监测中' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>{point.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col overflow-hidden bg-green-50">
      {viewMode === 'map' && renderMapView()}
      {viewMode === 'table' && renderTableView()}
      {viewMode === 'card' && renderCardView()}
      {showPointModal && PointDetailModal()}
      {showDrawer && PointDrawer()}
    </div>
  )
}

export default InfraredCameraDeployment
