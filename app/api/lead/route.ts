import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, companyName, role, teamSize, auditId, totalMonthlySavings, totalAnnualSavings, website } = body;

    if (website) {
      return NextResponse.json({ ok: false, message: "Spam detected." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert({
        email,
        company_name: companyName || null,
        role: role || null,
        team_size: teamSize ? Number(teamSize) : null,
        audit_id: auditId || null,
        total_monthly_savings: totalMonthlySavings ?? null,
        total_annual_savings: totalAnnualSavings ?? null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, lead: data });
  } catch {
    return NextResponse.json({ ok: false, message: "Something went wrong." }, { status: 500 });
  }
}
