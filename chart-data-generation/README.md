# Chart data generation

`generate.py` regenerates entries in `src/chartdata/` from a pinned `rcpchgrowth` release (see `requirements.txt`), mirroring `digital-growth-charts-server`'s own generation spec (`chart_data_cache.py`) so the two are provably generating from identical inputs.

Run it with `s/generate-chart-data` from the repository root.

## Output shape

Each `MANIFEST` entry writes two files:

- `<name>.json` - the raw data (`create_chart()`'s return value, with the always-empty/unlicensed `fenton` segment dropped).
- `<name>.ts` - a thin, also-generated wrapper that imports the JSON and re-exports it as a typed `ReferenceGroup` constant, so no consumer import site changes.

## Coverage

Only CDC height and weight are currently in `MANIFEST`, and only after verifying the regenerated output is byte-for-byte identical to the previously committed data. **Do not add an entry without that verification** - a wrong centile-format or parameter mapping silently ships wrong clinical chart lines. See the comments above `MANIFEST` in `generate.py` for what's been tried and rejected for CDC BMI and OFC, and `spec/roadmap.md` R12 for the full plan.

If a regenerated file differs from the committed one, that is a stop-and-check signal, not something to commit through. Work out why (wrong parameter? real upstream `rcpchgrowth` change? version drift since the file was last generated?) before deciding whether to update it, and get a visual rendering review (`s/storybook`) for anything you do commit.
