import { useGeoStore } from '../../store/geoStore'
import { useCookie } from '../../hooks/useCookie'
import styles from './CitySelector.module.css'

export const CitySelector = () => {
    const { selectedCity, openModal } = useGeoStore(state => state)
    const cityIdCookie = useCookie('cityId')

    const cityName = selectedCity?.name ?? (cityIdCookie.get() ? '...' : 'Город не выбран')

    return (
        <div className={styles.wrapper}>
            <button className={styles.button} onClick={openModal}>
                Выбрать город
            </button>
            <span className={styles.cityName}>{cityName}</span>
        </div>
    )
}