'use client'
import { create } from 'zustand';

const useLoadingStore = create((set) => ({
    isLoading: false,
    showLoading: () => set({ isLoading: true }),
    hideLoading: () => set({ isLoading: false }),
    showLoadingWithDelay: (delay = 2000) => {
        set({ isLoading: true });
        setTimeout(() => set({ isLoading: false }), delay);
    },
}));

export default useLoadingStore;
