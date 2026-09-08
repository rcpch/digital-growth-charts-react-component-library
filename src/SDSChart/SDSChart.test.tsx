// Generated with util/create-component.js
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SDSChart from './SDSChart';
import { SDSChartProps } from './SDSChart.types';
import { monochromeStyles } from '../testParameters/styles/monochromeStyles';
import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';
// duplicate measurement fixtures are tested in RCPCHChart.test.tsx

describe('SDSChart', () => {
    let props: SDSChartProps;

    const blank: ClientMeasurementObject = {
        height: [],
        weight: [],
        ofc: [],
        bmi: [],
    };

    beforeEach(() => {
        props = {
            chartsVersion: 'testVersion',
            reference: 'uk-who',
            title: 'TestChartTitle',
            subtitle: 'TestChartSubtitle',
            measurementMethod: 'height',
            sex: 'female',
            childMeasurements: blank,
            midParentalHeightData: {},
            enableZoom: false,
            styles: monochromeStyles,
            enableExport: false,
            exportChartCallback: () => null,
            clinicianFocus: false,
            allowDuplicates: true,
            height: 800,
            width: 1000,
            textScaleFactor: 1,
        };
    });

    const renderComponent = () => render(<SDSChart {...props} />);

    test('renders the chart title', () => {
        props.title = 'TestChartTitle';
        const chart = renderComponent();

        expect(chart.getByText('TestChartTitle')).toBeInTheDocument();
    });
});

describe('SDSChart exportChartCallback', () => {
    let props: SDSChartProps;
    const mockExportChartCallback = jest.fn();

    const blank: ClientMeasurementObject = {
        height: [],
        weight: [],
        ofc: [],
        bmi: [],
    };

    beforeEach(() => {
        mockExportChartCallback.mockClear();
        props = {
            chartsVersion: 'testVersion',
            reference: 'trisomy-21-aap',
            title: 'TestChartTitle',
            subtitle: 'TestChartSubtitle',
            measurementMethod: 'height',
            sex: 'female',
            childMeasurements: blank,
            midParentalHeightData: {},
            enableZoom: false,
            styles: monochromeStyles,
            enableExport: true,
            exportChartCallback: mockExportChartCallback,
            clinicianFocus: false,
            allowDuplicates: true,
            height: 800,
            width: 1000,
            textScaleFactor: 1,
        };
    });

    test('triggers exportChartCallback on click', () => {
        const { getByTestId } = render(<SDSChart {...props} />);
        fireEvent.click(getByTestId('copy-button'));
        expect(mockExportChartCallback).toHaveBeenCalledTimes(1);
    });

    test('passes an SVG containing the reference attribution to exportChartCallback', () => {
        const { getByTestId } = render(<SDSChart {...props} />);
        fireEvent.click(getByTestId('copy-button'));

        const exportedSvg = mockExportChartCallback.mock.calls[0][0] as SVGSVGElement;
        const attribution = exportedSvg.querySelector('[data-testid="exported-chart-attribution"]');
        expect(attribution?.textContent).toBe(
            'American Academy of Pediatrics (AAP) Trisomy 21 reference. Zemel BS, Pipan M, Stallings VA, Hall W, Schgadt K, Freedman DS, Thorpe P. Growth Charts for Children with Down Syndrome in the U.S. Pediatrics, 2015',
        );
    });
});
