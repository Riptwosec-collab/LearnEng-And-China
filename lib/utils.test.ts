import { describe, expect, it } from "vitest";
import { clamp, cn, formatPercent } from "./utils";

describe("utils", () => {
  it("merges class names", () => {
    expect(cn("px-2", false && "hidden", "px-4")).toContain("px-4");
  });

  it("formats percentages", () => {
    expect(formatPercent(12.4)).toBe("12%");
    expect(formatPercent(12.6)).toBe("13%");
  });

  it("clamps values", () => {
    expect(clamp(-10)).toBe(0);
    expect(clamp(50)).toBe(50);
    expect(clamp(120)).toBe(100);
  });
});
