import { create } from "zustand";

export const useSearch = create(set => ({
    searchReload: false,
    setSearchReload: (sear) => set({searchReload: sear})
}))