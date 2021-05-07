import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from '../interfaces/StyleObjects';

const black = '#000000';
const white = '#FFFFFF';
const midGrey = '#b3b3b3';
const lightGrey = '#d9d9d9';
const lightPink = '#E497C1';
const darkPink = '#cb3083';

function makeAllStyles(
    chartStyle?: ChartStyle,
    axisStyle?: AxisStyle,
    gridlineStyle?: GridlineStyle,
    centileStyle?: CentileStyle,
    measurementStyle?: MeasurementStyle,
) {
    let newGridlineStyle = {
        stroke: lightGrey,
        strokeWidth: 0.25,
        strokeDasharray: '',
    };
    if (gridlineStyle?.gridlines) {
        newGridlineStyle = {
            stroke: gridlineStyle.stroke ?? lightGrey,
            strokeWidth: gridlineStyle.strokeWidth ?? 0.25,
            strokeDasharray: gridlineStyle.dashed ? '5 5' : '',
        };
    }
    const styles = {
        chartHeight: chartStyle?.height ?? 500,
        chartWidth: chartStyle?.width ?? 700,
        chartPadding: {
            left: chartStyle?.padding?.left ?? 50,
            right: chartStyle?.padding?.right ?? 50,
            top: chartStyle?.padding?.top ?? 50,
            bottom: chartStyle?.padding?.bottom ?? 50,
        },
        chartMisc: {
            background: {
                fill: chartStyle?.backgroundColour ?? white,
            },
        },
        toolTipFlyout: {
            stroke: chartStyle?.tooltipStroke ?? midGrey,
            fill: chartStyle?.tooltipBackgroundColour ?? midGrey,
        },
        toolTipMain: {
            textAnchor: 'start',
            stroke: chartStyle?.tooltipTextStyle?.colour ?? black,
            strokeWidth: chartStyle?.tooltipTextStyle?.size ?? 0.25,
            fill: chartStyle?.tooltipTextStyle?.colour ?? black,
            fontFamily: chartStyle?.tooltipTextStyle?.name ?? 'Montserrat',
            fontWeight: chartStyle?.tooltipTextStyle?.weight ?? 'normal',
        },
        chartHeading: {
            data: {
                fill: 'transparent',
            },
            title: {
                fontFamily: chartStyle?.titleStyle?.name ?? 'Arial',
                fill: chartStyle?.titleStyle?.colour ?? black,
                fontSize: chartStyle?.titleStyle?.size ?? 12,
                fontWeight: chartStyle?.titleStyle?.weight ?? 'normal',
            },
        },
        termArea: { data: { fill: chartStyle?.termFill ?? midGrey, stroke: chartStyle?.termStroke ?? midGrey } },
        xAxis: {
            axis: {
                stroke: axisStyle?.axisStroke ?? black,
                strokeWidth: 1.0,
            },
            axisLabel: {
                fontSize: axisStyle?.axisLabelTextStyle?.size ?? 10,
                padding: 20,
                fill: axisStyle?.axisLabelTextStyle?.colour ?? black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
            },
            ticks: {
                stroke: axisStyle?.tickLabelTextStyle?.colour ?? black,
            },
            tickLabels: {
                fontSize: axisStyle?.tickLabelTextStyle?.size ?? 8,
                padding: 5,
                fill: axisStyle?.tickLabelTextStyle?.colour ?? black,
                color: axisStyle?.tickLabelTextStyle?.colour ?? black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
            },
            grid: {
                ...newGridlineStyle,
            },
        },
        xTicklabel: {
            fill: axisStyle?.tickLabelTextStyle?.colour ?? black,
            fontSize: axisStyle?.tickLabelTextStyle?.size ?? 8,
            fontFamily: axisStyle?.tickLabelTextStyle?.name ?? 'Arial',
        },
        yAxis: {
            axis: {
                stroke: axisStyle?.axisStroke ?? black,
                strokeWidth: 1.0,
            },
            axisLabel: {
                fontSize: axisStyle?.axisLabelTextStyle?.size ?? 10,
                padding: 25,
                fill: axisStyle?.axisLabelTextStyle?.colour ?? black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
            },
            ticks: {
                stroke: axisStyle?.tickLabelTextStyle?.colour ?? black,
            },
            tickLabels: {
                fontSize: axisStyle?.tickLabelTextStyle?.size ?? 8,
                padding: 5,
                fill: axisStyle?.tickLabelTextStyle?.colour ?? black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
            },
            grid: {
                ...newGridlineStyle,
            },
        },
        delayedPubertyArea: {
            data: {
                stroke: centileStyle?.delayedPubertyAreaFill ?? midGrey,
                fill: centileStyle?.delayedPubertyAreaFill ?? midGrey,
                strokeWidth: centileStyle?.centileStrokeWidth ?? 0.5,
            },
        },
        delayedPubertyThresholdLine: {
            data: {
                stroke: measurementStyle?.measurementFill ?? black,
                strokeWidth: 1,
            },
        },
        delayedPubertyThresholdLabel: {
            fontSize: 8,
            fill: axisStyle?.axisLabelTextStyle?.colour ?? black,
            fontFamily: axisStyle?.axisLabelTextStyle?.name ?? 'Arial',
            textAlign: 'start',
        },
        dashedCentile: {
            data: {
                stroke: centileStyle?.centileStroke ?? black,
                strokeWidth: centileStyle?.centileStrokeWidth ?? 1.5,
                strokeLinecap: 'round',
                strokeDasharray: '5 5',
            },
        },
        continuousCentile: {
            data: {
                stroke: centileStyle?.centileStroke ?? black,
                strokeWidth: centileStyle?.centileStrokeWidth ?? 1.5,
                strokeLinecap: 'round',
            },
        },
        measurementPoint: {
            data: {
                fill: measurementStyle?.measurementFill ?? black,
                strokeWidth: measurementStyle?.measurementSize ?? 6,
            },
        },
        measurementLinkLine: {
            data: {
                stroke: measurementStyle?.measurementFill ?? black,
                strokeWidth: 1.25,
            },
        },
        toggleStyle: {
            activeColour: chartStyle?.toggleButtonActiveColour ?? darkPink,
            inactiveColour: chartStyle?.toggleButtonInactiveColour ?? lightPink,
            textColour: chartStyle?.toggleButtonTextColour ?? white,
        },
    };
    return styles;
}

export default makeAllStyles;
