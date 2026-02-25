"use client";

import { useEffect, useState } from "react";
import { YieldOpportunity } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatNumber, formatCurrency } from "@/lib/utils";
import { ShieldAlert, TrendingUp, Activity, Sparkles, Loader2 } from "lucide-react";
import { fetchHistoricalApy } from "@/lib/defillama";
import { SimulationCalculator } from "./SimulationCalculator";
import { useCompletion } from "@ai-sdk/react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function OpportunityModal({ pool, isOpen, onClose }: { pool: YieldOpportunity, isOpen: boolean, onClose: () => void }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chartData, setChartData] = useState<any[]>([]);
    const [isChartLoading, setIsChartLoading] = useState(true);

    // AI Streaming using Vercel AI SDK
    const { completion, complete, isLoading: isAiLoading } = useCompletion({
        api: "/api/analyze",
    });

    useEffect(() => {
        if (isOpen && pool) {
            // 1. Fetch Chart Data
            setIsChartLoading(true);
            fetchHistoricalApy(pool.id).then((data) => {
                // Map data for Recharts (last 90 days usually returned by defillama chart endpoint)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setChartData(data.map((d: any) => ({
                    date: new Date(d.timestamp).toLocaleDateString(),
                    apy: d.apy,
                })));
                setIsChartLoading(false);
            });

            // 2. Trigger AI Analysis
            complete("", { body: { poolDetails: pool } });
        }
    }, [isOpen, pool, complete]);

    if (!pool) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto border-white/10 bg-[#0a0a0a] text-white p-0 gap-0">

                {/* Header Section */}
                <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-2xl font-bold">
                            <span className="bg-white/10 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner">
                                {pool.symbol.charAt(0)}
                            </span>
                            <div>
                                {pool.symbol}
                                <div className="text-sm font-normal text-muted-foreground flex items-center gap-2 mt-1">
                                    <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs text-white">{pool.project}</span>
                                    <span>•</span>
                                    <span>{pool.chain}</span>
                                </div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Current APY</p>
                            <p className="text-2xl font-bold text-emerald-400 flex items-center gap-1">
                                {formatNumber(pool.apy)}% <TrendingUp className="h-4 w-4" />
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">TVL</p>
                            <p className="text-2xl font-bold text-white">{formatCurrency(pool.tvlUsd)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                            <p className={`text-xl font-bold flex items-center gap-1 ${pool.riskLevel === 'Low' ? 'text-emerald-400' : pool.riskLevel === 'Med' ? 'text-amber-400' : 'text-red-400'}`}>
                                {pool.riskLevel} {pool.riskLevel === 'High' && <ShieldAlert className="h-4 w-4" />}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-8">

                    {/* AI Analysis Block */}
                    <div className="relative rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5 overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="w-24 h-24 text-indigo-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-indigo-300 flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4" /> YieldForge AI Analysis
                        </h3>
                        <div className="relative z-10 text-sm leading-relaxed text-indigo-100/90 font-medium min-h-[60px]">
                            {isAiLoading && !completion ? (
                                <div className="flex items-center gap-2 text-indigo-300/50">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Generating quant assessment...
                                </div>
                            ) : (
                                <p className="whitespace-pre-wrap">{completion}</p>
                            )}
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div>
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2 mb-4">
                            <Activity className="w-4 h-4 text-muted-foreground" /> Historical APY
                        </h3>
                        <div className="h-[200px] w-full rounded-xl border border-white/5 bg-black/20 p-4">
                            {isChartLoading ? (
                                <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">Loading chart data...</div>
                            ) : chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <XAxis
                                            dataKey="date"
                                            stroke="#525252"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            minTickGap={30}
                                        />
                                        <YAxis
                                            stroke="#525252"
                                            fontSize={10}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(val) => `${val}%`}
                                            domain={['auto', 'auto']}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#262626', borderRadius: '8px' }}
                                            itemStyle={{ color: '#34d399' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="apy"
                                            stroke="#34d399"
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 4, fill: '#34d399' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">No historical data available.</div>
                            )}
                        </div>
                    </div>

                    {/* Simulator */}
                    <SimulationCalculator apy={pool.apy} />

                </div>
            </DialogContent>
        </Dialog>
    );
}
