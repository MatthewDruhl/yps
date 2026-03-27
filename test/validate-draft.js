#!/usr/bin/env node
/**
 * validate-draft.js
 * Deterministic pre-validation for YPS email drafts.
 *
 * Usage:
 *   echo '<json>' | node test/validate-draft.js
 *   node test/validate-draft.js < input.json
 *
 * Input JSON fields:
 *   draft        {string}   Full draft text
 *   category     {string}   product-inquiry | rnr-inquiry | order-issue
 *   productType  {string}   e.g. TIPM, ABS, ECM, GEM (optional)
 *   make         {string}   Vehicle make from customer email (optional)
 *   modelYear    {number}   Vehicle model year (optional, used for GM ABS check)
 *   username     {string}   Customer eBay username (optional)
 *   to           {string}   Recipient email/username
 *   cc           {string[]} CC list (should be empty)
 *   bcc          {string[]} BCC list (should be empty)
 *   customerText {string}   Original customer email body (for terminology + P06xx checks)
 *   attachment   {string}   Attachment filename set in draft metadata (or "" if none)
 *   hasPartNumber {boolean} Whether the customer provided a part number in their email
 *
 * Output: JSON with shape { passed: number, failed: number, results: Check[] }
 * Each Check: { id: string, description: string, status: "PASS"|"FAIL", detail?: string }
 */

const FILLER_OPENERS = [
  "great question",
  "absolutely!",
  "absolutely,",
  "so you've come to the right place",
  "so you have come to the right place",
  "happy to help",
  "great news",
  "certainly!",
  "certainly,",
  "of course!",
  "of course,",
  "sure thing",
];

const QUOTE_PATTERNS = [
  /^>/m,
  /^-{3,}\s*original message\s*-{3,}/im,
  /^on .+ wrote:/im,
  /^from:\s+.+@/im,
];

const FITMENT_WARNING =
  "DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM!";

const DODGE_MAKES = ["dodge", "chrysler", "jeep", "ram", "fiat", "mopar"];
const GM_MAKES = ["gm", "general motors", "chevrolet", "chevy", "gmc", "buick", "cadillac", "pontiac", "oldsmobile", "saturn"];
const FORD_MAKES = ["ford", "lincoln", "mercury"];

// Terminology pairs: [customerTerm, incorrectTerm]
const TERMINOLOGY_PAIRS = [
  ["ECU", "ECM"],
  ["ECM", "ECU"],
  ["TCU", "TCM"],
  ["TCM", "TCU"],
];

function expectedAttachment(productType, make, modelYear, hasPartNumber) {
  if (hasPartNumber) return null; // no attachment needed when we already have the part number
  const pt = (productType || "").toUpperCase();
  const mk = (make || "").toLowerCase();
  if (pt === "TIPM") return "knowledge/images/tipm_part_number.png";
  if (pt === "ABS") {
    if (GM_MAKES.some((m) => mk.includes(m)) && modelYear >= 2000 && modelYear <= 2006)
      return "knowledge/images/gm_abs_part_number_stickers.png";
    if (DODGE_MAKES.some((m) => mk.includes(m)))
      return "knowledge/images/mopar_abs_pn.png";
    if (FORD_MAKES.some((m) => mk.includes(m)))
      return "knowledge/images/ford_abs_pn.png";
  }
  if (["ECM", "ECU", "PCM"].includes(pt)) {
    if (DODGE_MAKES.some((m) => mk.includes(m)))
      return "knowledge/images/mopar_ecm_pn_sticker.png";
  }
  return null; // no defined attachment for this product type / make combination
}

function lines(text) {
  return text.split(/\r?\n/);
}

function nonEmpty(lineArr) {
  return lineArr.filter((l) => l.trim().length > 0);
}

function check(id, description, pass, detail) {
  return { id, description, status: pass ? "PASS" : "FAIL", ...(detail ? { detail } : {}) };
}

function runChecks(input) {
  const {
    draft = "",
    category = "",
    productType = "",
    make = "",
    modelYear,
    username = "",
    to = "",
    cc = [],
    bcc = [],
    customerText = "",
    attachment = "",
    hasPartNumber = false,
  } = input;

  const results = [];
  const draftLines = lines(draft);
  const draftNonEmpty = nonEmpty(draftLines);
  const firstLine = draftNonEmpty[0] || "";
  const lastLine = draftNonEmpty[draftNonEmpty.length - 1] || "";
  const draftLower = draft.toLowerCase();
  const cat = category.toLowerCase();

  // ── 1. Greeting starts with "Hello" ──────────────────────────────────────
  const greetingOk = firstLine.startsWith("Hello");
  let greetingDetail;
  if (!greetingOk) {
    greetingDetail = `First line: "${firstLine.slice(0, 60)}"`;
  } else if (username && firstLine.toLowerCase().includes(username.toLowerCase())) {
    results.push(check(
      "greeting",
      'Greeting starts with "Hello" — not username',
      false,
      `Username "${username}" appears in greeting`,
    ));
    goto_sign_off: {
      break goto_sign_off;
    }
  }
  if (greetingOk && (!username || !firstLine.toLowerCase().includes(username.toLowerCase()))) {
    results.push(check("greeting", 'Greeting starts with "Hello" — not "Hi", "Hey", or username', true));
  } else if (!greetingOk) {
    results.push(check("greeting", 'Greeting starts with "Hello" — not "Hi", "Hey", or username', false, greetingDetail));
  }

  // ── 2. No filler openers ─────────────────────────────────────────────────
  const fillerFound = FILLER_OPENERS.find((f) => draftLower.includes(f));
  results.push(check(
    "no_filler",
    "No filler openers",
    !fillerFound,
    fillerFound ? `Found: "${fillerFound}"` : undefined,
  ));

  // ── 3. Signs off with "YPS" ──────────────────────────────────────────────
  results.push(check(
    "signoff",
    'Signs off with "YPS"',
    lastLine.trim() === "YPS",
    lastLine.trim() !== "YPS" ? `Last line: "${lastLine.trim()}"` : undefined,
  ));

  // ── 4. No quoted original email ──────────────────────────────────────────
  const quoteMatch = QUOTE_PATTERNS.find((p) => p.test(draft));
  results.push(check(
    "no_quote",
    "No quoted original email at the bottom",
    !quoteMatch,
    quoteMatch ? `Matched pattern: ${quoteMatch}` : undefined,
  ));

  // ── 5. Single recipient — no CC / BCC ───────────────────────────────────
  const ccOk = !cc || cc.length === 0;
  const bccOk = !bcc || bcc.length === 0;
  results.push(check(
    "single_recipient",
    "Single recipient only — no CC, no BCC",
    ccOk && bccOk,
    !ccOk ? `CC: ${cc.join(", ")}` : !bccOk ? `BCC: ${bcc.join(", ")}` : undefined,
  ));

  // ── 6. No pricing ────────────────────────────────────────────────────────
  const pricingMatch = draft.match(/\$\d[\d,]*(\.\d{2})?/);
  results.push(check(
    "no_pricing",
    "No pricing included",
    !pricingMatch,
    pricingMatch ? `Found: "${pricingMatch[0]}"` : undefined,
  ));

  // ── 7. Fitment warning (product-inquiry and rnr-inquiry only) ────────────
  if (cat === "product-inquiry" || cat === "rnr-inquiry") {
    results.push(check(
      "fitment_warning",
      "Fitment warning present — exact ALL CAPS phrasing",
      draft.includes(FITMENT_WARNING),
      !draft.includes(FITMENT_WARNING) ? "Warning text not found or not exact" : undefined,
    ));
  }

  // ── 8. "rebuilt" only for GM ABS 2000–2006 ──────────────────────────────
  if (draftLower.includes("rebuilt")) {
    const isGmAbs =
      productType.toUpperCase() === "ABS" &&
      GM_MAKES.some((m) => make.toLowerCase().includes(m)) &&
      modelYear >= 2000 &&
      modelYear <= 2006;
    results.push(check(
      "rebuilt_usage",
      '"rebuilt" only for GM ABS 2000–2006',
      isGmAbs,
      !isGmAbs
        ? `"rebuilt" used but product type is "${productType}", make is "${make}", year is ${modelYear ?? "unknown"}`
        : undefined,
    ));
  } else {
    results.push(check("rebuilt_usage", '"rebuilt" only for GM ABS 2000–2006', true));
  }

  // ── 9. Dodge/Chrysler/Jeep — 8-digit part number, no prefix/suffix ───────
  const isDodgeMake = DODGE_MAKES.some((m) => make.toLowerCase().includes(m));
  if (isDodgeMake) {
    const badFormat = draft.match(/\bP?\d{8}[A-Z]{2}\b|\bP\d{8}\b/);
    results.push(check(
      "dodge_part_number",
      "Dodge/Chrysler/Jeep — 8-digit part number only (no prefix/suffix)",
      !badFormat,
      badFormat ? `Found non-stripped part number: "${badFormat[0]}"` : undefined,
    ));
  }

  // ── 10. eBay link format ─────────────────────────────────────────────────
  const ebayLinks = draft.match(/https?:\/\/[^\s)>]*(ebay\.com)[^\s)>]*/gi) || [];
  const badLinks = ebayLinks.filter((l) => !/https:\/\/www\.ebay\.com\/itm\/\d+$/.test(l));
  results.push(check(
    "ebay_link_format",
    "eBay links use https://www.ebay.com/itm/{ItemId} format",
    badLinks.length === 0,
    badLinks.length > 0 ? `Bad link(s): ${badLinks.join(", ")}` : undefined,
  ));

  // ── 11. Diagnostic fee closing (rnr-inquiry only) ────────────────────────
  if (cat === "rnr-inquiry") {
    results.push(check(
      "diagnostic_fee",
      "Diagnostic fee closing paragraph present",
      draftLower.includes("diagnostic fee"),
      !draftLower.includes("diagnostic fee") ? '"diagnostic fee" not found in draft' : undefined,
    ));
  }

  // ── 12. VIN / mileage not asked in rnr-inquiry ───────────────────────────
  if (cat === "rnr-inquiry") {
    const vinMatch = draft.match(/\bVIN\b/i);
    const mileageMatch = draft.match(/\bmileage\b/i);
    const vinOrMileage = vinMatch || mileageMatch;
    results.push(check(
      "no_vin_mileage_rnr",
      "rnr-inquiry: VIN and mileage not asked",
      !vinOrMileage,
      vinOrMileage ? `Found: "${(vinMatch || mileageMatch)[0]}" — do not ask for VIN or mileage in R&R replies` : undefined,
    ));
  }

  // ── 13. Warranty / return policy not volunteered ─────────────────────────
  if (cat === "product-inquiry" || cat === "rnr-inquiry") {
    const warrantyMatch = /\bwarranty\b/i.test(draft);
    // "repair and return" is part of the R&R service name — allow it; block "return policy" and "30-day return"
    const returnPolicyMatch = /return policy|30-day return|30 day return/i.test(draft);
    const volunteered = warrantyMatch || returnPolicyMatch;
    results.push(check(
      "no_volunteered_policy",
      "Warranty / return policy not volunteered (only share if customer asks)",
      !volunteered,
      volunteered
        ? warrantyMatch
          ? 'Found "warranty" — only share if customer asked'
          : 'Found return policy mention — only share if customer asked'
        : undefined,
    ));
  }

  // ── 14. Terminology matching ─────────────────────────────────────────────
  // Use leading-boundary only (no trailing \b) to catch plurals: ECMs, ECUs, etc.
  if (customerText) {
    for (const [customerTerm, incorrectTerm] of TERMINOLOGY_PAIRS) {
      const customerUsed = new RegExp(`\\b${customerTerm}`, "i").test(customerText);
      const draftUsesIncorrect = new RegExp(`\\b${incorrectTerm}`, "i").test(draft);
      const draftUsesCorrect = new RegExp(`\\b${customerTerm}`, "i").test(draft);
      if (customerUsed && draftUsesIncorrect && !draftUsesCorrect) {
        results.push(check(
          "terminology_match",
          "Terminology matches customer's language",
          false,
          `Customer used "${customerTerm}" but draft uses "${incorrectTerm}"`,
        ));
        break; // report first mismatch only
      }
    }
    // If no mismatch found, push a pass
    const anyMismatch = results.find((r) => r.id === "terminology_match");
    if (!anyMismatch) {
      results.push(check("terminology_match", "Terminology matches customer's language", true));
    }
  }

  // ── 15. Attachment present when required ─────────────────────────────────
  const required = expectedAttachment(productType, make, modelYear, hasPartNumber);
  if (required !== null) {
    const attachmentOk = (attachment || "").includes(required) || (attachment || "") === required;
    results.push(check(
      "attachment",
      "Required attachment present in draft metadata",
      attachmentOk,
      !attachmentOk
        ? `Expected: "${required}", found: "${attachment || "(none)"}"`
        : undefined,
    ));
  }

  return results;
}

function formatOutput(results) {
  const passed = results.filter((r) => r.status === "PASS").length;
  const failed = results.filter((r) => r.status === "FAIL").length;
  const lines = ["── Draft Validation ──", ""];
  for (const r of results) {
    const icon = r.status === "PASS" ? "PASS" : "FAIL";
    lines.push(`${icon}  ${r.description}${r.detail ? ` — ${r.detail}` : ""}`);
  }
  lines.push("");
  lines.push(`${results.length} checks: ${passed} passed, ${failed} failed`);
  return lines.join("\n");
}

// ── Main ────────────────────────────────────────────────────────────────────
let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch (e) {
    console.error("Error: invalid JSON input —", e.message);
    process.exit(1);
  }

  const results = runChecks(input);
  const failed = results.filter((r) => r.status === "FAIL").length;

  if (process.argv.includes("--json")) {
    const passed = results.filter((r) => r.status === "PASS").length;
    console.log(JSON.stringify({ passed, failed, results }, null, 2));
  } else {
    console.log(formatOutput(results));
  }

  process.exit(failed > 0 ? 1 : 0);
});
