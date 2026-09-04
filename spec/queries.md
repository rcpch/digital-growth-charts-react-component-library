# Open Queries

These questions need product or maintainer decisions before implementation. Engineering details should move to GitHub issues once the intended behaviour is clear.

## Q1 - How should prereleases be published?

`deploy.txt` describes a manual alpha release process, while the current publish workflow sends every created GitHub release to npm without selecting a prerelease distribution tag. Decide whether npm prereleases remain supported and, if so, how GitHub prereleases map to npm tags such as `next` or `alpha`. This decision unblocks replacing or deleting `deploy.txt` and making the publish workflow safe for prereleases.

## Q2 - What should the age display control do?

Confirm whether the reported "Decimal Age?" control is the current `Corrected Age` / `Chronological Age` / `Both Ages` radio group. Define which options should be available, their clinical meaning, the default state, when the control should be hidden, and whether changing props must update the selected state. This decision blocks R6.

## Q3 - Must reference attribution be included in exported charts?

Reference attribution is visible below the rendered Victory chart, but export callbacks currently receive only the chart SVG. Decide whether an exported chart must contain its reference attribution and component identity within the exported asset, or whether attribution in the surrounding page is sufficient. This decision informs R1 and R2.

## Q4 - Where should the event demonstration appear?

The general `twoToEight` fixture places its event almost exactly on the two-year reference boundary, which can make the event marker appear related to that boundary. Decide whether to move the event to a clearly separate age, remove it from this general fixture, or rely on the dedicated event fixture and story instead.
