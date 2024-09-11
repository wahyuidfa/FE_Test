import { create } from 'zustand';

const usePaginationStore = create((set) => ({
    page: 1,  // Default page
    limit: 10, // Default limit

    // Action to set the page
    setPage: (newPage) => set({ page: newPage }),

    // Action to set the limit
    setLimit: (newLimit) => set({ limit: newLimit }),

    // Action to reset pagination state
    resetPagination: () => set({ page: 1, limit: 5 }),
}));

export default usePaginationStore;
