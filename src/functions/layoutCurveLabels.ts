import { IPlottedCentileMeasurement } from '../interfaces/CentilesObject';
import { Domains } from '../interfaces/Domains';
import { labelAngle } from './labelAngle';

export const CURVE_CHART_PADDING = 50;
const MIN_FITTED_FONT_SIZE = 8;
const FALLBACK_FONT_SIZE = 3;
const FONT_SIZE_STEP = 0.25;

type Point = { x: number; y: number };
type Bounds = { left: number; right: number; top: number; bottom: number };
type Segment = { before: Point; after: Point; angle: number };

export type LabelledCurve = {
    id: string;
    text: string;
    // Reference windows stay separate: never interpolate across their discontinuities.
    segments: IPlottedCentileMeasurement[][];
};

export type CurveLabel = {
    id: string;
    text: string;
    side: 'left' | 'right';
    x: number;
    y: number;
    angle: number;
    fontSize: number;
    halfWidth: number;
    halfHeight: number;
    bounds: Bounds;
};

const isPoint = (point: IPlottedCentileMeasurement): point is Point =>
    Number.isFinite(point?.x) && Number.isFinite(point?.y);

const axes = (angle: number): Point[] => {
    const radians = (angle * Math.PI) / 180;
    return [
        { x: Math.cos(radians), y: Math.sin(radians) },
        { x: -Math.sin(radians), y: Math.cos(radians) },
    ];
};
const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;

const overlaps = (a: CurveLabel, b: CurveLabel) => {
    const aAxes = axes(a.angle);
    const bAxes = axes(b.angle);
    const distance = { x: a.x - b.x, y: a.y - b.y };
    // Axis-aligned boxes would unnecessarily shrink labels on steep parallel curves.
    return [...aAxes, ...bAxes].every((axis) => {
        const aRadius = a.halfWidth * Math.abs(dot(aAxes[0], axis)) + a.halfHeight * Math.abs(dot(aAxes[1], axis));
        const bRadius = b.halfWidth * Math.abs(dot(bAxes[0], axis)) + b.halfHeight * Math.abs(dot(bAxes[1], axis));
        return Math.abs(dot(distance, axis)) < aRadius + bRadius;
    });
};

function clipSegment(before: Point, after: Point, bounds: Bounds): [Point, Point] | null {
    let start = 0;
    let end = 1;
    for (const [axis, min, max] of [
        ['x', bounds.left, bounds.right],
        ['y', bounds.top, bounds.bottom],
    ] as const) {
        const delta = after[axis] - before[axis];
        if (delta === 0) {
            if (before[axis] < min || before[axis] > max) return null;
        } else {
            const a = (min - before[axis]) / delta;
            const b = (max - before[axis]) / delta;
            start = Math.max(start, Math.min(a, b));
            end = Math.min(end, Math.max(a, b));
        }
    }
    if (start >= end) return null;
    const at = (fraction: number) => ({
        x: before.x + fraction * (after.x - before.x),
        y: before.y + fraction * (after.y - before.y),
    });
    return [at(start), at(end)];
}

/**
 * Fit complete, aligned label columns at the two visible ends. Each column uses
 * the largest uniform font size that fits; never stagger or drop individual labels.
 * Omit crowded columns, but try a smaller complete right column before leaving
 * a chart unlabelled. All interpolation is label-only and follows Victory's linear
 * segments, including viewport clipping.
 */
export function layoutCurveLabels(
    curves: LabelledCurve[],
    domains: Domains,
    width: number,
    height: number,
    preferredFontSize: number,
): CurveLabel[] {
    const padding = CURVE_CHART_PADDING;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;
    const xSpan = domains.x[1] - domains.x[0];
    const ySpan = domains.y[1] - domains.y[0];
    if (![plotWidth, plotHeight, xSpan, ySpan, preferredFontSize].every((n) => Number.isFinite(n) && n > 0)) return [];

    const plot = { left: padding, right: width - padding, top: padding, bottom: height - padding };
    const toPixel = (point: Point): Point => ({
        x: padding + ((point.x - domains.x[0]) / xSpan) * plotWidth,
        y: height - padding - ((point.y - domains.y[0]) / ySpan) * plotHeight,
    });
    const visibleCurves = curves
        .map((curve) => {
            const segments: Segment[] = [];
            curve.segments.forEach((window) => {
                for (let i = 1; i < window.length; i++) {
                    const before = window[i - 1];
                    const after = window[i];
                    if (!isPoint(before) || !isPoint(after) || after.x <= before.x) continue;
                    const clipped = clipSegment(toPixel(before), toPixel(after), plot);
                    if (clipped)
                        segments.push({
                            before: clipped[0],
                            after: clipped[1],
                            angle: labelAngle([before, after], 0, domains, width, height),
                        });
                }
            });
            return { ...curve, segments };
        })
        .filter((curve) => curve.segments.length > 0);
    if (!visibleCurves.length) return [];

    // Keep columns at the visible x-ends. A curve that has already left through
    // a y-boundary is not present in that column; do not drag the whole column
    // into the middle of the chart to reach it.
    const minX = Math.min(...visibleCurves.map((curve) => Math.min(...curve.segments.map((s) => s.before.x))));
    const maxX = Math.max(...visibleCurves.map((curve) => Math.max(...curve.segments.map((s) => s.after.x))));
    if (minX >= maxX) return [];
    const longestText = Math.max(...visibleCurves.map((curve) => curve.text.length));
    // Fix the column positions before fitting the font, so sizing cannot stagger them.
    const inset = Math.min(preferredFontSize * (longestText * 0.35 + 1), (maxX - minX) / 3);
    const placeColumn = (
        side: CurveLabel['side'],
        occupied: CurveLabel[],
        minimumFontSize = MIN_FITTED_FONT_SIZE,
    ): CurveLabel[] => {
        const minSize = Math.min(minimumFontSize, preferredFontSize);
        const sizeSteps = Math.ceil((preferredFontSize - minSize) / FONT_SIZE_STEP);
        const x = side === 'left' ? minX + inset : maxX - inset;
        const anchors = visibleCurves.map((curve) => {
            const segment = curve.segments.find((s) => s.before.x <= x && s.after.x >= x);
            if (!segment) return null;
            const { before, after, angle } = segment;
            return {
                id: curve.id,
                text: curve.text,
                angle,
                y: before.y + ((x - before.x) * (after.y - before.y)) / (after.x - before.x),
            };
        });
        const columnAnchors = anchors.filter((anchor) => anchor !== null);
        if (!columnAnchors.length) return [];

        for (let i = 0; i <= sizeSteps; i++) {
            const fontSize = Math.max(minSize, preferredFontSize - i * FONT_SIZE_STEP);
            const gap = Math.max(1.5, fontSize * 0.15);
            const halfHeight = (fontSize * 1.2 + gap) / 2;
            const labels = columnAnchors.map((anchor): CurveLabel => {
                const radians = (anchor.angle * Math.PI) / 180;
                const halfWidth = (anchor.text.length * fontSize * 0.7) / 2 + gap;
                // Keep x identical for the column; the vertical offset gives the
                // same small perpendicular clearance above each rotated line.
                const y = anchor.y - (fontSize * 0.6 + gap) / Math.max(Math.cos(radians), 0.1);
                const dx = Math.abs(Math.cos(radians)) * halfWidth + Math.abs(Math.sin(radians)) * halfHeight;
                const dy = Math.abs(Math.sin(radians)) * halfWidth + Math.abs(Math.cos(radians)) * halfHeight;
                return {
                    ...anchor,
                    x,
                    y,
                    side,
                    fontSize,
                    halfWidth,
                    halfHeight,
                    bounds: { left: x - dx, right: x + dx, top: y - dy, bottom: y + dy },
                };
            });
            const fits = labels.every(
                (label, index) =>
                    label.bounds.left >= plot.left &&
                    label.bounds.right <= plot.right &&
                    label.bounds.top >= plot.top &&
                    label.bounds.bottom <= plot.bottom &&
                    ![...occupied, ...labels.slice(index + 1)].some((other) => overlaps(label, other)),
            );
            if (fits) return labels;
        }
        return [];
    };

    const right = placeColumn('right', []);
    const left = placeColumn('left', right);
    if (left.length || right.length) return [...left, ...right];

    // References with closely spaced extremes can require less than 8 SVG units
    // even at the older-age end. Prefer one complete, uniformly smaller column
    // to an entirely unlabelled chart; do not also add microscopic left labels.
    return placeColumn('right', [], FALLBACK_FONT_SIZE);
}
