# YieldForge 🚀
**AI-Powered DeFi Yield Optimizer**

YieldForge is a premium, high-performance financial dashboard that aggregation, scores, and analyzes the smartest yield opportunities across all major EVM chains. It brings quantitative hedge-fund-level insight to individual DeFi investors using Vercel AI SDK and Google Generative AI.

## Features
- **Real-Time Data**: Integrates with DeFiLlama API for up-to-the-minute APYs and TVL across Ethereum, Base, Optimism, Arbitrum, and Polygon.
- **AI Smart Analysis**: Streams natural-language intelligence for every opportunity, highlighting underlying risk vectors and drivers.
- **YieldForge Score**: A custom, risk-adjusted scoring mechanism that normalizes APY against TVL and historical volatility.
- **Simulation Engine**: Project base, optimistic, and pessimistic earnings in real-time.
- **Ultra-Premium UI**: Fully responsive, dark-mode-first aesthetic inspired by top-tier modern fintech apps (shadcn/ui, Tailwind CSS, Recharts).
- **Web3 Ready**: Seamlessly connect your wallet using `wagmi`, `viem`, and `RainbowKit`.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Web3**: Wagmi + Viem + RainbowKit
- **AI**: Vercel AI SDK + Google Gemini 1.5 Pro
- **State**: Zustand (with LocalStorage persistence)
- **Charts**: Recharts

## Local Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repo>
   cd yield-optimizer
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file at the root:
   ```env
   NEXT_PUBLIC_REOWN_PROJECT_ID="your_walletconnect_id"
   GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key_here"
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## How to Deploy on Vercel
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **Add New** -> **Project**.
3. Import the GitHub repository.
4. In the **Environment Variables** section, add your `NEXT_PUBLIC_REOWN_PROJECT_ID` and `GOOGLE_GENERATIVE_AI_API_KEY`.
5. Click **Deploy**.

## Suggested Domain Names
- `yieldforge.app`
- `yieldforge.xyz`
- `forgeyield.finance`
- `yieldforge.ai`

---
*Built with Next.js 15 and Vercel AI SDK.*
