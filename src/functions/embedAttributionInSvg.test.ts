import { embedAttributionInSvg, AttributionTextStyle } from './embedAttributionInSvg';

function buildSvg(width: number, height: number): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as unknown as SVGSVGElement;
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svg.appendChild(rect);
    return svg;
}

const style: AttributionTextStyle = {
    fontSize: 8,
    fontFamily: 'Arial',
    color: '#000000',
    fontWeight: 200,
    fontStyle: 'normal',
};

describe('embedAttributionInSvg', () => {
    test('does not mutate the original SVG', () => {
        const svg = buildSvg(450, 300);
        embedAttributionInSvg(svg, 'Some attribution', style);

        expect(svg.getAttribute('height')).toBe('300');
        expect(svg.querySelector('text')).toBeNull();
    });

    test('appends a text element containing the attribution content', () => {
        const svg = buildSvg(450, 300);
        const result = embedAttributionInSvg(svg, 'WHO Child Growth Standards, UK 1990 reference data', style);

        const text = result.querySelector('[data-testid="exported-chart-attribution"]');
        expect(text).not.toBeNull();
        expect(text?.textContent).toBe('WHO Child Growth Standards, UK 1990 reference data');
    });

    test('extends height and viewBox to fit the attribution', () => {
        const svg = buildSvg(450, 300);
        const result = embedAttributionInSvg(svg, 'Short text', style);

        const newHeight = Number(result.getAttribute('height'));
        expect(newHeight).toBeGreaterThan(300);

        const viewBox = result.getAttribute('viewBox');
        const [, , , viewBoxHeight] = viewBox!.split(' ').map(Number);
        expect(viewBoxHeight).toBe(newHeight);
    });

    test('preserves the original chart content in the clone', () => {
        const svg = buildSvg(450, 300);
        const result = embedAttributionInSvg(svg, 'Attribution', style);

        expect(result.querySelector('rect')).not.toBeNull();
    });

    test('wraps long attribution text onto multiple lines to fit the SVG width', () => {
        const svg = buildSvg(450, 300);
        const longText =
            'Styles ME, Cole TJ, Dennis J, Preece MA. New cross sectional stature, weight and head circumference references for Down’s syndrome in the UK and Republic of Ireland. Arch Dis Child 2002;87:104-8. BMI centiles added 11/11/2013';
        const result = embedAttributionInSvg(svg, longText, style);

        const tspans = result.querySelectorAll('[data-testid="exported-chart-attribution"] tspan');
        expect(tspans.length).toBeGreaterThan(1);
        const joined = Array.from(tspans)
            .map((tspan) => tspan.textContent)
            .join(' ');
        expect(joined).toBe(longText);
    });

    test('keeps every wrapped line within the SVG width', () => {
        const svg = buildSvg(200, 300);
        const longText =
            'Published by the Centers for Disease Control and Prevention, November 1, 2009. Includes WHO Child Growth Standards.';
        const result = embedAttributionInSvg(svg, longText, style);

        const tspans = Array.from(result.querySelectorAll('[data-testid="exported-chart-attribution"] tspan'));
        const availableWidth = 200 - 2 * 8;
        const averageCharWidth = style.fontSize * 0.55;
        const maxCharsPerLine = Math.floor(availableWidth / averageCharWidth);

        tspans.forEach((tspan) => {
            expect((tspan.textContent ?? '').length).toBeLessThanOrEqual(maxCharsPerLine);
        });
    });

    test('single word longer than the line width is still placed on its own line rather than dropped', () => {
        const svg = buildSvg(100, 300);
        const result = embedAttributionInSvg(svg, 'Supercalifragilisticexpialidocious', style);

        const tspans = result.querySelectorAll('[data-testid="exported-chart-attribution"] tspan');
        expect(tspans.length).toBe(1);
        expect(tspans[0].textContent).toBe('Supercalifragilisticexpialidocious');
    });
});
