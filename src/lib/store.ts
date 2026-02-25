import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    chainFilter: string;
    riskFilter: string;
    protocolFilter: string;
    yieldTypeFilter: string;
    watchedPools: string[];
    setChainFilter: (v: string) => void;
    setRiskFilter: (v: string) => void;
    setProtocolFilter: (v: string) => void;
    setYieldTypeFilter: (v: string) => void;
    toggleWatchPool: (id: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            chainFilter: 'All',
            riskFilter: 'All',
            protocolFilter: 'All',
            yieldTypeFilter: 'All',
            watchedPools: [],
            setChainFilter: (v) => set({ chainFilter: v }),
            setRiskFilter: (v) => set({ riskFilter: v }),
            setProtocolFilter: (v) => set({ protocolFilter: v }),
            setYieldTypeFilter: (v) => set({ yieldTypeFilter: v }),
            toggleWatchPool: (id) =>
                set((state) => ({
                    watchedPools: state.watchedPools.includes(id)
                        ? state.watchedPools.filter((p) => p !== id)
                        : [...state.watchedPools, id],
                })),
        }),
        {
            name: 'yieldforge-storage',
            // only persist watchedPools to match MVP reqs
            partialize: (state) => ({ watchedPools: state.watchedPools }),
        }
    )
);
