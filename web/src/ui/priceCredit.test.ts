import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PriceCredit } from "./PriceCredit";

describe("PriceCredit (#467)", () => {
  it("renders the footer credit linking tcgcsv.com with a 44 px phone target and no date or time", () => {
    const html = renderToStaticMarkup(createElement(PriceCredit));
    expect(html).toContain("Prices from");
    expect(html).toContain('href="https://tcgcsv.com"');
    expect(html).toContain("phone:min-h-tap");
    expect(html.replace(/<[^>]+>/g, "")).toBe("Prices from TCGCSV");
    expect(html.replace(/<[^>]+>/g, "")).not.toMatch(/\d/);
  });

  it("is rendered only in SettingsPage and not in Shell or PublicLayout", () => {
    const root = resolve(import.meta.dirname, "..");
    const settings = readFileSync(
      resolve(root, "settings/SettingsPage.tsx"),
      "utf-8"
    );
    const shell = readFileSync(resolve(root, "shell/Shell.tsx"), "utf-8");
    const publicLayout = readFileSync(
      resolve(root, "public/PublicLayout.tsx"),
      "utf-8"
    );
    const priceCredit = readFileSync(
      resolve(root, "ui/PriceCredit.tsx"),
      "utf-8"
    );

    expect(settings).toContain("<PriceCredit");
    expect(shell).not.toContain("PriceCredit");
    expect(publicLayout).not.toContain("PriceCredit");
    expect(priceCredit).not.toMatch(/^\s*import\s/m);
  });
});
