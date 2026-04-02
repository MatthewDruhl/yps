# Order Issue — Example Emails & Responses
Last updated: 2026-04-02

Reference examples for drafting responses to customer order issues.
Claude uses these to match YPS's voice, tone, and response patterns.

---

## Key Patterns

1. **Lead with empathy** — "We are definitely here to help!" before any questions
2. **Pre-fill what you know** — use info from the email and listing; ask only for what's missing
3. **Never commit to a return in the first reply** — always gather info first
4. **Numbered list** — easier for buyers to reply to specific items
5. **Communication loss** — ask if the unit ever had communication when first installed; ask about codes *before* the loss, not just current codes

---

## Example 1: ECM — Unit Not Communicating After Install

**Customer email:**
- **Subject:** Re: your_part_source sent a message about 08 EXPLORER MOUNTAINEER 4.0L ECU PCM ECM ENGINE COMPUTER 8L2A-12A650-GC REBUILT
- **Body (multiple messages):**
> Please advise me on repair.
> I was told by program that it is not communication. That it needs replaced.
> I have had 3 different shop look into it.

**Context:** YPS previously programmed VIN and asked for diagnostics. Buyer responded with minimal info — 3 shops confirmed no communication.

**YPS response:**
> Hello again and thank you for reaching out to us regarding this. We are definitely here to help!
>
> We would like to get a little more information from you to see if we can figure out what is going on. We've noted a few things from your message - feel free to correct anything we have wrong:
>
> 1. Vehicle: 2008 Ford Explorer/Mountaineer, 4.0L - is this correct?
> 2. Part number on the original unit - these units are part number specific, not vehicle specific.
> 3. What were the issues with your original unit that led you to replace it?
> 4. We noted that the replacement unit is not communicating and that 3 shops have confirmed it needs to be replaced - did it have communication when you installed it?
> 5. Were any diagnostic trouble codes being set in the vehicle before it lost communication and which module(s) they are coming from?
> 6. What diagnostics were completed to determine the original unit was the issue?
> 7. Any other parts that have been repaired or replaced in an attempt to fix the issue?
>
> We will await your reply and have our techs review the information to determine how to proceed. Please let us know if you have any questions. Thank you for working with us.
>
> YPS

**Notes:**
- Item 1: pre-filled vehicle from listing title — ask buyer to confirm
- Item 4: "did it have communication when you installed it?" — establishes whether the unit ever worked, critical for diagnosing install issue vs. defective unit
- Item 5: ask about codes *before* communication was lost, not just current codes — gives timeline context
- Em dash → hyphen in list items (owner style preference)
- Close with "Thank you for working with us." for order issues — not "Thanks again!"

---

## Example 2: TIPM — Buyer Replies with VIN and Part Number Photo (TIPM3 HAVE PART NUMBER AND VIN)

**Customer email:**
- **Subject:** Re: your_part_source has sent a question about item #202559267804 - 08-09 JOURNEY CARAVAN T&C OEM TIPM TEMIC INTEGRATED FUSE BOX 56049720 REBUILT
- **Body:** "VIN # 3D4GG57V49T201797"
- **Images:** Photo of TIPM part number sticker (56049720AT — matches listing) + photo of VIN door jamb sticker

**Context:** YPS sent the standard TIPM purchase message asking for VIN. Buyer replied with VIN in text and confirmed part number match via photo.

**YPS response:**
> Hello again and thank you for your purchase and the information.
>
> We will get the unit programmed to the VIN you provided and scheduled for shipping. You will get an automated message with the tracking information once we do ship it out.
>
> Since you did match the part number, the TIPM is ready to configure to your vehicle. Perform the following steps to configure the TIPM to your vehicle:
> 1. Disconnect battery from vehicle...
> [install steps 1–5]
>
> Thanks again for your business!
>
> YPS

**Notes:**
- Template: TIPM3 HAVE PART NUMBER AND VIN from Customer Service.md
- Part number confirmed via image → use "Since you did match the part number" (positive confirmation, no warning)
- VIN only (no part number photo) → use TIPM3 WE HAVE VIN template instead (includes part number warning)
- This example is a placeholder — full TIPM3 decision tree and workflow to be documented; see todo.md

---

## Example 3: GM ECM — Key Relearn Failure After Install

**Customer email:**
- **Subject:** Re: your_part_source has sent a question about item #196156722890 - 10-11 3.6L TRAVERSE CAMARO ACADIA LACROSSE PCM ECU ECM ENGINE COMPUTER 12635019
- **Body:**
> Installed your ECM this morning went through security procedure will not recognize key tried to do it again now security light will not go out after 20 minutes I expect the phone call back 631-848-3534 today

**Context:** Buyer purchased and received a programmed GM ECM. YPS had already sent key relearn and crankshaft/throttle relearn instructions with the order. Buyer followed the security procedure but the key is not being recognized and the security light won't clear after 20 minutes.

**YPS response:**
> Hello again and thank you for reaching out to us regarding this. We are definitely here to help! We handle all messaging through eBay's messaging system for documentation purposes, sorry. Can you let us know if you have a key start or push button start? Did you pull any trouble codes by chance when you ran into issues? Can you confirm that your part number is 12635019? We just want to rule out any fitment issues. Keep us posted and we'll do what we can to help get your vehicle up and running! Thanks, YPS

**Notes:**
- Do NOT use the full 7-item template for key relearn issues — gather three things first: ignition type, trouble codes, part number confirmation
- "Key start or push button start?" is the critical first question — determines which relearn procedure applies
- Part number framed as "rule out fitment issues" — lighter than the standard part number lecture
- Phone requests: redirect to eBay messaging with "for documentation purposes, sorry" — softer than "we don't have a phone line"
- Keep the full frustrated-customer greeting even on short replies
- Sign-off: "Thanks, YPS" and encouraging close — matches lighter tone
- Once all three are confirmed, more specific relearn guidance can be given in the follow-up

<!-- Add more examples as owners provide them -->
