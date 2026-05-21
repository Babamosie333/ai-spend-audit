export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-zinc-300">
          Free AI Spend Audit for startups
        </span>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight">
          Find wasted spend across your AI tools in 60 seconds.
        </h1>

        <p className="max-w-2xl text-lg text-zinc-300">
          Enter your AI subscriptions and API spend, then get a clear audit with cheaper alternatives, savings, and a shareable report.
        </p>

        <div className="flex gap-3">
          <a
            href="/audit/new"
            className="rounded-xl bg-white px-5 py-3 font-medium text-zinc-950"
          >
            Start free audit
          </a>
          <a
            href="#how-it-works"
            className="rounded-xl border border-white/10 px-5 py-3 font-medium text-white"
          >
            See how it works
          </a>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold">1. Add tools</h2>
            <p className="text-zinc-300">List the AI products you pay for, your plan, seats, and team size.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold">2. Get audit</h2>
            <p className="text-zinc-300">See where you are overpaying and what to switch to.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold">3. Share result</h2>
            <p className="text-zinc-300">Save, email, and share a public version of the report.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
