import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, totalMonthlySavings, totalAnnualSavings } = body;

    if (!email) {
      return NextResponse.json(
        { ok: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: `AI Spend Audit <${process.env.LEAD_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: [email],
      subject: "Your AI Spend Audit report",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h1>Your AI Spend Audit</h1>
          <p>Thanks for using the audit.</p>
          <p><strong>Estimated monthly savings:</strong> $${Number(totalMonthlySavings || 0).toFixed(2)}</p>
          <p><strong>Estimated annual savings:</strong> $${Number(totalAnnualSavings || 0).toFixed(2)}</p>
          <p>If your savings are meaningful, Credex may reach out with additional optimization options.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Failed to send email." },
      { status: 500 }
    );
  }
}
