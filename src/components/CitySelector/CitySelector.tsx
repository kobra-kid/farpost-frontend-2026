import { useGeoStore } from '../../store/geoStore'
import styles from './CitySelector.module.css'

interface CitySelectorProps {
  onOpen: () => void
}

export const CitySelector = ({ onOpen }: CitySelectorProps) => {
  const selectedCity = useGeoStore((state) => state.selectedCity)

  const cityName = selectedCity?.name ?? 'Город не выбран'

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onOpen}>
        Выбрать город
      </button>
      <span className={styles.cityName}>{cityName}</span>
    </div>
  )
}
