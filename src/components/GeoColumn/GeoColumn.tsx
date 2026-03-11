import type { GeoNode } from '../../types/geo'
import ArrowIcon from '../../assets/arrow.svg'
import styles from './GeoColumn.module.css'

interface GeoColumnProps {
  nodes: GeoNode[]
  selected: GeoNode | null
  onSelect: (node: GeoNode) => void
  className?: string
}

export const GeoColumn = ({ nodes, selected, onSelect, className }: GeoColumnProps) => {
  return (
    <div className={className}>
      <div className={styles.column}>
        {nodes.map((node) => {
          const isSelected = selected?.id === node.id
          const hasChildren = node.children && node.children.length > 0

          return (
            <button
              key={node.id}
              className={`${styles.item} ${isSelected ? styles.active : ''}`}
              onClick={() => onSelect(node)}
            >
              <span>{node.name}</span>
              {isSelected && hasChildren && <img src={ArrowIcon} alt="" width={8} height={14} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
