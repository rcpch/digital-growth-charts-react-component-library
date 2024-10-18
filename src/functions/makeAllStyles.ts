/*
This function is called on instantiation of RCPCHChart within RCPCHChar.tsx.

This is refactored in version 7.0.0
Users pass in one of 6 RCPCH defined themes: 'monochrome', 'traditional', 'tanner1', 'tanner2', 'tanner3', 'custom'
The themes define styles for a series of exposed chart attributes. If the 'custom' theme is chosen, 'monochrome' is used as the basis for default styles.
Any of the exposed attributes can be personalised.

These are categorised into 6 interfaces:
AxisStyle, CentileStyle, SDSStyle, ChartStyle, GridlineStyle, MeasurementStyle

Most of the properties in each of the interfaces are optionals, as users may not want to alter everything. 

This function therefore instantiates defaults where user values have not been provided.
This creates a styles object that is passed to the chart.
*/
import { AxisStyle, CentileStyle, SDSStyle, ChartStyle, GridlineStyle, MeasurementStyle } from '../interfaces/StyleObjects';

const black = '#000000';
const white = '#FFFFFF';
const darkGrey = '#808080';
const midGrey = '#b3b3b3';
const lightGrey = '#d9d9d9';
const lightLightGrey = "#f3f3f3";
const charcoal = "#4d4d4d";
const aquaGreen ='#00BDAA'
const orange = '#FF8000'
const purple = '#7159AA'
const strongGreen = '#66CC33'

function makeAllStyles(
    chartStyle?: ChartStyle,
    axisStyle?: AxisStyle,
    gridlineStyle?: GridlineStyle,
    centileStyle?: CentileStyle,
    sdsStyle?: SDSStyle,
    measurementStyle?: MeasurementStyle,
    textMultiplier?: number // this is used to scale text size based on the aspect ratio of the chart using the height and width. Default is 1
) {

    let newGridlineStyle = {
        stroke: lightGrey,
        strokeWidth: 0.25,
        strokeDasharray: '',
    };
    if (gridlineStyle?.gridlines === true) {
        newGridlineStyle = {
            stroke: gridlineStyle.stroke ?? lightGrey,
            strokeWidth: gridlineStyle.strokeWidth ?? 0.25,
            strokeDasharray: gridlineStyle.dashed ? '5 5' : '',
        };
    } else if (gridlineStyle?.gridlines === false) {
        newGridlineStyle = {
            stroke: '',
            strokeWidth: 0,
            strokeDasharray: '',
        };
    }
    return { 
        chartMisc: {
            background: {
                fill: chartStyle?.backgroundColour ?? white,
            }
        },
        toolTipFlyout: {
            stroke: chartStyle?.tooltipStroke ?? midGrey, // tooltip border colour
            fill: chartStyle?.tooltipBackgroundColour ?? midGrey, // tooltip backgroundcolour
        },
        toolTipMain: {
            fontSize: (chartStyle?.tooltipTextStyle?.size ?? 14) * (textMultiplier ?? 1),
            fill: chartStyle?.tooltipTextStyle?.colour ?? black,
            fontFamily: chartStyle?.tooltipTextStyle?.name ?? 'Montserrat',
            fontStyle: chartStyle?.tooltipTextStyle?.style ?? 'normal',
            textAnchor: "start"
        },
        chartTitle: {
            fontFamily:  chartStyle?.titleStyle?.name ?? 'Arial',
            color: chartStyle?.titleStyle?.colour ?? black,
            fontSize: chartStyle?.titleStyle?.size ?? 14,
            fontStyle: chartStyle?.titleStyle?.style === 'italic' ? 'italic' : 'normal',
        },
        chartSubTitle: {
            fontFamily: chartStyle?.subTitleStyle?.name ?? 'Arial', 
            color: chartStyle?.subTitleStyle?.colour ?? black,
            fontSize: chartStyle?.subTitleStyle?.size ?? 14,
            fontStyle: chartStyle?.subTitleStyle?.style === 'italic' ? 'italic' : 'normal',
        },
        termArea: { data: { fill: chartStyle?.termFill ?? midGrey, stroke: chartStyle?.termStroke ?? midGrey } },
        xAxis: {
            axis: {
                stroke: axisStyle?.axisStroke ?? black,
                strokeWidth: 1.0,
            },
            axisLabel: {
                fontSize: (axisStyle?.axisLabelTextStyle?.size ?? 10) * (textMultiplier ?? 1),
                padding: 20,
                fill: axisStyle?.axisLabelTextStyle?.colour ?? black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
                fontStyle: axisStyle?.axisLabelTextStyle?.style ?? 'normal',
            },
            ticks: {
                stroke: axisStyle?.tickLabelTextStyle?.colour ?? black,
            },
            tickLabels: {
                fontSize: (axisStyle?.tickLabelTextStyle?.size ?? 8) * (textMultiplier ?? 1),
                padding: 5,
                fill: axisStyle?.tickLabelTextStyle?.colour ?? black,
                color: axisStyle?.tickLabelTextStyle?.colour ?? black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
                fontStyle: axisStyle?.axisLabelTextStyle?.style ?? 'normal',
            },
            grid: {
                ...newGridlineStyle,
            },
        },
        xTicklabel: {
            fill: axisStyle?.tickLabelTextStyle?.colour ?? black,
            fontSize: (axisStyle?.tickLabelTextStyle?.size ?? 8) * (textMultiplier ?? 1),
            fontFamily: axisStyle?.tickLabelTextStyle?.name ?? 'Arial',
            fontStyle: axisStyle?.axisLabelTextStyle?.style ?? 'normal',
        },
        yAxis: {
            axis: {
                stroke: axisStyle?.axisStroke ?? black,
                strokeWidth: 1.0,
            },
            axisLabel: {
                fontSize: (axisStyle?.axisLabelTextStyle?.size ?? 10) * (textMultiplier ?? 1),
                padding: 25,
                fill: axisStyle?.axisLabelTextStyle?.colour ?? black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
                fontStyle: axisStyle?.axisLabelTextStyle?.style ?? 'normal',
            },
            ticks: {
                stroke: axisStyle?.tickLabelTextStyle?.colour ?? black,
            },
            tickLabels: {
                fontSize: (axisStyle?.tickLabelTextStyle?.size ?? 8) * (textMultiplier ?? 1),
                padding: 5,
                fill: axisStyle?.tickLabelTextStyle?.colour ?? black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
                fontStyle: axisStyle?.axisLabelTextStyle?.style ?? 'normal',
            },
            grid: {
                ...newGridlineStyle,
            },
        },
        delayedPubertyArea: {
            data: {
                stroke: centileStyle?.delayedPubertyAreaFill ?? midGrey,
                fill: centileStyle?.delayedPubertyAreaFill ?? midGrey,
                strokeWidth: 0.5,
            },
        },
        delayedPubertyThresholdLine: {
            data: {
                stroke: charcoal,
                strokeWidth: 1,
            },
        },
        delayedPubertyThresholdLabel: {
            fontSize: (9) * (textMultiplier ?? 1),
            fill: axisStyle?.axisLabelTextStyle?.colour ?? black,
            fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
            textAlign: 'start',
        },
        nondisjunctionThresholdLine: {
            data: {
                stroke: charcoal,
                strokeWidth: 1,
            },
        },
        sdsLine: {  // these are the sds lines on the BMI chart
            data: {
                stroke: centileStyle?.sdsStroke ?? '#A9A9A9',
                strokeWidth: 1.0,
                strokeLinecap: 'round',
                strokeDasharray: '5 5',
            }
        },
        dashedCentile: {
            data: {
                stroke: centileStyle?.centileStroke ?? black,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
                strokeDasharray: '5 5',
            },
        },
        continuousCentile: {
            data: {
                stroke: centileStyle?.centileStroke ?? black,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
            },
        },
        centileLabel: {
            fontSize: (6) * (textMultiplier ?? 1),
            fontFamily: 'Montserrat',
            fill: centileStyle?.centileStroke ?? black
        },
        heightSDS: {
            data: {
                stroke: aquaGreen,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
            }
        },
        weightSDS: {
            data: {
                stroke: orange,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
            }
        },
        ofcSDS: {
            data: {
                stroke: purple,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
            }
        },
        bmiSDS: {
            data: {
                stroke: strongGreen,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
            }
        },
        midParentalCentile: {
            data: {
                stroke: centileStyle?.midParentalCentileStroke ?? black,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
                strokeOpacity: 1.0,
            }
        },
        midParentalSDS: {
            data: {
                stroke: centileStyle?.midParentalCentileStroke ?? black,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
                strokeOpacity: 1.0,
                strokeDasharray: '2 5'
            }
        },
        midParentalArea: {
            data: {
                fill: centileStyle?.midParentalAreaFill ?? lightLightGrey,
                opacity: 0.5
            }
        },
        measurementPoint: { // these are the points on the chart where measurements are plotted: note that the size is dynamically set based on the isCrowded function
            data: {
                fill: measurementStyle?.measurementFill ?? black,
            },
        },
        measurementLinkLine: {
            data: {
                stroke: measurementStyle?.measurementFill ?? black,
                strokeWidth: 1.25,
            },
        },
        highlightedMeasurementFill: { // these are the points on the chart where measurements are plotted: note that the size is dynamically set based on the isCrowded function
            data: {
                fill: measurementStyle?.highlightedMeasurementFill ?? black,
            }
        },
        eventTextStyle: {
            size: (measurementStyle?.eventTextStyle?.size ?? 14) * (textMultiplier ?? 1),
            name: measurementStyle?.eventTextStyle?.name ?? 'Montserrat',
            colour: measurementStyle?.eventTextStyle?.colour ?? black,
            style: measurementStyle?.eventTextStyle?.style ?? 'normal'
        },
        toggleStyle: {
            activeColour: chartStyle?.toggleButtonActiveColour ?? black,
            inactiveColour: chartStyle?.toggleButtonInactiveColour ?? midGrey,
            fontFamily: chartStyle?.toggleButtonTextStyle?.name ?? 'Arial',
            color: chartStyle?.toggleButtonTextStyle?.colour ?? white,
            fontSize: chartStyle?.toggleButtonTextStyle?.size ?? 14,
            fontStyle: chartStyle?.toggleButtonTextStyle?.style === 'italic' ? 'italic' : 'normal',
            margin: 0
        },
    };
}

export default makeAllStyles;
