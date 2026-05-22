export const mockResults: Record<
  string,
  {
    items: {
      tool: string;
      currentSpend: number;
      recommendedAction: string;
      estimatedSavings: number;
      reason: string;
    }[];
    totalMonthlySavings: number;
    totalAnnualSavings: number;
    shouldShowCredex: boolean;
  }
> = {
  "demo-high-savings": {
    items: [
      {
        tool: "cursor",
        currentSpend: 40,
        recommendedAction: "Downgrade to Pro",
        estimatedSavings: 20,
        reason: "A very small team is unlikely to need Cursor Business.",
      },
      {
        tool: "copilot",
        currentSpend: 39,
        recommendedAction: "Move to Business",
        estimatedSavings: 20,
        reason: "Enterprise pricing is difficult to justify for a solo or very small team.",
      },
      {
        tool: "claude",
        currentSpend: 100,
        recommendedAction: "Downgrade to Pro",
        estimatedSavings: 80,
        reason: "Claude Max appears oversized for the current usage profile.",
      },
      {
        tool: "openai_api",
        currentSpend: 600,
        recommendedAction: "Review credits-based procurement path",
        estimatedSavings: 450,
        reason: "API spend at this level may justify discounted credits procurement.",
      },
    ],
    totalMonthlySavings: 570,
    totalAnnualSavings: 6840,
    shouldShowCredex: true,
  },
  "demo-low-savings": {
    items: [
      {
        tool: "cursor",
        currentSpend: 20,
        recommendedAction: "Keep current plan",
        estimatedSavings: 0,
        reason: "The current plan is already aligned with a solo developer workflow.",
      },
      {
        tool: "claude",
        currentSpend: 20,
        recommendedAction: "Keep current plan",
        estimatedSavings: 10,
        reason: "There may be a small downgrade opportunity depending on actual usage limits.",
      },
    ],
    totalMonthlySavings: 10,
    totalAnnualSavings: 120,
    shouldShowCredex: false,
  },
};
