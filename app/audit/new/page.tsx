import { AuditForm } from "@/components/form/audit-form";

export default function NewAuditPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="text-4xl font-semibold">Start your audit</h1>
          <p className="mt-2 max-w-2xl text-zinc-300">
            Add the AI tools your team pays for, then see where you can save.
          </p>
        </div>

        <AuditForm />
      </div>
    </main>
  );
}
