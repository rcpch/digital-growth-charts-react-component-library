# Agent Instructions

This repository is a React component library that **plots** children's growth measurements on RCPCH digital growth charts using Victory. It does not calculate anything clinical: every SDS, centile and corrected-age value is produced by `rcpchgrowth` via `digital-growth-charts-server` and passed in as a `Measurement` object. The static centile curves in `src/chartdata/` are generated output from `rcpchgrowth`, not computed here. The library is consumed by `digital-growth-charts-react-client` and by third-party integrators via npm and CDN.

Read this file before changing anything.

## Read First

- [README.md](README.md) - project overview; full product documentation is at <https://growth.rcpch.ac.uk/products/react-component/>.
- [spec/roadmap.md](spec/roadmap.md) - product and domain work in flight.
- [spec/queries.md](spec/queries.md) - open questions awaiting a maintainer decision, with resolutions.
- [fixture-generation/README.md](fixture-generation/README.md) - how the generated measurement fixtures are produced.
- [digital-growth-charts-server `agent-instructions.md`](https://github.com/rcpch/digital-growth-charts-server/blob/live/agent-instructions.md) - the API contract this library consumes.
- [Upgrading the dGC Platform](https://growth.rcpch.ac.uk/developer/five-repository-upgrade-runbook/) - the cross-repository runbook governing version bumps, dependency upgrades and coordinated releases.
- [`rcpch-house-style`](https://github.com/rcpch/rcpch-house-style) - RCPCH engineering standards. The local checkout is normally at `~/code/rcpch/rcpch-house-style/AGENTS.md`.

## Package Structure

| Area                               | Purpose                                                                                                                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.ts`                     | Public entry point: the `RCPCHChart` component and the exported types.                                                                                                     |
| `src/RCPCHChart/`                  | Orchestrator. Resolves theme and styles, validates and normalises incoming measurements, filters by provenance, chooses chart type, wraps everything in an error boundary. |
| `src/CentileChart/`                | Centile chart for a single measurement method against the selected reference.                                                                                              |
| `src/SDSChart/`                    | SDS chart showing several measurement methods on one set of axes.                                                                                                          |
| `src/SubComponents/`               | Victory and styled-components chrome: buttons, logos, tooltips, axis ticks, attribution and provenance banners.                                                            |
| `src/functions/`                   | Pure helpers: domain and tick calculation, axis labels, styles, provenance checks, SVG export, tooltip text.                                                               |
| `src/chartdata/`                   | Static centile and SDS reference curves per reference, measurement method and sex. Generated clinical data (~22 MB); see `s/generate-chart-data`.                          |
| `src/interfaces/`                  | TypeScript contracts, including `Measurement` (the API response shape) and the internal `Reference` curve-data types.                                                      |
| `src/testParameters/measurements/` | Hand-written measurement scenarios, plus `generated/` fixtures captured from a pinned API server.                                                                          |
| `src/testParameters/styles/`       | Theme fixtures used by tests and stories.                                                                                                                                  |
| `src/fonts/`, `src/images/`        | Base64 Montserrat faces and the RCPCH/UKCA assets embedded in the bundle.                                                                                                  |
| `fixture-generation/`              | Fixture generator and the scenario matrix it replays against the API.                                                                                                      |
| `s/`                               | Repeated-process scripts (`s/test`, `s/storybook`, `s/generate-fixtures`, `s/generate-chart-data`).                                                                        |
| `spec/`                            | Roadmap and open queries.                                                                                                                                                  |

Rendering flow: consumer props → `RCPCHChart` (styles, validation, provenance filtering, error boundary) → `CentileChart` or `SDSChart` → `getDomainsAndData` merges the static curves from `src/chartdata/` with the supplied measurement points and derives axis domains → Victory renders → `SubComponents` supply the surrounding chrome and attribution.

## Core Invariants

- **This library plots, it does not calculate.** Do not add SDS, centile, percentage-of-median or age-correction arithmetic. If a value is missing from the chart, the fix is either a rendering fix here or a contract change in the API, never a local calculation.
- **Everything under `src/chartdata/` is generated clinical reference data**, produced from a pinned `rcpchgrowth` release by `s/generate-chart-data` (see [spec/roadmap.md](spec/roadmap.md)). Never hand-edit the data files. Regenerate only with `s/generate-chart-data` against an explicitly chosen `rcpchgrowth` version, then review the diff (magnitude, affected references/ages, and why) before committing - a large or unexplained diff is a signal to stop and check with a maintainer, not to commit it. Do not delete the retained `_old` variants without maintainer sign-off.
- **Everything under `src/testParameters/measurements/generated/`, including `manifest.json`, is a generated artefact.** Never hand-edit it. Regenerate only with `s/generate-fixtures` against a pinned provenance-aware server, then review the manifest and fixture diff before committing.
- **`Measurement` in `src/interfaces/RCPCHMeasurementObject.ts` mirrors the API response.** Changing it is a cross-repository contract change: coordinate with `digital-growth-charts-server` and re-run its compatibility tests.
- **Preserve provenance behaviour.** Measurements whose provenance does not match the displayed reference are suppressed; measurements with no provenance are legacy and must continue to render. Do not "fix" this by requiring provenance or by silently suppressing more data. See `src/functions/checkMeasurementProvenance.ts` and hazard `rcpch/digital-growth-charts-documentation#174`.
- **Keep attribution and identity visible.** Reference attribution, the version label, and the RCPCH and UKCA assets must remain rendered and must survive export via `embedAttributionInSvg`.
- **Keep the public prop surface stable.** The legacy `turner` prop spelling is deliberate; `normalizeGrowthReference` exists for comparison only and must not be used to rename it.
- **Respect pinned dependencies.** `victory` is pinned exactly; React is a peer dependency supporting 18 and 19. The build emits CJS, ESM, UMD and type declarations, so changes must not assume a bundler.

## Workflow

- `s/test` - run the full Jest suite. Accepts Jest options, for example `s/test --runInBand CentileChart.test.tsx`.
- `s/storybook` - run Storybook locally for visual review.
- `s/generate-fixtures` - regenerate measurement fixtures from a locally running, pinned API server.
- `s/generate-chart-data` - regenerate `src/chartdata/` from a pinned `rcpchgrowth` release. Review the diff before committing.
- `s/generate-chart-data` - regenerate `src/chartdata/` from a pinned `rcpchgrowth` release.
- `npm run build` - full Rollup build; run it for anything that could affect bundling, types or the public entry point.
- `npm run prettier:write` - apply formatting.

## Before Every Commit

```sh
s/test
npm run prettier:check
```

CI additionally runs `npm ci && npm run build && npm test` on every pull request and on pushes to `live`.

## Visual Verification

jsdom tests cannot prove that a chart looks right. Anything that changes rendering must also be checked visually.

- Add a Storybook story for every new feature, and fill obvious gaps when you find them. Stories are both the visual-regression surface and the demonstration implementers browse, so name and group them unambiguously by reference, sex and measurement method.
- Review the change in `s/storybook`, and ideally also in `digital-growth-charts-react-client` against a local build of this package.
- Chromatic runs on push and **uploads** snapshots; it does not approve them. `exitZeroOnChanges` and `exitOnceUploaded` mean a green check is not visual sign-off. A maintainer must open Chromatic's UI Tests view and accept or reject every new, changed and deleted story, and record the build URL as review evidence. See the [upgrade runbook](https://growth.rcpch.ac.uk/developer/five-repository-upgrade-runbook/#5-test-the-combination).

## Git Workflow

- `live` is protected and can only be updated by merging a pull request with CI passing. Work on a descriptive branch and open a PR.
- Commit often and test often: push each validated coherent parcel rather than leaving completed work only in a local worktree.
- There is no commit-message convention; write clear, short, imperative subjects.
- Do not force-push or attempt to bypass branch protection.

## Assurance

- Follow the house-style directive to fix the class of defect, not just the reported instance: when fixing a rendering bug, identify the violated invariant and check the same failure mode across the other references, measurement methods, sexes and both chart types before claiming it is fixed.
- A passing Jest run is not evidence that a chart renders correctly. For anything that changes how clinical data is plotted, verify visually and state what you checked.
- Record safety-relevant changes, hazards and review decisions in the same pull request as the implementation.

## Approval Required

Ask a maintainer before hand-editing `src/chartdata/` (regeneration via `s/generate-chart-data` is expected, not exceptional, but review the diff before committing), regenerating committed fixtures, changing the `Measurement` contract, bumping this package's version, publishing a GitHub release (which publishes to npm), deleting branches, force-pushing, changing secrets, or bypassing branch protection.

## Cross-Repository Context

`rcpchgrowth-python` (calculations) → `digital-growth-charts-server` (HTTP API and provenance) → **this library** (plotting) → `digital-growth-charts-react-client` (demo client and E2E harness) → `digital-growth-charts-documentation` (integration, safety and release documentation). A change that affects the API response shape must be validated across that chain, not just here.

### Testing a change against the API and the client

Do not hand-edit another repository's dependency files and do not rely on `npm link`. Both directions have a harness, and each is owned by the repository that consumes this one:

- **Component in the client**: `s/e2e-local` in `digital-growth-charts-react-client` runs the `local-everything` preset - a local API built from the sibling server and engine checkouts, and the client dev server aliased to the sibling checkout of this repository - then drives Chromium. `s/e2e-local --serve` keeps that stack up so a human can use the real local stack in a browser at <http://127.0.0.1:58680>, against the local API on 58600, until Ctrl+C. It prints the resolved branch, commit and dirty state of all four checkouts before starting, so check those match what you intend to test. Requires Docker. The spec is [spec/e2e.md](https://github.com/rcpch/digital-growth-charts-react-client/blob/live/spec/e2e.md).
- **API responses in this component**: `s/compatibility-test` in `digital-growth-charts-server` replays deterministic API responses through every pinned component profile in `compatibility/profiles.json`. It prefers a read-only sibling checkout of this repository when it contains the pinned revision, and otherwise clones the revision from GitHub, so a newly pinned revision must be pushed before the server change lands.

Use `--serve` to look at a change by hand. Plain `s/e2e-local` runs its checks and tears the stack down as soon as they finish, so there is nothing left to browse. The harness needs no `npm link` and no edit to the client's `.env`: the client aliases this repository's `src/` directly whenever `NODE_ENV=development` and the sibling checkout exists, and the harness passes `VITE_APP_GROWTH_API_BASEURL` inline, which Vite prioritises over the production URL committed in the client's `.env`. If in doubt, confirm in the browser's network tab that calculation requests go to port 58600.

Because the client aliases this repository's raw source rather than its Rollup build, the injected version string does not resolve in that local stack - see [#230](https://github.com/rcpch/digital-growth-charts-react-component-library/issues/230). Do not treat that as a regression introduced by your change.

Run `s/e2e-local` from the client checkout, not from this one: it resolves its own repository root from the working directory, and starting it elsewhere silently points it at the wrong repository. The client checkout needs its dependencies installed (`npm ci`) and the Playwright browser downloaded (`npx playwright install chromium`) before the first run.

Version bumps, dependency upgrades and releases follow [Upgrading the dGC Platform](https://growth.rcpch.ac.uk/developer/five-repository-upgrade-runbook/). Do not bump this package's version or publish in isolation.

- Open or join an upgrade record first, capturing the known-good baseline versions, the candidate versions, what may change, what must not change, and the rollback stack.
- Build upstream to downstream. This library is the third layer: test against genuine API responses from the exact server candidate, plus persisted legacy responses, then hand a concrete candidate version to the demo client.
- Classify every externally visible difference - public props and types, exported types, npm and CDN surfaces, warnings, rendering and accessibility behaviour - as compatible, deprecated, intentionally breaking, or unsupported, and agree migration and communication before release.
- Test local candidates in isolated worktrees or packed tarballs. Do not rewrite a sibling checkout's dependency files, and force the documented remote-only override before sign-off so you exercise the revision CI will use rather than a local sibling checkout.
- Confirm what actually ran, not what you requested: lockfiles, caches and mutable tags can quietly select something else.
