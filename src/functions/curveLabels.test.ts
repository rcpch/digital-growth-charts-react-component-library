import { curveLabelFontSize } from './curveLabelFontSize';
import { labelAngle } from './labelAngle';
import { LabelledCurve, layoutCurveLabels } from './layoutCurveLabels';
import { Domains } from '../interfaces/Domains';

const domains: Domains = { x: [0, 20], y: [0, 100] };
const curve = (id = '50', y = 50): LabelledCurve => ({
    id,
    text: `${id}th`,
    segments: [
        [
            { x: 0, y },
            { x: 20, y },
        ],
    ],
});
const layout = (curves: LabelledCurve[], domain = domains, width = 1000, height = 800) =>
    layoutCurveLabels(curves, domain, width, height, 13);

describe('layoutCurveLabels', () => {
    it('places exactly two inset, above-line labels, even between sparse data points', () => {
        const labels = layout([curve()]);
        expect(labels.map((label) => label.side)).toEqual(['left', 'right']);
        expect(labels[0].x).toBeGreaterThan(50);
        expect(labels[0].x).toBeLessThan(100);
        expect(labels[1].x).toBeGreaterThan(900);
        expect(labels[1].x).toBeLessThan(950);
        labels.forEach((label) => {
            expect(label.y).toBeLessThan(400);
            expect(label.angle).toBeCloseTo(0);
            expect(label.bounds.left).toBeGreaterThanOrEqual(50);
            expect(label.bounds.right).toBeLessThanOrEqual(950);
        });
    });

    it('follows the visible domain rather than the sample index after zooming or panning', () => {
        const initial = layout([curve()]);
        const zoomed = layout([curve()], { x: [5, 6], y: [0, 100] });
        expect(zoomed).toHaveLength(2);
        zoomed.forEach((label, index) => {
            expect(label.x).toBeCloseTo(initial[index].x);
            expect(label.y).toBeCloseTo(initial[index].y);
        });
        expect(layout([curve()], { x: [25, 30], y: [0, 100] })).toEqual([]);
    });

    it('labels just the outer ends across reference windows without joining their discontinuities', () => {
        const segmented = {
            ...curve(),
            segments: [
                [
                    { x: 0, y: 20 },
                    { x: 10, y: 20 },
                ],
                [
                    { x: 10, y: 60 },
                    { x: 20, y: 60 },
                ],
            ],
        };
        const labels = layout([segmented]);
        expect(labels).toHaveLength(2);
        expect(labels[0].y).toBeGreaterThan(590);
        expect(labels[1].y).toBeLessThan(330);
        expect(segmented.segments[0]).toHaveLength(2);
    });

    it('does not interpolate through a reference gap or a missing value', () => {
        const separated = {
            ...curve(),
            segments: [
                [
                    { x: 0, y: 50 },
                    { x: 5, y: 50 },
                ],
                [
                    { x: 15, y: 50 },
                    { x: 20, y: 50 },
                ],
            ],
        };
        expect(layout([separated], { x: [6, 14], y: [0, 100] })).toEqual([]);
        const missing = { ...curve(), segments: [[{ x: 0, y: 50 }, { x: 10 }, { x: 20, y: 50 }]] };
        expect(layout([missing])).toEqual([]);
    });

    it('shrinks a complete crowded column uniformly without moving or dropping individual labels', () => {
        const lower = curve('25', 20);
        const upper = {
            ...curve('75'),
            segments: [
                [
                    { x: 0, y: 21.5 },
                    { x: 20, y: 60 },
                ],
            ],
        };
        const labels = layout([lower, upper, curve('99', 85)]);
        expect(labels.map((label) => `${label.id}-${label.side}`).sort()).toEqual([
            '25-left',
            '25-right',
            '75-left',
            '75-right',
            '99-left',
            '99-right',
        ]);
        const left = labels.filter((label) => label.side === 'left');
        const right = labels.filter((label) => label.side === 'right');
        expect(new Set(left.map((label) => label.x)).size).toBe(1);
        expect(new Set(left.map((label) => label.fontSize)).size).toBe(1);
        expect(left[0].fontSize).toBeLessThan(right[0].fontSize);
        expect(
            layout([upper, curve('99', 85), lower])
                .map((label) => `${label.id}-${label.side}`)
                .sort(),
        ).toEqual(labels.map((label) => `${label.id}-${label.side}`).sort());
    });

    it('checks centile and SDS labels together', () => {
        const curves = [curve(), { ...curve('sds'), text: '+3.33 SDS' }];
        const labels = layout(curves);
        expect(labels).toHaveLength(0);
        expect(layout([...curves].reverse())).toEqual(labels);
    });

    it('does not mistake intersecting axis-aligned bounds for colliding rotated labels', () => {
        const diagonal = (id: string, y: number) => ({
            ...curve(id),
            text: '99.6th',
            segments: [
                [
                    { x: 0, y },
                    { x: 20, y: y + 65 },
                ],
            ],
        });
        const labels = layout([diagonal('1', 10), diagonal('2', 14)]);
        expect(labels).toHaveLength(4);
        const left = labels.filter((label) => label.side === 'left');
        expect(left[0].bounds.top).toBeLessThan(left[1].bounds.bottom);
    });

    it('rotates using the chart aspect ratio while keeping the label above its curve', () => {
        const sloping = {
            ...curve(),
            segments: [
                [
                    { x: 0, y: 25 },
                    { x: 20, y: 75 },
                ],
            ],
        };
        const wide = layout([sloping]);
        const narrow = layout([sloping], domains, 500, 800);
        expect(wide).toHaveLength(2);
        expect(narrow).toHaveLength(2);
        expect(wide[0].angle).toBe(-21);
        expect(narrow[0].angle).toBeLessThan(wide[0].angle);
    });

    it('omits a whole column below the size floor, not just the crowded pair', () => {
        expect(layout([curve('25', 50), curve('75', 50.1), curve('99', 80)])).toEqual([]);
    });

    it('fits one complete smaller right column rather than leaving a dense chart unlabelled', () => {
        const labels = layout([curve('3', 50), curve('5', 51)]);
        expect(labels.map((label) => `${label.id}-${label.side}`)).toEqual(['3-right', '5-right']);
        expect(new Set(labels.map((label) => label.x)).size).toBe(1);
        expect(new Set(labels.map((label) => label.fontSize)).size).toBe(1);
        expect(labels[0].fontSize).toBeLessThan(8);
        expect(labels[0].fontSize).toBeGreaterThanOrEqual(3);
        expect(labels[1].bounds.bottom).toBeLessThanOrEqual(labels[0].bounds.top);
    });

    it('does not add tiny duplicate labels when a normal-sized column already fits', () => {
        const lower = {
            ...curve('3'),
            segments: [
                [
                    { x: 0, y: 20 },
                    { x: 20, y: 50 },
                ],
            ],
        };
        const upper = {
            ...curve('5'),
            segments: [
                [
                    { x: 0, y: 60 },
                    { x: 20, y: 50.1 },
                ],
            ],
        };
        const labels = layout([lower, upper]);
        expect(labels.map((label) => label.side)).toEqual(['left', 'left']);
        labels.forEach((label) => expect(label.fontSize).toBeGreaterThanOrEqual(8));
    });

    it('keeps the right column at the edge when an SDS curve leaves through the top', () => {
        const rising = {
            ...curve('sds'),
            segments: [
                [
                    { x: 0, y: 25 },
                    { x: 20, y: 150 },
                ],
            ],
        };
        const labels = layout([curve(), rising]);
        const left = labels.filter((label) => label.side === 'left');
        const right = labels.filter((label) => label.side === 'right');
        expect(left).toHaveLength(2);
        expect(right.map((label) => label.id)).toEqual(['50']);
        expect(right[0].x).toBeGreaterThan(900);
        expect(new Set(left.map((label) => label.x)).size).toBe(1);
    });

    it('omits labels outside the vertical viewport rather than clamping them onto another curve', () => {
        expect(layout([curve('50', 110)])).toEqual([]);
        expect(layout([curve('50', 100)])).toEqual([]);
    });

    it('handles empty, degenerate, non-finite and too-small layouts', () => {
        expect(layout([])).toEqual([]);
        expect(layout([{ ...curve(), segments: [] }])).toEqual([]);
        expect(layout([curve()], { x: [0, 0], y: [0, 100] })).toEqual([]);
        expect(layout([curve()], { x: [0, 20], y: [0, 0] })).toEqual([]);
        expect(layout([curve()], domains, 110)).toEqual([]);
        expect(layout([curve()], domains, NaN)).toEqual([]);
    });
});

describe('labelAngle', () => {
    const line = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
    ];

    it('uses the forward tangent at the left label position', () => {
        expect(labelAngle(line, 0, { x: [0, 2], y: [0, 2] }, 100, 100)).toBe(-45);
    });

    it('uses the rendered x and y scales, not a raw data gradient', () => {
        expect(labelAngle(line, 1, { x: [0, 4], y: [0, 2] }, 100, 100)).toBe(-63);
    });
});

describe('curveLabelFontSize', () => {
    it('increases label size as the visible age domain becomes smaller', () => {
        expect(curveLabelFontSize(10, [0, 2])).toBeGreaterThan(curveLabelFontSize(10, [0, 20]));
    });

    it('caps the zoom-derived increase', () => {
        expect(curveLabelFontSize(10, [0, 0.1])).toBeCloseTo(15.6);
    });

    it('keeps small-chart labels legible without overriding larger custom sizes', () => {
        expect(curveLabelFontSize(5, [0, 20])).toBe(11);
        expect(curveLabelFontSize(20, [0, 20])).toBe(26);
        expect(curveLabelFontSize(0, [0, 20])).toBe(0);
    });
});
