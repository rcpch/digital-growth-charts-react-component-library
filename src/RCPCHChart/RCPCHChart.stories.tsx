// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import RCPCHChart from './RCPCHChart.tsx';
import { twoToEight } from '../testParameters/measurements/twoToEight';
import { traditionalBoyAxisStyles, traditionalBoyChartStyles, traditionalBoyGridlineStyle, traditionalBoyCentileStyle, traditionalBoyMeasurementStyle, traditionalBoySDSStyle } from '../testParameters/styles/traditionalBoysStyles';
import { traditionalGirlAxisStyles, traditionalGirlChartStyles, traditionalGirlGridlineStyle, traditionalGirlCentileStyle, traditionalGirlMeasurementStyle, traditionalGirlSDSStyle } from '../testParameters/styles/traditionalGirlsStyles';

const meta: Meta<typeof RCPCHChart> = {
  component: RCPCHChart,
};
export default meta;

type Story = StoryObj<typeof RCPCHChart>;

export const SDSChart: Story = {};

export const CentileChart: Story = {
  args: {
    title: 'CentileChart',
    subtitle: 'UK-WHO chart',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurementsArray: twoToEight,
    midParentalHeightData: {},
    enableZoom: true,
    chartStyle: traditionalGirlChartStyles,
    axisStyle: traditionalGirlAxisStyles,
    gridlineStyle: traditionalGirlGridlineStyle,
    centileStyle: traditionalGirlCentileStyle,
    sdsStyle: traditionalGirlSDSStyle,
    measurementStyle: traditionalGirlMeasurementStyle,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{}
  },
};