export interface DeFiLlamaPool {
    chain: string;
    project: string;
    symbol: string;
    tvlUsd: number;
    apyBase: number | null;
    apyReward: number | null;
    apy: number;
    rewardTokens: string[] | null;
    pool: string;
    apyPct1D: number | null;
    apyPct7D: number | null;
    apyPct30D: number | null;
    ilRisk: string;
    exposure: string;
    outlier: boolean;
}

export interface YieldOpportunity extends DeFiLlamaPool {
    id: string; // Same as pool address
    yieldForgeScore: number;
    riskLevel: 'Low' | 'Med' | 'High';
    yieldType: 'Lending' | 'LP' | 'Staking' | 'Restaking' | 'Other';
}
