import { Header } from "@/components/layout/Header";
import { Filters } from "@/components/dashboard/Filters";
import { YieldTable } from "@/components/dashboard/YieldTable";
import { fetchYieldOpportunities } from "@/lib/defillama";

export const revalidate = 3600; // Cache for 1 hour

export default async function Home() {
  const data = await fetchYieldOpportunities();

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Smartest Yield <br /> Opportunities in DeFi
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover, analyze, and simulate the highest risk-adjusted yields across EVM networks.
            Powered by AI-driven insights and quantitative scoring.
          </p>
        </div>

        <Filters />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Top Opportunities</h2>
          </div>
          <YieldTable data={data} isLoading={false} />
        </div>
      </main>
    </>
  );
}
