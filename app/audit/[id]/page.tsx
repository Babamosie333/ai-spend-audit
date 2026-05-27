import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import { ResultsView } from "@/components/results/results-view";

type Props = {
  params: Promise<{ id: string }>;
};

async function getAudit(id: string) {
  const supabaseAdmin = getSupabaseAdmin();

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

  return {
    title: `AI Spend Audit: Save $${Number(audit.total_monthly_savings || 0).toFixed(0)}/mo`,
  };
}

export default async function PublicAuditPage({ params }: Props) {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) notFound();

  return <ResultsView result={audit.result_json} publicMode />;
}
