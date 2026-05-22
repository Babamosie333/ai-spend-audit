"use client";

import { useEffect, useState } from "react";
import { ResultsView } from "@/components/results/results-view";

type AuditItem = {
  tool: string;
  currentSpend: number;
  recommendedAction: string;
  estimatedSavings: number;
  reason: string;
};

type AuditResult = {
  items: AuditItem[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  shouldShowCredex: boolean;
};

export default function ResultPage() {
  const [result, setResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("ai-spend-audit-result");
    if (!raw) return;

    try {
      setResult(JSON.parse(raw));
    } catch {
      setResult(null);
    }
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-semibold">No audit result found</h1>
          <p className="mt-3 text-zinc-300">
            Run the audit form first so this page has a result to display.
          </p>
        </div>
      </main>
    );
  }

  return <ResultsView result={result} />;
}
