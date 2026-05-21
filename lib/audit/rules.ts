import { pricing } from "@/data/pricing";

type ToolKey = keyof typeof pricing;

export type AuditInput = {
  teamSize: number;
  useCase: "coding" | "writing" | "research" | "data" | "mixed";
  tools: {
    tool: ToolKey;
    plan: string;
    spend: number;
    seats: number;
  }[];
};

export type AuditItem = {
  tool: string;
  currentSpend: number;
  recommendedAction: string;
  estimatedSavings: number;
  reason: string;
};

export type AuditResult = {
  items: AuditItem[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  shouldShowCredex: boolean;
};

function planPrice(tool: ToolKey, plan: string) {
  return pricing[tool].find((p) => p.name.toLowerCase() === plan.toLowerCase())?.monthlyPrice ?? null;
}

export function runAudit(input: AuditInput): AuditResult {
  const items = input.tools.map((item) => {
    const officialPrice = planPrice(item.tool, item.plan);
    let estimatedSavings = 0;
    let recommendedAction = "Keep current plan";
    let reason = "This setup looks reasonable.";

    if (item.seats === 1 && /team|business|enterprise/i.test(item.plan)) {
      const cheaper = item.tool === "cursor" ? 20 : item.tool === "copilot" ? 10 : 20;
      estimatedSavings = Math.max(0, item.spend - cheaper);
      recommendedAction = "Downgrade to an individual plan";
      reason = "A team-grade plan is usually unnecessary for a solo user.";
    }

    if (item.tool === "cursor" && input.teamSize <= 2 && /business/i.test(item.plan)) {
      estimatedSavings = Math.max(estimatedSavings, item.spend - 20);
      recommendedAction = "Downgrade to Pro";
      reason = "Cursor Business is likely overkill for a very small team.";
    }

    if (item.tool === "copilot" && input.teamSize === 1 && /business|enterprise/i.test(item.plan)) {
      estimatedSavings = Math.max(estimatedSavings, item.spend - 10);
      recommendedAction = "Downgrade to Individual";
      reason = "Copilot Individual is enough for one person.";
    }

    if (item.tool === "claude" && /max/i.test(item.plan) && input.useCase !== "mixed") {
      estimatedSavings = Math.max(estimatedSavings, item.spend - 20);
      recommendedAction = "Downgrade to Pro";
      reason = "Claude Pro is often enough unless usage is heavy.";
    }

    if (officialPrice !== null && item.spend > officialPrice) {
      estimatedSavings = Math.max(estimatedSavings, item.spend - officialPrice);
      recommendedAction = `Move to official ${item.tool} pricing`;
      reason = "You appear to be paying more than list price.";
    }

    return {
      tool: item.tool,
      currentSpend: item.spend,
      recommendedAction,
      estimatedSavings,
      reason,
    };
  });

  const totalMonthlySavings = items.reduce((sum, item) => sum + item.estimatedSavings, 0);

  return {
    items,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    shouldShowCredex: totalMonthlySavings >= 500,
  };
}
