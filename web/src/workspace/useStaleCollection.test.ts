import { describe, expect, it } from "vitest";
import { isStale, STALE_MESSAGE } from "./useStaleCollection";

describe("useStaleCollection", () => {
  it("describes an out-of-date view without blaming another tab or session (#498)", () => {
    expect(STALE_MESSAGE).toBe(
      "Your collection has changed since this view loaded."
    );
    expect(STALE_MESSAGE).not.toMatch(/another tab|session/i);
  });

  it("marks the workspace stale only when both gallery and tree are ready at an older revision", () => {
    expect(isStale(5, 4, "ready", 5, true)).toBe(true);
    expect(isStale(5, 5, "ready", 4, true)).toBe(true);
    expect(isStale(5, 5, "ready", 5, true)).toBe(false);
    expect(isStale(5, 4, "loading", 5, true)).toBe(false);
    expect(isStale(5, 4, "ready", 5, false)).toBe(false);
    expect(isStale(null, 4, "ready", 4, true)).toBe(false);
  });
});
