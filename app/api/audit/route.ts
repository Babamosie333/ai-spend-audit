import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { inputJson, resultJson, totalMonthlySavings, totalAnnualSavings } = body;

    const supabaseAdmin = getSupabaseAdmin();

    const publicId = nanoid(10);

    const { data, error } = await supabaseAdmin
      .from("audits")
      .insert({
        public_id: publicId,
        input_json: inputJson,
        result_json: resultJson,
        total_monthly_savings: totalMonthlySavings,
        total_annual_savings: totalAnnualSavings,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, publicId: data.public_id });
  } catch {
    return NextResponse.json({ ok: false, message: "Failed to save audit." }, { status: 500 });
  }
}
