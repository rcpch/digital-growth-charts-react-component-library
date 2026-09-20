const REFERENCE_X_SPAN_YEARS = 20;
const MAX_ZOOM_MULTIPLIER = 1.2;
const BASE_LABEL_MULTIPLIER = 1.3;
const MIN_LABEL_FONT_SIZE = 11;

/**
 * Reference curves remain visible at every zoom level, so their labels need a
 * modest increase in size when a shorter age range is displayed. The incoming
 * font size has already been scaled for the SVG dimensions by makeAllStyles.
 * This is the preferred size. The layout fits each complete label column to
 * the available curve spacing, down to a separate minimum readable size.
 */
export function curveLabelFontSize(baseFontSize: number, xDomain: number[]): number {
    const xSpan = Math.max(xDomain[1] - xDomain[0], 0.01);
    const zoomMultiplier = Math.min(
        MAX_ZOOM_MULTIPLIER,
        1 + Math.max(0, Math.log2(REFERENCE_X_SPAN_YEARS / xSpan)) * 0.04,
    );

    if (baseFontSize <= 0) return 0;
    return Math.max(MIN_LABEL_FONT_SIZE, baseFontSize * BASE_LABEL_MULTIPLIER) * zoomMultiplier;
}
