# Edit Feedback Archive
Last updated: 2026-04-09

Entries older than 30 days are moved here from feedback.md. All rules have been graduated into knowledge files.

---

## 2026-04-10 | Dodge Durango R&R — intermittent misfire, ECU not the issue, advise cancellation

**Original draft:**
> Hello again and thank you for the information.
>
> We handle all messaging through eBay's messaging system for documentation purposes, sorry.
>
> DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM!
>
> Before you send the unit in, we just need one more piece of information from you — the part number on your ECM. These units have a sticker on them with the part number. We've attached a picture of what the sticker should look like to help.
>
> Unfortunately not all of these units are repairable. This is the reason we ask for so much information up front as we do have a diagnostic fee of $94.99 that we would refund you down to if the unit comes in and either tests good or winds up being unrepairable. We do not want you to send it to us unless we have a good shot at a successful repair.
>
> We will await your reply and have our techs review the information. Let us know if you have any questions — we are here to help!

**Owner's edit:**
> Thanks for the above information. We definitely don't think your ecu is bad. We think you have something going on with your wiring or the connector. If one of those circuits is popped in the ecu you will always have a misfire, there will be no intermittent or warm up period if that makes sense. With that said go ahead and open a cancellation request so we can get your funds back to you. If you send it in and it tests good we would refund you but only down to the diagnostic fee but since it doesn't look like your ecu is the issue we don't want you to have to pay this charge. Let us know if you have any questions and we'll watch for the cancellation request to come through. Thanks! YPS

**What changed:**
- Complete reversal of approach — buyer's symptoms (intermittent misfire that clears after rest) rule out the ECU as the cause
- Key diagnostic logic: if the ECU circuit is bad, misfire is always present — no intermittent or warm-up pattern; intermittent = wiring or connector issue
- Did not ask for part number or sticker — irrelevant once we've determined the ECU is not the problem
- No fitment warning, no diagnostic fee paragraph — neither applicable when advising against sending the unit
- Directed buyer to open a cancellation request rather than send the unit in
- Explained the diagnostic fee risk honestly: "if you send it in and it tests good we would refund you but only down to the diagnostic fee" — transparent, protects the buyer
- **Key rule:** For R&R inquiries where the symptom pattern rules out the ECU (intermittent issue that clears after rest = wiring/connector, not ECU) — advise the buyer NOT to send the unit. Direct them to a cancellation request. Rule added to rnr-info.md.

---

## 2026-04-10 | Ford F-150 PCM — U1900/U1950 communication codes, PATS procedure done once

**Original draft:**
> Hello again and thank you for the update.
>
> It sounds like the PATS sync may not have completed on the first run — try performing the procedure again and let us know if that clears things up.
>
> As for FORScan — yes, it is an OEM level tool for Ford and can help read codes that a standard scanner cannot. It would be a good tool to use for this type of issue.
>
> Let us know how it goes. Thanks again!

**Owner's edit:**
> Hello again and thank you for the update.
> Those are both issues with communication, one for CAN and the other for UBP. Usually this means there is some sort of short in those circuits. Those can keep the vehicle from cranking over as the modules are not able to talk to each other. If those are the only trouble codes you are getting we would recommend disconnecting your battery and checking the connectors on the PCM to make sure pins did not get bent and are not touching each other. If you have other trouble codes please let us know what they are.
> Let us know what you do find out. Thanks again for your help with this.

**What changed:**
- U1900/U1950 are communication codes (CAN and UBP), not PATS codes — PATS sync was the wrong diagnosis
- Explained what the codes mean: CAN and UBP communication circuits, can prevent crank because modules can't talk to each other
- Gave specific actionable step: disconnect battery and check PCM connector pins for bends or shorts
- Did not confirm FORScan — not relevant for communication/wiring codes
- Note: U1900/U1950 are not common codes — no knowledge file update needed per operator

---

## 2026-04-10 | Ford ECM codes after install (unit working) — treat as order-issue, use full template with code context

**Original draft:**
> Hello again and thank you for the update.
>
> Codes that continue to come back after clearing are active faults — not stored history from the previous module. Could you let us know which module(s) the U1900 and P0581 are coming from? That will help our techs take a look at what is going on.
>
> Thank you for working with us.

**Owner's edit:**
> Hello again and thank you for reaching out to us regarding this. We are definitely here to help!
> We would like to get a little more information from you to see if we can figure out what is going on. The P0581 is for the speed control switch circuit and the U1900 is a loss in the CAN communication. When you have a free moment if you could please let us know the following information:
> -The vehicle's Year/Make/Model/Engine
> -The part number on the original unit. These units are part number specific, not vehicle specific
> -The issues with the original unit
> -Any other diagnostic trouble codes being set in the vehicle and the module they are coming from
> -What diagnostics were completed to determine the original unit was the issue
> -Any other parts that have been repaired or replaced in an attempt to fix the issue.
> We will await your reply and have our techs review the information to determine how to proceed. Please let us know if you have any questions as well as we are here to help you get your vehicle back up and running! Thank you for working with us.

**What changed:**
- Greeting upgraded to full frustrated-customer greeting — "We are definitely here to help!" — even though buyer wasn't angry, this is an active order issue
- Explained what the codes mean: P0581 = speed control switch circuit, U1900 = CAN communication loss — YPS provides context on the codes before asking for more info
- Used the full info-gathering list (prose with dashes, not numbered) rather than just asking which module the codes came from
- List covers: vehicle, original part number, original issues, other codes + modules, diagnostics completed, other parts replaced — the standard 6-item set
- "Any other diagnostic trouble codes" — phrased to ask for codes beyond what the buyer already mentioned
- Closing: "we are here to help you get your vehicle back up and running!" — warmer than standard; appropriate when ECM is already installed and working but new codes appeared
- **Key rule:** When a buyer reports new codes on a working ECM, use the full 6-item info list. Adjust item 4: if they already provided codes, ask "Are there any other trouble codes than [X] and which modules are they coming from?" — not the default phrasing. Rule added to order-info.md.

---

## 2026-04-10 | Mopar ECM VIN/mileage reply — use MOPAR1 template, not custom draft

**Original draft:**
> Hello again and thank you!
>
> This is the right place to send that information. We will get our programmers on it!

**Owner's edit:**
> Hello again and thank you for the information. We will get the unit programmed and scheduled for shipping promptly.
> [MOPAR1 fitment warning block]
> Please email with any questions. Thanks again for your business, we do appreciate it!

**What changed:**
- Use MOPAR1 template for all Mopar ECM VIN/mileage replies
- Exception: if buyer provides a matching part number photo, use opening line only — omit "Over 33%..." through "Please email..."
- Rule added to product-types.md.

---

## 2026-04-10 | Wrong part number purchased — return request template

**Original draft:**
> Hello again and thank you for your interest. [stock-not-found reply]

**Owner's edit:**
> Ok, understand. This is why we put fitment and interchange information in our listings... [return request template with "Per Kirk in Customer Service"]

**What changed:**
- Wrong-part-purchased threads classified as order-issue (return), not product-inquiry — can't tell from subject line, must read thread
- Use return template, not stock-not-found reply
- "Per Kirk in Customer Service" in notes always
- Rule added to order-info.md.

---

## 2026-04-10 | ABS R&R — module already shipped, no codes/part number — do not ask, just acknowledge receipt

**Original draft:**
> [full info-collection questions + diagnostic fee paragraph]

**Owner's edit:**
> Hello again and thank you for the update.
> We can repair a lot of issues in these modules, but not all of them. Without know the trouble codes or part number we cannot be sure if a repair is possible or not. We will watch for the module to get here and let you know our thoughts once it does.

**What changed:**
- Module in transit — don't re-ask for info; acknowledge, note uncertainty, commit to evaluating on arrival
- Rule added to product-types.md.

---

## 2026-04-10 | TIPM order-issue — extended use then new symptoms, strip template

**Original draft:**
> [full 10-item template]

**Owner's edit:**
> Hello again and thank you for the update. [part number + TIPM codes only, acknowledged unfamiliar symptom]

**What changed:**
- Unit worked for months then new symptoms = skip install/fuse questions, ask only part number + TIPM codes
- Unit never worked or quick failure = full 10-item template
- Rule added to product-types.md.

---

## 2026-04-10 | Ford ABS R&R — remove GM location description from part number ask

**Original draft:**
> 2. Part number on your ABS module — these are located under the driver door... [GM location description]

**Owner's edit:**
> 2. Part number on your ABS module — We've attached a picture of what the part number sticker should look like to help locate it.

**What changed:**
- GM location description removed for Ford ABS — rely on image only
- Rule added to product-types.md.

---

## 2026-04-09 | GM ABS JL4 config dispute (adviso_0)
**Original draft:**
> Hello again and thank you for the update.
>
> We will have our techs look into the JL4 configuration on this unit and get back to you as soon as possible.
>
> Thank you for your patience with this.
>
> YPS

**Owner's edit:**
> Hello again and thanks for the update.
>
> With the 136 series modules, as long as you match your part number and then have the module configured to your vehicle the module is good to go. You did match your part number so this is the correct module. It does sound like the vehicle has set the C0110 with multiple modules. If they were all the same part number, 13642512, maybe this is not the correct replacement. Perhaps there is still something going on in the vehicle which is causing the C0110, we cannot be certain. But we can work with you on a return.
>
> [return template with "Per John in Customer Service"]
>
> YPS

**What changed:**
- Added actual product knowledge: 136 series ABS modules are correct if part number matches and module is configured — no JL4 configuration issue exists
- Addressed the real problem: C0110 persisting across multiple modules suggests a vehicle wiring issue, not a bad module
- Offered return directly rather than deferring to techs — late-stage thread, right move
- "Per John in Customer Service" (not Kirk) — note for future returns: check whose name to use

## 2026-04-09 | GM BCM reinstall follow-up (cornlamp_0)
**Original draft:**
> Hello again and thank you for the update and the additional information on the original module.
>
> Sounds good on trying the reinstall. While the battery is disconnected, tie both cables together away from the battery for about 20 minutes before reconnecting — this performs the hard reboot that discharges all modules and can help the new BCM sync properly to the vehicle.
>
> Keep us posted on what you find. If you're still having issues, let us know if any trouble codes are coming up as well.
>
> Thank you for working with us.
>
> YPS

**Owner's edit:**
> Hello again and thanks for the update.
>
> If you can let us know the trouble codes you are getting this would be most helpful. Let us know how it goes. Thanks again for your help with this.
>
> YPS

**What changed:**
- Removed the battery cable discharge / hard reboot instructions — don't add unsolicited technical steps when customer just said they'll try reinstalling
- Removed "Thank you for working with us" closing — replaced with "Thanks again for your help with this"
- Shorter and more direct — just ask for the trouble codes, nothing extra

## 2026-04-09 | Shipping inquiry — explain cutoff time with specific order details
**Original draft:**
> We will look into your order and get an update back to you. Tracking information is sent automatically via eBay once the item ships - please also check your eBay account under purchase history as it may already be available there.

**Owner's edit:**
> We do ship items purchased before 12:00 PM CST the same day. Your purchased came in at 1:39 PM CST after our packages were already picked up for the day so we were not able to ship it out yesterday. It will get shipped out today and you will get an automated message with the tracking information once it does.
>
> Please let us know if you need anything else. Thanks again for your business, we do appreciate it!

**What changed:**
- State the cutoff rule explicitly: "items purchased before 12:00 PM CST ship same day" — address their FAQ claim directly
- Reference the actual order time: "Your purchase came in at 1:39 PM CST" — specific, honest, no apology needed
- Commit to ship date: "It will get shipped out today" — operator looked up the order and confirmed; this is appropriate once you know the status
- Tracking clarification: "automated message... once it does" — clear and accurate
- Drop "check your eBay purchase history" — not needed; the order hasn't shipped yet so there's nothing to check
- Closing: "Thanks again for your business, we do appreciate it!" — warmer close for a frustrated buyer

## 2026-04-09 | Ford PATS two-key — answer first, then ask for part number
**Original draft:**
> The standard Ford PATS key relearn does require two programmed keys to complete. If you only have one key, you would need to contact a locksmith or your local dealership to handle the PATS programming after installation.
>
> Also please make sure your part number matches the one in the listing before purchasing...

**Owner's edit:**
> Ford requires two keys when you replace the PCM and have to update the PATS. We would recommend getting a second non-cloned key cut by a locksmith.
>
> DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM!
> Over 33% of our buyers do not read this and buy the wrong part number!!!
> These units are part number specific and not vehicle specific. We do not have VIN interchange and recommend matching your current part number to ensure you don't have any fitment issues. When you have a moment if you could please let us know what your current part number is we will check our inventory to see if we have a unit which will work for your vehicle.
> We will await your reply. Please email with any questions. Thanks again!

**What changed:**
- PATS answer comes before fitment warning — answer direct question first, then pivot to fitment (confirmed in voice.md)
- "Non-cloned key cut by a locksmith" — more specific than "locksmith or dealer"; cloned keys won't work for PATS
- After answering, still ask for part number to check inventory — even when answering a specific question, product-inquiry pivot to part number check applies
- "Over 33% of our buyers..." boilerplate — standard product-inquiry language, include it
- "We do not have VIN interchange" — standard product-inquiry language
- Closing: "We will await your reply. Please email with any questions. Thanks again!" — standard product-inquiry close

## 2026-04-09 | PayPal refund — explain 90-day rule and ask for email
**Original draft:**
> We will process the refund through PayPal once the item comes in. Please let us know if you have any questions in the meantime.

**Owner's edit:**
> Since this order is over 90 days old, we will process the refund through PayPal once the item comes in. We just need to know what email address to send it to. Please let us know if you have any questions in the meantime.
>
> Thank you again for working with us.

**What changed:**
- Added reason for PayPal: "Since this order is over 90 days old" — explain WHY we use PayPal instead of eBay refund; don't leave the customer guessing
- Asked for PayPal email: "We just need to know what email address to send it to" — this is how YPS sends PayPal refunds; need the email, not the card
- "Thank you again" — slight warmth addition on the close

## 2026-04-09 | Modification/service decline — no fitment warning, plain language
**Original draft:**
> Hello and thank you for your interest.
>
> Unfortunately we do not perform PATS deletes. All of our units are repaired and returned to OE software specification only.
>
> DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM!
>
> Let us know if you have any other questions. Thanks again!
>
> YPS

**Owner's edit:**
> Hello and thanks for your interest.
>
> We do not do any software/tuning on these units. We repair them to factory specs and software only.
>
> Sorry we couldn't help you out but thanks again for checking.
>
> YPS

**What changed:**
- No fitment warning — omit it when declining a service request; it's not relevant if we're not selling them anything
- Don't name the specific modification ("PATS deletes") — use broader language: "software/tuning"
- "factory specs and software only" — plainer than "OE software specification only"
- Closing: "Sorry we couldn't help you out but thanks again for checking." — warmer decline, acknowledges the limitation
- Dropped "Let us know if you have any other questions." — not needed when declining; nothing to follow up on
- "Hello and thanks" — slightly more casual than "Hello and thank you" (acceptable variation)

## 2026-04-02 | ECM key relearn failure — light/conversational approach, not full template
**Original draft:**
> Hello again and thank you for reaching out to us regarding this. We are definitely here to help!
>
> We do not have a phone line - we can only respond through eBay messages. We will do our best to get this resolved for you here.
>
> [7-item numbered list: vehicle, part number, original issues, symptoms, DTCs, diagnostics, other parts]
>
> We will await your reply and have our techs review the information to determine how to proceed. Thank you for working with us.
>
> YPS

**Owner's edit:**
> Hello again, we handle all messaging through eBay's messaging system for documentation purposes, sorry. Can you let us know if you have a key start or push button start? Did you pull any trouble codes by chance when you ran into issues? Can you confirm that your part number is 12635019? We just want to rule out any fitment issues. Keep us posted and we'll do what we can to help get your vehicle up and running! Thanks, YPS

**What changed:**
- **Greeting stays** — "Hello again and thank you for reaching out to us regarding this. We are definitely here to help." is always kept for frustrated customers, even on lighter replies
- No numbered list — prose format only; full 7-item template was too heavy for a key relearn issue
- Phone explanation: "for documentation purposes, sorry" — softer and gives a reason vs "we do not have a phone line"
- Added specific question: "key start or push button start?" — critical for key relearn diagnosis, not in the standard template
- Trimmed DTCs to one casual question vs. two separate items asking about codes and which modules
- Part number confirm framed around fitment ("rule out fitment issues") — not part number specificity lecture
- Dropped items 3, 6, 7 (original issues, diagnostics completed, other parts replaced) — not relevant at this stage
- Sign-off: "Thanks, YPS" not "Thank you for working with us. YPS" — lighter close matches conversational tone
- Closing: "Keep us posted and we'll do what we can to help get your vehicle up and running!" — warmer, more personal than template close

## 2026-04-02 | Mopar hardware number — hold shipping on active orders
**Original draft:**
> Let us know if you have any questions. Thanks again.

**Owner's edit:**
> We will hold off on shipping the item until we hear back from you. Let us know if you have any questions. Thanks again for your help with this.

**What changed:**
- Added "We will hold off on shipping the item until we hear back from you." — buyer has an active order; YPS is pausing shipment pending correct part number confirmation
- Sign-off warmed: "Thanks again." → "Thanks again for your help with this." — acknowledges the buyer's cooperation

**Rule:**
- When sending the 2nd Sticker Mopar response and the buyer has an active order: always add "We will hold off on shipping the item until we hear back from you." before the closing line
- Close with "Thanks again for your help with this." — not bare "Thanks again."

## 2026-04-02 | Order-issue item 4 & 5 — communication loss question framing
**Original draft:**
> 4. We noted that the replacement unit is not communicating and that 3 shops have confirmed it needs to be replaced — is there anything else going on with the vehicle?
> 5. Any diagnostic trouble codes being set in the vehicle and which module(s) they are coming from?

**Owner's edit:**
> 4. We noted that the replacement unit is not communicating and that 3 shops have confirmed it needs to be replaced - did it have communication when you installed it?
> 5. Were any diagnostic trouble codes being set in the vehicle before it lost communication and which module(s) they are coming from?

**What changed:**
- Item 4: "is there anything else going on with the vehicle?" → "did it have communication when you installed it?" — more targeted; asks whether the unit ever worked, which helps diagnose whether it's a unit failure or an install issue
- Item 5: "Any diagnostic trouble codes being set" → "Were any diagnostic trouble codes being set in the vehicle before it lost communication" — adds timeline context; narrows to codes present before the communication loss, not just current codes
- Em dash → hyphen throughout (style preference)

**Rule:**
- When the symptom is loss of communication after install: item 4 should ask "did it have communication when you installed it?" — establishes whether the issue is immediate or developed over time
- Item 5 for communication loss: ask about codes *before* it lost communication, not just current codes

## 2026-04-02 | GM ECM sticker count + sign-off phrasing
**Original draft:**
> Your ECM will have a sticker or two on it with the part number. If you can send us a photo of those stickers...
> Let us know. Thanks again!

**Owner's edit:**
> Your ECM will have a sticker on it with the part number. If you can send us a photo of that sticker...
> Let us know when you get a chance. Thanks again!

**What changed:**
- "a sticker or two" → "a sticker" — GM ECMs have only one sticker
- "those stickers" → "that sticker" — singular to match
- "Let us know." → "Let us know when you get a chance." — softer, less urgent; doesn't feel like we're rushing the customer

**Rules:**
- GM ECMs: one sticker only — use singular in all references
- Preferred product/R&R close: "Let us know when you get a chance. Thanks again!" — not "Let us know."
- Greeting when no customer name available: "Hello and thank you for your interest." — preferred over bare "Hello,"

## 2026-03-26 | ABS for my Silverado — part number location phrasing
**Original draft:**
> The part number sticker is located under the driver door. Crawl under the vehicle under the driver door and look up over where the brake lines go into the pump — the sticker is on the front of the module. We've attached a picture of what the sticker should look like to help.

**Owner's edit:**
> These are located under the driver door under the vehicle. If you crawl under the vehicle under the driver door and look up over where the brake lines go into the pump you normally can see the front of the module where the part number sticker is located. Once you have located that let us know the part number and we'll point you in the right direction.

**What changed:**
- "The part number sticker is located" → "These are located" — refers back to the modules, more natural flow
- Dash removed — full sentences instead of em-dash construction
- "the sticker is on the front of the module" → "you normally can see the front of the module where the part number sticker is located" — softer, more natural phrasing
- Removed "We've attached a picture of what the sticker should look like to help" — replaced with action step
- Added "Once you have located that let us know the part number and we'll point you in the right direction" — closes with clear next step
- "Let us know what you find. Thanks again!" → "Thanks again!" — removed redundant action call when the previous sentence already contains it

## 2026-03-17 | Need ECU for my Ram (VIN/mileage programming)
**Original draft:**
> Yes, we do need the VIN and mileage before it ships. But you also need to match your part number first.

**Owner's edit:**
> We can program some of these units. Once we have your part number we can let you know if yours is one of them. If it is, you can enter your VIN and mileage in the "Add note to seller" box during checkout.

**What changed:**
- Removed blanket "yes we need VIN and mileage" — not all units are programmable
- New framing: "we can program some of these units" — accurate and sets expectation
- Part number required first to determine if programming is available
- VIN/mileage goes in the "Add note to seller" box at checkout (not emailed separately)

**Rule:**
- When customer asks about VIN/mileage programming: say "we can program some of these units"
- Always get part number first to confirm if their unit is programmable
- If programmable: direct them to "Add note to seller" box during checkout for VIN and mileage

## 2026-03-17 | VIN interchange language
**Original draft:**
> These modules are part number specific, not just vehicle specific. We do not have VIN interchange and are not able to confirm fitment based on vehicle info alone.

**Owner's edit:**
> These items are part number specific, not vehicle specific. Unfortunately we do not have VIN interchange.

**What changed:**
- "These modules" → "These items" — broader, less technical
- "not just vehicle specific" → "not vehicle specific" — simpler, more direct
- Removed "and are not able to confirm fitment based on vehicle info alone" — redundant once VIN interchange is mentioned
- "Unfortunately" added — softens the no

## 2026-03-17 | ECM vs ECU terminology
**Rule:**
- Default term is ECM — use it unless the buyer uses "ECU" first
- If the buyer says "ECU", match their language
- Same applies to part number sticker references ("Your ECM will have a sticker..." vs "Your ECU will have a sticker...")

## 2026-03-17 | 2015 Dodge Ram 1500 TIPM - Need replacement
**Original draft:**
> We do carry TIPMs for Dodge vehicles though.

**Owner's edit:**
> We do carry tested TIPMs for Dodge vehicles though.

**What changed:**
- Added "tested" descriptor for TIPMs

**Rule clarified:**
- TIPMs can always use "tested" — applies to all TIPMs regardless of part number
- Unlike ECMs where "rebuilt" vs "tested" depends on inventory, TIPMs are always "tested"
- "check if we have the right one for you" preferred over "point you to the right listing" — more conversational, plainer language

## 2026-03-12 | ECM Repair
**Original draft:**
> Hello, thanks for reaching out!
>
> Yes, we do offer repair and return service for Ford ECMs.
>
> Before we can assess repairability, we'll need a few details:
>
> 1. Vehicle Year / Make / Model / Engine
> 2. A short description of the issue
> 3. All diagnostics completed that led you to believe the ECM is faulty
> 4. All diagnostic trouble codes currently set and which module(s) they are in
> 5. Any parts already tested, replaced, or repaired
>
> Not all units are repairable, so we collect this info upfront before anything ships. Once we have it we can take a look and let you know if it's something we can help with.
>
> Let us know. Thanks again!
>
> YPS

**Owner's edit:**
> Hello, thanks for reaching out!
>
> We do offer a repair and return service for some Ford ECMs. To quickly determine if we can help, we'll need a few details:
>
> 1. Vehicle Year / Make / Model / Engine
> 2. The part number of your ECM
> 3. A short description of the issue
> 4. All diagnostics completed that led you to believe the ECM is faulty
> 5. All diagnostic trouble codes currently set and which module(s) they are in
> 6. Any parts already tested, replaced, or repaired
>
> Unfortunately not all of these units are repairable. This is the reason we ask for so much information up front as we do have a diagnostic fee of $94.99 that we would refund you down to if the unit comes in and either tests good or winds up being unrepairable. We do not want you to send it to us unless we have a good shot at a successful repair.
>
> We hope this information was helpful. Let us know when you get a chance. Thanks again!
>
> YPS

**What changed:**
- "Yes, we do offer" → "We do offer" — removed affirmative filler; cleaner opening
- Added qualifier "some" — "some Ford ECMs" is more accurate than blanket coverage
- Lead-in reframed: "Before we can assess repairability" → "To quickly determine if we can help" — more customer-friendly framing
- Added item 2: "The part number of your ECM" — part number required even for R&R, not just replacement
- Expanded non-repairability caveat to include the $94.99 diagnostic fee, refund policy, and intent not to waste customer's time/money
- Sign-off changed from "Let us know." to "We hope this information was helpful. Let us know when you get a chance." — warmer, more considerate close

## 2026-03-12 | ECM Repair (re-draft 2)
**Original draft:**
> We do carry rebuilt ECMs for some Ford vehicles.

**Owner's edit:**
> We do carry tested ECM replacements for some Ford vehicles.

**What changed:**
- "rebuilt ECMs" → "tested ECM replacements" — preferred product description for Ford ECM replacements

**Rule clarified (2026-03-17):**
- YPS tests every unit but does NOT rebuild every unit — "rebuilt" is only accurate for specific part numbers
- Use "tested" as the descriptor for all part types (ECMs, PCMs, TIPMs, etc.) in early-stage replies
- Never use "rebuilt" — we may not rebuild that specific unit even if the customer asks about it
- "tested" is always accurate and always the right word to use

## 2026-03-12 | ECM Repair (re-draft)
**Original draft:**
> Hello, thanks for reaching out!
>
> We do offer a repair and return service for some Ford ECMs. To quickly determine if we can help, we'll need a few details:
>
> 1. Vehicle Year / Make / Model / Engine
> 2. The part number of your ECM
> 3. A short description of the issue
> 4. All diagnostics completed that led you to believe the ECM is faulty
> 5. All diagnostic trouble codes currently set and which module(s) they are in
> 6. Any parts already tested, replaced, or repaired
>
> Unfortunately not all of these units are repairable. This is the reason we ask for so much information up front as we do have a diagnostic fee of $94.99 that we would refund you down to if the unit comes in and either tests good or winds up being unrepairable. We do not want you to send it to us unless we have a good shot at a successful repair.
>
> We hope this information was helpful. Let us know when you get a chance. Thanks again!
>
> YPS

**Owner's edit:**
> Hello, thanks for reaching out!
>
> We do offer a repair and return service for some Ford ECMs. However, the P0600 code you have indicates the processor is failing. This is not something we can repair at this time.
>
> We do carry rebuilt ECMs for some Ford vehicles. These modules are part number specific, not just vehicle specific. Your ECM will have a sticker with a 12A650 in the middle the part number. If you can send us a photo of this sticker, we can check our inventory and point you to the right listing.
>
> Please email with any questions. Thanks again!
>
> YPS

**What changed:**
- Recognized P0600 as processor failure — R&R ruled out immediately rather than collecting info
- Pivoted from R&R inquiry response to replacement ECM offering
- Removed the 6-item info-collection list entirely — not needed once R&R is ruled out
- Removed diagnostic fee paragraph — not applicable when R&R is declined upfront
- Added Ford-specific part number guidance: sticker with "12A650" in the middle identifies the part number
- Sign-off simplified back to "Please email with any questions. Thanks again!"
- **Key rule learned:** P0600 (processor failure) = R&R not possible → go straight to replacement offering

## 2026-03-12 | 2015 Dodge Ram 1500 TIPM - Need replacement
**Original draft:**
> Hello Mike, thanks for reaching out!
>
> We do carry rebuilt TIPMs for Dodge. To confirm availability and get you to the correct listing, we'll need your part number. These modules are part number specific, not just vehicle specific.
>
> As for repair and return — unfortunately we do not offer that service for TIPM modules.

**Owner's edit:**
> Hello Mike, thanks for reaching out!
>
> Unfortunately we do not offer a repair service for TIPMs. We do carry rebuilt TIPMs for Dodge though. To confirm availability and get you to the correct listing, we'll need your part number. These modules are part number specific, not just vehicle specific.

**What changed:**
- R&R answer moved to the top — lead with the answer to what the customer asked first
- "repair and return" shortened to "repair service" — simpler phrasing
- Removed "As for repair and return —" transition; more direct opening instead
- Removed trailing "Please email with any questions. Thanks again!" from the R&R line (consolidated at end)

## 2026-03-12 | PCM for Jeep Grand Cherokee
**Original draft:**
> Hello Jorge, thanks for reaching out!
>
> We do carry rebuilt PCMs for Jeep. To confirm availability and get you to the correct listing, we'll need your part number. These modules are part number specific, not just vehicle specific.
>
> DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM!
>
> Your PCM will have a sticker or two on it with the part number. If you can send us a photo of those stickers, we can check our inventory and point you to the right listing.
>
> Please email with any questions. Thanks again!

**Owner's edit:**
> Hello Jorge, thanks for reaching out!
>
> DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM!
>
> We do carry rebuilt PCMs for Jeep. These modules are part number specific, not just vehicle specific. Your PCM will have a sticker or two on it with the part number. If you can send us a photo of those stickers, we can check our inventory and point you to the right listing.
>
> Let us know what you find out. Thanks again!

**What changed:**
- Fitment warning moved immediately after greeting — before any other content
- Part number explanation and sticker instructions merged into one paragraph (tighter flow)
- "To confirm availability and get you to the correct listing, we'll need your part number." removed — implicit in the ask for photos
- Sign-off changed from "Please email with any questions." to "Let us know what you find out." — more conversational, action-oriented

## 2026-03-12 | Chrysler 300 ECU replacement
**Original draft:**
> Hello Sarah, thanks for reaching out!
>
> Yes, we do carry rebuilt ECUs for Chrysler — so you've come to the right place.
>
> To confirm availability and get you to the correct listing, we'll need your part number. These modules are part number specific, not just vehicle specific.
>
> DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM!
>
> Your ECU will have a sticker or two on it with the part number. If you can send us a photo of those stickers, we can check our inventory and point you to the right listing.

**Owner's edit:**
> Hello Sarah, thanks for reaching out!
>
> DO NOT RELY ON EBAY'S FITMENT GUIDE OR THE GUARANTEED TO FIT PROGRAM!
>
> Yes, we do carry rebuilt ECUs for Chrysler. These modules are part number specific, not just vehicle specific. Your ECU will have a sticker or two on it with the part number. If you can send us a photo of those stickers, we can check our inventory and point you to the right listing.

**What changed:**
- Fitment warning moved immediately after greeting — consistent with Jorge's pattern
- "so you've come to the right place" removed — unnecessary filler
- "To confirm availability and get you to the correct listing, we'll need your part number." removed — implicit in the photo ask
- Part number explanation and sticker instructions merged into one paragraph

## 2026-03-12 | PCM for Jeep Grand Cherokee (re-draft)
**Original draft:**
> We do carry rebuilt PCMs for Jeep. These modules are part number specific...

**Owner's edit:**
> We do carry PCMs for Jeep vehicles. These modules are part number specific...

**What changed:**
- "rebuilt" removed — don't describe the product as "rebuilt" in the email
- "Jeep" → "Jeep vehicles" — slightly more natural phrasing

## 2026-03-12 | Chrysler 300 ECU replacement (re-draft)
**Original draft:**
> Yes, we do carry rebuilt ECUs for Chrysler.

**Owner's edit:**
> Yes, we do carry rebuilt ECUs for Chrysler vehicles.

**What changed:**
- "Chrysler" → "Chrysler vehicles" — consistent phrasing with Jorge's edit
- Note: "rebuilt" kept here (customer asked "do you guys rebuild these") — context-dependent
