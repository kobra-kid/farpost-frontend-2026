export type GeoNodeType = 'country' | 'federal_district' | 'region' | 'city'

export interface GeoNode {
  id: number
  name: string
  type: GeoNodeType
  count?: number
  children?: GeoNode[]
}
