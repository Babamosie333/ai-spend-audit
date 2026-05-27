import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { ResultsView } from "@/components/results/results-view";

type Props = {
  params: Promise<{ id: string }>;
};

async function getAudit(id: string) {
  const { data, error } = await supabaseAdmin
    .from("audits")
    .select("*")
    .eq("public_id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) {
    return { title: "Audit not found" };
  }

  const monthly = Number(audit.total_monthly_savings || 0).toFixed(0);
  const annual = Number(audit.total_annual_savings || 0).toFixed(0);

  return {
    title: `AI Spend Audit: Save $${monthly}/mo`,
    description: `Per-tool recommendations with estimated annual savings of $${annual}.`,
    openGraph: {
      title: `AI Spend Audit: Save $${monthly}/mo`,
      description: `Per-tool recommendations with estimated annual savings of $${annual}.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `AI Spend Audit: Save $${monthly}/mo`,
      description: `Per-tool recommendations with estimated annual savings of $${annual}.`,
    },
  };
}

export default async function PublicAuditPage({ params }: Props) {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) notFound();

  const result = audit.result_json;

  return <ResultsView result={result} publicMode />;
}
