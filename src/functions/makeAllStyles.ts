import { AxisStyle, CentileStyle, ChartStyle, GridlineStyle, MeasurementStyle } from '../interfaces/StyleObjects';

const black = '#000000';
const grey = '#CDCDCD';

function makeAllStyles(
    chartStyle: ChartStyle,
    axisStyle: AxisStyle,
    gridlineStyle: GridlineStyle,
    centileStyle: CentileStyle,
    measurementStyle: MeasurementStyle,
) {
    const validPadding = (inputValue: number) => typeof inputValue === 'number';
    const styles = {
        chartHeight: chartStyle?.height || 600,
        chartWidth: chartStyle?.width || 700,
        chartPadding: {
            left: validPadding(chartStyle?.padding?.left) ? chartStyle.padding.left : 50,
            right: validPadding(chartStyle?.padding?.right) ? chartStyle.padding.right : 50,
            top: validPadding(chartStyle?.padding?.top) ? chartStyle.padding.top : 50,
            bottom: validPadding(chartStyle?.padding?.bottom) ? chartStyle.padding.bottom : 50,
        },
        chartMisc: {
            background: {
                fill: chartStyle?.backgroundColour || black,
            },
        },
        toolTipFlyout: {
            stroke: chartStyle?.tooltipStroke || grey,
            fill: chartStyle?.tooltipBackgroundColour || grey,
        },
        toolTipMain: {
            textAnchor: 'start',
            stroke: chartStyle?.tooltipTextStyle?.colour || black,
            strokeWidth: chartStyle?.tooltipTextStyle?.size || 0.25,
            fill: chartStyle?.tooltipTextStyle?.colour || black,
            fontFamily: chartStyle?.tooltipTextStyle?.name || '#Montserrat',
        },
        chartHeading: {
            data: {
                fill: 'transparent',
            },
            title: {
                fontFamily: chartStyle?.titleStyle?.name || 'Arial',
                color: chartStyle?.titleStyle?.colour || black,
                fontSize: chartStyle?.titleStyle?.size || 12,
                fontWeight: chartStyle?.titleStyle?.weight || 'regular',
            },
        },
        termArea: { data: { fill: chartStyle?.termFill || grey, stroke: chartStyle?.termStroke || grey } },
        xAxis: {
            axis: {
                stroke: axisStyle?.axisStroke || black,
                strokeWidth: 1.0,
            },
            axisLabel: {
                fontSize: axisStyle?.axisLabelTextStyle?.size || 8,
                padding: 20,
                color: axisStyle?.axisLabelTextStyle?.colour || black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name || '#Montserrat',
            },
            ticks: {
                stroke: axisStyle?.tickLabelTextStyle?.colour || black,
            },
            tickLabels: {
                fontSize: axisStyle?.tickLabelTextStyle?.size || 8,
                padding: 5,
                color: axisStyle?.tickLabelTextStyle?.colour || black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name || 'Arial',
            },
            grid: {
                stroke: gridlineStyle?.gridlines ? gridlineStyle?.stroke || grey : null,
                strokeWidth: gridlineStyle?.strokeWidth || 0.5,
                strokeDasharray: gridlineStyle?.dashed ? '5 5' : '',
            },
        },
        xTicklabel: {
            fill: axisStyle.tickLabelTextStyle?.colour || black,
            fontSize: axisStyle.tickLabelTextStyle?.size || 8,
            fontFamily: axisStyle.tickLabelTextStyle?.name || 'Arial',
        },
        yAxis: {
            axis: {
                stroke: axisStyle?.axisStroke || black,
                strokeWidth: 1.0,
            },
            axisLabel: {
                fontSize: axisStyle?.axisLabelTextStyle?.size || 8,
                padding: 25,
                color: axisStyle?.axisLabelTextStyle?.colour || black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name || '#Montserrat',
            },
            ticks: {
                stroke: axisStyle?.tickLabelTextStyle?.colour || black,
            },
            tickLabels: {
                fontSize: axisStyle?.tickLabelTextStyle?.size || 8,
                padding: 5,
                color: axisStyle?.tickLabelTextStyle?.colour || black,
                fontFamily: axisStyle?.axisLabelTextStyle?.name || 'Arial',
            },
            grid: {
                stroke: gridlineStyle?.gridlines ? gridlineStyle?.stroke || grey : null,
                strokeWidth: gridlineStyle?.strokeWidth || 0.5,
                strokeDasharray: gridlineStyle?.dashed ? '5 5' : '',
            },
        },
        delayedPubertyArea: {
            data: {
                stroke: centileStyle?.delayedPubertyAreaFill || grey,
                fill: centileStyle?.delayedPubertyAreaFill || grey,
                strokeWidth: centileStyle?.centileStrokeWidth || 0.5,
            },
        },
        delayedPubertyThresholdLine: {
            data: {
                stroke: measurementStyle?.measurementFill || black,
                strokeWidth: 1,
            },
        },
        delayedPubertyThresholdLabel: {
            fontSize: 8,
            color: axisStyle?.axisLabelTextStyle?.colour || black,
            fontFamily: axisStyle?.axisLabelTextStyle?.name || 'Arial',
            textAlign: 'start',
        },
        dashedCentile: {
            data: {
                stroke: centileStyle?.centileStroke || black,
                strokeWidth: centileStyle?.centileStrokeWidth || 0.25,
                strokeLinecap: 'round',
                strokeDasharray: '5 5',
            },
        },
        continuousCentile: {
            data: {
                stroke: centileStyle?.centileStroke || black,
                strokeWidth: centileStyle?.centileStrokeWidth || 0.25,
                strokeLinecap: 'round',
            },
        },
        measurementPoint: {
            data: {
                fill: measurementStyle?.measurementFill || black,
                strokeWidth: measurementStyle?.measurementSize || 6,
            },
        },
        measurementLinkLine: {
            data: {
                stroke: measurementStyle?.measurementFill || black,
                strokeWidth: 1.25,
            },
        },
        toggleStyle: {
            activeColour: chartStyle?.toggleButtonActiveColour || '#cb3083',
            inactiveColour: chartStyle?.toggleButtonInactiveColour || '#E497C1',
            textColour: chartStyle?.toggleButtonTextColour || black,
        },
    };
    return styles;
}

export default makeAllStyles;
