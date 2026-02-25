"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function SimulationCalculator({ apy }: { apy: number }) {
    const [amount, setAmount] = useState<string>("1000");

    const currentAmount = parseFloat(amount) || 0;

    // Scenarios mock logic:
    // Base = current APY
    // Bull = APY + 20%
    // Bear = APY - 50%
    const scenarios = useMemo(() => {
        return {
            base: (currentAmount * apy) / 100,
            optimistic: (currentAmount * (apy * 1.2)) / 100,
            pessimistic: (currentAmount * (apy * 0.5)) / 100,
        };
    }, [currentAmount, apy]);

    return (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-5">
            <h4 className="text-sm font-semibold text-white mb-4">Simulate Earnings (1 Year)</h4>

            <div className="flex items-center gap-4 mb-6">
                <span className="text-muted-foreground text-sm font-medium">Investment $</span>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white/5 border-white/10 text-white font-mono h-10 w-full sm:w-48"
                />
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-white/5 p-3 border border-white/5 flex flex-col items-center justify-center text-center">
                    <Badge variant="outline" className="text-[10px] mb-2 border-red-500/30 text-red-400 bg-red-500/10">Pessimistic</Badge>
                    <span className="text-sm font-bold text-white">+{formatCurrency(scenarios.pessimistic)}</span>
                </div>

                <div className="rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent" />
                    <Badge className="text-[10px] mb-2 bg-emerald-500 hover:bg-emerald-600 text-black border-transparent relative z-10">Base Case</Badge>
                    <span className="text-sm font-bold text-emerald-400 relative z-10">+{formatCurrency(scenarios.base)}</span>
                </div>

                <div className="rounded-lg bg-white/5 p-3 border border-white/5 flex flex-col items-center justify-center text-center">
                    <Badge variant="outline" className="text-[10px] mb-2 border-blue-500/30 text-blue-400 bg-blue-500/10">Optimistic</Badge>
                    <span className="text-sm font-bold text-white">+{formatCurrency(scenarios.optimistic)}</span>
                </div>
            </div>
        </div>
    );
}
