'use client'

import { useState } from 'react'
import { Map, Search, Layers, Compass, TreePine, Bird, Shield, Microscope, Eye, FileText, Settings, Mountain, Waves } from 'lucide-react'
import { themeTabs, ecosystemData, animalData, protectedSpeciesData, plantData, ecologyContent } from '@/data/overviewData'

export function OverviewInterface() {
  const [activeTheme, setActiveTheme] = useState('生态本底')

  return (
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
                          {ecosystemData.reduce((acc, item) => {
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
              <div className="text-sm text-gray-700 leading-relaxed">
                <p>石花洞风景名胜区构造发育，地层丰富。区内有北岭向斜、谷积山背斜、南大寨断裂等地质构造。</p>
                <p className="mt-2">区内共计2大类3类20处地质遗迹，主要包括岩溶洞穴及其洞内次生化学沉积物。</p>
              </div>
            )}
            
            {activeTheme === '资源价值' && (
              <div className="text-sm text-gray-700 leading-relaxed">
                <p>石花洞风景名胜区具有重要的科学价值、美学价值和保护价值。</p>
              </div>
            )}
            
            {activeTheme === '保护管理' && (
              <div className="text-sm text-gray-700 leading-relaxed">
                <p>已建立完善的保护管理体系，包括管理机构、管护体系、规章制度等。</p>
              </div>
            )}
            
            {activeTheme === '规划公示' && (
              <div className="text-sm text-gray-700 leading-relaxed">
                <p>石花洞风景名胜区总体规划遵循"保护优先、科学利用"的原则。</p>
              </div>
            )}
            
            {activeTheme === '动态资讯' && (
              <div className="text-sm text-gray-700 leading-relaxed">
                <p>暂无最新动态资讯。</p>
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
            <div className="flex justify-between items-center py-1">
              <span className="text-sm text-gray-500">主管部门</span>
              <span className="text-sm text-gray-700">北京市园林绿化局</span>
            </div>
          </div>
        </div>

        {/* 生态指标卡片 */}
        <div className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden">
          <div className="px-4 py-2 border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
            <h3 className="text-base font-medium text-gray-700">生态指标</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">92.3%</div>
              <div className="text-xs text-gray-500">植被覆盖率</div>
            </div>
            <div className="bg-sky-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-sky-600">1580</div>
              <div className="text-xs text-gray-500">植物物种</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">326</div>
              <div className="text-xs text-gray-500">动物物种</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">47</div>
              <div className="text-xs text-gray-500">保护物种</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
