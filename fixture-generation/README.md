# Measurement fixture generation

The committed fixtures in `src/testParameters/measurements/generated/` are deterministic responses from a pinned, provenance-aware `digital-growth-charts-server` build. They cover every supported reference, sex, and measurement-method combination, plus preterm, bone-age/event, and duplicate-observation rendering cases.

## Regenerate fixtures

Build the server with its exact Git revision exposed in the `X-Git-Revision` response header:

```bash
cd ../digital-growth-charts-server
GITHUB_SHA="$(git rev-parse HEAD)" docker compose up --build --detach
```

Then run the generator from this repository:

```bash
s/generate-fixtures
```

Use `s/generate-fixtures --api-base-url http://127.0.0.1:8001` if the pinned server uses another local port. The generator requires every scenario in `measurement-scenarios.json` to succeed, checks every response's growth-reference and calculation-engine provenance, and replaces the previous fixture set only after all responses have passed validation.

Review changes to `generated/manifest.json` and the fixture diff before committing. The manifest records the complete request for each fixture, the server commit, and the `rcpchgrowth` version and commit. Run the component build and tests after regeneration so the generated responses are checked against the `Measurement` TypeScript interface.
