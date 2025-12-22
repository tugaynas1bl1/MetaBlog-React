import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBlur = create((set) => ({
    isBlurEnabled: false,
    isPressedBlur: false,
    enableBlur: () => set ((state) => ({isBlurEnabled: true})),
    disableBlur: () => set ((state) => ({isBlurEnabled: false}))
    }), {name: "blurry"}
)