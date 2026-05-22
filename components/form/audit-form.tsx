"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ToolRow, type ToolRowData } from "./tool-row";
import { runAudit } from "@/lib/audit/rules";


type FormState = {
  teamSize: string;
  useCase: "coding" | "writing" | "research" | "data" | "mixed";
  tools: ToolRowData[];
};

const STORAGE_KEY = "ai-spend-audit-draft";

const defaultState: FormState = {
  teamSize: "1",
  useCase: "coding",
  tools: [
    { tool: "cursor", plan: "Pro", spend: "20", seats: "1" },
  ],
};

export function AuditForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<FormState>(defaultState);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, mounted]);

  const addTool = () => {
    setState((prev) => ({
      ...prev,
      tools: [
        ...prev.tools,
        { tool: "copilot", plan: "Individual", spend: "10", seats: "1" },
      ],
    }));
  };

  const updateTool = (index: number, value: ToolRowData) => {
    setState((prev) => {
      const tools = [...prev.tools];
      tools[index] = value;
      return { ...prev, tools };
    });
  };

  const removeTool = (index: number) => {
    setState((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index),
    }));
  };

  const preview = useMemo(() => {
    return runAudit({
      teamSize: Number(state.teamSize || 0),
      useCase: state.useCase,
      tools: state.tools.map((t) => ({
        tool: t.tool,
        plan: t.plan,
        spend: Number(t.spend || 0),
        seats: Number(t.seats || 0),
      })),
    });
  }, [state]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = runAudit({
      teamSize: Number(state.teamSize || 0),
      useCase: state.useCase,
      tools: state.tools.map((t) => ({
        tool: t.tool,
        plan: t.plan,
        spend: Number(t.spend || 0),
        seats: Number(t.seats || 0),
      })),
    });
    localStorage.setItem("ai-spend-audit-result", JSON.stringify(result));
    router.push("/audit/result");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-zinc-300">Team size</label>
          <input
            type="number"
            min="1"
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
            value={state.teamSize}
            onChange={(e) => setState((p) => ({ ...p, teamSize: e.target.value }))}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">Primary use case</label>
          <select
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
            value={state.useCase}
            onChange={(e) =>
              setState((p) => ({
                ...p,
                useCase: e.target.value as FormState["useCase"],
              }))
            }
          >
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="research">Research</option>
            <option value="data">Data</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {state.tools.map((tool, index) => (
          <ToolRow
            key={index}
            value={tool}
            index={index}
            onChange={updateTool}
            onRemove={removeTool}
            canRemove={state.tools.length > 1}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addTool}
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white"
        >
          Add tool
        </button>
        <button
          type="submit"
          className="rounded-xl bg-white px-5 py-3 font-medium text-zinc-950"
        >
          Run audit
        </button>
      </div>

      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-100">
        <p className="text-sm">Live preview</p>
        <p className="mt-1 text-lg font-semibold">
          ${preview.totalMonthlySavings.toFixed(2)} / mo savings
        </p>
      </div>
    </form>
  );
}
