import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Allow overriding the API key or use the environment variable
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { poolDetails } = await req.json();

        const systemMessage = `You are a world-class DeFi analyst, yield farming expert, and senior quant. 
You are evaluating the following yield opportunity for a user:
- Project: ${poolDetails.project}
- Asset: ${poolDetails.symbol}
- Chain: ${poolDetails.chain}
- APY: ${poolDetails.apy}%
- TVL: $${Number(poolDetails.tvlUsd).toLocaleString()}
- Risk Level: ${poolDetails.riskLevel}
- Yield Type: ${poolDetails.yieldType}

Write a concise, natural-language paragraph explaining "Why this one?" and highlighting the core drivers of this yield and the key risks (e.g., smart contract risk, impermanent loss, liquidity). 
Keep it highly professional, analytical, and strictly under 4 sentences. Do not use generic filler words. Sound like a crypto-native top-tier quant.`;

        const result = streamText({
            model: google('gemini-1.5-pro'),
            system: systemMessage,
            prompt: "Analyze this yield opportunity and provide your assessment.",
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("AI Analysis error:", error);
        return new Response(JSON.stringify({ error: "Failed to generate analysis" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
