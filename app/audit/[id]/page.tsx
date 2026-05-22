import type { Metadata } from "next";
import { ResultsView } from "@/components/results/results-view";
import { mockResults } from "@/lib/mock-results";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = mockResults[id];

  if (!result) {
    return {
      title: "Audit not found",
      description: "This audit could not be found.",
    };
  }

  return {
    title: `AI Spend Audit: Save $${result.totalMonthlySavings.toFixed(0)}/mo`,
    description: `See this AI spend audit and estimated annual savings of $${result.totalAnnualSavings.toFixed(
      0
    )}.`,
    openGraph: {
      title: `AI Spend Audit: Save $${result.totalMonthlySavings.toFixed(0)}/mo`,
      description: `Per-tool recommendations and estimated annual savings of $${result.totalAnnualSavings.toFixed(
        0
      )}.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `AI Spend Audit: Save $${result.totalMonthlySavings.toFixed(0)}/mo`,
      description: `Per-tool recommendations and estimated annual savings of $${result.totalAnnualSavings.toFixed(
        0
      )}.`,
    },
  };
}

export default async function PublicAuditPage({ params }: Props) {
  const { id } = await params;
  const result = mockResults[id];

  if (!result) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-semibold">Audit not found</h1>
          <p className="mt-3 text-zinc-300">
            This shared report does not exist or has been removed.
          </p>
        </div>
      </main>
    );
  }

  return <ResultsView result={result} publicMode />;
}
