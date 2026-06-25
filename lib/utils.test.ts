import { describe, expect, it } from "vitest";
import { clamp, cn, formatPercent } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });
});

describe("formatPercent", () => {
  it("rounds and appends a percent sign", () => {
    expect(formatPercent(42.6)).toBe("43%");
    expect(formatPercent(0)).toBe("0%");
    expect(formatPercent(100)).toBe("100%");
  });
});

describe("clamp", () => {
  it("keeps values within the default 0-100 range", () => {
    expect(clamp(-10)).toBe(0);
    expect(clamp(150)).toBe(100);
    expect(clamp(55)).toBe(55);
  });

  it("respects custom min/max bounds", () => {
    expect(clamp(5, 10, 20)).toBe(10);
    expect(clamp(25, 10, 20)).toBe(20);
    expect(clamp(15, 10, 20)).toBe(15);
  });
});
