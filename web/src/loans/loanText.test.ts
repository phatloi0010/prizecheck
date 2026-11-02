import { describe, expect, it } from "vitest";
import { loanRoleFact, UNSORTED_DESTINATION_FACT } from "./loanText";

describe("loanRoleFact and destination wording (#499)", () => {
  it("shows present-tense role facts while a Loan is open", () => {
    for (const state of [
      "requested",
      "offered",
      "accepted",
      "handed_over",
    ] as const) {
      expect(
        loanRoleFact({ role: "borrower", state, closed_reason: null })
      ).toBe("You're borrowing");
      expect(loanRoleFact({ role: "lender", state, closed_reason: null })).toBe(
        "You're lending"
      );
    }
  });

  it("omits the role fact when a Loan closes before any handover", () => {
    for (const closed_reason of [
      "declined",
      "withdrawn",
      "cancelled",
    ] as const) {
      expect(
        loanRoleFact({ role: "borrower", state: "closed", closed_reason })
      ).toBeNull();
      expect(
        loanRoleFact({ role: "lender", state: "closed", closed_reason })
      ).toBeNull();
    }
  });

  it("uses past-tense role facts when a handed-over Loan ends by return or write-off", () => {
    for (const closed_reason of ["returned", "written_off"] as const) {
      expect(
        loanRoleFact({ role: "borrower", state: "closed", closed_reason })
      ).toBe("You borrowed");
      expect(
        loanRoleFact({ role: "lender", state: "closed", closed_reason })
      ).toBe("You lent");
    }
  });

  it("says in plain words that an open Loan without a Deck goes to Unsorted", () => {
    expect(UNSORTED_DESTINATION_FACT).toBe("Goes to Unsorted");
  });
});
