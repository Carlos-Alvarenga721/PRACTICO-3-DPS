import { create } from 'zustand'

const useStore = create((set) => ({
    resources: [],
    setResources: (resources) => set({ resources }),
}))

export default useStore;