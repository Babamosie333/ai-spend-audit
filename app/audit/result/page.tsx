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
  const [publicId, setPublicId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("ai-spend-audit-result");
    const id = localStorage.getItem("ai-spend-audit-public-id");
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch {}
    }
    if (id) setPublicId(id);
  }, []);

  const shareUrl =
    typeof window !== "undefined" && publicId
      ? `${window.location.origin}/audit/${publicId}`
      : null;

  const handleCopy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-semibold">No result found</h1>
          <p className="mt-3 text-zinc-300">
            Run the audit form first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div>
      {shareUrl && (
        <div className="bg-zinc-900 border-b border-white/10 px-6 py-3">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <p className="text-sm text-zinc-300">
              Shareable link:{" "}
              <span className="font-mono text-white">{shareUrl}</span>
            </p>
            <button
              onClick={handleCopy}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>
      )}
      <ResultsView result={result} />
    </div>
  );
}
