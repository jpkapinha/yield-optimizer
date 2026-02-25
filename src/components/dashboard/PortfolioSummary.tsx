"use client";

import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { formatCurrency } from "@/lib/utils";

export function PortfolioSummary() {
    const { address, isConnected } = useAccount();
    const { data: balance } = useBalance({ address });

    if (!isConnected) return null;

    // For MVP, we're just showing a placeholder calculation based on their ETH balance
    // In a real app we would scan their wallet for LP tokens, aTokens, cTokens etc.

    const formattedBalance = balance ? formatUnits(balance.value, balance.decimals) : "0";
    const estimatedBalanceUsd = parseFloat(formattedBalance) * 3500; // Simple mock ETH price
    const estimatedExtraYield = estimatedBalanceUsd * 0.08; // 8% average target yield

    return (
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold text-white mb-2">Portfolio Summary</h2>
            <p className="text-sm text-muted-foreground mb-6">
                Based on your connected wallet ({address?.slice(0, 6)}...{address?.slice(-4)})
            </p>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-black/40 p-4 border border-white/5">
                    <p className="text-sm text-muted-foreground mb-1">Detected Balances</p>
                    <p className="text-2xl font-bold text-white">~{formatCurrency(estimatedBalanceUsd)}</p>
                </div>

                <div className="rounded-xl bg-black/40 p-4 border border-white/5">
                    <p className="text-sm text-muted-foreground mb-1">Current Yield</p>
                    <p className="text-2xl font-bold text-white">~{formatCurrency(0)} <span className="text-sm font-normal text-muted-foreground">/ yr</span></p>
                </div>

                <div className="rounded-xl bg-black/40 p-4 border border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
                    <div className="relative z-10">
                        <p className="text-sm text-emerald-400 mb-1">Potential Extra Yield</p>
                        <p className="text-2xl font-bold text-emerald-400">+{formatCurrency(estimatedExtraYield)} <span className="text-sm font-normal opacity-70">/ yr</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
