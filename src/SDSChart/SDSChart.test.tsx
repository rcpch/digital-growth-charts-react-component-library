// Generated with util/create-component.js
import * as React from 'react';
import { render } from '@testing-library/react';
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
