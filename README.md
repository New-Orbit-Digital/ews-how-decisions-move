# How Decisions Move · EWS Interim Governance 2026–27

An interactive companion to the Emerson Waldorf School Interim Governance Structure (working draft, for committee review). Parents pick a situation ("my child is being bullied", "a question about tuition") and see who to talk to first, where it goes next, and which role holds the decision.

- **Live:** https://justbost.com/ews-how-decisions-move/ (unlisted; `noindex,nofollow` + `robots.txt Disallow: /`)
- **Stack:** vanilla HTML/CSS/JS, single self-contained file; no backend. Feedback goes to an external Google Form.

## Files

| File | Role |
|---|---|
| `ews-pathways-data.js` | All content: roles, situations, decisions. Edit here. |
| `ews-decision-map.src.html` | Markup, CSS, rendering. |
| `build.js` | Inlines the data into the template and validates role ids. |
| `ews-decision-map.html` | Built, self-contained deliverable (committed so it can be emailed). Never hand-edit. |
| `metro-spike.html` | Early layout experiment, not published. |

## Build & deploy

```
node build.js
```

Pushing to `main` runs `.github/workflows/pages.yml`, which builds, stages `_site/index.html` (with a `noindex,nofollow` meta injected) + `robots.txt`, captures a 1280×800 `screenshot.png` of the page with Playwright (the portfolio thumbnail, so it always matches what's live), and deploys to GitHub Pages. The repo lives in the `New-Orbit-Digital` org, whose Pages site owns `justbost.com`, so this project is served at `/ews-how-decisions-move/`. No CNAME file here — it is inherited. All links are relative or query-string (`?s=bullying`), so the subpath needs no base setting.

History: until 2026-09-25 this repo lived at `NewOrbitDigital/ews-how-decisions-move` and was served at `neworbitdigital.github.io/ews-how-decisions-move/`. It was never on Netlify.

## Verification log

| Date | Check | Result |
|---|---|---|
| 2026-09-25 | Local build served at `/ews-how-decisions-move/` subpath (Chromium, 1280×800) | 200; title renders; 0 console errors, 0 failed requests (Google Fonts stubbed — sandbox can't reach them) |
| 2026-09-25 | Core flow: click "My child is being bullied or harassed" | Pathway view opens at `?s=bullying`, step 1 "Your child's class teacher" shown; 0 errors |
| 2026-09-25 | Source scan for names/emails/secrets | None found — roles only; only external URL is the public Google Form |
| 2026-09-25 | Live https://justbost.com/ews-how-decisions-move/ (Chrome, after Actions run #8) | Loads; title correct; `meta robots=noindex,nofollow` present; Fraunces + Public Sans loaded; only page resources are Google Fonts, all loaded; no page console errors (the one 404 is the browser's automatic `/favicon.ico` at the justbost.com root) |
| 2026-09-25 | Live core flow: click "My child is being bullied or harassed" | Opens `?s=bullying` with step 1 "Your child's class teacher"; `?view=explore` also loads |
| 2026-09-25 | Live `./screenshot.png` | 200, `image/png`, 86,683 bytes |
| 2026-09-25 | Old URL https://neworbitdigital.github.io/ews-how-decisions-move/ | 404 "Site not found" — expected after the transfer; no redirect exists |
