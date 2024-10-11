import create from 'zustand';

// Define the store
const useStore = create((set) => ({
  resources: [], // Initial state of resources
  setResources: (resources) => set({ resources }), // Function to set resources
}));

export default useStore;
