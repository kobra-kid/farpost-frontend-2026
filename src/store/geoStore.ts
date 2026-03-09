import { create } from "zustand";
import type { GeoNode } from "../types/geo";

interface GeoStore {
    geoData: GeoNode | null;
    isLoading: boolean;
    isModalOpen: boolean
    selectedDistrict: GeoNode | null
    selectedRegion: GeoNode | null
    selectedCity: GeoNode | null
    searchQuery: string

    setGeoData: (data: GeoNode) => void
    setIsLoading: (value: boolean) => void
    openModal: () => void
    closeModal: () => void
    selectDistrict: (node: GeoNode) => void
    selectRegion: (node: GeoNode) => void
    selectCity: (node: GeoNode) => void
    setSearchQuery: (query: string) => void
}

export const useGeoStore = create<GeoStore>((set) => ({
    geoData: null,
    isLoading: false,
    isModalOpen: false,
    selectedDistrict: null,
    selectedRegion: null,
    selectedCity: null,
    searchQuery: '',

    setGeoData: (data) => set({ geoData: data }),
    setIsLoading: (value) => set({ isLoading: value }),
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
    selectDistrict: (node) => set({ selectedDistrict: node, selectedRegion: null, selectedCity: null }),
    selectRegion: (node) => set({ selectedRegion: node, selectedCity: null }),
    selectCity: (node) => set({ selectedCity: node }),
    setSearchQuery: (query) => set({ searchQuery: query })
}))