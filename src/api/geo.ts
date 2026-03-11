import type { GeoNode } from '../types/geo'
import geoData from '../data/geo.json'

export const fetchGeoData = (): Promise<GeoNode> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve((geoData as GeoNode[]).find((n) => n.name === 'Россия') as GeoNode)
    }, 500)
  })
}
