import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import RCPCHChart from './RCPCHChart';
import type { RCPCHChartProps } from './RCPCHChart.types';
import {
    axesObject,
    centilesObject,
    chartObject,
    gridlinesObject,
    measurementObjects,
    sdsObject,
} from '../testParameters/styles/monochromeStyles';
import {
    provenanceLegacyHeight,
    provenanceMatchHeight,
    provenanceMismatchHeight,
    provenanceMixedHeight,
    provenanceUnknownHeight,
} from '../testParameters/measurements/provenanceDemo';
import type { Measurement } from '../interfaces/RCPCHMeasurementObject';

const baseProps: RCPCHChartProps = {
    theme: 'monochrome',
    reference: 'uk-who',
    title: 'Provenance compatibility chart',
    measurementMethod: 'height',
    sex: 'female',
    midParentalHeightData: {},
    enableZoom: false,
    enableExport: false,
    exportChartCallback: () => null,
    clinicianFocus: false,
    measurements: {},
    chartType: 'centile',
    customThemeStyles: {
        chartStyle: chartObject,
        axisStyle: axesObject,
        gridlineStyle: gridlinesObject,
        centileStyle: centilesObject,
        sdsStyle: sdsObject,
        measurementStyle: measurementObjects,
    },
};

const provenanceCases: Array<{
    name: string;
    measurements: Measurement[];
    expectedPoints: number;
    warningText?: RegExp;
}> = [
    {
        name: 'matching provenance',
        measurements: provenanceMatchHeight,
        expectedPoints: 3,
    },
    {
        name: 'legacy response without provenance',
        measurements: provenanceLegacyHeight,
        expectedPoints: 3,
        warningText: /calculated before growth-reference verification was available/i,
    },
    {
        name: 'unknown future provenance',
        measurements: provenanceUnknownHeight,
        expectedPoints: 3,
        warningText: /unrecognised growth reference/i,
    },
    {
        name: 'recognised mismatched provenance',
        measurements: provenanceMismatchHeight,
        expectedPoints: 0,
        warningText: /3 measurements.*have been hidden/i,
    },
    {
        name: 'mixed matching, legacy, and mismatched provenance',
        measurements: provenanceMixedHeight,
        expectedPoints: 2,
        warningText: /1 measurement.*has been hidden/i,
    },
];

describe.each(['centile', 'sds'] as const)('RCPCHChart provenance compatibility on a %s chart', (chartType) => {
    it.each(provenanceCases)('$name', ({ measurements, expectedPoints, warningText }) => {
        const chart = render(
            <RCPCHChart {...baseProps} chartType={chartType} measurements={{ height: measurements }} />,
        );

        const plottedPointGroups = chart.queryAllByTestId('chronologicalMeasurementPoint');
        const plottedPointCount =
            chartType === 'sds'
                ? plottedPointGroups.reduce((count, group) => count + group.querySelectorAll('path').length, 0)
                : plottedPointGroups.length;

        expect(plottedPointCount).toBe(expectedPoints);
        expect(chart.queryByText('The chart could not be displayed')).not.toBeInTheDocument();

        const warning = chart.queryByTestId('provenance-warning-banner');
        if (warningText) {
            expect(warning).toHaveTextContent(warningText);
        } else {
            expect(warning).not.toBeInTheDocument();
        }
    });
});

describe('RCPCHChart provenance warning details', () => {
    it('identifies each legacy and mismatched measurement in a mixed response', () => {
        const chart = render(
            <RCPCHChart {...baseProps} chartType="centile" measurements={{ height: provenanceMixedHeight }} />,
        );

        fireEvent.click(chart.getByTestId('provenance-warning-toggle'));

        const details = chart.getByTestId('provenance-warning-details');
        expect(details).toHaveTextContent('Component version:');
        expect(details).toHaveTextContent('height[1]');
        expect(details).toHaveTextContent('PROVENANCE_LEGACY');
        expect(details).toHaveTextContent('height[2]');
        expect(details).toHaveTextContent('PROVENANCE_MISMATCH');
        expect(details).toHaveTextContent('expected "uk-who", received "cdc"');
    });
});
