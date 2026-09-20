import { curveLabelFontSize } from './curveLabelFontSize';
import { labelAngle } from './labelAngle';
import { labelIndexInterval } from './labelIndexInterval';

const points = Array.from({ length: 10 }, (_, x) => ({ x, y: x }));

describe('labelIndexInterval', () => {
    it('selects the established label cadence from the visible reference-data segment', () => {
        const domains = { x: [0, 9], y: [0, 9] };

        expect(points.map((_, index) => labelIndexInterval(index, points, domains))).toEqual([
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
        ]);
    });

    it('does not label a segment with too few points', () => {
        expect(labelIndexInterval(5, points, { x: [4, 6], y: [0, 9] })).toBe(false);
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
});
