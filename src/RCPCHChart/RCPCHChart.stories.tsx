// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from '@storybook/react';

import RCPCHChart from './RCPCHChart.tsx';
import { ChartStyle } from '../interfaces/StyleObjects.ts';

// data
import { twoToEight } from '../testParameters/measurements/twoToEight';
import { prematureGirlOverThreeHeight } from '../testParameters/measurements/prematureGirlOverThreeHeight.ts';
import { sdsTenYearGirlData } from '../testParameters/measurements/sdsTenYearGirlData'
import { smallChildJustOverTwo } from '../testParameters/measurements/smallChildJustOverTwo';
import { girlMidparentalheightCDC } from '../testParameters/measurements/girlMidparentalheightCDC.ts';
import { girlMidparentalHeightUKWHO } from '../testParameters/measurements/girlMidparentalheightUKWHO.ts';
// import { cdcFentonGirlLength } from '../testParameters/measurements/fenton/cdcFentonGirlLength';
// import { cdcFentonGirlWeight } from '../testParameters/measurements/fenton/cdcFentonGirlWeight.ts';

const meta: Meta<typeof RCPCHChart> = {
  component: RCPCHChart,
  title: 'RCPCHChart',
};
export default meta;

type Story = StoryObj<typeof RCPCHChart>;

const customChartStyle: ChartStyle = {
  backgroundColour: "tomato",
}

const customStyles = {
  chartStyle: customChartStyle
}

export const SDSChartUKWHO: Story = {
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

export const CentileChartUKWHOGirlsHeightWithMeasurements: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    logoVariant: 'legend',
    measurements: {height: twoToEight},
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    height: 800,
    width: 1000,
    customThemeStyles: {}
  },
};

export const CentileChartUKWHOGirlsHeight: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: {height: []},
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {}
  },
};

export const CentileChartUKWHOGirlsWeight: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'weight',
    reference: 'uk-who',
    sex: 'female',
    measurements: {
      weight: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner3',
    customThemeStyles: {}
  },
};

export const CentileChartUKWHOGirlsBMI: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'bmi',
    reference: 'uk-who',
    sex: 'female',
    measurements: {
      bmi: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {}
  },
};

export const CentileChartUKWHOGirlsHeadCircumference: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'ofc',
    reference: 'uk-who',
    sex: 'female',
    measurements: {
      ofc: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {}
  },
};

export const CentileChartCDCGirlsHeightWithMeasurements: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'cdc',
    sex: 'female',
    measurements: {
      height: twoToEight
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartCDCGirlsHeight: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'cdc',
    sex: 'female',
    measurements: {
      height: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner1',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

// export const CentileChartCDCFentonGirlsLength: Story = {
//   args: {
//     title: 'Patient Name - Hospital Number',
//     measurementMethod: 'height',
//     reference: 'cdc',
//     sex: 'female',
//     measurements: {
//       height: cdcFentonGirlLength
//     },
//     midParentalHeightData: {},
//     enableZoom: true,
//     chartType: 'centile',
//     enableExport: false,
//     exportChartCallback: ()=>{},
//     theme: 'tanner1',
//     customThemeStyles: {},
//     clinicianFocus: true
//   },
// };

// export const CentileChartCDCFentonGirlsWeight: Story = {
//   args: {
//     title: 'Patient Name - Hospital Number',
//     measurementMethod: 'weight',
//     reference: 'cdc',
//     sex: 'female',
//     measurements: {
//       weight: cdcFentonGirlWeight
//     },
//     midParentalHeightData: {},
//     enableZoom: true,
//     chartType: 'centile',
//     enableExport: false,
//     exportChartCallback: ()=>{},
//     theme: 'tanner1',
//     customThemeStyles: {},
//     clinicianFocus: true
//   },
// };

export const CentileChartCDCBoysHeight: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'cdc',
    sex: 'male',
    measurements: {
      height: smallChildJustOverTwo
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartCDCGirlsWeight: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'weight',
    reference: 'cdc',
    sex: 'female',
    measurements: {
      weight: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartCDCBoysWeight: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'weight',
    reference: 'cdc',
    sex: 'male',
    measurements: {
      weight: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartCDCGirlsBMI: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'bmi',
    reference: 'cdc',
    sex: 'female',
    measurements: {
      bmi: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartCDCBoysBMI: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'bmi',
    reference: 'cdc',
    sex: 'male',
    measurements: {
      bmi: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartCDCGirlsHeadCircumference: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'ofc',
    reference: 'cdc',
    sex: 'female',
    measurements: {
      ofc: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartCDCBoysHeadCircumference: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'ofc',
    reference: 'cdc',
    sex: 'male',
    measurements: {
      ofc: []
    },
    midParentalHeightData: {},
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartCDCGirlMidparentalHeight: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'cdc',
    sex: 'female',
    measurements: {
      height: []
    },
    midParentalHeightData: girlMidparentalheightCDC,
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
  },
};

export const CentileChartUKWHOGirlMidparentalHeight: Story = {
  args: {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: {
      height: []
    },
    midParentalHeightData: girlMidparentalHeightUKWHO,
    enableZoom: true,
    chartType: 'centile',
    enableExport: false,
    exportChartCallback: ()=>{},
    theme: 'tanner2',
    customThemeStyles: {},
    clinicianFocus: true
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
          height: twoToEight,
      },
      midParentalHeightData: {},
      enableZoom: true,
      chartType: 'centile',
      enableExport: true,
      exportChartCallback: (svg) => console.log(svg),
      theme: 'custom',
      customThemeStyles: {
          chartStyle: {
              backgroundColour: '#FAF8F5',
              titleStyle: {
                  weight: 800,
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
              tooltipStroke: '#5a526b',
              tooltipBorderRadius: 4,
              tooltipBackgroundColour: '#5a526b',
              tooltipTextStyle: {
                  colour: '#fffdfd',
                  name: 'sans-serif',
                  size: 14,
              },
              toggleButtonActiveColour: '#B89F81',
              toggleButtonInactiveColour: '#e8dbcc',
              toggleButtonTextStyle: {
                  colour: 'white',
                  name: 'sans-serif',
                  size: 16,
                  weight: 400,
              },
              toggleButtonTooltipStyle: {
                backgroundColour: '#5a526b',
                borderRadius: 4,
                colour: 'white',
                size: 14,
                name: 'sans-serif',
                weight: 400,
              }
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
                  size: 15,
              },
              axisThresholdLabelTextStyle: {
                  weight: 500,
                  colour: '#706A80',
                  name: 'sans-serif',
                  size: 12.5,
              },
              axisThresholdLineStyle: {
                  colour: '#706A80',
              },
          },
          gridlineStyle: {
              dashed: true,
              stroke: '#EDE7DD',
              strokeWidth: 1,
              gridlines: true,
          },
          centileStyle: {
              centileTextStyle: {
                name: 'sans-serif',
                size: 12.5,
                weight: 400,
              },
              centileStroke: '#B89F81',
              midParentalAreaFill: '#B89F81',
              midParentalCentileStroke: '#B89F81',
              delayedPubertyAreaFill: '#B89F81',
              sdsStroke: '#B89F81',
          },
          measurementStyle: {
              eventTextStyle: {
                  size: 14,
                  name: 'sans-serif',
                  weight: 400,
                  colour: '#760050',
              },
              highlightedMeasurementFill: '#B89F81',
              measurementFill: '#760050',
          },
          referenceStyle: {
            weight: 500,
            colour: '#706A80',
            name: 'sans-serif',
            size: 13,
        },
      },
  },
};