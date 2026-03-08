# Missing Part Number — Mopar/Chrysler

Category config for detecting and responding to customer emails that are missing a part number.

---

## Detection

### Maker Keywords
Email must reference one or more of these makers (case-insensitive):
- Dodge
- Ram
- Chrysler
- Mopar
- Jeep

### Part Number Format
- Mopar/Chrysler part numbers are **8 digits** (e.g., `04606200`)
- Customers sometimes include trailing letters (e.g., `04606200AK`) — the 8 digits are what matter
- A regex match of `\d{8}` anywhere in the email body means a part number **is present**

### Classification Rule
Flag as `missing-part-number` when:
1. Email body contains at least one maker keyword (see above), AND
2. Email body does **not** contain an 8-digit number (`\d{8}`)

### Do NOT flag when:
- Customer provides an 8+ digit number (they have a part number, even if wrong)
- Email is about a non-Mopar vehicle (Ford, GM, Honda, etc.)
- Email is a return, complaint, or shipping question (not a product inquiry)

---

## Response Template

Use this template when an email is classified as `missing-part-number`:

> Hello and thanks for reaching out,
>
> To better assist, please let us know your original ECU part number on the long skinny sticker as these units are part number specific, not vehicle specific. Once we have that information, we can move forward with locating the correct replacement and can better assist.
>
> Thanks!

**Source:** "Mopar Not Vehicle Specific" from Customer Service.md

---

## Examples

### Should match (missing part number):

**Email 1:**
> I have a 2019 Ram 1500 and need an ECU. Will this one work?

- Maker keyword: "Ram" ✓
- 8-digit number: none ✓
- **Result:** missing-part-number → send template

**Email 2:**
> Looking for a PCM for my 2015 Dodge Charger RT. Can you help?

- Maker keyword: "Dodge" ✓
- 8-digit number: none ✓
- **Result:** missing-part-number → send template

**Email 3:**
> Do you have a replacement ECU for a Chrysler 300? My mechanic says I need one.

- Maker keyword: "Chrysler" ✓
- 8-digit number: none ✓
- **Result:** missing-part-number → send template

### Should NOT match:

**Email 4:**
> I need an ECU for my Dodge Ram. Part number is 05150790AC.

- Maker keyword: "Dodge", "Ram" ✓
- 8-digit number: `05150790` ✓ (present)
- **Result:** do NOT flag — customer has a part number

**Email 5:**
> Need an ECU for my 2018 F-150.

- Maker keyword: none (Ford vehicle)
- **Result:** do NOT flag — not Mopar/Chrysler

**Email 6:**
> My Dodge Ram ECU you sent isn't working. I want a refund.

- Maker keyword: "Dodge", "Ram" ✓
- But this is a return/complaint, not a product inquiry
- **Result:** do NOT flag — different category
