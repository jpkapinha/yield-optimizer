import { DeFiLlamaPool, YieldOpportunity } from "@/types";

export function calculateYieldForgeScore(pool: DeFiLlamaPool): number {
    // Base raw APY
    let score = pool.apy;

    // TVL factor: pools over $100M get a slight boost, under $10M get a penalty
    if (pool.tvlUsd > 100_000_000) {
        score *= 1.1;
    } else if (pool.tvlUsd < 10_000_000) {
        score *= 0.8;
    }

    // Volatility penalty: if 30D APY has dropped significantly, risk is higher
    if (pool.apyPct30D && pool.apyPct30D < -10) {
        score *= 0.9;
    }

    // Cap at 100 max score
    return Math.min(Math.max(score, 0), 100);
}

export function determineRiskLevel(pool: DeFiLlamaPool): YieldOpportunity["riskLevel"] {
    if (pool.ilRisk === "yes") return "High";

    // High APY or low TVL = High Risk
    if (pool.tvlUsd < 20_000_000 || pool.apy > 30) return "High";

    // High TVL and moderate APY = Low Risk
    if (pool.tvlUsd > 100_000_000 && pool.apy < 15 && pool.ilRisk === "no") return "Low";

    return "Med";
}

export function determineYieldType(pool: DeFiLlamaPool): YieldOpportunity["yieldType"] {
    const proj = pool.project.toLowerCase();

    if (["aave-v3", "compound-v3", "spark", "morpho"].includes(proj)) {
        return "Lending";
    }
    if (["lido", "rocket-pool"].includes(proj)) {
        return "Staking";
    }
    if (["uniswap-v3"].includes(proj) || pool.exposure === "multi") {
        return "LP";
    }
    if (["pendle", "yearn"].includes(proj)) {
        return "Restaking"; // Simplified mapping for MVP
    }

    return "Other";
}
