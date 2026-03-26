'use client'

import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react'

// 菜单项数据类型
export interface MenuItemData {
  id: string
  name: string
  icon?: LucideIcon
  children?: MenuItemData[]
}

// MenuItem组件Props类型
interface MenuItemProps {
  item: MenuItemData
  level: number
  expandedItems: string[]
  toggleExpand: (id: string, level: number) => void
  selectedId: string
  setSelectedId: (id: string) => void
}

export function MenuItem({ item, level, expandedItems, toggleExpand, selectedId, setSelectedId }: MenuItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const isExpanded = expandedItems.includes(item.id)
  const isSelected = selectedId === item.id
  const Icon = item.icon

  const handleClick = () => {
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
            />
          ))}
        </div>
      )}
    </div>
  )
}
