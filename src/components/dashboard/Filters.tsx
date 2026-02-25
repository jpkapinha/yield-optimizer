"use client";

import { useAppStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";

const CHAINS = ["All", "Ethereum", "Base", "Arbitrum", "Optimism", "Polygon"];
const RISK_LEVELS = ["All", "Low", "Med", "High"];
const YIELD_TYPES = ["All", "Lending", "LP", "Staking", "Restaking", "Other"];

export function Filters() {
    const {
        chainFilter, setChainFilter,
        riskFilter, setRiskFilter,
        yieldTypeFilter, setYieldTypeFilter
    } = useAppStore();

    return (
        <div className="flex flex-col gap-5 py-6 border-b border-white/5 mb-8">

            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Network</span>
                <div className="flex flex-wrap gap-2">
                    {CHAINS.map((c) => (
                        <Badge
                            key={c}
                            variant={(chainFilter === c ? "default" : "secondary") as unknown as "default"}
                            className={`cursor-pointer transition-all hover:bg-white/20 ${chainFilter === c ? "bg-white text-black hover:bg-white/90" : "bg-white/5 text-white/70"}`}
                            onClick={() => setChainFilter(c)}
                        >
                            {c}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Risk Level</span>
                <div className="flex flex-wrap gap-2">
                    {RISK_LEVELS.map((r) => (
                        <Badge
                            key={r}
                            variant={(riskFilter === r ? "default" : "secondary") as unknown as "default"}
                            className={`cursor-pointer transition-all hover:bg-white/20 ${riskFilter === r ? "bg-white text-black hover:bg-white/90" : "bg-white/5 text-white/70"}`}
                            onClick={() => setRiskFilter(r)}
                        >
                            {r}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Yield Type</span>
                <div className="flex flex-wrap gap-2">
                    {YIELD_TYPES.map((y) => (
                        <Badge
                            key={y}
                            variant={(yieldTypeFilter === y ? "default" : "secondary") as unknown as "default"}
                            className={`cursor-pointer transition-all hover:bg-white/20 ${yieldTypeFilter === y ? "bg-white text-black hover:bg-white/90" : "bg-white/5 text-white/70"}`}
                            onClick={() => setYieldTypeFilter(y)}
                        >
                            {y}
                        </Badge>
                    ))}
                </div>
            </div>

        </div>
    );
}
