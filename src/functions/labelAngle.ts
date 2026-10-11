import { Domains } from '../interfaces/Domains';

type Point = { x?: number; y?: number };

const VICTORY_CHART_PADDING = 50;

/**
 * Returns the tangent angle of a curve at a label point in SVG pixel space.
 * Reference values must be converted to rendered pixels because the apparent
 * gradient changes with the active x/y domains and chart dimensions.
 */
export function labelAngle(
    data: Point[] | undefined,
    index: number,
    domains: Domains,
    width: number,
    height: number,
): number {
    if (!data || data.length < 2 || !data[index]) {
        return 0;
    }

    const before = data[Math.max(0, index - 1)];
    const after = data[Math.min(data.length - 1, index + 1)];
    const xDomainSpan = domains.x[1] - domains.x[0];
    const yDomainSpan = domains.y[1] - domains.y[0];

    if (
        !before ||
        !after ||
        before.x === undefined ||
        before.y === undefined ||
        after.x === undefined ||
        after.y === undefined ||
        xDomainSpan <= 0 ||
        yDomainSpan <= 0 ||
        before.x === after.x
    ) {
        return 0;
    }

    const xPixelsPerUnit = Math.max(width - VICTORY_CHART_PADDING * 2, 1) / xDomainSpan;
    const yPixelsPerUnit = Math.max(height - VICTORY_CHART_PADDING * 2, 1) / yDomainSpan;
    const radians = Math.atan2((after.y - before.y) * yPixelsPerUnit, (after.x - before.x) * xPixelsPerUnit);

    // SVG's y-axis increases downward, so Victory needs the inverse of the
    // conventional Cartesian tangent angle.
    return Math.round((-radians * 180) / Math.PI);
}
