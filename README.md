# Appoteket — Playwright Automation (Deliverable 3)

Covers required scenarios on **https://www.saucedemo.com/**:
- Scenario A — Auth Guard (Unauthorized Access)
- Scenario B — Login (Positive)
- Scenario C — Login (Negative)
- Scenario D — Sorting Validation (A→Z, Z→A, Price Low→High, Price High→Low)
- Scenario E — Add to Cart, Checkout, Logout (End-to-End)

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
npm i
npx playwright install --with-deps
```

## Run
```bash
npm test
# or headed
npm run test:headed
```
## Run with UI
npx playwright test --ui

## Report
```bash
npm run report
```

Utilities in `utils/helpers.ts` provide `login`, `logout`, and `addToCartByName` helpers.
