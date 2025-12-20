import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useDarkMode = create(persist((set) => ({
    isDarkModeActive: false,
    toggleDarkMode: () => set((state) => ({isDarkModeActive: !state.isDarkModeActive})),
    }), {name: "darkMode"}
))