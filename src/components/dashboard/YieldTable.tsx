"use client";

import { YieldOpportunity } from "@/types";
import { useAppStore } from "@/lib/store";
import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { Star, TrendingUp, ShieldAlert } from "lucide-react";
import { OpportunityModal } from "@/components/shared/OpportunityModal";

export function YieldTable({ data, isLoading }: { data: YieldOpportunity[], isLoading: boolean }) {
    const { chainFilter, riskFilter, yieldTypeFilter, watchedPools, toggleWatchPool } = useAppStore();
    const [selectedPool, setSelectedPool] = useState<YieldOpportunity | null>(null);

    const filteredData = useMemo(() => {
        return data.filter(pool => {
            if (chainFilter !== "All" && pool.chain !== chainFilter) return false;
            if (riskFilter !== "All" && pool.riskLevel !== riskFilter) return false;
            if (yieldTypeFilter !== "All" && pool.yieldType !== yieldTypeFilter) return false;
            return true;
        }).slice(0, 10); // MVP: Top 10
    }, [data, chainFilter, riskFilter, yieldTypeFilter]);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-2xl bg-white/5" />
                ))}
            </div>
        );
    }

    if (filteredData.length === 0) {
        return (
            <div className="py-20 text-center text-muted-foreground border border-white/5 rounded-2xl bg-white/[0.02]">
                No opportunities found matching your filters.
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                {filteredData.map((pool, idx) => (
                    <div
                        key={pool.id}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 transition-all hover:border-white/20 hover:bg-[#111] cursor-pointer"
                        onClick={() => setSelectedPool(pool)}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-xl font-bold border border-white/10">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        {pool.symbol}
                                        <span className="text-xs font-normal text-muted-foreground bg-white/10 px-2 py-0.5 rounded-full">
                                            {pool.project}
                                        </span>
                                    </h3>
                                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <div className={`h-2 w-2 rounded-full ${pool.chain === 'Ethereum' ? 'bg-blue-400' : pool.chain === 'Base' ? 'bg-blue-600' : pool.chain === 'Arbitrum' ? 'bg-cyan-500' : pool.chain === 'Optimism' ? 'bg-red-500' : 'bg-purple-500'}`} />
                                            {pool.chain}
                                        </span>
                                        <span>•</span>
                                        <span>TVL: {formatCurrency(pool.tvlUsd)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground mb-1">Net APY</p>
                                    <p className="text-2xl font-bold text-emerald-400 flex items-center gap-1">
                                        {formatNumber(pool.apy)}%
                                        <TrendingUp className="h-4 w-4 opacity-50" />
                                    </p>
                                </div>

                                <div className="hidden md:block text-right">
                                    <p className="text-sm text-muted-foreground mb-1">YieldForge Score</p>
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="h-2 w-16 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-white"
                                                style={{ width: `${Math.min(pool.yieldForgeScore, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-white">{formatNumber(pool.yieldForgeScore)}</span>
                                    </div>
                                </div>

                                <div className="text-right hidden sm:block">
                                    <p className="text-sm text-muted-foreground mb-1">Risk</p>
                                    <p className={`text-sm font-medium flex items-center gap-1 justify-end ${pool.riskLevel === 'Low' ? 'text-emerald-400' : pool.riskLevel === 'Med' ? 'text-amber-400' : 'text-red-400'}`}>
                                        {pool.riskLevel === 'High' && <ShieldAlert className="h-3 w-3" />}
                                        {pool.riskLevel}
                                    </p>
                                </div>

                                <div
                                    className="p-2 text-muted-foreground hover:text-white transition-colors z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWatchPool(pool.id);
                                    }}
                                >
                                    <Star
                                        className={`h-5 w-5 ${watchedPools.includes(pool.id) ? "fill-yellow-400 text-yellow-400" : ""}`}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {selectedPool && (
                <OpportunityModal
                    pool={selectedPool}
                    isOpen={!!selectedPool}
                    onClose={() => setSelectedPool(null)}
                />
            )}
        </>
    );
}
