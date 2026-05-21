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
});
