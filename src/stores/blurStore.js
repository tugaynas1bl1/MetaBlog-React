import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBlur = create(persist((set) => ({
    isBlurEnabled: false,
    enableBlur: () => set ((state) => ({isBlurEnabled: true})),
    disableBlur: () => set ((state) => ({isBlurEnabled: false}))
    }), {name: "blurry"}
))