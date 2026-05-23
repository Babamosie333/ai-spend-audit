"use client";

import { useState } from "react";

type Props = {
  auditId?: string;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
};

export function LeadCaptureForm({
  auditId,
  totalMonthlySavings,
  totalAnnualSavings,
}: Props) {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const leadRes = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          companyName,
          role,
          teamSize,
          auditId,
          totalMonthlySavings,
          totalAnnualSavings,
          website,
        }),
      });

      const leadData = await leadRes.json();

      if (!leadRes.ok) {
        setMessage(leadData.message || "Could not save lead.");
        setLoading(false);
        return;
      }

      const emailRes = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          totalMonthlySavings,
          totalAnnualSavings,
        }),
      });

      const emailData = await emailRes.json();

      if (!emailRes.ok) {
        setMessage(emailData.message || "Lead saved, but email failed.");
        setLoading(false);
        return;
      }

      setMessage("Your report was saved and a confirmation email was sent.");
      setEmail("");
      setCompanyName("");
      setRole("");
      setTeamSize("");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-zinc-300">Email</label>
          <input
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="founder@company.com"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">Company name</label>
          <input
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Labs"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">Role</label>
          <input
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Founder"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">Team size</label>
          <input
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
            type="number"
            min="1"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder="5"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-white px-5 py-3 font-medium text-zinc-950 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Email me this report"}
      </button>

      {message ? <p className="text-sm text-zinc-300">{message}</p> : null}
    </form>
  );
}
