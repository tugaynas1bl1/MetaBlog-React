import { create } from "zustand"

export const useCategory = create(set => ({
    category: '',
    setCategory: (cat) => set({ category: cat })
}))