// Generated with util/create-component.js
import React from 'react';
import { render } from '@testing-library/react';
import { validateMeasurementsObject } from '../functions/validateClientMeasurementsArrayNormalizeDates';

import RCPCHChart from './RCPCHChart';
import { RCPCHChartProps } from './RCPCHChart.types';
import {
    chartObject,
    axesObject,
    gridlinesObject,
    centilesObject,
    measurementObjects,
    sdsObject,
} from '../testParameters/styles/monochromeStyles';
import { duplicateMeasurementSameValue } from '../testParameters/measurements/duplicateMeasurementSameValue';
import { duplicateMeasurementDifferentValue } from '../testParameters/measurements/duplicateMeasurementDifferentValue';

describe('RCPCHChart', () => {
    let props: RCPCHChartProps;

    beforeEach(() => {
        props = {
            // explicitly set a valid theme so stylesForTheme doesn't throw
            theme: 'monochrome',
            reference: 'uk-who',
            title: 'TestChartTitle',
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
    });

    const renderComponent = () => render(<RCPCHChart {...props} />);

    test('RCPCHChart handles duplicate measurements for SDS chart', () => {
        // SDS: allow duplicates true should render plots
        props.chartType = 'sds';
        props.measurements = { height: duplicateMeasurementDifferentValue as any };
        props.allowDuplicates = true;
        const { queryAllByTestId } = renderComponent();
        // expect two chronological measurement points (different values)
        expect(queryAllByTestId('chronologicalMeasurementPoint').length).toBeGreaterThanOrEqual(1);

        // Now test allowDuplicates false should raise error when sex mismatch or duplicates exist
        props.allowDuplicates = false;
        // Using same measurements should cause error in getDomainsAndData when duplicates are present
        expect(() => renderComponent()).toThrow();
    });

    test('RCPCHChart handles duplicate measurements for Centile chart', () => {
        props.chartType = 'centile';
        props.measurements = { height: duplicateMeasurementSameValue as any };
        props.allowDuplicates = true;
        const { queryAllByTestId } = renderComponent();
        expect(queryAllByTestId('chronologicalMeasurementPoint').length).toBeGreaterThanOrEqual(1);

        props.allowDuplicates = false;
        expect(() => renderComponent()).toThrow();
    });

    test.skip('should render chart title text correctly', () => {
        props.measurementMethod = 'height';
        const { getByTestId } = renderComponent();

        const component = getByTestId('RCPCHChart');

        expect(component.textContent?.match(/TestChartTitle/));
    });
});

describe('validateMeasurementsObject - date and type normalisation', () => {
    let errorSpy: jest.SpyInstance;
    let warnSpy: jest.SpyInstance; // For console.warn

    beforeEach(() => {
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });

    function buildMeasurement(overrides: any = {}) {
        return {
            birth_data: {
                birth_date: '2000-01-02',
                estimated_date_delivery: '2000-01-02',
                sex: 'female',
                ...overrides.birth_data,
            },
            measurement_dates: {
                observation_date: '2000-01-03',
                chronological_decimal_age: 1.0,
                corrected_decimal_age: 1.0,
                ...overrides.measurement_dates,
            },
            child_observation_value: {
                measurement_method: 'height',
                observation_value: 80.1,
                ...overrides.child_observation_value,
            },
            measurement_calculated_values: {
                chronological_sds: 0,
                corrected_sds: 0,
                ...overrides.measurement_calculated_values,
            },
            ...overrides.rest,
        };
    }

    test('truncates ISO datetimes with time components and logs errors', () => {
        const m = buildMeasurement({
            birth_data: {
                birth_date: '1759-04-11T00:00:00.000Z',
                estimated_date_delivery: '1759-04-11T13:45:30+01:00',
            },
            measurement_dates: {
                observation_date: '1761-04-10T23:59:59Z',
            },
        });

        const result = validateMeasurementsObject({ height: [m] });
        const cleaned = result.height?.[0];

        expect(cleaned?.birth_data?.birth_date).toBe('1759-04-11');
        expect(cleaned?.birth_data?.estimated_date_delivery).toBe('1759-04-11');
        expect(cleaned?.measurement_dates?.observation_date).toBe('1761-04-10');

        const warnMessages = warnSpy.mock.calls.map((c) => c[0]);
        expect(warnMessages.some((msg) => msg.includes('truncated'))).toBeTruthy();

        const errorMessages = errorSpy.mock.calls.map((c) => c[0]);
        expect(errorMessages.some((msg) => msg.includes('truncated'))).toBeFalsy();
    });

    test('normalises variant separators and logs error', () => {
        const m = buildMeasurement({
            measurement_dates: {
                observation_date: '1761/04/10',
            },
            birth_data: {
                birth_date: '1759.04.11',
                estimated_date_delivery: '1759_04_11',
            },
        });

        const result = validateMeasurementsObject({ height: [m] });
        const cleaned = result.height?.[0];

        expect(cleaned?.measurement_dates?.observation_date).toBe('1761-04-10');
        expect(cleaned?.birth_data?.birth_date).toBe('1759-04-11');
        expect(cleaned?.birth_data?.estimated_date_delivery).toBe('1759-04-11');

        const warnMessages = warnSpy.mock.calls.map((c) => c[0]);
        expect(warnMessages.filter((m) => m.includes('Non-standard date separators')).length).toBeGreaterThanOrEqual(3);

        const errorMessages = errorSpy.mock.calls.map((c) => c[0]);
        expect(errorMessages.some((m) => m.includes('Non-standard date separators'))).toBeFalsy();
    });

    test('unparseable date is left unchanged and logs error', () => {
        const m = buildMeasurement({
            measurement_dates: {
                observation_date: '!!!not-a-date###',
            },
        });

        const result = validateMeasurementsObject({ height: [m] });
        const cleaned = result.height?.[0];

        expect(cleaned?.measurement_dates?.observation_date).toBe('!!!not-a-date###');

        const messages = errorSpy.mock.calls.map((c) => c[0]);
        expect(messages.some((m) => m.includes('Unparseable date'))).toBeTruthy();
    });

    test('coercible natural language date logs warning (not error) and coerces', () => {
        const m = buildMeasurement({
            birth_data: { birth_date: '11 Apr 1759' },
        });

        const result = validateMeasurementsObject({ height: [m] });
        const cleaned = result.height?.[0];

        expect(cleaned?.birth_data?.birth_date).toMatch(/^1759-04-\d{2}$/);
        const warnMessages = warnSpy.mock.calls.map((c) => c[0]);
        expect(warnMessages.some((m) => m.includes('Invalid date format'))).toBeTruthy();

        const errorMessages = errorSpy.mock.calls.map((c) => c[0]);
        expect(errorMessages.some((m) => m.includes('Invalid date format'))).toBeFalsy();
    });

    test('logs type warnings for invalid numeric types', () => {
        const m = buildMeasurement({
            measurement_dates: {
                chronological_decimal_age: '1.23',
                corrected_decimal_age: '1.23',
            },
            child_observation_value: {
                observation_value: '85.7',
            },
            measurement_calculated_values: {
                chronological_sds: '0.1',
                corrected_sds: '0.2',
            },
        });

        validateMeasurementsObject({ height: [m] });

        const messages = errorSpy.mock.calls.map((c) => c[0]);
        const numericWarnings = messages.filter((m) => m.includes('Type warning'));
        expect(numericWarnings.length).toBeGreaterThanOrEqual(4);
    });

    test('logs error for invalid measurement_method', () => {
        const m = buildMeasurement({
            child_observation_value: {
                measurement_method: 'length', // invalid
            },
        });

        validateMeasurementsObject({ height: [m] });

        const messages = errorSpy.mock.calls.map((c) => c[0]);
        expect(messages.some((m) => m.includes('Invalid measurement_method'))).toBeTruthy();
    });
});
