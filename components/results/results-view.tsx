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

type Props = {
  result: AuditResult;
  publicMode?: boolean;
};

function formatMoney(value: number) {
  return `$${value.toFixed(2)}`;
}

export function ResultsView({ result, publicMode = false }: Props) {
  const isLowSavings = result.totalMonthlySavings < 100;
  const isHighSavings = result.totalMonthlySavings >= 500;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              AI spend audit result
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              {isLowSavings
                ? "Your AI stack looks fairly efficient."
                : "You have meaningful savings available."}
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-300">
              {isLowSavings
                ? "We did not force artificial savings. Your current mix looks reasonably aligned with your usage, with only small optimization opportunities."
                : "We found concrete opportunities to reduce your monthly AI spend through plan changes, right-sizing, and better vendor-fit decisions."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <p className="text-sm text-emerald-200">Monthly savings</p>
                <p className="mt-2 text-3xl font-semibold">
                  {formatMoney(result.totalMonthlySavings)}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                <p className="text-sm text-cyan-200">Annual savings</p>
                <p className="mt-2 text-3xl font-semibold">
                  {formatMoney(result.totalAnnualSavings)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Recommendation
            </p>

            {isHighSavings ? (
              <>
                <h2 className="mt-3 text-2xl font-semibold">
                  Credex should be part of the next step.
                </h2>
                <p className="mt-3 text-zinc-300">
                  Your savings are large enough that procurement help and discounted credits could matter meaningfully. This is the segment where Credex should be surfaced strongly.
                </p>
                {!publicMode && (
                  <button
                    className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-zinc-950"
                    type="button"
                  >
                    Book Credex consultation
                  </button>
                )}
              </>
            ) : (
              <>
                <h2 className="mt-3 text-2xl font-semibold">
                  Small improvements, no forced upsell.
                </h2>
                <p className="mt-3 text-zinc-300">
                  This stack is already fairly optimized. Keep the recommendations honest and use a softer lead capture path instead of pushing consultation.
                </p>
                {!publicMode && (
                  <button
                    className="mt-6 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white"
                    type="button"
                  >
                    Notify me about future optimizations
                  </button>
                )}
              </>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Per-tool breakdown</h2>
              <p className="mt-2 text-zinc-300">
                Each recommendation explains the current spend, suggested action, savings, and the reason behind it.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {result.items.map((item, index) => (
              <article
                key={`${item.tool}-${index}`}
                className="rounded-2xl border border-white/10 bg-zinc-950/50 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.18em] text-zinc-400">
                      {item.tool.replace("_", " ")}
                    </p>
                    <h3 className="text-xl font-semibold">{item.recommendedAction}</h3>
                    <p className="max-w-2xl text-zinc-300">{item.reason}</p>
                  </div>

                  <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 md:grid-cols-1">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-zinc-400">Current spend</p>
                      <p className="mt-1 text-lg font-semibold">
                        {formatMoney(item.currentSpend)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                      <p className="text-sm text-emerald-200">Estimated savings</p>
                      <p className="mt-1 text-lg font-semibold">
                        {formatMoney(item.estimatedSavings)}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">How to read this</h2>
            <p className="mt-3 text-zinc-300">
              This audit is rule-based and intentionally conservative. It does not invent savings where the current setup already fits the team size or use case.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Shareability</h2>
            <p className="mt-3 text-zinc-300">
              The public version should show tools and savings, but strip personally identifying fields such as company name and email before sharing.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
