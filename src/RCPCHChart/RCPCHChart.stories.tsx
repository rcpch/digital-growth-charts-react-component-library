// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj, StoryFn, ArgTypes } from '@storybook/react';

import RCPCHChart from './RCPCHChart';
import { RCPCHChartProps } from './RCPCHChart.types.ts';
import { ChartStyle } from '../interfaces/StyleObjects.ts';

// data
import { twoToEight } from '../testParameters/measurements/twoToEight';
import { prematureGirlOverThreeHeight } from '../testParameters/measurements/prematureGirlOverThreeHeight.ts';
import { sdsTenYearGirlData } from '../testParameters/measurements/sdsTenYearGirlData';
import { smallChildJustOverTwo } from '../testParameters/measurements/smallChildJustOverTwo';
import { girlMidparentalheightCDC } from '../testParameters/measurements/girlMidparentalheightCDC.ts';
import { girlMidparentalHeightUKWHO } from '../testParameters/measurements/girlMidparentalheightUKWHO.ts';
import { prematureGirlBMI } from '../testParameters/measurements/prematureGirlBMI.ts';
import { cdcOFCGirl } from '../testParameters/measurements/cdcOFCGirls.ts';
import { maleCDCBMIExcess } from '../testParameters/measurements/maleCDCBMIExcess.ts';
import { childTrisomyAAPData } from '../testParameters/measurements/childTrisomyAAPData.ts';
import { maleWeightT21AAPData } from '../testParameters/measurements/maleWeightT21AAP.ts';
import { whoToNineteenGirlHeight } from '../testParameters/measurements/whoHeightToNineteenGirl.ts';
import { whoOneToFiveBoysHeight } from '../testParameters/measurements/whoHeightBoysOneToFive.ts';
import React from 'react';
// import { cdcFentonGirlLength } from '../testParameters/measurements/fenton/cdcFentonGirlLength';
// import { cdcFentonGirlWeight } from '../testParameters/measurements/fenton/cdcFentonGirlWeight.ts';

type Story = StoryObj<typeof RCPCHChart>;

const customChartStyle: ChartStyle = {
    backgroundColour: 'tomato',
};

const customStyles = {
    chartStyle: customChartStyle,
};

export const ThemeBuilder: StoryFn<RCPCHChartProps> = (args) => {
    const handleCopyToClipboard = () => {
        const customStyles = args.customThemeStyles;
        if (customStyles) {
            const jsonStyles = JSON.stringify(customStyles, null, 2);
            navigator.clipboard
                .writeText(jsonStyles)
                .then(() => alert('Custom theme JSON copied to clipboard!'))
                .catch(() => alert('Failed to copy JSON to clipboard.'));
        } else {
            alert('No custom theme styles found.');
        }
    };

    return (
        <div>
            <h1
                style={{
                    fontFamily: 'montserrat',
                    fontSize: '24px',
                    color: '#3b3b3b',
                    marginBottom: '10px',
                }}
            >
                Theme Builder
            </h1>
            <p
                style={{
                    fontFamily: 'montserrat',
                    fontSize: '14px',
                    color: '#3b3b3b',
                    marginBottom: '10px',
                }}
            >
                This is a tool to generate a{' '}
                <text style={{ fontFamily: 'monospace', color: '#11A7F2' }}>customThemeStyles</text> object. Use the
                form to personalise the chart to the way you want it, and the click the button. This will copy the
                custom styles you need to the clipboard for use in your project.
            </p>
            <button
                onClick={handleCopyToClipboard}
                style={{
                    backgroundColor: '#11A7F2',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '0px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '10px',
                    marginBottom: '20px',
                    fontFamily: 'montserrat',
                }}
            >
                Copy Custom Theme JSON
            </button>
            <RCPCHChart {...args} />
        </div>
    );
};

ThemeBuilder.args = {
    title: 'Patient Name - Hospital Number',
    measurementMethod: 'height',
    reference: 'uk-who',
    sex: 'female',
    measurements: {
        height: [],
        weight: [],
        bmi: [],
        ofc: [],
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
};

ThemeBuilder.argTypes = {
    measurements: { control: false },
    midParentalHeightData: { control: false },
    theme: { control: false },
    title: { control: 'text' }, // Explicit control type
    measurementMethod: { control: 'select', options: ['height', 'weight'] }, // Explicit control type with options
    reference: { control: 'select', options: ['uk-who', 'other'] }, // Explicit control type with options
    sex: { control: 'radio', options: ['female', 'male'] }, // Explicit control type
    enableZoom: { control: 'boolean' }, // Explicit control type
    chartType: { control: 'select', options: ['centile', 'sds'] }, // Explicit control type
    enableExport: { control: 'boolean' }, // Explicit control type
    exportChartCallback: { control: false }, // No control
    height: { control: 'number' }, // Explicit control type
    width: { control: 'number' }, // Explicit control type
    clinicianFocus: { control: 'boolean' }, // Explicit control type
    logoVariant: { control: 'select', options: ['rcpch', 'nhs'] }, // Explicit control type
    // customThemeStyles
} as ArgTypes<RCPCHChartProps>;

ThemeBuilder.storyName = 'Theme Builder 🎨 ';

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
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'sds',
        enableExport: false,
        exportChartCallback: () => {},
        clinicianFocus: true,
        theme: 'tanner2',
        customThemeStyles: {},
    },
};

export const CentileChartUKWHOGirlsHeightWithMeasurementsLegend: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'uk-who',
        sex: 'female',
        logoVariant: 'legend',
        measurements: { height: twoToEight },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        height: 800,
        width: 1000,
        customThemeStyles: {},
    },
};

export const CentileChartUKWHOBoysHeightWithMeasurementsLegend: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'uk-who',
        sex: 'male',
        logoVariant: 'legend',
        measurements: { height: [] },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        height: 800,
        width: 1000,
        customThemeStyles: {},
    },
};

export const CentileChartPrematureUKWHOGirlsHeightWithMeasurementsLegend: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'uk-who',
        sex: 'female',
        logoVariant: 'legend',
        measurements: { height: prematureGirlOverThreeHeight },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        height: 800,
        width: 1000,
        customThemeStyles: {},
    },
};

export const CentileChartPrematureUKWHOGirlsHeightWithMeasurementsBottom: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'uk-who',
        sex: 'female',
        logoVariant: 'bottom',
        measurements: { height: prematureGirlOverThreeHeight },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        height: 800,
        width: 1000,
        customThemeStyles: {},
    },
};

export const CentileChartUKWHOGirlsHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'uk-who',
        sex: 'female',
        measurements: { height: [] },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
    },
};

export const CentileChartUKWHOGirlsWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'uk-who',
        sex: 'female',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
    },
};

export const CentileChartUKWHOGirlsBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'uk-who',
        sex: 'female',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
    },
};

export const CentileChartUKWHOPrematureGirlsBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'uk-who',
        sex: 'female',
        measurements: {
            bmi: prematureGirlBMI,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
    },
};

export const CentileChartUKWHOGirlsHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'uk-who',
        sex: 'female',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
    },
};

export const CentileChartCDCGirlsHeightWithMeasurements: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'cdc',
        sex: 'female',
        measurements: {
            height: twoToEight,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCGirlsHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'cdc',
        sex: 'female',
        measurements: {
            height: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        customThemeStyles: {},
        clinicianFocus: true,
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
            height: smallChildJustOverTwo,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCGirlsWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'cdc',
        sex: 'female',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCBoysWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'cdc',
        sex: 'male',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCGirlsBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'cdc',
        sex: 'female',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCBoysBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'cdc',
        sex: 'male',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCBoysBMIExcess: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'cdc',
        sex: 'male',
        measurements: {
            bmi: maleCDCBMIExcess,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCGirlsHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'cdc',
        sex: 'female',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCGirlsDataHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'cdc',
        sex: 'female',
        measurements: {
            ofc: cdcOFCGirl,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCBoysHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'cdc',
        sex: 'male',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartCDCGirlMidparentalHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'cdc',
        sex: 'female',
        measurements: {
            height: [],
        },
        midParentalHeightData: girlMidparentalheightCDC,
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartUKWHOGirlMidparentalHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'uk-who',
        sex: 'female',
        measurements: {
            height: [],
        },
        midParentalHeightData: girlMidparentalHeightUKWHO,
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21AAPBoysHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'trisomy-21-aap',
        sex: 'male',
        measurements: {
            height: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPGirlsHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'trisomy-21-aap',
        sex: 'female',
        measurements: {
            height: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPBoysHeightData: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'trisomy-21-aap',
        sex: 'male',
        measurements: {
            height: childTrisomyAAPData,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPBoysWeightData: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'trisomy-21-aap',
        sex: 'male',
        measurements: {
            weight: maleWeightT21AAPData,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPGirlsWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'trisomy-21-aap',
        sex: 'female',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPBoysWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'trisomy-21-aap',
        sex: 'female',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPGirlsBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'trisomy-21-aap',
        sex: 'female',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPGBoysBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'trisomy-21-aap',
        sex: 'male',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPGirlsHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'trisomy-21-aap',
        sex: 'female',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartTrisomy21AAPBoysHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'trisomy-21-aap',
        sex: 'male',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartWHOBoysHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'who',
        sex: 'male',
        measurements: {
            height: whoOneToFiveBoysHeight,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartWHOGirlsHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'who',
        sex: 'female',
        measurements: {
            height: whoToNineteenGirlHeight,
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartWHOGirlsWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'who',
        sex: 'female',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartWHOGirlsHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'who',
        sex: 'female',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartWHOGirlsBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'who',
        sex: 'female',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner1',
        customThemeStyles: {},
        clinicianFocus: true,
        logoVariant: 'bottom',
    },
};

export const CentileChartWHOBoysWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'who',
        sex: 'male',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartWHOBoysBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'who',
        sex: 'male',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartWHOBoysHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'who',
        sex: 'male',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21BoysHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'trisomy-21',
        sex: 'male',
        measurements: {
            height: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21BoysWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'trisomy-21',
        sex: 'male',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21BoysBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'trisomy-21',
        sex: 'male',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21BoysHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'trisomy-21',
        sex: 'male',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21GirlsHeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'height',
        reference: 'trisomy-21',
        sex: 'female',
        measurements: {
            height: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21GirlsWeight: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'weight',
        reference: 'trisomy-21',
        sex: 'female',
        measurements: {
            weight: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21GirlsBMI: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'bmi',
        reference: 'trisomy-21',
        sex: 'female',
        measurements: {
            bmi: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const CentileChartTrisomy21GirlsHeadCircumference: Story = {
    args: {
        title: 'Patient Name - Hospital Number',
        measurementMethod: 'ofc',
        reference: 'trisomy-21',
        sex: 'female',
        measurements: {
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'centile',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner3',
        customThemeStyles: {},
        clinicianFocus: true,
    },
};

export const TomatoCentileChart: Story = {
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
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'monochrome',
        customThemeStyles: customStyles,
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
            ofc: [],
        },
        midParentalHeightData: {},
        enableZoom: true,
        chartType: 'sds',
        enableExport: false,
        exportChartCallback: () => {},
        theme: 'tanner2',
        customThemeStyles: {},
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
        exportChartCallback: () => {},
        theme: 'monochrome',
        customThemeStyles: {},
    },
};

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
    argTypes: {
        measurements: { control: false },
        midParentalHeightData: { control: false },
        theme: { control: false },
        // customThemeStyles
        'customThemeStyles.chartStyle.backgroundColour': { control: 'color' },
        'customThemeStyles.chartStyle.titleStyle.name': { control: 'text' },
        'customThemeStyles.chartStyle.titleStyle.colour': { control: 'color' },
        'customThemeStyles.chartStyle.titleStyle.size': { control: 'number' },
        'customThemeStyles.chartStyle.titleStyle.weight': { control: 'number' },
        'customThemeStyles.chartStyle.subTitleStyle.name': { control: 'text' },
        'customThemeStyles.chartStyle.subTitleStyle.colour': { control: 'color' },
        'customThemeStyles.chartStyle.subTitleStyle.size': { control: 'number' },
        'customThemeStyles.chartStyle.subTitleStyle.weight': { control: 'number' },
        'customThemeStyles.chartStyle.tooltipBackgroundColour': { control: 'color' },
        'customThemeStyles.chartStyle.tooltipStroke': { control: 'color' },
        'customThemeStyles.chartStyle.tooltipBorderRadius': { control: 'number' },
        'customThemeStyles.chartStyle.tooltipTextStyle.name': { control: 'text' },
        'customThemeStyles.chartStyle.tooltipTextStyle.colour': { control: 'color' },
        'customThemeStyles.chartStyle.tooltipTextStyle.size': { control: 'number' },
        'customThemeStyles.chartStyle.tooltipTextStyle.weight': { control: 'number' },
        'customThemeStyles.chartStyle.termFill': { control: 'color' },
        'customThemeStyles.chartStyle.termStroke': { control: 'color' },
        'customThemeStyles.chartStyle.toggleButtonInactiveColour': { control: 'color' },
        'customThemeStyles.chartStyle.toggleButtonActiveColour': { control: 'color' },
        'customThemeStyles.chartStyle.toggleButtonTextStyle.name': { control: 'text' },
        'customThemeStyles.chartStyle.toggleButtonTextStyle.colour': { control: 'color' },
        'customThemeStyles.chartStyle.toggleButtonTextStyle.size': { control: 'number' },
        'customThemeStyles.chartStyle.toggleButtonTextStyle.weight': { control: 'number' },
        'customThemeStyles.chartStyle.toggleButtonTooltipStyle.backgroundColour': { control: 'color' },
        'customThemeStyles.chartStyle.toggleButtonTooltipStyle.borderRadius': { control: 'number' },
        'customThemeStyles.chartStyle.toggleButtonTooltipStyle.name': { control: 'text' },
        'customThemeStyles.chartStyle.toggleButtonTooltipStyle.colour': { control: 'color' },
        'customThemeStyles.chartStyle.toggleButtonTooltipStyle.size': { control: 'number' },
        'customThemeStyles.chartStyle.toggleButtonTooltipStyle.weight': { control: 'number' },
        'customThemeStyles.chartStyle.toggleButtonSize': { control: 'number' },

        // MeasurementStyle
        'customThemeStyles.measurementStyle.measurementFill': { control: 'color' },
        'customThemeStyles.measurementStyle.highlightedMeasurementFill': { control: 'color' },
        'customThemeStyles.measurementStyle.eventTextStyle.name': { control: 'text' },
        'customThemeStyles.measurementStyle.eventTextStyle.colour': { control: 'color' },
        'customThemeStyles.measurementStyle.eventTextStyle.size': { control: 'number' },
        'customThemeStyles.measurementStyle.eventTextStyle.weight': { control: 'number' },

        // CentileStyle
        'customThemeStyles.centileStyle.sdsStroke': { control: 'color' },
        'customThemeStyles.centileStyle.centileStroke': { control: 'color' },
        'customThemeStyles.centileStyle.nondisjunctionThresholdLabel': { control: 'text' },
        'customThemeStyles.centileStyle.nondisjunctionThresholdLine': { control: 'color' },
        'customThemeStyles.centileStyle.delayedPubertyAreaFill': { control: 'color' },
        'customThemeStyles.centileStyle.midParentalAreaFill': { control: 'color' },
        'customThemeStyles.centileStyle.midParentalCentileStroke': { control: 'color' },
        'customThemeStyles.centileStyle.centileTextStyle.name': { control: 'text' },
        'customThemeStyles.centileStyle.centileTextStyle.size': { control: 'number' },
        'customThemeStyles.centileStyle.centileTextStyle.weight': { control: 'number' },

        // GridlineStyle
        'customThemeStyles.gridlineStyle.gridlines': { control: 'boolean' },
        'customThemeStyles.gridlineStyle.stroke': { control: 'color' },
        'customThemeStyles.gridlineStyle.strokeWidth': { control: 'number' },
        'customThemeStyles.gridlineStyle.dashed': { control: 'boolean' },

        // AxisStyle
        'customThemeStyles.axisStyle.axisStroke': { control: 'color' },
        'customThemeStyles.axisStyle.axisLabelTextStyle.name': { control: 'text' },
        'customThemeStyles.axisStyle.axisLabelTextStyle.colour': { control: 'color' },
        'customThemeStyles.axisStyle.axisLabelTextStyle.size': { control: 'number' },
        'customThemeStyles.axisStyle.axisLabelTextStyle.weight': { control: 'number' },
        'customThemeStyles.axisStyle.tickLabelTextStyle.name': { control: 'text' },
        'customThemeStyles.axisStyle.tickLabelTextStyle.colour': { control: 'color' },
        'customThemeStyles.axisStyle.tickLabelTextStyle.size': { control: 'number' },
        'customThemeStyles.axisStyle.tickLabelTextStyle.weight': { control: 'number' },
        'customThemeStyles.axisStyle.tickLabelTextStyle.padding': { control: 'number' },
        'customThemeStyles.axisStyle.axisThresholdLabelTextStyle.name': { control: 'text' },
        'customThemeStyles.axisStyle.axisThresholdLabelTextStyle.colour': { control: 'color' },
        'customThemeStyles.axisStyle.axisThresholdLabelTextStyle.size': { control: 'number' },
        'customThemeStyles.axisStyle.axisThresholdLabelTextStyle.weight': { control: 'number' },
        'customThemeStyles.axisStyle.axisThresholdLineStyle.colour': { control: 'color' },

        // ReferenceStyle
        'customThemeStyles.referenceStyle.name': { control: 'text' },
        'customThemeStyles.referenceStyle.colour': { control: 'color' },
        'customThemeStyles.referenceStyle.size': { control: 'number' },
        'customThemeStyles.referenceStyle.weight': { control: 'number' },
    } as ArgTypes<RCPCHChartProps>,
};

const meta: Meta<typeof RCPCHChart> = {
    component: RCPCHChart, // Reference the named export here
    title: 'RCPCHChart',
    parameters: {
        options: {
            storySort: {
                order: ['Theme Builder 🎨 ', '*'],
            },
        },
    },
};
export default meta;
