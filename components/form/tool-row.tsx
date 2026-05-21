"use client";

import React from "react";

export type ToolName =
  | "cursor"
  | "copilot"
  | "claude"
  | "chatgpt"
  | "openai_api"
  | "anthropic_api"
  | "gemini"
  | "windsurf";

export type ToolRowData = {
  tool: ToolName;
  plan: string;
  spend: string;
  seats: string;
};

type Props = {
  value: ToolRowData;
  index: number;
  onChange: (index: number, value: ToolRowData) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
};

const toolPlans: Record<ToolName, string[]> = {
  cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  copilot: ["Individual", "Business", "Enterprise"],
  claude: ["Free", "Pro", "Max", "Team", "Enterprise"],
  chatgpt: ["Plus", "Team", "Enterprise", "API direct"],
  openai_api: ["API direct"],
  anthropic_api: ["API direct"],
  gemini: ["Pro", "Ultra", "API"],
  windsurf: ["Pro", "Team"],
};

const toolLabels: Record<ToolName, string> = {
  cursor: "Cursor",
  copilot: "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  openai_api: "OpenAI API",
  anthropic_api: "Anthropic API",
  gemini: "Gemini",
  windsurf: "Windsurf",
};

export function ToolRow({ value, index, onChange, onRemove, canRemove }: Props) {
  const plans = toolPlans[value.tool];

  return (
    <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Tool</label>
        <select
          className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
          value={value.tool}
          onChange={(e) =>
            onChange(index, {
              ...value,
              tool: e.target.value as ToolName,
              plan: toolPlans[e.target.value as ToolName][0],
            })
          }
        >
          {Object.entries(toolLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">Plan</label>
        <select
          className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
          value={value.plan}
          onChange={(e) => onChange(index, { ...value, plan: e.target.value })}
        >
          {plans.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">Monthly spend</label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
          value={value.spend}
          onChange={(e) => onChange(index, { ...value, spend: e.target.value })}
          placeholder="20"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">Seats</label>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            step="1"
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-white"
            value={value.seats}
            onChange={(e) => onChange(index, { ...value, seats: e.target.value })}
            placeholder="1"
          />
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-200"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
