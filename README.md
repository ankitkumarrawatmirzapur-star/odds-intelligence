# ODDS INTELLIGENCE | WEALTH BUILDER OS

Offline-first, mobile-responsive financial mathematics and personal wealth planning app.

## Run
- Extract the ZIP.
- Open `index.html` in a modern browser.
- For PWA/offline service-worker installation, serve this folder from localhost or HTTPS (service workers are not available from `file://`).
- No account, API key, paid API or subscription is required.

## Included
- Multi-outcome implied probability / underround calculator and inverse-odds stake allocation.
- Back and lay return/liability calculators.
- Manual odds snapshots and movement history.
- Existing hedge outcome analysis.
- Savings/investment projection, monthly contribution FV, CAGR and scenarios.
- Local transaction ledger, exposure accounting, risk budget warning.
- JSON backup/restore and CSV exports.
- Formula library and local history.
- Responsive dark/light UI and PWA service worker.

## Accounting notes
Ledger entries are user-entered records. Use positive amounts for deposits, withdrawals and P/L entries; enter a negative amount for realized losses, fees or withdrawals as appropriate. Unsettled exposure is tracked separately and is not profit. Do not record an unsettled stake as a realized loss and also as exposure. This starter app does not connect to bookmakers, exchanges, banks or investment accounts.

## Important limitations
- No live odds feed, outcome prediction, bet execution or guaranteed-profit claim.
- Hedge page is a scenario analyzer, not an exact general-purpose linear-programming solver.
- Commission handling is an estimate; verify the exact exchange market commission and settlement rules.
- The wealth projection is deterministic and assumption-based, not a forecast.
- Actual wealth is only as accurate as the ledger entries and reconciliation supplied by the user.

## Formula tests
Open the app, then paste `formula-tests.js` into the browser developer console. It prints a pass/fail table. The supplied required CAGR value is approximately 298.1%.

### Formula specification correction
The supplied test 'odds 1.50 and 2.00: S = 1' is mathematically incorrect. The correct sum is 1/1.50 + 1/2.00 = 1.1666667 (overround). A true two-outcome break-even example is 2.00 and 2.00, where S = 1.
