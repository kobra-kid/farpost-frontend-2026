import { useEffect } from 'react'
import type { GeoNode } from './types/geo'
import { CitySelector } from './components/CitySelector/CitySelector'
import { Modal } from './components/Modal/Modal'
import { GeoColumn } from './components/GeoColumn/GeoColumn'
import { CitiesColumn } from './components/CitiesColumn/CitiesColumn'
import { useGeoStore } from './store/geoStore'
import { useCookie } from './hooks/useCookie'
import { fetchGeoData } from './api/geo'
import appStyles from './App.module.css'
import SubtractIcon from './assets/Subtract.svg'
import './index.css'

function App() {
  const {
    isModalOpen,
    geoData,
    setGeoData,
    setIsLoading,
    selectedDistrict,
    selectedRegion,
    selectDistrict,
    selectRegion,
    selectCity,
    closeModal,
    openModal,
    selectedCity,
  } = useGeoStore((state) => state)

  useEffect(() => {
    setIsLoading(true)
    fetchGeoData().then((data) => {
      setGeoData(data)
      setIsLoading(false)
      const savedId = cityIdCookie.get()
      if (savedId) {
        const city = data.children
          ?.flatMap((d) => d.children ?? [])
          .flatMap((r) => r.children ?? [])
          .find((c) => String(c.id) === savedId)
        if (city) selectCity(city)
      }
    })
  }, [])

  const searchQuery = useGeoStore((state) => state.searchQuery)
  const query = searchQuery.toLowerCase()

  const allDistricts = geoData?.children ?? []
  const allCities = query
    ? (geoData?.children ?? []).flatMap((d) => d.children ?? []).flatMap((r) => r.children ?? [])
    : (selectedRegion?.children ?? [])

  const cities = query
    ? Array.from(
        new Map(
          allCities.filter((c) => c.name.toLowerCase().includes(query)).map((c) => [c.id, c]),
        ).values(),
      )
    : allCities

  const districts = allDistricts

  const regions = query
    ? allDistricts.flatMap((d) =>
        (d.children ?? []).filter((r) =>
          r.children?.some((c) => c.name.toLowerCase().includes(query)),
        ),
      )
    : (selectedDistrict?.children ?? [])

  const cityIdCookie = useCookie('cityId')

  const handleOpenModal = () => {
    if (selectedCity) {
      const district = allDistricts.find((d) =>
        d.children?.some((r) => r.children?.some((c) => c.id === selectedCity.id)),
      )
      const region = district?.children?.find((r) =>
        r.children?.some((c) => c.id === selectedCity.id),
      )
      if (district) selectDistrict(district)
      if (region) selectRegion(region)
    }
    openModal()
  }

  const handleCitySelect = (node: GeoNode) => {
    selectCity(node)
    cityIdCookie.set(String(node.id))
    closeModal()
  }

  return (
    <main>
      <CitySelector onOpen={handleOpenModal} />
      {isModalOpen && (
        <Modal placeholder={!selectedDistrict && !query && <img src={SubtractIcon} alt="" />}>
          <GeoColumn
            nodes={districts}
            selected={selectedDistrict}
            onSelect={selectDistrict}
            className={appStyles.districts}
          />
          {(selectedDistrict || query) && (
            <GeoColumn
              nodes={regions}
              selected={selectedRegion}
              onSelect={selectRegion}
              className={appStyles.regions}
            />
          )}
          {(selectedRegion || query) && (
            <CitiesColumn
              nodes={cities}
              onSelect={handleCitySelect}
              className={appStyles.cities}
              searchMode={!!query}
            />
          )}
        </Modal>
      )}
    </main>
  )
}

export default App
