import { DeFiLlamaPool, YieldOpportunity } from "@/types";
import { calculateYieldForgeScore, determineRiskLevel, determineYieldType } from "./scoring";

const TARGET_CHAINS = ["Ethereum", "Base", "Arbitrum", "Optimism", "Polygon"];
const TARGET_PROJECTS = [
    "aave-v3",
    "compound-v3",
    "uniswap-v3",
    "lido",
    "pendle",
    "morpho",
    "spark",
    "yearn",
    "rocket-pool",
];

export async function fetchYieldOpportunities(): Promise<YieldOpportunity[]> {
    try {
        const res = await fetch("https://yields.llama.fi/pools", {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch from DeFiLlama: ${res.status}`);
        }

        const json = await res.json();
        const data: DeFiLlamaPool[] = json.data;

        if (!data || !Array.isArray(data)) {
            return [];
        }

        // Filter by our target chains and projects, and remove outliers
        const filtered = data.filter((pool) => {
            // DeFiLlama sometimes uses different casing
            const chainMatch = TARGET_CHAINS.some(
                (c) => c.toLowerCase() === pool.chain.toLowerCase()
            );
            const projectMatch = TARGET_PROJECTS.includes(pool.project.toLowerCase());

            // Ensure it has reasonable TVL (e.g. > $1M) to avoid junk
            const tvlValid = pool.tvlUsd > 1_000_000;

            return chainMatch && projectMatch && tvlValid && !pool.outlier;
        });

        // Map to our internal YieldOpportunity model
        const opportunities: YieldOpportunity[] = filtered.map((pool) => {
            return {
                ...pool,
                id: pool.pool,
                yieldForgeScore: calculateYieldForgeScore(pool),
                riskLevel: determineRiskLevel(pool),
                yieldType: determineYieldType(pool),
            };
        });

        // Sort by YieldForge Score descending
        opportunities.sort((a, b) => b.yieldForgeScore - a.yieldForgeScore);

        return opportunities;
    } catch (error) {
        console.error("Error fetching yield opportunities:", error);
        return [];
    }
}

export async function fetchHistoricalApy(poolId: string) {
    try {
        const res = await fetch(`https://yields.llama.fi/chart/${poolId}`);
        if (!res.ok) return [];

        const json = await res.json();
        return json.data; // Array of { timestamp, tvlUsd, apy, apyBase, apyReward }
    } catch (error) {
        console.error("Error fetching historical APY:", error);
        return [];
    }
}
