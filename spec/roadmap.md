# Roadmap

This roadmap tracks future product and domain work for the React component library. Engineering tasks remain in GitHub issues.

Legend: [x] done, [~] in progress, [ ] not started

- [ ] **R1 - Make reference attribution consistently discoverable** - Review attribution placement at supported viewport sizes and ensure warnings, controls and chart height do not make required source information appear absent.
- [ ] **R2 - Add reference-attribution conformance tests** - Cover every supported growth reference in centile and SDS charts, including exact text, links and responsive visibility.
- [x] **R3 - Correct Storybook catalogue labels** - Fix duplicated or incorrect CDC story names so each sex and measurement method is unambiguous during visual review.
- [ ] **R4 - Complete the Node 24 migration** - Resolve and close GitHub issue #227 after validating build, test, Storybook and publication workflows.
- [x] **R5 - Publish the cross-repository release runbook** - The two genuinely reusable lessons from the provenance-release deployment checklist (Chromatic upload-vs-approval, sibling-checkout-vs-remote compatibility testing) are now recorded in `digital-growth-charts-documentation` ([PR #185](https://github.com/rcpch/digital-growth-charts-documentation/pull/185)). The point-in-time evidence (SHAs, PR numbers, test counts) was not carried forward; it is superseded by `digital-growth-charts-server/compatibility/profiles.json` and the merged PRs themselves. The local `deployment-safety-testing.md` checklist is deleted.
- [x] **R6 - Age-display control fix belongs to a different repo** - Q2 clarified the reported "Decimal Age?" control is the checkbox in `ResultsDataTable.jsx` in `digital-growth-charts-react-client`, not this library's `AgeRadioButtonGroup`. Tracked there as [digital-growth-charts-react-client#167](https://github.com/rcpch/digital-growth-charts-react-client/issues/167); no further action needed in this repo.
- [x] **R7 - Embed reference attribution in exported charts** - Resolves Q3. `exportChartCallback` now receives a clone of the chart SVG with the reference attribution appended and wrapped to fit, via `embedAttributionInSvg`.
