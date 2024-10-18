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

export const CentileChart: Story = {
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

export const CustomThemeStylesChart: Story = {
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
    theme: 'custom',
      customThemeStyles: {
          chartStyle: {
              titleStyle: {
                  weight: 600,
                  colour: '#706A80',
                  name: 'sans-serif',
                  size: 16,
              },
              subTitleStyle: {
                  weight: 400,
                  colour: '#706A80',
                  name: 'sans-serif',
                  size: 13,
              },
              toggleButtonActiveColour: '#B89F81',
              toggleButtonInactiveColour: '#e8dbcc',
              toggleButtonTextStyle: {
                  colour: 'white',
                  name: 'sans-serif',
                  size: 16,
                  weight: 400,
              },
              backgroundColour: '#FAF8F5',
              tooltipStroke: '#EBE1D3',
              tooltipBackgroundColour: '#FFFDFD',
              tooltipTextStyle: {
                  colour: '#706A80',
                  name: 'sans-serif',
                  size: 17,
              },
          },
          axisStyle: {
              axisStroke: '#EDE7DD',
              tickLabelTextStyle: {
                  colour: '#706A80',
                  size: 12,
                  weight: 400,
                  name: 'sans-serif',
              },
              axisLabelTextStyle: {
                  weight: 500,
                  colour: '#706A80',
                  name: 'sans-serif',
                  size: 14,
              },
              axisThresholdLabelTextStyle: {
                  weight: 500,
                  colour: '#B89F81',
                  name: 'sans-serif',
                  size: 14,
              },
          },
          referenceStyle: {
              weight: 500,
              colour: '#706A80',
              name: 'sans-serif',
              size: 13,
          },
          gridlineStyle: {
              dashed: true,
              stroke: '#EDE7DD',
              strokeWidth: 1,
              gridlines: true,
          },
          centileStyle: {
              centileStroke: '#B89F81',
              midParentalAreaFill: '#B89F81',
              midParentalCentileStroke: '#B89F81',
              delayedPubertyAreaFill: '#B89F81',
              sdsStroke: '#B89F81',
          },
          measurementStyle: {
              eventTextStyle: {
                  size: 16,
                  name: 'sans-serif',
                  weight: 500,
                  colour: '#706A80',
              },
              highlightedMeasurementFill: '#B89F81',
              measurementFill: '#760050',
          },
      },
  },
};