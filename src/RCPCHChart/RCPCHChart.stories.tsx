// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import RCPCHChart from './RCPCHChart.tsx';
import { ChartStyle } from '../interfaces/StyleObjects.ts';

// data
import { twoToEight } from '../testParameters/measurements/twoToEight';
import { prematureGirlOverThreeHeight } from '../testParameters/measurements/prematureGirlOverThreeHeight.ts';
import { sdsTenYearGirlData } from '../testParameters/measurements/sdsTenYearGirlData'

const meta: Meta<typeof RCPCHChart> = {
  component: RCPCHChart,
};
export default meta;

type Story = StoryObj<typeof RCPCHChart>;

const customChartStyle: ChartStyle = {
  backgroundColour: "tomato"
}

const customStyles = {
  chartStyle: customChartStyle
}

export const SDSChart: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: {
      height: twoToEight,
      weight: [],
      bmi: [],
      ofc: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'sds',
    enableExport: false,
    exportChartCallback: ()=>{},
    clinicianFocus: true,
    theme: 'tanner2',
    customThemeStyles: {}
  }
};

export const UKWHOCentileChart: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: {height: twoToEight},
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {}
  },
};

export const CDCCentileChart: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'cdc',
    sex: 'female',
    measurements: {height: twoToEight},
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {}
  },
};

export const TomatoCentileChart: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: {
      height: twoToEight
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'monochrome',
    customThemeStyles: customStyles
  },
};

export const PrematureSDSChart: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: {
      height: prematureGirlOverThreeHeight,
      weight: [],
      bmi: [],
      ofc: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'sds',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {}
  },
};

export const MultipleMeasurementSDSChart: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: sdsTenYearGirlData,
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'sds',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'monochrome',
    customThemeStyles: {}
  },

}