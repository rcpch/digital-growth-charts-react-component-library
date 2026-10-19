# Curve labels — issue #258

## Rendering decision

Centile labels and the SDS reference labels on UK-WHO BMI charts have no background. Their colour defaults to `axisStyle.tickLabelTextStyle.colour`, or black if unset. Consumers can override both through `customThemeStyles.centileStyle.centileTextStyle.colour`, without changing curve strokes. Rotation follows the rendered tangent. Labels sit slightly above their curves, rather than masking them.

After reviewing selective suppression and staggered placement, the requested design is **two aligned columns with dynamically fitted text**:

- One shared x-position near each visible x-end, with inset padding for the longest label.
- Start with the larger, zoom-aware preferred font size. Fit each column uniformly in 0.25 SVG-unit steps, normally to a minimum of 8 units. The two columns can have different sizes; labels within a column cannot.
- Check rotated text bounds across centile and SDS labels together. Do not scatter labels along the curves or omit individual labels to resolve collisions.
- If a complete column cannot fit at 8 units, omit that entire column. **If neither column fits**, retry only the right column down to 3 units before giving up. The former hard 8-unit floor left most full-life WHO/CDC charts entirely unlabelled. The fallback preserves a complete identifier set without staggering or selecting individual centiles, but necessarily produces smaller text in dense full-life views. Zooming or using a taller chart gives it more room. Crowded younger-age labels do not receive this fallback.
- A curve that does not intersect a column within the viewport has no label there. In particular, upper BMI SDS curves can exit through the top before the right edge. Do not move the right column into the middle of the chart to reach them.
- Label interpolation follows the displayed linear segments. Never bridge separate reference windows or missing values. Font bounds are conservative estimates for the numeric/ordinal text, not DOM measurements; unusual consumer-supplied fonts still need visual review.

SDS labels use explicit values such as `+3.33 SDS`, not ordinal suffixes.

## Safety and compatibility

This changes annotation layout only. Reference data, measurement values, clinical calculations, curve geometry, provenance behaviour, existing public props, attribution and identity are unchanged. The optional `centileTextStyle.colour` setting is an additive extension to the existing theme API; overrides are isolated per chart rather than mutating shared theme defaults. Hidden labels do not hide curves or measurements. Labels remain in the exported SVG and retain the existing hide/show control.

The separate SDS chart uses labelled y-axis ticks rather than this curve-label layout and is unchanged.

## Review cases

The focused `Visual regression/Curve endpoint labels` stories include:

- UK-WHO preterm female height with bottom identity.
- UK-WHO male term birth weight, including labels over the grey term strip.
- UK-WHO high male BMI and female BMI life course.
- CDC female height and BMI, plus the reported WHO female height story, with closely spaced outer centiles.
- Narrow height/BMI views and populated fixtures for zoom, pan, reset and label toggling.

Jest tests require non-empty labels across all 41 supported reference/sex/measurement combinations, assert the exact complete WHO/CDC right-column centile sets, and cover column alignment, uniform fitted sizes, complete-column suppression, clipping, sparse segments, reference joins and the reported Storybook cases. Browser review must check the final visual arrangement and the minimum-size trade-off; passing tests or a Chromatic upload are not maintainer visual approval.
