# Open Queries

These questions need product or maintainer decisions before implementation. Engineering details should move to GitHub issues once the intended behaviour is clear.

## Q1 - How should prereleases be published?

`deploy.txt` describes a manual alpha release process, while the current publish workflow sends every created GitHub release to npm without selecting a prerelease distribution tag. Decide whether npm prereleases remain supported and, if so, how GitHub prereleases map to npm tags such as `next` or `alpha`. This decision unblocks replacing or deleting `deploy.txt` and making the publish workflow safe for prereleases.

> I think although we always suggested we would have a code 'promotion' workflow, we never actually implemented it. So the current workflow is to just publish whatever is in the release.

**Resolved**: `deploy.txt` deleted; it described a promotion workflow that was never implemented and the current single-tag publish behaviour is correct as-is.

## Q2 - What should the age display control do?

Confirm whether the reported "Decimal Age?" control is the current `Corrected Age` / `Chronological Age` / `Both Ages` radio group. Define which options should be available, their clinical meaning, the default state, when the control should be hidden, and whether changing props must update the selected state. This decision blocks R6.

> The control I mentioned is in the tabular data view of the demo, labelled 'Results'. I think actually we should rename that 'Tabular' or 'Table' because ALL of this stuff is 'Results' in some sense, we are choosing whether we want a chart or a table.
> Once that is selected, there is a 'Decimal Age?' switch which I think is meant to toggle between years, months, and days, and decimal age. On retesting, it does actually work, however the switch is almost invisible and the label is unclear. I think we should rename the switch to 'Decimal Age' and make it more visible, and also add a tooltip or some other explanation of what it does. I think we should also consider whether this is the right place for this control, whether it should be directly above the Age column for example.

**Resolved**: the control described is in `digital-growth-charts-react-client`, not this repo (this library's own `AgeRadioButtonGroup` is a different Corrected/Chronological/Both control). Filed as [digital-growth-charts-react-client#167](https://github.com/rcpch/digital-growth-charts-react-client/issues/167). Roadmap R6 in this repo is closed as redirected.

## Q3 - Must reference attribution be included in exported charts?

Reference attribution is visible below the rendered Victory chart, but export callbacks currently receive only the chart SVG. Decide whether an exported chart must contain its reference attribution and component identity within the exported asset, or whether attribution in the surrounding page is sufficient. This decision informs R1 and R2.

> Ideally the reference attribution should be included in the exported chart.

**Resolved**: implemented via `embedAttributionInSvg`, wired into both `CentileChart` and `SDSChart`'s export handlers. Roadmap R7.

## Q4 - Where should the event demonstration appear?

The general `twoToEight` fixture places its event almost exactly on the two-year reference boundary, which can make the event marker appear related to that boundary. Decide whether to move the event to a clearly separate age, remove it from this general fixture, or rely on the dedicated event fixture and story instead.

> Place it in the dedicated event fixture and story, and remove it from the general fixture. The event demonstration should be clearly separate from the reference boundary to avoid confusion.

**Resolved**: removed the event annotation from `twoToEight.ts`; the dedicated `ukWhoFemaleHeightBoneAgeEvent` fixture and its Storybook story already demonstrate events separately.
