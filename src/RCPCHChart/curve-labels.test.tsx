import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RCPCHChart from './RCPCHChart';
import { RCPCHChartProps } from './RCPCHChart.types';
import { ukWhoFemaleBmi, ukWhoFemaleWeight, ukWhoMaleWeight } from '../testParameters/measurements/generated';
import { prematureGirlOverThreeHeight } from '../testParameters/measurements/prematureGirlOverThreeHeight';
import { ukwhoBMIBoyHigh } from '../testParameters/measurements/ukwhoBMIBoyHigh';
import { twoToEight } from '../testParameters/measurements/twoToEight';
import { whoToNineteenGirlHeight } from '../testParameters/measurements/whoHeightToNineteenGirl';

const props: RCPCHChartProps = {
    title: 'Curve labels',
    reference: 'uk-who',
    measurementMethod: 'height',
    sex: 'female',
    measurements: { height: [] },
    width: 1000,
    height: 800,
    theme: 'traditional',
    enableZoom: true,
    enableExport: true,
    exportChartCallback: () => undefined,
};

const references: RCPCHChartProps['reference'][] = ['uk-who', 'cdc', 'who', 'turner', 'trisomy-21', 'trisomy-21-aap'];
const sexes: RCPCHChartProps['sex'][] = ['female', 'male'];
const methods: RCPCHChartProps['measurementMethod'][] = ['height', 'weight', 'bmi', 'ofc'];
const chartCases = references.flatMap((reference) =>
    (reference === 'turner' ? sexes.slice(0, 1) : sexes).flatMap((sex) =>
        (reference === 'turner' ? methods.slice(0, 1) : methods).map((measurementMethod) => ({
            reference,
            sex,
            measurementMethod,
        })),
    ),
);

it.each(chartCases)(
    'keeps labels visible, aligned and uniformly sized for $reference / $sex / $measurementMethod',
    (chart) => {
        render(<RCPCHChart {...props} {...chart} measurements={{ [chart.measurementMethod]: [] }} />);
        const labels = screen.getAllByTestId(/^curve-label-/);
        const ids = labels.map((label) => label.getAttribute('data-testid'));
        expect(new Set(ids).size).toBe(labels.length);
        labels.forEach((label) => expect(label.textContent).not.toMatch(/NaN|undefined/));
        const left = labels.filter((label) => label.getAttribute('data-testid').endsWith('-left'));
        const right = labels.filter((label) => label.getAttribute('data-testid').endsWith('-right'));
        for (const column of [left, right]) {
            if (!column.length) continue;
            expect(new Set(column.map((label) => label.getAttribute('x'))).size).toBe(1);
            expect(new Set(column.map((label) => label.querySelector('tspan').style.fontSize)).size).toBe(1);
        }
        if (chart.reference === 'who' || chart.reference === 'cdc') {
            const expectedCentiles =
                chart.reference === 'who'
                    ? [1, 3, 5, 10, 15, 50, 85, 90, 95, 97, 99]
                    : chart.measurementMethod === 'bmi'
                      ? [3, 5, 10, 25, 50, 75, 85, 90, 95, 98, 99, 99.9, 99.99]
                      : chart.measurementMethod === 'ofc'
                        ? [3, 10, 25, 50, 75, 90, 97]
                        : [3, 5, 10, 25, 50, 75, 90, 95, 97];
            expect(right.map((label) => label.getAttribute('data-testid')).sort()).toEqual(
                expectedCentiles.map((centile) => `curve-label-centile-${centile}-right`).sort(),
            );
        }
    },
);

it('renders all 11 centiles in the reported WHO girls height story', () => {
    render(
        <RCPCHChart
            {...props}
            reference="who"
            measurements={{ height: whoToNineteenGirlHeight }}
            theme="tanner1"
            clinicianFocus
        />,
    );
    const right = screen.getAllByTestId(/^curve-label-centile-.*-right$/);
    expect(right).toHaveLength(11);
    expect(new Set(right.map((label) => label.getAttribute('x'))).size).toBe(1);
    expect(new Set(right.map((label) => label.querySelector('tspan').style.fontSize)).size).toBe(1);
});

const regressionCases: { name: string; args: Partial<RCPCHChartProps>; rightCount: number; leftCount: number }[] = [
    {
        name: 'preterm female height',
        args: { measurements: { height: prematureGirlOverThreeHeight }, theme: 'tanner2', logoVariant: 'bottom' },
        rightCount: 9,
        leftCount: 0,
    },
    {
        name: 'term male birth weight',
        args: {
            measurementMethod: 'weight',
            sex: 'male',
            measurements: { weight: [ukWhoMaleWeight[0]] },
            theme: 'tanner1',
        },
        rightCount: 9,
        leftCount: 9,
    },
    {
        name: 'high male BMI',
        args: { measurementMethod: 'bmi', sex: 'male', measurements: { bmi: ukwhoBMIBoyHigh }, theme: 'tanner2' },
        rightCount: 15,
        leftCount: 0,
    },
    {
        name: 'female BMI life course',
        args: { measurementMethod: 'bmi', measurements: { bmi: [] }, theme: 'tanner2' },
        rightCount: 11,
        leftCount: 15,
    },
    {
        name: 'CDC female height',
        args: { reference: 'cdc', measurements: { height: twoToEight }, theme: 'tanner2' },
        rightCount: 9,
        leftCount: 0,
    },
];

it.each(regressionCases)('renders complete columns for the reported $name case', ({ args, rightCount, leftCount }) => {
    render(<RCPCHChart {...props} {...args} />);
    expect(screen.queryAllByTestId(/^curve-label-.*-right$/)).toHaveLength(rightCount);
    expect(screen.queryAllByTestId(/^curve-label-.*-left$/)).toHaveLength(leftCount);
    const centiles = screen.getAllByTestId(/^curve-label-centile-.*-right$/);
    expect(centiles).toHaveLength(9);
});

it('renders readable life-course labels in the chart SVG, with at most one at either end', () => {
    const { container } = render(<RCPCHChart {...props} />);
    const labels = screen.getAllByTestId(/^curve-label-/);
    expect(labels.length).toBeGreaterThan(0);
    expect(labels.length).toBeLessThanOrEqual(18);
    for (const label of labels) {
        expect(label.closest('svg')).not.toBeNull();
        expect(label.tagName).toBe('text');
        expect(label.querySelector('tspan')).toHaveStyle({ fill: '#000000' });
        expect(Number(label.getAttribute('x'))).toBeGreaterThan(50);
        expect(Number(label.getAttribute('x'))).toBeLessThan(950);
    }
    expect(new Set(labels.map((label) => label.getAttribute('data-testid'))).size).toBe(labels.length);
    expect(container.querySelectorAll('[data-testid^="reference-"]').length).toBeGreaterThan(0);
});

it('keeps labels transparent over the term strip, toggles them without removing curves, and exports them', () => {
    const exportChartCallback = jest.fn();
    const { container } = render(
        <RCPCHChart
            {...props}
            measurementMethod="weight"
            measurements={{ weight: [ukWhoFemaleWeight[0]] }}
            exportChartCallback={exportChartCallback}
        />,
    );
    expect(screen.getByTestId('termArea')).toBeInTheDocument();
    const labels = screen.getAllByTestId(/^curve-label-/);
    // Backgrounds on VictoryLabel wrap the text in a group; these labels are direct text children.
    labels.forEach((label) =>
        expect(label.parentElement.querySelector('text[data-testid^="curve-label-"]')).not.toBeNull(),
    );
    expect(container.querySelectorAll('rect[style*="fill: white"]')).toHaveLength(0);
    fireEvent.click(screen.getByTestId('copy-button'));
    expect(exportChartCallback.mock.calls[0][0].querySelectorAll('[data-testid^="curve-label-"]').length).toBe(
        labels.length,
    );
    const curveCount = container.querySelectorAll('[data-testid^="reference-"]').length;
    fireEvent.click(screen.getByTestId('gradient-labels-button'));
    expect(screen.queryAllByTestId(/^curve-label-/)).toHaveLength(0);
    expect(container.querySelectorAll('[data-testid^="reference-"]').length).toBe(curveCount);
    fireEvent.click(screen.getByTestId('gradient-labels-button'));
    expect(screen.getAllByTestId(/^curve-label-/)).toHaveLength(labels.length);
});

it('inherits the tick-label colour, supports an override, and keeps each chart and export independent', () => {
    const exportChartCallback = jest.fn();
    const bmiProps: RCPCHChartProps = {
        ...props,
        measurementMethod: 'bmi',
        measurements: { bmi: ukWhoFemaleBmi },
        exportChartCallback,
    };
    const customThemeStyles: RCPCHChartProps['customThemeStyles'] = {
        axisStyle: {
            tickLabelTextStyle: { colour: '#334455' },
            axisLabelTextStyle: { colour: '#887766' },
        },
        centileStyle: { centileStroke: '#ff0000', sdsStroke: '#7159aa' },
    };
    const chart = render(<RCPCHChart {...bmiProps} customThemeStyles={customThemeStyles} />);
    const expectLabelColour = (container: Element, colour: string) => {
        const labels = container.querySelectorAll('[data-testid^="curve-label-"] tspan');
        expect(labels.length).toBeGreaterThan(0);
        expect(container.querySelector('[data-testid^="curve-label-centile-"]')).not.toBeNull();
        expect(container.querySelector('[data-testid^="curve-label-sds-"]')).not.toBeNull();
        labels.forEach((label) => expect(label).toHaveStyle({ fill: colour }));
    };
    expectLabelColour(chart.container, '#334455');

    chart.rerender(
        <RCPCHChart
            {...bmiProps}
            customThemeStyles={{
                ...customThemeStyles,
                centileStyle: { ...customThemeStyles.centileStyle, centileTextStyle: { colour: '#006699' } },
            }}
        />,
    );
    expectLabelColour(chart.container, '#006699');
    fireEvent.click(chart.getByTestId('copy-button'));
    expectLabelColour(exportChartCallback.mock.calls[0][0], '#006699');

    const defaultChart = render(<RCPCHChart {...bmiProps} />);
    expectLabelColour(defaultChart.container, '#000000');
    expectLabelColour(chart.container, '#006699');
    chart.rerender(<RCPCHChart {...bmiProps} />);
    expectLabelColour(chart.container, '#000000');
});

it('uses explicit SDS values rather than ordinal suffixes on BMI reference curves', () => {
    render(<RCPCHChart {...props} measurementMethod="bmi" measurements={{ bmi: ukWhoFemaleBmi }} />);
    const labels = screen.getAllByTestId(/^curve-label-sds-/);
    labels.forEach((label) => expect(label.textContent).toMatch(/^[+-]?\d+(\.\d+)? SDS$/));
});
