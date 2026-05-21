import { describe, expect, it } from "vitest";
import { runAudit } from "@/lib/audit/rules";

describe("runAudit", () => {
  it("downgrades solo business plans", () => {
    const result = runAudit({
      teamSize: 1,
      useCase: "coding",
      tools: [{ tool: "cursor", plan: "Business", spend: 40, seats: 1 }],
    });

    expect(result.totalMonthlySavings).toBeGreaterThan(0);
  });
});
