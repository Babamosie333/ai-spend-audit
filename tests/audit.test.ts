import { describe, expect, it } from "vitest";
import { runAudit } from "@/lib/audit/rules";

describe("runAudit", () => {
  it("recommends downgrade for solo business plan", () => {
    const result = runAudit({
      teamSize: 1,
      useCase: "coding",
      tools: [{ tool: "cursor", plan: "Business", spend: 40, seats: 1 }],
    });
    expect(result.totalMonthlySavings).toBeGreaterThan(0);
    expect(result.items[0].recommendedAction).toContain("Downgrade");
  });

  it("keeps optimal plan with no savings", () => {
    const result = runAudit({
      teamSize: 1,
      useCase: "coding",
      tools: [{ tool: "cursor", plan: "Pro", spend: 20, seats: 1 }],
    });
    expect(result.items[0].estimatedSavings).toBe(0);
  });

  it("triggers Credex banner for high savings", () => {
    const result = runAudit({
      teamSize: 1,
      useCase: "coding",
      tools: [
        { tool: "cursor", plan: "Business", spend: 300, seats: 1 },
        { tool: "claude", plan: "Max", spend: 300, seats: 1 },
      ],
    });
    expect(result.shouldShowCredex).toBe(true);
  });

  it("does not trigger Credex for low savings", () => {
    const result = runAudit({
      teamSize: 2,
      useCase: "coding",
      tools: [{ tool: "copilot", plan: "Individual", spend: 10, seats: 1 }],
    });
    expect(result.shouldShowCredex).toBe(false);
  });

  it("calculates annual savings as 12x monthly", () => {
    const result = runAudit({
      teamSize: 1,
      useCase: "coding",
      tools: [{ tool: "cursor", plan: "Business", spend: 40, seats: 1 }],
    });
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
  });
});
