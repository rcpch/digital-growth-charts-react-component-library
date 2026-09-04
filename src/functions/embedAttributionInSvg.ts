export interface AttributionTextStyle {
    fontSize: number;
    fontFamily: string;
    color: string;
    fontWeight: number | string;
    fontStyle: string;
}

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const HORIZONTAL_PADDING = 8;
const LINE_HEIGHT_MULTIPLIER = 1.4;
// jsdom (and headless SVG export generally) has no layout engine, so we cannot
// measure real glyph widths. This is a deliberately rough estimate of average
// character advance for the sans-serif/Arial-style fonts used by this
// component, good enough to keep attribution text from being clipped by the
// exported SVG's width.
const AVERAGE_CHAR_WIDTH_FACTOR = 0.55;

/**
 * Returns a clone of the given chart SVG with the reference attribution text
 * appended below the chart content, wrapped to the SVG's width and with the
 * SVG's height/viewBox extended to fit it.
 *
 * The original `svg` element is left untouched; the caller should pass the
 * returned clone (not the original) to exportChartCallback.
 */
export function embedAttributionInSvg(
    svg: SVGSVGElement,
    attributionText: string,
    style: AttributionTextStyle,
): SVGSVGElement {
    const svgWidth = Number(svg.getAttribute('width')) || 0;
    const svgHeight = Number(svg.getAttribute('height')) || 0;

    const lineHeight = style.fontSize * LINE_HEIGHT_MULTIPLIER;
    const availableWidth = Math.max(svgWidth - HORIZONTAL_PADDING * 2, 1);
    const averageCharWidth = style.fontSize * AVERAGE_CHAR_WIDTH_FACTOR;
    const maxCharsPerLine = Math.max(Math.floor(availableWidth / averageCharWidth), 1);

    const lines = wrapText(attributionText, maxCharsPerLine);
    const attributionBlockHeight = lines.length * lineHeight + HORIZONTAL_PADDING;
    const newHeight = svgHeight + attributionBlockHeight;

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('height', String(newHeight));

    const viewBox = clone.getAttribute('viewBox');
    if (viewBox) {
        const [minX, minY, width, height] = viewBox.split(' ');
        clone.setAttribute('viewBox', `${minX} ${minY} ${width} ${Number(height) + attributionBlockHeight}`);
    }

    const text = document.createElementNS(SVG_NAMESPACE, 'text');
    text.setAttribute('data-testid', 'exported-chart-attribution');
    text.setAttribute('font-size', String(style.fontSize));
    text.setAttribute('font-family', style.fontFamily);
    text.setAttribute('font-weight', String(style.fontWeight));
    text.setAttribute('font-style', style.fontStyle);
    text.setAttribute('fill', style.color);

    lines.forEach((line, index) => {
        const tspan = document.createElementNS(SVG_NAMESPACE, 'tspan');
        tspan.setAttribute('x', String(HORIZONTAL_PADDING));
        tspan.setAttribute('y', String(svgHeight + HORIZONTAL_PADDING + (index + 1) * lineHeight - lineHeight * 0.25));
        tspan.textContent = line;
        text.appendChild(tspan);
    });

    clone.appendChild(text);

    return clone;
}

function wrapText(text: string, maxCharsPerLine: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
        const candidate = currentLine.length > 0 ? `${currentLine} ${word}` : word;
        if (candidate.length > maxCharsPerLine && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = candidate;
        }
    }
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines;
}
