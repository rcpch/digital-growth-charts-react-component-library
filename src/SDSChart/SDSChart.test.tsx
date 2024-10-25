// Generated with util/create-component.js
import * as React from 'react';
import { render } from '@testing-library/react';

import SDSChart from './SDSChart';
import { SDSChartProps } from './SDSChart.types';
import { monochromeStyles } from '../testParameters/styles/monochromeStyles';
import { ClientMeasurementObject } from '../interfaces/ClientMeasurementObject';

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
            sex: 'male',
            childMeasurements: blank,
            midParentalHeightData: {},
            enableZoom: false,
            styles: monochromeStyles,
            enableExport: false,
            exportChartCallback: () => null,
            clinicianFocus: false,
        };
    });

    const renderComponent = () => render(<SDSChart {...props} />);

    test.skip('should render foo text correctly', () => {
        props.title = 'TestChartTitle';
        const { getByTestId } = renderComponent();

        const component = getByTestId('SDSChart');

        expect(component.textContent?.match(/TestChartTitle/));
    });
});
