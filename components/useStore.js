import { create } from 'zustand'

const useStore = create((set) => ({
    resources: [],
    setResources: (resources) => set({ resources }),
    searchedResourceInStoreInStore: null,
    setSearchedResourceInStore: (searchedResourceInStore) => set({ searchedResourceInStore }),
}))

export default useStore;