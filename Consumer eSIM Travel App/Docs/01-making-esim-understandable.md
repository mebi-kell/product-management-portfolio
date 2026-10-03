# Making an eSIM Understandable

**How a working but confusing travel eSIM app was restructured around the lifecycle users actually go through.**

## Context

The app sold travel eSIMs directly to consumers and was already live when I joined. There was no dedicated Product Manager. Working with the CPO, designers, developers and marketing, I took on the product work: mapping the lifecycle, writing requirements, reviewing design and development, QA and release, research, and supporting the rebrand.

## The problem

Every screen technically worked. Users still got stuck, because an eSIM goes through states that most consumers have no intuition for:

- **Purchase → install:** users bought an eSIM without knowing what to do next, when to install it, or when it would work.
- **Several eSIMs:** people bought eSIMs for themselves *and* for family or travel companions, then lost track of which was which, and whose was installed.
- **Using it:** remaining data, validity and what happens at expiry were unclear.
- **Payments:** users couldn't always tell whether a payment had actually gone through.
- **Regional travel:** package selection didn't fit trips that cross several countries.
- **Installation feedback:** errors and success messages during installation were technical, and offered no next step.

## Mapping the lifecycle first

Before changing any screen, I mapped the whole journey:

**Discover → Onboard → Purchase → Install → Activate → Use → Monitor → Share/Manage → Expire**

At each stage I listed the user's question, the actual system state, and what could go wrong. Requirements were then written stage by stage, using the map as the foundation for UX decisions. The [lifecycle map](lifecycle-map.md) is the condensed version.

## Decisions and the requirements behind them

*The technical detail in this section is reconstructed from my requirements work. It's illustrative, not copied from internal specs.*

### 1. One clear status per eSIM

Each eSIM card shows exactly one primary state: **Not installed · Installed · In use · Running low · Expired.**

Never showing two competing labels removed the most common question: "can I use this one?"

### 2. eSIMs bought for other people

The multiple-eSIM problem wasn't about one phone holding several profiles. It was about **one buyer managing eSIMs for several people.**

- **An owner label on every eSIM** ("Me", "Sara's phone", "Dad"), set at purchase and editable later.
- **A per-eSIM installation hand-off.** The buyer can share that eSIM's QR code or install details with the person it's for, through the phone's share sheet.
- **A single-use warning on sharing.** Activation codes are typically single-use, so the share flow says clearly that this eSIM should be installed on one device only.
- **Status from the provider, not the buyer's phone.** The buyer's phone can't see what happens on someone else's device. Installation and usage status come from the connectivity provider's records, which report when a profile has been downloaded and when data is used. That's what lets the buyer see that Dad's eSIM is installed and in use, even though it's on Dad's phone.

### 3. Installation separate from activation

- **Install any time before the trip,** and use it on arrival. "Installed" and "In use" are separate states for exactly this reason.
- **Three installation paths,** in order of preference:
  1. one-tap install where the OS supports it
  2. QR code scanned from another screen
  3. manual entry of the SM-DP+ address and activation code
- **Guardrails before purchase and before installing:**
  - a device compatibility check (eSIM-capable and carrier-unlocked)
  - "install on Wi-Fi before you fly"
  - a warning not to delete an installed eSIM, since the code may not work again

### 4. Installation messages that tell you what to do next

Installation is where users get stuck most often, so every message during installation follows one rule: **what happened · what it means for you · what to do next.** No raw technical codes are shown, but each message includes a reference ID for support.

| Situation | Message pattern |
|---|---|
| No internet during download | "Couldn't download your eSIM. You need Wi-Fi or mobile data to install it. Connect and try again." |
| Code already used | "This eSIM was already installed on a device. Each eSIM can be installed once. Contact support with ref #…" |
| Device not compatible or locked | "This phone can't install eSIMs (or is carrier-locked). Check compatibility, or install on another device." |
| Installed successfully | "Installed. When you land: turn on this line for mobile data and enable data roaming for it." |

The success message mattered as much as the errors. "Installed" isn't the finish line, and the most common next mistake (not switching the data line or roaming on) gets answered right there.

### 5. Packages that match real trips

Travelers rarely visit just one country, and single-country catalogues forced them to piece together plans or overpay. Packages were organized around **regions people actually travel through**, such as the Balkans and Europe. Each package shows its full country coverage before purchase. Searching for a destination shows both the single-country plan and the regional packages that cover it, so the multi-country option is visible exactly when it's relevant.

### 6. Success only when the payment provider confirms it

There was a real issue with the payment provider integration: making sure the success message reflected an actual completed payment.

- **Explicit payment states:** *Processing · Needs verification (3-D Secure) · Succeeded · Failed.*
- **Success comes from the server.** The success screen and eSIM delivery are triggered by the payment provider's server-side confirmation (webhook), not by the app's own callback after checkout. The app can believe a payment finished while it's still processing or waiting for verification.
- **No double charges.** Each order carries one idempotency key, so retrying after a network drop can't charge twice.
- **Paid but not delivered:** "Payment received, preparing your eSIM," with an automatic retry and a clear support path. An interrupted order picks up its correct state when the app is reopened.

## Market and pricing research

I ran desk research across major eSIM providers, including Airalo, Saily, Holafly and Nomad. It covered:

- prices by country, and regional and global packages
- data allowances, validity periods and unlimited plans
- pricing and promotion models, and bundles
- roaming versus local eSIM pricing

The research fed directly into product decisions: how packages were structured, which regional offers existed, and how connectivity options and prices were presented in the app.

## Rebrand and go-to-market

The rebrand went beyond the visuals. It covered the app UI, the App Store and Google Play listings, product messaging, the website and marketing materials. Alongside it I contributed to positioning, ICP and personas, launch strategy, marketing KPIs (acquisition and conversion), and which features and offers to promote.

## Release

I worked through the release checklist, pre-release QA and store content, and coordinated the App Store and Google Play release of the new version.

## Outcome

- The new version shipped and the rebrand was completed across the app, the stores and the website.
- The app is live and revenue-generating, with **100K+ downloads on Google Play**.

## What I learned

- **Map the lifecycle before touching any screen.** Every confusing screen was really a missing state. Once the lifecycle was mapped (bought, installed, in use, running low, expired), most UX fixes were obvious: show the state, then say the next step.
- **Your user isn't always the device owner.** It's easy to assume "multiple eSIMs" means one phone with several profiles. Here it meant one buyer managing eSIMs for a whole family. That moves status off the buyer's phone and onto provider-side records, and turns sharing into a core flow, not an extra.
- **Never let the app decide a payment succeeded.** The app's callback after checkout tells you the user *finished checkout*, not that the money arrived. Success screens and eSIM delivery have to wait for the provider's server-side confirmation, or you end up issuing eSIMs for payments that later fail, or telling people a payment failed when it didn't.
- **The success message is the real onboarding.** "Installed" is where most travelers think they're done, but the actual failure point is on landing: wrong data line, roaming off. Putting those instructions into the success message delivers them at the exact moment they matter.
- **Package the trip, not the country.** Regional bundles built from real travel patterns, such as the Balkans and Europe, matched how people actually plan and made the multi-country option visible at the right moment.
