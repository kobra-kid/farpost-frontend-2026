import { useGeoStore } from '../../store/geoStore'
import SearchIcon from '../../assets/search.svg'
import styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
}

export const Modal = ({ children, placeholder }: ModalProps) => {
  const { closeModal, searchQuery, setSearchQuery } = useGeoStore((state) => state)

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal()
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Выбор города</span>
          <div className={styles.search}>
            <img src={SearchIcon} alt="" width={14} height={14} />
            <input
              className={styles.searchInput}
              placeholder="Название города"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className={styles.clearButton} onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>
        </div>
        <div className={styles.columns}>
          {children}
          {placeholder && <div className={styles.placeholder}>{placeholder}</div>}
        </div>
      </div>
    </div>
  )
}
