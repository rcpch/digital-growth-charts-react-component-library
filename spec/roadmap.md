# Roadmap

This roadmap tracks future product and domain work for the React component library. Engineering tasks remain in GitHub issues.

Legend: [x] done, [~] in progress, [ ] not started

- [ ] **R1 - Make reference attribution consistently discoverable** - Review attribution placement at supported viewport sizes and ensure warnings, controls and chart height do not make required source information appear absent.
- [ ] **R2 - Add reference-attribution conformance tests** - Cover every supported growth reference in centile and SDS charts, including exact text, links and responsive visibility.
- [ ] **R4 - Complete the Node 24 migration** - Resolve and close GitHub issue #227 after validating build, test, Storybook and publication workflows.
- [ ] **R9 - Automate releases with `s/version++`** - Bring release practice into line with `rcpchgrowth-python` and `digital-growth-charts-react-client`: a script that validates a clean `live`, runs the full test/build/audit gate, bumps `package.json` (patch/minor/major), opens a `release/vX.Y.Z` PR, and leaves tagging/GitHub Release/npm publish to the existing merge-triggered `publish.yml`. Currently this repo bumps `package.json` and creates the GitHub Release by hand.
- [ ] **R10 - Migrate `@babel/preset-react` to 8.x** - Blocked on a coordinated Babel 7→8 upgrade: `@babel/preset-env` and `@babel/preset-typescript` are still on 7.x and pull in `@babel/core@7.x` transitively, conflicting with `preset-react@8.0.1`'s `@babel/core@^8.0.0` peer requirement. Dependabot PR #265 is parked pending this.
