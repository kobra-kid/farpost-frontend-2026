import type { GeoNode } from '../../types/geo'
import styles from './CitiesColumn.module.css'

interface CitiesColumnProps {
  nodes: GeoNode[]
  onSelect: (node: GeoNode) => void
  className?: string
  searchMode?: boolean
}

export const CitiesColumn = ({
  nodes,
  onSelect,
  className,
  searchMode = false,
}: CitiesColumnProps) => {
  const top3 = [...nodes].sort((a, b) => (b.count ?? 0) - (a.count ?? 0)).slice(0, 3)
  const sorted = [...nodes].sort((a, b) => a.name.localeCompare(b.name, 'ru'))
  const seenLetters = new Set<string>()

  return (
    <div className={className}>
      <div className={styles.column}>
        {!searchMode && (
          <>
            <div className={styles.top3}>
              {top3.map((node) => (
                <button
                  key={node.id}
                  className={`${styles.item} ${styles.bold}`}
                  onClick={() => onSelect(node)}
                >
                  {node.name}
                </button>
              ))}
            </div>
            <div className={styles.divider} />
          </>
        )}

        {sorted.map((node) => {
          const letter = node.name[0].toUpperCase()
          const showLetter = !searchMode && !seenLetters.has(letter)
          if (!searchMode && !seenLetters.has(letter)) seenLetters.add(letter)

          return (
            <button
              key={node.id}
              className={`${styles.item} ${(node.count ?? 0) > 30000 ? styles.bold : ''}`}
              onClick={() => onSelect(node)}
            >
              {!searchMode && <span className={styles.letter}>{showLetter ? letter : ''}</span>}
              <span>{node.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
